function clamp(v){ return Math.max(0, Math.min(100, v)); }
const days = [
    {
        title: "Понеделник вечер",
        text: "Готов си со домашните. Часот е 22:00, а утре имаш училиште од 7:30. Што правиш?",
        options: [
            { text: "Останувам на TikTok до 3 наутро", fx:{health:-5, stress:+5, sleep:-15, social:+5} },
            { text: "Си легнувам на време", fx:{health:+5, stress:-5, sleep:+10, social:0} },
            { text: "Учам дополнително за утрешниот тест", fx:{health:-5, stress:+10, sleep:-10, social:-5} }
        ]
    },
    {
        title: "Вторник по училиште",
        text: "Тренингот по фудбал е во 17:00, но си уморен од денот. Што одлучуваш?",
        options: [
            { text: "Одам на тренинг", fx:{health:+10, stress:-5, sleep:-5, social:+5} },
            { text: "Останувам дома да си одморам", fx:{health:0, stress:-3, sleep:+5, social:-5} },
            { text: "Излегувам со пријатели на кафе", fx:{health:-2, stress:-5, sleep:-5, social:+10} }
        ]
    },
    {
        title: "Среда наутро",
        text: "Денот започнува со малку конфликт - пријател ти пишал нешто непријатно во група. Како реагираш?",
        options: [
            { text: "Игнорирам и продолжувам со денот", fx:{health:0, stress:+5, sleep:0, social:-10} },
            { text: "Разговарам директно и решавам проблем", fx:{health:+2, stress:-5, sleep:0, social:+10} },
            { text: "Остануваш буден навечер и преживуваш мисли", fx:{health:-5, stress:+10, sleep:-15, social:-5} }
        ]
    },
    {
        title: "Четврток - тест ден",
        text: "Утре имаш голем тест по математика. Како се подготвуваш денес?",
        options: [
            { text: "Учам цела ноќ со кафе/енергетско пиење", fx:{health:-10, stress:+15, sleep:-15, social:-5} },
            { text: "Учам неколку часа порамномерно и си легнувам на време", fx:{health:+3, stress:-5, sleep:0, social:0} },
            { text: "Не учам и се надевам на најлесно", fx:{health:-5, stress:+10, sleep:+10, social:-2} }
        ]
    },
    {
        title: "Петок навечер",
        text: "Пријателите те викаат на журка која трае до доцна. Прифаќаш?",
        options: [
            { text: "Одам и останувам до крај", fx:{health:-5, stress:-5, sleep:-15, social:+15} },
            { text: "Останувам дома и играм видео игри", fx:{health:-2, stress:-5, sleep:+5, social:-5} },
            { text: "Одам кратко и се враќам порано", fx:{health:0, stress:-2, sleep:-2, social:+8} }
        ]
    },
    {
        title: "Сабота наутро",
        text: "Спиeш до доцна или искористуваш утрото поинаку?",
        options: [
            { text: "Спијам до пладне", fx:{health:+3, stress:-5, sleep:+15, social:-5} },
            { text: "Стануваш рано и учиш напред", fx:{health:0, stress:+5, sleep:-5, social:-5} },
            { text: "Одам на доручек со семејството", fx:{health:+3, stress:-5, sleep:+5, social:+10} }
        ]
    },
    {
        title: "Недела вечер",
        text: "Утре почнува нова недела. Како го завршуваш викендот?",
        options: [
            { text: "Цел ден сум на телефон/компјутер", fx:{health:-8, stress:+5, sleep:-5, social:-3} },
            { text: "Одам на прошетка во природа", fx:{health:+10, stress:-10, sleep:+5, social:+5} },
            { text: "Подготвувам план и распоред за следната недела", fx:{health:+2, stress:-8, sleep:+3, social:0} }
        ]
    }
];
const badgeDefs = [
    { name:'Активен', test: s => s.health >= 65 },
    { name:'Добар сон', test: s => s.sleep >= 65 },
    { name:'Социјална пеперутка', test: s => s.social >= 65 },
    { name:'Смирен', test: s => s.stress <= 35 },
    { name:'Балансиран', test: s => Object.values(s).every(v => v >= 40 && v <= 60) },
    { name:'Преживеано', test: s => s.health <= 30 || s.sleep <= 20 }
];
const characters = [
    {
        id:'athlete',
        name:'🏃 Спортист',
        desc:'Силно тело и дисциплина, но социјалниот живот и сонот често доаѓаат на последно место.',
        stats:{ health:70, stress:45, sleep:45, social:40 }
    },
    {
        id:'gamer',
        name:'🎮 Гејмер',
        desc:'Богат онлајн социјален живот, но здравјето, движењето и сонот се на тенок мраз.',
        stats:{ health:35, stress:50, sleep:35, social:65 }
    },
    {
        id:'student',
        name:'📚 Одличен ученик',
        desc:'Дисциплиниран и фокусиран на училиште, но стресот и недостатокот на сон се чести проблеми.',
        stats:{ health:45, stress:65, sleep:40, social:40 }
    },
    {
        id:'artist',
        name:'🎨 Креативец',
        desc:'Полн со идеи и енергија за хобија и проекти, но често занемарува распоред, рутина и сон.',
        stats:{ health:50, stress:55, sleep:45, social:55 }
    },
    {
        id:'introvert',
        name:'😌 Интроверт',
        desc:'Спокоен и добро одморен, но социјалниот живот лесно остане на страна.',
        stats:{ health:55, stress:40, sleep:60, social:30 }
    },
    {
        id:'nightOwl',
        name:'🌙 Ноќен тип',
        desc:'Активен до доцна навечер, има повеќе социјална енергија но страда со сон и баланс.',
        stats: { health: 50, stress: 65, sleep: 35, social: 70 }
    }
]
const MAX_SCORE = 400; // health(100) + (100-stress) + sleep(100) + social(100)

