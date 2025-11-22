
import React, { useState, useEffect } from 'react';
import { 
  Percent, Search, Grid, Shield, Type, Calculator, 
  ArrowRight, ArrowLeft, Box, Github, Info, Ruler,
  Scale, Zap, Activity, Timer, Database, Gauge, Sun, 
  Wind, DollarSign, PenTool, BookOpen, Move, Droplets,
  Waves, Lightbulb, Disc, CreditCard, Anchor, ThermometerSun,
  Lock, Key, Code, Hash, Check, ArrowRightLeft, SquareFunction,
  TrendingUp, Hammer
} from 'lucide-react';
import { Tool, Category, FAQItem } from './types';

// Import Components
import { BasicPercentage } from './components/calculators/BasicPercentage';
import { RatioPercentage } from './components/calculators/RatioPercentage';
import { PercentageChange } from './components/calculators/PercentageChange';
import { FindWhole } from './components/calculators/FindWhole';
import { GeometryCalculator } from './components/calculators/GeometryCalculator';
import { UnitConverter, UnitDefinition } from './components/calculators/UnitConverter';
import { TemperatureConverter } from './components/calculators/TemperatureConverter';
import { WordCounter } from './components/tools/WordCounter';
import { PasswordGenerator } from './components/tools/PasswordGenerator';
import { NumberToWord, RomanConverter, WordToNumber } from './components/tools/NumberConverters';
import { HashTools } from './components/tools/HashTools';
import { Encoders } from './components/tools/Encoders';
import { Accordion } from './components/ui/Accordion';
import { SequenceCalculator } from './components/calculators/SequenceCalculator';
import { LogarithmCalculator, TrigCalculator, CalculusCalculator } from './components/calculators/AdvancedMath';
import { PhysicsCalculator } from './components/calculators/PhysicsCalculator';
import { FinanceCalculator } from './components/calculators/FinanceCalculator';

// --- Configuration ---

const CATEGORIES_CONFIG: { id: Category; label: string; slug: string }[] = [
  { id: 'all', label: 'Tất cả', slug: '' },
  { id: 'converter', label: 'Chuyển đổi', slug: 'chuyen-doi' },
  { id: 'math', label: 'Toán học', slug: 'toan-hoc' },
  { id: 'electricity', label: 'Điện & Điện tử', slug: 'dien-tu' },
  { id: 'text', label: 'Văn bản', slug: 'van-ban' },
  { id: 'security', label: 'Bảo mật', slug: 'bao-mat' },
  { id: 'dev', label: 'Lập trình (Dev)', slug: 'dev-tools' },
];

// --- SEO Content Generators (E-E-A-T Standard) ---

const generateConverterContent = (title: string, subject: string, units: UnitDefinition[]) => {
  const unitList = units.map(u => u.label.split('(')[0].trim()).join(', ');
  const primaryUnit = units[0]?.label.split('(')[0].trim() || 'đơn vị gốc';
  const secondaryUnit = units[1]?.label.split('(')[0].trim() || 'đơn vị đích';

  const details = (
    <div className="space-y-8 text-slate-300 leading-relaxed text-justify">
      <section>
        <h3 className="text-xl font-bold text-white mb-3">Giới thiệu về công cụ {title}</h3>
        <p>
          Trong cuộc sống hàng ngày cũng như trong học tập và công việc kỹ thuật, nhu cầu <strong>{title.toLowerCase()}</strong> là vô cùng phổ biến. 
          Công cụ {title} của MultiTools được phát triển nhằm giúp người dùng thực hiện các phép tính chuyển đổi {subject.toLowerCase()} 
          một cách nhanh chóng, chính xác tuyệt đối và hoàn toàn miễn phí.
        </p>
        <p className="mt-2">
          Thay vì phải ghi nhớ các công thức phức tạp hay hệ số quy đổi rắc rối giữa {unitList}, bạn chỉ cần nhập số liệu và nhận kết quả ngay lập tức. 
          Hệ thống hỗ trợ đa dạng các đơn vị từ hệ đo lường quốc tế (SI) đến hệ đo lường Anh-Mỹ.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">Tại sao cần sử dụng công cụ chuyển đổi {subject}?</h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li><strong>Độ chính xác cao:</strong> Loại bỏ hoàn toàn sai sót do tính nhẩm hoặc nhớ nhầm công thức.</li>
          <li><strong>Tiết kiệm thời gian:</strong> Không cần tra cứu bảng quy đổi, kết quả hiển thị theo thời gian thực.</li>
          <li><strong>Hỗ trợ đa dạng:</strong> Chuyển đổi qua lại giữa {units.length} đơn vị đo lường khác nhau.</li>
          <li><strong>Tiện lợi:</strong> Sử dụng trực tiếp trên trình duyệt web, điện thoại mà không cần cài đặt phần mềm.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">Hướng dẫn sử dụng</h3>
        <p>Để thực hiện chuyển đổi, bạn chỉ cần làm theo 3 bước đơn giản:</p>
        <ol className="list-decimal list-inside space-y-2 mt-2 ml-2">
          <li>Chọn đơn vị nguồn (ví dụ: {primaryUnit}).</li>
          <li>Chọn đơn vị đích muốn chuyển đổi sang (ví dụ: {secondaryUnit}).</li>
          <li>Nhập giá trị cần tính vào ô nhập liệu. Kết quả sẽ tự động hiển thị.</li>
        </ol>
      </section>

      <section className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/30">
        <h3 className="text-lg font-bold text-indigo-400 mb-2">Lưu ý về độ chính xác</h3>
        <p className="text-sm text-slate-400">
          Các kết quả chuyển đổi tại MultiTools được tính toán dựa trên các chuẩn đo lường quốc tế mới nhất. 
          Đối với các đơn vị khoa học kỹ thuật, chúng tôi hỗ trợ hiển thị kết quả dưới dạng số thập phân chi tiết hoặc ký hiệu khoa học (E-notation) 
          để đảm bảo độ chính xác cho các bài toán phức tạp.
        </p>
      </section>
    </div>
  );

  const faqs: FAQItem[] = [
    {
      question: `Công cụ ${title} có hỗ trợ chuyển đổi số thập phân không?`,
      answer: `Có. Hệ thống hỗ trợ đầy đủ các số thập phân, số âm (đối với nhiệt độ) và các giá trị rất lớn hoặc rất nhỏ.`
    },
    {
      question: `1 ${primaryUnit} bằng bao nhiêu ${secondaryUnit}?`,
      answer: `Tỷ lệ quy đổi này phụ thuộc vào hệ số chuẩn. Bạn hãy nhập số "1" vào ô ${primaryUnit} và chọn ${secondaryUnit} ở ô kết quả để xem tỷ lệ chính xác nhất.`
    },
    {
      question: "Các công thức chuyển đổi lấy từ đâu?",
      answer: "Chúng tôi sử dụng các hệ số quy đổi chuẩn từ Hệ đo lường quốc tế (SI) và Viện Tiêu chuẩn và Công nghệ Quốc gia (NIST)."
    },
    {
      question: "Tôi có thể sử dụng công cụ này khi không có mạng không?",
      answer: "Hiện tại công cụ hoạt động trực tuyến để đảm bảo bạn luôn truy cập được phiên bản mới nhất với tỷ giá và công thức cập nhật."
    },
    ...(units.length > 5 ? [{
      question: "Làm sao để đổi đơn vị hiếm gặp?",
      answer: `Danh sách đơn vị của chúng tôi bao gồm cả các đơn vị phổ biến (${units[0].label}, ${units[1].label}) và các đơn vị chuyên ngành. Hãy tìm trong danh sách thả xuống (dropdown).`
    }] : [])
  ];

  return { details, faqs };
};

const generateMathContent = (title: string, specificDesc: string) => {
  const details = (
    <div className="space-y-8 text-slate-300 leading-relaxed text-justify">
      <section>
        <h3 className="text-xl font-bold text-white mb-3">Tổng quan về {title}</h3>
        <p>
          <strong>{title}</strong> là một công cụ toán học trực tuyến được thiết kế để giải quyết {specificDesc}. 
          Dù bạn là học sinh đang làm bài tập, kế toán viên cần tính toán số liệu hay người nội trợ cần điều chỉnh công thức nấu ăn, 
          công cụ này đều mang lại sự hỗ trợ đắc lực.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-bold text-white mb-3">Ứng dụng thực tế</h3>
        <p>Việc tính toán này thường xuyên xuất hiện trong:</p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
          <li><strong>Tài chính:</strong> Tính lãi suất, thuế VAT, chiết khấu mua sắm.</li>
          <li><strong>Giáo dục:</strong> Giải các bài toán tỷ lệ, thống kê.</li>
          <li><strong>Kinh doanh:</strong> Tính biên độ lợi nhuận, tỷ lệ tăng trưởng doanh thu.</li>
        </ul>
      </section>
    </div>
  );

  const faqs: FAQItem[] = [
    { question: "Kết quả có được làm tròn không?", answer: "Mặc định hệ thống hiển thị tối đa 4-6 chữ số thập phân để đảm bảo độ chính xác, nhưng vẫn gọn gàng dễ nhìn." },
    { question: "Công cụ có lưu lại lịch sử tính toán không?", answer: "Vì lý do bảo mật và riêng tư, chúng tôi không lưu trữ bất kỳ dữ liệu nào bạn nhập vào. Khi tải lại trang, mọi thứ sẽ trở về mặc định." }
  ];
  return { details, faqs };
};

