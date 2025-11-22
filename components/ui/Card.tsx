import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, icon, action }) => {
  return (
    <div className={`bg-[#1e293b]/50 border border-slate-700/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl ${className}`}>
      {(title || icon) && (
        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/20">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="text-indigo-400">
                {icon}
              </div>
            )}
            {title && <h3 className="font-bold text-lg text-slate-100">{title}</h3>}
          </div>
          {action}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};