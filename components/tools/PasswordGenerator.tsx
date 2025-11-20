import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check, ShieldCheck, ShieldAlert } from 'lucide-react';
import { NumberInput } from '../ui/Input';

export const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') return;

    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateStrength = () => {
    let score = 0;
    if (length > 8) score++;
    if (length > 12) score++;
    if (includeUppercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    return score;
  };

  const strength = calculateStrength();
  const strengthColor = strength < 3 ? 'text-rose-400' : strength < 5 ? 'text-yellow-400' : 'text-emerald-400';
  const strengthText = strength < 3 ? 'Yếu' : strength < 5 ? 'Trung bình' : 'Mạnh';

  return (
    <div className="space-y-8">
       {/* Password Display */}
       <div className="relative group">
          <div className="w-full bg-[#0f172a] rounded-2xl border border-slate-800 p-6 text-center break-all">
             <span className="text-3xl font-mono font-bold text-white tracking-wider">{password}</span>
          </div>
          <button 
             onClick={copyToClipboard}
             className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
             title="Copy Password"
          >
             {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
       </div>

       {/* Strength Indicator */}
       <div className="flex items-center justify-center gap-3">
          {strength < 3 ? <ShieldAlert className={strengthColor} /> : <ShieldCheck className={strengthColor} />}
          <span className={`font-bold ${strengthColor}`}>Độ mạnh: {strengthText}</span>
          <div className="flex gap-1">
             {[...Array(5)].map((_, i) => (
               <div key={i} className={`w-8 h-2 rounded-full ${i < strength ? (strength < 3 ? 'bg-rose-500' : strength < 5 ? 'bg-yellow-500' : 'bg-emerald-500') : 'bg-slate-800'}`}></div>
             ))}
          </div>
       </div>

       {/* Controls */}
       <div className="bg-[#0f172a]/50 rounded-xl p-6 border border-slate-800">
         <div className="mb-6">
            <label className="text-slate-300 font-medium mb-2 block flex justify-between">
              <span>Độ dài mật khẩu</span>
              <span className="text-indigo-400 font-bold">{length}</span>
            </label>
            <input 
              type="range" 
              min="6" 
              max="32" 
              value={length} 
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
         </div>

         <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 rounded-lg bg-[#0f172a] border border-slate-700 cursor-pointer hover:border-slate-600 transition-all">
               <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} className="w-5 h-5 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-800" />
               <span className="text-slate-300">In hoa (A-Z)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg bg-[#0f172a] border border-slate-700 cursor-pointer hover:border-slate-600 transition-all">
               <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} className="w-5 h-5 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-800" />
               <span className="text-slate-300">Thường (a-z)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg bg-[#0f172a] border border-slate-700 cursor-pointer hover:border-slate-600 transition-all">
               <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="w-5 h-5 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-800" />
               <span className="text-slate-300">Số (0-9)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg bg-[#0f172a] border border-slate-700 cursor-pointer hover:border-slate-600 transition-all">
               <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="w-5 h-5 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-800" />
               <span className="text-slate-300">Ký tự đặc biệt</span>
            </label>
         </div>
       </div>

       <div className="flex justify-center">
          <button 
            onClick={generatePassword}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
          >
             <RefreshCw size={20} /> Tạo mật khẩu mới
          </button>
       </div>
    </div>
  );
};