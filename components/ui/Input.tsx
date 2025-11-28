import React from 'react';

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  suffix?: string;
  prefix?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, suffix, prefix, className = '', onChange, ...props }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow digits, one decimal point, and optional negative sign at the start
    if (val === '' || /^-?\d*\.?\d*$/.test(val)) {
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative flex items-center group">
        {prefix && (
          <span className="absolute left-3 text-slate-500 pointer-events-none select-none">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*"
          autoComplete="off"
          className={`w-full bg-white rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-9' : ''} ${className}`}
          placeholder="0"
          onChange={handleChange}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 text-slate-500 pointer-events-none select-none font-medium text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, className = '', ...props }) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
        <div className="relative flex items-center">
          <input
            type="text"
            className={`w-full bg-white rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all ${className}`}
            {...props}
          />
        </div>
      </div>
    );
  };