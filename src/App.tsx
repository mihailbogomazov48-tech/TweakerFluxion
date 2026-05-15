/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, 
  Gamepad2, 
  ShieldCheck, 
  Trash, 
  Settings2, 
  Activity, 
  Box, 
  Download, 
  Search, 
  Monitor, 
  CheckCircle2, 
  AlertCircle,
  Cpu,
  RefreshCcw,
  Palette,
  Layout,
  ChevronRight,
  HardDrive,
  Info,
  Rocket,
  Home,
  Sun,
  Moon,
  Flower
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Theme = 'Dark' | 'White' | 'Yellow' | 'Purple' | 'Red';
type Language = 'EN' | 'RU' | 'UA' | 'JP' | 'CN';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface FeatureToggle {
  id: string;
  title: string;
  description: string;
  category: string;
  tag?: string;
  icon?: React.ElementType;
}

// --- Constants ---
const TRANSLATIONS: Record<Language, any> = {
  EN: {
    fastAccess: 'Fast Access',
    basicTweaks: 'BASIC TWEAKS',
    welcome: 'Welcome, Admin',
    search: 'Search functions...',
    optimizeAll: 'Optimize All (Safe)',
    optimizeDesc: 'Perform all core optimizations in one click.',
    theme: 'CHOOSE THEME:',
    lang: 'LANGUAGE:',
    apply: 'Apply',
    nav: {
      main: 'Main',
      optimization: 'Optimization',
      gaming: 'Games',
      frameworks: 'Frameworks',
      settings: 'Settings',
      drivers: 'Drivers',
      privacy: 'Privacy',
      cleaning: 'Cleaning',
      about: 'About'
    }
  },
  RU: {
    fastAccess: 'Быстрый доступ',
    basicTweaks: 'ОСНОВНЫЕ ТВИКИ',
    welcome: 'С возвращением, Админ',
    search: 'Поиск функций...',
    optimizeAll: 'Оптимизировать всё',
    optimizeDesc: 'Выполните все основные оптимизации одним щелчком мыши.',
    theme: 'ВЫБЕРИ ТЕМУ:',
    lang: 'ЯЗЫК:',
    apply: 'Применить',
    nav: {
      main: 'Главная',
      optimization: 'Оптимизация',
      gaming: 'Игры',
      frameworks: 'Фреймворки',
      settings: 'Настройки',
      drivers: 'Драйверы',
      privacy: 'Приватність',
      cleaning: 'Очистка',
      about: 'О программе'
    }
  },
  UA: {
    fastAccess: 'Швидкий доступ',
    basicTweaks: 'ОСНОВНІ ТВІКИ',
    welcome: 'З поверненням, Адмін',
    search: 'Пошук функцій...',
    optimizeAll: 'Оптимізувати все',
    optimizeDesc: 'Виконайте всі основні оптимізації одним кліком.',
    theme: 'ВИБЕРИ ТЕМУ:',
    lang: 'МОВА:',
    apply: 'Застосувати',
    nav: {
      main: 'Головна',
      optimization: 'Оптимізація',
      gaming: 'Ігри',
      frameworks: 'Фреймворки',
      settings: 'Налаштування',
      drivers: 'Драйвери',
      privacy: 'Приватність',
      cleaning: 'Очистка',
      about: 'Про програму'
    }
  },
  JP: {
    fastAccess: 'クイックアクセス',
    basicTweaks: '基本調整',
    welcome: 'おかえりなさい、管理者',
    search: '機能を検索...',
    optimizeAll: 'すべて最適化',
    optimizeDesc: 'ワンクリックで重要な最適化をすべて実行します。',
    theme: 'テーマを選択:',
    lang: '言語:',
    apply: '適用',
    nav: {
      main: 'メイン',
      optimization: '最適化',
      gaming: 'ゲーム',
      frameworks: 'フレームワーク',
      settings: '設定',
      drivers: 'ドライバー',
      privacy: 'プライバシー',
      cleaning: 'クリーニング',
      about: '情報'
    }
  },
  CN: {
    fastAccess: '快速访问',
    basicTweaks: '基本优化',
    welcome: '欢迎回来，管理员',
    search: '搜索功能...',
    optimizeAll: '一键优化',
    optimizeDesc: '一键执行所有基本优化、清理临时文件。',
    theme: '选择主题:',
    lang: '语言:',
    apply: '应用',
    nav: {
      main: '主页',
      optimization: '优化',
      gaming: '游戏',
      frameworks: '框架',
      settings: '设置',
      drivers: '驱动程序',
      privacy: '隐私',
      cleaning: '清理',
      about: '关于'
    }
  }
};

