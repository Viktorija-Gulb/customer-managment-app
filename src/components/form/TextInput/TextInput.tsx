import React from 'react';
import './TextInput.scss';

interface Props {
  id: string;
  label: string;
  nameAttr: string;
  value: string;
  onChange: (e: any) => void;
}

const TextInput: React.FC<Props> = ({ label, id, nameAttr, value, onChange }: Props) => (
  <label htmlFor={id} className="field">
    {label}
    <input
      type="text"
      id={id}
      name={nameAttr}
      className="field__input"
      value={value}
      onChange={onChange}
    />
  </label>
);

export default TextInput;
