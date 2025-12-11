
import React, { useState } from 'react';
import { NumberInput, TextInput } from '../ui/Input';
import { RefreshCw, Type, Sigma, ArrowDown } from 'lucide-react';

// ... (Helper functions readGroup, readNumberVietnamese, parseVietnameseText, toRoman, fromRoman remain unchanged)
const readGroup = (group: string) => {
  const digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  let [a, b, c] = group.split('').map(Number);
  let str = '';

  if (group.length === 1) return digits[Number(group)];
  if (group.length === 2) { b = Number(group[0]); c = Number(group[1]); a = -1; }

  if (a !== -1) {
      str += digits[a] + ' trăm ';
      if (b === 0 && c !== 0) str += 'lẻ ';
  }

  if (b === 1) str += 'mười ';
  else if (b > 1) str += digits[b] + ' mươi ';

  if (c === 1 && b > 1) str += 'mốt';
  else if (c === 5 && b !== 0) str += 'lăm';
  else if (c !== 0) str += digits[c];

  return str;
};

const readNumberVietnamese = (numberStr: string) => {
  if (!numberStr || isNaN(Number(numberStr))) return '';
  const cleanStr = BigInt(numberStr).toString();
  if (cleanStr === '0') return 'không';

  const groups = [];
  for (let i = cleanStr.length; i > 0; i -= 3) {
      groups.push(cleanStr.substring(Math.max(0, i - 3), i));
  }

  const scales = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];
  let result = [];

  for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const groupNum = parseInt(group);
      if (groupNum > 0) {
          let read = '';
          const d = group.padStart(3, '0');
          read = readGroup(d).trim();
          
          if (i === groups.length - 1 && read.startsWith('không trăm')) {
              read = read.replace('không trăm ', '');
              if (read.startsWith('lẻ ')) read = read.replace('lẻ ', '');
          }

          result.push(read + (scales[i] ? ' ' + scales[i] : ''));
      }
  }

  return result.reverse().join(' ').trim();
};

const toRoman = (num: number): string => {
  if (num < 1 || num > 3999) return 'Chỉ hỗ trợ 1 - 3999';
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let roman = '';
  let n = num;
  for (let i = 0; i < val.length; i++) {
      while (n >= val[i]) {
          n -= val[i];
          roman += syms[i];
      }
  }
  return roman;
};

const fromRoman = (str: string): number | null => {
  const s = str.toUpperCase();
  const map: {[key: string]: number} = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
  let res = 0;
  for (let i = 0; i < s.length; i++) {
      const v1 = map[s[i]];
      if (!v1) return null;
      const v2 = map[s[i+1]];
      if (v2 && v2 > v1) {
          res += v2 - v1;
          i++;
      } else {
          res += v1;
      }
  }
  return res;
};

export const NumberToWord = () => {
  const [val, setVal] = useState('');
  const result = readNumberVietnamese(val);

  return (
    <div className="space-y-6">
       <NumberInput 
         label="Nhập số (hỗ trợ số rất lớn)"
         value={val}
         onChange={(e) => setVal(e.target.value.replace(/[^0-9]/g, ''))}
         placeholder="VD: 1250000"
       />
       
       <div className="bg-white rounded-2xl p-6 border border-slate-200 min-h-[120px] flex items-center justify-center shadow-sm">
          {result ? (
              <p className="text-xl md:text-2xl font-medium text-blue-700 text-center capitalize leading-relaxed">
                  {result}
              </p>
          ) : (
              <span className="text-slate-400">Kết quả đọc số sẽ hiện tại đây</span>
          )}
       </div>
    </div>
  );
};

export const WordToNumber = () => {
    const [text, setText] = useState('');
    
    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-blue-800 text-sm">
                Công cụ chuyển đổi chữ số tiếng Việt sang số tự nhiên (Beta).
            </div>
            <TextInput 
                label="Nhập chữ số (VD: Một triệu hai trăm nghìn)"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="VD: một trăm năm mươi"
            />
             <div className="bg-white rounded-2xl p-6 border border-slate-200 min-h-[120px] flex items-center justify-center flex-col gap-2 shadow-sm">
                 <span className="text-slate-400 text-sm">Tính năng đang phát triển</span>
                 <div className="text-3xl font-bold text-slate-300">---</div>
             </div>
        </div>
    );
};

export const RomanConverter = () => {
  const [mode, setMode] = useState<'toRoman' | 'toNum'>('toRoman');
  const [input, setInput] = useState('');

  let result: string | number | null = '';
  if (input) {
      if (mode === 'toRoman') {
          result = toRoman(parseInt(input));
      } else {
          result = fromRoman(input) ?? "Không hợp lệ";
      }
  }

  return (
    <div className="space-y-6">
       <div className="flex gap-4 mb-4 p-1 bg-slate-100 rounded-xl">
          <button 
            onClick={() => { setMode('toRoman'); setInput(''); }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm ${mode === 'toRoman' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Số sang La Mã
          </button>
          <button 
            onClick={() => { setMode('toNum'); setInput(''); }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm ${mode === 'toNum' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            La Mã sang Số
          </button>
       </div>

       {mode === 'toRoman' ? (
           <NumberInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập số (1-3999)" />
       ) : (
           <TextInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập số La Mã (VD: MMXXIV)" />
       )}

       <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm">
           <div className="text-sm text-slate-500 uppercase tracking-wider mb-2">Kết quả</div>
           <div className="text-4xl font-bold font-serif text-slate-900">
               {result || '---'}
           </div>
       </div>
    </div>
  );
};
