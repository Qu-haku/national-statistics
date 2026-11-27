export const sections = [
  ['/', '日本のいま'], ['/population', '人口'], ['/economy', '経済'],
  ['/prices', '物価'], ['/labor', '労働'], ['/fiscal', '財政'],
  ['/explore', '探す・比べる'], ['/about', '出典と使い方'],
];

export const sources = {
  census: '総務省統計局「国勢調査」',
  estimates: '総務省統計局「人口推計」',
  vital: '厚生労働省「人口動態統計」',
  gdp: '内閣府「国民経済計算」',
  profits: '財務省「年次別法人企業統計調査（令和6年度）」',
  cpi: '総務省統計局「消費者物価指数」',
  labor: '総務省統計局「労働力調査」',
  jobs: '厚生労働省「一般職業紹介状況」',
  union: '日本労働組合総連合会「春季生活闘争 回答集計」',
  budget: '財務省「一般会計当初予算」',
  estat: '政府統計の総合窓口「e-Stat」',
};

const record = (field, name, value, unit, year, source, note = '') =>
  ({ field, name, value, unit, year, source, note });

export const figures = {
  population: record('population', '総人口', '122,972,528', '人', '2025年', 'census', '2020年比 −3,173,571人（−2.5%）'),
  population2020: record('population', '総人口', '126,146,099', '人', '2020年', 'census'),
  men: record('population', '男性人口', '59,772', '千人', '2025年', 'census'),
  women: record('population', '女性人口', '63,200', '千人', '2025年', 'census'),
  children: record('population', '0〜14歳人口割合', 10.9, '%', '2025年', 'census'),
  workingAge: record('population', '15〜64歳人口割合', 59.8, '%', '2025年', 'census'),
  older: record('population', '65歳以上人口割合', 29.4, '%', '2025年', 'census'),
  foreign: record('population', '外国人人口', '3,840', '千人', '2025年', 'census', '総人口の3.1%'),
  households: record('population', '世帯数', '57,324,619', '世帯', '2025年', 'census', '2020年比 +2.7%'),
  births: record('population', '出生数', '686,173', '人', '2024年', 'vital', '確定数・日本における日本人'),
  deaths: record('population', '死亡数', '1,605,378', '人', '2024年', 'vital', '確定数・日本における日本人'),
  fertility: record('population', '合計特殊出生率', '1.15', '（比率）', '2024年', 'vital'),
  ibaraki: record('population', '茨城県の人口', '2,789,856', '人', '2025年', 'census'),
  gdp: record('economy', '名目GDP', '約637', '兆円', '2024年（暦年）', 'gdp', '前年比 +3.3%・2020年基準・2026年11月公表'),
  gdp2019: record('economy', '名目GDP', '約572', '兆円', '2019年（暦年）', 'gdp'),
  real: record('economy', '実質GDP成長率', '+0.1', '%', '2024年（暦年）', 'gdp'),
  realFiscal: record('economy', '実質GDP成長率', '+0.7', '%', '2024年度', 'gdp'),
  consumption: record('economy', '名目個人消費', '336.6', '兆円', '2024年（暦年）', 'gdp', '前年比 +1.9%'),
  profits: record('economy', '企業経常利益', '114.7', '兆円', '2024年度', 'profits', '金融・保険業を除く全産業。前年度比 +7.5%（公表時点で過去最高）'),
  inflation: record('prices', '消費者物価指数（前年比）', '+2.7', '%', '2024年平均', 'cpi'),
  total: record('prices', '総合', '+3.0', '%', '2024年度', 'cpi'),
  cereals: record('prices', '穀類', '+12.4', '%', '2024年度', 'cpi'),
  energy: record('prices', 'エネルギー', '+7.3', '%', '2024年度', 'cpi'),
  core: record('prices', '生鮮食品を除く総合', '+2.7', '%', '2024年度', 'cpi'),
  unemployment2023: record('labor', '完全失業率', '2.6', '%', '2023年平均', 'labor'),
  jobs2023: record('labor', '有効求人倍率', '1.29', '倍', '2023年度平均', 'jobs'),
  unemployment: record('labor', '完全失業率', '2.5', '%', '2024年平均', 'labor'),
  jobs: record('labor', '有効求人倍率', '1.25', '倍', '2024年度平均', 'jobs'),
  wage: record('labor', '春闘賃上げ率', '5.25', '%', '2025年', 'union'),
  budget: record('fiscal', '一般会計歳出', '115兆1,978', '億円', '2025年度', 'budget', '当初予算として過去最大'),
  budget2024: record('fiscal', '一般会計歳出', '112兆5,717', '億円', '2024年度', 'budget'),
  social: record('fiscal', '社会保障関係費', '約38.3', '兆円', '2025年度', 'budget'),
};