const generateGeometryContent = (type: string = 'general') => {
  const details = (
    <div className="space-y-8 text-slate-300 leading-relaxed text-justify">
      <section>
        <h3 className="text-xl font-bold text-white mb-3">Công cụ tính Hình học trực tuyến</h3>
        <p>
          Công cụ này giúp bạn tính toán nhanh chóng <strong>Diện tích (S)</strong>, <strong>Chu vi (P)</strong> và <strong>Thể tích (V)</strong> cho đa dạng các hình học 2D và 3D: 
          Hình vuông, Chữ nhật, Tròn, Tam giác, Hình hộp, Hình cầu...
        </p>
      </section>
      <section>
        <h3 className="text-xl font-bold text-white mb-3">Các công thức phổ biến</h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li><strong>Tam giác:</strong> S = ½ × đáy × cao</li>
          <li><strong>Hình tròn:</strong> S = πr²; C = 2πr</li>
          <li><strong>Hình trụ:</strong> V = πr²h</li>
          <li><strong>Hình cầu:</strong> V = ⁴⁄₃πr³</li>
        </ul>
      </section>
    </div>
  );
  const faqs: FAQItem[] = [
    { question: "Số Pi (π) được lấy giá trị bao nhiêu?", answer: "Hệ thống sử dụng hằng số chính xác của máy tính (3.14159...) để đảm bảo sai số thấp nhất." },
    { question: "Tôi có cần đổi đơn vị trước khi nhập không?", answer: "Bạn nên nhập cùng một đơn vị cho tất cả các cạnh. Ví dụ: nếu cạnh a là mét, cạnh b cũng phải là mét." },
  ];
  return { details, faqs };
};

const generateTextContent = (title: string, specificDesc: string) => {
  const details = (
    <div className="space-y-8 text-slate-300 leading-relaxed text-justify">
      <section>
        <h3 className="text-xl font-bold text-white mb-3">Giới thiệu {title}</h3>
        <p>
          {specificDesc} Đây là công cụ không thể thiếu cho các nhà sáng tạo nội dung (Content Creators), lập trình viên, biên tập viên và nhân viên văn phòng.
          Việc xử lý văn bản thủ công thường tốn thời gian và dễ sai sót, công cụ này giúp tự động hóa quy trình đó.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-bold text-white mb-3">Tính năng nổi bật</h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li><strong>Xử lý tiếng Việt:</strong> Tối ưu hóa hoàn toàn cho ngôn ngữ tiếng Việt (dấu câu, ngữ pháp).</li>
          <li><strong>Real-time:</strong> Xử lý ngay lập tức khi bạn gõ hoặc dán nội dung.</li>
          <li><strong>Bảo mật:</strong> Mọi xử lý diễn ra ngay trên trình duyệt của bạn, văn bản không bao giờ được gửi về máy chủ.</li>
        </ul>
      </section>
    </div>
  );
  const faqs: FAQItem[] = [
    { question: "Văn bản của tôi có bị lộ không?", answer: "Hoàn toàn không. MultiTools sử dụng công nghệ Client-side, nghĩa là dữ liệu chỉ nằm trên máy của bạn." },
    { question: "Có giới hạn độ dài văn bản không?", answer: "Công cụ có thể xử lý hàng chục nghìn ký tự một lúc mà không gặp vấn đề gì về hiệu năng." }
  ];
  return { details, faqs };
};

const generateSecurityContent = (title: string) => {
  const details = (
    <div className="space-y-8 text-slate-300 leading-relaxed text-justify">
      <section>
        <h3 className="text-xl font-bold text-white mb-3">Tầm quan trọng của {title}</h3>
        <p>
          Trong kỷ nguyên số, mật khẩu là chốt chặn đầu tiên bảo vệ thông tin cá nhân, tài khoản ngân hàng và dữ liệu nhạy cảm của bạn. 
          Sử dụng một mật khẩu yếu hoặc dùng chung mật khẩu cho nhiều tài khoản là nguyên nhân hàng đầu dẫn đến việc bị đánh cắp dữ liệu.
          Công cụ <strong>{title}</strong> giúp tạo ra các chuỗi ký tự ngẫu nhiên, không thể đoán trước, đảm bảo an toàn tuyệt đối.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-bold text-white mb-3">Tiêu chuẩn mật khẩu mạnh</h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Độ dài tối thiểu 12 ký tự (khuyến nghị 16+).</li>
          <li>Bao gồm cả chữ hoa, chữ thường, số và ký tự đặc biệt.</li>
          <li>Không chứa các từ có nghĩa hoặc thông tin cá nhân (ngày sinh, tên).</li>
        </ul>
      </section>
    </div>
  );
  const faqs: FAQItem[] = [
    { question: "Mật khẩu tạo ra có được lưu lại không?", answer: "Tuyệt đối không. Mật khẩu được tạo ngẫu nhiên ngay trên trình duyệt của bạn và biến mất ngay khi bạn tải lại trang." },
    { question: "Làm sao để nhớ mật khẩu phức tạp như vậy?", answer: "Chúng tôi khuyên bạn nên sử dụng các trình quản lý mật khẩu (Password Manager) uy tín để lưu trữ thay vì cố gắng ghi nhớ." }
  ];
  return { details, faqs };
};

// Content Generator for Hashing Tools
const generateHashContent = (title: string, dbName: string, algoName: string) => {
    const details = (
        <div className="space-y-8 text-slate-300 leading-relaxed text-justify">
            <section>
                <h3 className="text-xl font-bold text-white mb-3">Công cụ {title} là gì?</h3>
                <p>
                    <strong>{title}</strong> giúp bạn tạo ra các chuỗi mã hóa (hash) chuẩn xác tương thích với hệ quản trị cơ sở dữ liệu <strong>{dbName}</strong>.
                    Thuật toán được sử dụng là <strong>{algoName}</strong>, đảm bảo rằng mật khẩu của bạn được mã hóa đúng chuẩn trước khi lưu vào cấu hình hoặc database.
                </p>
            </section>
            <section>
                <h3 className="text-xl font-bold text-white mb-3">Tại sao phải Hash mật khẩu?</h3>
                <p>
                    Việc lưu trữ mật khẩu dưới dạng văn bản thuần (plain text) là một rủi ro bảo mật nghiêm trọng. 
                    Hashing biến đổi mật khẩu thành một chuỗi ký tự cố định và không thể dịch ngược lại (one-way), giúp bảo vệ dữ liệu người dùng ngay cả khi database bị lộ.
                </p>
            </section>
        </div>
    );
    const faqs: FAQItem[] = [
        { question: "Tôi có thể giải mã (decrypt) hash này lại thành mật khẩu không?", answer: "Không. Hash là hàm một chiều. Bạn chỉ có thể kiểm tra mật khẩu bằng cách hash lại input và so sánh chuỗi kết quả." },
        { question: "Công cụ này có gửi mật khẩu của tôi đi đâu không?", answer: "Không. Mọi quá trình tính toán diễn ra ngay trên trình duyệt của bạn (Client-side hashing)." }
    ];
    return { details, faqs };
};

