
import React, { useState, useMemo } from 'react';
import { NumberInput } from '../ui/Input';

const format = (num: number) => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 4 }).format(num);

// --- Shared Result Component ---
const ResultCard = ({ label, value, formula, unit = '' }: { label: string, value: number | null, formula?: string, unit?: string }) => (
  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center justify-center text-center h-full relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 z-10">{label}</span>
    <div className="text-2xl font-bold text-slate-800 z-10 break-words w-full">
      {value !== null ? format(value) : '---'} <span className="text-sm text-slate-500 font-normal">{unit}</span>
    </div>
    {formula && value !== null && (
       <div className="text-[10px] text-slate-500 mt-2 font-mono bg-white px-2 py-1 rounded border border-slate-200 z-10">{formula}</div>
    )}
  </div>
);

// --- 1. HÌNH TRÒN (Circle) ---
export const CircleCalculator = () => {
  const [r, setR] = useState('');
  const radius = parseFloat(r);

  const results = useMemo(() => {
    if (isNaN(radius)) return null;
    return {
      d: radius * 2,
      c: 2 * Math.PI * radius,
      s: Math.PI * radius * radius
    };
  }, [radius]);

  return (
    <div className="space-y-6">
       <NumberInput label="Bán kính (r)" value={r} onChange={(e) => setR(e.target.value)} placeholder="Nhập bán kính..." />
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard label="Đường kính (d)" value={results?.d ?? null} formula="d = 2r" />
          <ResultCard label="Chu vi (C)" value={results?.c ?? null} formula="C = 2πr" />
          <ResultCard label="Diện tích (S)" value={results?.s ?? null} formula="S = πr²" />
       </div>
    </div>
  );
};

