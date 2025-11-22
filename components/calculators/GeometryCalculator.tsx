
import React, { useState, useMemo, useEffect } from 'react';
import { NumberInput } from '../ui/Input';
import { Box, Circle, Square, Triangle, Cylinder, Cuboid, Globe } from 'lucide-react';

type Shape = 'rectangle' | 'square' | 'circle' | 'triangle' | 'cube' | 'box' | 'cylinder' | 'sphere';
type Mode = 'area' | 'perimeter' | 'volume';

interface GeometryCalculatorProps {
    defaultShape?: Shape;
    defaultMode?: Mode;
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 4 }).format(num);
};

export const GeometryCalculator: React.FC<GeometryCalculatorProps> = ({ defaultShape = 'rectangle', defaultMode = 'area' }) => {
  const [shape, setShape] = useState<Shape>(defaultShape);
  const [mode, setMode] = useState<Mode>(defaultMode);
  
  // Inputs
  const [val1, setVal1] = useState<string>(''); // a / radius / base
  const [val2, setVal2] = useState<string>(''); // b / height
  const [val3, setVal3] = useState<string>(''); // c / length / height (3d)

  useEffect(() => {
      if (shape === 'cube' || shape === 'box' || shape === 'cylinder' || shape === 'sphere') {
          setMode('volume');
      } else {
          if (mode === 'volume') setMode('area');
      }
  }, [shape]);

  const handleReset = () => {
    setVal1('');
    setVal2('');
    setVal3('');
  };

  // Calculate Result
  const result = useMemo(() => {
    const v1 = parseFloat(val1); // a or r or base
    const v2 = parseFloat(val2); // b or h
    const v3 = parseFloat(val3); // c or h (3d) or width

    if (isNaN(v1)) return null;

    switch (shape) {
      case 'square': // v1 = side
        if (mode === 'area') return v1 * v1;
        if (mode === 'perimeter') return 4 * v1;
        break;
      case 'rectangle': // v1 = length, v2 = width
        if (isNaN(v2)) return null;
        if (mode === 'area') return v1 * v2;
        if (mode === 'perimeter') return 2 * (v1 + v2);
        break;
      case 'circle': // v1 = radius
        if (mode === 'area') return Math.PI * v1 * v1;
        if (mode === 'perimeter') return 2 * Math.PI * v1;
        break;
      case 'triangle': // v1 = base, v2 = height (for area), v1,v2,v3 for perimeter
        if (mode === 'area') {
             if (isNaN(v2)) return null;
             return 0.5 * v1 * v2;
        }
        if (mode === 'perimeter') {
            if (isNaN(v2) || isNaN(v3)) return null;
            return v1 + v2 + v3;
        }
        break;
      case 'cube': // v1 = side
        return Math.pow(v1, 3);
      case 'box': // v1 = l, v2 = w, v3 = h
        if (isNaN(v2) || isNaN(v3)) return null;
        return v1 * v2 * v3;
      case 'cylinder': // v1 = r, v2 = h
        if (isNaN(v2)) return null;
        return Math.PI * v1 * v1 * v2;
      case 'sphere': // v1 = r
        return (4/3) * Math.PI * Math.pow(v1, 3);
    }
    return null;
  }, [shape, mode, val1, val2, val3]);

  // Get Formula Text
  const getFormula = () => {
    if (shape === 'square') return mode === 'area' ? 'S = a²' : 'P = 4a';
    if (shape === 'rectangle') return mode === 'area' ? 'S = a × b' : 'P = 2(a + b)';
    if (shape === 'circle') return mode === 'area' ? 'S = πr²' : 'C = 2πr';
    if (shape === 'triangle') return mode === 'area' ? 'S = ½ × h × b' : 'P = a + b + c';
    if (shape === 'cube') return 'V = a³';
    if (shape === 'box') return 'V = l × w × h';
    if (shape === 'cylinder') return 'V = πr²h';
    if (shape === 'sphere') return 'V = ⁴⁄₃πr³';
    return '';
  };

  const is3D = ['cube', 'box', 'cylinder', 'sphere'].includes(shape);

  return (
    <div className="space-y-8">
      {/* Shape Selector */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {[
            { id: 'rectangle', icon: <Box size={20} />, label: 'CN' },
            { id: 'square', icon: <Square size={20} />, label: 'Vuông' },
            { id: 'circle', icon: <Circle size={20} />, label: 'Tròn' },
            { id: 'triangle', icon: <Triangle size={20} />, label: 'T.Giác' },
            { id: 'cube', icon: <Cuboid size={20} />, label: 'Lập P.' },
            { id: 'box', icon: <Box size={20} />, label: 'Hộp' },
            { id: 'cylinder', icon: <Cylinder size={20} />, label: 'Trụ' },
            { id: 'sphere', icon: <Globe size={20} />, label: 'Cầu' },
        ].map((item) => (
            <button
            key={item.id}
            onClick={() => { setShape(item.id as Shape); handleReset(); }}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                shape === item.id
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                : 'bg-[#0f172a] border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
            title={item.label}
            >
            {item.icon}
            <span className="text-[10px] font-bold uppercase">{item.label}</span>
            </button>
        ))}
      </div>

      {/* Mode Selector */}
      {!is3D && (
          <div className="bg-slate-800/50 p-1 rounded-lg flex">
            <button
            onClick={() => setMode('area')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === 'area' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
            >
            Diện Tích
            </button>
            <button
            onClick={() => setMode('perimeter')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === 'perimeter' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
            >
            Chu Vi
            </button>
        </div>
      )}
      {is3D && (
          <div className="text-center text-sm text-indigo-400 font-medium uppercase tracking-wider bg-indigo-500/10 py-2 rounded-lg border border-indigo-500/20">
              Tính Thể Tích
          </div>
      )}

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {shape === 'rectangle' && (
          <>
            <NumberInput label="Chiều dài (a)" value={val1} onChange={(e) => setVal1(e.target.value)} />
            <NumberInput label="Chiều rộng (b)" value={val2} onChange={(e) => setVal2(e.target.value)} />
          </>
        )}
        {shape === 'square' && (
          <NumberInput label="Cạnh (a)" value={val1} onChange={(e) => setVal1(e.target.value)} />
        )}
        {shape === 'circle' && (
          <NumberInput label="Bán kính (r)" value={val1} onChange={(e) => setVal1(e.target.value)} />
        )}
        {shape === 'triangle' && mode === 'area' && (
            <>
            <NumberInput label="Cạnh đáy (b)" value={val1} onChange={(e) => setVal1(e.target.value)} />
            <NumberInput label="Chiều cao (h)" value={val2} onChange={(e) => setVal2(e.target.value)} />
            </>
        )}
        {shape === 'triangle' && mode === 'perimeter' && (
            <>
            <NumberInput label="Cạnh 1 (a)" value={val1} onChange={(e) => setVal1(e.target.value)} />
            <NumberInput label="Cạnh 2 (b)" value={val2} onChange={(e) => setVal2(e.target.value)} />
            <NumberInput label="Cạnh 3 (c)" value={val3} onChange={(e) => setVal3(e.target.value)} />
            </>
        )}
        {shape === 'cube' && (
             <NumberInput label="Cạnh (a)" value={val1} onChange={(e) => setVal1(e.target.value)} />
        )}
        {shape === 'box' && (
            <>
            <NumberInput label="Chiều dài (l)" value={val1} onChange={(e) => setVal1(e.target.value)} />
            <NumberInput label="Chiều rộng (w)" value={val2} onChange={(e) => setVal2(e.target.value)} />
            <NumberInput label="Chiều cao (h)" value={val3} onChange={(e) => setVal3(e.target.value)} />
            </>
        )}
        {shape === 'cylinder' && (
            <>
            <NumberInput label="Bán kính đáy (r)" value={val1} onChange={(e) => setVal1(e.target.value)} />
            <NumberInput label="Chiều cao (h)" value={val2} onChange={(e) => setVal2(e.target.value)} />
            </>
        )}
        {shape === 'sphere' && (
            <NumberInput label="Bán kính (r)" value={val1} onChange={(e) => setVal1(e.target.value)} />
        )}
      </div>

      {/* Result */}
      <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {result !== null ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-medium mb-2 block uppercase tracking-wider">
                {mode === 'area' ? 'Diện tích' : mode === 'perimeter' ? 'Chu vi' : 'Thể tích'}
              </span>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-3">
                {formatNumber(result)}
              </div>
              <div className="text-xs text-slate-400 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700 inline-block font-mono">
                {getFormula()}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-600 gap-3 relative z-10">
              <Square size={32} className="opacity-50" />
              <span className="text-sm">Nhập thông số để tính toán</span>
            </div>
          )}
      </div>
    </div>
  );
};
