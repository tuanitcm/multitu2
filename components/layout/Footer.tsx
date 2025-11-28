import React from 'react';
import { Box, Facebook, Twitter, Linkedin, Instagram, Youtube, Globe } from 'lucide-react';
import { Category } from '../../types';

interface FooterProps {
  categories: { id: Category; label: string; slug?: string }[];
  onCategoryClick: (id: Category) => void;
  onPageClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ categories, onCategoryClick, onPageClick }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 md:pt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 text-blue-600">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <Box size={24} strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-bold text-slate-900 tracking-tight">MultiTools</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              Chúng tôi làm cho <br/>mọi con số trở nên <span className="text-blue-600">có ý nghĩa!</span>
            </h2>
            <div className="flex gap-4 pt-2">
                <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"><Facebook size={20} /></a>
                <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"><Youtube size={20} /></a>
                <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition-colors"><Instagram size={20} /></a>
                <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Calculator Categories */}
          <div className="lg:col-span-4">
            <h3 className="font-bold text-slate-900 mb-6 text-lg">Danh mục công cụ</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {categories.filter(c => c.id !== 'all').map(cat => (
                    <a 
                        key={cat.id} 
                        href={`/${cat.slug || '#'}`}
                        onClick={(e) => { e.preventDefault(); onCategoryClick(cat.id); }}
                        className="text-slate-600 hover:text-blue-600 text-sm flex items-center gap-2 group transition-colors"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors"></span>
                        {cat.label}
                    </a>
                ))}
            </div>
          </div>

          {/* Company & Press */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-slate-900 mb-6 text-lg">Về MultiTools</h3>
            <div className="flex flex-col gap-3">
                <button onClick={() => onPageClick('about')} className="text-left text-slate-600 hover:text-blue-600 text-sm">Giới thiệu</button>
                <button onClick={() => onPageClick('collections')} className="text-left text-slate-600 hover:text-blue-600 text-sm">Bộ sưu tập</button>
                <button onClick={() => onPageClick('contact')} className="text-left text-slate-600 hover:text-blue-600 text-sm">Liên hệ</button>
                <button onClick={() => onPageClick('hiring')} className="text-left text-blue-600 font-semibold hover:text-blue-700 text-sm">Tuyển dụng! 🚀</button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-bold text-slate-900 mb-6 text-lg">Hỗ trợ</h3>
            <div className="flex flex-col gap-3">
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm">Điều khoản sử dụng</a>
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm">Chính sách bảo mật</a>
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm">Resource library</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-100">
                <Globe size={16} />
                <span>Tiếng Việt</span>
            </div>
            <div className="text-slate-500 text-sm text-center md:text-right">
                <p>&copy; {new Date().getFullYear()} MultiTools. Bản quyền được bảo lưu.</p>
                <p className="text-xs mt-1">Thiết kế lấy cảm hứng từ sự tiện dụng.</p>
            </div>
        </div>
      </div>
    </footer>
  );
};