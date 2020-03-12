import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EditorContainer = styled.div`
  width: 100%;
  flex: 1;
`;

export const EditorLayout = props => {
  const { children, panel } = props;
  return (
    <Container>
      <EditorContainer>{children}</EditorContainer>
    </Container>
  );
};
