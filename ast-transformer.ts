import * as ts from 'typescript';

const factory = ts.factory;

function containDecorators(decorators: string[], node: ts.Decorator) {
    // You will probably want something more sophisticated
    // that analyzes the import declarations or possibly uses
    // the type checker in an initial pass of the source files
    // before transforming. This naively just checks if the
    // decorator is a call expression and if its expression
    // has the text in decorators array. This definitely won't work
    // in every scenario and might possibly get false positives.
    if (decorators.length) {
        return decorators.some(d => node.getFullText().trim().startsWith('@' + d))
    }
    return false;
}

function getDecoratorMetaData(decoratorName: string, node: ts.Node): { name: string, params: string } {
    // You will probably want something more sophisticated
    // that analyzes the import declarations or possibly uses
    // the type checker in an initial pass of the source files
    // before transforming. This naively just checks if the
    // decorator is a call expression and if its expression
    // has the text "Component". This definitely won't work
    // in every scenario and might possibly get false positives.
    if (node.decorators) {
        const [decorator] = node.decorators.filter(d => d.getFullText().trim().startsWith('@' + decoratorName));
        if (decorator) {
            let params = null;
            if (ts.isCallExpression(decorator.expression)) {
                const args = decorator.expression.arguments;
                params = args.length && args[0].getText();
            }
            return {
                name: decoratorName,
                params
            }
        }
    }
    return null;
}

const getConstructorMethod = (node: ts.ClassDeclaration) => {
    const constructorMethod = node.members
        .filter(node => ts.isConstructorDeclaration(node))
        .map(node => node as ts.MethodDeclaration);
    return constructorMethod.length && constructorMethod[0];
}

const astTransformer: ts.TransformerFactory<ts.SourceFile> = (context: ts.TransformationContext) => {
    return sourceFile => {
        const visitor: ts.Visitor = (node: ts.Node): ts.Node | ts.Node[] => {
            if (ts.isDecorator(node) && containDecorators(['Component', 'Service'], node)) {
                return undefined;
            }
            if (ts.isClassDeclaration(node)) {
                if (node.decorators) {
                    const constructor = getConstructorMethod(node);
                    const componentDecorator = getDecoratorMetaData('Component', node);
                    const serviceDecorator = getDecoratorMetaData('Service', node);
                    const nodeName = node.name.escapedText as string;
                    let constructorParametersTypes = [];
                    let decoratorStaticNode = undefined;
                    if (constructor) {
                        constructorParametersTypes = constructor.parameters.map(param => param.type.getText());
                    }

                    if (componentDecorator) {
                        decoratorStaticNode = factory.createExpressionStatement(factory.createCallExpression(
                            factory.createCallExpression(
                                factory.createIdentifier(componentDecorator.name),
                                undefined,
                                [factory.createIdentifier(componentDecorator.params)]
                            ),
                            undefined,
                            [factory.createArrayLiteralExpression(
                                [
                                    ...constructorParametersTypes.map(p => factory.createStringLiteral(p)),
                                    factory.createIdentifier(nodeName)
                                ],
                                false
                            )]
                        ));
                    } else if (serviceDecorator) {
                        decoratorStaticNode = factory.createExpressionStatement(factory.createCallExpression(
                            factory.createCallExpression(
                                factory.createIdentifier(serviceDecorator.name),
                                undefined,
                                [factory.createStringLiteral(nodeName)]
                            ),
                            undefined,
                            [factory.createArrayLiteralExpression([
                                ...constructorParametersTypes.map(p => factory.createStringLiteral(p)),
                                factory.createIdentifier(nodeName)
                            ],
                                false
                            )]
                        ))
                    }
                    return [ts.visitEachChild(node, visitor, context), decoratorStaticNode];
                }
            }
            return ts.visitEachChild(node, visitor, context);
        };
        return ts.visitNode(sourceFile, visitor);
    };
}

export default astTransformer;