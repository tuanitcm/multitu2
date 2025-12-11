
import React, { useState } from 'react';
import { TextInput, NumberInput } from '../ui/Input';
import { QrCode, Download, RefreshCw } from 'lucide-react';

export const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState('300');
  const [qrUrl, setQrUrl] = useState('');

  const generate = () => {
      if (!text.trim()) return;
      // Using QuickChart API or QRServer for reliable QR generation without client libs
      const s = parseInt(size) || 300;
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&data=${encodeURIComponent(text)}`;
      setQrUrl(url);
  };

  const handleDownload = async () => {
      if (!qrUrl) return;
      try {
          const response = await fetch(qrUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `qrcode-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } catch (e) {
          console.error("Download failed", e);
          window.open(qrUrl, '_blank');
      }
  };

  return (
    <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <TextInput 
                    label="Nội dung (Link hoặc Văn bản)" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="https://example.com"
                />
                
                <div className="w-1/2">
                    <NumberInput 
                        label="Kích thước (px)" 
                        value={size} 
                        onChange={(e) => setSize(e.target.value)} 
                        placeholder="300"
                        min={100} max={1000}
                    />
                </div>

                <button 
                    onClick={generate} 
                    disabled={!text}
                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${!text ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'}`}
                >
                    <QrCode size={20} /> Tạo mã QR
                </button>
            </div>

            <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl p-8 min-h-[300px]">
                {qrUrl ? (
                    <div className="text-center space-y-4 animate-in zoom-in duration-300">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 inline-block">
                            <img src={qrUrl} alt="QR Code" className="max-w-full h-auto" />
                        </div>
                        <div>
                            <button 
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-lg text-sm font-medium transition-all mx-auto shadow-sm"
                            >
                                <Download size={16} /> Tải xuống PNG
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-slate-400">
                        <QrCode size={48} className="mx-auto mb-2 opacity-20" />
                        <p className="text-sm">Nhập nội dung để xem trước</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
