import React from 'react';

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  suffix?: string;
  prefix?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, suffix, prefix, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-slate-400">{label}</label>}
      <div className="relative flex items-center group">
        {prefix && (
          <span className="absolute left-3 text-slate-500 pointer-events-none select-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          className={`w-full bg-[#0f172a] rounded-xl border border-slate-700 px-4 py-3 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-9' : ''} ${className}`}
          placeholder="0"
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

export const TextInput: React.FC<NumberInputProps> = ({ label, className = '', ...props }) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && <label className="text-sm font-medium text-slate-400">{label}</label>}
        <div className="relative flex items-center">
          <input
            type="text"
            className={`w-full bg-[#0f172a] rounded-xl border border-slate-700 px-4 py-3 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all ${className}`}
            {...props}
          />
        </div>
      </div>
    );
  };