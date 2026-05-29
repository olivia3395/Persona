import { AnalysisResult } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface ResultProps {
  result: AnalysisResult;
  lang: 'zh' | 'en';
}

export default function Result({ result, lang }: ResultProps) {
  // Map dimensions to a flat array for the Recharts Radar component
  const data = Object.entries(result.dimensions || {}).map(([subject, value]) => ({
    subject,
    value,
  }));

  // Simple heuristics to pick appropriate literary emojis for classic characters
  const getCharacterEmoji = (char: string) => {
    const name = char.toLowerCase();
    if (name.includes('林黛玉') || name.includes('daiyu')) return '🥀';
    if (name.includes('贾宝玉') || name.includes('baoyu')) return '📿';
    if (name.includes('哈姆雷特') || name.includes('hamlet')) return '💀';
    if (name.includes('盖茨比') || name.includes('gatsby')) return '🥂';
    if (name.includes('堂吉诃德') || name.includes('quixote')) return '🛡️';
    if (name.includes('伊万') || name.includes('ivan')) return '📓';
    if (name.includes('阿廖沙') || name.includes('alyosha')) return '🕊️';
    if (name.includes('道连') || name.includes('dorian')) return '🪞';
    if (name.includes('达洛卫') || name.includes('dalloway')) return '💐';
    if (name.includes('小王子') || name.includes('prince')) return '🦊';
    if (name.includes('浮士德') || name.includes('faust')) return '🧪';
    if (name.includes('简·爱') || name.includes('jane') || name.includes('eyre')) return '📖';
    if (name.includes('伊丽莎白') || name.includes('elizabeth') || name.includes('bennet')) return '✍️';
    if (name.includes('悉尼') || name.includes('carton')) return '🩸';
    if (name.includes('于连') || name.includes('julien') || name.includes('sorel')) return '🪜';
    if (name.includes('默尔索') || name.includes('meursault')) return '☀️';
    if (name.includes('罗亭') || name.includes('rudin')) return '🍂';
    if (name.includes('悟空') || name.includes('sun') || name.includes('wukong')) return '🐒';
    if (name.includes('基督山') || name.includes('monte cristo')) return '🗝️';
    if (name.includes('霍尔顿') || name.includes('holden') || name.includes('caulfield')) return '🌾';
    return '✒️';
  };

  const emoji = getCharacterEmoji(result.character);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-4xl mx-auto">
      
      {/* LEFT COLUMN: THE CHARACTER RUBBING SCROLL */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="flex-1 bg-white rounded-[40px] shadow-md border border-[#E5E1D5] p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[460px]">
          {/* Subtle background ink-dot textures */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#4A4E42_2px,transparent_2px)] [background-size:16px_16px]"></div>
          
          <div className="text-[10px] text-[#7D8471] mb-4 tracking-[0.25em] uppercase font-sans font-bold">
            {lang === 'zh' ? '文学本我印痕 No. 089' : 'SOUL RUBBING NO. 089'}
          </div>

          {/* Classic Portrait Arch Frame */}
          <div className="w-48 h-64 border-[3px] border-[#4A4E42] rounded-t-full mb-6 flex items-center justify-center relative bg-[#F4F1EA]/30 shadow-inner">
            <div className="w-40 h-56 bg-[#7D8471]/5 rounded-t-full flex flex-col items-center justify-center p-4 text-center">
              <div className="text-6xl mb-3 animate-pulse">{emoji}</div>
              <div className="text-2xl font-bold italic text-[#4A4E42] leading-tight max-w-[140px] break-words">
                {result.character}
              </div>
              <div className="text-[10px] tracking-wider mt-3 leading-relaxed opacity-75 italic text-[#7D8471] font-sans">
                {lang === 'zh' ? '“经典意志的现代投影”' : '“Modern shadow of classic ideals”'}
              </div>
            </div>

            {/* Red wax/ink Cinnabar stamp overlay */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-2 border-dashed border-[#A64B2A] bg-white rounded-lg flex items-center justify-center rotate-12 shadow-sm pointer-events-none">
              <span className="text-[#A64B2A] text-[9px] font-bold leading-tight text-center tracking-widest uppercase">
                {lang === 'zh' ? '灵魂\n共鸣' : 'SOUL\nTRACE'}
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#4A4E42] text-center mb-2 tracking-wide leading-tight px-4">
            {result.character}
          </h2>
          
          <p className="text-xs text-center px-4 tracking-widest text-[#7D8471] font-sans uppercase">
            {lang === 'zh' ? '—— 契合人格档案 ——' : '—— ALIGNED PERSONA PROFILE ——'}
          </p>
        </div>

        {/* Small Bottom resonance row */}
        <div className="bg-[#E5E1D5] rounded-3xl p-5 flex items-center justify-between border border-[#DCD7C9] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#A64B2A] flex items-center justify-center text-white text-sm font-semibold shadow-inner">✦</div>
            <div>
              <div className="text-[10px] font-sans font-bold text-[#7D8471] tracking-wider uppercase">
                {lang === 'zh' ? '核心共振' : 'CORE RESONANCE'}
              </div>
              <div className="text-xs italic text-[#4A4E42] font-semibold mt-0.5">
                {lang === 'zh' ? '《经典文学复调人格集》' : '《Anthology of Polyphonic Archetypes》'}
              </div>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-[#4A4E42] text-white hover:bg-[#35382e] transition-colors rounded-full text-[10px] tracking-widest font-sans font-bold shadow-sm cursor-pointer border-none"
          >
            {lang === 'zh' ? '重新拓印' : 'RUB AGAIN'}
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: ANALYTICS & CHARTS */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Radar Topology Frame */}
        <div className="flex-1 bg-white rounded-[40px] shadow-md border border-[#E5E1D5] p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#4A4E42]">
                  {lang === 'zh' ? '多维人格拓扑图' : 'Dimensional Personality Topology'}
                </h3>
                <p className="text-[10px] text-[#7D8471] font-sans tracking-widest uppercase mt-0.5">
                  DIMENSIONAL PERSONALITY TOPOLOGY
                </p>
              </div>
              <div className="flex gap-1.5">
                <span className="px-2.5 py-0.5 bg-[#F4F1EA] rounded-full text-[9px] border border-[#DCD7C9] text-[#4A4E42] font-semibold">
                  {lang === 'zh' ? '精神切片' : 'Psyche Slice'}
                </span>
                <span className="px-2.5 py-0.5 bg-[#4A4E42] text-white rounded-full text-[9px] font-semibold">
                  {lang === 'zh' ? '终章投影' : 'Final Projection'}
                </span>
              </div>
            </div>

            {/* Recharts responsive container */}
            <div className="h-64 flex items-center justify-center overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                  <PolarGrid stroke="#DCD7C9" strokeWidth={0.5} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#4A4E42', fontSize: 10, fontWeight: 700, fontFamily: 'sans-serif' }} 
                  />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar 
                    name="Personality" 
                    dataKey="value" 
                    stroke="#4A4E42" 
                    fill="#7D8471" 
                    fillOpacity={0.35} 
                    strokeWidth={1.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick analysis traits under radar */}
          <div className="border-t border-[#F4F1EA] pt-4 grid grid-cols-2 gap-4">
            <div className="border-l-2 border-[#7D8471] pl-3.5">
              <div className="text-[9px] font-sans text-[#7D8471] tracking-wider uppercase font-bold">
                {lang === 'zh' ? '灵魂显性维度' : 'Dominant Dimension'}
              </div>
              <div className="text-xs md:text-sm font-bold text-[#2C2C2C] mt-0.5">
                {lang === 'zh' ? '超脱于世的心灵自由' : 'Ethereal detachment & freedom'}
              </div>
            </div>
            <div className="border-l-2 border-[#DCD7C9] pl-3.5">
              <div className="text-[9px] font-sans text-[#7D8471] tracking-wider uppercase font-bold">
                {lang === 'zh' ? '潜在精神阈值' : 'Latent Psych Threshold'}
              </div>
              <div className="text-xs md:text-sm font-bold text-[#2C2C2C] mt-0.5">
                {lang === 'zh' ? '情感敏锐导致的精神内耗' : 'High sensitivity emotional fatigue'}
              </div>
            </div>
          </div>
        </div>

        {/* Evocative interpretation text frame */}
        <div className="bg-[#4A4E42] rounded-[40px] p-6 md:p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-md">
          <div className="z-10 space-y-3">
            <div className="text-[10px] tracking-[0.2em] text-[#DCD7C9] font-sans font-bold uppercase">
              {lang === 'zh' ? '灵魂拓印语录 · INDIVIDUAL INTERPRETATION' : 'INDIVIDUAL INTERPRETATION'}
            </div>
            <p className="text-sm font-sans text-white/90 leading-relaxed font-normal whitespace-pre-wrap">
              {result.interpretation}
            </p>
          </div>
          {/* Decorative absolute disk */}
          <div className="absolute -right-12 -bottom-12 opacity-15 pointer-events-none">
            <div className="w-56 h-56 border-[12px] border-white rounded-full"></div>
          </div>
        </div>

      </div>

    </div>
  );
}
