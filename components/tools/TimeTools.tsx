import React, { useState, useEffect } from 'react';
import { NumberInput } from '../ui/Input';
import { RefreshCw, Play, Pause, Square, Calendar, Clock, ArrowRight } from 'lucide-react';

const formatNum = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

// --- 1. DAY COUNTER (Date Difference) ---
export const DayCounter = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const calculate = () => {
        if (!startDate || !endDate) return null;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    };

    const days = calculate();

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
                Tính số ngày giữa hai mốc thời gian bất kỳ.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Từ ngày</label>
                    <input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center text-slate-400 z-10 bg-white rounded-full p-1 border border-slate-200">
                    <ArrowRight size={20} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Đến ngày</label>
                    <input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center min-h-[120px]">
                {days !== null ? (
                    <div className="text-center animate-in zoom-in duration-300">
                        <div className="text-slate-500 text-xs font-bold uppercase mb-2 tracking-wider">Khoảng cách</div>
                        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{formatNum(days)} <span className="text-xl text-slate-500 font-normal">ngày</span></div>
                        <div className="text-sm text-slate-500">
                            ~ {formatNum(Math.round(days / 7 * 10) / 10)} tuần hoặc {formatNum(Math.round(days / 30.44 * 10) / 10)} tháng
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-slate-400 gap-3">
                        <Calendar size={32} className="opacity-50" />
                        <span className="text-sm">Chọn hai ngày để tính khoảng cách</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- 2. COUNTDOWN TIMER ---
export const CountdownTimer = () => {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: any;
        if (isRunning && timeLeft !== null && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => (prev && prev > 0 ? prev - 1 : 0));
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            // Play sound or alert here
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const handleStart = () => {
        const h = parseInt(hours) || 0;
        const m = parseInt(minutes) || 0;
        const s = parseInt(seconds) || 0;
        const total = h * 3600 + m * 60 + s;
        if (total > 0) {
            setTimeLeft(total);
            setIsRunning(true);
        }
    };

    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(null);
        setHours('');
        setMinutes('');
        setSeconds('');
    };

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-8">
            {timeLeft === null ? (
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                    <NumberInput label="Giờ" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="00" className="text-center" />
                    <NumberInput label="Phút" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="00" className="text-center" />
                    <NumberInput label="Giây" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="00" className="text-center" />
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="text-6xl md:text-8xl font-mono font-bold text-slate-800 tracking-wider">
                        {formatTime(timeLeft)}
                    </div>
                    {timeLeft === 0 && <div className="text-rose-500 font-bold mt-4 animate-bounce">Hết giờ!</div>}
                </div>
            )}

            <div className="flex justify-center gap-4">
                {!isRunning && timeLeft === null ? (
                    <button onClick={handleStart} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all transform hover:scale-105">
                        <Play size={20} fill="currentColor" /> Bắt đầu
                    </button>
                ) : (
                    <>
                        {isRunning ? (
                            <button onClick={handlePause} className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-amber-200 transition-all">
                                <Pause size={20} fill="currentColor" /> Tạm dừng
                            </button>
                        ) : (
                            <button onClick={() => setIsRunning(true)} className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-200 transition-all">
                                <Play size={20} fill="currentColor" /> Tiếp tục
                            </button>
                        )}
                        <button onClick={handleReset} className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold flex items-center gap-2 transition-all">
                            <Square size={20} fill="currentColor" /> Đặt lại
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};