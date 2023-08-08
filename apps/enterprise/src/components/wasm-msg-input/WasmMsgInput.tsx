import { useId } from 'react';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-merbivore';
import styled from 'styled-components';
import { commonInputCSS } from 'lib/ui/inputs/TextInput';
import { InputWrapperWithErrorMessage } from 'lib/ui/inputs/InputWrapper';
import { getColor } from 'lib/ui/theme/getters';

interface WasmMsgInputProps {
  className?: string;
  label: string;
  error?: string;
  valid?: boolean;
  placeholder?: string;
  value?: string;
  onChange: (value?: string) => void;
}

const Wrapper = styled.div`
  .input {
    ${commonInputCSS};
  }

  .ace_placeholder {
    color: ${getColor('textSupporting')};
  }

  .ace_content {
    padding: 12px;
  }
`;

const WasmMsgInput = (props: WasmMsgInputProps) => {
  const { error, placeholder, value, onChange } = props;
  const editorId = useId();

  return (
    <InputWrapperWithErrorMessage label="Message" error={error}>
      <Wrapper isValid={!error}>
        <AceEditor
          placeholder={placeholder}
          fontSize={14}
          mode="json"
          onChange={onChange}
          name={editorId}
          wrapEnabled
          tabSize={2}
          showGutter={false}
          highlightActiveLine={false}
          showPrintMargin={false}
          editorProps={{ $renderValidationDecorations: true }}
          value={value}
          theme="merbivore"
          className="input"
        />
      </Wrapper>
    </InputWrapperWithErrorMessage>
  );
};

export { WasmMsgInput };
