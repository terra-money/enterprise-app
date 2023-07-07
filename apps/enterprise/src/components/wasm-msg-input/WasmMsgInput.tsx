import classNames from 'classnames';
import styles from './WasmMsgInput.module.sass';
import { useId, useRef, useState } from 'react';
import { Text } from 'components/primitives';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-merbivore';
import { useOnClickOutside } from 'usehooks-ts';

interface WasmMsgInputProps {
  className?: string;
  label: string;
  error?: string;
  valid?: boolean;
  placeholder?: string;
  value?: string;
  onChange: (value?: string) => void;
}

const WasmMsgInput = (props: WasmMsgInputProps) => {
  const { className, label, error, placeholder, value, onChange } = props;
  const inputContainerRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const editorId = useId();

  const containerRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(containerRef, () => setFocused(false));

  return (
    <div ref={containerRef} className={styles.root}>
      <Text variant="text" className={styles.label}>
        {label ?? 'Message'}
      </Text>

      <div
        className={classNames(
          styles.editor_container,
          {
            [styles.editor_container_with_error]: !!error,
          },
          className
        )}
        ref={inputContainerRef}
      >
        {!focused && !value && (
          <Text variant={'label'} className={styles.placeholder}>
            {placeholder ?? 'Type a message'}
          </Text>
        )}
        <AceEditor
          fontSize={14}
          onFocus={() => setFocused(true)}
          className={styles.editor}
          mode="json"
          theme="merbivore"
          onChange={onChange}
          name={editorId}
          wrapEnabled
          tabSize={2}
          showGutter={false}
          highlightActiveLine={false}
          showPrintMargin={false}
          editorProps={{ $renderValidationDecorations: true }}
          value={value}
        />
      </div>

      <Text variant={'text'} className={styles.warning}>
        {error}
      </Text>
    </div>
  );
};

export { WasmMsgInput };
