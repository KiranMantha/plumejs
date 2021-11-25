/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
//https://stackoverflow.com/questions/49139601/how-to-bind-an-identifier-with-an-existing-symbol-on-a-compiler-transformer-in-t
//https://github.com/pedro-pedrosa/ts-expressions

import * as ts from 'typescript';

const factory = ts.factory;

const enum DecoratorTypes {
  COMPONENT = 'Component',
  INJECTABLE = 'Injectable'
}

/** extracted from ttypescript module */
interface PluginConfig {
  /**
   * Language Server TypeScript Plugin name
   */
  name?: string;
  /**
   * Path to transformer or transformer module name
   */
  transform?: string;

  /**
   * The optional name of the exported transform plugin in the transform module.
   */
  import?: string;

  /**
   * Plugin entry point format type, default is program
   */
  type?: 'ls' | 'program' | 'config' | 'checker' | 'raw' | 'compilerOptions';

  /**
   * Should transformer applied after all ones
   */
  after?: boolean;

  /**
   * Should transformer applied for d.ts files, supports from TS2.9
   */
  afterDeclarations?: boolean;
}

let lexicalEnvironmentFlags;

function setLexicalEnvironmentFlags(flags, value) {
  lexicalEnvironmentFlags = value ? lexicalEnvironmentFlags | flags : lexicalEnvironmentFlags & ~flags;
}

function getLexicalEnvironmentFlags() {
  return lexicalEnvironmentFlags;
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

const astTransformer = (program: ts.Program, config?: PluginConfig) => (context: ts.TransformationContext) => {
  return (sourceFile: ts.SourceFile) => {
    const empty = () => {};
    // Dummy transformation context
    const _context = context;
    _context.startLexicalEnvironment = empty;
    _context.suspendLexicalEnvironment = empty;
    _context.resumeLexicalEnvironment = empty;
    _context.endLexicalEnvironment = () => [];
    _context.getCompilerOptions = () => program.getCompilerOptions();
    _context.hoistFunctionDeclaration = empty;
    _context.hoistVariableDeclaration = empty;
    _context.readEmitHelpers = () => undefined;
    _context.requestEmitHelper = empty;
    _context.enableEmitNotification = empty;
    _context.enableSubstitution = empty;
    _context.isEmitNotificationEnabled = () => false;
    _context.isSubstitutionEnabled = () => false;
    _context.onEmitNode = empty;
    _context.onSubstituteNode = (hint, node) => node;

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
          let decoratorStaticNode: ts.Node = undefined;
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
          if (decoratorStaticNode) {
            const updatedClassNode = factory.updateClassDeclaration(
              node,
              undefined,
              node.modifiers,
              node.name,
              node.typeParameters,
              node.heritageClauses,
              node.members
            );
            const newText = `${decoratorStaticNode}`;
            console.log({ newText });
            // const _node = sourceFile.update(decoratorStaticNode.getFullText(), {
            //   newLength: decoratorStaticNode.getFullText().length,
            //   span: {
            //     start: node.getEnd(),
            //     length: decoratorStaticNode.getFullText().length
            //   }
            // });
            // console.log(_node.getText());
            return [ts.visitEachChild(updatedClassNode, visitor, _context), decoratorStaticNode];
          } else {
            return ts.visitEachChild(node, visitor, _context);
          }
        }
      }
      return ts.visitEachChild(node, visitor, _context);
    };

    const file = ts.visitNode(sourceFile, visitor);
    //ts.createSourceFile(file.fileName, file.getText())
    return file;
  };
};

export default astTransformer;
