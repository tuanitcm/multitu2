import React, { useState } from 'react';
import { TextInput, NumberInput } from '../ui/Input';
import { RefreshCw, Check, Copy, Shield, AlertTriangle } from 'lucide-react';
import * as bcrypt from 'bcryptjs';
import md5 from 'js-md5';
import { scrypt } from 'scrypt-js';

type HashType = 'mysql' | 'postgres' | 'bcrypt' | 'scrypt';
type Mode = 'generate' | 'check';

interface HashToolsProps {
  type: HashType;
  mode: Mode;
}

// MySQL PASSWORD() implementation: SHA1(SHA1(password))
const generateMySQLHash = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer1 = await crypto.subtle.digest('SHA-1', data);
  const hashBuffer2 = await crypto.subtle.digest('SHA-1', hashBuffer1);
  const hashArray = Array.from(new Uint8Array(hashBuffer2));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  return '*' + hashHex;
};

export const HashTools: React.FC<HashToolsProps> = ({ type, mode }) => {
  const [input, setInput] = useState('');
  const [extraInput, setExtraInput] = useState(''); // For username (postgres) or salt/rounds
  const [compareHash, setCompareHash] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    setResult(null);
    setIsValid(null);

    try {
      if (mode === 'generate') {
        if (type === 'mysql') {
          const hash = await generateMySQLHash(input);
          setResult(hash);
        } else if (type === 'postgres') {
          // Postgres MD5: md5(password + username)
          const user = extraInput || 'postgres';
          const hash = 'md5' + md5(input + user);
          setResult(hash);
        } else if (type === 'bcrypt') {
          const rounds = parseInt(extraInput) || 10;
          const hash = bcrypt.hashSync(input, rounds);
          setResult(hash);
        } else if (type === 'scrypt') {
          // Simplified Scrypt for demo
          const password = new TextEncoder().encode(input);
          const salt = new TextEncoder().encode(extraInput || 'salt');
          const N = 16384, r = 8, p = 1, dkLen = 64;
          const key = await scrypt(password, salt, N, r, p, dkLen);
          setResult(Array.from(key).map(b => b.toString(16).padStart(2, '0')).join(''));
        }
      } else if (mode === 'check') {
        if (type === 'bcrypt') {
          const match = bcrypt.compareSync(input, compareHash);
          setIsValid(match);
        } else if (type === 'scrypt') {
            // Scrypt checking usually implies re-hashing and comparing string
            // For this demo, we only support generating as "checking" raw scrypt requires specific params usually embedded in a format we didn't strictly define above
            // But let's support a simple exact match check against our generated format
            const password = new TextEncoder().encode(input);
            const salt = new TextEncoder().encode(extraInput || 'salt');
            const N = 16384, r = 8, p = 1, dkLen = 64;
            const key = await scrypt(password, salt, N, r, p, dkLen);
            const computed = Array.from(key).map(b => b.toString(16).padStart(2, '0')).join('');
            setIsValid(computed === compareHash);
        }
      }
    } catch (e) {
      console.error(e);
      setResult('Lỗi trong quá trình xử lý.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {mode === 'generate' && (
          <div className="bg-slate-800/50 p-4 rounded-lg text-slate-300 text-sm flex gap-2 items-start">
              <Shield className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                  Công cụ này tạo mã băm (Hash) một chiều an toàn. Dữ liệu được xử lý hoàn toàn trên trình duyệt của bạn, không gửi đi đâu.
              </div>
          </div>
      )}

      <div className="space-y-4">
         <TextInput 
            label={mode === 'check' ? "Mật khẩu cần kiểm tra" : "Mật khẩu / Văn bản đầu vào"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập nội dung..."
            type="password"
         />
         
         {/* Extra inputs based on type */}
         {type === 'postgres' && mode === 'generate' && (
             <TextInput 
                label="Username (Tên người dùng)"
                value={extraInput}
                onChange={(e) => setExtraInput(e.target.value)}
                placeholder="Mặc định: postgres"
             />
         )}
         {type === 'bcrypt' && mode === 'generate' && (
             <NumberInput 
                label="Salt Rounds (Độ khó)"
                value={extraInput}
                onChange={(e) => setExtraInput(e.target.value)}
                placeholder="Mặc định: 10 (Max 12)"
                min={4} max={15}
             />
         )}
         {type === 'scrypt' && (
             <TextInput 
                label="Salt (Chuỗi ngẫu nhiên)"
                value={extraInput}
                onChange={(e) => setExtraInput(e.target.value)}
                placeholder="Mặc định: salt"
             />
         )}

         {mode === 'check' && (
             <TextInput 
                label="Mã băm (Hash) cần đối chiếu"
                value={compareHash}
                onChange={(e) => setCompareHash(e.target.value)}
                placeholder="Dán mã hash vào đây..."
             />
         )}
      </div>

      <div className="flex justify-end">
         <button 
           onClick={handleAction}
           disabled={loading || !input}
           className={`px-6 py-2 rounded-lg font-medium text-white transition-colors flex items-center gap-2 ${loading || !input ? 'bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
         >
           {loading ? <RefreshCw className="animate-spin" size={18} /> : <RefreshCw size={18} />}
           {mode === 'generate' ? 'Tạo Hash' : 'Kiểm tra'}
         </button>
      </div>

      {/* Result Display */}
      {mode === 'generate' && result && (
        <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 relative group">
            <div className="text-xs text-slate-500 font-medium uppercase mb-2">Kết quả Hash</div>
            <div className="font-mono text-slate-200 break-all text-lg">{result}</div>
            <button 
                onClick={copyToClipboard}
                className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
            >
                {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
        </div>
      )}

      {mode === 'check' && isValid !== null && (
          <div className={`rounded-2xl p-6 border flex items-center gap-4 ${isValid ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
              {isValid ? (
                  <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check size={24} />
                  </div>
              ) : (
                  <div className="p-3 rounded-full bg-rose-500/20 text-rose-400">
                      <AlertTriangle size={24} />
                  </div>
              )}
              <div>
                  <h4 className={`text-lg font-bold ${isValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isValid ? 'Trùng khớp!' : 'Không trùng khớp'}
                  </h4>
                  <p className="text-slate-400 text-sm">
                      {isValid ? 'Mật khẩu nhập vào khớp với mã băm.' : 'Mật khẩu không đúng hoặc sai thuật toán.'}
                  </p>
              </div>
          </div>
      )}
    </div>
  );
};