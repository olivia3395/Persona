import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function callWithRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && (error.code === 429 || error.status === 'RESOURCE_EXHAUSTED')) {
      console.log(`Rate limited, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return callWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

const SCENARIOS = [
  {
    id: 1,
    text_zh: "你觉得你跟这个世界的关系，更像是：",
    text_en: "Your relationship with this world is more like:",
    options_zh: {
      A: "我看着它，但总觉得自己并不真正属于里头",
      B: "我深深爱着它，但随时做好了告别它的准备",
      C: "我置身其外，只安静观察它运转的本相"
    },
    options_en: {
      A: "I watch it, but feel I don't really belong here",
      B: "I love it deeply, but am ready to say goodbye anytime",
      C: "I stay outside of it, quietly observing how it works"
    }
  },
  {
    id: 2,
    text_zh: "深夜里，哪个瞬间最能让你获得真正的平静？",
    text_en: "At midnight, when do you feel the most peaceful?",
    options_zh: {
      A: "沉浸在独属于自己的清冷寂静里",
      B: "温柔怀念那些曾经拥有又消逝的事物",
      C: "思索生命的来处与终点"
    },
    options_en: {
      A: "Immersing in my own cool, quiet silence",
      B: "Gently remembering lost things and old days",
      C: "Pondering where life comes from and where it goes"
    }
  },
  {
    id: 3,
    text_zh: "当你看见夜空里有流星划过，你想的是：",
    text_en: "A shooting star flashes across the night. Your thought is:",
    options_zh: {
      A: "虽然只有短暂一瞬，但也足够绚烂了",
      B: "闭上眼睛，为我的初心与梦想默默期盼",
      C: "这是大自然无声且完美的物理法则在起作用"
    },
    options_en: {
      A: "Wondrous, even though it lasts only for a fleeting second",
      B: "Close my eyes, wishing once more for my original aspiration",
      C: "It is simply the silent and orderly law of the cosmos"
    }
  },
  {
    id: 4,
    text_zh: "如果可以选择永久留存住你魂魄的一部分，你会留存：",
    text_en: "If you could preserve one small piece of your soul forever:",
    options_zh: {
      A: "那颗不曾被世俗污染过的干净童心",
      B: "那些曾让你笑过哭过、最炽烈的情感",
      C: "一双冷淡、理智且清醒看世界的眼睛"
    },
    options_en: {
      A: "My innocent and untarnished child-like heart",
      B: "My most honest and passionate tears and joy",
      C: "A cool, rational eye looking strictly at reality"
    }
  },
  {
    id: 5,
    text_zh: "站在陡峭的悬崖边缘低头看深渊时，你的感受是：",
    text_en: "Looking down into a deep abyss from a cliff edge, you feel:",
    options_zh: {
      A: "一种奇特的眩晕，也有一种莫名的跃动冲动",
      B: "在虚无中看到了自己，感到一分荒诞和解脱",
      C: "本能地退后一步，冷静警示此处的危险程度"
    },
    options_en: {
      A: "A strange vertigo, and an unexplained urge to fly",
      B: "Seeing myself in the void, feeling peaceful absurdity",
      C: "Taking a step back, calculating safety margins logically"
    }
  },
  {
    id: 6,
    text_zh: "你最害怕自己在成长中，渐渐弄丢什么特质？",
    text_en: "What quality are you most afraid of losing as you grow up?",
    options_zh: {
      A: "那骨子里敢于对不喜欢的事物抗争的烈性",
      B: "能被一朵小花或一丝清风打动、随时落泪的柔软",
      C: "在狂躁的混乱人群里，能够保持清静的一颗冷心"
    },
    options_en: {
      A: "My inner rebellious spark to fight what I dislike",
      B: "My tender heart, easily touched by a tiny flower or breeze",
      C: "A cool, tranquil mind when surrounded by crowd madness"
    }
  },
  {
    id: 7,
    text_zh: "走入一所已经被废弃了很久的古老空屋里，你会留意：",
    text_en: "Walking into an abandoned, very old empty house, you notice:",
    options_zh: {
      A: "穿过碎瓦破窗洒进来的那一缕明媚阳光",
      B: "旧墙壁上曾经的人留下来的模糊生活痕迹",
      C: "这栋屋子古老对称而庄严的空间布局"
    },
    options_en: {
      A: "A bright ray of warm sunlight coming through the cracks",
      B: "The dusty, vague handprints of people who once lived here",
      C: "The solid, ancient structural logic of the architecture"
    }
  },
  {
    id: 8,
    text_zh: "如果人生已经是一出编排好的戏剧，你会扮演什么角色？",
    text_en: "If life is a pre-scripted play, you'd rather be:",
    options_zh: {
      A: "努力改写剧本、掌握主控权的导演",
      B: "坐在台下默默旁观、带着冷淡微笑的观众",
      C: "即便注定是出悲剧，也倾尽全力演完它的主角"
    },
    options_en: {
      A: "The director struggling to rewrite and control the ending",
      B: "The quiet spectator in the dark, watching with an ironic smile",
      C: "The hero who dances with absolute devotion until the curtain calls"
    }
  },
  {
    id: 9,
    text_zh: "如果时光可以用金钱买回或典当，你会如何选择？",
    text_en: "If memories could be pawned or sold, what would you do?",
    options_zh: {
      A: "卖掉平平无奇的琐碎日子，只要那些精彩瞬间",
      B: "用那些因执念而生出的悲哀和伤痕换取安静",
      C: "不换。无论甜涩，哪怕是一道伤，也皆是我自己"
    },
    options_en: {
      A: "Sell all boring, repetitive days to keep only high peaks",
      B: "Trade old regrets and heartaches to buy quiet peace",
      C: "None. Sweets or scars, every page of history is myself"
    }
  },
  {
    id: 10,
    text_zh: "在喧嚣浮躁的尘世里，以下什么最能打动你的灵魂？",
    text_en: "In this bustling worldly noise, what touches your soul most?",
    options_zh: {
      A: "哪怕面对不可改变的力量，依然绝不低头的纯粹风骨",
      B: "对一切被伤害、破碎的事物抱有的长久温柔与怜悯",
      C: "在彻底失控的环境中，依然能够维持有条不紊的理智"
    },
    options_en: {
      A: "An unbending free will that refuses to submit to raw power",
      B: "A long, quiet empathy for the broken and injured",
      C: "A calm, absolute self-control amidst chaotic firestorm"
    }
  },
  {
    id: 11,
    text_zh: "如果你的灵魂能暂时寄居在一种动物身上，你会选择：",
    text_en: "If your soul could temporarily lodge in an animal, you'd choose:",
    options_zh: {
      A: "一只在古墙瓦片上踩碎阳光、对人类若即若离的流浪野猫",
      B: "一只张开金色双翼、在咆哮惊雷的高空里迎风盘旋的鹰隼",
      C: "一头在万米深海中慢吞吞呼吸、活了数百年的温柔巨鲸"
    },
    options_en: {
      A: "A stray cat stepping on warm rooftop tiles, detached and free",
      B: "A falcon with golden wings, circling in the roaring mountain thunder",
      C: "A gentle giant whale breathing slowly in the absolute dark of the ocean"
    }
  },
  {
    id: 12,
    text_zh: "当你来到一个怪异的分岔路口，左边是“安稳但无聊的荒原”，右边是“危险但开满奇花的山谷”，你：",
    text_en: "At a bizarre crossroads, left is 'Safe but Dull Plain', right is 'Dangerous but Floral Valley'. You:",
    options_zh: {
      A: "毫无顾忌地拐向右边，哪怕路途布满会刺痛人的荆棘",
      B: "在路口徘徊良久，试着用随身携带的画笔把两边的美丽都留下来",
      C: "稳当踏上左边的坦途，哪怕确实无趣极了，但更安全可靠"
    },
    options_en: {
      A: "Walk instantly towards the right, even if the trail is full of sharp thorns",
      B: "Linger at the turning point, attempting to capture both scenes in your sketchpad",
      C: "Walk down the safe plain on the left, choosing secure predictability over danger"
    }
  },
  {
    id: 13,
    text_zh: "如果清晨盥洗室的镜子突然开口小声对你说话，它多半会说：",
    text_en: "If your bathroom mirror suddenly whispers a secret to you in the morning, it whispers:",
    options_zh: {
      A: "“嘿，你这皮囊底子藏着的那颗心，其实比谁都要狂野不驯。”",
      B: "“尘世纷纷扰扰有啥意思，我只心疼你眼角那一闪而过的无助落寞。”",
      C: "“别做情绪的俘虏了，打起精神，生活只尊重有秩序和有效率的人。”"
    },
    options_en: {
      A: "'Hey, the soul beating beneath your skin is wilder than anyone suspects.'",
      B: "'The world is so noisy; I only mirror the quiet sadness hiding in your eyes.'",
      C: "'Stop being a slave to feelings. Move on; life only smiles at the orderly and efficient.'"
    }
  },
  {
    id: 14,
    text_zh: "夏日街头突降倾盆暴雨，四周行人大乱，而你没有带伞。你打算：",
    text_en: "A sudden heavy summer shower pours down on the streets. You have no umbrella. You decide to:",
    options_zh: {
      A: "干脆不跑了！仰起脸淋个湿透，并在急降的大雨里尽情大笑一回",
      B: "站在一家复古书店的屋檐下，静静盯着顺着瓦片滑下的漂亮雨珠发呆",
      C: "冷静、快速地测算距离，踏出最合理的跑动路线去最近的便利屋"
    },
    options_en: {
      A: "Stop running entirely! Soak in the rain and laugh like a rebellious runaway",
      B: "Stand peacefully under the awning of a bookstore, daydreaming to the sound of droplets",
      C: "Calmly map out the fastest, driest path with minimum energy to the nearest shelter"
    }
  },
  {
    id: 15,
    text_zh: "神明允许你亲手为天空的月亮涂上一次色彩，你会选：",
    text_en: "The gods allow you to paint the moon custom colors for a night. You paint it:",
    options_zh: {
      A: "一抹狂放、极有视觉反差的妖冶猩红，惊动所有沉睡的大地",
      B: "温柔慵懒的淡淡乳黄，像一盏挂在繁星间、能揉碎情绪的朦胧气泡灯",
      C: "半透明的深蓝冰色，让它彻底和冰冷而有规律的宇宙深空融为一体"
    },
    options_en: {
      A: "A defiant, high-contrast crimson to shake the sleeping fields",
      B: "A warm, lazy milk-yellow, like a soft lantern floating in a starry sky",
      C: "An icy translucent dark blue, melting into the silent mathematical universe"
    }
  }
];

// List of exactly 20 classic literary characters requested by user
const CHARACTERS_POOL = [
  "哈姆雷特 (Hamlet)",
  "盖茨比 (Jay Gatsby)",
  "堂吉诃德 (Don Quixote)",
  "伊万·卡拉马佐夫 (Ivan Karamazov)",
  "阿廖沙·卡拉马佐夫 (Alyosha Karamazov)",
  "道连·格雷 (Dorian Gray)",
  "达洛卫夫人 (Mrs. Dalloway)",
  "小王子 (The Little Prince)",
  "浮士德 (Faust)",
  "简·爱 (Jane Eyre)",
  "伊丽莎白·班内特 (Elizabeth Bennet)",
  "悉尼·卡顿 (Sydney Carton)",
  "于连·索雷尔 (Julien Sorel)",
  "默尔索 (Meursault)",
  "罗亭 (Rudin)",
  "贾宝玉 (Jia Baoyu)",
  "林黛玉 (Lin Daiyu)",
  "孙悟空 (Sun Wukong)",
  "基督山伯爵 (Count of Monte Cristo)",
  "霍尔顿·考菲尔德 (Holden Caulfield)"
];

// API route to get initial quiz questions
app.get("/api/quiz", (req, res) => {
  res.json({ scenarios: SCENARIOS });
});

// API route to analyze results
app.post("/api/analyze", async (req, res) => {
  try {
    const { answers, lang } = req.body;
    
    const isEn = lang === "en";
    const languageLabel = isEn ? "English" : "Chinese";

    // Format chosen answers into a readable breakdown so Gemini can see the semantic options selected by the user
    const userChoicesDescriptions = SCENARIOS.map(s => {
      const selectedLetter = answers[s.id]; // e.g., "A", "B", "C"
      if (!selectedLetter) return null;
      const questionText = isEn ? s.text_en : s.text_zh;
      const optionText = isEn ? s.options_en[selectedLetter as 'A'|'B'|'C'] : s.options_zh[selectedLetter as 'A'|'B'|'C'];
      return `- 问题 / Question: "${questionText}"\n  选项 / Option [${selectedLetter}]: "${optionText}"`;
    }).filter(Boolean).join("\n\n");
    
    const prompt = `You are a Zen-like literary master analyzing a user's personality.
    Based on the user's detailed answers to a 15-question personality test:
    
    ${userChoicesDescriptions}
    
    You MUST map the user's personality to EXACTLY ONE of the following 20 classic literary characters based on the philosophical resonance of their choices:
    ${CHARACTERS_POOL.join(", ")}.
    
    CRITICAL: Avoid bias or defaulting to a single character (such as "堂吉诃德 (Don Quixote)" or "哈姆雷特 (Hamlet)"). Each of these 20 characters represents a distinct blend of the 6 dimensions:
    - 🥀 林黛玉 / Lin Daiyu: High Melancholy and Passion, delicate, sensitive, romantic.
    - 📿 贾宝玉 / Jia Baoyu: High Passion and Idealism, hates worldly constraints, loves companions.
    - 💀 哈姆雷特 / Hamlet: High Melancholy, Intellect, passion, tragic philosophical hesitation.
    - 🥂 盖茨比 / Jay Gatsby: High Idealism, passion, adventure, chasing a romanticized past.
    - 🛡️ 堂吉诃德 / Don Quixote: Ultimate Idealism and Adventure, ignores cold reality for chivalry.
    - 📓 伊万·卡拉马佐夫 / Ivan Karamazov: High Intellect and Melancholy, tortured by religious/existential philosophy and suffering.
    - 🕊️ 阿廖沙·卡拉马佐夫 / Alyosha Karamazov: High Idealism and Passion, deep compassion, gentle, child-like faith.
    - 🪞 道连·格雷 / Dorian Gray: High Melancholy and Passion, pursuit of absolute aestheticism and eternal youth.
    - 💐 达洛卫夫人 / Mrs. Dalloway: High Melancholy and Practicality, observing life, elegant, nostalgic.
    - 🦊 小王子 / The Little Prince: High Idealism and Adventure, soft innocence, looking at the world with the heart.
    - 🧪 浮士德 / Faust: High Intellect and Adventure, seeking ultimate knowledge, experience, even if dangerous.
    - 📖 简·爱 / Jane Eyre: High Practicality and Idealism, independent, pride, uncompromised self-respect.
    - ✍️ 伊丽莎白·班内特 / Elizabeth Bennet: High Intellect and Practicality, lively, smart, analyzing pride/prejudice.
    - 🩸 悉尼·卡顿 / Sydney Carton: High Passion and Melancholy, self-sacrificing, redemption through love.
    - 🪜 于连·索雷尔 / Julien Sorel: High Practicality and Passion, ambition, rebellion against societal class.
    - ☀️ 默尔索 / Meursault: High Practicality and Melancholy, indifferent, looking at existence or reality with cool honesty, resists drama.
    - 🍂 罗亭 / Rudin: High Idealism and Melancholy, eloquent but powerless to act, tragic romantic wanderer.
    - 🐒 孙悟空 / Sun Wukong: High Adventure and Passion, rebellious, free spirit, shattering dull rules.
    - 🗝️ 基督山伯爵 / Count of Monte Cristo: High Practicality, Intellect, and Melancholy, meticulous planning, patient vengeance.
    - 🌾 霍尔顿·考菲尔德 / Holden Caulfield: High Melancholy and Idealism/Adventure, teenage alienation, calling others "phony", protect innocence.

    Analyze their choices extremely carefully. Evaluate which of the 20 matches their soul's pattern best. Let the output character distribution be diverse and sensitive to their specific answers. If they show deep indifference and realism, map to Meursault. If they show tragic ambition and social climbing, Julien Sorel. If they show deep thirst for truth and wisdom, Faust or Ivan Karamazov. If they show quiet nostalgia and gentle love, Mrs. Dalloway or Alyosha.
    
    Format requirements:
    - character: The name of the character, in ${languageLabel}. If Chinese language is chosen, provide the standard localized Chinese name (e.g., "哈姆雷特", "盖茨比", "堂吉诃德", "伊万·卡拉马佐夫", "阿廖沙·卡拉马佐夫", "道连·格雷", "达洛卫夫人", "小王子", "浮士德", "简·爱", "伊丽莎白·班内特", "悉尼·卡顿", "于连·索雷尔", "默尔索", "罗亭", "贾宝玉", "林黛玉", "孙悟空", "基督山伯爵", "霍尔顿·考菲尔德").
    - interpretation: A highly CONCISE, simple, yet deeply POETIC and ZEN-LIKE (富有诗意/禅意且简洁，不堆砌繁复词藻) interpretation explaining why they connect to this specific literary character. Do NOT make it overly wordy or use excessive literary jargon. Keep it brief, atmospheric, and punchy (around 3 to 4 elegant sentences with spacing to breathe, under 120 words total).
    - dimensions: A JSON object containing exactly 6 dimensions.
      For English, the 6 keys MUST be exactly: "Adventure", "Melancholy", "Practicality", "Idealism", "Intellect", "Passion".
      For Chinese, the 6 keys MUST be exactly: "探索欲", "冷睿/忧郁", "实用感", "理想性", "理性度", "情感度".
      Scores must be integers between 20 and 100 representing their resonance.
    
    Structure response strictly as JSON:
    {
      "character": "...",
      "interpretation": "...",
      "dimensions": {
        "${isEn ? "Adventure" : "探索欲"}": number,
        "${isEn ? "Melancholy" : "冷睿/忧郁"}": number,
        "${isEn ? "Practicality" : "实用感"}": number,
        "${isEn ? "Idealism" : "理想性"}": number,
        "${isEn ? "Intellect" : "理性度"}": number,
        "${isEn ? "Passion" : "情感度"}": number
      }
    }`;
    
    const result = await callWithRetry(() => ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    }));
    
    const analysisData = JSON.parse(result.text || "{}");
    res.json(analysisData);
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: "Gemini API is currently overloaded. Please try again later." });
  }
});

// Vite middleware development/production setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