export const censusReferenceDate = '2025年10月1日';
export const censusRelease = '2025年国勢調査 人口等基本集計（確報）';
export const censusDate = censusReferenceDate+'現在 ／ '+censusRelease+' ／ 2026年9月29日公表';
export const censusOutline = 'https://www.stat.go.jp/data/kokusei/2025/kekka/pdf/outline_01.pdf';
export const populationBrief = '1億2,297';

// 総務省統計局「2025年国勢調査 人口等基本集計」（2026年公表）表Ⅱ−1−1。
// 1945年は人口調査。総人口は人単位。作図時に万人へ換算する。
export const populationTrendTable = '表Ⅱ−1−1（年齢別人口表）';
export const populationTrendScope = {
  1940: '一部の外国人を除く',
  1945: '人口調査（沖縄県を含まない）',
};
export const populationTrend = [
  [1920,55963053], [1925,59736822], [1930,64450005], [1935,69254148],
  [1940,73075071], [1945,71998104], [1950,84114574], [1955,90076594],
  [1960,94301623], [1965,99209137], [1970,104665171], [1975,111939643],
  [1980,117060396], [1985,121048923], [1990,123611167], [1995,125570246],
  [2000,126925843], [2005,127767994], [2010,128057352], [2015,127094745],
  [2020,126146099], [2025,122972528],
];
export const populationPeak = record('population', '総人口のピーク', '128,084', '千人', '2008年', 'estimates');

// 同集計（2026年公表）表Ⅱ−1−1。年、0〜14歳、15〜64歳、65歳以上（人）。
// 2015年以降は不詳補完値。残る年齢不詳は構成比の分母から除く。
export const ageTrend = [
  [1950,29786412,50168312,4155180], [1955,30122897,55166615,4786199],
  [1960,28434159,60469355,5397980], [1965,25529230,67444242,6235614],
  [1970,25152779,72119100,7393292], [1975,27220692,75807317,8865429],
  [1980,27507078,78834599,10647356], [1985,26033218,82506016,12468343],
  [1990,22486239,85903976,14894595], [1995,20013730,87164721,18260822],
  [2000,18472499,86219631,22005152], [2005,17521234,84092414,25672005],
  [2010,16803444,81031800,29245685], [2015,15950642,77354097,33790006],
  [2020,15027298,75149323,35968868], [2025,13349001,73480843,36141613],
];

// 同集計（2026年公表）表Ⅰ−1−1・Ⅰ−5−1・Ⅳ−1−1・Ⅴ−1−1・Ⅴ−2−1。
// 2025年実数、2020年実数、単位、構成比の分母。世帯類型・外国人は不詳補完値。
export const populationBreakdown = [
  ['総人口',122972528,126146099,'人',122972528],
  ['男性人口',59772092,61349581,'人',122972528],
  ['女性人口',63200436,64796518,'人',122972528],
  ['外国人人口',3840039,2746514,'人',122972528],
  ['総世帯数',57324619,55830154,'世帯',57324619],
  ['一般世帯',57181619,55704949,'世帯',57324619],
  ['単独世帯',23689024,21151042,'世帯',57181619],
  ['核家族世帯',29897747,30242185,'世帯',57181619],
  ['65歳以上単身世帯',8152593,7205292,'世帯',57181619],
  ['一般世帯あたり人員',119837159 / 57181619,123162995 / 55704949,'人',null],
];

// 内閣府「国民経済計算」2026年7–9月期1次速報（2026年11月16日公表）
// 時系列表1「実質暦年」「名目暦年」。2020年基準。単位は10億円。
export const gdpRelease = '内閣府「国民経済計算」四半期別GDP速報（2026年11月16日公表、2020年基準）';
export const gdpOutline = 'https://www.esri.cao.go.jp/jp/sna/data/data_list/sokuhou/files/2026/qe263/pdf/jikei_1.pdf';
export const gdpTrend = [
  [2015,548866.7,562904.4], [2016,555970.6,566872.8], [2017,565119.0,576075.7],
  [2018,569153.5,580881.0], [2019,571838.0,579089.0], [2020,554074.4,554285.0],
  [2021,573687.7,574163.7], [2022,584501.3,581290.7], [2023,616659.4,586498.2],
  [2024,636893.3,586884.0],
];

// 同速報（2026年公表）時系列表1「名目暦年」。2024年、2023年（10億円）。
export const gdpDemand = [
  ['民間最終消費支出',336602.0,330179.7],
  ['民間企業設備',119597.3,114424.8],
  ['政府最終消費支出',127758.3,123789.5],
  ['公的固定資本形成',31569.1,30964.3],
  ['純輸出',-5139.2,-9095.5],
];

