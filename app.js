// ===== 定数 =====

// 個別格の5段階評価（ユーザー定義）
const GRADE_TIERS = [
  { nums: new Set([21,23,29,33,39]),               label: "特殊格", cls: "special"  },
  { nums: new Set([13,15,24,31,32,48,52]),          label: "最大吉", cls: "maxlucky" },
  { nums: new Set([11,16,17,25,41,47]),             label: "大吉",   cls: "great"    },
  { nums: new Set([1,3,5,6,7,8,18,35,37,38,45]),   label: "吉",     cls: "good"     },
  { nums: new Set([27,30,34,36,40]),                label: "天地",   cls: "tenchi"   },
];

// 吉数（試練以外の全数）
const LUCKY_NUMBERS = new Set([
  ...GRADE_TIERS[0].nums,
  ...GRADE_TIERS[1].nums,
  ...GRADE_TIERS[2].nums,
  ...GRADE_TIERS[3].nums,
]);

// 特殊格数（全体グレード判定用）
const SUPER_LUCKY = GRADE_TIERS[0].nums;

function getKakuGrade(value) {
  for (const tier of GRADE_TIERS) {
    if (tier.nums.has(value)) return { label: tier.label, cls: tier.cls };
  }
  return { label: "試練", cls: "trial" };
}

// 全体グレード（5段階）
function getOverallGrade(values) {
  const luckyCount = values.filter(v => LUCKY_NUMBERS.has(v)).length;
  const superCount = values.filter(v => SUPER_LUCKY.has(v)).length;

  if (superCount === 5) return {
    grade: "特殊格", cls: "special",
    desc: "五格全てに特別な吉数が宿る。極めて稀な、天に選ばれた名前。"
  };
  if (luckyCount === 5) return {
    grade: "最大吉", cls: "maxlucky",
    desc: "五格全てが吉数。運命に守られた、完全なる名前。"
  };
  if (luckyCount === 4) return {
    grade: "大吉", cls: "great",
    desc: "四格が吉数。強い運気を持ち、道が自然と開けていく名前。"
  };
  if (luckyCount === 3) return {
    grade: "吉", cls: "good",
    desc: "三格が吉数。バランスの取れた、安定した運勢の名前。"
  };
  return {
    grade: "試練", cls: "trial",
    desc: "試練を乗り越えるほど輝きが増す名前。"
  };
}

// 各格の情報
const KAKU_INFO = {
  ten:  { label: "天格", ruby: "てんかく",  desc: "先祖・家系の運。苗字全体の画数。" },
  chi:  { label: "地格", ruby: "ちかく",    desc: "幼少期〜青年期の運勢・才能。名前全体の画数。" },
  jin:  { label: "人格", ruby: "じんかく",  desc: "人生の主運。仕事・対人・結婚運を司る。" },
  gai:  { label: "外格", ruby: "がいかく",  desc: "社会・対外的な運。家族・友人との縁。" },
  so:   { label: "総格", ruby: "そうかく",  desc: "一生を通じた総合運。晩年の運勢。" },
};

