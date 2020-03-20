# [WIP] Figma Code Generator Plugin

### Pipeline

* Serialize Figma node tree to plain JS-object snapshot
* Transform plain JS-object snapshot to AST (via [@babel/types](https://babeljs.io/docs/en/babel-types)) 
* Transform AST to code (via [@babel/generator](https://babeljs.io/docs/en/babel-generator))
* Format code (via [Prettier](https://prettier.io/))
* Show code with syntax highlighting (via [Monaco Editor](https://microsoft.github.io/monaco-editor/))

### Possible variations

* `react-figma` code
  - Primitives based (View, Stylesheet, etc.)
  - More native (Rectangle, etc.)
* `react-native` code
* React web code
* Figma API code
