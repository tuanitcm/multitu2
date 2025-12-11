
import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { RefreshCw, Activity, Heart, Droplets, Scale, Utensils } from 'lucide-react';

const formatNum = (n: number) => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 }).format(n);

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
             <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm">
                 {finalPrice !== null ? (
                     <div className="space-y-2">
                         <div className="text-slate-500 text-xs uppercase font-bold">Giá sau khi giảm</div>
                         <div className="text-4xl font-bold text-emerald-600">{formatNum(finalPrice)} đ</div>
                         <div className="text-sm text-slate-500">Tiết kiệm được: <span className="text-emerald-700 font-bold">{formatNum(saved || 0)} đ</span></div>
                     </div>
                 ) : (
                     <span className="text-slate-400 text-sm">Nhập giá và % để tính</span>
                 )}
             </div>
        </div>
    );
};

export const BMICalculator = () => {
    const [height, setHeight] = useState(''); // cm
    const [weight, setWeight] = useState(''); // kg

    const h = parseFloat(height);
    const w = parseFloat(weight);

    let bmi = null;
    let status = '';
    let color = '';

    if (!isNaN(h) && !isNaN(w) && h > 0) {
        const hM = h / 100;
        bmi = w / (hM * hM);

        if (bmi < 18.5) { status = 'Thiếu cân'; color = 'text-blue-500 bg-blue-50 border-blue-200'; }
        else if (bmi < 24.9) { status = 'Bình thường'; color = 'text-emerald-600 bg-emerald-50 border-emerald-200'; }
        else if (bmi < 29.9) { status = 'Thừa cân'; color = 'text-amber-500 bg-amber-50 border-amber-200'; }
        else { status = 'Béo phì'; color = 'text-rose-500 bg-rose-50 border-rose-200'; }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberInput label="Chiều cao (cm)" value={height} onChange={e => setHeight(e.target.value)} placeholder="VD: 170" />
                <NumberInput label="Cân nặng (kg)" value={weight} onChange={e => setWeight(e.target.value)} placeholder="VD: 65" />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center relative overflow-hidden group shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                {bmi !== null ? (
                    <div className="relative z-10 animate-in zoom-in duration-300">
                        <div className="text-slate-500 text-xs uppercase font-bold mb-2">Chỉ số BMI của bạn</div>
                        <div className={`text-5xl font-bold text-slate-800 mb-2`}>{formatNum(bmi)}</div>
                        <div className={`text-lg font-bold px-4 py-1 rounded-full border inline-block ${color}`}>
                            {status}
                        </div>
                        <div className="mt-4 text-xs text-slate-500">
                            *Thang đo chuẩn WHO dành cho người trưởng thành
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-slate-400 gap-3 relative z-10">
                        <Activity size={32} className="opacity-50" />
                        <span className="text-sm">Nhập chiều cao & cân nặng để xem kết quả</span>
                    </div>
                )}
            </div>
        </div>
    );
};

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

        let bmr = (10 * w) + (6.25 * h) - (5 * a);
        if (gender === 'male') bmr += 5;
        else bmr -= 161;

        const tdee = bmr * act;

        return { bmr, tdee };
    };

    const result = calculate();

    return (
        <div className="space-y-6">
            <div className="flex bg-slate-100 p-1 rounded-xl mb-2">
                <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${gender === 'male' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Nam</button>
                <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${gender === 'female' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Nữ</button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <NumberInput label="Tuổi" value={age} onChange={e => setAge(e.target.value)} placeholder="25" />
                <NumberInput label="Cao (cm)" value={height} onChange={e => setHeight(e.target.value)} placeholder="170" />
                <NumberInput label="Nặng (kg)" value={weight} onChange={e => setWeight(e.target.value)} placeholder="65" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Mức độ vận động</label>
                <div className="relative">
                    <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 outline-none appearance-none focus:border-blue-500">
                        <option value="1.2">Ít vận động (Làm văn phòng, ít đi lại)</option>
                        <option value="1.375">Nhẹ (Tập thể dục 1-3 ngày/tuần)</option>
                        <option value="1.55">Vừa phải (Tập 3-5 ngày/tuần)</option>
                        <option value="1.725">Năng động (Tập 6-7 ngày/tuần)</option>
                        <option value="1.9">Cực kỳ năng động (VĐV, lao động nặng)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">BMR (Trao đổi chất cơ bản)</div>
                    <div className="text-3xl font-bold text-indigo-600">{result ? Math.round(result.bmr) : '---'}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Calories để duy trì sự sống khi nghỉ ngơi</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">TDEE (Calo tiêu thụ/ngày)</div>
                    <div className="text-3xl font-bold text-orange-500">{result ? Math.round(result.tdee) : '---'}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Calories cần ăn để giữ cân nặng hiện tại</div>
                </div>
            </div>
        </div>
    );
};

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
                <label className="text-sm font-medium text-slate-700">Chọn ngày sinh hoặc ngày mốc</label>
                <input 
                    type="date" 
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm">
                {age !== null ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <div className="text-slate-500 text-xs uppercase font-bold">Số tuổi</div>
                             <div className="text-3xl font-bold text-indigo-600">{age}</div>
                        </div>
                        <div>
                             <div className="text-slate-500 text-xs uppercase font-bold">Tổng số ngày</div>
                             <div className="text-3xl font-bold text-purple-600">{formatNum(days || 0)}</div>
                        </div>
                    </div>
                ) : (
                     <span className="text-slate-400 text-sm">Chọn ngày để tính</span>
                )}
            </div>
        </div>
    );
};

