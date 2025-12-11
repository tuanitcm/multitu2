
import React, { useState } from 'react';
import { RefreshCw, Type, AlignLeft, AlignCenter } from 'lucide-react';

export const WordCounter = () => {
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
    sentences: text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(x => x.trim().length > 0).length,
    paragraphs: text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(x => x.trim().length > 0).length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Từ</div>
          <div className="text-2xl font-bold text-blue-600">{stats.words}</div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Ký tự</div>
          <div className="text-2xl font-bold text-indigo-600">{stats.characters}</div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Câu</div>
          <div className="text-2xl font-bold text-sky-600">{stats.sentences}</div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Đoạn</div>
          <div className="text-2xl font-bold text-emerald-600">{stats.paragraphs}</div>
        </div>
      </div>

      <div className="relative">
        <textarea
          className="w-full h-64 bg-white rounded-xl border border-slate-300 p-4 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none shadow-sm"
          placeholder="Nhập hoặc dán văn bản của bạn vào đây..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="absolute bottom-4 right-4 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
           {text.length > 0 ? 'Đang nhập...' : 'Trống'}
        </div>
      </div>

      <div className="flex justify-end">
         <button 
           onClick={() => setText('')}
           className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors"
         >
           <RefreshCw size={16} /> Xóa văn bản
         </button>
      </div>
    </div>
  );
};