const THEMES: Record<Theme, any> = {
  Dark: {
    bg: 'bg-[#0f0c14]',
    container: 'bg-[#1b1725]',
    card: 'bg-[#2a2435] border-white/5',
    navItemActive: 'bg-[#2d4cb0]',
    accent: 'bg-blue-600',
    accentText: 'text-blue-400',
    text: 'text-[#e2e0e7]',
    textMuted: 'text-[#9c99a8]',
  },
  White: {
    bg: 'bg-[#e2e4e7]',
    container: 'bg-[#ffffff]',
    card: 'bg-[#f5f6f8] border-black/5',
    navItemActive: 'bg-[#007aff]',
    accent: 'bg-[#007aff]',
    accentText: 'text-[#007aff]',
    text: 'text-slate-900',
    textMuted: 'text-slate-500',
  },
  Yellow: {
    bg: 'bg-[#100f07]',
    container: 'bg-[#1a190f]',
    card: 'bg-[#292716] border-white/5',
    navItemActive: 'bg-[#b0942d]',
    accent: 'bg-yellow-500',
    accentText: 'text-yellow-400',
    text: 'text-[#e7e7e0]',
    textMuted: 'text-[#a8a899]',
  },
  Purple: {
    bg: 'bg-[#0c0a10]',
    container: 'bg-[#17141b]',
    card: 'bg-[#25212a] border-white/5',
    navItemActive: 'bg-[#7e2db0]',
    accent: 'bg-purple-500',
    accentText: 'text-purple-400',
    text: 'text-[#e0e0e7]',
    textMuted: 'text-[#9b99a8]',
  },
  Red: {
    bg: 'bg-[#100a0a]',
    container: 'bg-[#1b1414]',
    card: 'bg-[#2a2121] border-white/5',
    navItemActive: 'bg-[#b02d2d]',
    accent: 'bg-red-500',
    accentText: 'text-red-400',
    text: 'text-[#e7e0e0]',
    textMuted: 'text-[#a89999]',
  }
};

const NAV_ITEMS: NavItem[] = [
  { id: 'main', label: 'Main', icon: Home },
  { id: 'optimization', label: 'Optimization', icon: Rocket },
  { id: 'gaming', label: 'Games', icon: Gamepad2 },
  { id: 'frameworks', label: 'Frameworks', icon: Box },
  { id: 'settings', label: 'Settings', icon: Settings2 },
  { id: 'drivers', label: 'Drivers', icon: Download },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
  { id: 'cleaning', label: 'Cleaning', icon: Trash },
];

