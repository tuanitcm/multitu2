import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { RefreshCw, Activity, Heart, Droplets, Scale, Utensils } from 'lucide-react';

// --- Shared Helper ---
const formatNum = (n: number) => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 }).format(n);

// --- 1. DISCOUNT CALCULATOR ---
export const DiscountCalculator = () => {
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    
    const p = parseFloat(price);
    const d = parseFloat(discount);
    
    let finalPrice = null;
    let saved = null;
    
    if(!isNaN(p) && !isNaN(d)) {
        saved = p * (d / 100);
        finalPrice = p - saved;
    }

    return (
        <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <NumberInput label="Giá gốc" value={price} onChange={e => setPrice(e.target.value)} placeholder="VD: 500000" />
                 <NumberInput label="Phần trăm giảm (%)" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="VD: 20" />
             </div>
             <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 text-center">
                 {finalPrice !== null ? (
                     <div className="space-y-2">
                         <div className="text-slate-500 text-xs uppercase font-bold">Giá sau khi giảm</div>
                         <div className="text-4xl font-bold text-emerald-400">{formatNum(finalPrice)} đ</div>
                         <div className="text-sm text-slate-400">Tiết kiệm được: <span className="text-white font-bold">{formatNum(saved || 0)} đ</span></div>
                     </div>
                 ) : (
                     <span className="text-slate-500 text-sm">Nhập giá và % để tính</span>
                 )}
             </div>
        </div>
    );
};

