import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Quiz from './components/Quiz.tsx';
import Result from './components/Result.tsx';
import { QuizData, AnalysisResult } from './types';
import { LOCAL_SCENARIOS, calculateLocalAnalysis } from './data/quizFallback.ts';

const TRANSLATIONS = {
  zh: {
    title: "墨痕 · 文学人格拓印",
    subtitle: "在文字的深处，寻找与你共鸣的经典人格。",
    loadingQuiz: "正在凝练文学意境中的经典情意...",
    loadingAnalysis: "正在拓印你的文学本我...",
    retryBtn: "重试",
    uncompletedLabel: "题未完成",
    progressLabel: "拓印进度",
    langToggle: "English"
  },
  en: {
    title: "Ink & Trace · Literary Persona",
    subtitle: "In the depths of prose, find the classic soul that resonates with your true self.",
    loadingQuiz: "Formulating classic literary landscapes...",
    loadingAnalysis: "Inking your personality rubbing...",
    retryBtn: "Retry",
    uncompletedLabel: "questions remaining",
    progressLabel: "Ink Progress",
    langToggle: "中文"
  }
};

const ALL_CHARACTERS = [
  {
    zh: "贾宝玉",
    en: "Jia Baoyu",
    emoji: "📿",
    detail_zh: "在这个精明世故的世界里，你更愿意当个傻子。你心疼世间每一朵花、每一个人的眼泪，最后只拍拍灰尘，安安静静地走自己的路。",
    detail_en: "In a world of calculations, you prefer to stay soft. You care for every passing soul, then quietly walk your own path without looking back."
  },
  {
    zh: "林黛玉",
    en: "Lin Daiyu",
    emoji: "🥀",
    detail_zh: "你眼里掺不进沙子，宁可孤独，也不愿意凑合和假装。你带着天生的敏感，安守着内心深处的干净，不向任何人妥协。",
    detail_en: "You cannot pretend or compromise. With your innate sensitivity, you keep your inner world completely clean, even if it means walking alone."
  },
  {
    zh: "哈姆雷特",
    en: "Hamlet",
    emoji: "💀",
    detail_zh: "你习惯在暗处想得太多、看得太深。你在做与不做、爱与不爱之间来回打转，最后只能在无声的对峙中，静静承载生活的所有重量。",
    detail_en: "You think deeply and observe from the shadows. Caught between action and hesitation, you quietly bear the heavy questions of life."
  },
  {
    zh: "盖茨比",
    en: "Jay Gatsby",
    emoji: "🥂",
    detail_zh: "你心里始终亮着一盏灯，哪怕知道那是回不去的旧梦，你依然头也不回地往前奔跑，因为你无法说服自己将就着生活。",
    detail_en: "You keep a quiet light burning inside. Even knowing some dreams never return, you still run forward because you refuse to just settle."
  },
  {
    zh: "堂吉诃德",
    en: "Don Quixote",
    emoji: "🛡️",
    detail_zh: "别人在算得失，你却在看终点。你有一脑子天真的傻气，敢去撞那些看似高不可攀的墙，活在自己笃信的世界里。",
    detail_en: "While others calculate gains, you follow your heart. You hold onto a beautiful naivety, ready to face any fortress for what you believe."
  },
  {
    zh: "伊万·卡拉马佐夫",
    en: "Ivan Karamazov",
    emoji: "📓",
    detail_zh: "你脑子里总有熄不灭的火。你太聪明，看透了生活里所有的不公与荒唐，在理性的迷宫里绕来绕去，跟自己不懈地较劲。",
    detail_en: "You have an endless spark in your mind. Too smart to ignore life's absurdities, you wander in a labyrinth of thoughts, questioning everything."
  },
  {
    zh: "阿廖沙·卡拉马佐夫",
    en: "Alyosha Karamazov",
    emoji: "🕊️",
    detail_zh: "你像一缕没有锋芒的清风。不管世界多脏、多吵，你总是静静听着、看着，心里没有一点恨意，用温和的善意去接纳每一个人。",
    detail_en: "Like a gentle, wind-blown leaf, you walk carrying no anger. In a noisy world, you listen quietly and hold space for others with pure warmth."
  },
  {
    zh: "道连·格雷",
    en: "Dorian Gray",
    emoji: "🪞",
    detail_zh: "你极度迷恋生活里所有美丽、干净、纯粹的东西。但在那些美好的表象下面，你也藏着不愿让人看清的疲惫与秘密。",
    detail_en: "You are deeply drawn to beauty and purity. Yet behind the neat, shiny surface, you carry a hidden weight and quiet exhaustion."
  },
  {
    zh: "达洛卫夫人",
    en: "Mrs. Dalloway",
    emoji: "💐",
    detail_zh: "你在喧嚣的日常里给自己搭了一座小庙。亲手挑一束花，开一盏灯，在温柔琐碎的日子里，平静地平息心里的每一场雷雨。",
    detail_en: "You find peace in daily routines. Buying flowers and preparing quiet rooms, you gently quiet the storms within your own chest."
  },
  {
    zh: "小王子",
    en: "The Little Prince",
    emoji: "🦊",
    detail_zh: "你像个总是长不大的野孩子，安守着一方小小的角落。你不在乎大人们的规则，只用最纯粹的直觉，看顾着心里那颗脆弱的星宿。",
    detail_en: "A child at heart, you tend to a quiet corner of your own. You ignore worldly games, caring only for the simple things that truly matter."
  },
  {
    zh: "浮士德",
    en: "Faust",
    emoji: "🧪",
    detail_zh: "你是一个停不下来的旅人。生活一旦安稳、重复，你就觉得窒息。你永远在寻找新的可能，哪怕前面是看不清的悬崖。",
    detail_en: "An endless traveler. Routine tires you easily; you always search for new horizons, even if it means stepping into the unknown."
  },
  {
    zh: "简·爱",
    en: "Jane Eyre",
    emoji: "📖",
    detail_zh: "你平凡、安静、不爱声张，但骨子里硬得像块石头。不管面对什么人，你都昂着头，守着自己清清白白的自尊与人格。",
    detail_en: "Quiet and unassuming, yet strong as granite. No matter the odds, you stand tall, protecting your simple but absolute self-respect."
  },
  {
    zh: "伊丽莎白·班内特",
    en: "Elizabeth Bennet",
    emoji: "✍️",
    detail_zh: "你是一个带着灵气的聪明人。脚步轻盈，爱笑，也爱观察。你有自己的一套看人分寸，既不轻易讨好谁，也不轻易看轻谁。",
    detail_en: "Lively and discerning, with a witty smile. Guided by your own steady compass, you neither flatter others nor judge too quickly."
  },
  {
    zh: "悉尼·卡顿",
    en: "Sydney Carton",
    emoji: "🩸",
    detail_zh: "你平常看着最懒散、最不在意，甚至有点自暴自弃。但只有你自己知道，在你平静冰凉的废墟底下，藏着怎样滚烫的一颗心。",
    detail_en: "You might seem detached or lazy on the outside. But beneath the cold, simple ruins, you keep a deeply devoted and warm fire burning."
  },
  {
    zh: "于连·索雷尔",
    en: "Julien Sorel",
    emoji: "🪜",
    detail_zh: "你骨子里敏感又好强。你拼命往前赶，想证明给所有人看，但当你真的走到了最高处，你却只想卸下防备，回到最本真自我的怀抱。",
    detail_en: "Sensitive and relentlessly ambitious. You run fast to prove yourself, yet at the very peak, you only long to return to your real self."
  },
  {
    zh: "默尔索",
    en: "Meursault",
    emoji: "☀️",
    detail_zh: "你懒得演戏，也懒得假装。面对生活里的煽情与规束，你只报以一抹局外人的冷淡，用最安静、最朴素的诚实活着。",
    detail_en: "You refuse to play parts or pretend. Faced with emotional noise, you stay a quiet outsider, living with absolute, simple honesty."
  },
  {
    zh: "罗亭",
    en: "Rudin",
    emoji: "🍂",
    detail_zh: "你有满腔点燃别人的热情，在言语的世界里飞扬。但在现实的琐碎面前，你却常常感到无力，在秋风落叶的街角孤独打转。",
    detail_en: "You have a gift to inspire others with sparky ideas. Yet faced with raw reality, you often feel helpless, wandering like a solitary leaf."
  },
  {
    zh: "孙悟空",
    en: "Sun Wukong",
    emoji: "🐒",
    detail_zh: "你天生有一把反骨，最讨厌那些死板、沉闷、没有生命力的规矩。你只想随心所欲地去闯，痛痛快快地活一场。",
    detail_en: "Born with a wild spark, you despise stiff rules and dull compromises. You only want to run free and live life completely on your own terms."
  },
  {
    zh: "基督山伯爵",
    en: "Count of Monte Cristo",
    emoji: "🗝️",
    detail_zh: "你曾尝过最深的苦，学会了把所有心事都藏起来。你用绝对的克制和清醒去掌控生活，但在最后一刻，你依然会选择释怀与告别。",
    detail_en: "Having tasted bitter seasons, you learned to keep quiet. You rule your life with calm steel, yet choose to forgive and sail away at the end."
  },
  {
    zh: "霍尔顿·考菲尔德",
    en: "Holden Caulfield",
    emoji: "🌾",
    detail_zh: "你看穿了世界所有的伪善与假面，觉得无聊极了。你其实只想守在麦田的尽头，帮那些快要掉进世俗陷阱的孩子们把一把关。",
    detail_en: "Tired of worldly masks and fake posturing, you stay detached. You only want to watch over golden fields, keeping others safe and pure."
  }
];

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedChar, setSelectedChar] = useState<typeof ALL_CHARACTERS[number] | null>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    fetch('/api/quiz')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load quiz scenarios');
        return res.json();
      })
      .then((data) => setQuizData(data))
      .catch((err) => {
        console.warn('Backend API quiz query failed. Using client-side local fallback:', err.message);
        setQuizData({ scenarios: LOCAL_SCENARIOS });
      });
  }, []);

  const handleComplete = (answers: Record<number, string>) => {
    setLoading(true);
    setError(null);
    fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, lang }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(lang === 'zh' ? '服务器暂时开小差，请重新点击查看' : 'Temporary server latency. Please tap again.');
        return res.json();
      })
      .then((data) => {
        setAnalysis(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Backend API analyze query failed. Generating high-fidelity client-side local analysis:', err.message);
        try {
          const localData = calculateLocalAnalysis(answers, lang);
          setAnalysis(localData);
          setLoading(false);
        } catch (localErr: any) {
          setError(err.message || localErr.message);
          setLoading(false);
        }
      });
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#2C2C2C] flex flex-col justify-between font-serif relative overflow-x-hidden antialiased">
      {/* Decorative background grid subtle overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#4A4E42_2px,transparent_2px)] [background-size:24px_24px] z-0"></div>

      {/* Header bar */}
      <nav className="h-16 px-6 md:px-12 flex items-center justify-between border-b border-[#DCD7C9] bg-[#F4F1EA]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#4A4E42] rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border border-white/50 rotate-45"></div>
          </div>
          <span className="text-lg md:text-xl tracking-widest font-extrabold text-[#4A4E42] drop-shadow-sm select-none">
            {t.title}
          </span>
        </div>
        <button
          onClick={() => setLang((prev) => (prev === 'zh' ? 'en' : 'zh'))}
          className="px-4 py-1.5 border border-[#4A4E42] rounded-full text-xs font-sans font-semibold text-[#4A4E42] hover:bg-[#4A4E42] hover:text-[#F4F1EA] transition-all cursor-pointer shadow-sm tracking-wider"
        >
          {t.langToggle}
        </button>
      </nav>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10 z-10 flex flex-col items-center">
        {/* Poetic introduction */}
        {!analysis && !loading && !error && (
          <header className="text-center space-y-3 mb-10 max-w-md">
            <p className="text-[#7D8471] font-sans tracking-[0.2em] text-xs uppercase font-medium">LITERARY PERSONA RUBBING</p>
            <h2 className="text-2xl md:text-3xl tracking-wide font-extrabold text-[#4A4E42] leading-tight">
              {lang === 'zh' ? '探寻你灵魂的文学印托' : 'Find Your Soul\'s Literary Echo'}
            </h2>
            <p className="text-[#5A5A5A] font-sans text-sm leading-relaxed">
              {t.subtitle}
            </p>
          </header>
        )}

        {/* Content switch */}
        <div className="w-full">
          {error ? (
            <div className="p-8 bg-white/90 backdrop-blur rounded-[40px] border border-red-100 text-center max-w-md mx-auto shadow-sm space-y-4">
              <div className="text-4xl">🥀</div>
              <h3 className="text-xl font-bold text-red-700">{lang === 'zh' ? '文学长卷展卷受阻' : 'Landscape Interrupted'}</h3>
              <p className="text-sm font-sans text-stone-600">{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  window.location.reload();
                }} 
                className="mt-2 px-6 py-2.5 bg-[#4A4E42] text-white rounded-full text-xs tracking-widest font-bold hover:bg-[#35382e] shadow-sm transition-all"
              >
                {t.retryBtn}
              </button>
            </div>
          ) : loading ? (
            <div className="text-center py-24 space-y-4">
              <div className="w-12 h-12 border-2 border-t-transparent border-[#4A4E42] rounded-full animate-spin mx-auto"></div>
              <p className="text-[#7D8471] font-sans tracking-wide animate-pulse text-sm">
                {t.loadingAnalysis}
              </p>
            </div>
          ) : analysis ? (
            <Result result={analysis} lang={lang} />
          ) : quizData && quizData.scenarios ? (
            <div className="space-y-16 w-full">
              <Quiz 
                scenarios={quizData.scenarios} 
                onComplete={handleComplete} 
                lang={lang} 
                uncompletedLabel={t.uncompletedLabel}
                progressLabel={t.progressLabel}
              />

              {/* 20 Literary Persona Directory */}
              <div className="max-w-xl mx-auto space-y-5 animate-fade-in bg-[#EAE5D9]/40 p-6 md:p-8 rounded-[32px] border border-[#E5E1D5] text-center">
                <div className="space-y-12">
                  <div className="space-y-1">
                    <h4 className="text-xs font-sans tracking-[0.15em] font-extrabold text-[#7D8471] uppercase">
                      {lang === 'zh' ? '• 20 种可能契合的经典文学原型 •' : '• 20 POSSIBLE CLASSIC LITERARY PERSONAS •'}
                    </h4>
                    <p className="text-[11px] font-sans text-[#7D8471]/80 leading-normal max-w-xs mx-auto">
                      {lang === 'zh' ? '从东方大观园到西方思想的原野。点击以阅人生命相' : 'From classic Eastern gardens to Western existential valleys. Tap to read profiles'}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 pt-1">
                    {ALL_CHARACTERS.map((char) => (
                      <button 
                        key={char.en}
                        onClick={() => setSelectedChar(char)}
                        className="px-3 py-1.5 bg-white hover:bg-[#4A4E42] hover:text-[#F4F1EA] hover:scale-105 transition-all duration-300 rounded-full border border-[#DCD7C9]/80 flex items-center gap-1.5 text-xs text-[#4A4E42] font-sans font-medium select-none shadow-sm cursor-pointer"
                        title={lang === 'zh' ? `阅读 ${char.zh} 的人物画像` : `Read ${char.en}'s profile`}
                      >
                        <span className="text-sm">{char.emoji}</span>
                        <span>{lang === 'zh' ? char.zh : char.en}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Character Biography Backdrop Dialog */}
              <AnimatePresence>
                {selectedChar && (
                  <div className="fixed inset-0 bg-[#2C2C2C]/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.94, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: 10 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-[#F4F1EA] max-w-md w-full rounded-[36px] border border-[#DCD7C9] p-8 md:p-10 shadow-2xl relative space-y-6 text-center overflow-hidden"
                    >
                      {/* Quiet natural ornament details */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A4E42]/5 rounded-full filter blur-xl transform translate-x-8 -translate-y-8 pointer-events-none"></div>
                      
                      <div className="space-y-3">
                        <div className="text-5xl select-none filter drop-shadow">{selectedChar.emoji}</div>
                        <div className="space-y-1">
                          <h3 className="text-2xl font-extrabold text-[#4A4E42] tracking-wide">
                            {lang === 'zh' ? selectedChar.zh : selectedChar.en}
                          </h3>
                          <p className="text-[10px] font-sans tracking-widest text-[#7D8471] font-semibold uppercase">
                            {lang === 'zh' ? selectedChar.en : selectedChar.zh}
                          </p>
                        </div>
                      </div>

                      {/* Split boundary */}
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-full border-t border-[#DCD7C9]/80"></div>
                        <span className="relative px-3 bg-[#F4F1EA] text-[#7D8471] text-xs font-mono">✦</span>
                      </div>

                      {/* The Poetic / Zen description */}
                      <p className="text-sm md:text-base text-[#2C2C2C] leading-loose max-w-sm mx-auto font-serif tracking-wide">
                        {lang === 'zh' ? selectedChar.detail_zh : selectedChar.detail_en}
                      </p>

                      {/* Action Dismiss */}
                      <div className="pt-2">
                        <button
                          onClick={() => setSelectedChar(null)}
                          className="px-6 py-2.5 bg-[#4A4E42] text-[#F4F1EA] hover:bg-[#35382e] hover:shadow-md transition-all duration-300 rounded-full text-xs font-sans font-bold tracking-widest cursor-pointer shadow-sm"
                        >
                          {lang === 'zh' ? '见字如面' : 'RESUME PATH'}
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-24 space-y-3">
              <div className="w-10 h-10 border-2 border-[#DCD7C9] border-t-[#4A4E42] rounded-full animate-spin mx-auto"></div>
              <p className="text-[#7D8471] font-sans text-xs tracking-wider">
                {t.loadingQuiz}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Footer bar matching mockup */}
      <footer className="h-14 bg-[#DCD7C9] px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-widest text-[#4A4E42] font-sans font-semibold gap-2 py-2 md:py-0 select-none border-t border-[#DCD7C9]">
        <div>
          {lang === 'zh' ? '兼容比例：94.2% 的经典文学文学原型覆盖' : 'COMPATIBILITY RATIO: 94.2% COHERENCE COVERAGE'}
        </div>
        <div className="hidden lg:block">
          © 2026 LITERARY PERSONA RUBBING LABORATORY
        </div>
        <div className="flex gap-4">
          <span>{lang === 'zh' ? '分享印迹' : 'SHARE TRACE'}</span>
          <span>/</span>
          <span>{lang === 'zh' ? '导出档案' : 'EXPORT DOSSIER'}</span>
        </div>
      </footer>
    </div>
  );
}
