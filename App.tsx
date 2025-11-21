import React, { useState, useEffect } from 'react';
import { 
  Percent, Search, Grid, Shield, Type, Calculator, 
  ArrowRight, ArrowLeft, Box, Github, Info, Ruler,
  Scale, Zap, Activity, Timer, Database, Gauge, Sun, 
  Wind, DollarSign, PenTool, BookOpen, Move, Droplets,
  Waves, Lightbulb, Disc, CreditCard, Anchor, ThermometerSun
} from 'lucide-react';
import { Tool, Category, FAQItem } from './types';

// Import Components
import { BasicPercentage } from './components/calculators/BasicPercentage';
import { RatioPercentage } from './components/calculators/RatioPercentage';
import { PercentageChange } from './components/calculators/PercentageChange';
import { FindWhole } from './components/calculators/FindWhole';
import { UnitConverter, UnitDefinition } from './components/calculators/UnitConverter';
import { TemperatureConverter } from './components/calculators/TemperatureConverter';
import { WordCounter } from './components/tools/WordCounter';
import { PasswordGenerator } from './components/tools/PasswordGenerator';
import { NumberToWord, RomanConverter, WordToNumber } from './components/tools/NumberConverters';
import { Accordion } from './components/ui/Accordion';

// --- Configuration ---

const CATEGORIES_CONFIG: { id: Category; label: string; slug: string }[] = [
  { id: 'all', label: 'Tất cả', slug: '' },
  { id: 'converter', label: 'Chuyển đổi', slug: 'chuyen-doi' },
  { id: 'math', label: 'Toán học', slug: 'toan-hoc' },
  { id: 'electricity', label: 'Điện & Điện tử', slug: 'dien-tu' },
  { id: 'text', label: 'Văn bản', slug: 'van-ban' },
  { id: 'security', label: 'Bảo mật', slug: 'bao-mat' },
];

// --- Helper to create SEO Content & Tools ---

const generateSEOContent = (title: string, description: string, units: UnitDefinition[] = []) => {
  const unitNames = units.slice(0, 5).map(u => u.label).join(', ');
  const details = (
    <div className="space-y-6 text-slate-300 leading-relaxed">
      <p className="text-lg font-medium text-slate-200">{description}</p>
      <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
        <h3 className="font-bold text-white mb-2">Tính năng nổi bật</h3>
        <ul className="list-disc list-inside space-y-1 text-slate-400">
          <li>Chuyển đổi nhanh chóng, chính xác 100%.</li>
          <li>Hỗ trợ các đơn vị phổ biến: {unitNames}{units.length > 5 ? '...' : '.'}</li>
          <li>Giao diện đơn giản, tối ưu cho di động.</li>
          <li>Hoàn toàn miễn phí, không cần đăng ký.</li>
        </ul>
      </div>
      <p>
        Công cụ <strong>{title}</strong> của MultiTools được thiết kế để giúp bạn giải quyết các bài toán chuyển đổi
        một cách dễ dàng nhất. Dù bạn là học sinh, sinh viên, kỹ sư hay người đi làm, công cụ này đều đáp ứng tốt nhu cầu của bạn.
      </p>
    </div>
  );

  const faqs: FAQItem[] = [
    {
      question: `Công cụ ${title} có chính xác không?`,
      answer: "Có. Các công thức chuyển đổi được lập trình dựa trên các tiêu chuẩn quốc tế (ISO, SI) để đảm bảo độ chính xác cao nhất cho mọi phép tính."
    },
    {
      question: "Tôi có thể sử dụng trên điện thoại không?",
      answer: "Có. Giao diện MultiTools được tối ưu hóa hoàn toàn cho mọi thiết bị di động, máy tính bảng và máy tính để bàn."
    },
    {
      question: "Sử dụng công cụ này có mất phí không?",
      answer: "Không. Tất cả các công cụ trên MultiTools đều hoàn toàn miễn phí và không giới hạn số lần sử dụng."
    },
    ...(units.length > 0 ? [{
        question: `Cách đổi ${units[0].label} sang ${units[1]?.label || 'đơn vị khác'}?`,
        answer: `Chỉ cần nhập giá trị vào ô '${units[0].label}', chọn đơn vị đích là '${units[1]?.label || '...'}' và kết quả sẽ hiện ra ngay lập tức.`
    }] : [])
  ];

  return { details, faqs };
};

