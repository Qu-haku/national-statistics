export const sections = [
  ['/', 'Overview'], ['/population', 'Population'], ['/economy', 'Economy'],
  ['/prices', 'Prices'], ['/labor', 'Labour'], ['/fiscal', 'Public Finance'],
  ['/explore', 'Explore'], ['/about', 'Sources & Guide'],
];

export const sources = {
  census: 'Statistics Bureau of Japan, Population Census',
  estimates: 'Statistics Bureau of Japan, Population Estimates',
  vital: 'Ministry of Health, Labour and Welfare, Vital Statistics',
  gdp: 'Cabinet Office, National Accounts',
  profits: 'Ministry of Finance, Financial Statements Statistics of Corporations by Industry (Reiwa 6)',
  cpi: 'Statistics Bureau of Japan, Consumer Price Index',
  labor: 'Statistics Bureau of Japan, Labour Force Survey',
  jobs: 'Ministry of Health, Labour and Welfare, Employment Referrals for General Workers',
  union: 'Japanese Trade Union Confederation (RENGO), Spring Wage Negotiation Results',
  budget: 'Ministry of Finance, Initial General Account Budget',
  estat: 'e-Stat, Portal Site of Official Statistics of Japan',
};

const record = (field, name, value, unit, year, source, note = '') =>
  ({ field, name, value, unit, year, source, note });

const inTrillions = (whole, hundredMillions) => whole + '.' + hundredMillions.replace(',', '');

export const figures = {
  population: record('population', 'Total population', '122,972,528', 'people', '2025', 'census', '−3,173,571 people (−2.5%) vs. 2020'),
  population2020: record('population', 'Total population', '126,146,099', 'people', '2020', 'census'),
  men: record('population', 'Male population', '59,772', 'thousand people', '2025', 'census'),
  women: record('population', 'Female population', '63,200', 'thousand people', '2025', 'census'),
  children: record('population', 'Ages 0–14', 10.9, '%', '2025', 'census'),
  workingAge: record('population', 'Ages 15–64', 59.8, '%', '2025', 'census'),
  older: record('population', 'Ages 65 and over', 29.4, '%', '2025', 'census'),
  foreign: record('population', 'Foreign residents', '3,840', 'thousand people', '2025', 'census', '3.1% of the total population'),
  households: record('population', 'Total households', '57,324,619', 'households', '2025', 'census', '+2.7% vs. 2020'),
  births: record('population', 'Births', '686,173', 'people', '2024', 'vital', 'Final figures for Japanese nationals in Japan'),
  deaths: record('population', 'Deaths', '1,605,378', 'people', '2024', 'vital', 'Final figures for Japanese nationals in Japan'),
  fertility: record('population', 'Total fertility rate', '1.15', 'children per woman', '2024', 'vital'),
  ibaraki: record('population', 'Ibaraki population', '2,789,856', 'people', '2025', 'census'),
  gdp: record('economy', 'Nominal GDP', '≈637', 'trillion yen', '2024 calendar year', 'gdp', '+3.3% year on year. 2020 benchmark. Published 2026-11'),
  gdp2019: record('economy', 'Nominal GDP', '≈572', 'trillion yen', '2019 calendar year', 'gdp'),
  real: record('economy', 'Real GDP growth', '+0.1', '%', '2024 calendar year', 'gdp'),
  realFiscal: record('economy', 'Real GDP growth', '+0.7', '%', 'FY 2024', 'gdp'),
  consumption: record('economy', 'Nominal private consumption', '336.6', 'trillion yen', '2024 calendar year', 'gdp', '+1.9% year on year'),
  profits: record('economy', 'Corporate ordinary profits', '114.7', 'trillion yen', 'FY 2024', 'profits', 'All industries except finance and insurance. +7.5% vs. the prior fiscal year, a record at publication'),
  inflation: record('prices', 'CPI change', '+2.7', '%', '2024 annual average', 'cpi'),
  total: record('prices', 'All items', '+3.0', '%', 'FY 2024', 'cpi'),
  cereals: record('prices', 'Cereals', '+12.4', '%', 'FY 2024', 'cpi'),
  energy: record('prices', 'Energy', '+7.3', '%', 'FY 2024', 'cpi'),
  core: record('prices', 'All items less fresh food', '+2.7', '%', 'FY 2024', 'cpi'),
  unemployment2023: record('labor', 'Unemployment rate', '2.6', '%', '2023 annual average', 'labor'),
  jobs2023: record('labor', 'Job openings-to-applicants ratio', '1.29', '×', 'FY 2023 average', 'jobs'),
  unemployment: record('labor', 'Unemployment rate', '2.5', '%', '2024 annual average', 'labor'),
  jobs: record('labor', 'Job openings-to-applicants ratio', '1.25', '×', 'FY 2024 average', 'jobs'),
  wage: record('labor', 'Spring wage increase', '5.25', '%', '2025', 'union'),
  budget: record('fiscal', 'General account expenditure', inTrillions('115', '1,978'), 'trillion yen', 'FY 2025', 'budget', 'Largest initial budget on record'),
  budget2024: record('fiscal', 'General account expenditure', inTrillions('112', '5,717'), 'trillion yen', 'FY 2024', 'budget'),
  social: record('fiscal', 'Social security', '≈38.3', 'trillion yen', 'FY 2025', 'budget'),
};

