import { inputStyle } from '@/lib/styles';
import { useEffect, useRef, useState } from 'react';

const normalizeText = (raw: string) =>
  raw
    .trim()
    .replace(/[a-zA-Z\u3041-\u3096\u30A1-\u30FA]/gi, '')
    .replaceAll(' ', '');

const InputTextForm = ({
  text,
  onChangeText,
}: {
  text: string;
  onChangeText: (text: string) => void;
}) => {
  const isComposing = useRef(false);
  const [inputValue, setInputValue] = useState(text);

  useEffect(() => {
    if (isComposing.current) return;
    setInputValue(text);
  }, [text]);

  const handleChangeText = (raw: string) => {
    setInputValue(raw);

    if (isComposing.current) return;

    const normalized = normalizeText(raw);
    setInputValue(normalized);

    if (normalized === text) return;
    onChangeText(normalized);
  };

  return (
    <form>
      <input
        className={inputStyle}
        value={inputValue}
        onChange={(event) => handleChangeText(event.target.value)}
        onCompositionStart={() => {
          isComposing.current = true;
        }}
        onCompositionEnd={(event) => {
          isComposing.current = false;
          handleChangeText(event.currentTarget.value);
        }}
        name='text'
        autoFocus
      />
    </form>
  );
};

export default InputTextForm;