// 数字の解釈
const NUMBER_MEANINGS = {
  1:  "万物の始まりを象徴する、強力な吉数。揺るぎない意志と決断力を持ち、困難な状況でも自ら道を切り拓く先導者の資質がある。ゼロから新しい世界を創造する力に恵まれ、その名は人々に強い印象を刻む。",
  3:  "才能と創造性が溢れる、表現の吉数。言葉・芸術・コミュニケーションの力が強く、人を自然と引きつけるカリスマ性がある。明るいエネルギーで周囲を活気づけ、多くの人に影響を与える存在として輝く。",
  5:  "変化と柔軟性を司る、躍動の吉数。どんな環境にも順応し、多様な経験を糧に成長する力がある。行動力と好奇心が旺盛で、新しい挑戦を恐れずに人生のあらゆる可能性を探り続ける。",
  6:  "調和と愛情を象徴する、縁の吉数。深い共感力と思いやりで人との絆を大切にし、温かい人間関係を築く力がある。奉仕の精神が豊かで、周囲の人を自然と幸せにする愛に満ちた存在。",
  7:  "精神性と洞察の深さを示す、内なる吉数。独自の美意識と鋭い直感力を持ち、表面には見えない真実を見抜く力がある。孤独を恐れず自己を磨き続けることで、唯一無二の存在として深い輝きを放つ。",
  8:  "努力と着実な発展を象徴する、勤勉の吉数。強い忍耐力と粘り強さで困難を乗り越え、長期的な成功を積み上げる力がある。財運にも恵まれ、地道な積み重ねが揺るぎない大きな繁栄へとつながる。",
  11: "霊感と直感を宿す、神秘の大吉数。芸術的才能と繊細な感受性が際立ち、他者には見えないものを感じ取る類まれな力がある。理想を高く掲げ、精神的な豊かさを追い求めることで、特別な才能が大きく開花する。",
  13: "知性と行動力が融合した、躍進の最大吉数。革新的なアイデアを次々と形にする実行力があり、周囲を巻き込む強い求心力に恵まれる。困難な状況でも前向きに突破口を見つけ、多くの人をリードしながら成功をつかむ。",
  15: "人望と徳を兼ね備えた、福徳の最大吉数。温かく誠実な人柄が自然と人を引き寄せ、リーダーとして多くの人に慕われる資質がある。長年にわたる誠実な積み重ねが深い信頼となり、豊かで充実した人生をもたらす。",
  16: "統率力と包容力を象徴する、調和の大吉数。どんな困難な状況でも人心を掴み、多様な人々をまとめ上げる力がある。広い心で他者を受け入れ、協力を引き出すことで、単独では成し得ない大きな成果を生み出す。",
  17: "強い意志と独立心を持つ、不屈の大吉数。自分の信念を決して曲げず、自らが信じる道を力強く切り拓くエネルギーがある。際立つ個性と確固たるスタイルで周囲に強い印象を残し、唯一無二の道を歩む。",
  18: "権威と実力を兼ね備えた、大成の吉数。誠実な努力が正当に評価され、社会的な地位や名誉を着実に得ていく資質がある。忍耐強く積み上げた実績が確かな信頼となり、人生の後半にこそ大きな花が咲く。",
  21: "頭領の資質を持つ、稀有な特殊格。圧倒的なカリスマ性と揺るぎない決断力で、大きな夢を現実へと変える力がある。多くの人を率いる使命を持つ数であり、その生き様は周囲に深く刻まれ、時代に名を残す可能性を秘める。",
  23: "活力と突破力を持つ、前進の特殊格。いかなる困難も糧に変え、積極的に運命を切り拓く不屈の精神がある。若いうちから才能が周囲に認められやすく、行動を起こすたびに新たな道が次々と開けていく。",
  24: "財運と愛情運に恵まれた、豊穣の最大吉数。人に深く愛され、物質的・精神的な豊かさが自然と引き寄せられる力がある。温かい人間関係の中で生き、周囲に幸福を分け与えながら自らも繁栄し続ける。",
  25: "独創性と探究心に満ちた、先見の大吉数。時代の一歩先を行く視点で物事を捉え、他者にない独自の発見をする力がある。専門的な分野で才能を深く開花させ、その知識と洞察で唯一無二の存在として認められる。",
  29: "知略と幸運を兼ね備えた、機知の特殊格。状況を瞬時に読む洞察力と機転の利く判断力に特別な才がある。絶好のタイミングを見極めて的確に行動することで、大きな成果と幸運を次々と引き寄せていく。",
  31: "徳望と品格を持つ、繁栄の最大吉数。誠実で真摯な姿勢が人々の深い信頼を集め、自然と豊かさが訪れる力がある。人徳によって多くの縁と支援に恵まれ、長い時間をかけて着実に大きな繁栄へと歩んでいく。",
  32: "幸運を引き寄せる、奇縁の最大吉数。意外な出会いや思いがけない巡り合わせで、運命が大きく好転する力がある。柔軟な心で縁を丁寧に大切にすることで、人生のあらゆる場面に幸運が自然と舞い込む。",
  33: "旺盛な生命力とカリスマを持つ、覇者の特殊格。集団を力強く引っ張るリーダーシップがあり、多くの人に影響を与え時代を動かす力がある。その圧倒的な熱量と推進力は周囲を鼓舞し、大きなうねりを生み出す使命を持つ。",
  35: "才知と温厚さが融合した、文雅の吉数。穏やかな人柄でありながら鋭い知性を持ち、文化・芸術・学問の分野で才能が輝く。周囲と良好な関係を保ちながら自分の世界を深め、人々に知的な喜びを与える存在になれる。",
  37: "強い個性と信念の実行力を持つ、独歩の吉数。自分の道をブレずに歩み続け、独自の世界観で高い評価を得る力がある。時間をかけて磨き続けた個性が、やがて多くの人に認められる唯一無二の輝きを放つ。",
  38: "才能と努力が実る、精進の吉数。持ち前の能力を磨き続けることで、周囲に認められる大きな成果を生み出す力がある。一歩一歩の積み重ねを大切にすることで、豊かな人生と深い充実感を手にする。",
  39: "名誉と繁栄を象徴する、将星の特殊格。揺るぎない行動力と卓越した統率力で、大きな舞台に立つ力がある。高い目標を掲げ諦めずに挑戦し続けることで、輝かしい名声と繁栄を確かに手にする運命がある。",
  41: "指導者の資質と広い視野を持つ、大吉数。多くの人を導く強い意志と公平な判断力で、大きな事業を成し遂げる力がある。高い理想を持ちながら社会に貢献することで、自らも大きく成長し繁栄を築いていく。",
  45: "知恵と繁栄が融合した、叡智の大吉数。深い洞察力と的確な判断力で、複雑な状況でも最善の道を見出す力がある。長期的な視野で物事を丁寧に捉え、着実に豊かさと大きな成功を積み上げていく。",
  47: "誠実な努力が花開く、大器の大吉数。真摯に物事に取り組む姿勢が周囲の深い信頼を集め、着実に道を開く力がある。じっくりと力を蓄えながら歩むことで、大きく花開く遅咲きの才能を秘めた数。",
  48: "知略と繁盛を兼ね備えた、知富の最大吉数。一歩先を読む鋭い洞察力と確かな実行力で、財運と名誉を着実に手にする力がある。多くの人との縁を活かして長期的に繁栄し続け、豊かな人生を歩む力がある。",
  52: "先見の明を持つ、革新の最大吉数。時代の流れを早く読み、機を見て的確に動く卓越した才覚に恵まれる。周囲がまだ気づかない可能性を見抜き、新しい価値を生み出す革新的な力がある。",
  57: "着実な発展を遂げる、継続の吉数。諦めない根気と持続する力で、長期的な成功を確実に手にする資質がある。一歩一歩の積み重ねを大切にすることで、他者には真似できない揺るぎない実力が培われる。",
  58: "浮沈を乗り越える、不屈の吉数。波乱に満ちた道のりを経験するが、その試練が魂を強く鍛え上げる。苦難を乗り越えた先には、並の人間には到達できない大きな成功と深い満足が待っている。",
  61: "仁愛と実力を兼ね備えた、徳の吉数。人への深い思いやりと温かい行動が、自然と良縁と幸運を引き寄せる。誠実な人柄で周囲の信頼を集め、人との絆を大切にすることで豊かな人生が開けていく。",
  63: "安定と着実な発展を象徴する、基盤の吉数。地に足のついた堅実な努力が、ゆっくりと確かに実を結ぶ力がある。焦らず一歩一歩を大切にすることで、長期的に豊かで安定した人生を築き上げていく。",
  65: "繁栄と人望を持つ、温和の吉数。温かい人柄と確かな実力が相まって、多くの人の支持と信頼を自然と集める。人々に愛されながら豊かさを築き、周囲も幸せにする存在として人生を歩む。",
  67: "前進と発展を象徴する、挑戦の吉数。積極的な姿勢と行動力で、困難な壁も乗り越えて道を切り拓く力がある。エネルギッシュに前へ進み続けることで、望む未来を自らの手で引き寄せることができる。",
  68: "強運と実行力を持つ、剛毅の吉数。強い精神力と確かな実行力で、困難な状況を乗り越えて大きな成功をつかむ力がある。どんな壁に直面しても折れない強さが、最終的に輝かしい結果をもたらす。",
  81: "完成と無限の再出発を示す、円環の大吉数。1に還る循環の数であり、高い精神性と無限の可能性を秘めている。ひとつの頂点に達した後、より高い次元へと昇華していく稀有な力を持つ、完成の数。",
};