export const censusReferenceDate = '2025-10-01';
export const censusRelease = '2025 Population Census, Basic Complete Tabulation on Population and Households (final)';
export const censusDate = censusReferenceDate+' · '+censusRelease+' · Published 2026-09-29';
export const censusOutline = 'https://www.stat.go.jp/data/kokusei/2025/kekka/pdf/outline_01.pdf';
export const populationBrief = ('1' + '2,297').replace(',', ''); // Population in ten-thousands, rounded.

// Statistics Bureau of Japan, 2025 Census (published 2026), Table II−1−1.
// The 1945 observation is from a population survey. Counts are in people, scaled on display.
export const populationTrendTable = 'Table II−1−1 (population by age)';
export const populationTrendScope = {
  1940: 'excludes some foreign nationals',
  1945: 'population survey excluding Okinawa Prefecture',
};
export const populationTrend = [
  [1920,55963053], [1925,59736822], [1930,64450005], [1935,69254148],
  [1940,73075071], [1945,71998104], [1950,84114574], [1955,90076594],
  [1960,94301623], [1965,99209137], [1970,104665171], [1975,111939643],
  [1980,117060396], [1985,121048923], [1990,123611167], [1995,125570246],
  [2000,126925843], [2005,127767994], [2010,128057352], [2015,127094745],
  [2020,126146099], [2025,122972528],
];
export const populationPeak = record('population', 'Peak total population', '128,084', 'thousand people', '2008', 'estimates');

// Same release (published 2026), Table II−1−1. Year and population ages 0–14, 15–64 and 65+.
// Unknown ages are imputed from 2015 onwards. Remaining unknown ages are excluded from shares.
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

// Same release (published 2026), Tables I−1−1, I−5−1, IV−1−1, V−1−1 and V−2−1.
// 2025 count, 2020 count, unit and share denominator. Unknown household types and nationality are imputed.
export const populationBreakdown = [
  ['Total population',122972528,126146099,'people',122972528],
  ['Male population',59772092,61349581,'people',122972528],
  ['Female population',63200436,64796518,'people',122972528],
  ['Foreign residents',3840039,2746514,'people',122972528],
  ['Total households',57324619,55830154,'households',57324619],
  ['Private households',57181619,55704949,'households',57324619],
  ['One-person households',23689024,21151042,'households',57181619],
  ['Nuclear-family households',29897747,30242185,'households',57181619],
  ['One-person households, age 65+',8152593,7205292,'households',57181619],
  ['People per private household',119837159 / 57181619,123162995 / 55704949,'people',null],
];

// Cabinet Office, National Accounts, 2026 July–September quarter (months 7–9), 1st preliminary estimate (published 2026-11-16).
// Time Series Table 1, real and nominal calendar years. 2020 benchmark. Units of 10 hundred million yen.
export const gdpRelease = 'Cabinet Office, National Accounts, Quarterly Estimates of GDP (published 2026-11-16, 2020 benchmark)';
export const gdpOutline = 'https://www.esri.cao.go.jp/jp/sna/data/data_list/sokuhou/files/2026/qe263/pdf/jikei_1.pdf';
export const gdpTrend = [
  [2015,548866.7,562904.4], [2016,555970.6,566872.8], [2017,565119.0,576075.7],
  [2018,569153.5,580881.0], [2019,571838.0,579089.0], [2020,554074.4,554285.0],
  [2021,573687.7,574163.7], [2022,584501.3,581290.7], [2023,616659.4,586498.2],
  [2024,636893.3,586884.0],
];

// Same release (published 2026), Time Series Table 1, nominal calendar years 2024 and 2023 (units of 10 hundred million yen).
export const gdpDemand = [
  ['Private final consumption',336602.0,330179.7],
  ['Private non-residential investment',119597.3,114424.8],
  ['Government final consumption',127758.3,123789.5],
  ['Public fixed capital formation',31569.1,30964.3],
  ['Net exports',-5139.2,-9095.5],
];

