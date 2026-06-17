import React from 'react';

interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'textarea';
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  min?: number;
}

export const FormInput: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  rows = 3,
  min,
}) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={String(value)}
          onChange={onChange}
          rows={rows}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value === 0 ? '' : String(value)}
          onChange={onChange}
          required={required}
          min={min}
        />
      )}
    </div>
  );
};
