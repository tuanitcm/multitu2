
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { 
  Calculator, 
  Menu, 
  X, 
  Search, 
  Box, 
  Percent, 
  Type, 
  Shield, 
  Code, 
  ArrowRightLeft, 
  Zap, 
  Heart,
  Home,
  Clock,
  History,
  Trash2,
  Database,
  LayoutGrid,
  List,
  Wrench,
  Calendar
} from 'lucide-react';
import { Category, Tool } from './types';

// Import components
import { BasicPercentage } from './components/calculators/BasicPercentage';
import { RatioPercentage } from './components/calculators/RatioPercentage';
import { PercentageChange } from './components/calculators/PercentageChange';
import { FindWhole } from './components/calculators/FindWhole';
import { WordCounter } from './components/tools/WordCounter';
import { PasswordGenerator } from './components/tools/PasswordGenerator';
import { LengthConverter } from './components/calculators/LengthConverter';
import { UnitConverter } from './components/calculators/UnitConverter';
import { TemperatureConverter } from './components/calculators/TemperatureConverter';
import { NumberToWord, WordToNumber, RomanConverter } from './components/tools/NumberConverters';
import { 
    CircleCalculator, TriangleCalculator, SquareCalculator, RectangleCalculator, 
    TrapezoidCalculator, RhombusCalculator, CubeCalculator, SphereCalculator, 
    CylinderCalculator, ConeCalculator, ParallelogramCalculator, CuboidCalculator 
} from './components/calculators/GeometryCalculator';
import { SequenceCalculator } from './components/calculators/SequenceCalculator';
import { LogarithmCalculator, TrigCalculator, CalculusCalculator } from './components/calculators/AdvancedMath';
import { PhysicsCalculator } from './components/calculators/PhysicsCalculator';
import { FinanceCalculator } from './components/calculators/FinanceCalculator';
import { DiscountCalculator, BMICalculator, BMRCalculator, DateCalculator, IdealWeightCalculator, WaterCalculator } from './components/calculators/EverydayCalculators';
import { DayCounter, CountdownTimer } from './components/tools/TimeTools';
import { Card } from './components/ui/Card';
import { Accordion } from './components/ui/Accordion';
import { Footer } from './components/layout/Footer';
import { InfoPage } from './components/pages/InfoPages';

// Define Categories
const CATEGORIES_CONFIG: { id: Category; label: string; icon: React.ReactNode; slug?: string }[] = [
  { id: 'all', label: 'Tất cả', icon: <Home size={20} /> },
  { id: 'math', label: 'Toán học', icon: <Calculator size={20} />, slug: 'math' },
  { id: 'text', label: 'Văn bản', icon: <Type size={20} />, slug: 'text' },
  { id: 'security', label: 'Bảo mật', icon: <Shield size={20} />, slug: 'security' },
  { id: 'converter', label: 'Chuyển đổi', icon: <ArrowRightLeft size={20} />, slug: 'converter' },
  { id: 'electricity', label: 'Điện & VL', icon: <Zap size={20} />, slug: 'electricity' },
  { id: 'health', label: 'Sức khỏe', icon: <Heart size={20} />, slug: 'health' },
  { id: 'utility', label: 'Tiện ích', icon: <Wrench size={20} />, slug: 'utility' },
];

const TIME_UNITS = [
    { id: 's', label: 'Giây (s)', ratio: 1 },
    { id: 'min', label: 'Phút (min)', ratio: 60 },
    { id: 'h', label: 'Giờ (h)', ratio: 3600 },
    { id: 'd', label: 'Ngày (d)', ratio: 86400 },
    { id: 'wk', label: 'Tuần (wk)', ratio: 604800 },
    { id: 'mo', label: 'Tháng (30 ngày)', ratio: 2592000 },
    { id: 'yr', label: 'Năm (365 ngày)', ratio: 31536000 },
];