// Content Generator for Encoders/Decoders
const generateEncoderContent = (title: string, mechanism: string) => {
    const details = (
        <div className="space-y-8 text-slate-300 leading-relaxed text-justify">
            <section>
                <h3 className="text-xl font-bold text-white mb-3">Tìm hiểu về {title}</h3>
                <p>
                    <strong>{title}</strong> là công cụ hỗ trợ các lập trình viên và chuyên gia bảo mật chuyển đổi dữ liệu giữa dạng văn bản thường và định dạng <strong>{mechanism}</strong>.
                    Việc này thường được sử dụng để chuẩn hóa dữ liệu, bypass các bộ lọc nội dung đơn giản, hoặc debug các giao thức mạng.
                </p>
            </section>
            <section>
                <h3 className="text-xl font-bold text-white mb-3">Ứng dụng của {mechanism}</h3>
                <p>
                    Chuẩn mã hóa này thường xuất hiện trong URL (Punycode), Email Header, hoặc các file hệ thống cũ. 
                    Công cụ giúp bạn dễ dàng đọc hiểu nội dung hoặc tạo ra các chuỗi mã hóa tương ứng để thử nghiệm phần mềm.
                </p>
            </section>
        </div>
    );
    const faqs: FAQItem[] = [
        { question: "Mã hóa này có bảo mật không?", answer: "Không. Đây chỉ là Encoding (mã hóa định dạng), không phải Encryption (mã hóa bảo mật). Bất kỳ ai cũng có thể giải mã nếu biết thuật toán." },
        { question: "Nó có hỗ trợ tiếng Việt không?", answer: "Có, công cụ hỗ trợ Unicode đầy đủ (UTF-8) trước khi thực hiện chuyển đổi sang các dạng như Base32/Base58." }
    ];
    return { details, faqs };
};

const createUnitTool = (
  id: string, slug: string, title: string, subject: string, 
  category: Tool['category'], icon: React.ReactNode, 
  units: UnitDefinition[], helpText?: string
): Tool => {
  const { details, faqs } = generateConverterContent(title, subject, units);
  return {
    id, slug, title, 
    description: `Công cụ ${title.toLowerCase()} trực tuyến. Chuyển đổi nhanh giữa ${units.slice(0,3).map(u => u.label.split('(')[0]).join(', ')}... chính xác nhất.`, 
    category, icon,
    keywords: [title.toLowerCase(), subject.toLowerCase(), ...units.map(u => u.label.toLowerCase()), 'đổi đơn vị', 'online', 'chuyển đổi'],
    component: <UnitConverter labelFrom="Đổi từ" labelTo="Sang" units={units} helpText={helpText} />,
    details,
    faqs
  };
};

// --- Unit Definitions ---
const LENGTH_UNITS = [
  { id: 'm', label: 'Mét (m)', ratio: 1 },
  { id: 'km', label: 'Kilômét (km)', ratio: 1000 },
  { id: 'cm', label: 'Centimét (cm)', ratio: 0.01 },
  { id: 'mm', label: 'Milimét (mm)', ratio: 0.001 },
  { id: 'um', label: 'Micromet (µm)', ratio: 1e-6 },
  { id: 'nm', label: 'Nanomet (nm)', ratio: 1e-9 },
  { id: 'in', label: 'Inch (in)', ratio: 0.0254 },
  { id: 'ft', label: 'Feet (ft)', ratio: 0.3048 },
  { id: 'yd', label: 'Yard (yd)', ratio: 0.9144 },
  { id: 'mi', label: 'Dặm (Mile)', ratio: 1609.344 },
  { id: 'nmi', label: 'Hải lý (NM)', ratio: 1852 },
];

const AREA_UNITS = [
  { id: 'm2', label: 'Mét vuông (m²)', ratio: 1 },
  { id: 'km2', label: 'Km vuông (km²)', ratio: 1e6 },
  { id: 'cm2', label: 'Cm vuông (cm²)', ratio: 0.0001 },
  { id: 'mm2', label: 'Mm vuông (mm²)', ratio: 1e-6 },
  { id: 'ha', label: 'Hecta (ha)', ratio: 10000 },
  { id: 'acre', label: 'Mẫu Anh (acre)', ratio: 4046.86 },
  { id: 'ft2', label: 'Square Feet (ft²)', ratio: 0.092903 },
];

const WEIGHT_UNITS = [
  { id: 'kg', label: 'Kilogam (kg)', ratio: 1 },
  { id: 'g', label: 'Gram (g)', ratio: 0.001 },
  { id: 'mg', label: 'Miligram (mg)', ratio: 1e-6 },
  { id: 'ton', label: 'Tấn (t)', ratio: 1000 },
  { id: 'lb', label: 'Pound (lb)', ratio: 0.453592 },
  { id: 'oz', label: 'Ounce (oz)', ratio: 0.0283495 },
  { id: 'ct', label: 'Carat (ct)', ratio: 0.0002 },
];

const VOLUME_UNITS = [
  { id: 'l', label: 'Lít (L)', ratio: 1 },
  { id: 'ml', label: 'Mililít (ml)', ratio: 0.001 },
  { id: 'm3', label: 'Mét khối (m³)', ratio: 1000 },
  { id: 'cm3', label: 'Cm khối (cm³)', ratio: 0.001 },
  { id: 'gal', label: 'Gallon (US)', ratio: 3.78541 },
  { id: 'qt', label: 'Quart (US)', ratio: 0.946353 },
  { id: 'pt', label: 'Pint (US)', ratio: 0.473176 },
  { id: 'cup', label: 'Cup (US)', ratio: 0.236588 },
  { id: 'floz', label: 'Fluid Ounce (fl oz)', ratio: 0.0295735 },
  { id: 'tbsp', label: 'Thìa canh (tbsp)', ratio: 0.0147868 },
  { id: 'tsp', label: 'Thìa cà phê (tsp)', ratio: 0.0049289 },
];

const TIME_UNITS = [
  { id: 's', label: 'Giây (s)', ratio: 1 },
  { id: 'min', label: 'Phút', ratio: 60 },
  { id: 'h', label: 'Giờ', ratio: 3600 },
  { id: 'day', label: 'Ngày', ratio: 86400 },
  { id: 'week', label: 'Tuần', ratio: 604800 },
  { id: 'month', label: 'Tháng (30 ngày)', ratio: 2592000 },
  { id: 'year', label: 'Năm (365 ngày)', ratio: 31536000 },
  { id: 'ms', label: 'Mili giây (ms)', ratio: 0.001 },
  { id: 'us', label: 'Micro giây (µs)', ratio: 1e-6 },
  { id: 'ns', label: 'Nano giây (ns)', ratio: 1e-9 },
];

const DATA_UNITS = [
  { id: 'B', label: 'Byte (B)', ratio: 1 },
  { id: 'KB', label: 'Kilobyte (KB)', ratio: 1024 },
  { id: 'MB', label: 'Megabyte (MB)', ratio: 1048576 },
  { id: 'GB', label: 'Gigabyte (GB)', ratio: 1073741824 },
  { id: 'TB', label: 'Terabyte (TB)', ratio: 1099511627776 },
  { id: 'PB', label: 'Petabyte (PB)', ratio: 1.1259e15 },
  { id: 'bit', label: 'Bit (b)', ratio: 0.125 },
];

const SPEED_UNITS = [
  { id: 'kmh', label: 'Km/giờ (km/h)', ratio: 0.277778 },
  { id: 'ms', label: 'Mét/giây (m/s)', ratio: 1 },
  { id: 'mph', label: 'Dặm/giờ (mph)', ratio: 0.44704 },
  { id: 'kn', label: 'Hải lý/giờ (knot)', ratio: 0.514444 },
  { id: 'mach', label: 'Mach (chuẩn)', ratio: 340.3 },
];

const PRESSURE_UNITS = [
  { id: 'Pa', label: 'Pascal (Pa)', ratio: 1 },
  { id: 'kPa', label: 'Kilopascal (kPa)', ratio: 1000 },
  { id: 'bar', label: 'Bar', ratio: 100000 },
  { id: 'atm', label: 'Atmosphere (atm)', ratio: 101325 },
  { id: 'psi', label: 'PSI', ratio: 6894.76 },
  { id: 'torr', label: 'Torr', ratio: 133.322 },
];

const POWER_UNITS = [
  { id: 'W', label: 'Watt (W)', ratio: 1 },
  { id: 'kW', label: 'Kilowatt (kW)', ratio: 1000 },
  { id: 'HP', label: 'Mã lực (HP)', ratio: 745.7 },
  { id: 'MW', label: 'Megawatt (MW)', ratio: 1e6 },
  { id: 'GW', label: 'Gigawatt (GW)', ratio: 1e9 },
];

const ENERGY_UNITS = [
  { id: 'J', label: 'Joule (J)', ratio: 1 },
  { id: 'kJ', label: 'Kilojoule (kJ)', ratio: 1000 },
  { id: 'cal', label: 'Calorie (cal)', ratio: 4.184 },
  { id: 'kcal', label: 'Kilocalorie (kcal)', ratio: 4184 },
  { id: 'kWh', label: 'Kilowatt giờ (kWh)', ratio: 3600000 },
  { id: 'eV', label: 'Electronvolt (eV)', ratio: 1.6022e-19 },
  { id: 'BTU', label: 'BTU', ratio: 1055.06 },
];

const VOLTAGE_UNITS = [
  { id: 'V', label: 'Volt (V)', ratio: 1 },
  { id: 'mV', label: 'Milivolt (mV)', ratio: 0.001 },
  { id: 'kV', label: 'Kilovolt (kV)', ratio: 1000 },
  { id: 'MV', label: 'Megavolt (MV)', ratio: 1e6 },
];

