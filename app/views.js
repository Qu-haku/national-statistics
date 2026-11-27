import {
  sections, sources, figures as f, censusDate, censusReferenceDate, populationBrief, populationTrend, ageTrend, populationBreakdown, censusRelease, censusOutline,
  populationTrendTable, populationTrendScope, populationPeak,
  gdpTrend, gdpDemand, gdpRelease, gdpOutline, cpiTrend, cpiBase, budgetBreakdown, budgetTrend, prefectures, prefectureYear, onlyTokyo,
  indicatorIndex, sourcePages, topics, format, sign,
} from './data.js';
import { line, ageComposition, bars, donut } from './charts.js';

const value = item => item.value + '<span class="unit">' + item.unit + '</span>';
const source = item => item.year + ' · ' + sources[item.source];
const note = text => `<p class="source">${text}</p>`;
const heading = (n,title,lead,aside) => `<header class="page-heading">
  <div class="running"><span>${n === 0 ? 'Overview' : `Chapter ${n}`}</span><span>THE JAPAN ALMANAC</span></div>
  <div class="title-row"><div><h1>${title}</h1><p>${lead}</p></div>${aside ? `<p class="heading-aside">${aside}</p>` : ''}</div>
</header>`;
const section = (n,title,aside='') => `<div class="section-head"><h2>${n ? `<span>${n}</span>` : ''}${title}</h2>${aside ? `<span class="section-aside">${aside}</span>` : ''}</div>`;
const stat = item => `<div class="stat">
  <div class="stat-label">${item.name}</div><strong class="stat-value">${value(item)}</strong>
  ${note(source(item))}${item.note ? `<p class="stat-note">${item.note}</p>` : ''}
</div>`;
const strip = (...items) => `<div class="stat-strip">${items.map(stat).join('')}</div>`;
const legend = (label, extra='', tone='accent') => `<div class="legend"><span>${label}</span>${extra ? `<span class="legend-${tone}">${extra}</span>` : ''}</div>`;
const table = (headers, rows, cls='') => `<table class="${cls}"><thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell,i) => i ? `<td>${cell}</td>` : `<th scope="row">${cell}</th>`).join('')}</tr>`).join('')}</tbody></table>`;

export function home() {
  const [, foreignCurrent, foreignPrevious] = populationBreakdown.find(([label]) => label === f.foreign.name);
  const [, , cpiChange] = cpiTrend.at(-1);
  const [, , previousCpiChange] = cpiTrend.at(-2);
  const percentChange = (current, previous) => sign((current / previous - 1) * 100) + '%';
  const sinceCensus = delta => `${delta} vs. the ${f.population2020.year} census`;
  const kpis = [
    { ...f.population, year: censusReferenceDate, note: f.population.note },
    { ...f.gdp, note: percentChange(gdpTrend.at(-1)[1], gdpTrend.at(-2)[1]) + ' year on year' },
    { ...f.inflation, note: sign(cpiChange - previousCpiChange) + ' percentage points vs. prior year’s change' },
    { ...f.unemployment, note: sign(f.unemployment.value - f.unemployment2023.value) + ' percentage points vs. ' + f.unemployment2023.year },
    { ...f.foreign, value: format(foreignCurrent), unit: f.population.unit, year: censusReferenceDate,
      note: sinceCensus(percentChange(foreignCurrent, foreignPrevious)) },
    { ...f.households, year: censusReferenceDate, note: f.households.note },
  ];
  const descriptions = ['Census and vital statistics', 'GDP and household spending', 'Consumer prices by category',
    'Employment, job openings and wages', 'The national general account budget',
    'Indicator search and prefecture comparisons', 'Official publications and how to read the figures'];
  const coverage = [
    `${sections.length} pages`,
    `${prefectures.length} prefectures`,
    `Series from ${populationTrend[0][0]}`,
    'Every figure sourced &amp; dated',
  ];
  return `${heading(0, 'Japan in Numbers', 'An almanac of Japan’s population, economy and daily life, compiled from public statistics.')}
    <ul class="coverage" aria-label="Data coverage">${coverage.map(item => `<li>${item}</li>`).join('')}</ul>
    <div class="stat-strip kpi-band">${kpis.map(stat).join('')}</div>
    <div class="editorial-grid">
      <section class="chart-panel">
        ${section('Figure 1', 'Population over time', '1920–2025')}
        ${legend('Total population, every five years')}
        ${line({points:populationTrend.map(([year, count]) => [year, count / 1_000_000]),
          ticks:[0,30,60,90,120,150],yearStep:10,unit:'million people',
          label:'Total population from 1920 to 2025, with 22 observations at five-year intervals.'})}
        ${note(`Source: Statistics Bureau of Japan, <a href="${censusOutline}">${censusRelease}</a> (published in 2026, ${populationTrendTable}). The 1940 count ${populationTrendScope[1940]}. The 1945 count is from a ${populationTrendScope[1945]}. The bureau’s Population Estimates series peaked in ${populationPeak.year} at ${populationPeak.value} ${populationPeak.unit}.`)}
      </section>
      <aside class="topics">
        ${section('', 'Statistical Briefs')}
        ${topics.map(([href,tag,title,summary,ref], i) => `<a href="#${href}" class="topic"><span class="tag">${tag}</span><span class="arrow" aria-hidden="true">↗</span>
          <h3>${title}</h3><p>${i === 0 ? `About ${(populationBrief / 100).toFixed(2)} million people. ` : ''}${summary}</p>${note(ref)}</a>`).join('')}
      </aside>
    </div>
    <section class="block">${section('','Browse the Almanac')}
      <div class="index-grid">${sections.slice(1).map(([route,name],i) => `<a href="#${route}"><span>${i+1}</span><strong>${name}</strong><small>${descriptions[i]}</small><span aria-hidden="true">↗</span></a>`).join('')}</div>
    </section>`;
}

export function prefectureRows(query = '', ascending = false) {
  const term = query.normalize('NFKC').trim().toLowerCase();
  const rows = prefectures.map(([name,pop],i) => ({ name, pop, rank:i+1 }))
    .filter(({name}) => name.toLowerCase().includes(term));
  if (ascending) rows.reverse();
  return rows.length ? rows.map(({name,pop,rank}) => `<tr><td>${rank}</td><th scope="row">${name}</th><td>${format(pop)}</td><td>${prefectureYear}</td></tr>`).join('')
    : '<tr><td colspan="4" class="empty">No matching prefectures. Try part of a prefecture name.</td></tr>';
}

export function population() {
  const latestAgeShares = [f.children, f.workingAge, f.older]
    .map(item => `${item.name} ${item.value}${item.unit}`).join(', ');
  return `${heading(1,'Population','Population decline and ageing in the census and vital statistics.',censusDate)}
    <div class="chapter-findings">
      <p><strong>Total population fell</strong><span>${f.population.note}</span></p>
      <p><strong>The number of households rose</strong><span>${f.households.note}</span></p>
    </div>
    <div class="editorial-grid chapter-grid">
      <section class="chart-panel">
        ${section('Figure 1','Population by age group','1950–2025')}
        <div class="age-key">
          <span>Share of population (${f.older.year})</span>
          <div class="legend">${[f.children, f.workingAge, f.older].map((item, i) =>
            `<span class="${['legend-young', '', 'legend-accent'][i]}">${item.name} <strong>${item.value}${item.unit}</strong></span>`).join('')}</div>
        </div>
        ${ageComposition(ageTrend, latestAgeShares)}
        ${note(`Source: Statistics Bureau of Japan, <a href="${censusOutline}">${censusRelease}</a> (published in 2026, ${populationTrendTable}). Unknown ages are imputed from 2015 onward. Shares exclude any remaining cases of unknown age.`)}
      </section>
      <aside class="side-panel">
        ${section('Table 1','Population and households','2025')}
        ${table(['Category','Count','Share','Change since 2020'],
          populationBreakdown.map(([label, current, previous, unit, denominator]) => [
            label,
            `${denominator === null ? current.toFixed(2) : format(current)}<span class="unit">${unit}</span>`,
            denominator === null ? '—' : (current / denominator * 100).toFixed(1) + '%',
            sign((current / previous - 1) * 100) + '%',
          ]), 'numeric detail-table')}
        ${note(`Source: Statistics Bureau of Japan, <a href="${censusOutline}">${censusRelease}</a> (published in 2026). Population shares use total population. Total and private household shares use total households, and other household shares use private households. The foreign population and household types include imputed values for unknown responses.`)}
        <p class="annotation">${onlyTokyo}</p>
      </aside>
    </div>
    <section class="block">${section('Table 2','Births and deaths','2024')}${strip(f.births,f.deaths,f.fertility)}</section>
    <section class="block">${section('Table 3','Prefectures by population','2020 Population Census')}
      <div class="table-controls"><label>Search prefectures <input id="pref-search" type="search" placeholder="e.g. Tokyo" aria-controls="pref-rows"></label></div>
      <table class="numeric"><thead><tr><th scope="col">Rank</th><th scope="col">Prefecture</th><th scope="col" id="population-sort" aria-sort="descending"><button type="button" id="sort-prefs">Population <span>↓</span></button></th><th scope="col">Census year</th></tr></thead>
      <tbody id="pref-rows">${prefectureRows()}</tbody></table>
      ${note(prefectureYear+' · '+sources.census+'. Ibaraki had '+f.ibaraki.value+' '+f.ibaraki.unit+' in '+f.ibaraki.year+'.')}
    </section>`;
}

export function economy() {
  const nominal = gdpTrend.map(([year, amount]) => [year, amount / 1000]);
  const real = gdpTrend.map(([year, , amount]) => [year, amount / 1000]);
  const [lastYear, lastNominal] = nominal.at(-1);
  const nominalTotal = gdpTrend.at(-1)[1];
  const pandemic = nominal.find(([year]) => year === 2020);
  return `${heading(2,'Economy','The size of Japan’s economy through GDP and household spending.','Reporting periods<br><strong>Calendar and fiscal years</strong>')}
    ${strip(f.gdp,f.real,f.realFiscal)}
    <div class="editorial-grid chapter-grid">
      <section class="chart-panel">
        ${section('Figure 1','Nominal and real GDP',`${nominal[0][0]}–${lastYear} (calendar years)`)}
        ${legend('Nominal GDP','Real GDP (2020 chained prices)')}
        ${line({points:nominal,comparison:real,ticks:[500,550,600,650,700],yearStep:2,unit:'¥ trillion',
          label:'Nominal and real GDP by calendar year.',
          pins:[[...pandemic,'2020 pandemic','middle'],[lastYear,lastNominal,'2024 above ¥600T','end']]})}
        ${note(`Source: <a href="${gdpOutline}">${gdpRelease}</a> Time Series Table 1 (calendar years, expenditure approach). The series starts in 2015. The years 1994–2014, including the 2008 financial crisis, are outside the chart’s coverage. Nominal GDP passed ¥600 trillion in 2023 and stayed above that level in 2024.`)}
      </section>
      <aside class="side-panel">
        ${section('Table 1','GDP by expenditure component',f.gdp.year)}
        ${table(['Component','Amount (¥ trillion)','Share of GDP','Year on year'],gdpDemand.map(([label, current, previous]) => [
          label, (current / 1000).toFixed(2).replace('-', '−'),
          (current / nominalTotal * 100).toFixed(1).replace('-', '−') + '%',
          sign((current / previous - 1) * 100) + '%' + (previous < 0 ? ' (deficit)' : ''),
        ]), 'numeric detail-table')}
        ${note(`Source: <a href="${gdpOutline}">${gdpRelease}</a> Time Series Table 1 (nominal, calendar years, expenditure approach). Five major components are shown. Net exports are exports less imports. Their annual change measures the deficit, which narrowed by ¥${((gdpDemand.at(-1)[1] - gdpDemand.at(-1)[2]) / 1000).toFixed(2)} trillion.`)}
      </aside>
    </div>
    <section class="block prose">${section('Guide','How to read nominal and real GDP')}
      <p>Nominal GDP measures output at current prices. Real GDP accounts for price changes and tracks changes in the volume of output.</p>
      <p>Calendar years run from January to December. Fiscal years run from April through the following March. Use matching periods when comparing growth rates.</p>
    </section>`;
}

export function prices() {
  const rows = [f.cereals,f.energy,f.total,f.core].map(item => ({label:item.name,value:Number(item.value),display:item.value+'%',accent:item===f.cereals}));
  return `${heading(3,'Prices','Track the prices households pay for goods and services.',cpiBase)}
    <div class="editorial-grid chapter-grid">
      <section class="chart-panel">${section('Figure 1','Consumer Price Index','2020–2024 (annual averages)')}
        ${legend('All-items index (annual average)')}
        ${line({points:cpiTrend,ticks:[98,100,102,104,106,108,110],unit:cpiBase,label:'The Consumer Price Index rose from 100.0 in 2020 to 108.5 in 2024.'})}
        ${note('Source: '+sources.cpi+' (annual averages, '+cpiBase+')')}
      </section>
      <section class="side-panel">${section('Figure 2','Price increases by category',f.cereals.year)}
        ${legend('Change from prior fiscal year','Cereals')}${bars(rows,[0,4,8,12,16],'%')}
        ${note(source(f.cereals)+'. The core index excludes fresh food.')}
      </section>
    </div>
    <section class="block">${section('Table 1','Annual index and year-on-year change','2020–2024')}
      ${table(['Year','Index ('+cpiBase+')','Year on year (%)'],cpiTrend.map(([year,index,change])=>[String(year),index.toFixed(1),change===null?'Outside the series':sign(change)]),'numeric')}
      ${note('Source: '+sources.cpi+' (annual averages)')}
    </section>`;
}

export function labor() {
  return `${heading(4,'Labour','Unemployment, job openings and negotiated wage increases.')}
    <div class="editorial-grid chapter-grid">
      <section class="chart-panel">${section('Table 1','Changes in labour indicators')}
        ${table(['Indicator','Previous value and period','Latest value and period','Source'],
          [[f.unemployment2023, f.unemployment], [f.jobs2023, f.jobs], [null, f.wage]].map(([previous, item]) => [
            item.name,
            previous ? value(previous) + `<small>${previous.year}</small>` : 'Previous year unavailable here',
            value(item) + `<small>${item.year}</small>`,
            sources[item.source],
          ]), 'labor-table')}
      </section>
      <aside class="side-panel prose">${section('Guide','Comparing periods')}
        <p>The unemployment rate and job openings-to-applicants ratio both fell over the periods shown.</p>
        ${note(sources.labor+' · '+sources.jobs)}
        <p>The unemployment average uses the calendar year and the job openings ratio uses the fiscal year. Use matching periods for annual comparisons and seasonally adjusted values for monthly comparisons.</p>
        <p>A ratio above 1 means public employment offices recorded more active openings than active applicants.</p>
      </aside>
    </div>
    <section class="block prose">${section('Guide','How to read labour statistics')}
      <dl><dt>Unemployment rate</dt><dd>The share of the labour force without a job, actively looking for work and available to start.</dd>
      <dt>Job openings-to-applicants ratio</dt><dd>Active openings divided by active applicants, as recorded by public employment offices.</dd>
      <dt>Spring wage increase</dt><dd>Results from unions that reported settlements in the spring negotiations. Check which unions are included and how their results were aggregated.</dd></dl>
    </section>`;
}

export function fiscal() {
  const share = Math.round(parseFloat(f.social.value.slice(1)) / budgetTrend.at(-1)[1] * 100);
  return `${heading(5,'Public Finance','How much the national government budgets and where the money goes.')}
    <div class="editorial-grid chapter-grid">
      <section class="chart-panel">${section('Figure 1','General account spending','Initial budget')}
        ${legend('Total expenditure (approx.)','FY 2025')}
        ${bars(budgetTrend.map(([, amount], i) => {
          const item = [f.budget2024, f.budget][i];
          return {label:item.year, value:amount, display:item.value+' '+item.unit, accent:i===1};
        }),[0,30,60,90,120],'¥ trillion')}
        ${note('Source: '+sources.budget+' (FY 2024 and FY 2025)')}${note(f.budget.year+': '+f.budget.note+'.')}
      </section>
      <section class="side-panel">${section('Figure 2','Social security share',f.social.year)}
        ${donut(share,'≈'+share+'%','Social security')}
        ${legend('Social security','Other expenditure','fiscal-other')}
        ${note(source(f.social)+'. Approximate share of total expenditure.')}
      </section>
    </div>
    <section class="block">${section('Figure 3','Spending by category','FY 2025 initial budget')}
      ${legend('Major expenditure categories (approx.)','Social security')}
      ${bars(budgetBreakdown.map(item=>({label:item.name,value:Number(item.value.slice(1)),display:item.value+' '+item.unit,accent:item===f.social})),[0,10,20,30,40],'¥ trillion')}
      ${table(['Category','Purpose'],[
        ['Social security','Funds pensions, health care, long-term care and child and family services.'],
        ['Debt service','Covers bond redemptions and interest.'],['Local allocation tax grants, etc.','Helps equalise local government resources and fund public services.'],
        ['Public works','Builds and maintains infrastructure such as roads and waterways.'],['Education and science','Supports education, science and technology.'],['Defence','Funds defence capabilities and operations.'],
      ])}${note(source(f.social))}
    </section>
    <section class="block prose">${section('Guide','Where revenue comes from')}
      <p>Tax revenue includes income, corporation and consumption taxes. The government also raises money by issuing bonds. The general account includes these two main sources along with non-tax revenue.</p>
    </section>`;
}

export function indicatorRows(query = '', category = '') {
  const terms = query.replace(/\blabor\b/gi, 'labour').normalize('NFKC').toLowerCase().trim().split(/\s+/);
  const found = indicatorIndex.filter(item => {
    if (category && item.field !== category) return false;
    const field = sections.find(([route]) => route === '/'+item.field)?.[1];
    const text = [field,item.name,item.value,item.unit,item.year,sources[item.source],item.note].join(' ').normalize('NFKC').toLowerCase();
    return terms.every(term => text.includes(term));
  });
  return {
    count: found.length,
    html: found.length ? found.map(item => `<tr><th scope="row"><a href="#/${item.field}">${item.name}</a></th>
      <td>${value(item)}${item.note ? `<small>${item.note}</small>` : ''}</td><td>${item.year}</td><td>${sources[item.source]}</td></tr>`).join('')
      : '<tr><td colspan="4" class="empty">No matching indicators. Try a different category or search term.</td></tr>',
  };
}

export function comparison(a,b) {
  const selected = [prefectures[a],prefectures[b]];
  return legend('Prefecture B','Prefecture A') + bars(selected.map(([label,pop],i)=>({label,value:pop/1_000_000,display:format(pop)+' people',accent:i===0})),[0,5,10,15],'million people')
    + note(prefectureYear+' · '+sources.census+'. Both bars use the same scale.');
}

export function explore() {
  const select = (id,label,current) => `<label>${label}<select id="${id}">${prefectures.map(([name],i) => `<option value="${i}" ${i===current?'selected':''}>${name}</option>`).join('')}</select></label>`;
  const results = indicatorRows();
  return `${heading(6,'Explore','Search the indicator index or compare the populations of two prefectures.')}
    <section class="block">${section('Figure 1','Prefecture populations','2020 Population Census')}
      <div class="table-controls">${select('pref-a','Prefecture A',0)}${select('pref-b','Prefecture B',2)}</div>
      <div id="comparison" aria-live="polite">${comparison(0,2)}</div>
    </section>
    <section class="block">${section('Table 1','Indicator index')}
      <div class="table-controls"><label>Keywords <input id="indicator-search" type="search" placeholder="e.g. population 2025" aria-controls="indicator-rows"></label>
        <label>Category <select id="indicator-field" aria-controls="indicator-rows">
          <option value="">All categories</option>
          ${sections.slice(1, 6).map(([route, name]) => `<option value="${route.slice(1)}">${name}</option>`).join('')}
        </select></label>
        <output id="result-count" aria-live="polite">${results.count} results</output></div>
      <table class="indicator-table"><thead><tr><th scope="col">Indicator</th><th scope="col">Value</th><th scope="col">Reference date or period</th><th scope="col">Source</th></tr></thead>
        <tbody id="indicator-rows">${results.html}</tbody></table>
    </section>`;
}

export function about() {
  return `${heading(7,'Sources &amp; Guide','Where the figures come from and how to compare them.')}
    <section class="block">${section('References','Source directory')}
      ${table(['Publication','Coverage'],sourcePages.map(([key,url,desc])=>[`<a href="${url}" target="_blank" rel="noopener noreferrer">${sources[key]} <span aria-hidden="true">↗</span></a>`,desc]))}
    </section>
    <section class="block prose">${section('Notes','About the data')}
      <dl><dt>Preliminary and final figures</dt><dd>Agencies may revise preliminary figures after publication. The total population for the 2025 census comes from the final Basic Complete Tabulation on Population and Households.</dd>
      <dt>Reference dates and base years</dt><dd>Population figures carry a reference date, GDP figures specify the calendar or fiscal year, and the Consumer Price Index identifies its base year. Compare figures that share the same reference period and basis.</dd>
      <dt>Table coverage</dt><dd>Prefecture rankings and comparisons use the 2020 Population Census. Charts and tables show the precision of approximate figures.</dd></dl>
    </section>
    <section class="block prose">${section('Guide','Using the almanac')}
      <p>Open a chapter to find units, reference periods and sources for its figures. Filter the prefecture table by name and select the Population header to change its sort order.</p>
      <p>On <a href="#/explore">Explore</a>, filter by category and separate multiple search terms with spaces. Choose two prefectures to compare their populations. The source directory links to the original publications.</p>
    </section>`;
}
