
import React from 'react';
import { Mail, MapPin, Phone, ArrowRight, Users, Library, Sparkles } from 'lucide-react';

interface PageProps {
  id: string;
}

export const InfoPage: React.FC<PageProps> = ({ id }) => {
  const renderContent = () => {
    switch (id) {
      case 'about':
        return (
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Về MultiTools</h1>
              <p className="text-lg text-slate-600">Chúng tôi đơn giản hóa việc tính toán cho mọi người.</p>
            </div>
            
            <div className="prose prose-slate max-w-none text-slate-600">
              <p>
                MultiTools ra đời với sứ mệnh cung cấp các công cụ tính toán trực tuyến nhanh chóng, chính xác và dễ sử dụng nhất. 
                Dù bạn là học sinh, sinh viên, kỹ sư hay người nội trợ, chúng tôi đều có công cụ phù hợp cho bạn.
              </p>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Đơn giản</h3>
                  <p className="text-sm">Giao diện thân thiện, dễ sử dụng trên mọi thiết bị.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Chính xác</h3>
                  <p className="text-sm">Thuật toán được kiểm chứng kỹ lưỡng.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Library size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Đa dạng</h3>
                  <p className="text-sm">Hàng trăm công cụ cho mọi lĩnh vực đời sống.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-2xl mx-auto space-y-8">
             <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Liên hệ với chúng tôi</h1>
              <p className="text-slate-600">Chúng tôi luôn sẵn sàng lắng nghe ý kiến đóng góp của bạn.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Email</h3>
                        <p className="text-slate-500 mb-1">Hỗ trợ chung & Góp ý</p>
                        <a href="mailto:contact@multitools.com" className="text-blue-600 font-medium hover:underline">contact@multitools.com</a>
                    </div>
                </div>
                
                <div className="flex items-start gap-4 border-t border-slate-100 pt-6">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Văn phòng</h3>
                        <p className="text-slate-500">Tầng 12, Tòa nhà Innovation</p>
                        <p className="text-slate-500">Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
                    </div>
                </div>
            </div>
          </div>
        );

      case 'hiring':
        return (
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Tuyển dụng</span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Gia nhập đội ngũ <br/>kiến tạo công cụ</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Chúng tôi đang tìm kiếm những tài năng đam mê công nghệ và toán học để cùng xây dựng nền tảng tính toán tốt nhất thế giới.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 text-left mt-12">
                    <a href="#" className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-2">
                            Frontend Developer <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-slate-500 text-sm mt-2">Remote • Full-time</p>
                    </a>
                    <a href="#" className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-2">
                            Math Content Writer <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-slate-500 text-sm mt-2">Hồ Chí Minh • Part-time</p>
                    </a>
                </div>
            </div>
        );
        
       case 'collections':
        return (
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Bộ sưu tập nổi bật</h1>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: 'Dành cho Học sinh', desc: 'Các công cụ toán học, hình học và vật lý cơ bản.', color: 'bg-orange-100 text-orange-600' },
                        { title: 'Tài chính cá nhân', desc: 'Lãi suất kép, chiết khấu và quản lý chi tiêu.', color: 'bg-emerald-100 text-emerald-600' },
                        { title: 'Sức khỏe đời sống', desc: 'BMI, BMR, Tính lượng nước uống.', color: 'bg-rose-100 text-rose-600' },
                        { title: 'Lập trình viên', desc: 'Hash, Encode, Converter.', color: 'bg-slate-100 text-slate-600' },
                        { title: 'Người làm văn phòng', desc: 'Đếm từ, Xử lý văn bản, PDF.', color: 'bg-blue-100 text-blue-600' },
                    ].map((col, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all cursor-pointer group">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${col.color}`}>
                                <Library size={24} />
                            </div>
                            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{col.title}</h3>
                            <p className="text-sm text-slate-500">{col.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        );

      default:
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-slate-900">Trang đang cập nhật</h1>
                <p className="text-slate-500 mt-2">Nội dung này sẽ sớm ra mắt.</p>
            </div>
        );
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-8">
      {renderContent()}
    </div>
  );
};