function getReading(n) {
  if (NUMBER_MEANINGS[n]) return NUMBER_MEANINGS[n];
  if (LUCKY_NUMBERS.has(n)) return "吉 — 安定した運勢。着実に歩むことで、運気が高まる。";
  const bad = {
    2:  "分離と対立を示す、葛藤の数。他者との摩擦や感情的な波に揺れやすいが、その経験が深い人間理解と共感力を育む。対立を乗り越えるたびに内なる強さが増し、やがて人と人をつなぐ架け橋となる力が宿る。",
    4:  "苦難の中で磨かれる、鍛錬の数。障害や制約の多い道を歩むことが多いが、それが比類なき精神的な強さを育てる。困難を糧にし続けることで、他者には到達できない深い実力と真の輝きが目覚める。",
    9:  "孤独と内省の深さを持つ、求道の数。孤独を感じやすく周囲と一線を引くことがあるが、その内省から深い洞察と哲学が生まれる。己と向き合い続けることで、他者にない独自の知恵と精神的な充実を得る。",
    10: "空虚を満たす力を求める、模索の数。内面的な充実感を追い求める旅が続くが、その探求こそが成長の源となる。精神的な豊かさを大切にし、自分の内にある本質に気づいた時、大きな力が解放される。",
    12: "苦労が魂を豊かにする、忍耐の数。人よりも多くの苦労や試練に直面しやすいが、その分だけ魂が深く豊かに育まれる。積み重ねた忍耐と経験が深い人間性となり、やがて周囲の人々の支えになる存在へと成長する。",
    14: "変化の多さに翻弄される、変転の数。環境や状況の変化が激しく、安定を保つことに苦労することがある。しかし変化に慣れ流れに乗ることを覚えた時、どんな状況にも対応できる柔軟な強さが手に入る。",
    19: "波乱を乗り越える、剛毅の数。激しい浮き沈みと波乱に満ちた道のりを歩むことが多い。しかし強い精神力でそれを乗り越えるたびに大きく成長し、やがては波乱すら力に変える不屈の魂が輝き出す。",
    20: "精神修養で運気を開く、修練の数。意志の弱さや方向性の定まらなさに悩むことがあるが、それは内なる成長のサインでもある。精神的な鍛錬と自己規律を積み重ねることで、安定した運気と揺るぎない自己が育まれる。",
    22: "計画と実行で突破口を開く、策謀の数。物事がなかなか思い通りに進まず、もどかしさを感じることがある。しかし丁寧な計画と着実な実行を心がけることで、困難な状況を少しずつ確実に打ち破ることができる。",
    26: "変化を力に変える、転機の数。予期せぬ変化や波乱が訪れやすく、流されてしまうことがある。しかし変化を恐れず積極的に受け入れることで、それが人生の大きな転換点となり新たな可能性が開かれる。",
    27: "強すぎる個性が孤立を招く、孤高の数。類まれな才能と強烈な個性を持つがゆえに、周囲との摩擦や孤立を経験することがある。その孤独の中でさらに才能を磨き続けることで、時代を超えた本物の力が育まれる。",
    28: "試練の先に大成長がある、飛躍の数。人一倍多くの試練と困難に直面するが、それは大きな成長のための糧でもある。一つひとつの壁を乗り越えるたびに確かに強くなり、やがて誰もが認める大きな成果へと転化する。",
    30: "吉凶が交差する、覚悟の数。運気の波が激しく、良い時期と苦しい時期が交互に訪れやすい。どんな局面でも覚悟と意志を持って進み続けることで、波を乗りこなす力が育まれ人生が大きく動き始める。",
    34: "最も深く磨かれる、試金の数。多くの試練を経験し、苦しみの中で自己と向き合う機会が多い。しかしその過程こそが真の実力と人格を形成し、試練の数だけ深く磨かれた魂が輝きを放つようになる。",
    36: "才能ゆえに試練が訪れる、英雄の数。本物の才能と力を持つがゆえに、多くの試練や妨害を受けることがある。しかしその試練を乗り越えるたびに才能はさらに磨かれ、真の英雄だけが到達できる境地へと歩んでいく。",
    40: "意志の力で運命を変える、可能性の数。無限の可能性を秘める一方で、精神力が試される局面が多い。強い意志と集中力を持ち続けることで、その潜在的な力が解放され、自らの力で運命を切り拓くことができる。",
    42: "内なる強さを育む、内省の数。外の世界との摩擦や困難から、深い内省と自己理解を促される機会が多い。その内なる強さと向き合い続けることで、やがて揺るぎない核となる力が育まれていく。",
    43: "集中力が突破口となる、専心の数。注意散漫や迷いによって力を分散させやすいが、そこに気づくことが成長への第一歩。一点に集中する力を高め、やるべきことに全力を注ぐことで道が大きく開ける。",
    44: "忍耐が最大の武器となる、持久の数。長い困難と苦労の道のりを歩むことが多く、なかなか結果が出ないもどかしさを感じる。しかし忍耐を武器に諦めずに歩み続けることで、他者には到達できない確かな成果を手にする。",
    46: "積み重ねが運気を開く、蓄積の数。努力が報われにくく、焦りを感じることがあるかもしれない。しかし着実な積み重ねを信じて歩み続けることで、見えないところで運気は確実に高まりやがて大きな花が開く。",
    49: "精神的な支えが力となる、信念の数。孤独感や不安に悩まされることがあるが、それは精神的な成長を促すサインでもある。信頼できる存在との絆を大切にし、内なる信念を育てることで困難を乗り越える強さが宿る。",
    50: "意志で切り拓く、可能性の数。方向性が定まらず迷いが生じやすいが、それは多くの可能性を秘めている証でもある。自分が本当に望むものを見極め、強い意志で一つの道を選び抜くことで運命を自らの手で変えていく力が生まれる。",
  };
  return bad[n] || "試練 — 精神力と努力で運命を切り拓く力がある数。";
}