const CURRENT_UNITS = [
  { id: 'A', label: 'Ampe (A)', ratio: 1 },
  { id: 'mA', label: 'Miliampe (mA)', ratio: 0.001 },
  { id: 'kA', label: 'Kiloampe (kA)', ratio: 1000 },
  { id: 'uA', label: 'Microampe (µA)', ratio: 1e-6 },
];

const QUANTITY_UNITS = [
    { id: 'each', label: 'Cái (Each)', ratio: 1 },
    { id: 'pair', label: 'Đôi (Pair)', ratio: 2 },
    { id: 'dozen', label: 'Tá (Dozen)', ratio: 12 },
    { id: 'bakers_dozen', label: 'Tá thợ làm bánh', ratio: 13 },
    { id: 'score', label: 'Chục (Score)', ratio: 20 },
    { id: 'gross', label: 'Gross (144)', ratio: 144 },
    { id: 'great_gross', label: 'Great Gross', ratio: 1728 },
];

const PARTS_PER_UNITS = [
    { id: 'ppm', label: 'Phần triệu (ppm)', ratio: 1e-6 },
    { id: 'ppb', label: 'Phần tỷ (ppb)', ratio: 1e-9 },
    { id: 'ppt', label: 'Phần nghìn tỷ (ppt)', ratio: 1e-12 },
    { id: 'percent', label: 'Phần trăm (%)', ratio: 0.01 },
    { id: 'permille', label: 'Phần nghìn (‰)', ratio: 0.001 },
];

const PACE_UNITS = [
    { id: 'minkm', label: 'Phút/Km (min/km)', ratio: 1 },
    { id: 'minmile', label: 'Phút/Dặm (min/mile)', ratio: 1.609344 }, 
    { id: 'secm', label: 'Giây/Mét (s/m)', ratio: 16.6667 }, 
];

const REACTIVE_POWER_UNITS = [
    { id: 'VAR', label: 'VAR', ratio: 1 },
    { id: 'kVAR', label: 'Kilovar (kVAR)', ratio: 1000 },
    { id: 'MVAR', label: 'Megavar (MVAR)', ratio: 1e6 },
];

const APPARENT_POWER_UNITS = [
    { id: 'VA', label: 'Volt-Ampe (VA)', ratio: 1 },
    { id: 'kVA', label: 'Kilovolt-Ampe (kVA)', ratio: 1000 },
    { id: 'MVA', label: 'Megavolt-Ampe (MVA)', ratio: 1e6 },
];

const REACTIVE_ENERGY_UNITS = [
    { id: 'VARh', label: 'VAR giờ (VARh)', ratio: 1 },
    { id: 'kVARh', label: 'Kilovar giờ (kVARh)', ratio: 1000 },
    { id: 'MVARh', label: 'Megavar giờ (MVARh)', ratio: 1e6 },
];

const FLOW_UNITS = [
    { id: 'm3s', label: 'Mét khối/giây (m³/s)', ratio: 1 },
    { id: 'm3h', label: 'Mét khối/giờ (m³/h)', ratio: 1/3600 },
    { id: 'lmin', label: 'Lít/phút (L/min)', ratio: 1/60000 },
    { id: 'ls', label: 'Lít/giây (L/s)', ratio: 0.001 },
    { id: 'gpm', label: 'Gallon/phút (GPM)', ratio: 6.309e-5 },
];

const ILLUMINANCE_UNITS = [
    { id: 'lx', label: 'Lux (lx)', ratio: 1 },
    { id: 'fc', label: 'Foot-candle (fc)', ratio: 10.7639 },
    { id: 'ph', label: 'Phot (ph)', ratio: 10000 },
];

const TORQUE_UNITS = [
    { id: 'Nm', label: 'Newton mét (N·m)', ratio: 1 },
    { id: 'lbft', label: 'Pound-force feet (lbf·ft)', ratio: 1.355818 },
    { id: 'kgm', label: 'Kilogram mét (kg·m)', ratio: 9.80665 },
];

const CHARGE_UNITS = [
    { id: 'C', label: 'Coulomb (C)', ratio: 1 },
    { id: 'mC', label: 'Millicoulomb (mC)', ratio: 0.001 },
    { id: 'uC', label: 'Microcoulomb (µC)', ratio: 1e-6 },
    { id: 'Ah', label: 'Ampe giờ (Ah)', ratio: 3600 },
    { id: 'mAh', label: 'Miliampe giờ (mAh)', ratio: 3.6 },
];

const CURRENCY_EST_UNITS = [
    { id: 'VND', label: 'Việt Nam Đồng (VND)', ratio: 1 },
    { id: 'USD', label: 'Đô la Mỹ (USD)', ratio: 25350 },
    { id: 'EUR', label: 'Euro (EUR)', ratio: 27500 },
    { id: 'JPY', label: 'Yên Nhật (JPY)', ratio: 168 },
    { id: 'KRW', label: 'Won Hàn (KRW)', ratio: 18.5 },
    { id: 'CNY', label: 'Nhân dân tệ (CNY)', ratio: 3520 },
];

const ANGLE_UNITS = [
    { id: 'deg', label: 'Độ (deg)', ratio: 1 },
    { id: 'rad', label: 'Radian (rad)', ratio: 57.2958 },
    { id: 'grad', label: 'Gradian (grad)', ratio: 0.9 },
    { id: 'arcmin', label: 'Phút (arcmin)', ratio: 1/60 },
    { id: 'arcsec', label: 'Giây (arcsec)', ratio: 1/3600 },
];

const FREQ_UNITS = [
    { id: 'Hz', label: 'Hertz (Hz)', ratio: 1 },
    { id: 'kHz', label: 'Kilohertz (kHz)', ratio: 1000 },
    { id: 'MHz', label: 'Megahertz (MHz)', ratio: 1e6 },
    { id: 'GHz', label: 'Gigahertz (GHz)', ratio: 1e9 },
    { id: 'rpm', label: 'Vòng/phút (RPM)', ratio: 1/60 },
];

