
import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Copy, Check } from 'lucide-react';
import * as base32Pkg from 'hi-base32';
import * as baseXPkg from 'base-x';
import * as punycodePkg from 'punycode';
import * as ascii85Pkg from 'ascii85';

const base32 = (base32Pkg as any).default || base32Pkg;
const baseX = (baseXPkg as any).default || baseXPkg;
const punycode = (punycodePkg as any).default || punycodePkg;
const ascii85 = (ascii85Pkg as any).default || ascii85Pkg;

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const bs58 = baseX(BASE58_ALPHABET);

type EncoderType = 'rot13' | 'rot47' | 'punycode' | 'base32' | 'base58' | 'ascii85' | 'utf8' | 'utf16' | 'uu' | 'base64';
type Direction = 'encode' | 'decode';

interface EncoderProps {
  type: EncoderType;
  defaultDirection?: Direction;
}

export const Encoders: React.FC<EncoderProps> = ({ type, defaultDirection = 'encode' }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [direction, setDirection] = useState<Direction>(defaultDirection);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, function (char) {
        const code = char.charCodeAt(0);
        const limit = char <= 'Z' ? 90 : 122;
        let newCode = code + 13;
        if (newCode > limit) newCode -= 26;
        return String.fromCharCode(newCode);
    });
  };

  const rot47 = (str: string) => {
    let s = [];
    for (let i = 0; i < str.length; i++) {
      let j = str.charCodeAt(i);
      if ((j >= 33) && (j <= 126)) {
        s[i] = String.fromCharCode(33 + ((j + 14) % 94));
      } else {
        s[i] = String.fromCharCode(j);
      }
    }
    return s.join('');
  };

  const process = () => {
    setError(null);
    if (!input) {
        setOutput('');
        return;
    }

    try {
        let res = '';
        if (type === 'rot13') {
            res = rot13(input);
        } else if (type === 'rot47') {
            res = rot47(input);
        } else if (type === 'punycode') {
            if (direction === 'encode') res = punycode.encode(input);
            else res = punycode.decode(input);
        } else if (type === 'base32') {
            if (direction === 'encode') res = base32.encode(input);
            else res = base32.decode(input);
        } else if (type === 'base58') {
             if (direction === 'encode') {
                 const encoder = new TextEncoder();
                 res = bs58.encode(encoder.encode(input));
             } else {
                 const bytes = bs58.decode(input);
                 const decoder = new TextDecoder();
                 res = decoder.decode(bytes);
             }
        } else if (type === 'ascii85') {
             if (direction === 'encode') res = ascii85.encode(input).toString();
             else res = ascii85.decode(input).toString();
        } else if (type === 'base64') {
             if (direction === 'encode') {
                 res = btoa(encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, 
                    function toSolidBytes(match, p1) {
                        return String.fromCharCode(parseInt(p1, 16));
                 }));
             } else {
                 res = decodeURIComponent(atob(input).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                 }).join(''));
             }
        } else if (type === 'utf8') {
             if (direction === 'encode') {
                const encoder = new TextEncoder();
                res = Array.from(encoder.encode(input)).map(b => '\\x' + b.toString(16).padStart(2,'0')).join('');
             } else {
                const hexString = input.replace(/\\x/g, '');
                const bytes = new Uint8Array(hexString.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
                res = new TextDecoder().decode(bytes);
             }
        } else if (type === 'utf16') {
             if (direction === 'encode') {
                let arr = [];
                for(let i=0; i<input.length; i++) {
                    arr.push('\\u' + input.charCodeAt(i).toString(16).padStart(4,'0'));
                }
                res = arr.join('');
             } else {
                res = JSON.parse(`"${input}"`);
             }
        } else if (type === 'uu') {
            throw new Error("Chức năng đang bảo trì");
        }

        setOutput(res);
    } catch (e: any) {
        console.error(e);
        setError("Lỗi xử lý: " + (e.message || "Dữ liệu đầu vào không hợp lệ"));
    }
  };

  useEffect(() => {
      const timer = setTimeout(process, 500);
      return () => clearTimeout(timer);
  }, [input, direction]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
       <div className="flex bg-slate-100 p-1 rounded-xl w-fit mx-auto mb-6">
          <button 
             onClick={() => { setDirection('encode'); setInput(''); setOutput(''); }}
             className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${direction === 'encode' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
             Mã hóa (Encode)
          </button>
          <button 
             onClick={() => { setDirection('decode'); setInput(''); setOutput(''); }}
             className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${direction === 'decode' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
             Giải mã (Decode)
          </button>
       </div>

       <div className="grid gap-6">
          <div className="space-y-2">
             <label className="text-sm font-semibold text-slate-700">
                {direction === 'encode' ? 'Văn bản gốc' : 'Chuỗi đã mã hóa'}
             </label>
             <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-white rounded-xl border border-slate-300 p-4 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none font-mono text-sm shadow-sm"
                placeholder={direction === 'encode' ? "Nhập nội dung..." : "Dán mã vào đây..."}
             />
          </div>

          <div className="flex justify-center">
             <div className="bg-slate-100 rounded-full p-2 text-slate-400 border border-slate-200">
                <ArrowDownUp size={20} />
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-semibold text-slate-700">
                {direction === 'encode' ? 'Kết quả mã hóa' : 'Kết quả giải mã'}
             </label>
             <div className="relative group">
                <textarea
                    readOnly
                    value={error || output}
                    className={`w-full h-32 bg-slate-50 rounded-xl border p-4 outline-none transition-all resize-none font-mono text-sm ${error ? 'border-rose-300 text-rose-600 bg-rose-50' : 'border-slate-200 text-slate-800'}`}
                    placeholder="..."
                />
                {!error && output && (
                    <button 
                        onClick={copyToClipboard}
                        className="absolute bottom-4 right-4 p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 transition-colors shadow-sm"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                )}
             </div>
          </div>
       </div>
    </div>
  );
};