function getBestScore(){
    return parseInt(localStorage.getItem('wellnessQuestBest') || '0');
}
function getLastResult(){
    const raw = localStorage.getItem('wellnessQuestLast');
    return raw ? JSON.parse(raw) : null;
}
function saveResult(score, charName){
    const best = getBestScore();
    if(score > best) localStorage.setItem('wellnessQuestBest', score);
    localStorage.setItem('wellnessQuestLast', JSON.stringify({score, charName}));
}
let prevStats = { health:50, stress:50, sleep:50, social:50 };
let stats = { health:50, stress:50, sleep:50, social:50 };
let currentDay = 0;
let chosenChar = null;

const els = {
    dayTag: document.getElementById('dayTag'),
    title: document.getElementById('scenarioTitle'),
    text: document.getElementById('scenarioText'),
    options: document.getElementById('optionsBox'),
    feedback: document.getElementById('feedback'),
    nextBtn: document.getElementById('nextBtn'),
    gameScreen: document.getElementById('gameScreen'),
    reportScreen: document.getElementById('reportScreen'),
    charScreen: document.getElementById('charScreen'),
    charGrid: document.getElementById('charGrid'),
    prevScoreBox: document.getElementById('prevScoreBox'),
};

function renderCharScreen(){
    // previous result box
    const last = getLastResult();
    const best = getBestScore();
    if(last){
        els.prevScoreBox.classList.remove('hidden');
        els.prevScoreBox.innerHTML =
            `Твој последен резултат: <b>${last.score}/${MAX_SCORE}</b> (${last.charName}) &nbsp;|&nbsp; Најдобар резултат: <b>${best}/${MAX_SCORE}</b>`;
    } else {
        els.prevScoreBox.classList.add('hidden');
    }

    els.charGrid.innerHTML = '';
    const names = {health:'Здравје', stress:'Стрес', sleep:'Сон', social:'Социјал'};
    characters.forEach(ch=>{
        const card = document.createElement('div');
        card.className = 'char-card';
        const statTags = Object.keys(ch.stats).map(k=>`<span>${names[k]}: ${ch.stats[k]}</span>`).join('');
        card.innerHTML = `<div class="char-name">${ch.name}</div><div class="char-desc">${ch.desc}</div><div class="char-stats">${statTags}</div>`;
        card.onclick = ()=> startGame(ch);
        els.charGrid.appendChild(card);
    });
}

function startGame(ch){
    chosenChar = ch;
    stats = { ...ch.stats };
    prevStats = { ...ch.stats };
    currentDay = 0;
    els.charScreen.classList.add('hidden');
    els.reportScreen.classList.add('hidden');
    els.gameScreen.classList.remove('hidden');
    renderStats();
    showDay();
}



function renderStats(){
    for(const key of ['health','stress','sleep','social']){
        document.getElementById('bar-'+key).style.width = stats[key] + '%';
        document.getElementById('val-'+key).textContent = stats[key];
        const trendEl = document.getElementById('trend-'+key);
        if(stats[key] > prevStats[key]) {
            trendEl.textContent = '↑';
            trendEl.className = 'trend up';
        } else if(stats[key] < prevStats[key]) {
            trendEl.textContent = '↓';
            trendEl.className = 'trend down';
        } else {
            trendEl.textContent = '';
            trendEl.className = 'trend';
        }
    }

    drawRadar();
}

