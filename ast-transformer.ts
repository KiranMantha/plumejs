import * as ts from 'typescript';

const factory = ts.factory;

const enum DecoratorTypes {
  COMPONENT = 'Component',
  INJECTABLE = 'Injectable'
}

function containDecorators(decorators: string[], node: ts.Decorator) {
  if (decorators.length) {
    return decorators.some((d) =>
      node
        .getFullText()
        .trim()
        .startsWith('@' + d)
    );
  }
  return false;
}

function getDecoratorMetaData(decoratorName: string, node: ts.Node): { name: string; params: string } {
  const [decorator] = node.decorators.filter((d) =>
    d
      .getFullText()
      .trim()
      .startsWith('@' + decoratorName)
  );
  if (decorator) {
    let params = null;
    if (ts.isCallExpression(decorator.expression)) {
      const args = decorator.expression.arguments;
      params = args.length && args[0].getText();
    }
    return {
      name: decoratorName,
      params
    };
  }
}

const getConstructorMethod = (node: ts.ClassDeclaration) => {
  const constructorMethod = node.members
    .filter((node) => ts.isConstructorDeclaration(node))
    .map((node) => node as ts.MethodDeclaration);
  return constructorMethod.length && constructorMethod[0];
};

const astTransformer: ts.TransformerFactory<ts.SourceFile> = (context: ts.TransformationContext) => {
  return (sourceFile) => {
    const visitor: ts.Visitor = (node: ts.Node): ts.Node | ts.Node[] => {
      if (ts.isDecorator(node) && containDecorators([DecoratorTypes.COMPONENT, DecoratorTypes.INJECTABLE], node)) {
        return undefined;
      }
      if (ts.isClassDeclaration(node)) {
        if (node.decorators) {
          const constructor = getConstructorMethod(node);
          const componentDecorator = getDecoratorMetaData(DecoratorTypes.COMPONENT, node);
          const injectableDecorator = getDecoratorMetaData(DecoratorTypes.INJECTABLE, node);
          const nodeName = node.name.escapedText as string;
          let constructorParametersTypes = [];
          let decoratorStaticNode = undefined;
          if (constructor) {
            constructorParametersTypes = constructor.parameters.map((param) => param.type.getText());
          }

          if (componentDecorator) {
            decoratorStaticNode = factory.createExpressionStatement(
              factory.createCallExpression(
                factory.createCallExpression(factory.createIdentifier(componentDecorator.name), undefined, [
                  factory.createIdentifier(componentDecorator.params)
                ]),
                undefined,
                [
                  factory.createArrayLiteralExpression(
                    [
                      ...constructorParametersTypes.map((p) => factory.createStringLiteral(p)),
                      factory.createIdentifier(nodeName)
                    ],
                    false
                  )
                ]
              )
            );
          } else if (injectableDecorator) {
            decoratorStaticNode = factory.createExpressionStatement(
              factory.createCallExpression(
                factory.createCallExpression(factory.createIdentifier(injectableDecorator.name), undefined, [
                  factory.createStringLiteral(nodeName)
                ]),
                undefined,
                [
                  factory.createArrayLiteralExpression(
                    [
                      ...constructorParametersTypes.map((p) => factory.createStringLiteral(p)),
                      factory.createIdentifier(nodeName)
                    ],
                    false
                  )
                ]
              )
            );
          }
          const updatedClassNode = factory.updateClassDeclaration(
            node,
            undefined,
            node.modifiers,
            node.name,
            node.typeParameters,
            node.heritageClauses,
            node.members
          );
          return [ts.visitEachChild(updatedClassNode, visitor, context), decoratorStaticNode];
        }
      }
      return ts.visitEachChild(node, visitor, context);
    };
    return ts.visitNode(sourceFile, visitor);
  };
};

export default astTransformer;