// --- Define All Tools ---
const TOOLS: Tool[] = [
  // --- MATH ---
  {
    id: 'basic-percent',
    slug: 'tinh-gia-tri-phan-tram',
    title: 'Tìm % Giá trị',
    description: 'Tính nhanh giá trị X% của số Y là bao nhiêu.',
    icon: <Percent size={24} />,
    category: 'math',
    popular: true,
    component: <BasicPercentage />,
    ...generateMathContent('Tìm % Giá trị', 'bài toán tìm giá trị của một số khi biết phần trăm của nó')
  },
  {
    id: 'ratio-percent',
    slug: 'tinh-ti-le-phan-tram',
    title: 'Tính Tỉ lệ %',
    description: 'Tìm xem số X chiếm bao nhiêu phần trăm của số Y.',
    icon: <Box size={24} />,
    category: 'math',
    component: <RatioPercentage />,
    ...generateMathContent('Tính Tỉ lệ %', 'bài toán so sánh tỷ trọng giữa hai số liệu')
  },
  {
    id: 'percent-change',
    slug: 'tinh-phan-tram-tang-giam',
    title: 'Tăng/Giảm %',
    description: 'Tính mức độ tăng trưởng hoặc suy giảm giữa hai giá trị.',
    icon: <Activity size={24} />,
    category: 'math',
    component: <PercentageChange />,
    ...generateMathContent('Tính % Tăng Giảm', 'sự thay đổi tương đối giữa hai mốc thời gian hoặc hai giá trị')
  },
  {
    id: 'find-whole',
    slug: 'tim-so-goc-tu-phan-tram',
    title: 'Tìm Số Gốc',
    description: 'Tìm giá trị ban đầu khi biết số lượng thành phần và % tương ứng.',
    icon: <Grid size={24} />,
    category: 'math',
    component: <FindWhole />,
    ...generateMathContent('Tìm Số Gốc', 'bài toán ngược: tìm tổng thể khi biết một phần')
  },
  {
    id: 'geometry-calc',
    slug: 'tinh-chu-vi-dien-tich',
    title: 'Tính Hình Học',
    description: 'Tính chu vi, diện tích, thể tích các hình: Vuông, Tròn, Tam giác, Hình hộp, Hình cầu...',
    icon: <Ruler size={24} />,
    category: 'math',
    component: <GeometryCalculator />,
    ...generateGeometryContent()
  },
  {
    id: 'triangle-calc',
    slug: 'tinh-dien-tich-tam-giac',
    title: 'Tính Diện Tích Tam Giác',
    description: 'Công cụ tính nhanh diện tích và chu vi hình tam giác.',
    icon: <Ruler size={24} />,
    category: 'math',
    component: <GeometryCalculator defaultShape="triangle" />,
    ...generateGeometryContent('triangle')
  },
   {
    id: 'circle-calc',
    slug: 'tinh-dien-tich-hinh-tron',
    title: 'Tính Hình Tròn',
    description: 'Tính diện tích và chu vi hình tròn chính xác với số Pi.',
    icon: <Disc size={24} />,
    category: 'math',
    component: <GeometryCalculator defaultShape="circle" />,
    ...generateGeometryContent('circle')
  },
  {
    id: 'volume-calc',
    slug: 'tinh-the-tich',
    title: 'Tính Thể Tích',
    description: 'Tính thể tích các khối hình học không gian: Lập phương, Hình hộp, Hình trụ, Hình cầu.',
    icon: <Box size={24} />,
    category: 'math',
    component: <GeometryCalculator defaultShape="box" defaultMode="volume" />,
    ...generateGeometryContent('volume')
  },
  {
    id: 'sequence-calc',
    slug: 'tinh-cap-so-cong-nhan',
    title: 'Cấp Số Cộng/Nhân',
    description: 'Tính số hạng tổng quát và tổng n số hạng của cấp số cộng và cấp số nhân.',
    icon: <TrendingUp size={24} />,
    category: 'math',
    component: <SequenceCalculator />,
    ...generateMathContent('Cấp số cộng & nhân', 'các bài toán về dãy số có quy luật')
  },
  {
    id: 'log-calc',
    slug: 'tinh-logarit',
    title: 'Tính Logarit',
    description: 'Tính giá trị Logarit với cơ số bất kỳ.',
    icon: <SquareFunction size={24} />,
    category: 'math',
    component: <LogarithmCalculator />,
    ...generateMathContent('Logarit', 'phép toán ngược của lũy thừa')
  },
  {
    id: 'trig-calc',
    slug: 'cong-cu-luong-giac',
    title: 'Lượng Giác (Sin/Cos/Tan)',
    description: 'Tính giá trị lượng giác Sin, Cos, Tan của một góc (Độ hoặc Radian).',
    icon: <Waves size={24} />,
    category: 'math',
    component: <TrigCalculator />,
    ...generateMathContent('Lượng giác', 'tỷ số lượng giác trong tam giác vuông và đường tròn đơn vị')
  },
  {
    id: 'calculus-calc',
    slug: 'tinh-dao-ham-nguyen-ham',
    title: 'Đạo Hàm & Nguyên Hàm',
    description: 'Tính đạo hàm và nguyên hàm cơ bản của hàm đa thức (f(x) = ax^n).',
    icon: <SquareFunction size={24} />,
    category: 'math',
    component: <CalculusCalculator />,
    ...generateMathContent('Giải tích', 'phép tính vi phân và tích phân cơ bản cho đa thức')
  },
  {
    id: 'roman-converter',
    slug: 'doi-so-la-ma',
    title: 'Số La Mã',
    description: 'Chuyển đổi qua lại giữa số tự nhiên và chữ số La Mã.',
    icon: <PenTool size={24} />,
    category: 'math',
    component: <RomanConverter />,
    ...generateMathContent('Số La Mã', 'việc đọc và viết các ký tự số cổ đại (I, V, X, L, C, D, M)')
  },
  {
      id: 'compound-interest',
      slug: 'tinh-lai-kep',
      title: 'Tính Lãi Kép',
      description: 'Công cụ tính lãi suất kép gửi tiết kiệm ngân hàng, đầu tư.',
      icon: <TrendingUp size={24} />,
      category: 'math',
      component: <FinanceCalculator />,
      ...generateMathContent('Lãi kép', 'sức mạnh của lãi suất trong đầu tư tài chính')
  },

  // --- PHYSICS (Calculators) ---
  {
      id: 'physics-motion',
      slug: 'tinh-van-toc-quang-duong',
      title: 'Tính Vận Tốc/Quãng Đường',
      description: 'Tính toán các đại lượng trong chuyển động đều: Vận tốc (v), Quãng đường (s), Thời gian (t).',
      icon: <Wind size={24} />,
      category: 'math',
      component: <PhysicsCalculator defaultMode="motion" />,
      ...generateMathContent('Chuyển động cơ học', 'các bài toán vật lý lớp 8, lớp 10 về chuyển động')
  },
  {
      id: 'physics-work',
      slug: 'tinh-cong-cong-suat',
      title: 'Tính Công & Công Suất',
      description: 'Tính Công cơ học (A) và Công suất (P) thực hiện được trong một khoảng thời gian.',
      icon: <Hammer size={24} />,
      category: 'math',
      component: <PhysicsCalculator defaultMode="work" />,
      ...generateMathContent('Công và Công suất', 'hiệu suất làm việc của máy móc và con người')
  },

  // --- TEXT ---
  {
    id: 'word-counter',
    slug: 'dem-tu-dem-ky-tu',
    title: 'Đếm Từ & Ký Tự',
    description: 'Đếm số lượng từ, ký tự, câu và đoạn văn trong văn bản.',
    icon: <Type size={24} />,
    category: 'text',
    component: <WordCounter />,
    ...generateTextContent('Bộ Đếm Từ Online', 'Công cụ đếm từ giúp bạn kiểm soát độ dài văn bản, phù hợp cho việc viết bài SEO, tiểu luận hay bài đăng mạng xã hội.')
  },
  {
    id: 'num-to-word',
    slug: 'doc-so-thanh-chu',
    title: 'Đọc Số Thành Chữ',
    description: 'Chuyển đổi dãy số thành văn bản tiếng Việt.',
    icon: <BookOpen size={24} />,
    category: 'text',
    component: <NumberToWord />,
    ...generateTextContent('Đọc Số Thành Chữ', 'Tiện ích tự động chuyển các dãy số dài thành văn bản tiếng Việt chuẩn, rất hữu ích khi viết hóa đơn, phiếu thu chi hoặc văn bản hành chính.')
  },
  {
    id: 'word-to-num',
    slug: 'chuyen-chu-thanh-so',
    title: 'Chuyển Chữ Thành Số',
    description: 'Chuyển đổi văn bản viết tay sang dạng số.',
    icon: <Type size={24} />,
    category: 'text',
    component: <WordToNumber />,
    ...generateTextContent('Chuyển Chữ Thành Số', 'Công cụ hỗ trợ chuyển đổi các văn bản chứa số liệu (ví dụ: "một triệu hai trăm nghìn") về dạng số học để dễ dàng tính toán.')
  },
  
  // --- SECURITY & HASHING ---
  {
    id: 'password-gen',
    slug: 'tao-mat-khau-manh',
    title: 'Tạo Mật Khẩu',
    description: 'Tạo chuỗi mật khẩu ngẫu nhiên an toàn, khó đoán.',
    icon: <Shield size={24} />,
    category: 'security',
    popular: true,
    component: <PasswordGenerator />,
    ...generateSecurityContent('Tạo Mật Khẩu Mạnh')
  },
  {
    id: 'mysql-pass',
    slug: 'mysql-password-generator',
    title: 'MySQL Password Gen',
    description: 'Tạo mã Hash mật khẩu chuẩn MySQL (PASSWORD function).',
    icon: <Database size={24} />,
    category: 'security',
    component: <HashTools type="mysql" mode="generate" />,
    ...generateHashContent('MySQL Password Generator', 'MySQL', 'SHA1 Unhex')
  },
  {
    id: 'mariadb-pass',
    slug: 'mariadb-password-generator',
    title: 'MariaDB Password Gen',
    description: 'Tạo mã Hash mật khẩu cho MariaDB.',
    icon: <Database size={24} />,
    category: 'security',
    component: <HashTools type="mysql" mode="generate" />, // MariaDB uses same hash
    ...generateHashContent('MariaDB Password Generator', 'MariaDB', 'SHA1')
  },
  {
    id: 'postgres-pass',
    slug: 'postgres-password-generator',
    title: 'Postgres Password Gen',
    description: 'Tạo mã MD5 Hash cho PostgreSQL user.',
    icon: <Database size={24} />,
    category: 'security',
    component: <HashTools type="postgres" mode="generate" />,
    ...generateHashContent('Postgres Password Generator', 'PostgreSQL', 'MD5')
  },
  {
    id: 'bcrypt-gen',
    slug: 'bcrypt-password-generator',
    title: 'Bcrypt Generator',
    description: 'Tạo Bcrypt Hash an toàn từ chuỗi ký tự.',
    icon: <Hash size={24} />,
    category: 'security',
    component: <HashTools type="bcrypt" mode="generate" />,
    ...generateHashContent('Bcrypt Generator', 'Bcrypt', 'Blowfish')
  },
  {
    id: 'bcrypt-check',
    slug: 'bcrypt-password-checker',
    title: 'Bcrypt Checker',
    description: 'Kiểm tra tính hợp lệ của mật khẩu với mã Bcrypt.',
    icon: <Check size={24} />,
    category: 'security',
    component: <HashTools type="bcrypt" mode="check" />,
    ...generateHashContent('Bcrypt Checker', 'Bcrypt', 'Blowfish')
  },
  {
    id: 'scrypt-gen',
    slug: 'scrypt-password-generator',
    title: 'Scrypt Generator',
    description: 'Tạo Scrypt Hash với tùy chọn salt.',
    icon: <Hash size={24} />,
    category: 'security',
    component: <HashTools type="scrypt" mode="generate" />,
    ...generateHashContent('Scrypt Generator', 'Scrypt', 'Memory-hard Function')
  },

  // --- ENCODERS / DECODERS (DEV TOOLS) ---
  {
    id: 'rot13',
    slug: 'rot13-encoder-decoder',
    title: 'ROT13',
    description: 'Mã hóa và giải mã ROT13 (Caesar cipher).',
    icon: <ArrowRightLeft size={24} />,
    category: 'dev',
    component: <Encoders type="rot13" />,
    ...generateEncoderContent('ROT13', 'Caesar Cipher')
  },
  {
    id: 'rot47',
    slug: 'rot47-encoder-decoder',
    title: 'ROT47',
    description: 'Mã hóa và giải mã ROT47 (ASCII shift).',
    icon: <ArrowRightLeft size={24} />,
    category: 'dev',
    component: <Encoders type="rot47" />,
    ...generateEncoderContent('ROT47', 'ASCII Shift')
  },
  {
    id: 'punycode-enc',
    slug: 'punycode-encoder',
    title: 'Punycode Encoder',
    description: 'Chuyển đổi Unicode sang ASCII (cho tên miền).',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="punycode" defaultDirection="encode" />,
    ...generateEncoderContent('Punycode Encoder', 'IDNA (Internationalizing Domain Names)')
  },
  {
    id: 'punycode-dec',
    slug: 'punycode-decoder',
    title: 'Punycode Decoder',
    description: 'Giải mã chuỗi Punycode về văn bản Unicode.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="punycode" defaultDirection="decode" />,
    ...generateEncoderContent('Punycode Decoder', 'IDNA')
  },
  {
    id: 'base32-enc',
    slug: 'base32-encoder',
    title: 'Base32 Encoder',
    description: 'Mã hóa dữ liệu sang chuỗi Base32.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="base32" defaultDirection="encode" />,
    ...generateEncoderContent('Base32 Encoder', 'RFC 4648')
  },
  {
    id: 'base32-dec',
    slug: 'base32-decoder',
    title: 'Base32 Decoder',
    description: 'Giải mã chuỗi Base32 về văn bản gốc.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="base32" defaultDirection="decode" />,
    ...generateEncoderContent('Base32 Decoder', 'RFC 4648')
  },
  {
    id: 'base58-enc',
    slug: 'base58-encoder',
    title: 'Base58 Encoder',
    description: 'Mã hóa Base58 (thường dùng trong crypto).',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="base58" defaultDirection="encode" />,
    ...generateEncoderContent('Base58 Encoder', 'Bitcoin Base58')
  },
  {
    id: 'base58-dec',
    slug: 'base58-decoder',
    title: 'Base58 Decoder',
    description: 'Giải mã Base58 về văn bản gốc.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="base58" defaultDirection="decode" />,
    ...generateEncoderContent('Base58 Decoder', 'Bitcoin Base58')
  },
  {
    id: 'base64-tool',
    slug: 'base64-encoder-decoder',
    title: 'Base64 Encoder/Decoder',
    description: 'Mã hóa và giải mã Base64 trực tuyến, hỗ trợ UTF-8.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="base64" defaultDirection="encode" />,
    ...generateEncoderContent('Base64 Encoder/Decoder', 'Base64 Standard')
  },
  {
    id: 'ascii85-enc',
    slug: 'ascii85-encoder',
    title: 'Ascii85 Encoder',
    description: 'Mã hóa dữ liệu sang định dạng Ascii85.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="ascii85" defaultDirection="encode" />,
    ...generateEncoderContent('Ascii85 Encoder', 'Adobe Ascii85')
  },
  {
    id: 'ascii85-dec',
    slug: 'ascii85-decoder',
    title: 'Ascii85 Decoder',
    description: 'Giải mã dữ liệu Ascii85.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="ascii85" defaultDirection="decode" />,
    ...generateEncoderContent('Ascii85 Decoder', 'Adobe Ascii85')
  },
  {
    id: 'utf8-enc',
    slug: 'utf8-encoder',
    title: 'UTF8 Encoder',
    description: 'Xem biểu diễn Hex của chuỗi UTF-8.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="utf8" defaultDirection="encode" />,
    ...generateEncoderContent('UTF8 Encoder', 'Unicode Transformation Format')
  },
  {
    id: 'utf8-dec',
    slug: 'utf8-decoder',
    title: 'UTF8 Decoder',
    description: 'Giải mã chuỗi Hex UTF-8 thành văn bản.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="utf8" defaultDirection="decode" />,
    ...generateEncoderContent('UTF8 Decoder', 'Unicode Transformation Format')
  },
   {
    id: 'utf16-enc',
    slug: 'utf16-encoder',
    title: 'UTF16 Encoder',
    description: 'Xem biểu diễn Unicode Escaped (\\uXXXX).',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="utf16" defaultDirection="encode" />,
    ...generateEncoderContent('UTF16 Encoder', 'Unicode')
  },
  {
    id: 'utf16-dec',
    slug: 'utf16-decoder',
    title: 'UTF16 Decoder',
    description: 'Giải mã chuỗi \\uXXXX thành văn bản.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="utf16" defaultDirection="decode" />,
    ...generateEncoderContent('UTF16 Decoder', 'Unicode')
  },
  {
    id: 'uu-enc',
    slug: 'uuencoder',
    title: 'Uuencoder',
    description: 'Mã hóa văn bản sang UUEncode.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="uu" defaultDirection="encode" />,
    ...generateEncoderContent('Uuencoder', 'Unix-to-Unix encoding')
  },
  {
    id: 'uu-dec',
    slug: 'uudecoder',
    title: 'Uudecoder',
    description: 'Giải mã văn bản UUEncode.',
    icon: <Code size={24} />,
    category: 'dev',
    component: <Encoders type="uu" defaultDirection="decode" />,
    ...generateEncoderContent('Uudecoder', 'Unix-to-Unix encoding')
  },


  // --- CONVERTERS (COMMON) ---
  createUnitTool('len-conv', 'doi-don-vi-do-dai', 'Đổi Độ Dài', 'độ dài và khoảng cách', 'converter', <Ruler size={24} />, LENGTH_UNITS),
  createUnitTool('area-conv', 'doi-don-vi-dien-tich', 'Đổi Diện Tích', 'diện tích đất đai và bề mặt', 'converter', <Box size={24} />, AREA_UNITS),
  createUnitTool('weight-conv', 'doi-don-vi-khoi-luong', 'Đổi Khối Lượng', 'cân nặng và khối lượng vật lý', 'converter', <Scale size={24} />, WEIGHT_UNITS),
  createUnitTool('vol-conv-unit', 'doi-don-vi-the-tich', 'Đổi Đơn Vị Thể Tích', 'thể tích chất lỏng và không gian', 'converter', <Droplets size={24} />, VOLUME_UNITS),
  {
    id: 'temp-conv',
    slug: 'doi-don-vi-nhiet-do',
    title: 'Đổi Nhiệt Độ',
    description: 'Chuyển đổi giữa các thang đo nhiệt độ C, F và K.',
    category: 'converter',
    icon: <ThermometerSun size={24} />,
    component: <TemperatureConverter />,
    ...generateConverterContent('Đổi Nhiệt Độ', 'nhiệt độ thời tiết và khoa học', [
      { id: 'C', label: 'Celsius (°C)', ratio: 1 },
      { id: 'F', label: 'Fahrenheit (°F)', ratio: 1 },
      { id: 'K', label: 'Kelvin (K)', ratio: 1 },
    ])
  },
  createUnitTool('time-conv', 'doi-don-vi-thoi-gian', 'Đổi Thời Gian', 'thời gian và lịch', 'converter', <Timer size={24} />, TIME_UNITS),
  createUnitTool('speed-conv', 'doi-don-vi-toc-do', 'Đổi Tốc Độ', 'vận tốc di chuyển', 'converter', <Wind size={24} />, SPEED_UNITS),
  createUnitTool('pressure-conv', 'doi-don-vi-ap-suat', 'Đổi Áp Suất', 'áp suất khí quyển và chất lỏng', 'converter', <Gauge size={24} />, PRESSURE_UNITS),
  createUnitTool('angle-conv', 'doi-don-vi-goc', 'Đổi Góc', 'góc hình học', 'converter', <Move size={24} />, ANGLE_UNITS),
  {
    id: 'freq-conv',
    slug: 'doi-don-vi-tan-so',
    title: 'Đổi Đơn Vị Tần Số',
    description: 'Chuyển đổi đơn vị tần số: Hz, kHz, MHz, GHz và RPM. Công cụ chính xác cho kỹ thuật âm thanh, điện tử và cơ khí.',
    category: 'converter',
    icon: <Waves size={24} />,
    component: <UnitConverter labelFrom="Đổi từ" labelTo="Sang" units={FREQ_UNITS} helpText="Công thức: 1 Hz = 60 RPM (Vòng/phút)." />,
    details: (
      <div className="space-y-8 text-slate-300 leading-relaxed text-justify">
        <section>
          <h3 className="text-xl font-bold text-white mb-3">Kiến thức về Tần số (Frequency)</h3>
          <p>
            <strong>Tần số</strong> phản ánh số lần lặp lại của một hiện tượng trong một giây. 
            Đây là thông số quan trọng trong nhiều lĩnh vực như âm thanh (Audio), sóng vô tuyến (Radio/Wifi) và cơ khí động lực (Động cơ).
          </p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-3">Cách đổi Hz sang RPM</h3>
          <p>
            <strong>Hz (Hertz)</strong> là số dao động mỗi giây.<br/>
            <strong>RPM (Revolutions Per Minute)</strong> là số vòng quay mỗi phút.<br/>
            Do 1 phút có 60 giây, ta có mối liên hệ:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
             <li>1 Hz = 60 RPM</li>
             <li>1 RPM = 1/60 Hz ≈ 0.01667 Hz</li>
             <li>1 kHz = 1000 Hz = 60,000 RPM</li>
          </ul>
        </section>
      </div>
    ),
    faqs: [
       { question: "1 Hz bằng bao nhiêu RPM?", answer: "1 Hz bằng đúng 60 RPM (Vòng/phút)." },
       { question: "Tần số 50Hz và 60Hz điện lưới khác nhau thế nào?", answer: "Đây là tần số dòng điện xoay chiều. 50Hz đổi chiều 100 lần/giây, 60Hz đổi chiều 120 lần/giây. Thiết bị dùng động cơ (như quạt, máy bơm) thiết kế cho 60Hz sẽ chạy chậm và nóng hơn nếu dùng ở 50Hz." },
       { question: "GHz trong CPU máy tính là gì?", answer: "Đó là tốc độ xung nhịp của bộ vi xử lý. 3.5 GHz nghĩa là CPU thực hiện 3.5 tỷ chu kỳ xử lý mỗi giây." }
    ]
  },
  {
    id: 'data-conv',
    slug: 'doi-don-vi-du-lieu',
    title: 'Đổi Đơn Vị Dữ Liệu',
    description: 'Công cụ chuyển đổi đơn vị lưu trữ máy tính: Byte, KB, MB, GB, TB, PB. Chính xác theo chuẩn nhị phân (1024).',
    category: 'converter',
    icon: <Database size={24} />,
    component: <UnitConverter labelFrom="Đổi từ" labelTo="Sang" units={DATA_UNITS} helpText="Hệ thống sử dụng chuẩn nhị phân: 1 KB = 1024 Bytes." />,
    details: (
      <div className="space-y-8 text-slate-300 leading-relaxed text-justify">
        <section>
          <h3 className="text-xl font-bold text-white mb-3">Bảng đơn vị đo lường dữ liệu máy tính</h3>
          <p>
            Trong tin học, đơn vị cơ bản nhất là <strong>Bit</strong> (binary digit), nhưng đơn vị thường dùng để đo dung lượng tệp tin là <strong>Byte</strong> (1 Byte = 8 bits).
            Các đơn vị lớn hơn như Kilobyte (KB), Megabyte (MB), Gigabyte (GB) thường được tính theo lũy thừa của 2 (hệ nhị phân).
          </p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-3">Tại sao 1KB = 1024 Bytes?</h3>
          <p>
            Máy tính hoạt động dựa trên hệ nhị phân (0 và 1). Do đó, các bội số của đơn vị cũng tuân theo quy luật 2^n.
            1 KB = 2^10 Bytes = 1024 Bytes.
            Tuy nhiên, trong thương mại (ổ cứng, thẻ nhớ), nhà sản xuất thường dùng hệ thập phân (1 KB = 1000 Bytes), đó là lý do dung lượng thực tế thường thấp hơn thông số trên bao bì.
          </p>
        </section>
      </div>
    ),
    faqs: [
       { question: "1 GB bằng bao nhiêu MB?", answer: "Theo chuẩn nhị phân (Windows sử dụng), 1 GB = 1024 MB. Theo chuẩn thập phân (NSX ổ cứng), 1 GB = 1000 MB." },
       { question: "Sự khác nhau giữa MB và Mb?", answer: "MB (Megabyte) thường dùng cho dung lượng lưu trữ. Mb (Megabit) thường dùng cho tốc độ mạng. 1 Byte = 8 bits, nên 1 MB ~ 8 Mb." },
       { question: "Tại sao ổ cứng 500GB chỉ nhận được khoảng 465GB?", answer: "Do máy tính tính 1GB = 1073741824 Bytes (1024^3), còn nhà sản xuất tính 1GB = 1000000000 Bytes (1000^3). Chênh lệch này tạo ra sự thiếu hụt hiển thị." }
    ]
  },

  // --- CONVERTERS (NEW REQUESTS) ---
  createUnitTool('quantity-conv', 'doi-don-vi-so-dem', 'Đổi Số Đếm', 'số lượng đơn vị đóng gói', 'converter', <Grid size={24} />, QUANTITY_UNITS),
  createUnitTool('ppm-conv', 'doi-don-vi-parts-per', 'Đổi Tỉ Lệ Phần', 'nồng độ phần triệu, phần tỷ', 'converter', <Disc size={24} />, PARTS_PER_UNITS),
  createUnitTool('pace-conv', 'doi-don-vi-toc-do-chay', 'Đổi Pace Chạy Bộ', 'tốc độ chạy bộ (Pace)', 'converter', <Activity size={24} />, PACE_UNITS),
  createUnitTool('flow-conv', 'doi-don-vi-luu-luong', 'Đổi Lưu Lượng', 'lưu lượng dòng chảy chất lỏng', 'converter', <Waves size={24} />, FLOW_UNITS),
  createUnitTool('lux-conv', 'doi-don-vi-do-roi', 'Đổi Độ Rọi', 'cường độ ánh sáng (độ rọi)', 'converter', <Sun size={24} />, ILLUMINANCE_UNITS),
  createUnitTool('torque-conv', 'doi-don-vi-mo-men-xoan', 'Đổi Momen Xoắn', 'lực xoắn cơ học', 'converter', <Anchor size={24} />, TORQUE_UNITS),
  createUnitTool('currency-conv', 'doi-tien-te-tham-khao', 'Đổi Tiền Tệ', 'tiền tệ quốc tế (tham khảo)', 'converter', <DollarSign size={24} />, CURRENCY_EST_UNITS, "Lưu ý: Tỷ giá chỉ mang tính chất tham khảo và ước lượng, không phải tỷ giá ngân hàng thời gian thực."),

  // --- ELECTRICITY ---
  createUnitTool('volt-conv', 'doi-don-vi-dien-ap', 'Đổi Điện Áp', 'hiệu điện thế dòng điện', 'electricity', <Zap size={24} />, VOLTAGE_UNITS),
  createUnitTool('curr-conv', 'doi-don-vi-dong-dien', 'Đổi Dòng Điện', 'cường độ dòng điện', 'electricity', <Zap size={24} />, CURRENT_UNITS),
  createUnitTool('charge-conv', 'doi-don-vi-dien-tich-luong', 'Đổi Điện Tích', 'điện tích lượng tử', 'electricity', <Zap size={24} />, CHARGE_UNITS),
  createUnitTool('power-conv-unit', 'doi-don-vi-cong-suat', 'Đổi Đơn Vị Công Suất', 'công suất tiêu thụ điện năng', 'electricity', <Lightbulb size={24} />, POWER_UNITS),
  createUnitTool('reactive-power-conv', 'doi-cong-suat-phan-khang', 'Công Suất Phản Kháng', 'công suất vô công (Q)', 'electricity', <Zap size={24} />, REACTIVE_POWER_UNITS),
  createUnitTool('apparent-power-conv', 'doi-cong-suat-bieu-kien', 'Công Suất Biểu Kiến', 'công suất toàn phần (S)', 'electricity', <Zap size={24} />, APPARENT_POWER_UNITS),
  createUnitTool('energy-conv', 'doi-don-vi-nang-luong', 'Đổi Năng Lượng', 'năng lượng và công', 'electricity', <Zap size={24} />, ENERGY_UNITS),
  createUnitTool('reactive-energy-conv', 'doi-nang-luong-phan-khang', 'Năng Lượng Phản Kháng', 'điện năng phản kháng', 'electricity', <Zap size={24} />, REACTIVE_ENERGY_UNITS),
];