// ===== 家庭運・社会運 =====

const HOME_UN = {
  special:  "家庭に特別な吉が宿る。パートナーとの絆は深く揺るぎなく、生涯にわたって温かく満たされた家庭が築かれる。家族との繋がりそのものが、人生の最大の力となる。",
  maxlucky: "愛情と信頼に恵まれた家庭運。温かな縁が自然と引き寄せられ、安心できる居場所が生涯守られる。家族の絆が深まるほど、人生全体の運気もさらに高まっていく。",
  great:    "明るく安定した家庭運。愛情豊かな関係が自然と育まれ、家族との時間が心の充実をもたらす。穏やかな家庭環境の中で、個人の才能も大きく開花する。",
  good:     "着実に育まれる家庭運。誠実な積み重ねが信頼を生み、温かな家族関係が根付いていく。家庭の安定が人生の土台となり、外での活動にも良い影響をもたらす。",
  trial:    "家庭運に波がある。摩擦や試練を経験することがあるが、それを乗り越えるたびに絆はより深くなる。真剣に向き合った関係こそが、やがて最も強い繋がりへと成長する。",
};

const SHAKAI_UN = {
  special:  "社会において特別な存在感を持つ。周囲から自然と信頼と尊敬を集め、重要な局面でリーダーとして期待される。その評判と影響力は、時間とともにさらに大きく広がっていく。",
  maxlucky: "社会的評価が高く、多くの人の支持を集める。誠実な働きと実績が確かな信頼となり、職場での立場が着実に強まっていく。協力者に恵まれ、大きな成果へと繋がる。",
  great:    "対外的な運気が強く、職場や社会での評判が良い。人間関係がスムーズで協力者に恵まれ、自分の実力を存分に発揮できる環境が整いやすい。",
  good:     "安定した社会運。周囲との良好な関係を積み重ねながら、着実に信頼と実績を築いていく。誠実な行動が評価され、社会の中での居場所が自然と固まっていく。",
  trial:    "社会運に試練がある。対人関係や環境の変化に苦労することがあるが、その経験が人間的な深みと真の実力を磨く。困難を乗り越えた先に、本物の評価と信頼が待っている。",
};

