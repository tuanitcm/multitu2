
import React, { useState, useEffect } from 'react';
import { TextInput, NumberInput } from '../ui/Input';
import { Palette, Copy, Check } from 'lucide-react';

export const ColorConverter = () => {
  const [hex, setHex] = useState('#3B82F6');
  const [r, setR] = useState('59');
  const [g, setG] = useState('130');
  const [b, setB] = useState('246');
  const [copied, setCopied] = useState<string | null>(null);

  const handleHexChange = (val: string) => {
      setHex(val);
      if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(val)) {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
          if (result) {
              setR(parseInt(result[1], 16).toString());
              setG(parseInt(result[2], 16).toString());
              setB(parseInt(result[3], 16).toString());
          }
      }
  };

  const handleRgbChange = (newR: string, newG: string, newB: string) => {
      setR(newR); setG(newG); setB(newB);
      const rVal = parseInt(newR) || 0;
      const gVal = parseInt(newG) || 0;
      const bVal = parseInt(newB) || 0;
      
      const toHex = (c: number) => {
          const hex = Math.max(0, Math.min(255, c)).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
      };
      
      setHex("#" + toHex(rVal) + toHex(gVal) + toHex(bVal));
  };

  const copyToClipboard = (text: string, label: string) => {
      navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Mã HEX</label>
                    <div className="flex gap-2">
                        <div className="flex-grow relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">#</span>
                            <input 
                                type="text" 
                                value={hex.replace('#','')} 
                                onChange={(e) => handleHexChange('#' + e.target.value)}
                                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-blue-500 outline-none font-mono uppercase"
                                maxLength={6}
                            />
                        </div>
                        <button 
                            onClick={() => copyToClipboard(hex, 'hex')}
                            className="p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors"
                        >
                            {copied === 'hex' ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Mã RGB</label>
                    <div className="flex gap-2 items-center">
                        <NumberInput value={r} onChange={(e) => handleRgbChange(e.target.value, g, b)} placeholder="R" min={0} max={255} />
                        <NumberInput value={g} onChange={(e) => handleRgbChange(r, e.target.value, b)} placeholder="G" min={0} max={255} />
                        <NumberInput value={b} onChange={(e) => handleRgbChange(r, g, e.target.value)} placeholder="B" min={0} max={255} />
                        <button 
                            onClick={() => copyToClipboard(`rgb(${r}, ${g}, ${b})`, 'rgb')}
                            className="p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors h-[50px] aspect-square flex items-center justify-center"
                        >
                            {copied === 'rgb' ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center">
                <div 
                    className="w-32 h-32 rounded-full shadow-lg border-4 border-white mb-4 transition-colors duration-200"
                    style={{ backgroundColor: hex }}
                ></div>
                <div className="text-center">
                    <div className="font-mono font-bold text-xl text-slate-800 uppercase">{hex}</div>
                    <div className="font-mono text-sm text-slate-500">rgb({r}, {g}, {b})</div>
                </div>
            </div>
        </div>
    </div>
  );
};