function drawRadar(){
    const cx=100, cy=100, maxR=75;
    const axes = [
        {key:'health', angle:-90, color:'var(--health)'},
        {key:'social', angle:0, color:'var(--social)'},
        {key:'sleep', angle:90, color:'var(--sleep)'},
        {key:'stress', angle:180, color:'var(--stress)'}
    ];
    let gridLines = '';
    [0.25,0.5,0.75,1].forEach(f=>{
        let pts = axes.map(a=>{
            const r = maxR*f;
            const rad = a.angle*Math.PI/180;
            return (cx+r*Math.cos(rad)) + ',' + (cy+r*Math.sin(rad));
        }).join(' ');
        gridLines += `<polygon points="${pts}" fill="none" stroke="#e4dcc5" stroke-width="1"/>`;
    });
    let axisLines = axes.map(a=>{
        const rad = a.angle*Math.PI/180;
        const x = cx+maxR*Math.cos(rad), y = cy+maxR*Math.sin(rad);
        return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#e4dcc5" stroke-width="1"/>`;
    }).join('');
    let dataPts = axes.map(a=>{
        const r = (stats[a.key]/100)*maxR;
        const rad = a.angle*Math.PI/180;
        return (cx+r*Math.cos(rad)) + ',' + (cy+r*Math.sin(rad));
    }).join(' ');
    let labels = axes.map(a=>{
        const rad = a.angle*Math.PI/180;
        const x = cx+(maxR+18)*Math.cos(rad), y = cy+(maxR+18)*Math.sin(rad);
        const names = {health:'Здравје', social:'Социјал', sleep:'Сон', stress:'Стрес'};
        return `<text x="${x}" y="${y}" font-size="10" font-family="Work Sans" fill="#888" text-anchor="middle" dominant-baseline="middle">${names[a.key]}</text>`;
    }).join('');

    document.getElementById('radar').innerHTML =
        gridLines + axisLines +
        `<polygon points="${dataPts}" fill="rgba(157,141,241,0.35)" stroke="#9d8df1" stroke-width="2"/>` +
        labels;
}

function showDay(){
    const d = days[currentDay];
    els.dayTag.textContent = `Ден ${currentDay+1} / ${days.length}`;
    els.title.textContent = d.title;
    els.text.textContent = d.text;
    els.feedback.textContent = '';
    els.nextBtn.style.display = 'none';
    els.options.innerHTML = '';

    const eventBanner = document.getElementById('eventBanner');
    const ev = maybeTriggerEvent();
    if(ev){
        eventBanner.textContent = ev.text;
        eventBanner.classList.remove('hidden');
        renderStats();
    } else {
        eventBanner.classList.add('hidden');
    }

    d.options.forEach((opt, i)=>{
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.textContent = opt.text;
        btn.onclick = ()=> chooseOption(opt, btn);
        els.options.appendChild(btn);
    });
}

function chooseOption(opt, clickedBtn){
    const before = { ...stats };
    for(const key in opt.fx){
        stats[key] = clamp(stats[key] + opt.fx[key]);
    }
    prevStats = before;
    renderStats();

    // disable all buttons
    document.querySelectorAll('.opt-btn').forEach(b=>{
        b.disabled = true;
        if(b===clickedBtn) b.style.borderColor = '#9d8df1';
    });

    const parts = [];
    const names = {health:'Здравје', stress:'Стрес', sleep:'Сон', social:'Социјал'};
    for(const key in opt.fx){
        const v = opt.fx[key];
        if(v!==0) parts.push(`${names[key]} ${v>0?'+':''}${v}`);
    }
    els.feedback.textContent = 'Промени: ' + parts.join(', ');

    if(currentDay < days.length-1){
        els.nextBtn.textContent = 'Следен ден →';
        els.nextBtn.style.display = 'block';
        els.nextBtn.onclick = ()=>{ currentDay++; showDay(); };
    } else {
        els.nextBtn.textContent = 'Погледни извештај →';
        els.nextBtn.style.display = 'block';
        els.nextBtn.onclick = showReport;
    }
}

