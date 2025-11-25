
import React, { useState, useEffect } from 'react';
import { 
  Percent, Search, LayoutGrid, Shield, Type, Calculator, 
  ArrowRight, ArrowLeft, Box, Github, Info, Ruler,
  Scale, Zap, Activity, Timer, Database, Gauge, Sun, 
  Wind, DollarSign, PenTool, BookOpen, Move, Droplets,
  Waves, Lightbulb, Disc, CreditCard, Anchor, ThermometerSun,
  Lock, Key, TrendingUp, Hammer, Triangle, Square, Circle, Cylinder, Globe, Cone, RectangleHorizontal, Diamond, Component, Layers, Package
} from 'lucide-react';
import { Tool, Category, FAQItem } from './types';

// Import Components
import { BasicPercentage } from './components/calculators/BasicPercentage';
import { RatioPercentage } from './components/calculators/RatioPercentage';
import { PercentageChange } from './components/calculators/PercentageChange';
import { FindWhole } from './components/calculators/FindWhole';
// Geometry Imports
import { 
  CircleCalculator, TriangleCalculator, SquareCalculator, RectangleCalculator, 
  TrapezoidCalculator, RhombusCalculator, CubeCalculator, SphereCalculator, 
  CylinderCalculator, ConeCalculator, ParallelogramCalculator, CuboidCalculator
} from './components/calculators/GeometryCalculator';

import { UnitConverter, UnitDefinition } from './components/calculators/UnitConverter';
import { TemperatureConverter } from './components/calculators/TemperatureConverter';
import { WordCounter } from './components/tools/WordCounter';
import { PasswordGenerator } from './components/tools/PasswordGenerator';
import { NumberToWord, RomanConverter, WordToNumber } from './components/tools/NumberConverters';
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
      answer: `Có. Hệ thống hỗ trợ đầy đủ các số thập phân, số âm (nếu đại lượng cho phép) và các giá trị rất lớn hoặc rất nhỏ. Bạn có thể nhập dấu chấm (.) hoặc phẩy (,) tùy theo cài đặt máy.`
    },
    {
      question: `Làm sao để đổi từ ${primaryUnit} sang ${secondaryUnit}?`,
      answer: `Rất đơn giản. Tại ô "Từ", bạn chọn "${primaryUnit}", tại ô "Sang" bạn chọn "${secondaryUnit}". Sau đó nhập giá trị cần đổi, kết quả sẽ hiện ra ngay lập tức.`
    },
    {
      question: "Kết quả chuyển đổi có chính xác tuyệt đối không?",
      answer: "Chúng tôi sử dụng các hệ số quy đổi chuẩn quốc tế (SI/NIST) với độ chính xác lên đến 15 chữ số thập phân. Tuy nhiên, kết quả hiển thị được làm tròn để dễ đọc (thường là 6 số lẻ)."
    },
    {
      question: "Tôi có thể sử dụng công cụ này trên điện thoại không?",
      answer: "Hoàn toàn được. Giao diện của MultiTools được tối ưu hóa cho mọi thiết bị, từ máy tính để bàn, máy tính bảng đến điện thoại di động."
    },
    {
      question: `Có giới hạn về giá trị nhập vào khi đổi ${subject} không?`,
      answer: `Về mặt kỹ thuật thì không. Tuy nhiên, hãy đảm bảo bạn nhập giá trị hợp lý (ví dụ: chiều dài hay khối lượng thì không thể là số âm).`
    }
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
  return { details };
};

