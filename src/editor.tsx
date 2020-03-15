import * as React from "react";
import * as ReactDOM from "react-dom";
import MonacoEditor from "react-monaco-editor";
import { EditorLayout } from "./components/editor-layout/EditorLayout";
import { TypographyStyles, BaseStyles } from "figma-ui-components";

const App = () => {
  const [code, setCode] = React.useState("");
  const monacoRef = React.useRef();
  const options = {
    selectOnLineNumbers: true
  };

  React.useEffect(() => {
    const setCode = evt => {
      console.log("evt", evt);
      if (!evt.data) {
        return;
      }
      setCode(evt.data);

      if (!monacoRef.current) {
        return;
      }

      // @ts-ignore
      const model = monacoRef.current.editor.getModel();
      model.setValue(evt.data);
    };
    window.addEventListener("message", setCode, false);
    return () => window.removeEventListener("message", setCode, false);
  }, []);

  return (
    <>
      <BaseStyles />
      <TypographyStyles />
      <EditorLayout>
        <MonacoEditor
          ref={monacoRef}
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
