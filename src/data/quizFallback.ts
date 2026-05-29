import { QuizData, AnalysisResult } from '../types';

export const LOCAL_SCENARIOS = [
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

// High fidelity coordinates for literary characters across 6 dimensions
export const CHARACTER_COORDINATES = [
  {
    name_zh: "林黛玉",
    name_en: "Lin Daiyu",
    // Adventure, Melancholy, Practicality, Idealism, Intellect, Passion
    vector: [30, 98, 25, 92, 55, 95],
    desc_zh: "多愁善感而又至情至性。在你温柔清澈的身影中，有一种不愿对世态俗物低低的执拗，守候着自我的洁净与纯真。",
    desc_en: "Drawn to absolute poetic loyalty and quiet deep feeling. Behind your soft presence is a fierce refusal to sell your soul to worldly calculations."
  },
  {
    name_zh: "贾宝玉",
    name_en: "Jia Baoyu",
    vector: [45, 80, 20, 96, 40, 98],
    desc_zh: "心性纯澈，不愿忍受生活里一丝一毫的市侩与逼迫。你爱惜身旁每一个生命的哀喜，始终怀有一颗赤诚无邪的心。",
    desc_en: "A beautiful, innocent child walking through worldly vanity, grieving for every transient blossom and keeping a pure, unblemished heart."
  },
  {
    name_zh: "哈姆雷特",
    name_en: "Hamlet",
    vector: [40, 95, 30, 85, 85, 90],
    desc_zh: "生性敏锐，眼中盛满了对生死的清凉审视。你在选择、退缩与求索中久久打转，却在暗夜里守护着最深刻的道德底线。",
    desc_en: "An intense, introspective thinker standing in the misty shadows of doubt, bearing the heavy philosophical questions of life and fate."
  },
  {
    name_zh: "盖茨比",
    name_en: "Jay Gatsby",
    vector: [65, 75, 40, 98, 50, 95],
    desc_zh: "你一生都在逆流前行，去追赶那一抹早就留存在旧时光里的美梦。虽然知道虚妄，但你偏偏不信邪，依然头也不回。",
    desc_en: "An unyielding romantic, chasing a lost beacon of hope. No matter how deep the currents, you refuse to compromise your beautiful dream."
  },
  {
    name_zh: "堂吉诃德",
    name_en: "Don Quixote",
    vector: [98, 35, 15, 100, 30, 92],
    desc_zh: "世人算计得失，你却只看本心。哪怕披上一身生锈的铠甲独自冲向旋转的风车，你也要活在自己热诚的信仰世界里。",
    desc_en: "A beautiful dreamer taking up arms in an age without heroes. To common eyes a bit eccentric, to your soul, you are purely awake."
  },
  {
    name_zh: "伊万·卡拉马佐夫",
    name_en: "Ivan Karamazov",
    vector: [35, 92, 45, 65, 98, 60],
    desc_zh: "理智得近乎残忍，看透了人间一切琐碎的虚假和丑恶。你在认知的荒原中四处徘徊，时刻跟自己的清醒精神做着惨烈的斗争。",
    desc_en: "A sharp intellect of absolute logic, questioning cosmic rules and human misery, wandering in a solitary labyrinth of cold truths."
  },
  {
    name_zh: "阿廖沙·卡拉马佐夫",
    name_en: "Alyosha Karamazov",
    vector: [40, 50, 35, 96, 50, 92],
    desc_zh: "像一缕穿透密云的温和白光。你听得到人间所有的嘈杂，心里却保持着无欲无私的豁达，用不可战胜的深沉慈悲接纳着一切。",
    desc_en: "A gentle soul carrying an unbreaking warmth. Surrounded by worldly noise, you listen with absolute empathy and pure, open arms."
  },
  {
    name_zh: "道连·格雷",
    name_en: "Dorian Gray",
    vector: [60, 88, 30, 80, 50, 94],
    desc_zh: "一个天生的美学至上信徒。你对世间所有精致、无邪的设计有着致命的亲和力，但内心深处也藏着对岁月和秘密的长久疲倦。",
    desc_en: "A brilliant lover of art and absolute sensuality, walking through delicate landscapes while holding a private, heavy weight of time."
  },
  {
    name_zh: "达洛卫夫人",
    name_en: "Mrs. Dalloway",
    vector: [35, 82, 75, 60, 60, 70],
    desc_zh: "在优雅的日常里收集清晨的新鲜。你在平静如水的杯盏交错间安顿灵魂，用井井有条去安抚内心里曾经起伏过的每一场雷雨。",
    desc_en: "A graceful soul gathering morning flowers. You build a strong temple of beautiful routines to quiet the old, lingering storms of youth."
  },
  {
    name_zh: "小王子",
    name_en: "The Little Prince",
    vector: [90, 60, 20, 98, 40, 85],
    desc_zh: "任性的玫瑰、小小的星球是你守望的领地。你不在乎世俗成年人的条理，只凭最柔软的直觉与爱，寻找属于心灵的纯正。",
    desc_en: "A soft traveler from a quiet star, loyal to a single, delicate rose, identifying life's essence with only your intuitive, dreaming eyes."
  },
  {
    name_zh: "浮士德",
    name_en: "Faust",
    vector: [98, 55, 40, 85, 92, 88],
    desc_zh: "精神永远奔腾不止，极度厌倦稳妥的停滞与平庸的生活。哪怕路途前进一步就是深渊魔障，你也要穷尽毕生力量去开辟新境。",
    desc_en: "A restless seeker of dynamic action and grand design. You despise routine, always stretching your hands towards dangerous, luminous horizons."
  },
  {
    name_zh: "简·爱",
    name_en: "Jane Eyre",
    vector: [55, 65, 85, 90, 70, 80],
    desc_zh: "平实、宁静而具有磐石般的心地。在冷酷沉闷的生活废墟里，你以无可剥夺的自由意志与傲骨自尊，撑开了一片顶天立地的澄明。",
    desc_en: "Unassuming but forged from absolute granite. In difficult times, you guard your unshakeable dignity and choose equality above all."
  },
  {
    name_zh: "伊丽莎白·班内特",
    name_en: "Elizabeth Bennet",
    vector: [50, 45, 82, 75, 88, 75],
    desc_zh: "灵动、俏皮且富有敏锐的知人分寸。你的眼睛里没有媚态和谄笑，总能清醒地剥离虚荣与误导，走出独立明朗的自在步伐。",
    desc_en: "Quick-witted and wonderfully observant. Guided by persistent warmth and self-respect, you easily brush away silly pride and prejudice."
  },
  {
    name_zh: "悉尼·卡顿",
    name_en: "Sydney Carton",
    vector: [45, 92, 35, 75, 60, 96],
    desc_zh: "外表总是一副最慵懒、散漫、自甘沉沦的模样，其实冰凉的硬壳下，死死藏着一颗至死方休的极其高尚、毫无自私的执着之心。",
    desc_en: "Hiding behind an indifferent, cynical facade. Yet below the cold shield, you harbor a heart of absolute devotion, ready for supreme sacrifice."
  },
  {
    name_zh: "于连·索雷尔",
    name_en: "Julien Sorel",
    vector: [75, 80, 85, 55, 75, 90],
    desc_zh: "骨子里带着骄傲的高攀者，在世俗规约的利刃上赤足而行。你狂热地赶路去向所有人自证清白，却在最后重回纯真自由的怀抱。",
    desc_en: "A fiery soul climbing high societal fences. You fight with intense ambition to prove your worth, yet find peace only when true to yourself."
  },
  {
    name_zh: "默尔索",
    name_en: "Meursault",
    vector: [40, 88, 92, 30, 80, 40],
    desc_zh: "冷淡、率性、不愿为虚伪的社会戏台念出一句敷衍台词。你接受太阳的光照与生活的原样，用沉默展现最不妥协的诚实底牌。",
    desc_en: "The calm outsider of raw existence. You reject emotional theatrics, accepting the universe and mortality with quiet, cool honesty."
  },
  {
    name_zh: "罗亭",
    name_en: "Rudin",
    vector: [65, 82, 30, 92, 70, 75],
    desc_zh: "口舌间有燃尽寒夜的崇高火焰，能够顷刻照亮身旁的无数灵魂。然而在泥泞艰涩的现实泥潭中，你常常在落叶纷飞的街头留下一生叹息。",
    desc_en: "An eloquent spirit pouring out high-flying dreams that ignite others, yet wandering like a lonely autumn leaf in real-life trenches."
  },
  {
    name_zh: "孙悟空",
    name_en: "Sun Wukong",
    vector: [96, 40, 25, 85, 45, 98],
    desc_zh: "生就一身无法驯服的傲气脊骨。你生生撕碎陈腐死气的框条和高墙伦理，百折不回头，只要一个任己啸傲红尘的开阔和自由。",
    desc_en: "An untamed gush of wild flame. You crash through stiff, heavy gates with playful defiance, seeking only boundless freedom and space."
  },
  {
    name_zh: "基督山伯爵",
    name_en: "Count of Monte Cristo",
    vector: [55, 85, 96, 50, 94, 75],
    desc_zh: "从黑暗海礁里死而复生的行刑判官。你用天平一般精准的计谋和资源去审理不公，却在圆满洗劫仇恨之后，留下一片大度孤帆悄然离去。",
    desc_en: "A silent force of nature rising from a deep dungeon. You execute meticulous justice, only to forgive and sail off into the quiet horizon."
  },
  {
    name_zh: "霍尔顿·考菲尔德",
    name_en: "Holden Caulfield",
    vector: [80, 85, 25, 94, 45, 82],
    desc_zh: "看厌了成人社会的伪善客套与做作，觉得无趣又荒诞。你本能地反抗着，其实只想当那一个守在悬崖边照看天真孩童的孤独者。",
    desc_en: "Weary of fake smiles and worldly pretension. You rebel in isolation, secretly wishing only to keep the pure dreams of children safe from falling."
  }
];

// Offline fallback logic for calculating dimension scores and closest character
export function calculateLocalAnalysis(answers: Record<number, string>, lang: 'zh' | 'en'): AnalysisResult {
  // 6 dimensions: Adventure, Melancholy, Practicality, Idealism, Intellect, Passion
  // Index: [0, 1, 2, 3, 4, 5]
  const scores = [0, 0, 0, 0, 0, 0];

  // Map each answer choice to dimensions index incremental points
  const mappings: Record<number, Record<'A' | 'B' | 'C', { index: number; val: number }[]>> = {
    1: {
      A: [{ index: 1, val: 20 }, { index: 3, val: 10 }],
      B: [{ index: 5, val: 20 }, { index: 1, val: 10 }],
      C: [{ index: 4, val: 20 }, { index: 2, val: 10 }]
    },
    2: {
      A: [{ index: 1, val: 20 }],
      B: [{ index: 5, val: 15 }, { index: 3, val: 10 }],
      C: [{ index: 4, val: 20 }]
    },
    3: {
      A: [{ index: 5, val: 15 }, { index: 1, val: 10 }],
      B: [{ index: 3, val: 20 }, { index: 0, val: 10 }],
      C: [{ index: 4, val: 20 }, { index: 2, val: 10 }]
    },
    4: {
      A: [{ index: 3, val: 20 }, { index: 0, val: 10 }],
      B: [{ index: 5, val: 20 }],
      C: [{ index: 4, val: 20 }, { index: 1, val: 10 }]
    },
    5: {
      A: [{ index: 0, val: 20 }, { index: 5, val: 10 }],
      B: [{ index: 1, val: 20 }, { index: 3, val: 10 }],
      C: [{ index: 2, val: 20 }, { index: 4, val: 10 }]
    },
    6: {
      A: [{ index: 5, val: 20 }, { index: 0, val: 10 }],
      B: [{ index: 3, val: 20 }, { index: 1, val: 10 }],
      C: [{ index: 4, val: 20 }, { index: 2, val: 10 }]
    },
    7: {
      A: [{ index: 3, val: 15 }, { index: 0, val: 10 }],
      B: [{ index: 5, val: 15 }, { index: 1, val: 15 }],
      C: [{ index: 4, val: 20 }, { index: 2, val: 10 }]
    },
    8: {
      A: [{ index: 4, val: 20 }, { index: 2, val: 10 }],
      B: [{ index: 1, val: 20 }],
      C: [{ index: 5, val: 20 }, { index: 3, val: 15 }]
    },
    9: {
      A: [{ index: 0, val: 20 }, { index: 5, val: 10 }],
      B: [{ index: 1, val: 15 }, { index: 3, val: 15 }],
      C: [{ index: 2, val: 20 }, { index: 4, val: 10 }]
    },
    10: {
      A: [{ index: 3, val: 20 }, { index: 0, val: 10 }],
      B: [{ index: 5, val: 20 }, { index: 1, val: 10 }],
      C: [{ index: 4, val: 20 }, { index: 2, val: 10 }]
    },
    11: {
      A: [{ index: 1, val: 15 }, { index: 2, val: 10 }],
      B: [{ index: 0, val: 20 }, { index: 5, val: 10 }],
      C: [{ index: 4, val: 15 }, { index: 3, val: 15 }]
    },
    12: {
      A: [{ index: 0, val: 25 }, { index: 5, val: 10 }],
      B: [{ index: 3, val: 15 }, { index: 1, val: 15 }],
      C: [{ index: 2, val: 25 }, { index: 4, val: 10 }]
    },
    13: {
      A: [{ index: 5, val: 15 }, { index: 0, val: 15 }],
      B: [{ index: 1, val: 20 }],
      C: [{ index: 4, val: 15 }, { index: 2, val: 15 }]
    },
    14: {
      A: [{ index: 5, val: 15 }, { index: 0, val: 20 }],
      B: [{ index: 1, val: 15 }, { index: 3, val: 15 }],
      C: [{ index: 2, val: 25 }, { index: 4, val: 15 }]
    },
    15: {
      A: [{ index: 5, val: 15 }, { index: 0, val: 20 }],
      B: [{ index: 3, val: 15 }, { index: 1, val: 15 }],
      C: [{ index: 4, val: 20 }, { index: 2, val: 15 }]
    }
  };

  // Sum raw points
  Object.entries(answers).forEach(([qIdStr, choice]) => {
    const qId = parseInt(qIdStr, 10);
    const mapping = mappings[qId]?.[choice as 'A' | 'B' | 'C'];
    if (mapping) {
      mapping.forEach(({ index, val }) => {
        scores[index] += val;
      });
    }
  });

  // Scale and normalize dimension scores to look outstanding (between 35 and 98)
  const maxRaw = 100; // soft max expected for any dimension
  const finalDimensionsMap: Record<string, number> = {};
  const dimKeysEn = ["Adventure", "Melancholy", "Practicality", "Idealism", "Intellect", "Passion"];
  const dimKeysZh = ["探索欲", "冷睿/忧郁", "实用感", "理想性", "理性度", "情感度"];
  const finalScores: number[] = [];

  for (let i = 0; i < 6; i++) {
    const raw = scores[i];
    // Baseline score 35-40, max 98
    let pct = Math.round(40 + (raw / maxRaw) * 58);
    if (pct > 98) pct = 98;
    if (pct < 35) pct = 35;
    
    finalScores.push(pct);
    const key = lang === 'zh' ? dimKeysZh[i] : dimKeysEn[i];
    finalDimensionsMap[key] = pct;
  }

  // Calculate Euclidean distance to characters to find the closest match
  let closestChar = CHARACTER_COORDINATES[0];
  let minDistance = Infinity;

  CHARACTER_COORDINATES.forEach((char) => {
    let distanceSum = 0;
    for (let i = 0; i < 6; i++) {
      const diff = finalScores[i] - char.vector[i];
      distanceSum += diff * diff;
    }
    const distance = Math.sqrt(distanceSum);
    if (distance < minDistance) {
      minDistance = distance;
      closestChar = char;
    }
  });

  return {
    character: lang === 'zh' ? closestChar.name_zh : closestChar.name_en,
    interpretation: lang === 'zh' ? closestChar.desc_zh : closestChar.desc_en,
    dimensions: finalDimensionsMap
  };
}