const generateGeometryContent = (type: string) => {
  const details = (
    <div className="space-y-8 text-slate-300 leading-relaxed text-justify">
      <section>
        <h3 className="text-xl font-bold text-white mb-3">Công cụ tính {type} trực tuyến</h3>
        <p>
          Công cụ này giúp bạn tính toán nhanh chóng các thông số hình học như <strong>Diện tích</strong>, <strong>Chu vi</strong>, <strong>Thể tích</strong>, <strong>Đường chéo</strong>...
          Chỉ cần nhập các thông số đầu vào, hệ thống sẽ tự động áp dụng các công thức toán học chuẩn để đưa ra kết quả chính xác nhất.
        </p>
      </section>
    </div>
  );
  
  const faqs: FAQItem[] = [
    { question: `Công thức tính diện tích ${type} là gì?`, answer: `Công thức được hiển thị trực tiếp ngay bên dưới kết quả tính toán để bạn tiện theo dõi và học tập.` },
    { question: "Số Pi (π) được lấy giá trị bao nhiêu?", answer: "Hệ thống sử dụng hằng số chính xác cao của máy tính (khoảng 3.14159265...) để đảm bảo sai số thấp nhất cho kết quả." },
    { question: "Tôi có cần đổi đơn vị trước khi nhập không?", answer: "Có. Để kết quả chính xác, bạn cần đảm bảo tất cả các cạnh nhập vào đều cùng một đơn vị đo (ví dụ: cùng là cm hoặc cùng là m)." },
    { question: "Làm sao để tính ngược từ Chu vi ra Diện tích?", answer: "Hiện tại công cụ hỗ trợ tính xuôi từ kích thước cạnh/bán kính. Để tính ngược, bạn có thể áp dụng công thức toán học biến đổi dựa trên kết quả hiển thị." },
    { question: "Công cụ này có tính được thể tích không?", answer: type.includes('Hộp') || type.includes('Cầu') || type.includes('Trụ') || type.includes('Nón') || type.includes('Lập Phương') ? "Có. Đây là hình không gian 3D nên hệ thống hỗ trợ tính Thể tích và Diện tích bề mặt." : "Không. Đây là hình học phẳng 2D nên chỉ tính được Diện tích và Chu vi." },
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
  return { details };
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
    { question: "Mật khẩu tạo ra có được lưu lại không?", answer: "Tuyệt đối không. Mật khẩu được tạo ngẫu nhiên ngay trên trình duyệt của bạn (Client-side) và biến mất ngay khi bạn tải lại trang hoặc tắt tab." },
    { question: "Độ dài mật khẩu bao nhiêu là an toàn?", answer: "Các chuyên gia bảo mật khuyến nghị mật khẩu nên dài tối thiểu 12 ký tự. Tốt nhất là từ 16 ký tự trở lên để chống lại các cuộc tấn công Brute-force." },
    { question: "Tôi có nên dùng ký tự đặc biệt không?", answer: "Có. Việc thêm các ký tự như ! @ # $ % giúp tăng độ phức tạp của mật khẩu lên gấp nhiều lần, khiến hacker khó đoán hơn." },
    { question: "Làm sao để nhớ mật khẩu phức tạp như vậy?", answer: "Bạn không nên cố nhớ. Hãy sử dụng các trình quản lý mật khẩu uy tín (Password Manager) như Bitwarden, 1Password hoặc tính năng lưu mật khẩu của Google/Apple." },
    { question: "Công cụ này có tạo được mã PIN không?", answer: "Có. Bạn chỉ cần bỏ chọn 'Chữ hoa', 'Chữ thường', 'Ký tự đặc biệt' và chỉ giữ lại 'Số', sau đó chọn độ dài mong muốn (ví dụ 4 hoặc 6)." }
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
    ...generateMathContent('Tìm % Giá trị', 'bài toán tìm giá trị của một số khi biết phần trăm của nó'),
    faqs: [
        { question: "Công thức tính phần trăm của một số là gì?", answer: "Công thức rất đơn giản: Giá trị = (Phần trăm ÷ 100) × Tổng số. Ví dụ tìm 20% của 500: (20 ÷ 100) × 500 = 100." },
        { question: "Tôi có thể tính phần trăm cho số tiền không?", answer: "Có. Công cụ này hoạt động hoàn hảo cho tiền tệ, số lượng hàng hóa, điểm số và bất kỳ con số nào khác." },
        { question: "Làm sao để tính nhanh 10% của một số?", answer: "Mẹo nhỏ: Bạn chỉ cần dịch chuyển dấu phẩy sang trái 1 chữ số. Ví dụ 10% của 250 là 25." },
        { question: "Công cụ có hỗ trợ số thập phân không?", answer: "Có. Bạn có thể nhập số lẻ như 12.5% hay 50.55. Kết quả sẽ được tính chính xác tới 4 chữ số thập phân." },
        { question: "Tại sao kết quả của tôi bằng 0?", answer: "Hãy kiểm tra xem bạn có nhập số 0 vào ô 'Tổng số' không. Hoặc nếu bạn nhập phần trăm quá nhỏ (ví dụ 0.0001%), kết quả có thể hiển thị dạng số khoa học hoặc xấp xỉ 0." }
    ]
  },
  {
    id: 'ratio-percent',
    slug: 'tinh-ti-le-phan-tram',
    title: 'Tính Tỉ lệ %',
    description: 'Tìm xem số X chiếm bao nhiêu phần trăm của số Y.',
    icon: <Box size={24} />,
    category: 'math',
    component: <RatioPercentage />,
    ...generateMathContent('Tính Tỉ lệ %', 'bài toán so sánh tỷ trọng giữa hai số liệu'),
    faqs: [
        { question: "Công thức tính tỷ lệ phần trăm là gì?", answer: "Tỷ lệ % = (Số thành phần ÷ Tổng số) × 100. Ví dụ: 20 là bao nhiêu phần trăm của 50? (20 ÷ 50) × 100 = 40%." },
        { question: "Tỷ lệ phần trăm có thể lớn hơn 100% không?", answer: "Có. Nếu số thành phần lớn hơn tổng số so sánh (ví dụ doanh thu năm nay cao hơn năm ngoái), tỷ lệ sẽ > 100%." },
        { question: "Ứng dụng thực tế của công cụ này là gì?", answer: "Bạn có thể dùng để tính điểm số bài kiểm tra, tỷ lệ hoàn thành công việc, hoặc thị phần của một sản phẩm." },
        { question: "Làm sao để đổi từ phân số sang phần trăm?", answer: "Bạn lấy tử số chia cho mẫu số rồi nhân với 100. Công cụ này thực hiện chính xác thao tác đó cho bạn." },
        { question: "Số âm có tính được tỷ lệ phần trăm không?", answer: "Về mặt toán học thì có, nhưng trong thực tế (như tỷ lệ phần trăm hoàn thành), số âm thường ít có ý nghĩa trừ các trường hợp tài chính đặc biệt." }
    ]
  },
  {
    id: 'percent-change',
    slug: 'tinh-phan-tram-tang-giam',
    title: 'Tăng/Giảm %',
    description: 'Tính mức độ tăng trưởng hoặc suy giảm giữa hai giá trị.',
    icon: <Activity size={24} />,
    category: 'math',
    component: <PercentageChange />,
    ...generateMathContent('Tính % Tăng Giảm', 'sự thay đổi tương đối giữa hai mốc thời gian hoặc hai giá trị'),
    faqs: [
        { question: "Công thức tính phần trăm tăng trưởng là gì?", answer: "Công thức: ((Giá trị mới - Giá trị cũ) ÷ |Giá trị cũ|) × 100. Nếu kết quả dương là tăng, âm là giảm." },
        { question: "Tại sao tôi nhận được kết quả số âm?", answer: "Số âm biểu thị sự suy giảm. Ví dụ: từ 100 xuống 80 là giảm 20% (kết quả -20%)." },
        { question: "Làm sao tính % tăng lương?", answer: "Nhập lương cũ vào ô 'Giá trị cũ', lương mới vào 'Giá trị mới'. Công cụ sẽ cho biết bạn được tăng bao nhiêu phần trăm." },
        { question: "Nếu giá trị cũ là 0 thì sao?", answer: "Trong toán học, không thể chia cho 0 nên không thể tính % tăng trưởng từ số 0. Mức tăng là vô cực hoặc không xác định." },
        { question: "Công cụ này có dùng để tính lỗ lãi chứng khoán được không?", answer: "Rất tốt. Bạn nhập giá mua vào ô 'Cũ' và giá thị trường hiện tại vào ô 'Mới' để xem tỷ suất lợi nhuận/thua lỗ." }
    ]
  },
  {
    id: 'find-whole',
    slug: 'tim-so-goc-tu-phan-tram',
    title: 'Tìm Số Gốc',
    description: 'Tìm giá trị ban đầu khi biết số lượng thành phần và % tương ứng.',
    icon: <LayoutGrid size={24} />,
    category: 'math',
    component: <FindWhole />,
    ...generateMathContent('Tìm Số Gốc', 'bài toán ngược: tìm tổng thể khi biết một phần'),
    faqs: [
        { question: "Khi nào cần dùng công cụ tìm số gốc?", answer: "Khi bạn biết giá trị đã giảm giá và % giảm, muốn tìm giá gốc. Hoặc biết số tiền thuế đã đóng và thuế suất, muốn tìm thu nhập trước thuế." },
        { question: "Công thức toán học là gì?", answer: "Số gốc = Số giá trị ÷ (Phần trăm ÷ 100). Ví dụ: 50 là 20% của số nào? 50 ÷ 0.2 = 250." },
        { question: "Tôi mua áo giá 200k sau khi giảm 50%, giá gốc là bao nhiêu?", answer: "Hãy nhập 200 vào 'Số giá trị' và 50 vào 'Tương ứng (%)'. Kết quả giá gốc là 400k." },
        { question: "Kết quả có chính xác không?", answer: "Chính xác tuyệt đối về mặt toán học. Tuy nhiên trong thực tế giá tiền thường được làm tròn." },
        { question: "Tôi có thể nhập số thập phân không?", answer: "Được. Ví dụ bạn có thể tìm số gốc khi biết 15.5 là 2.5% của nó." }
    ]
  },
  
  // --- GEOMETRY (SPLIT) ---
  {
    id: 'circle-calc',
    slug: 'tinh-hinh-tron',
    title: 'Hình Tròn',
    description: 'Tính Diện tích (S), Chu vi (C) và Đường kính (d) từ Bán kính.',
    icon: <Circle size={24} />,
    category: 'math',
    component: <CircleCalculator />,
    ...generateGeometryContent('Hình Tròn')
  },
  {
    id: 'triangle-calc',
    slug: 'tinh-hinh-tam-giac',
    title: 'Hình Tam Giác',
    description: 'Tính Diện tích và Chu vi. Hỗ trợ tính theo chiều cao hoặc công thức Heron (3 cạnh).',
    icon: <Triangle size={24} />,
    category: 'math',
    component: <TriangleCalculator />,
    ...generateGeometryContent('Hình Tam Giác')
  },
  {
    id: 'square-calc',
    slug: 'tinh-hinh-vuong',
    title: 'Hình Vuông',
    description: 'Tính Diện tích, Chu vi và Đường chéo của hình vuông.',
    icon: <Square size={24} />,
    category: 'math',
    component: <SquareCalculator />,
    ...generateGeometryContent('Hình Vuông')
  },
  {
    id: 'rect-calc',
    slug: 'tinh-hinh-chu-nhat',
    title: 'Hình Chữ Nhật',
    description: 'Tính Diện tích, Chu vi và Đường chéo hình chữ nhật.',
    icon: <RectangleHorizontal size={24} />,
    category: 'math',
    component: <RectangleCalculator />,
    ...generateGeometryContent('Hình Chữ Nhật')
  },
  {
    id: 'trap-calc',
    slug: 'tinh-hinh-thang',
    title: 'Hình Thang',
    description: 'Tính Diện tích và Chu vi hình thang thường, hình thang cân.',
    icon: <Component size={24} />,
    category: 'math',
    component: <TrapezoidCalculator />,
    ...generateGeometryContent('Hình Thang')
  },
  {
    id: 'rhom-calc',
    slug: 'tinh-hinh-thoi',
    title: 'Hình Thoi',
    description: 'Tính toán hình thoi dựa trên độ dài đường chéo hoặc cạnh.',
    icon: <Diamond size={24} />,
    category: 'math',
    component: <RhombusCalculator />,
    ...generateGeometryContent('Hình Thoi')
  },
  {
    id: 'para-calc',
    slug: 'tinh-hinh-binh-hanh',
    title: 'Hình Bình Hành',
    description: 'Tính Diện tích và Chu vi hình bình hành.',
    icon: <Layers size={24} />,
    category: 'math',
    component: <ParallelogramCalculator />,
    ...generateGeometryContent('Hình Bình Hành')
  },
  {
    id: 'cube-calc',
    slug: 'tinh-hinh-lap-phuong',
    title: 'Hình Lập Phương',
    description: 'Tính Thể tích, Diện tích toàn phần và đường chéo khối lập phương.',
    icon: <Box size={24} />,
    category: 'math',
    component: <CubeCalculator />,
    ...generateGeometryContent('Hình Lập Phương')
  },
  {
    id: 'cuboid-calc',
    slug: 'tinh-hinh-hop-chu-nhat',
    title: 'Hình Hộp Chữ Nhật',
    description: 'Tính Thể tích, Diện tích xung quanh và toàn phần hình hộp chữ nhật.',
    icon: <Package size={24} />,
    category: 'math',
    component: <CuboidCalculator />,
    ...generateGeometryContent('Hình Hộp Chữ Nhật')
  },
  {
    id: 'sphere-calc',
    slug: 'tinh-hinh-cau',
    title: 'Hình Cầu',
    description: 'Tính Thể tích và Diện tích mặt cầu.',
    icon: <Globe size={24} />,
    category: 'math',
    component: <SphereCalculator />,
    ...generateGeometryContent('Hình Cầu')
  },
  {
    id: 'cylinder-calc',
    slug: 'tinh-hinh-tru',
    title: 'Hình Trụ',
    description: 'Tính Thể tích, Diện tích xung quanh và toàn phần hình trụ.',
    icon: <Cylinder size={24} />,
    category: 'math',
    component: <CylinderCalculator />,
    ...generateGeometryContent('Hình Trụ')
  },
  {
    id: 'cone-calc',
    slug: 'tinh-hinh-non',
    title: 'Hình Nón',
    description: 'Tính Thể tích, Đường sinh và Diện tích hình nón.',
    icon: <Cone size={24} />,
    category: 'math',
    component: <ConeCalculator />,
    ...generateGeometryContent('Hình Nón')
  },

  {
    id: 'sequence-calc',
    slug: 'tinh-cap-so-cong-nhan',
    title: 'Cấp Số Cộng/Nhân',
    description: 'Tính số hạng tổng quát và tổng n số hạng của cấp số cộng và cấp số nhân.',
    icon: <TrendingUp size={24} />,
    category: 'math',
    component: <SequenceCalculator />,
    ...generateMathContent('Cấp số cộng & nhân', 'các bài toán về dãy số có quy luật'),
    faqs: [
        { question: "Sự khác biệt giữa cấp số cộng và cấp số nhân?", answer: "Cấp số cộng là dãy số mà số sau bằng số trước CỘNG với một hằng số (công sai). Cấp số nhân là dãy số mà số sau bằng số trước NHÂN với một hằng số (công bội)." },
        { question: "Công thức tính tổng n số hạng đầu là gì?", answer: "Với cấp số cộng: Sn = n/2 * (u1 + un). Với cấp số nhân: Sn = u1 * (1 - q^n) / (1 - q)." },
        { question: "Khi nào thì cấp số nhân là dãy lùi vô hạn?", answer: "Khi trị tuyệt đối của công bội q nhỏ hơn 1 (|q| < 1), dãy số sẽ giảm dần về 0." },
        { question: "Tôi có thể nhập công sai/công bội là số âm không?", answer: "Được. Nếu công sai âm, dãy số cộng sẽ giảm dần. Nếu công bội âm, dãy số nhân sẽ đan dấu âm dương." },
        { question: "Ứng dụng của cấp số nhân là gì?", answer: "Nó được dùng nhiều trong tính lãi kép ngân hàng, sự phân rã phóng xạ, hoặc sự lây lan của virus trong sinh học." }
    ]
  },
  {
    id: 'log-calc',
    slug: 'tinh-logarit',
    title: 'Tính Logarit',
    description: 'Tính giá trị Logarit với cơ số bất kỳ.',
    icon: <Calculator size={24} />,
    category: 'math',
    component: <LogarithmCalculator />,
    ...generateMathContent('Logarit', 'phép toán ngược của lũy thừa'),
    faqs: [
        { question: "Logarit là gì?", answer: "Logarit của một số là lũy thừa mà cơ số phải được nâng lên để tạo ra số đó. Ví dụ: log2(8) = 3 vì 2^3 = 8." },
        { question: "Logarit tự nhiên (ln) khác gì Logarit thường?", answer: "Logarit tự nhiên (ln) có cơ số là hằng số e (khoảng 2.718). Logarit thường (log) thường có cơ số 10." },
        { question: "Tại sao không thể tính log của số âm?", answer: "Vì không có số thực dương nào lũy thừa lên lại ra kết quả âm (trong tập số thực). Do đó cơ số và biểu thức trong log phải dương." },
        { question: "Log(1) bằng bao nhiêu?", answer: "Logarit của 1 với bất kỳ cơ số nào (khác 0 và 1) đều bằng 0, vì số nào mũ 0 cũng bằng 1." },
        { question: "Công cụ này hỗ trợ cơ số bao nhiêu?", answer: "Bạn có thể nhập bất kỳ cơ số dương nào khác 1 (ví dụ 2, 10, e, 0.5...)." }
    ]
  },
  {
    id: 'trig-calc',
    slug: 'cong-cu-luong-giac',
    title: 'Lượng Giác (Sin/Cos/Tan)',
    description: 'Tính giá trị lượng giác Sin, Cos, Tan của một góc (Độ hoặc Radian).',
    icon: <Waves size={24} />,
    category: 'math',
    component: <TrigCalculator />,
    ...generateMathContent('Lượng giác', 'tỷ số lượng giác trong tam giác vuông và đường tròn đơn vị'),
    faqs: [
        { question: "Sự khác biệt giữa Độ (Degree) và Radian?", answer: "Độ chia đường tròn thành 360 phần. Radian dựa trên bán kính đường tròn (1 vòng = 2π rad). 180 độ = π radian." },
        { question: "Tại sao Tan(90 độ) lại bị lỗi hoặc vô cực?", answer: "Vì Tan = Sin/Cos. Tại 90 độ, Cos = 0. Trong toán học không thể chia cho 0 nên Tan(90) không xác định." },
        { question: "Giá trị Sin và Cos nằm trong khoảng nào?", answer: "Với góc thực bất kỳ, giá trị của Sin và Cos luôn nằm trong khoảng từ -1 đến 1." },
        { question: "Làm sao đổi từ Độ sang Radian?", answer: "Nhân số độ với (π/180). Ví dụ 90 độ * (π/180) = π/2 radian." },
        { question: "Công cụ này dùng cho tam giác vuông hay thường?", answer: "Giá trị lượng giác của một góc là cố định, nên nó đúng cho mọi trường hợp, kể cả trong tam giác vuông hay trên đường tròn lượng giác." }
    ]
  },
  {
    id: 'calculus-calc',
    slug: 'tinh-dao-ham-nguyen-ham',
    title: 'Đạo Hàm & Nguyên Hàm',
    description: 'Tính đạo hàm và nguyên hàm cơ bản của hàm đa thức (f(x) = ax^n).',
    icon: <Calculator size={24} />,
    category: 'math',
    component: <CalculusCalculator />,
    ...generateMathContent('Giải tích', 'phép tính vi phân và tích phân cơ bản cho đa thức'),
    faqs: [
        { question: "Công cụ này hỗ trợ những hàm số nào?", answer: "Hiện tại công cụ hỗ trợ tính toán cho hàm đơn thức/đa thức dạng f(x) = ax^n." },
        { question: "Công thức tính đạo hàm là gì?", answer: "Với f(x) = ax^n, đạo hàm f'(x) = n*a*x^(n-1)." },
        { question: "Nguyên hàm là gì?", answer: "Nguyên hàm là phép toán ngược của đạo hàm. Nếu F'(x) = f(x) thì F(x) là nguyên hàm của f(x)." },
        { question: "Hằng số C trong nguyên hàm nghĩa là gì?", answer: "C là hằng số tích phân. Vì đạo hàm của hằng số bằng 0, nên có vô số hàm số có cùng đạo hàm, khác nhau hằng số C." },
        { question: "Tôi có thể tính đạo hàm số âm không?", answer: "Được. Công cụ hỗ trợ đầy đủ số mũ âm và số mũ phân số (căn thức)." }
    ]
  },
  {
    id: 'roman-converter',
    slug: 'doi-so-la-ma',
    title: 'Số La Mã',
    description: 'Chuyển đổi qua lại giữa số tự nhiên và chữ số La Mã.',
    icon: <PenTool size={24} />,
    category: 'math',
    component: <RomanConverter />,
    ...generateMathContent('Số La Mã', 'việc đọc và viết các ký tự số cổ đại (I, V, X, L, C, D, M)'),
    faqs: [
        { question: "Số La Mã lớn nhất có thể viết là bao nhiêu?", answer: "Theo quy tắc chuẩn, số lớn nhất là 3999 (MMMCMXCIX). Các số lớn hơn cần ký hiệu đặc biệt (gạch trên đầu)." },
        { question: "Có số 0 trong chữ số La Mã không?", answer: "Không. Người La Mã cổ đại không có ký hiệu cho số 0." },
        { question: "Quy tắc trừ trong số La Mã là gì?", answer: "Số nhỏ đặt trước số lớn nghĩa là trừ đi (ví dụ IV = 5-1 = 4). Số nhỏ đặt sau là cộng thêm (VI = 5+1 = 6)." },
        { question: "Năm 2024 viết thế nào?", answer: "MMXXIV (M=1000, M=1000, X=10, X=10, IV=4)." },
        { question: "Tại sao đồng hồ hay dùng IIII thay vì IV?", answer: "Đây là truyền thống thẩm mỹ để tạo sự cân đối với số VIII ở phía đối diện mặt đồng hồ." }
    ]
  },
  {
      id: 'compound-interest',
      slug: 'tinh-lai-kep',
      title: 'Tính Lãi Kép',
      description: 'Công cụ tính lãi suất kép gửi tiết kiệm ngân hàng, đầu tư.',
      icon: <TrendingUp size={24} />,
      category: 'math',
      component: <FinanceCalculator />,
      ...generateMathContent('Lãi kép', 'sức mạnh của lãi suất trong đầu tư tài chính'),
      faqs: [
        { question: "Lãi kép là gì và khác gì lãi đơn?", answer: "Lãi kép là 'lãi mẹ đẻ lãi con', tiền lãi được cộng dồn vào gốc để tính lãi tiếp. Lãi đơn chỉ tính trên gốc ban đầu." },
        { question: "Công thức tính lãi kép là gì?", answer: "A = P(1 + r/n)^(nt). Trong đó P là gốc, r là lãi suất, n là số lần ghép lãi/năm, t là số năm." },
        { question: "Kỳ hạn ghép lãi ảnh hưởng thế nào?", answer: "Ghép lãi càng nhiều lần (hàng tháng vs hàng năm) thì số tiền nhận được càng lớn do hiệu ứng lãi kép diễn ra nhanh hơn." },
        { question: "Quy tắc 72 trong lãi kép là gì?", answer: "Đây là mẹo nhẩm nhanh: Lấy 72 chia cho lãi suất (%) sẽ ra số năm cần thiết để tài sản nhân đôi." },
        { question: "Công cụ này có tính được lãi gửi ngân hàng không?", answer: "Có. Đây chính là cách tính lãi sổ tiết kiệm tích lũy hoặc lãi suất tiền gửi có kỳ hạn tái tục gốc và lãi." }
      ]
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
      ...generateMathContent('Chuyển động cơ học', 'các bài toán vật lý lớp 8, lớp 10 về chuyển động'),
      faqs: [
        { question: "Công thức tính vận tốc là gì?", answer: "Vận tốc = Quãng đường / Thời gian (v = s/t). Đơn vị thường dùng là m/s hoặc km/h." },
        { question: "Làm sao đổi từ km/h sang m/s?", answer: "Bạn chia giá trị km/h cho 3.6. Ví dụ: 36 km/h = 10 m/s." },
        { question: "Nếu vận tốc thay đổi thì tính thế nào?", answer: "Công cụ này tính cho chuyển động đều (vận tốc không đổi). Với chuyển động biến đổi, bạn cần dùng công thức Vận tốc trung bình." },
        { question: "Đơn vị chuẩn SI của thời gian là gì?", answer: "Là Giây (second - s). Trong các bài toán vật lý, bạn nên đổi thời gian về giây để tính toán chính xác." },
        { question: "Vận tốc âm có nghĩa là gì?", answer: "Trong vật lý, vận tốc âm biểu thị vật đang chuyển động theo chiều ngược lại với chiều dương đã chọn." }
      ]
  },
  {
      id: 'physics-work',
      slug: 'tinh-cong-cong-suat',
      title: 'Tính Công & Công Suất',
      description: 'Tính Công cơ học (A) và Công suất (P) thực hiện được trong một khoảng thời gian.',
      icon: <Hammer size={24} />,
      category: 'math',
      component: <PhysicsCalculator defaultMode="work" />,
      ...generateMathContent('Công và Công suất', 'hiệu suất làm việc của máy móc và con người'),
      faqs: [
        { question: "Khi nào thì có công cơ học?", answer: "Chỉ khi có lực tác dụng vào vật và làm vật dịch chuyển theo phương của lực thì mới sinh công." },
        { question: "Đơn vị của Công và Công suất?", answer: "Công đo bằng Joule (J). Công suất đo bằng Watt (W). 1 W = 1 J/s." },
        { question: "1 Mã lực (HP) bằng bao nhiêu Watt?", answer: "1 HP (Horsepower) xấp xỉ 746 Watt. Đây là đơn vị thường dùng cho động cơ ô tô, máy lạnh." },
        { question: "Công thức tính công suất là gì?", answer: "P = A / t (Công suất = Công thực hiện / Thời gian). Hoặc P = F * v (Lực * Vận tốc)." },
        { question: "Tại sao mang vật nặng đứng yên lại không sinh công?", answer: "Vì dù có lực nâng nhưng quãng đường dịch chuyển s = 0, nên theo công thức A = F*s thì Công bằng 0." }
      ]
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
    ...generateTextContent('Bộ Đếm Từ Online', 'Công cụ đếm từ giúp bạn kiểm soát độ dài văn bản, phù hợp cho việc viết bài SEO, tiểu luận hay bài đăng mạng xã hội.'),
    faqs: [
        { question: "Công cụ đếm từ hoạt động như thế nào?", answer: "Hệ thống phân tích khoảng trắng và dấu câu để xác định số lượng từ. Ký tự được đếm bao gồm cả dấu cách." },
        { question: "Tại sao số từ lại quan trọng trong SEO?", answer: "Bài viết chuẩn SEO thường cần độ dài nhất định (ví dụ >1000 từ) để Google đánh giá cao về độ chuyên sâu của nội dung." },
        { question: "Giới hạn độ dài văn bản là bao nhiêu?", answer: "Công cụ này xử lý tốt hàng trăm nghìn từ. Tuy nhiên, nếu văn bản quá dài (như cả cuốn tiểu thuyết), trình duyệt có thể bị chậm." },
        { question: "Công cụ có lưu văn bản của tôi không?", answer: "Không. Mọi xử lý đều diễn ra trên trình duyệt của bạn (Client-side), đảm bảo quyền riêng tư tuyệt đối." },
        { question: "Sự khác biệt giữa 'Ký tự' và 'Ký tự không có dấu cách'?", answer: "'Ký tự' đếm mọi thứ bạn gõ. 'Ký tự không dấu cách' giúp bạn biết lượng nội dung thực tế, thường dùng để tính phí dịch thuật hoặc soạn tin nhắn." }
    ]
  },
  {
    id: 'num-to-word',
    slug: 'doc-so-thanh-chu',
    title: 'Đọc Số Thành Chữ',
    description: 'Chuyển đổi dãy số thành văn bản tiếng Việt.',
    icon: <BookOpen size={24} />,
    category: 'text',
    component: <NumberToWord />,
    ...generateTextContent('Đọc Số Thành Chữ', 'Tiện ích tự động chuyển các dãy số dài thành văn bản tiếng Việt chuẩn, rất hữu ích khi viết hóa đơn, phiếu thu chi hoặc văn bản hành chính.'),
    faqs: [
        { question: "Công cụ đọc được số lớn đến mức nào?", answer: "Hệ thống hỗ trợ đọc số lên tới hàng tỷ tỷ (hàng chục chữ số), đủ đáp ứng mọi nhu cầu tài chính thông thường." },
        { question: "Cách đọc số có chuẩn ngữ pháp không?", answer: "Có. Công cụ tuân theo quy tắc đọc số chuẩn tiếng Việt (ví dụ: linh/lẻ, mốt/một, tư/bốn, lăm/năm)." },
        { question: "Tôi có thể dùng để viết hóa đơn VAT không?", answer: "Rất tốt. Bạn chỉ cần copy kết quả và thêm chữ 'đồng' vào cuối để điền vào dòng 'Số tiền bằng chữ' trên hóa đơn." },
        { question: "Công cụ có đọc được số âm không?", answer: "Hiện tại công cụ tập trung vào số tự nhiên dương để phục vụ ghi chép tài chính." },
        { question: "Tại sao số 21 đọc là 'hai mươi mốt'?", answer: "Đây là quy tắc biến âm trong tiếng Việt: số 1 khi đứng sau hàng chục (từ 20 trở lên) sẽ đọc là 'mốt' để tránh nhầm lẫn." }
    ]
  },
  {
    id: 'word-to-num',
    slug: 'chuyen-chu-thanh-so',
    title: 'Chuyển Chữ Thành Số',
    description: 'Chuyển đổi văn bản viết tay sang dạng số.',
    icon: <Type size={24} />,
    category: 'text',
    component: <WordToNumber />,
    ...generateTextContent('Chuyển Chữ Thành Số', 'Công cụ hỗ trợ chuyển đổi các văn bản chứa số liệu (ví dụ: "một triệu hai trăm nghìn") về dạng số học để dễ dàng tính toán.'),
    faqs: [
        { question: "Công cụ này dùng để làm gì?", answer: "Nó giúp bạn nhanh chóng chuyển đổi số tiền bằng chữ trong hợp đồng/văn bản về dạng số để nhập vào Excel hoặc máy tính." },
        { question: "Tôi có cần nhập đúng chính tả không?", answer: "Rất quan trọng. Bạn cần nhập đúng các từ chỉ số lượng (triệu, nghìn, trăm...) để hệ thống nhận diện chính xác." },
        { question: "Công cụ hỗ trợ những đơn vị nào?", answer: "Hỗ trợ các đơn vị chuẩn: đơn, chục, trăm, nghìn (ngàn), triệu, tỷ." },
        { question: "Nó có hiểu được tiếng địa phương không?", answer: "Hệ thống hiểu các từ phổ thông như 'ngàn' (nghìn), 'lẻ' (linh), 'mốt', 'tư', 'lăm'." },
        { question: "Giới hạn của công cụ là gì?", answer: "Hiện tại công cụ đang trong giai đoạn Beta và xử lý tốt nhất các cấu trúc số chuẩn mực, các câu văn phức tạp có thể chưa chính xác 100%." }
    ]
  },
  
  // --- SECURITY ---
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
    ]),
    faqs: [
        { question: "Công thức đổi từ độ C sang độ F?", answer: "F = (C × 1.8) + 32. Ví dụ: 30°C = 86°F." },
        { question: "Độ K (Kelvin) là gì?", answer: "Kelvin là đơn vị nhiệt độ trong hệ đo lường quốc tế, dùng nhiều trong vật lý. 0K là độ không tuyệt đối (-273.15°C)." },
        { question: "Nhiệt độ cơ thể người bình thường là bao nhiêu?", answer: "Khoảng 37°C, tương đương 98.6°F." },
        { question: "Tại sao Mỹ dùng độ F?", answer: "Đây là thói quen lịch sử. Độ F cho phép chia nhỏ thang đo nhiệt độ thời tiết chi tiết hơn mà không cần dùng số thập phân." },
        { question: "Có nhiệt độ âm độ K không?", answer: "Theo vật lý lý thuyết, 0K là giới hạn thấp nhất của nhiệt độ, không thể có nhiệt độ thấp hơn 0K." }
    ]
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
       { question: "1 Hz bằng bao nhiêu RPM?", answer: "1 Hz bằng đúng 60 RPM (Vòng/phút). Vì 1 giây quay 1 vòng thì 1 phút (60 giây) sẽ quay 60 vòng." },
       { question: "Tần số 50Hz và 60Hz điện lưới khác nhau thế nào?", answer: "50Hz đảo chiều 100 lần/giây, 60Hz đảo chiều 120 lần/giây. 60Hz hiệu quả hơn cho động cơ nhưng truyền tải tốn kém hơn. Việt Nam dùng chuẩn 50Hz." },
       { question: "GHz trong máy tính nghĩa là gì?", answer: "Đó là tốc độ xung nhịp CPU. 3.0 GHz nghĩa là CPU thực hiện 3 tỷ chu kỳ tính toán mỗi giây." },
       { question: "Tai người nghe được tần số nào?", answer: "Tai người bình thường nghe được âm thanh trong khoảng 20Hz đến 20.000Hz (20kHz). Dưới đó là hạ âm, trên đó là siêu âm." },
       { question: "RPM quan trọng thế nào trong ô tô?", answer: "RPM hiển thị tốc độ quay của trục khuỷu động cơ. RPM quá cao (Redline) có thể làm hỏng động cơ." }
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
       { question: "1 GB bằng bao nhiêu MB?", answer: "Theo chuẩn nhị phân (Windows sử dụng), 1 GB = 1024 MB. Theo chuẩn thập phân (quảng cáo), 1 GB = 1000 MB." },
       { question: "Sự khác nhau giữa MB và Mb?", answer: "MB (Megabyte) dùng cho dung lượng lưu trữ. Mb (Megabit) dùng cho tốc độ mạng. 1 MB = 8 Mb. Mạng 100Mbps tải file tối đa 12.5 MB/s." },
       { question: "Tại sao ổ cứng 500GB chỉ hiển thị khoảng 465GB trên Windows?", answer: "Do chênh lệch cách tính. Nhà sản xuất tính 500 tỷ byte. Windows chia cho 1024^3 (khoảng 1.07 tỷ) nên ra kết quả ~465GB." },
       { question: "Đơn vị lớn nhất sau TB là gì?", answer: "Sau Terabyte (TB) là Petabyte (PB), Exabyte (EB), Zettabyte (ZB), Yottabyte (YB)." },
       { question: "Một bài hát MP3 nặng bao nhiêu?", answer: "Trung bình một bài hát chất lượng cao dài 4 phút nặng khoảng 8-10 MB." }
    ]
  },

  // --- CONVERTERS (NEW REQUESTS) ---
  createUnitTool('quantity-conv', 'doi-don-vi-so-dem', 'Đổi Số Đếm', 'số lượng đơn vị đóng gói', 'converter', <LayoutGrid size={24} />, QUANTITY_UNITS),
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
