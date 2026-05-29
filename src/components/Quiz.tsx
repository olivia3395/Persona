import { useState } from 'react';
import { Scenario } from '../types';

interface QuizProps {
  scenarios: Scenario[];
  onComplete: (answers: Record<number, string>) => void;
  lang: 'zh' | 'en';
  uncompletedLabel: string;
  progressLabel: string;
}

export default function Quiz({ scenarios, onComplete, lang, uncompletedLabel, progressLabel }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (id: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [id]: option }));
    
    // Auto advance after brief delay for visual feedback
    if (currentIndex < scenarios.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 250);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const currentScenario = scenarios[currentIndex];
  if (!currentScenario) return null;

  const scenarioText = lang === 'zh' ? currentScenario.text_zh : currentScenario.text_en;
  const options = lang === 'zh' ? currentScenario.options_zh : currentScenario.options_en;

  const totalScenarios = scenarios.length;
  const isAllAnswered = Object.keys(answers).length === totalScenarios;
  const progressPercent = (Object.keys(answers).length / totalScenarios) * 100;

  return (
    <div className="space-y-8 w-full max-w-xl mx-auto">
      {/* State & Progress Tracker */}
      <div className="bg-white/75 backdrop-blur-sm p-6 rounded-[24px] border border-[#E5E1D5] shadow-sm space-y-3">
        <div className="flex justify-between items-center text-xs font-sans font-semibold text-[#7D8471] tracking-wider uppercase">
          <div>
            {progressLabel}: {Object.keys(answers).length} / {totalScenarios}
          </div>
          <div>
            {lang === 'zh' ? `情景 / Scenario ${currentIndex + 1}` : `Landscape ${currentIndex + 1} of ${totalScenarios}`}
          </div>
        </div>
        
        {/* Sleek Progress Tube */}
        <div className="w-full h-1.5 bg-[#E5E1D5] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#4A4E42] transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / totalScenarios) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Interactive Card */}
      <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-[#E5E1D5] relative overflow-hidden space-y-8 transition-all duration-500">
        {/* Background Decorative element */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
          <div className="w-48 h-48 border-[12px] border-[#4A4E42] rounded-full"></div>
        </div>

        {/* Lit card header */}
        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.2em] text-[#7D8471] font-sans font-medium uppercase">
            {lang === 'zh' ? '心灵推演' : 'SCENARIO DETECTION'} No. 00{currentScenario.id}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-[#4A4E42] leading-relaxed">
            “{scenarioText}”
          </h3>
        </div>

        {/* Answers/Options */}
        <div className="space-y-4">
          {Object.entries(options).map(([key, value]) => {
            const isSelected = answers[currentScenario.id] === key;
            return (
              <button
                key={key}
                onClick={() => handleSelect(currentScenario.id, key)}
                className={`w-full text-left p-5 rounded-2xl border text-sm transition-all duration-200 cursor-pointer flex items-center space-x-3 group relative ${
                  isSelected 
                    ? 'bg-[#4A4E42] text-white border-[#4A4E42] shadow-md transform -translate-y-0.5' 
                    : 'bg-[#F4F1EA]/50 border-[#DCD7C9] hover:bg-[#F4F1EA] hover:border-[#4A4E42]'
                }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs select-none transition-colors border ${
                  isSelected 
                    ? 'bg-[#F4F1EA] text-[#4A4E42] border-[#F4F1EA]' 
                    : 'bg-white text-[#4A4E42] border-[#DCD7C9] group-hover:border-[#4A4E42]'
                }`}>
                  {key}
                </span>
                <span className="flex-1 font-sans font-medium">
                  {value}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Navigation & Final Call to action */}
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-5 py-3 border border-[#DCD7C9] rounded-full text-xs font-sans font-semibold tracking-wider transition-all uppercase select-none ${
            currentIndex === 0 
              ? 'opacity-40 cursor-not-allowed text-[#7D8471]' 
              : 'text-[#4A4E42] hover:bg-[#E5E1D5] cursor-pointer'
          }`}
        >
          {lang === 'zh' ? '上一个情景' : 'Previous'}
        </button>

        {isAllAnswered && currentIndex === totalScenarios - 1 ? (
          <button
            onClick={() => onComplete(answers)}
            className="flex-1 max-w-xs py-4.5 bg-[#A64B2A] text-white rounded-full font-bold hover:bg-[#8D3B1E] transition-all cursor-pointer shadow-md tracking-widest text-xs uppercase animate-pulse border-none"
          >
            {lang === 'zh' ? '✦ 拓印我的文学本我 ✦' : '✦ INK MY LITERARY SOUL ✦'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentIndex === totalScenarios - 1}
            className={`px-5 py-3 border border-[#DCD7C9] rounded-full text-xs font-sans font-semibold tracking-wider transition-all uppercase select-none ${
              currentIndex === totalScenarios - 1 
                ? 'opacity-40 cursor-not-allowed text-[#7D8471]' 
                : 'text-[#4A4E42] hover:bg-[#E5E1D5] cursor-pointer'
            }`}
          >
            {lang === 'zh' ? '下一个情景' : 'Next'}
          </button>
        )}
      </div>

      {/* Scenarios Completion Status indicators */}
      <div className="flex flex-wrap justify-center gap-1.5 pt-4">
        {scenarios.map((sc, index) => {
          const isAnswered = !!answers[sc.id];
          const isActive = currentIndex === index;
          return (
            <button
              key={sc.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-7.5 h-7.5 rounded-full text-[10px] font-sans font-bold transition-all flex items-center justify-center cursor-pointer border ${
                isActive 
                  ? 'border-[#4A4E42] bg-[#4A4E42] text-white' 
                  : isAnswered 
                    ? 'border-[#7D8471] bg-[#7D8471]/15 text-[#4A4E42]' 
                    : 'border-[#DCD7C9] bg-white text-[#7D8471]'
              }`}
            >
              {sc.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}
