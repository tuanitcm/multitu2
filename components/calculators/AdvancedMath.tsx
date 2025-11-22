
import React, { useState } from 'react';
import { NumberInput, TextInput } from '../ui/Input';
import { Calculator, RefreshCw, FunctionSquare, Triangle, Divide } from 'lucide-react';

// --- LOGARITHM CALCULATOR ---
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
            <div className="bg-[#0f172a] p-6 rounded-2xl border border-slate-800 text-center">
                 <div className="text-slate-500 text-xs uppercase font-bold mb-2">Kết quả Logarit</div>
                 <div className="text-4xl font-bold text-purple-400">
                     {res !== null ? Number(res.toFixed(6)) : '---'}
                 </div>
                 <div className="text-slate-500 text-xs mt-2 font-mono">log({base}) of {num}</div>
            </div>
        </div>
    );
};

// --- TRIGONOMETRY CALCULATOR ---
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
                <div className="w-24 pb-3">
                    <select value={unit} onChange={(e) => setUnit(e.target.value as any)} className="bg-[#0f172a] border border-slate-700 text-slate-200 rounded-xl px-3 py-3 w-full outline-none">
                        <option value="deg">Độ (°)</option>
                        <option value="rad">Rad</option>
                    </select>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 text-center">
                    <span className="text-slate-500 text-xs font-bold block mb-1">sin</span>
                    <span className="text-xl font-bold text-indigo-400">{valid ? format(Math.sin(rad)) : '-'}</span>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 text-center">
                    <span className="text-slate-500 text-xs font-bold block mb-1">cos</span>
                    <span className="text-xl font-bold text-indigo-400">{valid ? format(Math.cos(rad)) : '-'}</span>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 text-center">
                    <span className="text-slate-500 text-xs font-bold block mb-1">tan</span>
                    <span className="text-xl font-bold text-indigo-400">{valid ? (Math.abs(Math.tan(rad)) > 1e10 ? '∞' : format(Math.tan(rad))) : '-'}</span>
                </div>
            </div>
        </div>
    );
};

// --- SIMPLE POLYNOMIAL CALCULUS ---
export const CalculusCalculator = () => {
    const [mode, setMode] = useState<'derivative' | 'integral'>('derivative');
    const [a, setA] = useState('');
    const [n, setN] = useState('');
    
    // Simple Model: y = ax^n
    const coef = parseFloat(a);
    const pow = parseFloat(n);
    const valid = !isNaN(coef) && !isNaN(pow);

    let result = '';
    if (valid) {
        if (mode === 'derivative') {
            // y' = n*a*x^(n-1)
            if (pow === 0) result = '0';
            else {
                const newCoef = coef * pow;
                const newPow = pow - 1;
                if (newPow === 0) result = `${newCoef}`;
                else if (newPow === 1) result = `${newCoef}x`;
                else result = `${newCoef}x^${newPow}`;
            }
        } else {
            // I = (a/(n+1))x^(n+1) + C
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
            <div className="bg-slate-800/50 p-3 rounded-lg text-sm text-slate-300">
                Công cụ tính đơn giản cho hàm lũy thừa: <strong>f(x) = axⁿ</strong>
            </div>
            <div className="flex bg-slate-800/50 p-1 rounded-xl mb-4">
                <button onClick={() => setMode('derivative')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode === 'derivative' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Đạo hàm</button>
                <button onClick={() => setMode('integral')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode === 'integral' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Nguyên hàm</button>
            </div>

            <div className="flex gap-4">
                 <NumberInput label="Hệ số (a)" value={a} onChange={(e) => setA(e.target.value)} placeholder="VD: 3" />
                 <NumberInput label="Số mũ (n)" value={n} onChange={(e) => setN(e.target.value)} placeholder="VD: 2" />
            </div>

            <div className="bg-[#0f172a] p-6 rounded-2xl border border-slate-800 text-center">
                 <div className="text-slate-500 text-xs uppercase font-bold mb-2">Kết quả ({mode === 'derivative' ? "f'(x)" : 'F(x)'})</div>
                 <div className="text-3xl font-bold text-amber-400 font-mono">
                     {result || '---'}
                 </div>
                 <div className="text-slate-500 text-xs mt-2">
                     Hàm gốc: {valid ? `${a}x^${n}` : 'axⁿ'}
                 </div>
            </div>
         </div>
    );
};