// --- 2. BMI CALCULATOR (Advanced) ---
export const BMICalculator = () => {
    const [height, setHeight] = useState(''); // cm
    const [weight, setWeight] = useState(''); // kg

    const h = parseFloat(height);
    const w = parseFloat(weight);

    let bmi = null;
    let status = '';
    let color = '';

    if (!isNaN(h) && !isNaN(w) && h > 0) {
        // BMI = kg / m^2
        const hM = h / 100;
        bmi = w / (hM * hM);

        if (bmi < 18.5) { status = 'Thiếu cân'; color = 'text-blue-400'; }
        else if (bmi < 24.9) { status = 'Bình thường'; color = 'text-emerald-400'; }
        else if (bmi < 29.9) { status = 'Thừa cân'; color = 'text-yellow-400'; }
        else { status = 'Béo phì'; color = 'text-rose-400'; }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberInput label="Chiều cao (cm)" value={height} onChange={e => setHeight(e.target.value)} placeholder="VD: 170" />
                <NumberInput label="Cân nặng (kg)" value={weight} onChange={e => setWeight(e.target.value)} placeholder="VD: 65" />
            </div>

            <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {bmi !== null ? (
                    <div className="relative z-10 animate-in zoom-in duration-300">
                        <div className="text-slate-500 text-xs uppercase font-bold mb-2">Chỉ số BMI của bạn</div>
                        <div className={`text-5xl font-bold ${color} mb-2`}>{formatNum(bmi)}</div>
                        <div className={`text-lg font-bold px-4 py-1 rounded-full bg-slate-800 inline-block border border-slate-700 ${color}`}>
                            {status}
                        </div>
                        <div className="mt-4 text-xs text-slate-500">
                            *Thang đo chuẩn WHO dành cho người trưởng thành
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-slate-600 gap-3 relative z-10">
                        <Activity size={32} className="opacity-50" />
                        <span className="text-sm">Nhập chiều cao & cân nặng để xem kết quả</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- 3. BMR & TDEE CALCULATOR ---
export const BMRCalculator = () => {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activity, setActivity] = useState('1.2');

    const calculate = () => {
        const a = parseFloat(age);
        const h = parseFloat(height);
        const w = parseFloat(weight);
        const act = parseFloat(activity);

        if (isNaN(a) || isNaN(h) || isNaN(w)) return null;

        // Mifflin-St Jeor Equation
        let bmr = (10 * w) + (6.25 * h) - (5 * a);
        if (gender === 'male') bmr += 5;
        else bmr -= 161;

        const tdee = bmr * act;

        return { bmr, tdee };
    };

    const result = calculate();

    return (
        <div className="space-y-6">
            <div className="flex bg-slate-800/50 p-1 rounded-xl mb-2">
                <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${gender === 'male' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Nam</button>
                <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${gender === 'female' ? 'bg-pink-600 text-white' : 'text-slate-400'}`}>Nữ</button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <NumberInput label="Tuổi" value={age} onChange={e => setAge(e.target.value)} placeholder="25" />
                <NumberInput label="Cao (cm)" value={height} onChange={e => setHeight(e.target.value)} placeholder="170" />
                <NumberInput label="Nặng (kg)" value={weight} onChange={e => setWeight(e.target.value)} placeholder="65" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Mức độ vận động</label>
                <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none">
                    <option value="1.2">Ít vận động (Làm văn phòng, ít đi lại)</option>
                    <option value="1.375">Nhẹ (Tập thể dục 1-3 ngày/tuần)</option>
                    <option value="1.55">Vừa phải (Tập 3-5 ngày/tuần)</option>
                    <option value="1.725">Năng động (Tập 6-7 ngày/tuần)</option>
                    <option value="1.9">Cực kỳ năng động (VĐV, lao động nặng)</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f172a] p-5 rounded-2xl border border-slate-800 text-center">
                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">BMR (Trao đổi chất cơ bản)</div>
                    <div className="text-3xl font-bold text-indigo-400">{result ? Math.round(result.bmr) : '---'}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Calories để duy trì sự sống khi nghỉ ngơi</div>
                </div>
                <div className="bg-[#0f172a] p-5 rounded-2xl border border-slate-800 text-center">
                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">TDEE (Calo tiêu thụ/ngày)</div>
                    <div className="text-3xl font-bold text-orange-400">{result ? Math.round(result.tdee) : '---'}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Calories cần ăn để giữ cân nặng hiện tại</div>
                </div>
            </div>
        </div>
    );
};

// --- 4. DATE CALCULATOR ---
export const DateCalculator = () => {
    const [dob, setDob] = useState('');
    
    let age = null;
    let days = null;

    if (dob) {
        const birth = new Date(dob);
        const now = new Date();
        const diff = now.getTime() - birth.getTime();
        
        if (diff > 0) {
            age = now.getFullYear() - birth.getFullYear();
            const m = now.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
                age--;
            }
            days = Math.floor(diff / (1000 * 60 * 60 * 24));
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Chọn ngày sinh hoặc ngày mốc</label>
                <input 
                    type="date" 
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-indigo-500"
                />
            </div>

            <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 text-center">
                {age !== null ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <div className="text-slate-500 text-xs uppercase font-bold">Số tuổi</div>
                             <div className="text-3xl font-bold text-indigo-400">{age}</div>
                        </div>
                        <div>
                             <div className="text-slate-500 text-xs uppercase font-bold">Tổng số ngày</div>
                             <div className="text-3xl font-bold text-purple-400">{formatNum(days || 0)}</div>
                        </div>
                    </div>
                ) : (
                     <span className="text-slate-500 text-sm">Chọn ngày để tính</span>
                )}
            </div>
        </div>
    );
};

// --- 5. IDEAL WEIGHT CALCULATOR ---
export const IdealWeightCalculator = () => {
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');

    const calc = () => {
        const h = parseFloat(height); // cm
        if (isNaN(h) || h < 100) return null;

        // Devine Formula (1974)
        // Male: 50kg + 2.3kg * (height_in_inches - 60)
        // Female: 45.5kg + 2.3kg * (height_in_inches - 60)
        // Convert cm to inches: cm / 2.54
        
        const inches = h / 2.54;
        const base = gender === 'male' ? 50 : 45.5;
        const over60 = inches - 60;
        
        if (over60 <= 0) return { val: base }; // Approximation for short stature

        const w = base + (2.3 * over60);
        return { val: w };
    };

    const result = calc();

    return (
        <div className="space-y-6">
             <div className="flex bg-slate-800/50 p-1 rounded-xl mb-2">
                <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${gender === 'male' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Nam</button>
                <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${gender === 'female' ? 'bg-pink-600 text-white' : 'text-slate-400'}`}>Nữ</button>
            </div>
            <NumberInput label="Chiều cao (cm)" value={height} onChange={e => setHeight(e.target.value)} placeholder="VD: 165" />
            
            <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 text-center">
                 {result ? (
                     <>
                        <div className="text-slate-500 text-xs uppercase font-bold mb-2">Cân nặng lý tưởng</div>
                        <div className="text-4xl font-bold text-emerald-400">{formatNum(result.val)} kg</div>
                        <div className="text-xs text-slate-500 mt-2">Dựa trên công thức Devine (chuẩn y khoa)</div>
                     </>
                 ) : (
                     <span className="text-slate-500 text-sm">Nhập chiều cao để tính</span>
                 )}
            </div>
        </div>
    );
};

// --- 6. WATER INTAKE CALCULATOR ---
export const WaterCalculator = () => {
    const [weight, setWeight] = useState('');
    
    // Rule of thumb: 35ml per kg
    const w = parseFloat(weight);
    const water = !isNaN(w) ? (w * 0.035) : null;

    return (
        <div className="space-y-6">
            <NumberInput label="Cân nặng của bạn (kg)" value={weight} onChange={e => setWeight(e.target.value)} placeholder="VD: 60" />
            <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 text-center">
                 {water !== null ? (
                     <>
                        <div className="text-slate-500 text-xs uppercase font-bold mb-2">Lượng nước cần uống mỗi ngày</div>
                        <div className="text-4xl font-bold text-cyan-400">{formatNum(water)} Lít</div>
                        <div className="text-xs text-slate-500 mt-2">~ {Math.round(water * 1000 / 250)} cốc nước (250ml)</div>
                     </>
                 ) : (
                     <span className="text-slate-500 text-sm">Nhập cân nặng để tính</span>
                 )}
            </div>
        </div>
    );
};