export const budgetBreakdown = [
  figures.social,
  ...[['国債費', '約28.2'], ['地方交付税交付金等', '約18.9'], ['防衛関係費', '約8.7'],
    ['公共事業関係費', '約6.1'], ['文教及び科学振興費', '約5.7']]
    .map(([name, value]) => record('fiscal', name, value, '兆円', '2025年度', 'budget')),
];
export const budgetTrend = [[2024,112.6],[2025,115.2]];
export const cpiTrend = [[2020,100.0,null],[2021,99.8,-0.2],[2022,102.3,2.5],
  [2023,105.6,3.2],[2024,108.5,2.7]];
export const cpiBase = '2020年＝100';
export const onlyTokyo = '2025年国勢調査で2020年より人口が増加した都道府県は東京都のみ。';

export const prefectures = [
  ['北海道',5224614],['青森県',1237984],['岩手県',1210534],['宮城県',2301996],
  ['秋田県',959502],['山形県',1068027],['福島県',1833152],['茨城県',2867009],
  ['栃木県',1933146],['群馬県',1939110],['埼玉県',7344765],['千葉県',6284480],
  ['東京都',14047594],['神奈川県',9237337],['新潟県',2201272],['富山県',1034814],
  ['石川県',1132526],['福井県',766863],['山梨県',809974],['長野県',2048011],
  ['岐阜県',1978742],['静岡県',3633202],['愛知県',7542415],['三重県',1770254],
  ['滋賀県',1413610],['京都府',2578087],['大阪府',8837685],['兵庫県',5465002],
  ['奈良県',1324473],['和歌山県',922584],['鳥取県',553407],['島根県',671126],
  ['岡山県',1888432],['広島県',2799702],['山口県',1342059],['徳島県',719559],
  ['香川県',950244],['愛媛県',1334841],['高知県',691527],['福岡県',5135214],
  ['佐賀県',811442],['長崎県',1312317],['熊本県',1738301],['大分県',1123852],
  ['宮崎県',1069576],['鹿児島県',1588256],['沖縄県',1467480]
].sort((a,b) => b[1] - a[1]);

export const prefectureYear = '2020年';
export const format = (value) => new Intl.NumberFormat('ja-JP').format(value);
export const sign = (n) => (n > 0 ? '+' : n < 0 ? '−' : '') + Math.abs(n).toFixed(1);
export const indicatorIndex = [
  ...Object.values(figures),
  ...budgetBreakdown.slice(1),
  ...populationTrend.map(([year,value]) => record('population','総人口（長期推移）',format(value),'人',year+'年','census',
    [populationTrendTable, populationTrendScope[year]].filter(Boolean).join('。'))),
  populationPeak,
  ...cpiTrend.map(([year,value,change]) => record('prices','消費者物価指数',value.toFixed(1),'（指数）',year+'年平均','cpi',
    cpiBase + (change === null ? '' : ' ／ 前年比 '+sign(change)+'%'))),
  ...prefectures.map(([name,value]) => record('population',name+'の人口',format(value),'人',prefectureYear,'census')),
];

export const topics = [
  ['/population', '人口', censusRelease, populationBrief+'万人。人口減少と世帯増加が同時に進む。', '2025年 ／ '+sources.census],
  ['/economy', '経済', '名目GDPが600兆円を超える', figures.gdp.value+'兆円。家計の消費と実質成長率も読む。', '2024年 ／ '+sources.gdp],
  ['/prices', '物価', '物価は3年連続で2%超の上昇', '総合指数は'+cpiTrend.at(-1)[1].toFixed(1)+'。品目による動きの違いを見る。', '2024年 ／ '+sources.cpi],
];

export const sourcePages = [
  ['census','https://www.stat.go.jp/data/kokusei/','人口・世帯・都道府県人口'],
  ['census',censusOutline,'2025年国勢調査の人口・年齢・世帯（2026年公表）'],
  ['estimates','https://www.stat.go.jp/data/jinsui/','国勢調査の間の人口推移'],
  ['cpi','https://www.stat.go.jp/data/cpi/','総合指数・品目別指数'],
  ['labor','https://www.stat.go.jp/data/roudou/','就業・失業の状況'],
  ['gdp',gdpOutline,'名目・実質GDPと需要項目（2026年11月公表）'],
  ['profits','https://www.mof.go.jp/pri/reference/ssc/results/r6.pdf','企業経常利益（2024年度、金融・保険業を除く全産業）'],
  ['vital','https://www.mhlw.go.jp/toukei/list/81-1.html','出生・死亡・出生率'],
  ['jobs','https://www.mhlw.go.jp/stf/newpage_57261.html','公共職業安定所の求人・求職'],
  ['union','https://www.jtuc-rengo.or.jp/activity/roudou/shuntou/','賃上げの回答集計'],
  ['budget','https://www.mof.go.jp/policy/budget/budger_workflow/budget/fy2025/0003.pdf','一般会計予算'],
  ['estat','https://www.e-stat.go.jp/','各府省の統計表を横断検索'],
];
