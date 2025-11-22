
import React, { useState, useMemo, useEffect } from 'react';
import { NumberInput } from '../ui/Input';
import { Box, Circle, Square, Triangle, Cylinder, Cuboid, Globe, Cone, Diamond, RectangleHorizontal, Component } from 'lucide-react';

type Shape = 'rectangle' | 'square' | 'circle' | 'triangle' | 'trapezoid' | 'rhombus' | 'parallelogram' | 'cube' | 'box' | 'cylinder' | 'sphere' | 'cone';
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
  
  // Inputs (Unified state for up to 4 parameters)
  const [val1, setVal1] = useState<string>(''); 
  const [val2, setVal2] = useState<string>(''); 
  const [val3, setVal3] = useState<string>(''); 
  const [val4, setVal4] = useState<string>('');

  const is3D = ['cube', 'box', 'cylinder', 'sphere', 'cone'].includes(shape);

  // Auto-switch mode when changing between 2D and 3D
  useEffect(() => {
      if (is3D) {
          setMode('volume');
      } else {
          if (mode === 'volume') setMode('area');
      }
      handleReset();
  }, [shape]);

  const handleReset = () => {
    setVal1('');
    setVal2('');
    setVal3('');
    setVal4('');
  };

  // Calculate Result
  const result = useMemo(() => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    const v3 = parseFloat(val3);
    const v4 = parseFloat(val4);

    if (isNaN(v1)) return null;

    switch (shape) {
      // --- 2D SHAPES ---
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
      
      case 'triangle': 
        // Area: v1=base, v2=height
        // Perimeter: v1=a, v2=b, v3=c
        if (mode === 'area') {
             if (isNaN(v2)) return null;
             return 0.5 * v1 * v2;
        }
        if (mode === 'perimeter') {
            if (isNaN(v2) || isNaN(v3)) return null;
            return v1 + v2 + v3;
        }
        break;

      case 'trapezoid': // Hình thang
        // Area: v1=base1(a), v2=base2(b), v3=height(h) -> S = (a+b)/2 * h
        // Perimeter: v1=a, v2=b, v3=c, v4=d -> P = a+b+c+d
        if (mode === 'area') {
            if (isNaN(v2) || isNaN(v3)) return null;
            return ((v1 + v2) / 2) * v3;
        }
        if (mode === 'perimeter') {
            if (isNaN(v2) || isNaN(v3) || isNaN(v4)) return null;
            return v1 + v2 + v3 + v4;
        }
        break;

      case 'rhombus': // Hình thoi
        // Area: v1=d1, v2=d2 -> S = 1/2 * d1 * d2
        // Perimeter: v1=side -> P = 4a
        if (mode === 'area') {
            if (isNaN(v2)) return null;
            return 0.5 * v1 * v2;
        }
        if (mode === 'perimeter') {
            return 4 * v1;
        }
        break;

      case 'parallelogram': // Hình bình hành
        // Area: v1=base, v2=height -> S = b*h
        // Perimeter: v1=a, v2=b -> P = 2(a+b)
        if (isNaN(v2)) return null;
        if (mode === 'area') return v1 * v2;
        if (mode === 'perimeter') return 2 * (v1 + v2);
        break;

      // --- 3D SHAPES ---
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

      case 'cone': // Hình nón: v1 = r, v2 = h -> V = 1/3 * pi * r^2 * h
        if (isNaN(v2)) return null;
        return (1/3) * Math.PI * v1 * v1 * v2;
    }
    return null;
  }, [shape, mode, val1, val2, val3, val4]);

  // Get Formula Text
  const getFormula = () => {
    if (shape === 'square') return mode === 'area' ? 'S = a²' : 'P = 4a';
    if (shape === 'rectangle') return mode === 'area' ? 'S = a × b' : 'P = 2(a + b)';
    if (shape === 'circle') return mode === 'area' ? 'S = πr²' : 'C = 2πr';
    if (shape === 'triangle') return mode === 'area' ? 'S = ½bh' : 'P = a + b + c';
    if (shape === 'trapezoid') return mode === 'area' ? 'S = ½(a + b)h' : 'P = a + b + c + d';
    if (shape === 'rhombus') return mode === 'area' ? 'S = ½(d₁d₂)' : 'P = 4a';
    if (shape === 'parallelogram') return mode === 'area' ? 'S = b × h' : 'P = 2(a + b)';
    
    if (shape === 'cube') return 'V = a³';
    if (shape === 'box') return 'V = l × w × h';
    if (shape === 'cylinder') return 'V = πr²h';
    if (shape === 'sphere') return 'V = ⁴⁄₃πr³';
    if (shape === 'cone') return 'V = ⅓πr²h';
    return '';
  };

  return (
    <div className="space-y-8">
      {/* Shape Selector */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
        {[
            { id: 'square', icon: <Square size={18} />, label: 'Vuông' },
            { id: 'rectangle', icon: <RectangleHorizontal size={18} />, label: 'CN' },
            { id: 'circle', icon: <Circle size={18} />, label: 'Tròn' },
            { id: 'triangle', icon: <Triangle size={18} />, label: 'Tam giác' },
            { id: 'trapezoid', icon: <Component size={18} />, label: 'Thang' },
            { id: 'rhombus', icon: <Diamond size={18} />, label: 'Thoi' },
            { id: 'parallelogram', icon: <RectangleHorizontal size={18} className="-skew-x-12" />, label: 'B.Hành' },
            { id: 'cube', icon: <Cuboid size={18} />, label: 'Lập P.' },
            { id: 'box', icon: <Box size={18} />, label: 'Hộp' },
            { id: 'cylinder', icon: <Cylinder size={18} />, label: 'Trụ' },
            { id: 'cone', icon: <Cone size={18} />, label: 'Nón' },
            { id: 'sphere', icon: <Globe size={18} />, label: 'Cầu' },
        ].map((item) => (
            <button
            key={item.id}
            onClick={() => setShape(item.id as Shape)}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg border transition-all h-16 ${
                shape === item.id
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                : 'bg-[#0f172a] border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            title={item.label}
            >
            {item.icon}
            <span className="text-[10px] font-bold uppercase truncate w-full text-center">{item.label}</span>
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
            Diện Tích (S)
            </button>
            <button
            onClick={() => setMode('perimeter')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === 'perimeter' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
            >
            Chu Vi (P)
            </button>
        </div>
      )}
      {is3D && (
          <div className="text-center text-sm text-indigo-400 font-medium uppercase tracking-wider bg-indigo-500/10 py-2 rounded-lg border border-indigo-500/20">
              Tính Thể Tích (V)
          </div>
      )}

      {/* Inputs Dynamic Rendering */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* SQUARE */}
        {shape === 'square' && (
          <NumberInput label="Cạnh (a)" value={val1} onChange={(e) => setVal1(e.target.value)} />
        )}

        {/* RECTANGLE */}
        {shape === 'rectangle' && (
          <>
            <NumberInput label="Chiều dài (a)" value={val1} onChange={(e) => setVal1(e.target.value)} />
            <NumberInput label="Chiều rộng (b)" value={val2} onChange={(e) => setVal2(e.target.value)} />
          </>
        )}

        {/* CIRCLE */}
        {shape === 'circle' && (
          <NumberInput label="Bán kính (r)" value={val1} onChange={(e) => setVal1(e.target.value)} />
        )}

        {/* TRIANGLE */}
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

        {/* TRAPEZOID */}
        {shape === 'trapezoid' && mode === 'area' && (
             <>
             <NumberInput label="Đáy lớn (a)" value={val1} onChange={(e) => setVal1(e.target.value)} />
             <NumberInput label="Đáy nhỏ (b)" value={val2} onChange={(e) => setVal2(e.target.value)} />
             <NumberInput label="Chiều cao (h)" value={val3} onChange={(e) => setVal3(e.target.value)} />
             </>
        )}
        {shape === 'trapezoid' && mode === 'perimeter' && (
             <>
             <NumberInput label="Cạnh đáy 1 (a)" value={val1} onChange={(e) => setVal1(e.target.value)} />
             <NumberInput label="Cạnh đáy 2 (b)" value={val2} onChange={(e) => setVal2(e.target.value)} />
             <NumberInput label="Cạnh bên 1 (c)" value={val3} onChange={(e) => setVal3(e.target.value)} />
             <NumberInput label="Cạnh bên 2 (d)" value={val4} onChange={(e) => setVal4(e.target.value)} />
             </>
        )}

        {/* RHOMBUS */}
        {shape === 'rhombus' && mode === 'area' && (
             <>
             <NumberInput label="Đường chéo 1 (d₁)" value={val1} onChange={(e) => setVal1(e.target.value)} />
             <NumberInput label="Đường chéo 2 (d₂)" value={val2} onChange={(e) => setVal2(e.target.value)} />
             </>
        )}
        {shape === 'rhombus' && mode === 'perimeter' && (
             <NumberInput label="Cạnh (a)" value={val1} onChange={(e) => setVal1(e.target.value)} />
        )}

        {/* PARALLELOGRAM */}
        {shape === 'parallelogram' && mode === 'area' && (
             <>
             <NumberInput label="Cạnh đáy (b)" value={val1} onChange={(e) => setVal1(e.target.value)} />
             <NumberInput label="Chiều cao (h)" value={val2} onChange={(e) => setVal2(e.target.value)} />
             </>
        )}
        {shape === 'parallelogram' && mode === 'perimeter' && (
             <>
             <NumberInput label="Cạnh kề 1 (a)" value={val1} onChange={(e) => setVal1(e.target.value)} />
             <NumberInput label="Cạnh kề 2 (b)" value={val2} onChange={(e) => setVal2(e.target.value)} />
             </>
        )}

        {/* 3D SHAPES */}
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
        {shape === 'cone' && (
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
              {/* Generic placeholder icon if specific active icon is complex to map, or reuse one */}
              <Square size={32} className="opacity-50" />
              <span className="text-sm">Nhập thông số để tính toán</span>
            </div>
          )}
      </div>
    </div>
  );
};
