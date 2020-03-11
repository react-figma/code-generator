# [WIP] Figma Code Generator Plugin

### Pipeline

serialize figma node tree -> transform to AST (via @babel/types) -> transform to code (via @babel/generator)

### Possible variations

* `react-figma` code
  - Primitives based (View, Stylesheet, etc.)
  - More native (Rectangle, etc.)
* `react-native` code
* React web code
* Figma API code