// --- 2. HÌNH TAM GIÁC (Triangle) ---
export const TriangleCalculator = () => {
  const [mode, setMode] = useState<'basic' | 'heron'>('basic');
  const [b, setB] = useState('');
  const [h, setH] = useState('');
  const [s1, setS1] = useState('');
  const [s2, setS2] = useState('');
  const [s3, setS3] = useState('');

  const results = useMemo(() => {
    if (mode === 'basic') {
        const base = parseFloat(b);
        const height = parseFloat(h);
        if (isNaN(base) || isNaN(height)) return null;
        return { area: 0.5 * base * height, perimeter: null };
    } else {
        const a = parseFloat(s1);
        const b_side = parseFloat(s2);
        const c = parseFloat(s3);
        if (isNaN(a) || isNaN(b_side) || isNaN(c)) return null;
        // Heron
        const p = (a + b_side + c) / 2;
        const area = Math.sqrt(p * (p - a) * (p - b_side) * (p - c));
        return { area: isNaN(area) ? 0 : area, perimeter: a + b_side + c };
    }
  }, [mode, b, h, s1, s2, s3]);

  return (
    <div className="space-y-6">
       <div className="flex bg-slate-100 p-1 rounded-xl">
         <button onClick={() => setMode('basic')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode === 'basic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Cao & Đáy</button>
         <button onClick={() => setMode('heron')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode === 'heron' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>3 Cạnh (Heron)</button>
       </div>

       {mode === 'basic' ? (
          <div className="flex gap-4">
            <NumberInput label="Cạnh đáy (b)" value={b} onChange={(e) => setB(e.target.value)} />
            <NumberInput label="Chiều cao (h)" value={h} onChange={(e) => setH(e.target.value)} />
          </div>
       ) : (
          <div className="flex gap-4">
            <NumberInput label="Cạnh a" value={s1} onChange={(e) => setS1(e.target.value)} />
            <NumberInput label="Cạnh b" value={s2} onChange={(e) => setS2(e.target.value)} />
            <NumberInput label="Cạnh c" value={s3} onChange={(e) => setS3(e.target.value)} />
          </div>
       )}

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultCard label="Diện tích (S)" value={results?.area ?? null} formula={mode === 'basic' ? 'S = ½bh' : 'Heron'} />
          <ResultCard label="Chu vi (P)" value={results?.perimeter ?? null} formula="P = a + b + c" />
       </div>
    </div>
  );
};

// --- 3. HÌNH VUÔNG (Square) ---
export const SquareCalculator = () => {
  const [a, setA] = useState('');
  const side = parseFloat(a);

  const results = useMemo(() => {
    if (isNaN(side)) return null;
    return {
      area: side * side,
      perimeter: 4 * side,
      diagonal: side * Math.sqrt(2)
    };
  }, [side]);

  return (
    <div className="space-y-6">
       <NumberInput label="Cạnh (a)" value={a} onChange={(e) => setA(e.target.value)} />
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard label="Diện tích (S)" value={results?.area ?? null} formula="S = a²" />
          <ResultCard label="Chu vi (P)" value={results?.perimeter ?? null} formula="P = 4a" />
          <ResultCard label="Đường chéo" value={results?.diagonal ?? null} formula="d = a√2" />
       </div>
    </div>
  );
};

// --- 4. HÌNH CHỮ NHẬT (Rectangle) ---
export const RectangleCalculator = () => {
  const [l, setL] = useState('');
  const [w, setW] = useState('');

  const len = parseFloat(l);
  const wid = parseFloat(w);

  const results = useMemo(() => {
    if (isNaN(len) || isNaN(wid)) return null;
    return {
      area: len * wid,
      perimeter: 2 * (len + wid),
      diagonal: Math.sqrt(len*len + wid*wid)
    };
  }, [len, wid]);

  return (
    <div className="space-y-6">
       <div className="flex gap-4">
         <NumberInput label="Chiều dài (a)" value={l} onChange={(e) => setL(e.target.value)} />
         <NumberInput label="Chiều rộng (b)" value={w} onChange={(e) => setW(e.target.value)} />
       </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard label="Diện tích (S)" value={results?.area ?? null} formula="S = a × b" />
          <ResultCard label="Chu vi (P)" value={results?.perimeter ?? null} formula="P = 2(a + b)" />
          <ResultCard label="Đường chéo" value={results?.diagonal ?? null} formula="d = √(a² + b²)" />
       </div>
    </div>
  );
};

// --- 5. HÌNH THANG (Trapezoid) ---
export const TrapezoidCalculator = () => {
  const [a, setA] = useState(''); // day lon
  const [b, setB] = useState(''); // day nho
  const [h, setH] = useState(''); // chieu cao
  const [c, setC] = useState(''); // canh ben 1
  const [d, setD] = useState(''); // canh ben 2

  const results = useMemo(() => {
      const v1 = parseFloat(a);
      const v2 = parseFloat(b);
      const v3 = parseFloat(h);
      const v4 = parseFloat(c);
      const v5 = parseFloat(d);
      
      let area = null;
      let perimeter = null;

      if (!isNaN(v1) && !isNaN(v2) && !isNaN(v3)) {
          area = ((v1 + v2) * v3) / 2;
      }
      if (!isNaN(v1) && !isNaN(v2) && !isNaN(v4) && !isNaN(v5)) {
          perimeter = v1 + v2 + v4 + v5;
      }
      return { area, perimeter };
  }, [a, b, h, c, d]);

  return (
    <div className="space-y-6">
       <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
          <p className="font-bold mb-2">Chú thích & Công thức:</p>
          <ul className="list-disc list-inside space-y-1 text-blue-700">
             <li><strong>Diện tích (S):</strong> ½ × (Đáy lớn a + Đáy nhỏ b) × Chiều cao h</li>
             <li><strong>Chu vi (P):</strong> Đáy lớn a + Đáy nhỏ b + Cạnh bên c + Cạnh bên d</li>
          </ul>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <NumberInput label="Đáy lớn (a)" value={a} onChange={(e) => setA(e.target.value)} />
          <NumberInput label="Đáy nhỏ (b)" value={b} onChange={(e) => setB(e.target.value)} />
          <NumberInput label="Chiều cao (h)" value={h} onChange={(e) => setH(e.target.value)} />
          <NumberInput label="Cạnh bên 1 (c)" value={c} onChange={(e) => setC(e.target.value)} />
          <NumberInput label="Cạnh bên 2 (d)" value={d} onChange={(e) => setD(e.target.value)} />
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultCard label="Diện tích (S)" value={results.area} formula="S = ½(a + b)h" />
          <ResultCard label="Chu vi (P)" value={results.perimeter} formula="P = a + b + c + d" />
       </div>
    </div>
  );
};

// --- 6. HÌNH THOI (Rhombus) ---
export const RhombusCalculator = () => {
    const [d1, setD1] = useState('');
    const [d2, setD2] = useState('');
    const [a, setA] = useState('');

    const results = useMemo(() => {
        const dia1 = parseFloat(d1);
        const dia2 = parseFloat(d2);
        const side = parseFloat(a);

        let area = null;
        let perimeter = null;

        if (!isNaN(dia1) && !isNaN(dia2)) area = 0.5 * dia1 * dia2;
        if (!isNaN(side)) perimeter = 4 * side;
        // Calculate side from diagonals if side is empty
        if (isNaN(side) && !isNaN(dia1) && !isNaN(dia2)) {
            perimeter = 4 * Math.sqrt(Math.pow(dia1/2, 2) + Math.pow(dia2/2, 2));
        }

        return { area, perimeter };
    }, [d1, d2, a]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <NumberInput label="Đường chéo 1 (d₁)" value={d1} onChange={(e) => setD1(e.target.value)} />
                <NumberInput label="Đường chéo 2 (d₂)" value={d2} onChange={(e) => setD2(e.target.value)} />
                <NumberInput label="Cạnh (a) - tùy chọn" value={a} onChange={(e) => setA(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResultCard label="Diện tích (S)" value={results.area} formula="S = ½(d₁d₂)" />
                <ResultCard label="Chu vi (P)" value={results.perimeter} formula="P = 4a" />
            </div>
        </div>
    );
};

// --- 7. HÌNH HỘP / LẬP PHƯƠNG (Cube) ---
export const CubeCalculator = () => {
    const [a, setA] = useState('');
    const side = parseFloat(a);

    const results = useMemo(() => {
        if(isNaN(side)) return null;
        return {
            vol: Math.pow(side, 3),
            surf: 6 * Math.pow(side, 2),
            diag: side * Math.sqrt(3)
        };
    }, [side]);

    return (
        <div className="space-y-6">
            <NumberInput label="Cạnh (a)" value={a} onChange={(e) => setA(e.target.value)} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard label="Thể tích (V)" value={results?.vol ?? null} formula="V = a³" />
                <ResultCard label="Diện tích TP (S)" value={results?.surf ?? null} formula="S = 6a²" />
                <ResultCard label="Đường chéo không gian" value={results?.diag ?? null} formula="D = a√3" />
            </div>
        </div>
    );
};

// --- 8. HÌNH CẦU (Sphere) ---
export const SphereCalculator = () => {
    const [r, setR] = useState('');
    const rad = parseFloat(r);

    const results = useMemo(() => {
        if(isNaN(rad)) return null;
        return {
            vol: (4/3) * Math.PI * Math.pow(rad, 3),
            surf: 4 * Math.PI * Math.pow(rad, 2)
        };
    }, [rad]);

    return (
        <div className="space-y-6">
            <NumberInput label="Bán kính (r)" value={r} onChange={(e) => setR(e.target.value)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResultCard label="Thể tích (V)" value={results?.vol ?? null} formula="V = ⁴⁄₃πr³" />
                <ResultCard label="Diện tích mặt cầu (S)" value={results?.surf ?? null} formula="S = 4πr²" />
            </div>
        </div>
    );
};

// --- 9. HÌNH TRỤ (Cylinder) ---
export const CylinderCalculator = () => {
    const [r, setR] = useState('');
    const [h, setH] = useState('');
    
    const rad = parseFloat(r);
    const height = parseFloat(h);

    const results = useMemo(() => {
        if(isNaN(rad) || isNaN(height)) return null;
        const baseArea = Math.PI * rad * rad;
        const latArea = 2 * Math.PI * rad * height;
        return {
            vol: baseArea * height,
            lat: latArea,
            total: latArea + 2 * baseArea
        };
    }, [rad, height]);

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <NumberInput label="Bán kính đáy (r)" value={r} onChange={(e) => setR(e.target.value)} />
                <NumberInput label="Chiều cao (h)" value={h} onChange={(e) => setH(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard label="Thể tích (V)" value={results?.vol ?? null} formula="V = πr²h" />
                <ResultCard label="Diện tích xung quanh" value={results?.lat ?? null} formula="Sxq = 2πrh" />
                <ResultCard label="Diện tích toàn phần" value={results?.total ?? null} formula="Stp = 2πrh + 2πr²" />
            </div>
        </div>
    );
};

// --- 10. HÌNH NÓN (Cone) ---
export const ConeCalculator = () => {
    const [r, setR] = useState('');
    const [h, setH] = useState('');

    const rad = parseFloat(r);
    const height = parseFloat(h);

    const results = useMemo(() => {
        if(isNaN(rad) || isNaN(height)) return null;
        const slant = Math.sqrt(rad*rad + height*height); // duong sinh l
        const baseArea = Math.PI * rad * rad;
        const latArea = Math.PI * rad * slant;
        
        return {
            vol: (1/3) * baseArea * height,
            slant: slant,
            total: latArea + baseArea
        };
    }, [rad, height]);

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <NumberInput label="Bán kính đáy (r)" value={r} onChange={(e) => setR(e.target.value)} />
                <NumberInput label="Chiều cao (h)" value={h} onChange={(e) => setH(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard label="Thể tích (V)" value={results?.vol ?? null} formula="V = ⅓πr²h" />
                <ResultCard label="Đường sinh (l)" value={results?.slant ?? null} formula="l = √(r² + h²)" />
                <ResultCard label="Diện tích toàn phần" value={results?.total ?? null} formula="Stp = πrl + πr²" />
            </div>
        </div>
    );
};

// --- 11. HÌNH BÌNH HÀNH (Parallelogram) ---
export const ParallelogramCalculator = () => {
    const [b, setB] = useState(''); // base
    const [h, setH] = useState(''); // height
    const [a, setA] = useState(''); // side

    const results = useMemo(() => {
        const base = parseFloat(b);
        const height = parseFloat(h);
        const side = parseFloat(a);
        
        let area = null;
        let perimeter = null;

        if (!isNaN(base) && !isNaN(height)) area = base * height;
        if (!isNaN(base) && !isNaN(side)) perimeter = 2 * (base + side);

        return { area, perimeter };
    }, [b, h, a]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <NumberInput label="Cạnh đáy (b)" value={b} onChange={(e) => setB(e.target.value)} />
                <NumberInput label="Chiều cao (h)" value={h} onChange={(e) => setH(e.target.value)} />
                <NumberInput label="Cạnh bên (a)" value={a} onChange={(e) => setA(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResultCard label="Diện tích (S)" value={results.area} formula="S = b × h" />
                <ResultCard label="Chu vi (P)" value={results.perimeter} formula="P = 2(a + b)" />
            </div>
        </div>
    );
};

// --- 12. HÌNH HỘP CHỮ NHẬT (Cuboid) ---
export const CuboidCalculator = () => {
    const [l, setL] = useState('');
    const [w, setW] = useState('');
    const [h, setH] = useState('');

    const results = useMemo(() => {
        const len = parseFloat(l);
        const wid = parseFloat(w);
        const hei = parseFloat(h);

        if (isNaN(len) || isNaN(wid) || isNaN(hei)) return null;

        const area = 2 * (len*wid + len*hei + wid*hei);
        const volume = len * wid * hei;
        const diag = Math.sqrt(len*len + wid*wid + hei*hei);
        const lat = 2 * (len + wid) * hei; // Lateral area

        return { area, volume, diag, lat };
    }, [l, w, h]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <NumberInput label="Chiều dài (l)" value={l} onChange={(e) => setL(e.target.value)} />
                <NumberInput label="Chiều rộng (w)" value={w} onChange={(e) => setW(e.target.value)} />
                <NumberInput label="Chiều cao (h)" value={h} onChange={(e) => setH(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResultCard label="Thể tích (V)" value={results?.volume ?? null} formula="V = l × w × h" />
                <ResultCard label="Diện tích toàn phần" value={results?.area ?? null} formula="Stp = 2(lw + lh + wh)" />
                <ResultCard label="Diện tích xung quanh" value={results?.lat ?? null} formula="Sxq = 2(l + w)h" />
                <ResultCard label="Đường chéo" value={results?.diag ?? null} formula="D = √(l² + w² + h²)" />
            </div>
        </div>
    );
};