const FEATURES: FeatureToggle[] = [
  { id: 'game-mode', title: 'Игровой режим', description: 'Макс. FPS, отключение фона', category: 'main', tag: 'Gaming', icon: Gamepad2 },
  { id: 'visual-effects', title: 'Отключить визуальные эффекты', description: 'Анимации, прозрачность, тени', category: 'main', icon: Layout },
  { id: 'telemetry', title: 'Отключить телеметрию', description: 'DiagTrack, dmwappushservice', category: 'main', icon: ShieldCheck },
  { id: 'msi-mode', title: 'MSI Mode (GPU)', description: 'Lower GPU latency by enabling MSI interrupts.', category: 'optimization', icon: Rocket },
  { id: 'hpet', title: 'Disable HPET', description: 'Reduce timer overhead for better input lag.', category: 'optimization', icon: RefreshCcw },
  { id: 'vbs', title: 'Disable VBS/HVCI', description: 'Regain CPU performance by disabling virtualization security.', category: 'optimization', icon: Cpu },
  { id: 'tcp-nodelay', title: 'TCP No Delay', description: 'Optimize network traffic to reduce gaming ping.', category: 'gaming', tag: 'Network', icon: Activity },
];

// --- Components ---

const IOSSwitch = ({ checked, onChange, accentColor }: { checked: boolean, onChange: (v: boolean) => void, accentColor: string }) => (
  <button 
    onClick={(e) => {
      e.stopPropagation();
      onChange(!checked);
    }}
    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${checked ? accentColor : 'bg-gray-500/30'}`}
  >
    <motion.div 
      initial={false}
      animate={{ x: checked ? 24 : 0 }}
      className="bg-white w-4 h-4 rounded-full shadow-sm"
    />
  </button>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('main');
  const [currentTheme, setCurrentTheme] = useState<Theme>('Dark');
  const [language, setLanguage] = useState<Language>('RU');
  const [searchQuery, setSearchQuery] = useState('');
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [stats, setStats] = useState({ cpu: 12, gpu: 35, ram: 42, temp: 55 });

  const theme = THEMES[currentTheme];
  const t = TRANSLATIONS[language];

  // Simulation for monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() * 10 - 5))),
        gpu: Math.min(100, Math.max(0, prev.gpu + (Math.random() * 4 - 2))),
        ram: Math.min(100, Math.max(0, prev.ram + (Math.random() * 2 - 1))),
        temp: Math.min(100, Math.max(0, prev.temp + (Math.random() * 4 - 2))),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFeatures = useMemo(() => {
    return FEATURES.filter(f => 
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (f.tag && f.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const activeFeatures = searchQuery 
    ? filteredFeatures 
    : FEATURES.filter(f => f.category === activeTab);

  return (
    <div className={`flex items-center justify-center w-full h-screen transition-colors duration-500 ${theme.bg} ${theme.text} p-4 md:p-8 font-sans`}>
      {/* Centered Desktop App Container (16:9) */}
      <div className={`relative w-full max-w-[1280px] h-full max-h-[720px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] rounded-[40px] overflow-hidden flex ${theme.container} border border-white/5`}>
        
        {/* Left Sidebar (Desktop Style) */}
        <aside className={`w-80 h-full flex flex-col border-r border-white/5 bg-black/10 backdrop-blur-3xl`}>
          <div className="p-10 pb-4">
            <div className="flex items-center gap-3 mb-10">
              <div className={`p-2 rounded-2xl ${theme.accent} shadow-lg shadow-blue-500/20`}>
                <Zap className="text-white w-6 h-6 fill-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black tracking-tight leading-none uppercase italic">
                  Fluxion<span className={theme.accentText}>Tweaker</span>
                </h1>
                <span className="text-[9px] font-black tracking-[0.2em] opacity-40 uppercase mt-1">v3.0 Stable</span>
              </div>
            </div>

            <div className="relative group mb-10">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 group-focus-within:opacity-100 transition-opacity" />
               <input 
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full ${theme.card} border-none rounded-2xl px-12 py-4 text-xs focus:ring-4 focus:ring-blue-500/10 outline-none placeholder:text-current/30 transition-all`}
               />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 space-y-2 no-scrollbar pb-6">
             {NAV_ITEMS.map(item => (
               <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                    activeTab === item.id 
                    ? `${theme.navItemActive} text-white shadow-xl translate-x-2` 
                    : `hover:bg-white/5 ${theme.textMuted} hover:text-white`
                  }`}
               >
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : theme.accentText}`} />
                  <span className="text-xs font-bold tracking-wide uppercase">{t.nav[item.id as keyof typeof t.nav]}</span>
               </button>
             ))}
          </nav>

          <div className="p-8 border-t border-white/5">
             <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="p-2 rounded-lg bg-white/5">
                   <Info className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Support / FAQ</span>
             </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 h-full overflow-hidden flex flex-col relative">
          {/* Top Bar Stats */}
          <div className="h-24 px-12 flex items-center justify-between border-b border-white/5">
             <div className="flex items-center gap-3">
               <div className={`w-2 h-2 rounded-full animate-pulse ${theme.accent.replace('bg-', 'bg-')}`} />
               <h2 className="text-lg font-black tracking-tight uppercase italic">{activeTab === 'main' ? t.fastAccess : t.nav[activeTab as keyof typeof t.nav]}</h2>
             </div>

             <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                   <span className="text-[9px] font-black opacity-30 uppercase">CPU Load</span>
                   <span className="text-sm font-bold">{Math.round(stats.cpu)}%</span>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[9px] font-black opacity-30 uppercase">RAM Util</span>
                   <span className="text-sm font-bold">{Math.round(stats.ram)}%</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors`}
                >
                   <Settings2 className="w-5 h-5 opacity-60" />
                </button>
             </div>
          </div>

          {/* Main Scroller */}
          <div className="flex-1 overflow-y-auto px-12 py-10 no-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + searchQuery}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-12 gap-8"
              >
                {activeTab === 'settings' ? (
                  <div className="col-span-12 space-y-12">
                    <section>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-30 mb-6">{t.theme}</h4>
                      <div className="space-y-4">
                        {(Object.keys(THEMES) as Theme[]).map((thm) => (
                          <button
                            key={thm}
                            onClick={() => setCurrentTheme(thm)}
                            className={`w-full flex items-center justify-between p-5 rounded-[40px] ${theme.card} group transition-all hover:scale-[1.02] shadow-sm`}
                          >
                            <div className="flex items-center gap-5">
                               <div className={`w-10 h-10 rounded-full flex items-center justify-center ${THEMES[thm].bg} border-2 border-white/5`}>
                                  {thm === 'Dark' && <Moon className="w-5 h-5 text-blue-400" />}
                                  {thm === 'White' && <Sun className="w-5 h-5 text-orange-400" />}
                                  {thm === 'Yellow' && <Sun className="w-5 h-5 text-yellow-400" />}
                                  {thm === 'Purple' && <Moon className="w-5 h-5 text-purple-400" />}
                                  {thm === 'Red' && <Flower className="w-5 h-5 text-red-500" />}
                               </div>
                               <span className="text-base font-bold opacity-90">
                                  {thm === 'Dark' ? (language === 'RU' ? 'Тёмная' : 'Dark') : 
                                   thm === 'White' ? (language === 'RU' ? 'Белая' : 'White') : 
                                   thm === 'Yellow' ? (language === 'RU' ? 'Жёлтая' : 'Yellow') : 
                                   thm === 'Purple' ? (language === 'RU' ? 'Фиолетовая' : 'Purple') : 
                                   (language === 'RU' ? 'Красная' : 'Red')}
                               </span>
                            </div>
                            <button className={`${theme.accent} text-white px-6 py-2.5 rounded-3xl text-[10px] font-black uppercase tracking-[0.1em] shadow-lg hover:brightness-110 transition-all`}>
                               {t.apply}
                            </button>
                          </button>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-30 mb-6">{t.lang}</h4>
                      <div className="grid grid-cols-5 gap-4">
                        {(Object.keys(TRANSLATIONS) as Language[]).map((ln) => (
                          <button
                            key={ln}
                            onClick={() => setLanguage(ln)}
                            className={`p-5 rounded-[32px] ${theme.card} transition-all duration-400 relative overflow-hidden flex flex-col items-center gap-1 ${
                              language === ln ? `ring-2 ring-blue-500 shadow-xl scale-[1.05] grayscale-0` : 'opacity-40 grayscale hover:grayscale-0'
                            }`}
                          >
                            <p className="text-[14px] font-black text-center">{ln}</p>
                            <p className="text-[9px] font-bold opacity-40 uppercase leading-none">
                               {ln === 'RU' ? 'Русский' : ln === 'EN' ? 'English' : ln === 'UA' ? 'Укр' : ln === 'JP' ? '日本語' : '中文'}
                            </p>
                          </button>
                        ))}
                      </div>
                    </section>
                  </div>
                ) : (
                  <>
                    <div className="col-span-8 space-y-4">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-20 px-4 mb-4">{t.basicTweaks}</h4>
                      {activeFeatures.length > 0 ? activeFeatures.map((feature) => (
                        <div 
                          key={feature.id} 
                          className={`flex items-center justify-between p-6 rounded-[32px] ${theme.card} hover:scale-[1.01] transition-all cursor-pointer shadow-sm group`}
                          onClick={() => handleToggle(feature.id)}
                        >
                          <div className="flex-1 pr-6 flex items-start gap-5">
                            <div className={`p-4 rounded-2xl ${theme.bg} border border-white/5 opacity-60 group-hover:opacity-100 transition-opacity`}>
                               {feature.icon ? <feature.icon className={`w-5 h-5 ${theme.accentText}`} /> : <Rocket className={`w-5 h-5 ${theme.accentText}`} />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h4 className="text-base font-black tracking-tight">{feature.title}</h4>
                                {feature.tag && (
                                  <span className="text-[9px] font-black bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                     {feature.tag}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs opacity-40 leading-relaxed font-medium">{feature.description}</p>
                            </div>
                          </div>
                          <IOSSwitch 
                            checked={!!toggles[feature.id]} 
                            onChange={() => handleToggle(feature.id)}
                            accentColor={theme.accent}
                          />
                        </div>
                      )) : (
                        <div className="py-24 flex flex-col items-center justify-center opacity-20 text-center col-span-8">
                          <AlertCircle className="w-16 h-16 mb-6" />
                          <p className="font-black uppercase tracking-widest">{language === 'RU' ? 'Ничего не найдено' : 'Nothing found'}</p>
                        </div>
                      )}
                    </div>

                    <div className="col-span-4 space-y-6">
                       <div className={`p-8 rounded-[40px] bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-2xl relative overflow-hidden group`}>
                          <div className="relative z-10">
                            <h3 className="text-lg font-black uppercase italic tracking-tighter mb-2 flex items-center gap-2">
                               {language === 'EN' ? 'Full Tweak' : language === 'RU' ? 'Полная настройка' : language === 'UA' ? 'Повна настройка' : language === 'JP' ? 'フル調整' : '完全优化'}
                               <ChevronRight className="w-4 h-4 opacity-40" />
                            </h3>
                            <p className="text-xs opacity-80 leading-relaxed mb-8 font-bold">{t.optimizeDesc}</p>
                            <button className="w-full py-5 bg-white/20 backdrop-blur-xl rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-all shadow-xl">
                               {t.optimizeAll}
                            </button>
                          </div>
                          <Zap className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 rotate-12" />
                       </div>

                       <div className={`p-8 rounded-[40px] ${theme.card} space-y-6`}>
                          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30 italic">System Vitality</h4>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <p className="text-[10px] font-bold opacity-40 uppercase mb-1">FPS Boost</p>
                                <p className="text-xl font-black">+24%</p>
                             </div>
                             <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <p className="text-[10px] font-bold opacity-40 uppercase mb-1">Latency</p>
                                <p className="text-xl font-black">-15ms</p>
                             </div>
                          </div>
                       </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Background Decorative elements */}
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