export const budgetBreakdown = [
  figures.social,
  ...[['Debt service', '≈28.2'], ['Local allocation tax grants, etc.', '≈18.9'], ['Defence', '≈8.7'],
    ['Public works', '≈6.1'], ['Education and science', '≈5.7']]
    .map(([name, value]) => record('fiscal', name, value, 'trillion yen', 'FY 2025', 'budget')),
];
export const budgetTrend = [[2024,112.6],[2025,115.2]];
export const cpiTrend = [[2020,100.0,null],[2021,99.8,-0.2],[2022,102.3,2.5],
  [2023,105.6,3.2],[2024,108.5,2.7]];
export const cpiBase = '2020 = 100';
export const onlyTokyo = 'Tokyo was the only prefecture whose population grew between the 2020 and 2025 censuses.';

export const prefectures = [
  ['Hokkaido',5224614],['Aomori',1237984],['Iwate',1210534],['Miyagi',2301996],
  ['Akita',959502],['Yamagata',1068027],['Fukushima',1833152],['Ibaraki',2867009],
  ['Tochigi',1933146],['Gunma',1939110],['Saitama',7344765],['Chiba',6284480],
  ['Tokyo',14047594],['Kanagawa',9237337],['Niigata',2201272],['Toyama',1034814],
  ['Ishikawa',1132526],['Fukui',766863],['Yamanashi',809974],['Nagano',2048011],
  ['Gifu',1978742],['Shizuoka',3633202],['Aichi',7542415],['Mie',1770254],
  ['Shiga',1413610],['Kyoto',2578087],['Osaka',8837685],['Hyogo',5465002],
  ['Nara',1324473],['Wakayama',922584],['Tottori',553407],['Shimane',671126],
  ['Okayama',1888432],['Hiroshima',2799702],['Yamaguchi',1342059],['Tokushima',719559],
  ['Kagawa',950244],['Ehime',1334841],['Kochi',691527],['Fukuoka',5135214],
  ['Saga',811442],['Nagasaki',1312317],['Kumamoto',1738301],['Oita',1123852],
  ['Miyazaki',1069576],['Kagoshima',1588256],['Okinawa',1467480]
].sort((a,b) => b[1] - a[1]);

export const prefectureYear = '2020';
export const format = (value) => new Intl.NumberFormat('en-US').format(value);
export const sign = (n) => (n > 0 ? '+' : n < 0 ? '−' : '') + Math.abs(n).toFixed(1);
export const indicatorIndex = [
  ...Object.values(figures),
  ...budgetBreakdown.slice(1),
  ...populationTrend.map(([year,value]) => record('population','Total population (long-term series)',format(value),'people',String(year),'census',
    [populationTrendTable, populationTrendScope[year]].filter(Boolean).join('. '))),
  populationPeak,
  ...cpiTrend.map(([year,value,change]) => record('prices','Consumer Price Index',value.toFixed(1),'index points',year+' annual average','cpi',
    cpiBase + (change === null ? '' : ' · Year on year '+sign(change)+'%'))),
  ...prefectures.map(([name,value]) => record('population',name+' population',format(value),'people',prefectureYear,'census')),
];

export const topics = [
  ['/population', 'Population', 'What the census found', 'Population fell as the number of households rose.', '2025 · '+sources.census],
  ['/economy', 'Economy', 'Nominal GDP passes ¥600 trillion', 'Private final consumption was the largest expenditure component shown.', '2024 · '+sources.gdp],
  ['/prices', 'Prices', 'Prices rose more than 2% for 3 years running', 'The all-items index reached '+cpiTrend.at(-1)[1].toFixed(1)+'. Price changes varied across categories.', '2024 · '+sources.cpi],
];

export const sourcePages = [
  ['census','https://www.stat.go.jp/data/kokusei/','Population, households and prefecture populations'],
  ['census',censusOutline,'Population, age and households in the 2025 census (published in 2026)'],
  ['estimates','https://www.stat.go.jp/data/jinsui/','Population trends between censuses'],
  ['cpi','https://www.stat.go.jp/data/cpi/','All-items index and component indexes'],
  ['labor','https://www.stat.go.jp/data/roudou/','Employment and unemployment'],
  ['gdp',gdpOutline,'Nominal and real GDP and expenditure components (published 2026-11)'],
  ['profits','https://www.mof.go.jp/pri/reference/ssc/results/r6.pdf','Corporate ordinary profits (FY 2024, all industries except finance and insurance)'],
  ['vital','https://www.mhlw.go.jp/toukei/list/81-1.html','Births, deaths and fertility'],
  ['jobs','https://www.mhlw.go.jp/stf/newpage_57261.html','Job openings and applicants at public employment offices'],
  ['union','https://www.jtuc-rengo.or.jp/activity/roudou/shuntou/','Wage settlement results'],
  ['budget','https://www.mof.go.jp/policy/budget/budger_workflow/budget/fy2025/0003.pdf','General account budget'],
  ['estat','https://www.e-stat.go.jp/','Search statistical tables across government agencies'],
];