// --- Helper Functions ---

const updateMetaTags = (title: string, description: string, url: string) => {
  document.title = title;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', url);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', url);
};

const injectStructuredData = (data: any) => {
  try {
    const scriptId = 'structured-data';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  } catch (e) {
    console.error("Failed to inject structured data", e);
  }
};

const App: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const parseUrl = () => {
      try {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') {
          setActiveToolId(null);
          setActiveCategory('all');
          return;
        }
        // Hardened regex and checks
        const match = path.match(/^\/([a-zA-Z0-9-_]+)(\.html)?$/);
        if (match && match[1]) {
          const slug = match[1];
          
          // Check Categories first
          const category = CATEGORIES_CONFIG.find(c => c.slug === slug);
          if (category) {
            setActiveCategory(category.id);
            setActiveToolId(null);
            return;
          }

          // Check Tools
          const tool = TOOLS.find(t => t.slug === slug);
          if (tool) {
            setActiveToolId(tool.id);
            // Ensure category is set to tool's category for breadcrumbs/nav
            setActiveCategory('all'); 
            return;
          }
        }
        // Fallback
        setActiveToolId(null);
        setActiveCategory('all');
      } catch (e) {
        console.error("Routing error:", e);
        setActiveToolId(null);
        setActiveCategory('all');
      }
    };

    parseUrl();
    window.addEventListener('popstate', parseUrl);
    return () => window.removeEventListener('popstate', parseUrl);
  }, []);

  // Update Scroll Position
  useEffect(() => {
    try {
       window.scrollTo(0, 0);
    } catch(e) {}
  }, [activeToolId, activeCategory]);

  const navigateToTool = (tool: Tool) => {
    if (!tool) return;
    const url = `/${tool.slug}.html`;
    window.history.pushState({}, '', url);
    setActiveToolId(tool.id);
  };

  const navigateToCategory = (categoryId: Category) => {
    const config = CATEGORIES_CONFIG.find(c => c.id === categoryId);
    const url = config?.slug ? `/${config.slug}.html` : '/';
    window.history.pushState({}, '', url);
    setActiveCategory(categoryId);
    setActiveToolId(null);
  };

  const activeTool = TOOLS.find(t => t.id === activeToolId);

  // Meta Tags & Schema
  useEffect(() => {
    if (activeTool) {
      const title = `${activeTool.title} - MultiTools`;
      const url = `${window.location.origin}/${activeTool.slug}.html`;
      updateMetaTags(title, activeTool.description, url);

      const graphData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": activeTool.title,
        "description": activeTool.description,
        "applicationCategory": "Utility",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "VND" },
        ...(activeTool.faqs ? {
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": activeTool.faqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
              }
            }))
          }
        } : {})
      };
      injectStructuredData(graphData);
    } else {
      const catConfig = CATEGORIES_CONFIG.find(c => c.id === activeCategory);
      const title = activeCategory === 'all' 
        ? "MultiTools - Bộ công cụ trực tuyến miễn phí" 
        : `${catConfig?.label} - MultiTools`;
      const desc = "Nền tảng tổng hợp các công cụ tiện ích trực tuyến miễn phí.";
      const url = window.location.origin + (catConfig?.slug ? `/${catConfig.slug}.html` : '/');
      updateMetaTags(title, desc, url);
      injectStructuredData(null); // Clear specific tool schema
    }
  }, [activeTool, activeCategory]);

  const filteredTools = TOOLS.filter(tool => {
    const matchCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (tool.keywords && tool.keywords.some(k => k.includes(searchQuery.toLowerCase())));
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Header */}
      <header className="fixed w-full z-50 top-0 border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" onClick={(e) => { e.preventDefault(); navigateToCategory('all'); }} className="flex items-center gap-2 cursor-pointer group">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                 <Box size={20} strokeWidth={2.5} />
               </div>
               <span className="text-xl font-bold text-white tracking-tight">Multi<span className="text-indigo-400">Tools</span></span>
            </a>
            
            <div className="hidden md:block flex-1 max-w-md mx-8">
               <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-slate-500" />
                  </div>
                  <input 
                    type="text"
                    className="w-full bg-[#0f172a] text-slate-200 border border-slate-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-slate-500 text-sm"
                    placeholder="Tìm kiếm công cụ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
            </div>

            <nav className="flex items-center gap-4">
               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Github size={20} />
               </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {activeTool ? (
          <article className="animate-in slide-in-from-bottom-8 duration-500 max-w-4xl mx-auto">
             <a 
                href={`/${CATEGORIES_CONFIG.find(c => c.id === activeTool.category)?.slug || ''}.html`}
                onClick={(e) => { e.preventDefault(); navigateToCategory(activeTool.category); }}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 mb-6 transition-colors group cursor-pointer"
             >
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
               <span className="font-medium">Quay lại</span>
             </a>

             <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 mb-8">
                <header className="bg-[#0f172a]/80 border-b border-slate-700/50 p-6 md:p-8 flex items-start gap-6">
                   <div className="p-4 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hidden sm:block">
                     {activeTool.icon}
                   </div>
                   <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-white">{activeTool.title}</h1>
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-400 uppercase tracking-wider">
                          {CATEGORIES_CONFIG.find(c => c.id === activeTool.category)?.label}
                        </span>
                      </div>
                      <p className="text-slate-400 text-lg">{activeTool.description}</p>
                   </div>
                </header>
                <section className="p-6 md:p-8 bg-[#0f172a]/30">
                   {activeTool.component}
                </section>
                
                {/* SEO Details Section */}
                {activeTool.details && (
                    <section className="p-6 md:p-8 border-t border-slate-700/50 bg-[#1e293b]/20">
                        {activeTool.details}
                    </section>
                )}
             </div>
             
             {/* FAQs Section */}
             {activeTool.faqs && activeTool.faqs.length > 0 && (
                 <section className="glass-panel rounded-2xl overflow-hidden shadow-xl border border-slate-700/50 mt-8">
                    <header className="p-6 border-b border-slate-700/50 bg-[#0f172a]/50">
                       <h2 className="text-xl font-bold text-white flex items-center gap-2">
                          <Info size={20} className="text-indigo-400" /> 
                          Câu hỏi thường gặp
                       </h2>
                    </header>
                    <div className="p-6 bg-[#1e293b]/30">
                       <Accordion items={activeTool.faqs} />
                    </div>
                 </section>
             )}
          </article>
        ) : (
          <div className="space-y-12">
             <section className="text-center py-10 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">
                   Công cụ tiện ích <br />
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                     Trực tuyến & Miễn phí
                   </span>
                </h1>
                <div className="mt-8 md:hidden px-4">
                    <input 
                      type="text"
                      className="w-full bg-[#1e293b] text-slate-200 border border-slate-700 rounded-xl py-3 px-4"
                      placeholder="Tìm công cụ..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
             </section>

             <nav className="flex flex-wrap justify-center gap-2 md:gap-4 sticky top-20 z-30 py-4 backdrop-blur-lg md:static md:backdrop-blur-none">
                {CATEGORIES_CONFIG.map(cat => (
                   <a
                     key={cat.id}
                     href={cat.slug ? `/${cat.slug}.html` : '/'}
                     onClick={(e) => { e.preventDefault(); navigateToCategory(cat.id); }}
                     className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                        activeCategory === cat.id 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
                        : 'bg-[#1e293b] text-slate-400 border border-slate-700 hover:text-slate-200'
                     }`}
                   >
                     {cat.label}
                   </a>
                ))}
             </nav>

             <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                   <a 
                     key={tool.id}
                     href={`/${tool.slug}.html`}
                     onClick={(e) => { e.preventDefault(); navigateToTool(tool); }}
                     className="group block bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl transition-all relative overflow-hidden"
                   >
                      {tool.popular && (
                        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">HOT</div>
                      )}
                      <div className="mb-4 w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                         {tool.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-indigo-300">{tool.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{tool.description}</p>
                   </a>
                ))}
             </section>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 py-8 bg-[#020617]">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} MultiTools. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
};

export default App;