const DATA_UNITS = [
    { id: 'bit', label: 'Bit (b)', ratio: 0.125 },
    { id: 'B', label: 'Byte (B)', ratio: 1 },
    { id: 'Kb', label: 'Kilobit (Kb)', ratio: 128 },
    { id: 'KB', label: 'Kilobyte (KB)', ratio: 1024 },
    { id: 'Mb', label: 'Megabit (Mb)', ratio: 131072 },
    { id: 'MB', label: 'Megabyte (MB)', ratio: 1048576 },
    { id: 'Gb', label: 'Gigabit (Gb)', ratio: 134217728 },
    { id: 'GB', label: 'Gigabyte (GB)', ratio: 1073741824 },
    { id: 'Tb', label: 'Terabit (Tb)', ratio: 137438953472 },
    { id: 'TB', label: 'Terabyte (TB)', ratio: 1099511627776 },
    { id: 'PB', label: 'Petabyte (PB)', ratio: 1125899906842624 },
];

// Define Tools
const TOOLS: Tool[] = [
    // MATH
    { id: 'percentage', slug: 'percentage-calculator', title: 'Tính phần trăm (%)', description: 'Tính % của số, thay đổi %, tìm số gốc.', category: 'math', icon: <Percent size={24} />, component: <BasicPercentage /> },
    { id: 'ratio', slug: 'ratio-percentage', title: 'Tỷ lệ phần trăm', description: 'Tính tỷ lệ % giữa hai số.', category: 'math', icon: <Percent size={24} />, component: <RatioPercentage /> },
    { id: 'percent-change', slug: 'percentage-change', title: 'Tăng giảm phần trăm', description: 'Tính % tăng/giảm giữa hai giá trị.', category: 'math', icon: <Percent size={24} />, component: <PercentageChange /> },
    { id: 'find-whole', slug: 'find-whole', title: 'Tìm số tổng', description: 'Tìm số tổng khi biết giá trị phần trăm.', category: 'math', icon: <Percent size={24} />, component: <FindWhole /> },
    { id: 'sequence', slug: 'sequence-calculator', title: 'Cấp số cộng / nhân', description: 'Tính số hạng, tổng cấp số cộng/nhân.', category: 'math', icon: <Calculator size={24} />, component: <SequenceCalculator /> },
    { id: 'logarithm', slug: 'logarithm', title: 'Tính Logarit', description: 'Tính logarit cơ số bất kỳ.', category: 'math', icon: <Calculator size={24} />, component: <LogarithmCalculator /> },
    { id: 'trigonometry', slug: 'trigonometry', title: 'Lượng giác', description: 'Sin, Cos, Tan của góc.', category: 'math', icon: <Calculator size={24} />, component: <TrigCalculator /> },
    { id: 'calculus', slug: 'calculus-basic', title: 'Đạo hàm / Nguyên hàm', description: 'Tính đơn giản cho hàm lũy thừa.', category: 'math', icon: <Calculator size={24} />, component: <CalculusCalculator /> },
    
    // GEOMETRY
    { id: 'circle', slug: 'circle', title: 'Hình Tròn', description: 'Tính chu vi, diện tích hình tròn.', category: 'math', icon: <Box size={24} />, component: <CircleCalculator /> },
    { id: 'triangle', slug: 'triangle', title: 'Hình Tam Giác', description: 'Diện tích (Heron), chu vi tam giác.', category: 'math', icon: <Box size={24} />, component: <TriangleCalculator /> },
    { id: 'square', slug: 'square', title: 'Hình Vuông', description: 'Diện tích, chu vi, đường chéo.', category: 'math', icon: <Box size={24} />, component: <SquareCalculator /> },
    { id: 'rectangle', slug: 'rectangle', title: 'Hình Chữ Nhật', description: 'Diện tích, chu vi hình chữ nhật.', category: 'math', icon: <Box size={24} />, component: <RectangleCalculator /> },
    { id: 'trapezoid', slug: 'trapezoid', title: 'Hình Thang', description: 'Diện tích, chu vi hình thang.', category: 'math', icon: <Box size={24} />, component: <TrapezoidCalculator /> },
    { id: 'rhombus', slug: 'rhombus', title: 'Hình Thoi', description: 'Diện tích, chu vi hình thoi.', category: 'math', icon: <Box size={24} />, component: <RhombusCalculator /> },
    { 
        id: 'parallelogram', 
        slug: 'hinh-binh-hanh', 
        title: 'Hình Bình Hành', 
        description: 'Công cụ tính nhanh diện tích và chu vi hình bình hành khi biết cạnh đáy, chiều cao và cạnh bên.', 
        category: 'math', 
        icon: <Box size={24} />, 
        component: <ParallelogramCalculator />,
        faqs: [
            { question: "Công thức tính diện tích hình bình hành là gì?", answer: "Diện tích S = a x h, trong đó a là cạnh đáy và h là chiều cao tương ứng." },
            { question: "Làm sao tính chu vi hình bình hành?", answer: "Chu vi P = 2 x (a + b), trong đó a và b là độ dài hai cạnh kề nhau." },
            { question: "Hình bình hành có phải là hình chữ nhật không?", answer: "Không hẳn. Hình chữ nhật là một trường hợp đặc biệt của hình bình hành khi có một góc vuông." },
            { question: "Đơn vị đo diện tích và chu vi khác nhau thế nào?", answer: "Chu vi dùng đơn vị độ dài (m, cm), còn diện tích dùng đơn vị vuông (m², cm²)." },
            { question: "Có cần nhập đủ cả 3 số liệu không?", answer: "Để tính diện tích chỉ cần đáy và cao. Để tính chu vi cần đáy và cạnh bên." }
        ],
        ratingValue: 4.8,
        reviewCount: 320
    },
    { id: 'cube', slug: 'cube', title: 'Hình Lập Phương', description: 'Thể tích, diện tích xung quanh/toàn phần.', category: 'math', icon: <Box size={24} />, component: <CubeCalculator /> },
    { id: 'sphere', slug: 'sphere', title: 'Hình Cầu', description: 'Thể tích, diện tích mặt cầu.', category: 'math', icon: <Box size={24} />, component: <SphereCalculator /> },
    { id: 'cylinder', slug: 'cylinder', title: 'Hình Trụ', description: 'Thể tích, diện tích xung quanh/toàn phần.', category: 'math', icon: <Box size={24} />, component: <CylinderCalculator /> },
    { id: 'cone', slug: 'cone', title: 'Hình Nón', description: 'Thể tích, diện tích xung quanh/toàn phần.', category: 'math', icon: <Box size={24} />, component: <ConeCalculator /> },
    { id: 'cuboid', slug: 'cuboid', title: 'Hình Hộp CN', description: 'Thể tích, diện tích hình hộp chữ nhật.', category: 'math', icon: <Box size={24} />, component: <CuboidCalculator /> },

    // TEXT
    { id: 'word-counter', slug: 'word-counter', title: 'Đếm từ & ký tự', description: 'Đếm số từ, ký tự, câu, đoạn văn.', category: 'text', icon: <Type size={24} />, component: <WordCounter /> },
    { id: 'number-to-word', slug: 'number-to-word', title: 'Đọc số thành chữ', description: 'Chuyển số sang chữ tiếng Việt.', category: 'text', icon: <Type size={24} />, component: <NumberToWord /> },
    { id: 'word-to-number', slug: 'word-to-number', title: 'Chữ sang số', description: 'Chuyển chữ số tiếng Việt sang số (Beta).', category: 'text', icon: <Type size={24} />, component: <WordToNumber /> },
    { id: 'roman', slug: 'roman-numerals', title: 'Số La Mã', description: 'Chuyển đổi qua lại số La Mã.', category: 'converter', icon: <Type size={24} />, component: <RomanConverter /> },
    
    // SECURITY
    { id: 'password', slug: 'password-generator', title: 'Tạo mật khẩu mạnh', description: 'Tạo mật khẩu ngẫu nhiên an toàn.', category: 'security', icon: <Shield size={24} />, component: <PasswordGenerator /> },
    
    // CONVERTER
    { id: 'length', slug: 'length-converter', title: 'Đổi chiều dài', description: 'Mét, Centimet, Kilomet...', category: 'converter', icon: <ArrowRightLeft size={24} />, component: <LengthConverter /> },
    { id: 'temp', slug: 'temp-converter', title: 'Đổi nhiệt độ', description: 'Celsius, Fahrenheit, Kelvin.', category: 'converter', icon: <ArrowRightLeft size={24} />, component: <TemperatureConverter /> },
    { id: 'unit-weight', slug: 'weight-converter', title: 'Đổi khối lượng', description: 'Kg, Gram, Lbs, Oz...', category: 'converter', icon: <ArrowRightLeft size={24} />, component: <UnitConverter units={[{id:'kg', label:'Kilogram', ratio:1}, {id:'g', label:'Gram', ratio:0.001}, {id:'lb', label:'Pounds', ratio:0.453592}, {id:'oz', label:'Ounces', ratio:0.0283495}]} /> },
    { 
        id: 'time', 
        slug: 'doi-don-vi-thoi-gian', 
        title: 'Đổi thời gian', 
        description: 'Chuyển đổi giây, phút, giờ, ngày, tuần, tháng, năm.', 
        category: 'converter', 
        icon: <Clock size={24} />, 
        component: <UnitConverter units={TIME_UNITS} />,
        faqs: [
            { question: "1 ngày có bao nhiêu giây?", answer: "1 ngày có 24 giờ, mỗi giờ 60 phút, mỗi phút 60 giây. Vậy 1 ngày = 24 * 60 * 60 = 86,400 giây." },
            { question: "Công cụ tính 1 tháng là bao nhiêu ngày?", answer: "Trong công cụ này, 1 tháng được quy ước là 30 ngày để thuận tiện cho việc ước lượng." },
            { question: "Làm sao đổi từ phút sang giờ?", answer: "Chia số phút cho 60. Ví dụ: 90 phút = 90 / 60 = 1.5 giờ." },
            { question: "1 năm có bao nhiêu giờ?", answer: "1 năm thường (365 ngày) có 365 * 24 = 8,760 giờ." },
            { question: "Mục đích chuyển đổi thời gian?", answer: "Giúp lập kế hoạch, tính toán thời hạn dự án, hoặc quy đổi các đơn vị đo lường trong vật lý và đời sống." }
        ],
        ratingValue: 4.8,
        reviewCount: 1540
    },
    { 
        id: 'data', 
        slug: 'doi-don-vi-du-lieu', 
        title: 'Đổi đơn vị dữ liệu', 
        description: 'Chuyển đổi nhanh giữa các đơn vị đo lường dữ liệu máy tính: Bit, Byte, Kilobyte, Megabyte, Gigabyte, Terabyte...', 
        category: 'converter', 
        icon: <Database size={24} />, 
        component: <UnitConverter units={DATA_UNITS} formatDecimals={6} />,
        faqs: [
            { question: "1 GB bằng bao nhiêu MB?", answer: "Theo hệ nhị phân (thường dùng trong hệ điều hành như Windows), 1 GB = 1024 MB. Tuy nhiên, các nhà sản xuất thiết bị lưu trữ thường tính 1 GB = 1000 MB." },
            { question: "Tại sao dung lượng ổ cứng thực tế lại thấp hơn thông số?", answer: "Do sự khác biệt về cách tính: nhà sản xuất dùng hệ thập phân (1GB = 10^9 bytes), còn máy tính dùng hệ nhị phân (1GB = 2^30 bytes). Chênh lệch khoảng 7%." },
            { question: "KB và Kb khác nhau thế nào?", answer: "KB là Kilobyte (đơn vị lưu trữ), còn Kb là Kilobit (đơn vị tốc độ truyền tải). 1 Byte = 8 bits." },
            { question: "Thứ tự các đơn vị từ nhỏ đến lớn?", answer: "Bit < Byte < Kilobyte < Megabyte < Gigabyte < Terabyte < Petabyte < Exabyte < Zettabyte < Yottabyte." },
            { question: "1 TB lưu được bao nhiêu ảnh?", answer: "Nếu trung bình một bức ảnh chất lượng cao nặng 5MB, thì 1 TB (khoảng 1 triệu MB) có thể lưu được khoảng 200,000 bức ảnh." }
        ],
        ratingValue: 4.7,
        reviewCount: 890
    },

    // HEALTH
    { id: 'bmi', slug: 'bmi-calculator', title: 'Tính BMI', description: 'Chỉ số khối cơ thể & đánh giá.', category: 'health', icon: <Heart size={24} />, component: <BMICalculator /> },
    { id: 'bmr', slug: 'bmr-tdee', title: 'BMR & TDEE', description: 'Tính calo tiêu thụ mỗi ngày.', category: 'health', icon: <Heart size={24} />, component: <BMRCalculator /> },
    { id: 'water', slug: 'water-calculator', title: 'Nước uống mỗi ngày', description: 'Tính lượng nước cần nạp.', category: 'health', icon: <Heart size={24} />, component: <WaterCalculator /> },
    { id: 'ideal-weight', slug: 'ideal-weight', title: 'Cân nặng lý tưởng', description: 'Theo công thức y khoa.', category: 'health', icon: <Heart size={24} />, component: <IdealWeightCalculator /> },
    
    // OTHERS/EVERYDAY
    { id: 'discount', slug: 'discount-calculator', title: 'Tính giảm giá', description: 'Giá sale, số tiền tiết kiệm.', category: 'math', icon: <Percent size={24} />, component: <DiscountCalculator /> },
    { id: 'date-age', slug: 'age-calculator', title: 'Tính tuổi & Ngày', description: 'Tính tuổi chính xác theo ngày sinh.', category: 'health', icon: <Heart size={24} />, component: <DateCalculator /> },
    { id: 'finance', slug: 'compound-interest', title: 'Lãi suất kép', description: 'Tính tiền gửi tiết kiệm, lãi kép.', category: 'math', icon: <Calculator size={24} />, component: <FinanceCalculator /> },
    { id: 'physics', slug: 'physics-calculator', title: 'Công thức Vật Lý', description: 'Vận tốc, Công, Công suất.', category: 'electricity', icon: <Zap size={24} />, component: <PhysicsCalculator /> },

    // UTILITIES (TIME TOOLS)
    { 
        id: 'day-counter', 
        slug: 'dem-ngay', 
        title: 'Đếm ngày (Day Counter)', 
        description: 'Tính số ngày giữa hai mốc thời gian bất kỳ. Công cụ đếm ngày chính xác.', 
        category: 'utility', 
        icon: <Calendar size={24} />, 
        component: <DayCounter />,
        faqs: [
            { question: "Công cụ này có tính ngày nhuận không?", answer: "Có, công cụ sử dụng thuật toán lịch chuẩn nên tự động tính cả các ngày nhuận trong khoảng thời gian bạn chọn." },
            { question: "Làm sao để đếm ngược đến một ngày?", answer: "Bạn chỉ cần nhập Ngày hiện tại vào ô 'Từ ngày' và Ngày tương lai vào ô 'Đến ngày'." },
            { question: "Kết quả bao gồm cả ngày bắt đầu hay không?", answer: "Kết quả là khoảng cách (hiệu số) giữa hai ngày. Ví dụ từ ngày 1 đến ngày 2 là 1 ngày." }
        ],
        ratingValue: 4.9,
        reviewCount: 520
    },
    { 
        id: 'countdown', 
        slug: 'countdown-timer', 
        title: 'Đếm ngược (Timer)', 
        description: 'Đồng hồ đếm ngược trực tuyến (Hours, Minutes, Seconds).', 
        category: 'utility', 
        icon: <Clock size={24} />, 
        component: <CountdownTimer />,
        faqs: [
            { question: "Đồng hồ có chạy khi tôi tắt tab không?", answer: "Không, do hạn chế của trình duyệt, đồng hồ đếm ngược này chỉ hoạt động khi bạn mở tab." },
            { question: "Tôi có thể đặt giờ quá 24h không?", answer: "Có, bạn có thể nhập số giờ tùy ý, ví dụ 48 giờ." }
        ],
        ratingValue: 4.8,
        reviewCount: 310
    },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activePage, setActivePage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [showSearchOnScroll, setShowSearchOnScroll] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
        const saved = localStorage.getItem('recent_searches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    } catch (e) {
        console.error("Failed to load recent searches", e);
    }
  }, []);

  const saveSearchTerm = (term: string) => {
      const cleanTerm = term.trim();
      if (!cleanTerm) return;
      
      const newHistory = [cleanTerm, ...recentSearches.filter(s => s !== cleanTerm)].slice(0, 5);
      setRecentSearches(newHistory);
      localStorage.setItem('recent_searches', JSON.stringify(newHistory));
  };

  const clearRecentSearches = () => {
      setRecentSearches([]);
      localStorage.removeItem('recent_searches');
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 150) {
            setShowSearchOnScroll(true);
        } else {
            setShowSearchOnScroll(false);
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to navigate
  const navigateToCategory = (id: Category) => {
      setActiveCategory(id);
      setIsMenuOpen(false);
      setActiveToolId(null);
      setActivePage(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPage = (pageId: string) => {
      setActivePage(pageId);
      setActiveToolId(null);
      setActiveCategory('all');
      setIsMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle clicking a tool
  const handleToolClick = (toolId: string) => {
      if (searchQuery) {
          saveSearchTerm(searchQuery);
      }
      setActiveToolId(toolId);
      setActivePage(null);
      setIsSearchFocused(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredTools = TOOLS.filter(tool => {
      const matchCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
  });

  const activeTool = activeToolId ? TOOLS.find(t => t.id === activeToolId) : null;

  // Search Input Handler
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          saveSearchTerm(searchQuery);
          e.currentTarget.blur();
          setIsSearchFocused(false);
      }
  };

  const RecentSearchesDropdown = () => {
      if (!isSearchFocused || recentSearches.length === 0) return null;
      return (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <History size={12} /> Tìm kiếm gần đây
                  </span>
                  <button 
                    onClick={(e) => { e.preventDefault(); clearRecentSearches(); }}
                    className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"
                    onMouseDown={(e) => e.preventDefault()} // Prevent blur
                  >
                      <Trash2 size={12} /> Xóa
                  </button>
              </div>
              <div className="py-1">
                  {recentSearches.map((term, idx) => (
                      <button
                          key={idx}
                          className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-3"
                          onClick={() => { setSearchQuery(term); saveSearchTerm(term); setIsSearchFocused(false); }}
                          onMouseDown={(e) => e.preventDefault()} // Prevent blur before click
                      >
                          <Clock size={14} className="text-slate-400" />
                          {term}
                      </button>
                  ))}
              </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsMenuOpen(true)}
                        className="lg:hidden p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    
                    {/* Mobile Logo / Search transition */}
                    <div className="lg:hidden flex-1">
                        {showSearchOnScroll ? (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300 relative w-full max-w-[200px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input 
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                    onKeyDown={handleSearchKeyDown}
                                    className="w-full bg-slate-100 border border-slate-200 rounded-full pl-9 pr-4 py-1.5 text-sm focus:border-blue-500 outline-none text-slate-800 placeholder-slate-500"
                                />
                                {/* Mobile Dropdown would be tricky here due to size, keeping it simple or reuse logic if needed */}
                            </div>
                        ) : (
                            <div 
                                className="flex items-center gap-2 cursor-pointer" 
                                onClick={() => { setActiveToolId(null); setActiveCategory('all'); setActivePage(null); window.scrollTo({top:0, behavior:'smooth'}) }}
                            >
                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                    <Box size={20} strokeWidth={2.5} />
                                </div>
                                <span className="text-xl font-bold text-slate-900">
                                    MultiTools
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Desktop Logo */}
                    <div 
                        className="hidden lg:flex items-center gap-2 cursor-pointer" 
                        onClick={() => { setActiveToolId(null); setActiveCategory('all'); setActivePage(null); window.scrollTo({top:0, behavior:'smooth'}) }}
                    >
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <Box size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold text-slate-900">
                            MultiTools
                        </span>
                    </div>
                </div>

                {/* Desktop Search */}
                <div className="flex-1 max-w-md relative hidden lg:block group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                    <input 
                        type="text"
                        placeholder="Tìm kiếm công cụ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        onKeyDown={handleSearchKeyDown}
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-800 placeholder-slate-500"
                    />
                    <RecentSearchesDropdown />
                </div>
            </div>
        </header>

        {/* Sidebar (Desktop) */}
        <div className="hidden lg:block fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-slate-200 overflow-y-auto p-4 custom-scrollbar z-40">
            <div className="space-y-1">
                {CATEGORIES_CONFIG.map(cat => (
                    <a
                        key={cat.id}
                        href={`/${cat.slug || ''}`} 
                        onClick={(e) => { e.preventDefault(); navigateToCategory(cat.id); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                            activeCategory === cat.id && !activePage && !activeToolId
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                        {cat.icon}
                        {cat.label}
                    </a>
                ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 mb-2">Thông tin</div>
                <div className="space-y-1">
                    <button onClick={() => navigateToPage('about')} className={`w-full text-left px-4 py-2 text-sm rounded-lg ${activePage === 'about' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Về chúng tôi</button>
                    <button onClick={() => navigateToPage('contact')} className={`w-full text-left px-4 py-2 text-sm rounded-lg ${activePage === 'contact' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Liên hệ</button>
                    <button onClick={() => navigateToPage('collections')} className={`w-full text-left px-4 py-2 text-sm rounded-lg ${activePage === 'collections' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Bộ sưu tập</button>
                </div>
            </div>
        </div>

        {/* Main Content */}
        <main className={`flex-1 pt-24 pb-12 px-4 transition-all duration-300 ${!activeToolId && !activePage ? 'lg:pl-72' : 'lg:pl-72'} max-w-7xl mx-auto w-full`}>
            {activePage ? (
                <InfoPage id={activePage} />
            ) : activeTool ? (
                // Tool View
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <button 
                        onClick={() => setActiveToolId(null)}
                        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        <ArrowRightLeft size={16} /> Quay lại danh sách
                    </button>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{activeTool.title}</h1>
                            <Card className="h-full">
                                {activeTool.component}
                            </Card>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                <h2 className="font-bold text-slate-900 mb-3 text-lg">Giới thiệu</h2>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                    {activeTool.description}
                                </p>
                                {activeTool.reviewCount && (
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-4 h-4 ${i < Math.floor(activeTool.ratingValue || 5) ? 'fill-current' : 'text-slate-300'}`} viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-500">({activeTool.reviewCount} đánh giá)</span>
                                    </div>
                                )}
                            </div>

                             {/* FAQ Section */}
                             <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                <h2 className="font-bold text-slate-900 mb-4 text-lg">Câu hỏi thường gặp</h2>
                                <Accordion 
                                    items={activeTool.faqs || [
                                        { question: "Công cụ này có miễn phí không?", answer: "Có, tất cả công cụ trên MultiTools đều miễn phí trọn đời." },
                                        { question: "Dữ liệu của tôi có được lưu không?", answer: "Không, mọi tính toán được xử lý trực tiếp trên trình duyệt của bạn." }
                                    ]} 
                                />
                             </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Dashboard View
                <div className="space-y-8">
                    {/* Hero / Mobile Search */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                                    {CATEGORIES_CONFIG.find(c => c.id === activeCategory)?.label}
                                </h1>
                                <p className="text-slate-500 text-sm">
                                    {filteredTools.length} công cụ được tìm thấy
                                </p>
                            </div>
                            {/* View Toggle */}
                            <div className="hidden md:flex bg-slate-200 p-1 rounded-lg">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                                    title="Dạng lưới"
                                >
                                    <LayoutGrid size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                                    title="Dạng danh sách"
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Search Input (Visible only when not scrolled) */}
                        <div className="lg:hidden relative">
                             <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    type="text"
                                    placeholder="Tìm kiếm nhanh..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                    onKeyDown={handleSearchKeyDown}
                                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-blue-500 outline-none text-slate-800"
                                />
                            </div>
                            {/* Simple Mobile Recents, only show if focused and query is empty */}
                            {isSearchFocused && recentSearches.length > 0 && !searchQuery && (
                                <div className="mt-2 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg z-10">
                                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tìm kiếm gần đây</span>
                                        <button onClick={(e) => { e.preventDefault(); clearRecentSearches(); }} className="text-xs text-rose-500" onMouseDown={(e) => e.preventDefault()}>Xóa</button>
                                    </div>
                                    {recentSearches.map((term, idx) => (
                                        <button
                                            key={idx}
                                            className="w-full text-left px-4 py-3 text-sm text-slate-600 border-b border-slate-100 last:border-0 flex items-center gap-3 active:bg-slate-50"
                                            onClick={() => { setSearchQuery(term); saveSearchTerm(term); setIsSearchFocused(false); }}
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            <Clock size={14} className="text-slate-400" />
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tool Grid / List */}
                    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-3"}>
                        {filteredTools.map(tool => (
                            <div 
                                key={tool.id}
                                onClick={() => handleToolClick(tool.id)}
                                className={`group bg-white hover:border-blue-500/50 border border-slate-200 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 ${
                                    viewMode === 'grid' 
                                    ? 'p-5 flex flex-col h-full hover:-translate-y-1' 
                                    : 'p-4 flex items-center gap-4'
                                }`}
                            >
                                {/* View Mode: GRID */}
                                {viewMode === 'grid' ? (
                                    <>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {tool.icon}
                                            </div>
                                            <div className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
                                                {CATEGORIES_CONFIG.find(c => c.id === tool.category)?.label}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2 transition-colors">
                                            {tool.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow">
                                            {tool.description}
                                        </p>
                                        {/* Rating */}
                                        {tool.ratingValue && (
                                            <div className="flex items-center gap-1 text-xs text-yellow-500 pt-3 border-t border-slate-100 mt-auto">
                                                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                <span className="font-bold text-slate-700">{tool.ratingValue}</span>
                                                <span className="text-slate-400">({tool.reviewCount})</span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {/* View Mode: LIST */}
                                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                                            {tool.icon}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                                    {tool.title}
                                                </h3>
                                                 <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
                                                    {CATEGORIES_CONFIG.find(c => c.id === tool.category)?.label}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-500 line-clamp-1">
                                                {tool.description}
                                            </p>
                                        </div>
                                         {/* Rating List View */}
                                         {tool.ratingValue && (
                                            <div className="hidden sm:flex flex-col items-end gap-1 text-xs text-yellow-500 flex-shrink-0 ml-4">
                                                <div className="flex items-center gap-1">
                                                     <span className="font-bold text-base text-slate-700">{tool.ratingValue}</span>
                                                     <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                </div>
                                                <span className="text-slate-400">({tool.reviewCount} đánh giá)</span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {filteredTools.length === 0 && (
                        <div className="text-center py-20">
                            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-200 mb-4">
                                <Search size={32} className="text-slate-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Không tìm thấy công cụ</h3>
                            <p className="text-slate-500">Thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.</p>
                        </div>
                    )}
                </div>
            )}
        </main>

        <Footer 
            categories={CATEGORIES_CONFIG} 
            onCategoryClick={navigateToCategory}
            onPageClick={navigateToPage}
        />

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
            <div className="fixed inset-0 z-[60] bg-white animate-in slide-in-from-right duration-300 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                            <Box size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold text-slate-900">Menu</span>
                    </div>
                    <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2 mb-6">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Danh mục</div>
                        {CATEGORIES_CONFIG.map(cat => (
                            <a
                                key={cat.id}
                                href={`/${cat.slug || ''}`}
                                onClick={(e) => { e.preventDefault(); navigateToCategory(cat.id); }}
                                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                                    activeCategory === cat.id 
                                    ? 'bg-blue-50 text-blue-700' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                {cat.icon}
                                {cat.label}
                            </a>
                        ))}
                    </div>
                    
                    <div className="space-y-2 border-t border-slate-100 pt-6">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Thông tin</div>
                         <button onClick={() => navigateToPage('about')} className="w-full text-left px-4 py-3 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">Về chúng tôi</button>
                         <button onClick={() => navigateToPage('contact')} className="w-full text-left px-4 py-3 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">Liên hệ</button>
                         <button onClick={() => navigateToPage('collections')} className="w-full text-left px-4 py-3 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">Bộ sưu tập</button>
                         <button onClick={() => navigateToPage('hiring')} className="w-full text-left px-4 py-3 rounded-xl font-medium text-blue-600 hover:bg-blue-50">Tuyển dụng</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}
