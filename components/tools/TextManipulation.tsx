
import React, { useState, useEffect } from 'react';
import { RefreshCw, Type, Copy, Check, ArrowDownAZ, ArrowRightLeft, AlignLeft, ArrowDown } from 'lucide-react';

type Mode = 'upper' | 'lower' | 'title' | 'sentence' | 'inverse' | 'alternating' | 'reverse' | 'normal';

export const CaseConverter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeMode, setActiveMode] = useState<Mode>('sentence'); // Default mode
  const [copied, setCopied] = useState(false);

  // Core transformation logic
  const processText = (text: string, mode: Mode): string => {
      if (!text) return '';
      switch (mode) {
          case 'upper': 
              return text.toUpperCase(); 
          case 'lower': 
              return text.toLowerCase(); 
          case 'title': 
              // Capitalize first letter of every word
              return text.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
          case 'sentence': 
              // Capitalize first letter of sentences
              return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w|\n\s*\w)/g, c => c.toUpperCase()); 
          case 'inverse':
              return text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
          case 'alternating':
              return text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
          case 'reverse':
              return text.split('').reverse().join('');
          case 'normal':
              return text;
          default:
              return text;
      }
  };

  // Real-time update when input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setInput(val);
      setOutput(processText(val, activeMode));
  };

  // Update output when mode changes
  const handleModeChange = (mode: Mode) => {
      setActiveMode(mode);
      setOutput(processText(input, mode));
  };

  const copyText = () => {
      if(!output) return;
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  // Stats
  const lineCount = input ? input.split(/\r\n|\r|\n/).length : 0;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
        {/* INPUT SECTION */}
        <div className="space-y-2">
            <div className="flex justify-between items-end px-1">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Văn bản đầu vào</label>
                <button 
                    onClick={() => { setInput(''); setOutput(''); }}
                    className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium transition-colors"
                >
                    <RefreshCw size={12} /> Xóa
                </button>
            </div>
            <div className="relative group">
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    className="w-full h-40 bg-white border border-slate-300 rounded-2xl p-4 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none shadow-sm placeholder:text-slate-400 text-base"
                    placeholder="Nhập văn bản của bạn vào đây..."
                ></textarea>
                
                {/* Stats Overlay */}
                <div className="absolute bottom-3 right-4 flex gap-3 text-xs font-medium text-slate-400 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-slate-100">
                    <span>{input.length} ký tự</span>
                    <span>{wordCount} từ</span>
                    <span>{lineCount} dòng</span>
                </div>
            </div>
        </div>

        {/* CONTROLS */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Chọn kiểu chuyển đổi</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button 
                    onClick={() => handleModeChange('sentence')} 
                    className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm border ${activeMode === 'sentence' ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}
                >
                    Viết hoa đầu câu
                </button>
                <button 
                    onClick={() => handleModeChange('lower')} 
                    className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm border lowercase ${activeMode === 'lower' ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}
                >
                    chữ thường
                </button>
                <button 
                    onClick={() => handleModeChange('upper')} 
                    className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm border uppercase ${activeMode === 'upper' ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}
                >
                    IN HOA
                </button>
                <button 
                    onClick={() => handleModeChange('title')} 
                    className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm border ${activeMode === 'title' ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}
                >
                    Viết Hoa Đầu Từ
                </button>
                <button 
                    onClick={() => handleModeChange('alternating')} 
                    className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm border ${activeMode === 'alternating' ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}
                >
                    kIểU xEn Kẽ
                </button>
                <button 
                    onClick={() => handleModeChange('inverse')} 
                    className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm border ${activeMode === 'inverse' ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}
                >
                    Đảo chiều (aBc)
                </button>
                <button 
                    onClick={() => handleModeChange('reverse')} 
                    className={`md:col-span-2 px-3 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm border flex items-center justify-center gap-2 ${activeMode === 'reverse' ? 'bg-purple-600 text-white border-purple-600 ring-2 ring-purple-200' : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-600'}`}
                >
                    <ArrowRightLeft size={16} /> Lật ngược (abc ➝ cba)
                </button>
            </div>
        </div>

        <div className="flex justify-center -my-2 text-slate-300">
            <ArrowDown size={24} />
        </div>

        {/* OUTPUT SECTION */}
        <div className="space-y-2">
            <label className="text-sm font-bold text-emerald-600 uppercase tracking-wider px-1">Kết quả</label>
            <div className="relative group">
                <textarea
                    readOnly
                    value={output}
                    className="w-full h-40 bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 text-slate-800 outline-none resize-none shadow-inner text-base"
                    placeholder="Kết quả sẽ hiện ở đây..."
                ></textarea>
                
                <div className="absolute bottom-4 right-4">
                    <button 
                        onClick={copyText} 
                        disabled={!output}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all shadow-md ${!output ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 transform hover:scale-105 active:scale-95'}`}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        <span>{copied ? 'Đã sao chép' : 'Sao chép kết quả'}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};