export const IdealWeightCalculator = () => {
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');

    const calc = () => {
        const h = parseFloat(height); // cm
        if (isNaN(h) || h < 100) return null;
        
        const inches = h / 2.54;
        const base = gender === 'male' ? 50 : 45.5;
        const over60 = inches - 60;
        
        if (over60 <= 0) return { val: base }; 

        const w = base + (2.3 * over60);
        return { val: w };
    };

    const result = calc();

    return (
        <div className="space-y-6">
             <div className="flex bg-slate-100 p-1 rounded-xl mb-2">
                <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${gender === 'male' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Nam</button>
                <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${gender === 'female' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Nữ</button>
            </div>
            <NumberInput label="Chiều cao (cm)" value={height} onChange={e => setHeight(e.target.value)} placeholder="VD: 165" />
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm">
                 {result ? (
                     <>
                        <div className="text-slate-500 text-xs uppercase font-bold mb-2">Cân nặng lý tưởng</div>
                        <div className="text-4xl font-bold text-emerald-600">{formatNum(result.val)} kg</div>
                        <div className="text-xs text-slate-500 mt-2">Dựa trên công thức Devine (chuẩn y khoa)</div>
                     </>
                 ) : (
                     <span className="text-slate-400 text-sm">Nhập chiều cao để tính</span>
                 )}
            </div>
        </div>
    );
};

export const WaterCalculator = () => {
    const [weight, setWeight] = useState('');
    
    const w = parseFloat(weight);
    const water = !isNaN(w) ? (w * 0.035) : null;

    return (
        <div className="space-y-6">
            <NumberInput label="Cân nặng của bạn (kg)" value={weight} onChange={e => setWeight(e.target.value)} placeholder="VD: 60" />
            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm">
                 {water !== null ? (
                     <>
                        <div className="text-slate-500 text-xs uppercase font-bold mb-2">Lượng nước cần uống mỗi ngày</div>
                        <div className="text-4xl font-bold text-cyan-600">{formatNum(water)} Lít</div>
                        <div className="text-xs text-slate-500 mt-2">~ {Math.round(water * 1000 / 250)} cốc nước (250ml)</div>
                     </>
                 ) : (
                     <span className="text-slate-400 text-sm">Nhập cân nặng để tính</span>
                 )}
            </div>
        </div>
    );
};
