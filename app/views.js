import {
  sections, sources, figures as f, censusDate, censusReferenceDate, populationBrief, populationTrend, populationPeak,
  gdpTrend, cpiTrend, cpiBase, budgetBreakdown, budgetTrend, prefectures, prefectureYear, onlyTokyo,
  indicatorIndex, sourcePages, topics, format, sign,
} from './data.js';
import { line, bars, donut } from './charts.js';

const pad = n => String(n).padStart(2,'0');
const value = item => item.value + '<span class="unit">' + item.unit + '</span>';
const source = item => item.year + ' ／ ' + sources[item.source];
const note = text => `<p class="source">${text}</p>`;
const heading = (n,title,lead,aside) => `<header class="page-heading">
  <div class="running"><span><b>${pad(n)}</b> ${n === 0 ? '巻頭' : '第'+pad(n)+'章'}</span><span>国勢図鑑 ／ ${title}</span></div>
  <div class="title-row"><div><h1>${title}</h1><p>${lead}</p></div>${aside ? `<p class="heading-aside">${aside}</p>` : ''}</div>
</header>`;
const section = (n,title,aside='') => `<div class="section-head"><h2><span>${n}</span>${title}</h2>${aside ? `<span class="section-aside">${aside}</span>` : ''}</div>`;
const stat = (item, override) => `<div class="stat">
  <div class="stat-label">${item.name}</div><strong class="stat-value">${override ?? value(item)}</strong>
  ${note(source(item))}${item.note ? `<p class="stat-note">${item.note}</p>` : ''}
</div>`;
const strip = (...items) => `<div class="stat-strip">${items.map(item => Array.isArray(item) ? stat(...item) : stat(item)).join('')}</div>`;
const legend = (label, extra='', tone='accent') => `<div class="legend"><span>${label}</span>${extra ? `<span class="legend-${tone}">${extra}</span>` : ''}</div>`;
const table = (headers, rows, cls='') => `<table class="${cls}"><thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell,i) => i ? `<td>${cell}</td>` : `<th scope="row">${cell}</th>`).join('')}</tr>`).join('')}</tbody></table>`;

export function home() {
  const brief = [f.population, populationBrief+'<span class="unit">万人</span>'];
  const descriptions = ['国勢調査と人口動態','国内総生産と家計消費','消費者物価と品目別動向','雇用・求人・賃金','国の一般会計予算','指標検索と都道府県比較','公表資料と統計の読み方'];
  return `${heading(0,'日本のいま','人口、経済、暮らし。公的統計で、日本の現在地を読む。','人口の基準日<br><strong>'+censusReferenceDate+'</strong><br>'+sources.census)}
    ${strip([ {...brief[0],note:''}, brief[1]], {...f.gdp,note:''}, f.inflation, f.unemployment)}
    <div class="editorial-grid">
      <section class="chart-panel">
        ${section('図 01','人口の長期推移','1920—2025年')}
        ${legend('国勢調査の総人口','人口推計のピーク','peak')}
        ${line({points:populationTrend,ticks:[4000,6000,8000,10000,12000,14000],unit:'万人',label:'1920年から2025年の日本の人口。2025年は1億2,297万人。',
          peak:populationPeak,peakLabel:`${populationPeak[0]}年 約${format(populationPeak[1])}万人`,endpoint:format(populationTrend.at(-1)[1])})}
        ${note('出典　'+sources.census+'（各年）、'+sources.estimates+'（'+populationPeak[0]+'年）')}
      </section>
      <aside class="topics">
        ${section('記事','統計トピックス')}
        ${topics.map(([href,tag,title,summary,ref]) => `<a href="#${href}" class="topic"><span class="tag">${tag}</span><span class="arrow" aria-hidden="true">↗</span>
          <h3>${title}</h3><p>${summary}</p>${note(ref)}</a>`).join('')}
      </aside>
    </div>
    <section class="block">${section('目次','分野から読む')}
      <div class="index-grid">${sections.slice(1).map(([route,name],i) => `<a href="#${route}"><span>${pad(i+1)}</span><strong>${name}</strong><small>${descriptions[i]}</small><span aria-hidden="true">↗</span></a>`).join('')}</div>
    </section>`;
}

export function prefectureRows(query = '', ascending = false) {
  const rows = prefectures.map(([name,pop],i) => ({ name, pop, rank:i+1 }))
    .filter(({name}) => name.includes(query.trim()));
  if (ascending) rows.reverse();
  return rows.length ? rows.map(({name,pop,rank}) => `<tr><td>${rank}</td><th scope="row">${name}</th><td>${format(pop)}</td><td>${prefectureYear}</td></tr>`).join('')
    : '<tr><td colspan="4" class="empty">該当する都道府県がありません。地名の一部で検索してください。</td></tr>';
}

export function population() {
  return `${heading(1,'人口','人口の減少と高齢化を、国勢調査・人口動態統計からたどる。',censusDate)}
    ${strip(f.population,f.households,f.older)}
    <div class="editorial-grid chapter-grid">
      <section class="chart-panel">
        ${section('図 01','年齢構成','2025年国勢調査')}
        ${legend('年齢3区分の割合','65歳以上')}
        ${bars([['0〜14歳',f.children],['15〜64歳',f.workingAge],['65歳以上',f.older]]
          .map(([label,item])=>({label,value:item.value,display:item.value+'%',accent:item===f.older})),[0,15,30,45,60],'%')}
        ${note(source(f.older)+'。年齢不詳を補完した全国の構成比。丸めにより合計が100%と一致しない場合があります。')}
      </section>
      <aside class="side-panel">
        ${section('表 01','人口と世帯の内訳')}
        ${table(['指標','人数'],[f.men,f.women,f.foreign].map(item=>[item.name,value(item)]),'numeric')}
        ${note(source(f.foreign)+' ／ 外国人人口は'+f.foreign.note+'。')}
        <p class="annotation">${onlyTokyo}</p>
      </aside>
    </div>
    <section class="block">${section('表 02','出生と死亡','2024年 人口動態統計')}${strip(f.births,f.deaths,f.fertility)}</section>
    <section class="block">${section('表 03','都道府県人口ランキング','2020年国勢調査')}
      <div class="table-controls"><label>都道府県を検索 <input id="pref-search" type="search" placeholder="例：東京" aria-controls="pref-rows"></label></div>
      <table class="numeric"><thead><tr><th scope="col">順位</th><th scope="col">都道府県</th><th scope="col" id="population-sort" aria-sort="descending"><button type="button" id="sort-prefs">人口（人） <span>↓</span></button></th><th scope="col">調査年</th></tr></thead>
      <tbody id="pref-rows">${prefectureRows()}</tbody></table>
      ${note(prefectureYear+' ／ '+sources.census+'。'+onlyTokyo+' '+f.ibaraki.year+'の茨城県は'+f.ibaraki.value+f.ibaraki.unit+'。')}
    </section>`;
}

export function economy() {
  return `${heading(2,'経済','国内総生産と家計の消費から、日本経済の規模を読む。','暦年と年度<br><strong>対象期間を区別して掲載</strong>')}
    ${strip(f.gdp,f.real,f.realFiscal)}
    <div class="editorial-grid chapter-grid">
      <section class="chart-panel">
        ${section('図 02','名目GDPの節目','2019—2024年')}
        ${legend('名目GDP（暦年・概数）')}
        ${line({points:gdpTrend,ticks:[560,580,600,620,640],unit:'兆円',label:'名目GDPは2019年の約572兆円から2024年の約637兆円へ。',startpoint:f.gdp2019.value,endpoint:f.gdp.value,approximate:true})}
        ${note('出典　'+sources.gdp+'（2019・2024年）。破線は掲載した2時点を結ぶ。')}
      </section>
      <aside class="side-panel">
        ${section('表 04','家計と企業')}
        ${stat(f.consumption)}${stat(f.profits)}
      </aside>
    </div>
    <section class="block prose">${section('解説','名目と実質の読み方')}
      <p>名目GDPはその年の価格で計った生産活動の規模。実質GDPは価格変動の影響を除いたもので、生産量の動きを捉えるのに向いています。</p>
      <p>暦年は1月から12月、年度は4月から翌年3月を集計します。成長率を比較するときは対象期間をそろえます。</p>
    </section>`;
}

export function prices() {
  const rows = [f.cereals,f.energy,f.total,f.core].map(item => ({label:item.name,value:Number(item.value),display:item.value+'%',accent:item===f.cereals}));
  return `${heading(3,'物価','家計が購入する商品やサービスの価格の動きを見る。',cpiBase)}
    ${strip(f.inflation,f.total,f.core)}
    <div class="editorial-grid chapter-grid">
      <section class="chart-panel">${section('図 03','消費者物価指数の推移','2020—2024年')}
        ${legend('総合指数（年平均）')}
        ${line({points:cpiTrend,ticks:[98,100,102,104,106,108,110],unit:cpiBase,label:'消費者物価指数は2020年の100.0から2024年の108.5へ。',endpoint:cpiTrend.at(-1)[1].toFixed(1)})}
        ${note('出典　'+sources.cpi+'（各年平均、'+cpiBase+'）')}
      </section>
      <section class="side-panel">${section('図 04','品目別の上昇率','2024年度')}
        ${legend('前年度比','穀類')}${bars(rows,[0,4,8,12,16],'%')}
        ${note(source(f.cereals)+'。コアは生鮮食品を除く総合。')}
      </section>
    </div>
    <section class="block">${section('表 05','年平均の指数と前年比')}
      ${table(['年','指数（'+cpiBase+'）','前年比（%）'],cpiTrend.map(([year,index,change])=>[year+'年',index.toFixed(1),change===null?'掲載期間外':sign(change)]),'numeric')}
      ${note('出典　'+sources.cpi+'（各年平均）')}
    </section>`;
}

export function labor() {
  return `${heading(4,'労働','仕事を探す人、求人、賃上げの動きを見る。')}
    ${strip(f.unemployment,f.jobs,f.wage)}
    <div class="editorial-grid chapter-grid">
      <section class="chart-panel">${section('表 06','雇用指標と対象期間')}
        ${table(['指標','対象期間','値','出典'],[f.unemployment,f.jobs,f.wage].map(item=>[item.name,item.year,value(item),sources[item.source]]),'labor-table')}
      </section>
      <aside class="side-panel prose">${section('解説','推移を見るとき')}
        <p>完全失業率は${f.unemployment2023.year}の${value(f.unemployment2023)}から${f.unemployment.year}の${value(f.unemployment)}へ。有効求人倍率は${f.jobs2023.year}の${value(f.jobs2023)}から${f.jobs.year}の${value(f.jobs)}へ低下しました。</p>
        ${note(sources.labor+' ／ '+sources.jobs)}
        <p>失業率の年平均と求人倍率の年度平均では、集計期間がずれます。前年との推移は同じ指標・同じ期間で比べ、月ごとの動きを比べる場合は季節調整値を確認します。</p>
        <p>求人倍率が1倍を上回ると、公共職業安定所で扱う有効求人の数が有効求職者の数を上回ります。</p>
      </aside>
    </div>
    <section class="block prose">${section('解説','雇用をめぐる数字の読み方')}
      <dl><dt>完全失業率</dt><dd>労働力人口に占める完全失業者の割合。仕事がなく、仕事を探していて、すぐに就業できる人が対象です。</dd>
      <dt>有効求人倍率</dt><dd>有効求人数を有効求職者数で割った値。公共職業安定所で扱う求人・求職を集計します。</dd>
      <dt>春闘賃上げ率</dt><dd>春季労使交渉で回答のあった組合の集計。対象組合や集計方法を確認して読みます。</dd></dl>
    </section>`;
}

export function fiscal() {
  const share = Math.round(parseFloat(f.social.value.slice(1)) / budgetTrend.at(-1)[1] * 100);
  return `${heading(5,'財政','国の一般会計当初予算から、歳出の規模と使い道を見る。')}
    ${strip(f.budget,f.budget2024,f.social)}
    <div class="editorial-grid chapter-grid">
      <section class="chart-panel">${section('図 05','一般会計歳出の規模','当初予算')}
        ${legend('歳出総額（概数）','2025年度')}
        ${bars(budgetTrend.map(([year,value],i)=>({label:year+'年度',value,display:value+'兆円',accent:i===1})),[0,30,60,90,120],'兆円')}
        ${note('出典　'+sources.budget+'（2024・2025年度）')}
      </section>
      <section class="side-panel">${section('図 06','社会保障関係費の割合')}
        ${donut(share,'約'+share+'%','社会保障関係費')}
        ${legend('社会保障関係費','その他の歳出','peak')}
        ${note(source(f.social)+'。歳出総額に占める概算。')}
      </section>
    </div>
    <section class="block">${section('図 07','歳出の内訳','2025年度 当初予算')}
      ${legend('主要経費の金額（概数）','社会保障関係費')}
      ${bars(budgetBreakdown.map(item=>({label:item.name,value:Number(item.value.slice(1)),display:item.value+item.unit,accent:item===f.social})),[0,10,20,30,40],'兆円')}
      ${table(['主要項目','使い道'],[
        ['社会保障関係費','年金・医療・介護・子育てなどを支える。'],
        ['国債費','国債の償還や利払いに充てる。'],['地方交付税交付金等','自治体の財源を調整し、行政サービスを支える。'],
        ['公共事業関係費','道路や河川などの社会資本を整備する。'],['文教及び科学振興費','教育や科学技術を支える。'],['防衛関係費','防衛力の整備や運用に充てる。'],
      ])}${note(source(f.social))}
    </section>
    <section class="block prose">${section('解説','歳入の柱')}
      <p>税収は所得税・法人税・消費税などから得る収入。公債金は国債の発行によって調達する資金です。一般会計の歳入にはこの二つの柱に加え、税外収入なども含まれます。</p>
    </section>`;
}

export function indicatorRows(query = '') {
  const terms = query.normalize('NFKC').toLowerCase().trim().split(/\s+/);
  const found = indicatorIndex.filter(item => {
    const field = sections.find(([route]) => route === '/'+item.field)?.[1];
    const text = [field,item.name,item.value,item.unit,item.year,sources[item.source],item.note].join(' ').normalize('NFKC').toLowerCase();
    return terms.every(term => text.includes(term));
  });
  return {
    count: found.length,
    html: found.length ? found.map(item => `<tr><th scope="row"><a href="#/${item.field}">${item.name}</a></th>
      <td>${value(item)}${item.note ? `<small>${item.note}</small>` : ''}</td><td>${item.year}</td><td>${sources[item.source]}</td></tr>`).join('')
      : '<tr><td colspan="4" class="empty">一致する指標がありません。「人口」「物価」「2024年」などで検索してください。</td></tr>',
  };
}

export function comparison(a,b) {
  const selected = [prefectures[a],prefectures[b]];
  return legend('都道府県 B','都道府県 A') + bars(selected.map(([label,pop],i)=>({label,value:pop/10000,display:format(pop)+'人',accent:i===0})),[0,500,1000,1500],'万人')
    + note(prefectureYear+' ／ '+sources.census+'。同じ目盛りで比較。');
}

export function explore() {
  const select = (id,label,current) => `<label>${label}<select id="${id}">${prefectures.map(([name],i) => `<option value="${i}" ${i===current?'selected':''}>${name}</option>`).join('')}</select></label>`;
  const results = indicatorRows();
  return `${heading(6,'探す・比べる','分野を横断して指標を探す。都道府県を二つ選び、人口を比べる。')}
    <section class="block">${section('比較','都道府県の人口','2020年国勢調査')}
      <div class="table-controls">${select('pref-a','都道府県 A',0)}${select('pref-b','都道府県 B',2)}</div>
      <div id="comparison" aria-live="polite">${comparison(0,2)}</div>
    </section>
    <section class="block">${section('検索','指標索引')}
      <div class="table-controls"><label>キーワード <input id="indicator-search" type="search" placeholder="例：人口 2025年" aria-controls="indicator-rows"></label>
        <output id="result-count" aria-live="polite">${results.count}件</output></div>
      <table class="indicator-table"><thead><tr><th scope="col">指標</th><th scope="col">値</th><th scope="col">対象時点</th><th scope="col">出典</th></tr></thead>
        <tbody id="indicator-rows">${results.html}</tbody></table>
    </section>`;
}

export function about() {
  return `${heading(7,'出典と使い方','数字の出どころと、時点や基準のそろえ方。')}
    <section class="block">${section('資料','出典一覧')}
      ${table(['公表資料','主な掲載項目'],sourcePages.map(([key,url,desc])=>[`<a href="${url}" target="_blank" rel="noopener noreferrer">${sources[key]} <span aria-hidden="true">↗</span></a>`,desc]))}
    </section>
    <section class="block prose">${section('注記','このサイトの数字について')}
      <dl><dt>速報値と確定値</dt><dd>速報値は公表後に改定されることがあります。2025年国勢調査の総人口は人口等基本集計の確定値を掲載しています。</dd>
      <dt>調査時点と基準年</dt><dd>人口は調査時点、GDPは暦年や年度、消費者物価指数は基準年を明記しています。時点や基準がそろった数値を比較してください。</dd>
      <dt>表の掲載範囲</dt><dd>都道府県のランキングと比較は2020年国勢調査人口を使います。概数の桁は図表の表記に従います。</dd></dl>
    </section>
    <section class="block prose">${section('案内','サイトの使い方')}
      <p>目次から分野を開き、図表の単位・対象時点・出典を確認します。都道府県の表は地名で絞り込み、人口列の見出しで並べ替えられます。</p>
      <p><a href="#/explore">「探す・比べる」</a>では複数の語を空白で区切って検索でき、都道府県を選んで人口を比較できます。出典一覧のリンクから公表元の資料を確認できます。</p>
    </section>`;
}
