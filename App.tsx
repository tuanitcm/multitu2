
// ... (Previous imports remain the same, including FacebookIcons)
import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { 
  Calculator, Menu, X, Search, Box, Percent, Type, Shield, Code, ArrowRightLeft, 
  Zap, Heart, Home, Clock, History, Trash2, Database, LayoutGrid, List, Wrench, 
  Calendar, Users, Share2, Check, Dices, Palette, QrCode, ArrowDownAZ, ArrowUp, Smile
} from 'lucide-react';
import { Category, Tool } from './types';

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
import { RandomNumberGenerator } from './components/tools/RandomTools';
import { CaseConverter } from './components/tools/TextManipulation';
import { QRCodeGenerator } from './components/tools/GeneratorTools';
import { ColorConverter } from './components/tools/ColorTools';
import { FacebookIcons } from './components/tools/FacebookIcons';

import { Card } from './components/ui/Card';
import { Accordion } from './components/ui/Accordion';
import { RatingWidget } from './components/ui/RatingWidget';
import { Footer } from './components/layout/Footer';
import { InfoPage } from './components/pages/InfoPages';
import { getToolDetails } from './components/content/ToolDescriptions';

// ... (CATEGORIES_CONFIG, TIME_UNITS, DATA_UNITS, rawTools, TOOLS definitions remain EXACTLY the same)
const CATEGORIES_CONFIG: { id: Category; label: string; icon: React.ReactNode; slug?: string }[] = [
  { id: 'all', label: 'Tất cả', icon: <Home size={20} /> },
  { id: 'math', label: 'Toán học', icon: <Calculator size={20} />, slug: 'math' },
  { id: 'text', label: 'Văn bản', icon: <Type size={20} />, slug: 'text' },
  { id: 'security', label: 'Bảo mật', icon: <Shield size={20} />, slug: 'security' },
  { id: 'dev', label: 'Lập trình', icon: <Code size={20} />, slug: 'dev' },
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

// Define Tools with dynamic details
const rawTools: Tool[] = [
    // MATH
    { id: 'percentage', slug: 'percentage-calculator', title: 'Tính phần trăm (%)', description: 'Tính % của số, thay đổi %, tìm số gốc.', category: 'math', icon: <Percent size={24} />, component: <BasicPercentage />, ratingValue: 4.8, reviewCount: 1250 },
    { id: 'ratio', slug: 'ratio-percentage', title: 'Tỷ lệ phần trăm', description: 'Tính tỷ lệ % giữa hai số.', category: 'math', icon: <Percent size={24} />, component: <RatioPercentage />, ratingValue: 4.7, reviewCount: 850 },
    { id: 'percent-change', slug: 'percentage-change', title: 'Tăng giảm phần trăm', description: 'Tính % tăng/giảm giữa hai giá trị.', category: 'math', icon: <Percent size={24} />, component: <PercentageChange />, ratingValue: 4.9, reviewCount: 920 },
    { id: 'find-whole', slug: 'find-whole', title: 'Tìm số tổng', description: 'Tìm số tổng khi biết giá trị phần trăm.', category: 'math', icon: <Percent size={24} />, component: <FindWhole />, ratingValue: 4.6, reviewCount: 640 },
    { id: 'sequence', slug: 'sequence-calculator', title: 'Cấp số cộng / nhân', description: 'Tính số hạng, tổng cấp số cộng/nhân.', category: 'math', icon: <Calculator size={24} />, component: <SequenceCalculator />, ratingValue: 4.8, reviewCount: 430 },
    { id: 'logarithm', slug: 'logarithm', title: 'Tính Logarit', description: 'Tính logarit cơ số bất kỳ.', category: 'math', icon: <Calculator size={24} />, component: <LogarithmCalculator />, ratingValue: 4.9, reviewCount: 310 },
    { id: 'trigonometry', slug: 'trigonometry', title: 'Lượng giác', description: 'Sin, Cos, Tan của góc.', category: 'math', icon: <Calculator size={24} />, component: <TrigCalculator />, ratingValue: 4.7, reviewCount: 280 },
    { id: 'calculus', slug: 'calculus-basic', title: 'Đạo hàm / Nguyên hàm', description: 'Tính đơn giản cho hàm lũy thừa.', category: 'math', icon: <Calculator size={24} />, component: <CalculusCalculator />, ratingValue: 4.5, reviewCount: 220 },
    { id: 'random', slug: 'random-number', title: 'Quay số ngẫu nhiên', description: 'Tạo số ngẫu nhiên (RNG) trong khoảng min-max tùy chọn.', category: 'math', icon: <Dices size={24} />, component: <RandomNumberGenerator />, ratingValue: 4.8, reviewCount: 2150 },
    
    // GEOMETRY
    { id: 'circle', slug: 'circle', title: 'Hình Tròn', description: 'Tính chu vi, diện tích hình tròn.', category: 'math', icon: <Box size={24} />, component: <CircleCalculator />, ratingValue: 4.9, reviewCount: 1560 },
    { id: 'triangle', slug: 'triangle', title: 'Hình Tam Giác', description: 'Diện tích (Heron), chu vi tam giác.', category: 'math', icon: <Box size={24} />, component: <TriangleCalculator />, ratingValue: 4.8, reviewCount: 1120 },
    { id: 'square', slug: 'square', title: 'Hình Vuông', description: 'Diện tích, chu vi, đường chéo.', category: 'math', icon: <Box size={24} />, component: <SquareCalculator />, ratingValue: 4.9, reviewCount: 980 },
    { id: 'rectangle', slug: 'rectangle', title: 'Hình Chữ Nhật', description: 'Diện tích, chu vi hình chữ nhật.', category: 'math', icon: <Box size={24} />, component: <RectangleCalculator />, ratingValue: 4.9, reviewCount: 1340 },
    { id: 'trapezoid', slug: 'trapezoid', title: 'Hình Thang', description: 'Diện tích, chu vi hình thang.', category: 'math', icon: <Box size={24} />, component: <TrapezoidCalculator />, ratingValue: 4.7, reviewCount: 560 },
    { id: 'rhombus', slug: 'rhombus', title: 'Hình Thoi', description: 'Diện tích, chu vi hình thoi.', category: 'math', icon: <Box size={24} />, component: <RhombusCalculator />, ratingValue: 4.7, reviewCount: 490 },
    { id: 'parallelogram', slug: 'hinh-binh-hanh', title: 'Hình Bình Hành', description: 'Công cụ tính nhanh diện tích và chu vi hình bình hành.', category: 'math', icon: <Box size={24} />, component: <ParallelogramCalculator />, ratingValue: 4.8, reviewCount: 320, faqs: [
            { question: "Công thức tính diện tích hình bình hành là gì?", answer: "Diện tích S = a x h, trong đó a là cạnh đáy và h là chiều cao tương ứng." },
            { question: "Làm sao tính chu vi hình bình hành?", answer: "Chu vi P = 2 x (a + b), trong đó a và b là độ dài hai cạnh kề nhau." }
        ]
    },
    { id: 'cube', slug: 'cube', title: 'Hình Lập Phương', description: 'Thể tích, diện tích xung quanh/toàn phần.', category: 'math', icon: <Box size={24} />, component: <CubeCalculator />, ratingValue: 4.8, reviewCount: 290 },
    { id: 'sphere', slug: 'sphere', title: 'Hình Cầu', description: 'Thể tích, diện tích mặt cầu.', category: 'math', icon: <Box size={24} />, component: <SphereCalculator />, ratingValue: 4.7, reviewCount: 250 },
    { id: 'cylinder', slug: 'cylinder', title: 'Hình Trụ', description: 'Thể tích, diện tích xung quanh/toàn phần.', category: 'math', icon: <Box size={24} />, component: <CylinderCalculator />, ratingValue: 4.8, reviewCount: 310 },
    { id: 'cone', slug: 'cone', title: 'Hình Nón', description: 'Thể tích, diện tích xung quanh/toàn phần.', category: 'math', icon: <Box size={24} />, component: <ConeCalculator />, ratingValue: 4.7, reviewCount: 210 },
    { id: 'cuboid', slug: 'cuboid', title: 'Hình Hộp CN', description: 'Thể tích, diện tích hình hộp chữ nhật.', category: 'math', icon: <Box size={24} />, component: <CuboidCalculator />, ratingValue: 4.8, reviewCount: 340 },

    // TEXT
    { id: 'facebook-icons', slug: 'icon-facebook', title: 'Icon Facebook', description: 'Kho 1000+ Icon, Emoji Facebook mới nhất.', category: 'text', icon: <Smile size={24} />, component: <FacebookIcons />, ratingValue: 4.9, reviewCount: 5420, faqs: [
        { question: "Làm sao để dùng Icon trên máy tính?", answer: "Bạn chỉ cần chọn icon từ danh sách, sau đó nhấn nút 'Copy' và dán (Ctrl+V) vào bài viết Facebook." },
        { question: "Icon có hiển thị trên mọi thiết bị không?", answer: "Có, các icon này chuẩn Unicode nên hiển thị tốt trên cả iPhone, Android và Máy tính." },
        { question: "Tại sao một số icon hiện ô vuông?", answer: "Do thiết bị của bạn chưa cập nhật font mới nhất. Tuy nhiên người xem bài viết vẫn có thể thấy bình thường." },
        { question: "Dùng nhiều icon có bị Facebook chặn không?", answer: "Không, nhưng bạn không nên spam quá nhiều icon vô nghĩa để tránh bị đánh giá là spam." },
        { question: "Có thể dùng cho Zalo, Instagram không?", answer: "Được, bộ icon này tương thích với hầu hết các mạng xã hội hiện nay." }
    ]},
    { id: 'word-counter', slug: 'word-counter', title: 'Đếm từ & ký tự', description: 'Đếm số từ, ký tự, câu, đoạn văn.', category: 'text', icon: <Type size={24} />, component: <WordCounter />, ratingValue: 4.9, reviewCount: 2560 },
    { id: 'number-to-word', slug: 'number-to-word', title: 'Đọc số thành chữ', description: 'Chuyển số sang chữ tiếng Việt.', category: 'text', icon: <Type size={24} />, component: <NumberToWord />, ratingValue: 4.8, reviewCount: 1890 },
    { id: 'word-to-number', slug: 'word-to-number', title: 'Chữ sang số', description: 'Chuyển chữ số tiếng Việt sang số.', category: 'text', icon: <Type size={24} />, component: <WordToNumber />, ratingValue: 4.2, reviewCount: 150 },
    { id: 'case-converter', slug: 'doi-kieu-chu', title: 'Đổi kiểu chữ (Case Converter)', description: 'Chuyển đổi văn bản sang IN HOA, chữ thường, Tiêu Đề.', category: 'text', icon: <ArrowDownAZ size={24} />, component: <CaseConverter />, ratingValue: 4.7, reviewCount: 980 },
    
    // SECURITY
    { id: 'password', slug: 'password-generator', title: 'Tạo mật khẩu mạnh', description: 'Tạo mật khẩu ngẫu nhiên an toàn.', category: 'security', icon: <Shield size={24} />, component: <PasswordGenerator />, ratingValue: 4.9, reviewCount: 3200 },
    
    // DEV / UTILITY
    { id: 'qrcode', slug: 'tao-ma-qr', title: 'Tạo mã QR', description: 'Tạo QR Code online miễn phí từ văn bản, link.', category: 'utility', icon: <QrCode size={24} />, component: <QRCodeGenerator />, ratingValue: 4.9, reviewCount: 1890 },
    { id: 'color', slug: 'doi-ma-mau', title: 'Đổi mã màu HEX/RGB', description: 'Chuyển đổi qua lại giữa mã màu HEX và RGB.', category: 'dev', icon: <Palette size={24} />, component: <ColorConverter />, ratingValue: 4.7, reviewCount: 540 },

    // CONVERTER
    { id: 'roman', slug: 'roman-numerals', title: 'Số La Mã', description: 'Chuyển đổi qua lại số La Mã.', category: 'converter', icon: <Type size={24} />, component: <RomanConverter />, ratingValue: 4.8, reviewCount: 670 },
    { id: 'length', slug: 'length-converter', title: 'Đổi chiều dài', description: 'Mét, Centimet, Kilomet...', category: 'converter', icon: <ArrowRightLeft size={24} />, component: <LengthConverter />, ratingValue: 4.8, reviewCount: 980 },
    { id: 'temp', slug: 'temp-converter', title: 'Đổi nhiệt độ', description: 'Celsius, Fahrenheit, Kelvin.', category: 'converter', icon: <ArrowRightLeft size={24} />, component: <TemperatureConverter />, ratingValue: 4.8, reviewCount: 870 },
    { id: 'unit-weight', slug: 'weight-converter', title: 'Đổi khối lượng', description: 'Kg, Gram, Lbs, Oz...', category: 'converter', icon: <ArrowRightLeft size={24} />, component: <UnitConverter units={[{id:'kg', label:'Kilogram', ratio:1}, {id:'g', label:'Gram', ratio:0.001}, {id:'lb', label:'Pounds', ratio:0.453592}, {id:'oz', label:'Ounces', ratio:0.0283495}]} />, ratingValue: 4.8, reviewCount: 760 },
    { id: 'time', slug: 'doi-don-vi-thoi-gian', title: 'Đổi thời gian', description: 'Chuyển đổi giây, phút, giờ, ngày.', category: 'converter', icon: <Clock size={24} />, component: <UnitConverter units={TIME_UNITS} />, ratingValue: 4.8, reviewCount: 1540 },
    { id: 'data', slug: 'doi-don-vi-du-lieu', title: 'Đổi đơn vị dữ liệu', description: 'Chuyển đổi Byte, KB, MB, GB, TB.', category: 'converter', icon: <Database size={24} />, component: <UnitConverter units={DATA_UNITS} formatDecimals={6} />, ratingValue: 4.7, reviewCount: 890 },

    // HEALTH
    { id: 'bmi', slug: 'bmi-calculator', title: 'Tính BMI', description: 'Chỉ số khối cơ thể & đánh giá sức khỏe.', category: 'health', icon: <Heart size={24} />, component: <BMICalculator />, ratingValue: 4.9, reviewCount: 4200 },
    { id: 'bmr', slug: 'bmr-tdee', title: 'BMR & TDEE', description: 'Tính calo tiêu thụ mỗi ngày.', category: 'health', icon: <Heart size={24} />, component: <BMRCalculator />, ratingValue: 4.8, reviewCount: 3100 },
    { id: 'water', slug: 'water-calculator', title: 'Nước uống mỗi ngày', description: 'Tính lượng nước cần nạp.', category: 'health', icon: <Heart size={24} />, component: <WaterCalculator />, ratingValue: 4.7, reviewCount: 1200 },
    { id: 'ideal-weight', slug: 'ideal-weight', title: 'Cân nặng lý tưởng', description: 'Theo công thức y khoa.', category: 'health', icon: <Heart size={24} />, component: <IdealWeightCalculator />, ratingValue: 4.8, reviewCount: 1500 },
    
    // OTHERS/EVERYDAY
    { id: 'discount', slug: 'discount-calculator', title: 'Tính giảm giá', description: 'Giá sale, số tiền tiết kiệm.', category: 'math', icon: <Percent size={24} />, component: <DiscountCalculator />, ratingValue: 4.9, reviewCount: 2800 },
    { id: 'date-age', slug: 'age-calculator', title: 'Tính tuổi & Ngày', description: 'Tính tuổi chính xác theo ngày sinh.', category: 'health', icon: <Heart size={24} />, component: <DateCalculator />, ratingValue: 4.9, reviewCount: 3500 },
    { id: 'finance', slug: 'compound-interest', title: 'Lãi suất kép', description: 'Tính tiền gửi tiết kiệm, lãi kép.', category: 'math', icon: <Calculator size={24} />, component: <FinanceCalculator />, ratingValue: 4.8, reviewCount: 1900 },
    { id: 'physics', slug: 'physics-calculator', title: 'Công thức Vật Lý', description: 'Vận tốc, Công, Công suất.', category: 'electricity', icon: <Zap size={24} />, component: <PhysicsCalculator />, ratingValue: 4.7, reviewCount: 650 },

    // UTILITIES (TIME TOOLS)
    { id: 'day-counter', slug: 'dem-ngay', title: 'Đếm ngày (Day Counter)', description: 'Tính số ngày giữa hai mốc thời gian.', category: 'utility', icon: <Calendar size={24} />, component: <DayCounter />, ratingValue: 4.9, reviewCount: 520 },
    { id: 'countdown', slug: 'countdown-timer', title: 'Đếm ngược (Timer)', description: 'Đồng hồ đếm ngược trực tuyến.', category: 'utility', icon: <Clock size={24} />, component: <CountdownTimer />, ratingValue: 4.8, reviewCount: 310 },
];

const TOOLS: Tool[] = rawTools.map(tool => ({
    ...tool,
    details: getToolDetails(tool.id, tool.title)
}));

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
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const [dynamicRating, setDynamicRating] = useState<{value: number, count: number} | null>(null);
  const [hasShared, setHasShared] = useState(false);

  const userCounts = useMemo(() => {
      const counts: Record<string, number> = {};
      TOOLS.forEach(tool => {
          counts[tool.id] = Math.floor(Math.random() * (1000 - 50 + 1)) + 50;
      });
      return counts;
  }, []);

  // SEO: Helper to update Meta Tags
  const updateMetaTags = (title: string, description: string, url: string, image?: string) => {
      document.title = title;
      
      const setMeta = (name: string, content: string, isProperty = false) => {
          let element = document.querySelector(isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`);
          if (!element) {
              element = document.createElement('meta');
              element.setAttribute(isProperty ? 'property' : 'name', name);
              document.head.appendChild(element);
          }
          element.setAttribute('content', content);
      };

      setMeta('description', description);
      setMeta('og:title', title, true);
      setMeta('og:description', description, true);
      setMeta('og:url', url, true);
      setMeta('twitter:title', title, true);
      setMeta('twitter:description', description, true);
      
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
  };

  // SEO: Load initial state from URL
  useEffect(() => {
      const path = window.location.pathname.substring(1); // Remove leading slash
      if (!path) return;

      if (['about', 'contact', 'collections', 'hiring'].includes(path)) {
          setActivePage(path);
          setActiveToolId(null);
          setActiveCategory('all');
      } else {
          const tool = TOOLS.find(t => t.slug === path);
          if (tool) {
              setActiveToolId(tool.id);
              setActiveCategory(tool.category);
              setActivePage(null);
          } else {
              // Check if it's a category slug
              const category = CATEGORIES_CONFIG.find(c => c.slug === path);
              if (category) {
                  setActiveCategory(category.id);
              }
          }
      }
  }, []);

  // Handle Browser Back/Forward
  useEffect(() => {
      const handlePopState = (event: PopStateEvent) => {
          const path = window.location.pathname.substring(1);
          if (!path) {
              setActiveToolId(null);
              setActivePage(null);
              setActiveCategory('all');
              return;
          }
          
          if (['about', 'contact', 'collections', 'hiring'].includes(path)) {
              setActivePage(path);
              setActiveToolId(null);
          } else {
              const tool = TOOLS.find(t => t.slug === path);
              if (tool) {
                  setActiveToolId(tool.id);
                  setActivePage(null);
              } else {
                  const cat = CATEGORIES_CONFIG.find(c => c.slug === path);
                  if (cat) {
                      setActiveCategory(cat.id);
                      setActiveToolId(null);
                      setActivePage(null);
                  }
              }
          }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync state to URL and Meta Tags
  useEffect(() => {
      if (activeToolId) {
          const tool = TOOLS.find(t => t.id === activeToolId);
          if (tool) {
              const url = `https://aitoolfind.co/${tool.slug}`;
              window.history.pushState({}, '', `/${tool.slug}`);
              updateMetaTags(
                  `${tool.title} - MultiTools`,
                  tool.description,
                  url
              );
          }
      } else if (activePage) {
          const url = `https://aitoolfind.co/${activePage}`;
          window.history.pushState({}, '', `/${activePage}`);
          updateMetaTags(
              `${activePage.charAt(0).toUpperCase() + activePage.slice(1)} - MultiTools`,
              `Thông tin về ${activePage} trên MultiTools.`,
              url
          );
      } else {
          // Home or Category
          const catSlug = activeCategory !== 'all' ? CATEGORIES_CONFIG.find(c => c.id === activeCategory)?.slug : '';
          const url = catSlug ? `https://aitoolfind.co/${catSlug}` : 'https://aitoolfind.co/';
          const title = catSlug 
            ? `${CATEGORIES_CONFIG.find(c => c.id === activeCategory)?.label} - MultiTools` 
            : "MultiTools - Bộ công cụ trực tuyến miễn phí";
            
          if (catSlug) window.history.pushState({}, '', `/${catSlug}`);
          else window.history.pushState({}, '', '/');

          updateMetaTags(
              title,
              "Nền tảng tổng hợp các công cụ tiện ích trực tuyến miễn phí. Tính toán phần trăm nhanh chóng, đếm từ và ký tự chuẩn xác, tạo mật khẩu an toàn và nhiều tiện ích khác.",
              url
          );
      }
  }, [activeToolId, activePage, activeCategory]);

  useEffect(() => {
    try {
        const saved = localStorage.getItem('recent_searches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
        const savedView = localStorage.getItem('view_mode');
        if (savedView) setViewMode(savedView as 'grid' | 'list');
    } catch (e) {
        console.error("Failed to load local storage data", e);
    }
  }, []);

  useEffect(() => {
      localStorage.setItem('view_mode', viewMode);
  }, [viewMode]);

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

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 150) setShowSearchOnScroll(true);
        else setShowSearchOnScroll(false);
        
        if (window.scrollY > 300) setShowScrollTop(true);
        else setShowScrollTop(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Intercept internal links from Tool Descriptions
  useEffect(() => {
      const handleInternalLink = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target.matches('a[data-internal-link]')) {
              e.preventDefault();
              const href = target.getAttribute('href');
              if (href) {
                  const slug = href.substring(1);
                  const tool = TOOLS.find(t => t.slug === slug);
                  if (tool) handleToolClick(tool.id);
                  // Handle other internal links like pages later if needed
              }
          }
      };
      document.addEventListener('click', handleInternalLink);
      return () => document.removeEventListener('click', handleInternalLink);
  }, []);

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

  const handleToolClick = (toolId: string) => {
      if (searchQuery) saveSearchTerm(searchQuery);
      setActiveToolId(toolId);
      setDynamicRating(null);
      setHasShared(false);
      setActivePage(null);
      setIsSearchFocused(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: activeTool?.title || 'MultiTools',
            text: activeTool?.description,
            url: url
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(url);
        setHasShared(true);
        setTimeout(() => setHasShared(false), 2000);
    }
  };

  const filteredTools = TOOLS.filter(tool => {
      const matchCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
  });

  const activeTool = activeToolId ? TOOLS.find(t => t.id === activeToolId) : null;

  // Schema Generation (Dynamic)
  useEffect(() => {
      const scriptId = 'json-ld-schema';
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      if (!script) {
          script = document.createElement('script');
          script.id = scriptId;
          script.type = 'application/ld+json';
          document.head.appendChild(script);
      }

      let schema: any = {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "MultiTools",
          "url": "https://aitoolfind.co",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All"
      };

      if (activeTool) {
          const ratingVal = dynamicRating?.value || activeTool.ratingValue || 4.5;
          const ratingCount = dynamicRating?.count || activeTool.reviewCount || 100;

          let appCategory = 'UtilityApplication';
          switch (activeTool.category) {
              case 'math': appCategory = 'EducationalApplication'; break;
              case 'health': appCategory = 'HealthApplication'; break;
              case 'security': appCategory = 'SecurityApplication'; break;
              case 'converter': appCategory = 'ReferenceApplication'; break;
              case 'electricity': appCategory = 'ReferenceApplication'; break;
              case 'text': appCategory = 'UtilitiesApplication'; break;
              default: appCategory = 'UtilityApplication';
          }

          schema = {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": activeTool.title,
              "description": activeTool.description,
              "applicationCategory": appCategory,
              "operatingSystem": "Web",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "VND" },
              "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": ratingVal.toFixed(1),
                  "ratingCount": ratingCount.toString(),
                  "bestRating": "5",
                  "worstRating": "1"
              }
          };

          if (activeTool.faqs) {
              schema = {
                  "@context": "https://schema.org",
                  "@graph": [
                      schema,
                      {
                          "@type": "FAQPage",
                          "mainEntity": activeTool.faqs.map(f => ({
                              "@type": "Question",
                              "name": f.question,
                              "acceptedAnswer": { "@type": "Answer", "text": f.answer }
                          }))
                      }
                  ]
              };
          }
      }
      script.text = JSON.stringify(schema);
  }, [activeTool, activePage, dynamicRating]);

  // ... (RecentSearchesDropdown and JSX return remain structurally same, just using updated logic)
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          saveSearchTerm(searchQuery);
          e.currentTarget.blur();
          setIsSearchFocused(false);
      }
  };

  const RecentSearchesDropdown = () => {
      const suggestions = searchQuery 
        ? recentSearches.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())) 
        : recentSearches;

      if (!isSearchFocused || suggestions.length === 0) return null;
      
      return (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <History size={12} /> {searchQuery ? 'Gợi ý' : 'Tìm kiếm gần đây'}
                  </span>
                  {!searchQuery && (
                    <button 
                        onClick={(e) => { e.preventDefault(); clearRecentSearches(); }}
                        className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"
                        onMouseDown={(e) => e.preventDefault()} 
                    >
                        <Trash2 size={12} /> Xóa
                    </button>
                  )}
              </div>
              <div className="py-1">
                  {suggestions.map((term, idx) => (
                      <button
                          key={idx}
                          className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-3"
                          onClick={() => { setSearchQuery(term); saveSearchTerm(term); setIsSearchFocused(false); }}
                          onMouseDown={(e) => e.preventDefault()}
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
                                <RecentSearchesDropdown />
                            </div>
                        ) : (
                            <div 
                                className="flex items-center gap-2 cursor-pointer" 
                                onClick={() => { 
                                    setActiveToolId(null); setActiveCategory('all'); setActivePage(null); 
                                    window.history.pushState({}, '', '/');
                                    window.scrollTo({top:0, behavior:'smooth'}) 
                                }}
                            >
                                <span className="text-xl font-bold text-slate-900">123MayTinh</span>
                            </div>
                        )}
                    </div>

                    <div 
                        className="hidden lg:flex items-center gap-2 cursor-pointer" 
                        onClick={() => { 
                            setActiveToolId(null); setActiveCategory('all'); setActivePage(null); 
                            window.history.pushState({}, '', '/');
                            window.scrollTo({top:0, behavior:'smooth'}) 
                        }}
                    >
                        <span className="text-xl font-bold text-slate-900">123MayTinh</span>
                    </div>
                </div>

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

        {/* Sidebar */}
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

        {/* Main Content Area */}
        <main className={`flex-1 pt-24 pb-12 px-4 transition-all duration-300 ${!activeToolId && !activePage ? 'lg:pl-72' : 'lg:pl-72'} max-w-7xl mx-auto w-full`}>
            {activeTool && (
                <div className="mb-4 text-sm text-slate-500 flex items-center gap-2">
                    <span className="hover:text-blue-600 cursor-pointer" onClick={() => {navigateToCategory('all'); window.history.pushState({}, '', '/');}}>Trang chủ</span>
                    <span>/</span>
                    <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigateToCategory(activeTool.category)}>{CATEGORIES_CONFIG.find(c => c.id === activeTool.category)?.label}</span>
                    <span>/</span>
                    <span className="text-slate-900 font-medium truncate max-w-[200px]">{activeTool.title}</span>
                </div>
            )}

            {activePage ? (
                <InfoPage id={activePage} />
            ) : activeTool ? (
                <div className="animate-in fade-in zoom-in duration-300">
                    <div className="mb-6 flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => { setActiveToolId(null); window.history.back(); }} 
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-800"
                            >
                                <ArrowRightLeft className="rotate-180" size={24} />
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
                                    <span className="text-blue-600">{activeTool.icon}</span>
                                    {activeTool.title}
                                </h1>
                                <div className="flex items-center gap-4 mt-2">
                                    <RatingWidget 
                                        toolId={activeTool.id} 
                                        initialRating={activeTool.ratingValue || 4.5} 
                                        initialCount={activeTool.reviewCount || 100}
                                        onRate={(newRating, newCount) => setDynamicRating({value: newRating, count: newCount})}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-600 rounded-xl transition-all shadow-sm font-medium text-sm group"
                        >
                            {hasShared ? <Check size={18} className="text-emerald-500" /> : <Share2 size={18} className="group-hover:scale-110 transition-transform" />}
                            <span className="hidden sm:inline">{hasShared ? 'Đã sao chép' : 'Chia sẻ'}</span>
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="shadow-lg border-blue-100 ring-1 ring-blue-500/5">
                                <Suspense fallback={<div className="p-12 text-center text-slate-400">Đang tải công cụ...</div>}>
                                    {activeTool.component}
                                </Suspense>
                            </Card>

                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-slate-900">Giới thiệu công cụ</h2>
                                <div className="prose prose-slate max-w-none text-slate-600 bg-white p-6 rounded-2xl border border-slate-200">
                                    <p className="lead">{activeTool.description}</p>
                                    {activeTool.details}
                                </div>
                            </div>

                            {activeTool.faqs && activeTool.faqs.length > 0 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-slate-900">Câu hỏi thường gặp</h2>
                                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden px-6">
                                        <Accordion items={activeTool.faqs} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
                                <h3 className="font-bold text-slate-900 mb-4">Công cụ liên quan</h3>
                                <div className="space-y-3">
                                    {TOOLS.filter(t => t.category === activeTool.category && t.id !== activeTool.id).slice(0, 5).map(t => (
                                        <button 
                                            key={t.id}
                                            onClick={() => handleToolClick(t.id)}
                                            className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-all group text-left"
                                        >
                                            <div className="text-slate-400 group-hover:text-blue-600 transition-colors bg-slate-50 group-hover:bg-blue-50 p-2 rounded-lg">
                                                {t.icon}
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">{t.title}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {activeCategory === 'all' ? 'Tất cả công cụ' : CATEGORIES_CONFIG.find(c => c.id === activeCategory)?.label}
                            </h1>
                            <p className="text-slate-500 mt-1">
                                {filteredTools.length} công cụ sẵn sàng sử dụng
                            </p>
                        </div>
                        
                        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                                title="Lưới"
                            >
                                <LayoutGrid size={20} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                                title="Danh sách"
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>

                    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                        {filteredTools.map((tool) => (
                            <div 
                                key={tool.id}
                                onClick={() => handleToolClick(tool.id)}
                                className={`group bg-white border border-slate-200 hover:border-blue-400 rounded-2xl cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 duration-300 relative overflow-hidden ${viewMode === 'list' ? 'flex items-center p-4 gap-6' : 'p-6'}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-50/50 group-hover:to-transparent transition-all duration-500"></div>
                                
                                <div className={`relative z-10 ${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4 flex justify-between items-start'}`}>
                                    <div className={`p-3 rounded-xl bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm ring-1 ring-slate-100 ${viewMode === 'list' ? 'w-14 h-14 flex items-center justify-center' : 'w-12 h-12 flex items-center justify-center'}`}>
                                        {tool.icon}
                                    </div>
                                    {viewMode === 'grid' && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-100 bg-slate-50 px-2 py-1 rounded-md group-hover:border-blue-100 group-hover:text-blue-500 transition-colors">
                                            {CATEGORIES_CONFIG.find(c => c.id === tool.category)?.label}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="relative z-10 flex-1">
                                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                                        {tool.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-3">
                                        {tool.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-3 mt-auto">
                                        <div className="flex items-center gap-1 font-medium text-amber-500">
                                            <span className="text-amber-400">★</span> 
                                            {tool.ratingValue || 4.5} 
                                            <span className="text-slate-400 font-normal">({tool.reviewCount})</span>
                                        </div>
                                        <div className="flex items-center gap-1 font-medium text-slate-400" title="Người dùng đang sử dụng">
                                            <Users size={12} />
                                            <span>{userCounts[tool.id] || 100}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTools.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Không tìm thấy công cụ</h3>
                            <p className="text-slate-500 mt-2">Hãy thử từ khóa khác hoặc duyệt theo danh mục.</p>
                            <button 
                                onClick={() => {setSearchQuery(''); setActiveCategory('all');}} 
                                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200"
                            >
                                Xem tất cả công cụ
                            </button>
                        </div>
                    )}
                </div>
            )}
        </main>

        {showScrollTop && (
            <button 
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-300 transition-all animate-in zoom-in duration-300 z-40"
                title="Lên đầu trang"
            >
                <ArrowUp size={24} />
            </button>
        )}

        {isMenuOpen && (
            <div className="fixed inset-0 z-[60] lg:hidden">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                <div className="absolute top-0 bottom-0 left-0 w-[280px] bg-white shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-left duration-300">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
                            <Box size={24} /> MultiTools
                        </div>
                        <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-full">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="space-y-1">
                        {CATEGORIES_CONFIG.map(cat => (
                            <a
                                key={cat.id}
                                href={`/${cat.slug || ''}`}
                                onClick={(e) => { e.preventDefault(); navigateToCategory(cat.id); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${
                                    activeCategory === cat.id && !activePage && !activeToolId
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                {cat.icon}
                                {cat.label}
                            </a>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Khác</h4>
                        <div className="space-y-2">
                            <button onClick={() => navigateToPage('about')} className="block w-full text-left px-4 py-2 text-slate-600 hover:text-blue-600 text-sm">Về chúng tôi</button>
                            <button onClick={() => navigateToPage('contact')} className="block w-full text-left px-4 py-2 text-slate-600 hover:text-blue-600 text-sm">Liên hệ</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <Footer 
            categories={CATEGORIES_CONFIG}
            onCategoryClick={navigateToCategory}
            onPageClick={navigateToPage}
        />
    </div>
  );
}