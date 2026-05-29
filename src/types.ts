export interface Scenario {
  id: number;
  text_zh: string;
  text_en: string;
  options_zh: {
    A: string;
    B: string;
    C: string;
  };
  options_en: {
    A: string;
    B: string;
    C: string;
  };
}

export interface QuizData {
  scenarios: Scenario[];
}

export interface AnalysisResult {
  character: string;
  interpretation: string;
  dimensions: {
    [key: string]: number;
  };
}
