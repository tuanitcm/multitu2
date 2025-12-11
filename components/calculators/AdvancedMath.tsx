
import React, { useState } from 'react';
import { NumberInput, TextInput } from '../ui/Input';
import { Calculator, RefreshCw, SquareFunction, Triangle, Divide } from 'lucide-react';

export const LogarithmCalculator = () => {
    const [base, setBase] = useState('');
    const [num, setNum] = useState('');

    const b = parseFloat(base);
    const x = parseFloat(num);
    
    let res = null;
    if (!isNaN(b) && !isNaN(x) && b > 0 && b !== 1 && x > 0) {
        res = Math.log(x) / Math.log(b);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-end gap-4">
                <div className="w-1/3">
                    <NumberInput label="Cơ số (b)" value={base} onChange={(e) => setBase(e.target.value)} placeholder="VD: 2" />
                </div>
                <div className="w-2/3">
                    <NumberInput label="Số cần tính (x)" value={num} onChange={(e) => setNum(e.target.value)} placeholder="VD: 8" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
                 <div className="text-slate-500 text-xs uppercase font-bold mb-2">Kết quả Logarit</div>
                 <div className="text-4xl font-bold text-purple-600">
                     {res !== null ? Number(res.toFixed(6)) : '---'}
                 </div>
                 <div className="text-slate-500 text-xs mt-2 font-mono">log({base}) of {num}</div>
            </div>
        </div>
    );
};

export const TrigCalculator = () => {
    const [angle, setAngle] = useState('');
    const [unit, setUnit] = useState<'deg' | 'rad'>('deg');
    
    const val = parseFloat(angle);
    const rad = unit === 'deg' ? (val * Math.PI) / 180 : val;
    const valid = !isNaN(val);

    const format = (n: number) => Number(n.toFixed(6));

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-end">
                <div className="flex-grow">
                    <NumberInput label="Góc" value={angle} onChange={(e) => setAngle(e.target.value)} placeholder={unit === 'deg' ? "VD: 45" : "VD: 1.57"} />
                </div>
                <div className="w-28 pb-3">
                    <div className="relative">
                        <select value={unit} onChange={(e) => setUnit(e.target.value as any)} className="bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-3 w-full outline-none appearance-none font-medium">
                            <option value="deg">Độ (°)</option>
                            <option value="rad">Rad</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                    <span className="text-slate-500 text-xs font-bold block mb-1">sin</span>
                    <span className="text-xl font-bold text-blue-600">{valid ? format(Math.sin(rad)) : '-'}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                    <span className="text-slate-500 text-xs font-bold block mb-1">cos</span>
                    <span className="text-xl font-bold text-indigo-600">{valid ? format(Math.cos(rad)) : '-'}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                    <span className="text-slate-500 text-xs font-bold block mb-1">tan</span>
                    <span className="text-xl font-bold text-violet-600">{valid ? (Math.abs(Math.tan(rad)) > 1e10 ? '∞' : format(Math.tan(rad))) : '-'}</span>
                </div>
            </div>
        </div>
    );
};

export const CalculusCalculator = () => {
    const [mode, setMode] = useState<'derivative' | 'integral'>('derivative');
    const [a, setA] = useState('');
    const [n, setN] = useState('');
    
    const coef = parseFloat(a);
    const pow = parseFloat(n);
    const valid = !isNaN(coef) && !isNaN(pow);

    let result = '';
    if (valid) {
        if (mode === 'derivative') {
            if (pow === 0) result = '0';
            else {
                const newCoef = coef * pow;
                const newPow = pow - 1;
                if (newPow === 0) result = `${newCoef}`;
                else if (newPow === 1) result = `${newCoef}x`;
                else result = `${newCoef}x^${newPow}`;
            }
        } else {
            if (pow === -1) {
                result = `${coef}ln|x| + C`;
            } else {
                const newCoef = coef / (pow + 1);
                const newPow = pow + 1;
                const formattedCoef = Number.isInteger(newCoef) ? newCoef : `(${coef}/${pow + 1})`;
                result = `${formattedCoef}x^${newPow} + C`;
            }
        }
    }

    return (
         <div className="space-y-6">
            <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 border border-slate-200">
                Công cụ tính đơn giản cho hàm lũy thừa: <strong>f(x) = axⁿ</strong>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                <button onClick={() => setMode('derivative')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'derivative' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Đạo hàm</button>
                <button onClick={() => setMode('integral')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'integral' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Nguyên hàm</button>
            </div>

            <div className="flex gap-4">
                 <NumberInput label="Hệ số (a)" value={a} onChange={(e) => setA(e.target.value)} placeholder="VD: 3" />
                 <NumberInput label="Số mũ (n)" value={n} onChange={(e) => setN(e.target.value)} placeholder="VD: 2" />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
                 <div className="text-slate-500 text-xs uppercase font-bold mb-2">Kết quả ({mode === 'derivative' ? "f'(x)" : 'F(x)'})</div>
                 <div className="text-3xl font-bold text-amber-500 font-mono">
                     {result || '---'}
                 </div>
                 <div className="text-slate-500 text-xs mt-2">
                     Hàm gốc: {valid ? `${a}x^${n}` : 'axⁿ'}
                 </div>
            </div>
         </div>
    );
};