function renderNijiUn(result) {
  const { katei, shakai } = result;
  const chiGrade = getKakuGrade(katei);
  const gaiGrade = getKakuGrade(shakai);
  const homeText   = HOME_UN[chiGrade.cls]   ?? HOME_UN.trial;
  const shakaiText = SHAKAI_UN[gaiGrade.cls] ?? SHAKAI_UN.trial;

  const makeCard = (titleJa, value, grade, text) => `
    <div class="un-card ${grade.cls}">
      <div class="un-card-title">${titleJa}</div>
      <div class="un-card-num">${value}</div>
      <div class="un-card-badge ${grade.cls}">${grade.label}</div>
      <p class="un-card-text">${text}</p>
    </div>
  `;

  return `
    <div class="niji-un">
      ${makeCard('家庭運', katei, chiGrade, homeText)}
      ${makeCard('社会運', shakai, gaiGrade, shakaiText)}
    </div>
  `;
}

// ===== スペルパワー =====

const SP_SCORES = { special: 24, maxlucky: 20, great: 16, good: 12, tenchi: 4, trial: 0 };

const SP_RANKS = [
  { min: 96, label: "天命",   cls: "sp-legendary" },
  { min: 76, label: "覚醒",   cls: "sp-great"     },
  { min: 52, label: "吉祥",   cls: "sp-good"      },
  { min: 28, label: "修練",   cls: "sp-fair"      },
  { min:  0, label: "試練",   cls: "sp-trial"     },
];

// 格ごとのスコア上書きテーブル
const SP_SCORES_OVERRIDE = {
  so: { tenchi: 25 },
};

function calcSpellPower(kakuValues) {
  return kakuValues.reduce((sum, { key, value }) => {
    const grade    = getKakuGrade(value);
    const override = SP_SCORES_OVERRIDE[key]?.[grade.cls];
    const pts      = override !== undefined ? override : (SP_SCORES[grade.cls] ?? 0);
    return sum + pts;
  }, 0);
}

function getSpellPowerRank(score) {
  return SP_RANKS.find(r => score >= r.min) ?? SP_RANKS[SP_RANKS.length - 1];
}

