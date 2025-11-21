import React, { useState, useEffect } from 'react';
import { 
  Percent, Search, Grid, Shield, Type, Calculator, 
  ArrowRight, ArrowLeft, Box, Github, Info, Ruler
} from 'lucide-react';
import { Tool, Category } from './types';

// Import Tools
import { BasicPercentage } from './components/calculators/BasicPercentage';
import { RatioPercentage } from './components/calculators/RatioPercentage';
import { PercentageChange } from './components/calculators/PercentageChange';
import { FindWhole } from './components/calculators/FindWhole';
import { LengthConverter } from './components/calculators/LengthConverter';
import { WordCounter } from './components/tools/WordCounter';
import { PasswordGenerator } from './components/tools/PasswordGenerator';
import { Accordion } from './components/ui/Accordion';

// --- Configuration ---

const CATEGORIES_CONFIG: { id: Category; label: string; slug: string }[] = [
  { id: 'all', label: 'Tất cả', slug: '' }, // Root path
  { id: 'math', label: 'Toán học', slug: 'toan-hoc' },
  { id: 'text', label: 'Văn bản', slug: 'van-ban' },
  { id: 'security', label: 'Bảo mật', slug: 'bao-mat' },
];

// Define Tools with Vietnamese Slugs
const TOOLS: Tool[] = [
  {
    id: 'basic-percent',
    slug: 'tinh-gia-tri-phan-tram',
    title: 'Tìm % Giá trị',
    description: 'Tính giá trị cụ thể của X% trong tổng số Y. Công cụ tính phần trăm online nhanh chóng và chính xác.',
    keywords: ['tính phần trăm', '20% của', 'công cụ toán học', 'tính toán online'],
    icon: <Percent size={24} />,
    category: 'math',
    popular: true,
    component: <BasicPercentage />,
    details: (
      <div className="text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white mb-3">Khái niệm về Phần trăm</h2>
        <p className="mb-4">
          Phần trăm nghĩa là "so với 100". Trong toán học, một phần trăm là tỉ số thể hiện dưới dạng phân số có mẫu số là 100. Kí hiệu thường dùng là kí hiệu phần trăm "%". Ví dụ, 20% (đọc là "hai mươi phần trăm") tương đương với 20/100, nói cách khác là 0,2.
        </p>
        <p className="mb-4">
          Phần trăm thường được dùng để biểu thị độ lớn tương đối của một lượng so với một lượng khác. Ví dụ, tính tiền lãi suất ngân hàng, tính thuế VAT, hay giảm giá khuyến mãi.
        </p>
      </div>
    ),
    faqs: [
      {
        question: "Làm thế nào để tính X% của một số Y?",
        answer: "Để tính X% của số Y, bạn nhân số Y với X rồi chia cho 100. Ví dụ: Để tính 20% của 500, bạn lấy (500 * 20) / 100 = 100."
      },
      {
        question: "Công cụ này có miễn phí không?",
        answer: "Có, công cụ tính phần trăm này hoàn toàn miễn phí và không giới hạn số lần sử dụng."
      },
      {
        question: "Ứng dụng của phần trăm trong thực tế là gì?",
        answer: "Phần trăm được dùng để tính thuế bán hàng (VAT), tính tiền lãi tiết kiệm, tính giảm giá khi mua sắm, hoặc so sánh các chỉ số thống kê."
      }
    ]
  },
  {
    id: 'ratio-percent',
    slug: 'tinh-ti-le-phan-tram',
    title: 'Tính Tỉ lệ %',
    description: 'Tính xem X chiếm bao nhiêu phần trăm của Y. Chuyển đổi phân số thành phần trăm.',
    keywords: ['tính tỉ lệ phần trăm', 'x là bao nhiêu phần trăm của y', 'công thức tính %'],
    icon: <Box size={24} />,
    category: 'math',
    component: <RatioPercentage />,
    details: (
      <div className="text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white mb-3">Cách tính tỷ lệ phần trăm</h2>
        <p className="mb-4">
          Để tính tỷ lệ phần trăm của một số so với số khác, chúng ta chia số thành phần cho tổng số, sau đó nhân kết quả với 100.
        </p>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 mb-4 font-mono text-indigo-400 text-center">
          Tỷ lệ % = (Giá trị thành phần ÷ Tổng số) × 100
        </div>
        <h3 className="text-white font-semibold mb-2">Ví dụ thực tế:</h3>
        <ul className="list-disc list-inside space-y-1 text-slate-400">
          <li>Bạn trả lời đúng 45 câu trong tổng số 50 câu hỏi: (45 ÷ 50) × 100 = 90%.</li>
        </ul>
      </div>
    ),
    faqs: [
      {
        question: "Công thức tính tỷ lệ phần trăm là gì?",
        answer: "Công thức là: (Giá trị thành phần / Tổng số) * 100. Kết quả sẽ là con số biểu thị phần trăm."
      },
      {
        question: "Làm sao để chuyển phân số sang phần trăm?",
        answer: "Bạn chỉ cần lấy tử số chia cho mẫu số, sau đó nhân kết quả với 100 và thêm ký hiệu % vào sau."
      }
    ]
  },
  {
    id: 'percent-change',
    slug: 'tinh-phan-tram-tang-giam',
    title: 'Tăng/Giảm %',
    description: 'Tính % tăng trưởng hoặc suy giảm giữa hai giá trị. Công cụ tính lợi nhuận, tăng trưởng doanh thu.',
    keywords: ['tính phần trăm tăng trưởng', 'công thức tính tăng giảm', 'tính % lợi nhuận'],
    icon: <Calculator size={24} />,
    category: 'math',
    popular: true,
    component: <PercentageChange />,
    details: (
      <div className="text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white mb-3">Tính phần trăm tăng giảm</h2>
        <p className="mb-4">
          Công cụ này giúp bạn tính toán mức độ thay đổi tương đối giữa hai giá trị theo thời gian. Kết quả dương thể hiện sự tăng trưởng, kết quả âm thể hiện sự suy giảm.
        </p>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 mb-4 font-mono text-purple-400 text-center">
          % Thay đổi = ((Giá trị mới - Giá trị cũ) ÷ |Giá trị cũ|) × 100
        </div>
      </div>
    ),
    faqs: [
      {
        question: "Làm thế nào để tính phần trăm tăng trưởng?",
        answer: "Lấy giá trị mới trừ đi giá trị cũ, chia cho giá trị cũ, rồi nhân với 100. Nếu kết quả dương là tăng trưởng, âm là suy giảm."
      },
      {
        question: "Công cụ này có thể tính số âm không?",
        answer: "Có, công cụ hỗ trợ tính toán ngay cả khi giá trị đầu vào là số âm (ví dụ: tính toán lỗ lãi)."
      }
    ]
  },
  {
    id: 'find-whole',
    slug: 'tim-so-goc-tu-phan-tram',
    title: 'Tìm Số Gốc',
    description: 'Tìm giá trị tổng khi biết giá trị thành phần và % tương ứng. Tính ngược phần trăm.',
    keywords: ['tìm số gốc', 'bài toán ngược phần trăm', 'tính tổng số'],
    icon: <Grid size={24} />,
    category: 'math',
    component: <FindWhole />,
    details: (
      <div className="text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white mb-3">Tìm tổng số từ phần trăm</h2>
        <p className="mb-4">
          Khi bạn biết một giá trị cụ thể tương ứng với bao nhiêu phần trăm, bạn có thể tính ngược lại để tìm ra tổng số ban đầu (100%).
        </p>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 mb-4 font-mono text-orange-400 text-center">
           Tổng số = Giá trị thành phần ÷ (Phần trăm ÷ 100)
        </div>
      </div>
    ),
    faqs: [
      {
        question: "Khi nào cần dùng công cụ tìm số gốc?",
        answer: "Khi bạn biết số tiền đã giảm giá và phần trăm giảm, muốn tìm giá gốc ban đầu. Hoặc khi biết số lượng sản phẩm lỗi chiếm bao nhiêu % và muốn tìm tổng sản lượng."
      }
    ]
  },
  {
    id: 'm-to-cm',
    slug: 'doi-m-sang-cm',
    title: 'Đổi m sang cm',
    description: 'Công cụ chuyển đổi mét (m) sang centimét (cm) và ngược lại nhanh chóng, chính xác nhất.',
    keywords: ['đổi m sang cm', '1m bằng bao nhiêu cm', 'chuyển đổi đơn vị', 'convert m to cm'],
    icon: <Ruler size={24} />,
    category: 'math',
    component: <LengthConverter />,
    details: (
      <div className="text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white mb-3">Chuyển đổi Mét sang Centimét</h2>
        <p className="mb-4">
          Mét (ký hiệu: m) là đơn vị đo độ dài cơ bản trong hệ đo lường quốc tế (SI). Centimét (ký hiệu: cm) là một đơn vị đo chiều dài trong hệ mét, bằng một phần trăm của mét.
        </p>
        <h3 className="text-white font-semibold mb-2">Công thức chuyển đổi:</h3>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 mb-4 font-mono text-blue-400 text-center">
           1 m = 100 cm
        </div>
        <p>
          Điều này có nghĩa là để đổi từ mét sang cm, bạn chỉ cần nhân số mét với 100. Ngược lại, để đổi từ cm sang mét, bạn chia số cm cho 100.
        </p>
      </div>
    ),
    faqs: [
      {
        question: "1m bằng bao nhiêu cm?",
        answer: "1 mét (m) bằng 100 centimét (cm)."
      },
      {
        question: "Làm thế nào để đổi nhanh từ m sang cm?",
        answer: "Bạn chỉ cần dịch chuyển dấu phẩy thập phân sang phải 2 chữ số. Ví dụ: 1.5m = 150cm."
      },
      {
        question: "Tại sao cần chuyển đổi giữa mét và cm?",
        answer: "Mét thường dùng để đo khoảng cách lớn (chiều cao nhà, kích thước phòng), trong khi cm dùng cho các vật thể nhỏ hơn hoặc yêu cầu độ chính xác cao hơn (kích thước nội thất, chiều cao người)."
      }
    ]
  },
  {
    id: 'word-counter',
    slug: 'dem-tu-dem-ky-tu',
    title: 'Đếm Từ & Ký Tự',
    description: 'Công cụ đếm số từ, ký tự, câu và đoạn văn online miễn phí. Hỗ trợ viết bài chuẩn SEO.',
    keywords: ['đếm từ', 'đếm ký tự', 'word counter online', 'kiểm tra độ dài văn bản'],
    icon: <Type size={24} />,
    category: 'text',
    component: <WordCounter />,
    details: (
      <div className="text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white mb-3">Tại sao cần đếm từ và ký tự?</h2>
        <p className="mb-4">
          Công cụ đếm từ (Word Counter) là trợ thủ đắc lực cho người viết lách, sinh viên, và chuyên gia SEO. Việc kiểm soát độ dài văn bản giúp đảm bảo tuân thủ các giới hạn ký tự trên mạng xã hội hoặc tối ưu hóa bài viết cho Google.
        </p>
        <p>
          Công cụ này hoạt động trực tiếp trên trình duyệt, bảo mật 100% dữ liệu của bạn.
        </p>
      </div>
    ),
    faqs: [
      {
        question: "Công cụ đếm từ này có lưu nội dung của tôi không?",
        answer: "Tuyệt đối không. Tất cả quá trình xử lý đếm từ và ký tự đều diễn ra ngay trên trình duyệt của bạn (Client-side). Văn bản của bạn không bao giờ được gửi đến máy chủ của chúng tôi."
      },
      {
        question: "Số lượng ký tự có bao gồm khoảng trắng không?",
        answer: "Có, bộ đếm của chúng tôi hiển thị tổng số ký tự bao gồm cả khoảng trắng và dấu câu."
      },
      {
        question: "Công cụ có giới hạn số lượng từ không?",
        answer: "Không có giới hạn cứng, nhưng hiệu suất phụ thuộc vào bộ nhớ trình duyệt của bạn. Nó hoạt động tốt với các bài luận, bài viết blog và tài liệu dài."
      }
    ]
  },
  {
    id: 'password-gen',
    slug: 'tao-mat-khau-manh',
    title: 'Tạo Mật Khẩu',
    description: 'Tạo mật khẩu ngẫu nhiên mạnh và an toàn. Tùy chỉnh độ dài, ký tự đặc biệt để bảo mật tài khoản.',
    keywords: ['tạo mật khẩu', 'random password generator', 'bảo mật', 'mật khẩu mạnh'],
    icon: <Shield size={24} />,
    category: 'security',
    popular: true,
    component: <PasswordGenerator />,
    details: (
      <div className="text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white mb-3">Tầm quan trọng của mật khẩu mạnh</h2>
        <p className="mb-4">
          Mật khẩu là tuyến phòng thủ đầu tiên bảo vệ thông tin cá nhân. Công cụ tạo mật khẩu ngẫu nhiên giúp loại bỏ yếu tố con người để tạo ra các chuỗi ký tự khó đoán, chống lại các cuộc tấn công dò tìm mật khẩu.
        </p>
      </div>
    ),
    faqs: [
      {
        question: "Trình tạo mật khẩu này có an toàn để sử dụng không?",
        answer: "Tuyệt đối an toàn! Trình tạo mật khẩu sử dụng thuật toán ngẫu nhiên của trình duyệt để tạo chuỗi ký tự ngay trên thiết bị của bạn. Mật khẩu KHÔNG bao giờ được gửi qua Internet hoặc lưu trữ trên máy chủ."
      },
      {
        question: "Tại sao tôi nên sử dụng trình tạo mật khẩu?",
        answer: "Con người thường có xu hướng chọn mật khẩu dễ nhớ (và dễ đoán). Trình tạo ngẫu nhiên loại bỏ yếu tố cảm xúc, tạo ra chuỗi ký tự hỗn loạn (entropy cao) cực kỳ khó bẻ khóa bằng các phương pháp tấn công thông thường."
      },
      {
        question: "Tôi có cần mật khẩu duy nhất cho mỗi tài khoản không?",
        answer: "Có! Nếu bạn dùng chung mật khẩu và một trang web bị lộ dữ liệu, hacker có thể truy cập vào tất cả các tài khoản khác của bạn. Hãy sử dụng mật khẩu riêng biệt cho Facebook, Email, Ngân hàng, v.v."
      }
    ]
  }
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
  // Routing State
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial URL parsing
  useEffect(() => {
    const parseUrl = () => {
      try {
        const path = window.location.pathname;
        
        // Handle Root
        if (path === '/' || path === '/index.html') {
          setActiveToolId(null);
          setActiveCategory('all');
          return;
        }

        // Extract slug from /slug.html
        // Regex to capture slug: starts with /, followed by non-dots, optional .html suffix
        const match = path.match(/^\/([a-zA-Z0-9-_]+)(\.html)?$/);
        if (match) {
          const slug = match[1];
          
          // Check if it's a Tool
          const tool = TOOLS.find(t => t.slug === slug);
          if (tool) {
            setActiveToolId(tool.id);
            return;
          }

          // Check if it's a Category
          const category = CATEGORIES_CONFIG.find(c => c.slug === slug);
          if (category) {
            setActiveCategory(category.id);
            setActiveToolId(null);
            return;
          }
        }
        
        // Fallback if no match found
        setActiveToolId(null);
        setActiveCategory('all');
      } catch (e) {
        console.error("Routing error:", e);
        setActiveToolId(null);
      }
    };

    parseUrl();
    
    // Listen for browser back/forward interaction
    window.addEventListener('popstate', parseUrl);
    return () => window.removeEventListener('popstate', parseUrl);
  }, []);

  // Scroll to top when active tool changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeToolId, activeCategory]);

  // Navigation Handlers
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

  // SEO and Meta Data Update
  const activeTool = TOOLS.find(t => t.id === activeToolId);

  useEffect(() => {
    if (activeTool) {
      // 1. Tool View Meta
      const title = `${activeTool.title} - Công cụ Online Miễn phí`;
      const url = `${window.location.origin}/${activeTool.slug}.html`;
      updateMetaTags(title, activeTool.description, url);

      // 2. Structured Data
      const graphData: any[] = [
        {
          "@type": "SoftwareApplication",
          "name": activeTool.title,
          "description": activeTool.description,
          "applicationCategory": activeTool.category === 'math' ? "Calculator" : "Utility",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "VND"
          }
        }
      ];

      if (activeTool.faqs && activeTool.faqs.length > 0) {
        graphData.push({
          "@type": "FAQPage",
          "mainEntity": activeTool.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        });
      }

      injectStructuredData({
        "@context": "https://schema.org",
        "@graph": graphData
      });

    } else {
      // 1. Directory/Home View Meta
      const catConfig = CATEGORIES_CONFIG.find(c => c.id === activeCategory);
      const title = activeCategory === 'all' 
        ? "MultiTools - Bộ công cụ trực tuyến miễn phí" 
        : `${catConfig?.label} - Các công cụ tiện ích miễn phí`;
      
      const desc = "Nền tảng tổng hợp các công cụ tiện ích trực tuyến miễn phí: tính phần trăm, đếm từ, tạo mật khẩu và nhiều hơn nữa.";
      const url = window.location.origin + (catConfig?.slug ? `/${catConfig.slug}.html` : '/');
      
      updateMetaTags(title, desc, url);

      // 2. Structured Data
      injectStructuredData({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "MultiTools",
        "url": url,
        "description": desc,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "VND"
        }
      });
    }
  }, [activeTool, activeCategory]);

  const filteredTools = TOOLS.filter(tool => {
    const matchCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Header */}
      <header className="fixed w-full z-50 top-0 border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateToCategory('all');
              }}
              className="flex items-center gap-2 cursor-pointer group"
            >
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                 <Box size={20} strokeWidth={2.5} />
               </div>
               <span className="text-xl font-bold text-white tracking-tight">Multi<span className="text-indigo-400">Tools</span></span>
            </a>
            
            {/* Search Bar */}
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
                    aria-label="Tìm kiếm công cụ"
                  />
               </div>
            </div>

            <nav className="flex items-center gap-4">
               <a 
                 href="https://github.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-slate-400 hover:text-white transition-colors"
                 aria-label="GitHub Repository"
               >
                  <Github size={20} />
               </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {activeTool ? (
          // TOOL VIEW
          <article className="animate-in slide-in-from-bottom-8 duration-500 max-w-4xl mx-auto">
             <a 
                href={activeCategory !== 'all' 
                  ? `/${CATEGORIES_CONFIG.find(c => c.id === activeCategory)?.slug || ''}.html` 
                  : '/'}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToCategory(activeCategory);
                }}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 mb-6 transition-colors group cursor-pointer"
             >
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
               <span className="font-medium">Quay lại danh sách</span>
             </a>

             {/* Tool Main Interface */}
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
             </div>

             {/* Tool Details / Description Section */}
             <div className="grid gap-8">
               {activeTool.details && (
                 <section className="glass-panel rounded-2xl overflow-hidden shadow-xl border border-slate-700/50" aria-labelledby="details-heading">
                    <header className="p-4 border-b border-slate-700/50 bg-slate-800/30 flex items-center gap-2">
                       <Info size={18} className="text-indigo-400" />
                       <h2 id="details-heading" className="font-semibold text-slate-200">Thông tin bổ sung</h2>
                    </header>
                    <div className="p-6 md:p-8 bg-[#1e293b]/30">
                       {activeTool.details}
                    </div>
                 </section>
               )}

               {/* FAQ Section */}
               {activeTool.faqs && activeTool.faqs.length > 0 && (
                 <section className="glass-panel rounded-2xl overflow-hidden shadow-xl border border-slate-700/50" aria-labelledby="faq-heading">
                    <header className="p-6 md:p-8 border-b border-slate-700/50 bg-[#0f172a]/50 text-center">
                       <h2 id="faq-heading" className="text-2xl font-bold text-white mb-2">Câu hỏi thường gặp</h2>
                       <p className="text-slate-400">Giải đáp những thắc mắc phổ biến về {activeTool.title.toLowerCase()}</p>
                    </header>
                    <div className="p-6 md:p-8 bg-[#1e293b]/30">
                       <Accordion items={activeTool.faqs} />
                    </div>
                 </section>
               )}
             </div>
          </article>
        ) : (
          // DIRECTORY VIEW
          <div className="space-y-12">
             {/* Hero Section */}
             <section className="text-center py-10 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">
                   Công cụ tiện ích <br />
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                     Dành cho mọi nhu cầu
                   </span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto relative z-10">
                   Bộ sưu tập các công cụ tính toán, xử lý văn bản và tiện ích trực tuyến miễn phí. Nhanh chóng, chính xác và giao diện tối ưu cho mọi thiết bị.
                </p>

                {/* Mobile Search */}
                <div className="mt-8 md:hidden px-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search size={18} className="text-slate-500" />
                        </div>
                        <input 
                          type="text"
                          className="w-full bg-[#1e293b] text-slate-200 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-all placeholder-slate-500"
                          placeholder="Tìm công cụ..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          aria-label="Tìm kiếm công cụ trên thiết bị di động"
                        />
                    </div>
                </div>
             </section>

             {/* Categories */}
             <nav className="flex flex-wrap justify-center gap-2 md:gap-4 sticky top-20 z-30 py-4 backdrop-blur-lg md:static md:backdrop-blur-none" aria-label="Danh mục công cụ">
                {CATEGORIES_CONFIG.map(cat => (
                   <a
                     key={cat.id}
                     href={cat.slug ? `/${cat.slug}.html` : '/'}
                     onClick={(e) => {
                       e.preventDefault();
                       navigateToCategory(cat.id);
                     }}
                     className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                        activeCategory === cat.id 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-[#020617]' 
                        : 'bg-[#1e293b] text-slate-400 border border-slate-700 hover:border-slate-600 hover:text-slate-200'
                     }`}
                   >
                     {cat.label}
                   </a>
                ))}
             </nav>

             {/* Tools Grid */}
             <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                   <a 
                     key={tool.id}
                     href={`/${tool.slug}.html`}
                     onClick={(e) => {
                       e.preventDefault();
                       navigateToTool(tool);
                     }}
                     className="group block bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden"
                   >
                      {tool.popular && (
                        <div className="absolute top-0 right-0 bg-gradient-to-bl from-indigo-500 to-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
                           PHỔ BIẾN
                        </div>
                      )}
                      <div className="mb-4 w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-300">
                         {tool.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-indigo-300 transition-colors">{tool.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{tool.description}</p>
                      
                      <div className="flex items-center text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                         Sử dụng ngay <ArrowRight size={16} className="ml-2" />
                      </div>
                   </a>
                ))}
             </section>

             {filteredTools.length === 0 && (
               <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                    <Search size={32} className="text-slate-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-300 mb-2">Không tìm thấy công cụ</h3>
                  <p className="text-slate-500">Vui lòng thử từ khóa khác hoặc chọn danh mục khác.</p>
               </div>
             )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 bg-[#020617]">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">
               &copy; {new Date().getFullYear()} MultiTools. Nền tảng công cụ trực tuyến miễn phí.
            </p>
         </div>
      </footer>
    </div>
  );
};

export default App;
