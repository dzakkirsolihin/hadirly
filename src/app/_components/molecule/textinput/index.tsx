import React from "react";

interface TextInputProps {
  name: string;
  label: React.ReactNode;
  placeholder?: string;
  value?: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput(props: Readonly<TextInputProps>) {
  const { name, label, placeholder, value, type, onChange } = props;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[var(--foreground)] font-semibold text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-[var(--disable)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] px-4 py-3 w-full rounded-xl placeholder:text-[var(--disable)] placeholder:font-light text-sm bg-transparent text-[var(--foreground)] transition-all"
      />
    </div>
  );
}

export default TextInput;
