import * as React from "react";
import * as ReactDOM from "react-dom";
import MonacoEditor from "react-monaco-editor";
import { EditorLayout } from "./components/editor-layout/EditorLayout";
import { TypographyStyles, BaseStyles } from "figma-ui-components";

const App = () => {
  const [code, setCode] = React.useState("");
  const options = {
    selectOnLineNumbers: true
  };

  return (
    <>
      <BaseStyles />
      <TypographyStyles />
      <EditorLayout>
        <MonacoEditor
          width="100%"
          height="360px"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={newValue => setCode(newValue)}
          editorDidMount={editor => {
            editor.focus();
          }}
        />
      </EditorLayout>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