const createUnitTool = (
  id: string, slug: string, title: string, desc: string, 
  category: Tool['category'], icon: React.ReactNode, 
  units: UnitDefinition[], helpText?: string
): Tool => {
  const { details, faqs } = generateSEOContent(title, desc, units);
  return {
    id, slug, title, description: desc, category, icon,
    keywords: [title.toLowerCase(), ...units.map(u => u.label.toLowerCase()), 'đổi đơn vị', 'online'],
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
  { id: 'ms', label: 'Mét/giây (m/s)', ratio: 1 },
  { id: 'kmh', label: 'Km/giờ (km/h)', ratio: 0.277778 },
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

// New Units requested
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

// Pace (inverse of speed, but can be treated linearly for same "type" e.g. min/km to min/mile)
// NOTE: Standard unit converter uses ratio to base. 
// 1 min/mile = 0.62137 min/km.
const PACE_UNITS = [
    { id: 'minkm', label: 'Phút/Km (min/km)', ratio: 1 },
    { id: 'minmile', label: 'Phút/Dặm (min/mile)', ratio: 1.609344 }, // 1 min/mile is LONGER time than 1 min/km? No. 
    // Speed = Dist/Time. Pace = Time/Dist.
    // If I run 1 mile in 1 min, I run 1.609 km in 1 min. My pace is 1/1.609 min/km = 0.621 min/km.
    // Wait. If value is "5 min/mile".
    // 5 min / 1 mile = 5 min / 1.60934 km = 3.106 min/km.
    // So Value(min/km) = Value(min/mile) / 1.60934.
    // Our converter does: Base = Val * Ratio. Target = Base / TargetRatio.
    // Let Base be min/km.
    // If input is min/mile (ratio X). Base = Val * X.
    // We want Base = Val / 1.60934.
    // So ratio for min/mile should be 1/1.60934 = 0.621371.
    // Let's test: 10 min/mile. Base = 10 * 0.621371 = 6.21 min/km. Correct.
    { id: 'minmile_fix', label: 'Phút/Dặm (min/mile)', ratio: 0.621371 },
    { id: 'secm', label: 'Giây/Mét (s/m)', ratio: 16.6667 }, // 1 s/m = 1000 s/km = 16.66 min/km
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
    { id: 'USD', label: 'Đô la Mỹ (USD)', ratio: 25000 }, // Hardcoded estimation
    { id: 'EUR', label: 'Euro (EUR)', ratio: 27000 },
    { id: 'JPY', label: 'Yên Nhật (JPY)', ratio: 165 },
    { id: 'KRW', label: 'Won Hàn (KRW)', ratio: 18 },
    { id: 'CNY', label: 'Nhân dân tệ (CNY)', ratio: 3450 },
];


// --- Define All Tools ---
// Ensure this is defined BEFORE it is used in App component
const TOOLS: Tool[] = [
  // --- MATH ---
  {
    id: 'basic-percent',
    slug: 'tinh-gia-tri-phan-tram',
    title: 'Tìm % Giá trị',
    description: 'Tính giá trị cụ thể của X% trong tổng số Y.',
    icon: <Percent size={24} />,
    category: 'math',
    popular: true,
    component: <BasicPercentage />,
    ...generateSEOContent('Tìm % Giá trị', 'Công cụ tính nhanh giá trị phần trăm của một số.')
  },
  {
    id: 'ratio-percent',
    slug: 'tinh-ti-le-phan-tram',
    title: 'Tính Tỉ lệ %',
    description: 'Tính xem X chiếm bao nhiêu phần trăm của Y.',
    icon: <Box size={24} />,
    category: 'math',
    component: <RatioPercentage />,
    ...generateSEOContent('Tính Tỉ lệ %', 'Tìm tỷ lệ phần trăm giữa hai số.')
  },
  {
    id: 'percent-change',
    slug: 'tinh-phan-tram-tang-giam',
    title: 'Tăng/Giảm %',
    description: 'Tính % tăng trưởng hoặc suy giảm giữa hai giá trị.',
    icon: <Activity size={24} />,
    category: 'math',
    component: <PercentageChange />,
    ...generateSEOContent('Tăng/Giảm %', 'Tính mức độ thay đổi phần trăm giữa giá trị cũ và mới.')
  },
  {
    id: 'find-whole',
    slug: 'tim-so-goc-tu-phan-tram',
    title: 'Tìm Số Gốc',
    description: 'Tìm giá trị tổng khi biết giá trị thành phần và % tương ứng.',
    icon: <Grid size={24} />,
    category: 'math',
    component: <FindWhole />,
    ...generateSEOContent('Tìm Số Gốc', 'Tính toán ngược để tìm giá trị ban đầu.')
  },
  {
    id: 'roman-converter',
    slug: 'doi-so-la-ma',
    title: 'Số La Mã',
    description: 'Chuyển đổi qua lại giữa số tự nhiên và số La Mã.',
    icon: <PenTool size={24} />,
    category: 'math',
    component: <RomanConverter />,
    ...generateSEOContent('Số La Mã', 'Công cụ chuyển đổi số thường sang số La Mã và ngược lại.')
  },

  // --- TEXT ---
  {
    id: 'word-counter',
    slug: 'dem-tu-dem-ky-tu',
    title: 'Đếm Từ & Ký Tự',
    description: 'Đếm số từ, ký tự, câu và đoạn văn online.',
    icon: <Type size={24} />,
    category: 'text',
    component: <WordCounter />,
    ...generateSEOContent('Đếm Từ', 'Công cụ đếm từ, ký tự miễn phí tốt nhất.')
  },
  {
    id: 'num-to-word',
    slug: 'doc-so-thanh-chu',
    title: 'Đọc Số Thành Chữ',
    description: 'Chuyển đổi số thành chữ tiếng Việt (hỗ trợ số lớn).',
    icon: <BookOpen size={24} />,
    category: 'text',
    component: <NumberToWord />,
    ...generateSEOContent('Đọc Số Thành Chữ', 'Tiện ích đọc số tiền, số lượng thành chữ tiếng Việt.')
  },
  {
    id: 'word-to-num',
    slug: 'chuyen-chu-thanh-so',
    title: 'Chuyển Chữ Thành Số',
    description: 'Chuyển đổi văn bản số tiếng Việt sang số tự nhiên.',
    icon: <Type size={24} />,
    category: 'text',
    component: <WordToNumber />,
    ...generateSEOContent('Chữ Thành Số', 'Chuyển đổi văn bản viết tay thành số.')
  },
  
  // --- SECURITY ---
  {
    id: 'password-gen',
    slug: 'tao-mat-khau-manh',
    title: 'Tạo Mật Khẩu',
    description: 'Tạo mật khẩu ngẫu nhiên mạnh và an toàn.',
    icon: <Shield size={24} />,
    category: 'security',
    popular: true,
    component: <PasswordGenerator />,
    ...generateSEOContent('Tạo Mật Khẩu', 'Trình tạo mật khẩu ngẫu nhiên bảo mật cao.')
  },

  // --- CONVERTERS (COMMON) ---
  createUnitTool('len-conv', 'doi-don-vi-do-dai', 'Đổi Độ Dài', 'Chuyển đổi mét, km, cm, inch, feet...', 'converter', <Ruler size={24} />, LENGTH_UNITS),
  createUnitTool('area-conv', 'doi-don-vi-dien-tich', 'Đổi Diện Tích', 'Chuyển đổi m2, ha, km2, acre...', 'converter', <Box size={24} />, AREA_UNITS),
  createUnitTool('weight-conv', 'doi-don-vi-khoi-luong', 'Đổi Khối Lượng', 'Chuyển đổi kg, gam, tấn, pound...', 'converter', <Scale size={24} />, WEIGHT_UNITS),
  createUnitTool('vol-conv', 'doi-don-vi-the-tich', 'Đổi Thể Tích', 'Chuyển đổi lít, m3, gallon, cup...', 'converter', <Droplets size={24} />, VOLUME_UNITS),
  {
    id: 'temp-conv',
    slug: 'doi-don-vi-nhiet-do',
    title: 'Đổi Nhiệt Độ',
    description: 'Chuyển đổi độ C, độ F và Kevin.',
    category: 'converter',
    icon: <ThermometerSun size={24} />,
    component: <TemperatureConverter />,
    ...generateSEOContent('Đổi Nhiệt Độ', 'Công cụ chuyển đổi Celsius, Fahrenheit, Kelvin.')
  },
  createUnitTool('time-conv', 'doi-don-vi-thoi-gian', 'Đổi Thời Gian', 'Chuyển đổi giây, phút, giờ, ngày...', 'converter', <Timer size={24} />, TIME_UNITS),
  createUnitTool('speed-conv', 'doi-don-vi-toc-do', 'Đổi Tốc Độ', 'Chuyển đổi km/h, m/s, mph, knot...', 'converter', <Wind size={24} />, SPEED_UNITS),
  createUnitTool('pressure-conv', 'doi-don-vi-ap-suat', 'Đổi Áp Suất', 'Chuyển đổi Pascal, Bar, PSI...', 'converter', <Gauge size={24} />, PRESSURE_UNITS),
  createUnitTool('angle-conv', 'doi-don-vi-goc', 'Đổi Góc', 'Chuyển đổi Độ (Deg), Radian (Rad)...', 'converter', <Move size={24} />, [
    { id: 'deg', label: 'Độ (deg)', ratio: 1 },
    { id: 'rad', label: 'Radian (rad)', ratio: 57.2958 },
    { id: 'grad', label: 'Gradian (grad)', ratio: 0.9 },
  ]),
  createUnitTool('freq-conv', 'doi-don-vi-tan-so', 'Đổi Tần Số', 'Chuyển đổi Hz, kHz, MHz, GHz...', 'converter', <Waves size={24} />, [
    { id: 'Hz', label: 'Hertz (Hz)', ratio: 1 },
    { id: 'kHz', label: 'Kilohertz (kHz)', ratio: 1000 },
    { id: 'MHz', label: 'Megahertz (MHz)', ratio: 1e6 },
    { id: 'GHz', label: 'Gigahertz (GHz)', ratio: 1e9 },
  ]),
  createUnitTool('data-conv', 'doi-don-vi-du-lieu', 'Đổi Dung Lượng', 'Chuyển đổi Byte, KB, MB, GB, TB...', 'converter', <Database size={24} />, DATA_UNITS),

  // --- CONVERTERS (NEW REQUESTS) ---
  createUnitTool('quantity-conv', 'doi-don-vi-so-dem', 'Đổi Số Đếm', 'Chuyển đổi tá (dozen), gross, score...', 'converter', <Grid size={24} />, QUANTITY_UNITS),
  createUnitTool('ppm-conv', 'doi-don-vi-parts-per', 'Đổi Tỉ Lệ Phần', 'Chuyển đổi ppm, ppb, phần trăm...', 'converter', <Disc size={24} />, PARTS_PER_UNITS),
  createUnitTool('pace-conv', 'doi-don-vi-toc-do-chay', 'Đổi Pace Chạy Bộ', 'Chuyển đổi min/km, min/mile...', 'converter', <Activity size={24} />, PACE_UNITS),
  createUnitTool('flow-conv', 'doi-don-vi-luu-luong', 'Đổi Lưu Lượng', 'Chuyển đổi m3/s, lít/phút, GPM...', 'converter', <Waves size={24} />, FLOW_UNITS),
  createUnitTool('lux-conv', 'doi-don-vi-do-roi', 'Đổi Độ Rọi', 'Chuyển đổi Lux, Foot-candle...', 'converter', <Sun size={24} />, ILLUMINANCE_UNITS),
  createUnitTool('torque-conv', 'doi-don-vi-mo-men-xoan', 'Đổi Momen Xoắn', 'Chuyển đổi N·m, lb·ft, kg·m...', 'converter', <Anchor size={24} />, TORQUE_UNITS),
  createUnitTool('currency-conv', 'doi-tien-te-tham-khao', 'Đổi Tiền Tệ', 'Đổi USD, VND, EUR (Tỷ giá tham khảo).', 'converter', <DollarSign size={24} />, CURRENCY_EST_UNITS, "Lưu ý: Tỷ giá chỉ mang tính chất tham khảo và cố định, không cập nhật theo thời gian thực."),

  // --- ELECTRICITY ---
  createUnitTool('volt-conv', 'doi-don-vi-dien-ap', 'Đổi Điện Áp', 'Chuyển đổi Volt, mV, kV...', 'electricity', <Zap size={24} />, VOLTAGE_UNITS),
  createUnitTool('curr-conv', 'doi-don-vi-dong-dien', 'Đổi Dòng Điện', 'Chuyển đổi Ampe, mA, kA...', 'electricity', <Zap size={24} />, CURRENT_UNITS),
  createUnitTool('charge-conv', 'doi-don-vi-dien-tich-luong', 'Đổi Điện Tích', 'Chuyển đổi Coulomb, Ah, mAh...', 'electricity', <Zap size={24} />, CHARGE_UNITS),
  createUnitTool('power-conv', 'doi-don-vi-cong-suat', 'Đổi Công Suất', 'Chuyển đổi Watt, kW, Mã lực (HP)...', 'electricity', <Lightbulb size={24} />, POWER_UNITS),
  createUnitTool('reactive-power-conv', 'doi-cong-suat-phan-khang', 'Công Suất Phản Kháng', 'Chuyển đổi VAR, kVAR...', 'electricity', <Zap size={24} />, REACTIVE_POWER_UNITS),
  createUnitTool('apparent-power-conv', 'doi-cong-suat-bieu-kien', 'Công Suất Biểu Kiến', 'Chuyển đổi VA, kVA...', 'electricity', <Zap size={24} />, APPARENT_POWER_UNITS),
  createUnitTool('energy-conv', 'doi-don-vi-nang-luong', 'Đổi Năng Lượng', 'Chuyển đổi Joule, Calorie, kWh...', 'electricity', <Zap size={24} />, ENERGY_UNITS),
  createUnitTool('reactive-energy-conv', 'doi-nang-luong-phan-khang', 'Năng Lượng Phản Kháng', 'Chuyển đổi VARh, kVARh...', 'electricity', <Zap size={24} />, REACTIVE_ENERGY_UNITS),
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