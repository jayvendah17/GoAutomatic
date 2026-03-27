import { MessageCircle, Phone, FileText, Clipboard, GraduationCap, Shield, ChevronDown, Globe, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const WHATSAPP_LINK = "https://wa.me/254751772123?text=Hi%20NAIM%20Agency%2C%20I%20want%20to%20automate%20my%20business.";

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new(config: unknown, elementId: string): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

function AccordionItem({ question, answer, isOpen, onToggle, isDarkMode }: { question: string; answer: string; isOpen: boolean; onToggle: () => void; isDarkMode: boolean }) {
  return (
    <div className={`border rounded-xl transition-all duration-300 ${isOpen ? `border-gold ${isDarkMode ? 'bg-black' : 'bg-white'}` : `${isDarkMode ? 'border-gold/30 bg-black' : 'border-gray-200 bg-white'}`}`} style={isDarkMode ? { backgroundColor: '#000000' } : {}}>
      <button
        onClick={onToggle}
        className={`w-full px-8 py-5 text-left flex items-center justify-between transition-colors ${isDarkMode ? 'hover:bg-black' : 'hover:bg-gray-50'}`}
        style={isDarkMode ? { backgroundColor: '#000000' } : {}}
      >
        <span className={`font-medium text-lg ${isOpen ? 'text-gold' : isDarkMode ? 'text-white' : 'text-charcoal'}`}>{question}</span>
        <ChevronDown
          size={24}
          className={`text-gold transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className={`px-8 py-5 border-t ${isDarkMode ? 'border-gold/30 text-white' : 'border-gray-100 text-charcoal'} leading-relaxed`}>
          {answer}
        </div>
      )}
    </div>
  );
}

function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isTranslateReady, setIsTranslateReady] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#000000';
      document.body.style.backgroundColor = '#000000';
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#000000';
      document.body.style.backgroundColor = '#000000';
      const darkFavicon = document.createElement('link');
      darkFavicon.rel = 'icon';
      darkFavicon.type = 'image/svg+xml';
      darkFavicon.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='none' stroke='%23C9A961' stroke-width='3'/><circle cx='50' cy='50' r='45' fill='%23000000'/><text x='50' y='60' font-family='serif' font-size='45' font-weight='bold' fill='%23C9A961' text-anchor='middle' font-style='italic'>N</text></svg>`;
      const oldFavicon = document.querySelector('link[rel="icon"]');
      if (oldFavicon) {
        oldFavicon.parentNode?.removeChild(oldFavicon);
      }
      document.head.appendChild(darkFavicon);
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#ffffff';
      document.body.style.backgroundColor = '#ffffff';
      const lightFavicon = document.createElement('link');
      lightFavicon.rel = 'icon';
      lightFavicon.type = 'image/svg+xml';
      lightFavicon.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='none' stroke='%23C9A961' stroke-width='3'/><circle cx='50' cy='50' r='45' fill='%23ffffff'/><text x='50' y='60' font-family='serif' font-size='45' font-weight='bold' fill='%23C9A961' text-anchor='middle' font-style='italic'>N</text></svg>`;
      const oldFavicon = document.querySelector('link[rel="icon"]');
      if (oldFavicon) {
        oldFavicon.parentNode?.removeChild(oldFavicon);
      }
      document.head.appendChild(lightFavicon);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'af,sq,am,ar,hy,az,eu,be,bn,bs,bg,ca,zh-CN,zh-TW,co,hr,cs,da,nl,en,eo,et,fi,fr,fy,gl,ka,de,el,gu,ht,ha,haw,he,hi,hu,is,ig,id,ga,it,ja,jv,kn,kk,km,rw,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,my,ne,no,ny,or,ps,fa,pl,pt,pa,ro,ru,sm,gd,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tl,tg,ta,tt,te,th,tr,tk,uk,ur,ug,uz,vi,cy,xh,yi,yo,zu',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'google_translate_element'
        );
        setIsTranslateReady(true);
      }
    };

    const checkInterval = setInterval(() => {
      if (window.google && window.google.translate) {
        window.googleTranslateElementInit();
        clearInterval(checkInterval);
      }
    }, 100);

    setTimeout(() => clearInterval(checkInterval), 10000);

    return () => clearInterval(checkInterval);
  }, []);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'sq', name: 'Shqip (Albanian)' },
    { code: 'am', name: 'አማርኛ (Amharic)' },
    { code: 'ar', name: 'العربية (Arabic)' },
    { code: 'hy', name: 'Հայերեն (Armenian)' },
    { code: 'az', name: 'Azərbaycan (Azerbaijani)' },
    { code: 'eu', name: 'Euskara (Basque)' },
    { code: 'be', name: 'Беларуская (Belarusian)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'bs', name: 'Bosanski (Bosnian)' },
    { code: 'bg', name: 'Български (Bulgarian)' },
    { code: 'ca', name: 'Català (Catalan)' },
    { code: 'zh-CN', name: '中文简体 (Chinese Simplified)' },
    { code: 'zh-TW', name: '中文繁體 (Chinese Traditional)' },
    { code: 'co', name: 'Corsu (Corsican)' },
    { code: 'hr', name: 'Hrvatski (Croatian)' },
    { code: 'cs', name: 'Čeština (Czech)' },
    { code: 'da', name: 'Dansk (Danish)' },
    { code: 'nl', name: 'Nederlands (Dutch)' },
    { code: 'eo', name: 'Esperanto' },
    { code: 'et', name: 'Eesti (Estonian)' },
    { code: 'fi', name: 'Suomi (Finnish)' },
    { code: 'fr', name: 'Français (French)' },
    { code: 'fy', name: 'Frysk (Frisian)' },
    { code: 'gl', name: 'Galego (Galician)' },
    { code: 'ka', name: 'ქართული (Georgian)' },
    { code: 'de', name: 'Deutsch (German)' },
    { code: 'el', name: 'Ελληνικά (Greek)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'ht', name: 'Kreyòl Ayisyen (Haitian Creole)' },
    { code: 'ha', name: 'Hausa' },
    { code: 'haw', name: 'ʻŌlelo Hawaiʻi (Hawaiian)' },
    { code: 'he', name: 'עברית (Hebrew)' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'hu', name: 'Magyar (Hungarian)' },
    { code: 'is', name: 'Íslenska (Icelandic)' },
    { code: 'ig', name: 'Igbo' },
    { code: 'id', name: 'Bahasa Indonesia (Indonesian)' },
    { code: 'ga', name: 'Gaeilge (Irish)' },
    { code: 'it', name: 'Italiano (Italian)' },
    { code: 'ja', name: '日本語 (Japanese)' },
    { code: 'jv', name: 'Basa Jawa (Javanese)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'kk', name: 'Қазақ (Kazakh)' },
    { code: 'km', name: 'ខ្មែរ (Khmer)' },
    { code: 'rw', name: 'Kinyarwanda' },
    { code: 'ko', name: '한국어 (Korean)' },
    { code: 'ku', name: 'Kurdî (Kurdish)' },
    { code: 'ky', name: 'Кыргызча (Kyrgyz)' },
    { code: 'lo', name: 'ລາວ (Lao)' },
    { code: 'la', name: 'Latina (Latin)' },
    { code: 'lv', name: 'Latviešu (Latvian)' },
    { code: 'lt', name: 'Lietuvių (Lithuanian)' },
    { code: 'lb', name: 'Lëtzebuergesch (Luxembourgish)' },
    { code: 'mk', name: 'Македонски (Macedonian)' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'ms', name: 'Bahasa Melayu (Malay)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'mt', name: 'Malti (Maltese)' },
    { code: 'mi', name: 'Māori' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'mn', name: 'Монгол (Mongolian)' },
    { code: 'my', name: 'မြန်မာ (Myanmar/Burmese)' },
    { code: 'ne', name: 'नेपाली (Nepali)' },
    { code: 'no', name: 'Norsk (Norwegian)' },
    { code: 'ny', name: 'Chichewa (Nyanja)' },
    { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
    { code: 'ps', name: 'پښتو (Pashto)' },
    { code: 'fa', name: 'فارسی (Persian)' },
    { code: 'pl', name: 'Polski (Polish)' },
    { code: 'pt', name: 'Português (Portuguese)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'ro', name: 'Română (Romanian)' },
    { code: 'ru', name: 'Русский (Russian)' },
    { code: 'sm', name: 'Gagana Samoa (Samoan)' },
    { code: 'gd', name: 'Gàidhlig (Scots Gaelic)' },
    { code: 'sr', name: 'Српски (Serbian)' },
    { code: 'st', name: 'Sesotho (Southern Sotho)' },
    { code: 'sn', name: 'chiShona (Shona)' },
    { code: 'sd', name: 'سنڌي (Sindhi)' },
    { code: 'si', name: 'සිංහල (Sinhala)' },
    { code: 'sk', name: 'Slovenčina (Slovak)' },
    { code: 'sl', name: 'Slovenščina (Slovenian)' },
    { code: 'so', name: 'Soomaali (Somali)' },
    { code: 'es', name: 'Español (Spanish)' },
    { code: 'su', name: 'Basa Sunda (Sundanese)' },
    { code: 'sw', name: 'Kiswahili (Swahili)' },
    { code: 'sv', name: 'Svenska (Swedish)' },
    { code: 'tl', name: 'Tagalog (Filipino)' },
    { code: 'tg', name: 'Тоҷикӣ (Tajik)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'tt', name: 'Татарча (Tatar)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'th', name: 'ไทย (Thai)' },
    { code: 'tr', name: 'Türkçe (Turkish)' },
    { code: 'tk', name: 'Türkmen (Turkmen)' },
    { code: 'uk', name: 'Українська (Ukrainian)' },
    { code: 'ur', name: 'اردو (Urdu)' },
    { code: 'ug', name: 'ئۇيغۇرچە (Uyghur)' },
    { code: 'uz', name: 'Oʻzbek (Uzbek)' },
    { code: 'vi', name: 'Tiếng Việt (Vietnamese)' },
    { code: 'cy', name: 'Cymraeg (Welsh)' },
    { code: 'xh', name: 'isiXhosa (Xhosa)' },
    { code: 'yi', name: 'ייִדיש (Yiddish)' },
    { code: 'yo', name: 'Yorùbá (Yoruba)' },
    { code: 'zu', name: 'isiZulu (Zulu)' },
  ];

  const handleLanguageChange = (languageCode: string) => {
    setShowLanguageMenu(false);

    const setCookie = (name: string, value: string) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const eraseCookie = (name: string) => {
      document.cookie = `${name}=; Max-Age=-99999999; path=/`;
    };

    if (languageCode === 'en') {
      eraseCookie('googtrans');
    } else {
      setCookie('googtrans', `/en/${languageCode}`);
    }

    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const faqs = [
    {
      question: 'How much does this cost?',
      answer: 'Pricing is project-based for the initial setup, with a monthly subscription for maintenance, updates, and support. We\'ll provide an exact quote based on the size and complexity of your project.'
    },
    {
      question: 'How long does setup take?',
      answer: 'Setup timelines depend on the number and complexity of forms required. Most projects are delivered within a reasonable implementation window, and we confirm a realistic timeline after reviewing your exact needs.'
    },
    {
      question: 'Do I need a Computer or Special Software?',
      answer: 'No. Everything works on your smartphone. You just need a modern phone with internet access.'
    },
    {
      question: 'What if my staff don\'t know how to use it?',
      answer: 'We provide a short training session that covers everything. Our systems are designed to be simple and intuitive and your staff get to check a simple daily summary.'
    },
    {
      question: 'Is my client data safe?',
      answer: 'Yes. Encrypted tools, access control, Kenya Data Protection Act and GDPR compliant. Your data is encrypted, access-controlled, and stored safely.'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-black border-gold/30' : 'bg-white border-gray-100'} ${isScrolled ? 'shadow-sm' : ''} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <img
                src="/image.png"
                alt="NAIM Agency Logo"
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden md:block font-serif text-3xl">
              <span className="text-charcoal">Go </span>
              <span className="text-gold">Automatic</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#contact" className={`${isDarkMode ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors`}>
                Contact
              </a>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`${isDarkMode ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors p-2`}
                aria-label="Toggle Dark Mode"
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="relative language-selector">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className={`${isDarkMode ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors p-2 flex items-center gap-1`}
                  aria-label="Change Language"
                  title="Translate Page"
                >
                  <Globe size={20} />
                </button>
                {showLanguageMenu && (
                  <div className={`absolute right-0 mt-2 w-64 ${isDarkMode ? 'bg-black border-gold' : 'bg-white border-gold'} border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto`}>
                    <div className="p-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-4 py-3 transition-colors text-sm border-b ${isDarkMode ? 'text-white hover:bg-gray-900 hover:text-gold border-gold/30' : 'text-charcoal hover:bg-gold-tint hover:text-gold border-gray-100'} last:border-0`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gold text-gold px-6 py-2 rounded-full hover:bg-gold hover:text-white transition-all duration-300 font-medium"
              >
                Book Appointment
              </a>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`${isDarkMode ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors p-2`}
                aria-label="Toggle Dark Mode"
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div className="relative language-selector">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className={`${isDarkMode ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors p-2`}
                  aria-label="Change Language"
                  title="Translate Page"
                >
                  <Globe size={18} />
                </button>
                {showLanguageMenu && (
                  <div className={`absolute right-0 mt-2 w-56 ${isDarkMode ? 'bg-black border-gold' : 'bg-white border-gold'} border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto`}>
                    <div className="p-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-4 py-3 transition-colors text-sm border-b ${isDarkMode ? 'text-white hover:bg-gray-900 hover:text-gold border-gold/30' : 'text-charcoal hover:bg-gold-tint hover:text-gold border-gray-100'} last:border-0`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gold text-gold px-4 py-2 rounded-full hover:bg-gold hover:text-white transition-all duration-300 text-sm"
              >
                Book
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <section className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`font-serif text-5xl md:text-6xl ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-8 leading-tight`}>
              From <span className="text-gold">Manual Work</span> <span className={isDarkMode ? 'text-white' : 'text-charcoal'}>→ </span>
              <span className="text-gold">Automatic Growth</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className={`${isDarkMode ? 'bg-black border-gold/30' : 'bg-white border-gray-100'} rounded-2xl p-8 border shadow-sm fade-in`}>
                <div className="aspect-[4/3] w-full rounded-xl mb-6 overflow-hidden">
                  <img
                    src="/20260327_0103_Image_Generation_remix_01kmp2r4sffextkztf38j7qden.png"
                    alt="Before - Manual customer work"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className={`font-serif text-2xl ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-2`}>Before</h3>
                <p className="text-gold">Manual customer work</p>
              </div>

              <div className={`${isDarkMode ? 'bg-black border-gold' : 'bg-white border-gold'} rounded-2xl p-8 border-2 shadow-sm fade-in`}>
                <div className="aspect-[4/3] w-full rounded-xl mb-6 overflow-hidden">
                  <img
                    src="/20260327_0112_Image_Generation_simple_compose_01kmp38x7pfb193z8nb1gxn98d.png"
                    alt="After - Automatic replies + content + lead follow-up"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className={`font-serif text-2xl ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-2`}>After</h3>
                <p className="text-gold">Automatic replies + content + lead follow-up</p>
              </div>
            </div>

            <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-600'} mb-10`}>
              Same business. Less stress. Everything on your phone.
            </p>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-gold text-gold px-8 py-4 rounded-full text-lg font-medium hover:bg-gold hover:text-white transition-all duration-300 mb-4"
            >
              Book Appointment
            </a>

            <p className="text-sm text-gray-500">
              No pressure. If you don't want this, we'll tell you exactly why you need it.
            </p>
          </div>
        </section>

        <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`font-serif text-4xl md:text-5xl text-center mb-6 ${isDarkMode ? 'text-white' : 'text-charcoal'}`}>
              Turn your manual business work into <span className="text-gold">clean</span> automation
            </h2>
            <p className={`text-center ${isDarkMode ? 'text-white' : 'text-charcoal'} text-lg mb-10 leading-relaxed max-w-3xl mx-auto`}>
             We help small businesses stop losing time, money, and customers to repetitive daily tasks. We build Automatic systems that reply to customers, post your content, and follow up on every lead — automatically, every single day. without you lifting a finger.
            </p>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-fit mx-auto border-2 border-gold text-gold px-8 py-4 rounded-full text-lg font-medium hover:bg-gold hover:text-white transition-all duration-300 mb-6"
            >
              Book Appointment
            </a>

            <p className="text-center text-sm text-gray-500">
             No pressure. If you don't want this, we'll tell you exactly why you need it.
            </p>
          </div>
        </section>

        <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`font-serif text-4xl md:text-5xl text-center mb-16 ${isDarkMode ? 'text-white' : 'text-charcoal'}`}>
              What <span className="text-gold">You Get</span>
            </h2>

            <div className={`${isDarkMode ? 'bg-black border-gold/30' : 'bg-white border-gray-100'} rounded-3xl p-8 md:p-12 border shadow-sm`}>
              <div className="space-y-8">
                <div className={`flex items-start gap-6 pb-8 border-b ${isDarkMode ? 'border-gold/30' : 'border-gray-100'} last:pb-0 last:border-0 fade-in`}>
                  <Phone className="text-gold flex-shrink-0" size={32} />
                  <div>
                    <h3 className={`font-serif text-2xl ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-2`}>AI Customer Reply System</h3>
                    <p className={isDarkMode ? 'text-white' : 'text-gray-600'} >
                      Your business gets an AI trained on your products and FAQs. It replies to every WhatsApp, Telegram, Instagram, TikTok, Twitter (X), Facebook, Snapchat, Youtube and Email.
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-6 pb-8 border-b ${isDarkMode ? 'border-gold/30' : 'border-gray-100'} last:pb-0 last:border-0 fade-in`}>
                  <FileText className="text-gold flex-shrink-0" size={32} />
                  <div>
                    <h3 className={`font-serif text-2xl ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-2`}>Daily Content Automation</h3>
                    <p className={isDarkMode ? 'text-white' : 'text-gray-600'}>
                      Content written, designed, and posted to WhatsApp, Telegram, Instagram, TikTok, Twitter (X), Facebook, Snapchat, Youtube and even Email every single day. 30+ pieces per month. You do nothing.
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-6 pb-8 border-b ${isDarkMode ? 'border-gold/30' : 'border-gray-100'} last:pb-0 last:border-0 fade-in`}>
                  <Clipboard className="text-gold flex-shrink-0" size={32} />
                  <div>
                    <h3 className={`font-serif text-2xl ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-2`}>Automated Lead Follow-Up</h3>
                    <p className={isDarkMode ? 'text-white' : 'text-gray-600'}>
                      Every lead gets a message within 3 minutes. Then again after 2 days. Then after 7 days. Automatically. No lead slips through.
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-6 pb-8 border-b ${isDarkMode ? 'border-gold/30' : 'border-gray-100'} last:pb-0 last:border-0 fade-in`}>
                  <GraduationCap className="text-gold flex-shrink-0" size={32} />
                  <div>
                    <h3 className={`font-serif text-2xl ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-2`}>Short Training so you can run it yourself</h3>
                    <p className={isDarkMode ? 'text-white' : 'text-gray-600'}>
                      We provide a short training session that covers everything. After that, everything runs itself and your team checks a daily summary.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className={`text-center text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-500'} mt-8`}>
              Optional Add-Ons: Reminders · Follow-ups · Google Sheets Sync
            </p>
          </div>
        </section>

        <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`font-serif text-4xl md:text-5xl text-center mb-16 ${isDarkMode ? 'text-white' : 'text-charcoal'}`}>
              How It <span className="text-gold">Works</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="text-center fade-in">
                <div className={`w-24 h-24 ${isDarkMode ? 'bg-black' : 'bg-gold-tint'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Phone className="text-gold" size={48} />
                </div>
                <h3 className="font-serif text-4xl text-gold mb-4">1</h3>
                <h4 className={`font-serif text-2xl ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-3`}>Book Appointment</h4>
                <p className={isDarkMode ? 'text-white' : 'text-gray-600'}>
                  Quick consultations booked to understand your needs
                </p>
              </div>

              <div className="text-center fade-in">
                <div className={`w-24 h-24 ${isDarkMode ? 'bg-black' : 'bg-gold-tint'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <FileText className="text-gold" size={48} />
                </div>
                <h3 className="font-serif text-4xl text-gold mb-4">2</h3>
                <h4 className={`font-serif text-2xl ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-3`}>We build your system</h4>
                <p className={isDarkMode ? 'text-white' : 'text-gray-600'}>
                  Custom designed for your business
                </p>
              </div>

              <div className="text-center fade-in">
                <div className={`w-24 h-24 ${isDarkMode ? 'bg-black' : 'bg-gold-tint'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Clipboard className="text-gold" size={48} />
                </div>
                <h3 className="font-serif text-4xl text-gold mb-4">3</h3>
                <h4 className={`font-serif text-2xl ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-3`}>You go automatic</h4>
                <p className={isDarkMode ? 'text-white' : 'text-gray-600'}>
                  Start using it with confidence
                </p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-black border-gold' : 'bg-gold-tint border-gold'} rounded-3xl p-8 md:p-12 border fade-in`}>
              <Shield className="text-gold mx-auto mb-4" size={40} />
              <h3 className={`font-serif text-3xl ${isDarkMode ? 'text-white' : 'text-charcoal'} text-center mb-4`}>Your Data is Protected</h3>
              <p className={`text-center leading-relaxed max-w-3xl mx-auto ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
                Encrypted tools, access control, Kenya Data Protection Act and GDPR compliant. Your clients' data stays safe.
              </p>
            </div>
          </div>
        </section>

        <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`font-serif text-4xl md:text-5xl text-center mb-16 ${isDarkMode ? 'text-white' : 'text-charcoal'}`}>
              Common <span className="text-gold">Questions</span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className={`font-serif text-4xl md:text-5xl ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-6`}>
              Let's <span className="text-gold">Go Automatic</span>
            </h2>

            <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-charcoal'} mb-12`}>
              Submit your Details and Businesses/Tasks below, then choose a booking time to start your Automatic Growth.
            </p>

            <div className={`${isDarkMode ? 'bg-black border-gold' : 'bg-white border-gold'} rounded-3xl border-2 p-8 md:p-12 shadow-sm`}>
              <form className="space-y-6">
                <div>
                  <label className={`block text-left ${isDarkMode ? 'text-white' : 'text-charcoal'} font-medium mb-3`}>
                    Full Name <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`w-full px-6 py-3 border-2 border-gold rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-all ${isDarkMode ? 'bg-black text-white placeholder-white/50' : 'bg-white text-charcoal placeholder-gray-400'}`}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-left ${isDarkMode ? 'text-white' : 'text-charcoal'} font-medium mb-3`}>
                      Email <span className="text-gold">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className={`w-full px-6 py-3 border-2 border-gold rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-all ${isDarkMode ? 'bg-black text-white placeholder-white/50' : 'bg-white text-charcoal placeholder-gray-400'}`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-left ${isDarkMode ? 'text-white' : 'text-charcoal'} font-medium mb-3`}>
                      Phone <span className="text-gold">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Phone"
                      className={`w-full px-6 py-3 border-2 border-gold rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-all ${isDarkMode ? 'bg-black text-white placeholder-white/50' : 'bg-white text-charcoal placeholder-gray-400'}`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-left ${isDarkMode ? 'text-white' : 'text-charcoal'} font-medium mb-3`}>
                    Tell us about your project/Task/Business/Company
                  </label>
                  <textarea
                    placeholder="Tell us what tasks you want to run automatically and How can we help your business, 1. Saving business time 2. Reducing Business Cost 3. Increasing business revenue"
                    rows={5}
                    className={`w-full px-6 py-3 border-2 border-gold rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-all resize-none ${isDarkMode ? 'bg-black text-white placeholder-white/50' : 'bg-white text-charcoal placeholder-gray-400'}`}
                  />
                </div>

                <div>
                  <label className={`block text-left ${isDarkMode ? 'text-white' : 'text-charcoal'} font-medium mb-3`}>
                    Upload all the tasks you want them to run automatic
                  </label>
                  <div className={`border-2 border-gold rounded-xl p-4 flex items-center gap-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                    <button
                      type="button"
                      className="bg-gold text-white px-6 py-2 rounded-full font-medium hover:bg-gold/90 transition-colors whitespace-nowrap"
                    >
                      Choose Files
                    </button>
                    <span className={isDarkMode ? 'text-white/50' : 'text-gray-400'}>No file chosen</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-left ${isDarkMode ? 'text-white' : 'text-charcoal'} font-medium mb-3`}>
                    Consultation appointment time slot
                  </label>
                  <p className={`text-left text-sm mb-3 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Please choose a preferred time slot that suits you. We will then contact you to confirm the closest available date.
                  </p>
                  <select className={`w-full px-6 py-3 border-2 border-gold rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-all appearance-none cursor-pointer ${isDarkMode ? 'bg-black text-white' : 'bg-white text-charcoal'}`}>
                    <option value="">Select a time slot</option>
                    <option value="9am">9:00 AM - 10:00 AM</option>
                    <option value="10am">10:00 AM - 11:00 AM</option>
                    <option value="2pm">2:00 PM - 3:00 PM</option>
                    <option value="3pm">3:00 PM - 4:00 PM</option>
                    <option value="4pm">4:00 PM - 5:00 PM</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-gold text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gold/90 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${isDarkMode ? 'bg-black border-gold/30' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-24">
            <div className="flex-shrink-0">
              <img
                src="/image.png"
                alt="NAIM Agency Logo"
                className="h-24 w-24"
              />
            </div>

            <div className="flex flex-col gap-4 text-left">
              <p className={isDarkMode ? 'text-white text-lg' : 'text-charcoal text-lg'}>
                <span className="font-medium text-gold">WhatsApp:</span>{' '}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline transition-all"
                >
                  +254751772123
                </a>
              </p>
              <p className={isDarkMode ? 'text-white text-lg' : 'text-charcoal text-lg'}>
                <span className="font-medium text-gold">Email:</span>{' '}
                <a
                  href="mailto:salminabdalla93@gmail.com"
                  className="text-gold hover:underline transition-all"
                >
                  salminabdalla93@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className={`mt-16 pt-8 border-t ${isDarkMode ? 'border-gold/30' : 'border-gray-200'} text-center`}>
            <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-500'}`}>© 2024 Naim Agency. All rights reserved. Globally World Wide</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