function showReport(){
    els.gameScreen.classList.add('hidden');
    els.reportScreen.classList.remove('hidden');

    const grid = document.getElementById('reportGrid');
    grid.innerHTML = '';

    const info = {
        health: { name:'💪 Здравје', good:v=>v>=65, mid:v=>v>=40,
            msgs:{good:'Се грижиш добро за телото - тренинг и одмор се во баланс.', mid:'Здравјето е во ред, но има простор за повеќе движење.', low:'Здравјето е загрозено - премалку движење и одмор оваа недела.'} },
        stress: { name:'😖 Стрес', good:v=>v<=35, mid:v=>v<=65,
            msgs:{good:'Нивото на стрес е под контрола - добро се справуваш со притисокот.', mid:'Стресот е умерен - внимавај да не се натрупа.', low:'Стресот е висок - потребно е повеќе одмор и разговор со некој близок.'} },
        sleep: { name:'😴 Сон', good:v=>v>=65, mid:v=>v>=40,
            msgs:{good:'Сонот е здрав - тоа помага и за расположение и за концентрација.', mid:'Сонот е нередовен - обиди се да си легнуваш во исто време.', low:'Сериозно недостаток на сон - влијае на здравјето и расположението.'} },
        social: { name:'👥 Социјален живот', good:v=>v>=65, mid:v=>v>=40,
            msgs:{good:'Имаш силни врски со пријатели и семејство.', mid:'Социјалниот живот е во ред, но провери дали трошиш доволно квалитетно време со луѓе.', low:'Социјалната изолација може да влијае на расположението - обиди се да поминуваш повеќе време со други.'} }
    };

    for(const key of ['health','stress','sleep','social']){
        const v = stats[key];
        const cfg = info[key];
        let msg;
        if(cfg.good(v)) msg = cfg.msgs.good;
        else if(cfg.mid(v)) msg = cfg.msgs.mid;
        else msg = cfg.msgs.low;

        const card = document.createElement('div');
        card.className = 'report-card';
        card.innerHTML = `<div class="stat-name">${cfg.name}: ${v}/100</div><div class="stat-msg">${msg}</div>`;
        grid.appendChild(card);

        const badgesRow = document.getElementById('badgesRow');
        badgesRow.innerHTML = '';
        badgeDefs.forEach(b=>{
            if(b.test(stats)){
                const tag = document.createElement('div');
                tag.className = 'badge';
                tag.textContent = `${b.name}`;
                badgesRow.appendChild(tag);
            }
        });
    }

    const score = stats.health + (100-stats.stress) + stats.sleep + stats.social;
    const prevBest = getBestScore();
    const isRecord = score > prevBest;
    saveResult(score, chosenChar.name);

    let overall;
    if(score >= 280) overall = "🌟 Одлична недела! </br>  Успеал/успеала си да одржиш баланс меѓу учење, одмор, спорт и пријатели. Продолжи така!";
    else if(score >= 200) overall = "👍 Солидна недела </br>  има добри одлуки, но и неколку каде здравјето или сонот биле жртвувани. Мали промени можат да направат голема разлика.";
    else overall = "⚠️ Тешка недела </br> стресот, сонот или здравјето страдале. Размисли како да го промениш распоредот следната недела - повеќе сон, помалку доцни вечери на екран, и повеќе движење.";

    overall += `<br><br>Резултат: <b>${score}/${MAX_SCORE}</b> (лик: ${chosenChar.name})`;
    if(isRecord && prevBest > 0) overall += `<br><span class="record">🏆 Нов рекорд! (претходен најдобар: ${prevBest})</span>`;
    else if(prevBest > 0) overall += `<br>Најдобар резултат досега: ${Math.max(prevBest, score)}`;

    document.getElementById('overallMsg').innerHTML = overall;
}
const randomEvents = [
    { text: "Се разболе - те боли главата цел ден.", fx:{health:-10} },
    { text: "Случајно си се видел со другари по пат.", fx:{social:+8} },
    { text: "Интернетот паднал цел ден - помалку скролање, помалку стрес.", fx:{stress:-8} },
    { text: "Прекрасен сончев ден - расположението ти е малку подобро.", fx:{stress:-5, health:+3} },
    { text: "Наставник додал дополнителна домашна задача - малку повеќе стрес.", fx:{stress:+8} },
    { text: "Си спиел подобро од очекуваното - чувствуваш одмор.", fx:{sleep:+8} }
];

function maybeTriggerEvent(){
    if(Math.random() < 0.30){
        const ev = randomEvents[Math.floor(Math.random()*randomEvents.length)];
        for(const key in ev.fx){
            stats[key] = clamp(stats[key] + ev.fx[key]);
        }
        return ev;
    }
    return null;
}

document.getElementById('restartBtn').onclick = ()=>{
    els.reportScreen.classList.add('hidden');
    els.gameScreen.classList.add('hidden');
    els.charScreen.classList.remove('hidden');
    renderCharScreen();
};

document.getElementById('startBtn').onclick = ()=>{
    document.getElementById('welcomeScreen').classList.add('hidden');
    els.charScreen.classList.remove('hidden');
    renderCharScreen();
};