function renderSpellPower(score) {
  const displayMax = 100;
  const isLimitBreak = score > displayMax;
  const pct = isLimitBreak ? Math.min(score, 128) : score;
  const rank = isLimitBreak
    ? { label: "限界突破", cls: "sp-limitbreak" }
    : getSpellPowerRank(score);

  return `
    <div class="spell-power${isLimitBreak ? ' limit-break' : ''}">
      <div class="sp-header">
        <span class="sp-label">SPELL POWER</span>
        <span class="sp-rank ${rank.cls}">${rank.label}</span>
        <span class="sp-score${isLimitBreak ? ' sp-over' : ''}">${score}<span class="sp-max"> / ${displayMax}</span></span>
      </div>
      <div class="sp-bar-track${isLimitBreak ? ' sp-track--overflow' : ''}">
        <div class="sp-bar ${rank.cls}" style="width: ${pct}%"></div>
      </div>
    </div>
  `;
}

// ===== 計算 =====

function calcTotal(str) {
  let total = 0;
  const unknown = [];
  for (const ch of str) {
    const s = getStrokes(ch);
    if (s === null) unknown.push(ch);
    else total += s;
  }
  return { total, unknown };
}

function calcFiveElements(sei, mei) {
  const tenResult = calcTotal(sei);
  const chiResult = calcTotal(mei);
  const ten = tenResult.total;
  const chi = chiResult.total;
  const so  = ten + chi;
  const jin    = (getStrokes(sei[sei.length - 1]) ?? 0) + (getStrokes(mei[0]) ?? 0);
  const gai    = (getStrokes(sei[0]) ?? 0) + (getStrokes(mei[mei.length - 1]) ?? 0);
  const katei  = (getStrokes(sei[sei.length - 1]) ?? 0) + chi;   // 苗字末字 + 地格
  const shakai = ten + (getStrokes(mei[0]) ?? 0);                // 天格 + 名前初字
  const unknowns = [...new Set([...tenResult.unknown, ...chiResult.unknown])];
  return { ten, chi, jin, gai, so, katei, shakai, unknowns };
}

function getBreakdown(str) {
  return Array.from(str).map(ch => {
    const s = getStrokes(ch);
    return s !== null ? `${ch}(${s})` : `${ch}(?)`;
  }).join(' + ');
}

// ===== HTML生成 =====

function makeKakuBox(key, value) {
  const info  = KAKU_INFO[key];
  const grade = getKakuGrade(value);
  return `
    <div class="kaku-box ${grade.cls}">
      <div class="kaku-box-label">${info.label}</div>
      <div class="kaku-box-num">${value}</div>
      <div class="kaku-box-badge ${grade.cls}">${grade.label}</div>
    </div>
  `;
}

function makeMiniBox(label, value, grade) {
  return `
    <div class="kaku-mini ${grade.cls}">
      <div class="kaku-mini-label">${label}</div>
      <div class="kaku-mini-num">${value}</div>
      <div class="kaku-mini-badge ${grade.cls}">${grade.label}</div>
    </div>
  `;
}

function renderNameChart(sei, mei, result) {
  const { ten, chi, jin, gai, so, katei, shakai } = result;
  const kateiGrade  = getKakuGrade(katei);
  const shakaiGrade = getKakuGrade(shakai);

  const seiChars = Array.from(sei).map(ch => `<span>${ch}</span>`).join('');
  const meiChars = Array.from(mei).map(ch => `<span>${ch}</span>`).join('');

  return `
    <div class="name-chart">
      <div class="nc-sei">${seiChars}<div class="nc-brace-r"></div></div>
      <div class="nc-ten">${makeKakuBox('ten', ten)}</div>
      <div class="nc-sha">${makeMiniBox('社会運', shakai, shakaiGrade)}</div>

      <div class="nc-gai">${makeKakuBox('gai', gai)}<div class="nc-brace-l"></div></div>
      <div class="nc-joint"><div class="jin-connector"></div></div>
      <div class="nc-jin">${makeKakuBox('jin', jin)}</div>

      <div class="nc-mei">${meiChars}<div class="nc-brace-r"></div></div>
      <div class="nc-chi">${makeKakuBox('chi', chi)}</div>

      <div class="nc-kat">${makeMiniBox('家庭運', katei, kateiGrade)}</div>
      <div class="nc-so">${makeKakuBox('so', so)}</div>
    </div>
  `;
}

function renderKakuDetail(sei, mei, result) {
  const { ten, chi, jin, gai, so } = result;

  const items = [
    { key: "ten", value: ten, detail: getBreakdown(sei) },
    { key: "chi", value: chi, detail: getBreakdown(mei) },
    { key: "jin", value: jin, detail: `${sei[sei.length-1]}(${getStrokes(sei[sei.length-1])??'?'}) + ${mei[0]}(${getStrokes(mei[0])??'?'})` },
    { key: "gai", value: gai, detail: `${sei[0]}(${getStrokes(sei[0])??'?'}) + ${mei[mei.length-1]}(${getStrokes(mei[mei.length-1])??'?'})` },
    { key: "so",  value: so,  detail: `天格(${ten}) + 地格(${chi})` },
  ];

  return items.map(({ key, value, detail }) => {
    const info    = KAKU_INFO[key];
    const grade   = getKakuGrade(value);
    const meaning = getReading(value);
    const lucky   = LUCKY_NUMBERS.has(value);

    return `
      <div class="kaku-card ${grade.cls}">
        <div class="kaku-card-header">
          <span class="kaku-card-label"><ruby>${info.label}<rt>${info.ruby}</rt></ruby></span>
          <span class="kaku-card-badge ${grade.cls}">${grade.label}</span>
        </div>
        <div class="kaku-card-num">${value}</div>
        <div class="kaku-card-detail">${detail}</div>
        <div class="kaku-card-desc">${info.desc}</div>
        <div class="kaku-card-meaning">${meaning}</div>
      </div>
    `;
  }).join('');
}

// X共有
function shareOnX(sei, mei, grade, result) {
  const emojis = { special: "⚡", maxlucky: "✨", great: "🌟", good: "⭐", trial: "🔥" };
  const e = emojis[grade.cls] || "✨";
  const text =
`${e} Spell 姓名判断
${sei}　${mei}　${grade.grade}

天格 ${result.ten}　地格 ${result.chi}
人格 ${result.jin}　外格 ${result.gai}
総格 ${result.so}

#Spell #姓名判断`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
}

// ===== メインレンダリング =====

function renderResult(sei, mei, result) {
  const { ten, chi, jin, gai, so, katei, shakai, unknowns } = result;
  const grade = getOverallGrade([ten, chi, jin, gai, so]);
  const spScore = calcSpellPower([
    { key:'ten',    value:ten    },
    { key:'chi',    value:chi    },
    { key:'jin',    value:jin    },
    { key:'gai',    value:gai    },
    { key:'so',     value:so     },
    { key:'katei',  value:katei  },
    { key:'shakai', value:shakai },
  ]);

  const unknownWarning = unknowns.length > 0
    ? `<div class="unknown-warning">※「${unknowns.join('・')}」の画数データが見つかりません。手動でご確認ください。</div>`
    : '';

  return `
    <div class="result-top">
      <div class="overall-badge ${grade.cls}">${grade.grade}</div>
      <div class="grade-desc">${grade.desc}</div>
    </div>
    ${renderMonster(jin)}
    ${renderSpellPower(spScore)}
    ${unknownWarning}
    ${renderNameChart(sei, mei, result)}
    <div class="share-area">
      <button class="share-btn"
        data-sei="${sei}"
        data-mei="${mei}"
        data-grade='${JSON.stringify(grade)}'
        data-result='${JSON.stringify({ten,chi,jin,gai,so})}'>
        <span class="share-icon">𝕏</span><span>結果をポスト</span>
      </button>
      <button class="save-img-btn">📷 画像を保存</button>
    </div>
    <div class="detail-divider"><span>— 五格の詳しい解説 —</span></div>
    <div class="kaku-grid">
      ${renderKakuDetail(sei, mei, result)}
    </div>
    <div class="detail-divider"><span>— 家庭運・社会運 —</span></div>
    ${renderNijiUn(result)}
  `;
}

// ===== モンスター =====

const MONSTER_MAP = {
  fire:  { file: 'monster_fire.png',  name: 'フレイム',  element: '火', color: '#e8603c' },
  water: { file: 'monster_water.png', name: 'アクア',    element: '水', color: '#4a9edd' },
  wood:  { file: 'monster_wood.png',  name: 'スプラウト', element: '木', color: '#5aad6a' },
  gold:  { file: 'monster_gold.png',  name: 'グリッター', element: '金', color: '#c9a84c' },
  earth: { file: 'monster_earth.png', name: 'テラ',      element: '土', color: '#a0784a' },
};

const JIN_TO_MONSTER = { 1:'wood', 2:'wood', 3:'fire', 4:'fire', 5:'earth', 6:'earth', 7:'gold', 8:'gold', 9:'water', 0:'water' };

function getMonster(jinValue) {
  const key = JIN_TO_MONSTER[jinValue % 10];
  return MONSTER_MAP[key];
}

function renderMonster(jinValue) {
  const m = getMonster(jinValue);
  return `
    <div class="monster-section">
      <p class="monster-label">— あなたのスペルモンスター —</p>
      <div class="monster-card" style="--m-color: ${m.color}">
        <img src="monsters/${m.file}" alt="${m.name}" class="monster-img">
        <div class="monster-info">
          <span class="monster-element">${m.element}</span>
          <span class="monster-name">${m.name}</span>
        </div>
      </div>
    </div>
  `;
}

// ===== キラン演出 =====
function playKiran(container) {
  const wrap = document.createElement('div');
  wrap.className = 'kiran-wrap';

  // 中心閃光
  const core = document.createElement('div');
  core.className = 'kiran-core';
  wrap.appendChild(core);

  // 十字＋斜め光
  ['h','v','d1','d2'].forEach(cls => {
    const ray = document.createElement('div');
    ray.className = `kiran-ray ${cls}`;
    wrap.appendChild(ray);
  });

  // 散らばる粒子（8方向）
  const colors = ['#ffffff','#e8c97a','#fffacd','#d44040','#e8c97a'];
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * 360;
    const dist  = 80 + Math.random() * 80;
    const tx    = `translate(${Math.cos(angle * Math.PI/180) * dist}px, ${Math.sin(angle * Math.PI/180) * dist}px) scale(0)`;
    const sp = document.createElement('div');
    sp.className = 'kiran-spark';
    sp.style.cssText = `
      --tx: ${tx};
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 0.1}s;
      animation-duration: ${0.6 + Math.random() * 0.3}s;
      box-shadow: 0 0 6px currentColor;
    `;
    wrap.appendChild(sp);
  }

  container.style.position = 'relative';
  container.appendChild(wrap);

  // アニメ終了後に削除
  setTimeout(() => wrap.remove(), 900);
}

// ===== 魔法エフェクト =====
function initMagicEffects() {
  // 浮遊パーティクル（軽量化：6個に削減）
  const colors = ['#e8c97a','#c9a84c','#ffffff'];
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.className = 'magic-particle';
    const size = 2 + Math.random() * 2;
    p.style.cssText = `
      left:${Math.random() * 100}vw;
      bottom:0;
      width:${size}px;
      height:${size}px;
      background:${colors[i % colors.length]};
      animation-duration:${10 + Math.random() * 8}s;
      animation-delay:${i * 2}s;
    `;
    document.body.appendChild(p);
  }

  // きらめく星（軽量化：8個に削減）
  for (let i = 0; i < 8; i++) {
    const s = document.createElement('div');
    s.className = 'magic-star';
    const size = 1.5 + Math.random() * 1.5;
    s.style.cssText = `
      left:${Math.random() * 100}vw;
      top:${10 + Math.random() * 80}vh;
      width:${size}px;
      height:${size}px;
      background:${i % 2 === 0 ? '#e8c97a' : '#ffffff'};
      animation-duration:${3 + Math.random() * 3}s;
      animation-delay:${i * 0.8}s;
    `;
    document.body.appendChild(s);
  }
}

// ===== フォーム =====
document.addEventListener('DOMContentLoaded', () => {
  initMagicEffects();
  const form       = document.getElementById('spell-form');
  const resultArea = document.getElementById('result-area');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const sei = document.getElementById('sei').value.trim();
    const mei = document.getElementById('mei').value.trim();
    if (!sei || !mei) return;

    const result = calcFiveElements(sei, mei);
    resultArea.innerHTML = renderResult(sei, mei, result);
    resultArea.classList.add('visible');
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // キラン演出（チャート展開と同時）
    const chart = resultArea.querySelector('.name-chart');
    if (chart) setTimeout(() => playKiran(chart), 80);

    resultArea.querySelector('.share-btn').addEventListener('click', (e) => {
      const btn = e.currentTarget;
      shareOnX(
        btn.dataset.sei,
        btn.dataset.mei,
        JSON.parse(btn.dataset.grade),
        JSON.parse(btn.dataset.result)
      );
    });

    resultArea.querySelector('.save-img-btn').addEventListener('click', () => {
      html2canvas(resultArea, { backgroundColor: '#07070f', scale: 2, useCORS: true, allowTaint: true }).then(canvas => {
        const a = document.createElement('a');
        a.download = 'spell-result.png';
        a.href = canvas.toDataURL('image/png');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }).catch(err => console.error('html2canvas error:', err));
    });
  });
});
