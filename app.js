const STORAGE_KEY = 'awayFromHomeRoutine.v1';
let progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
const key = (id,i)=>`${id}:${i}`;

const art = (type)=>{
  const c='stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"';
  const head=(x,y)=>`<circle cx="${x}" cy="${y}" r="10" fill="currentColor"/>`;
  const floor=`<path d="M16 132H164" ${c} opacity=".22"/>`;
  const svg=(body)=>`<svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg">${floor}${body}</svg>`;
  const m={
    warmup:svg(`${head(90,42)}<path d="M90 55v48M90 68L48 52M90 68l42-16M76 103l-24 26M104 103l24 26" ${c}/><path d="M42 34l18 10M138 34l-18 10" ${c} opacity=".5"/>`),
    pushup:svg(`${head(42,86)}<path d="M54 88h78M58 93l-18 28M132 88l24 28M62 122h86" ${c}/><path d="M74 80c22 12 38 12 58 0" ${c} opacity=".45"/>`),
    shoulderTap:svg(`${head(46,76)}<path d="M58 80h78M58 84l-20 34M136 80l22 34M72 118h76" ${c}/><path d="M80 84l38 22" ${c}/><circle cx="118" cy="106" r="5" fill="currentColor"/>`),
    pike:svg(`${head(70,92)}<path d="M78 100l32-54M110 46l42 74M78 102l-40 24M150 120H96" ${c}/><path d="M98 70c16 2 26 9 34 22" ${c} opacity=".45"/>`),
    superman:svg(`${head(54,86)}<path d="M64 90h54M40 82l32 12M112 90l38-20M74 100l-35 24M112 100l34 22" ${c}/>`),
    diamond:svg(`${head(42,86)}<path d="M54 88h76M60 92l-18 30M130 88l22 30M74 120h72" ${c}/><path d="M84 96l12 10 12-10" ${c}/>`),
    hollow:svg(`${head(58,92)}<path d="M70 98c30 14 60 12 88-6M72 100l-38 18M130 96l28-28" ${c}/>`),
    sideplank:svg(`${head(56,78)}<path d="M66 84h74M70 88l-18 36M140 84l20 34M58 124h96" ${c}/><path d="M92 84l-8-36" ${c}/>`),
    squat:svg(`${head(90,52)}<path d="M90 64v36M90 98l-42 20M90 98l42 20M72 78l-28 24M108 78l28 24" ${c}/><path d="M56 118h30M104 118h30" ${c}/>`),
    lunge:svg(`${head(88,48)}<path d="M88 60v42M88 102l-44 24M88 102l54 8M72 78l-28 18M104 78l28 20" ${c}/><path d="M38 126h34M126 112h34" ${c}/>`),
    singleRdl:svg(`${head(70,52)}<path d="M74 64l38 38M112 102l-58 20M112 102l42-34M90 84l-40 22" ${c}/>`),
    bridge:svg(`${head(48,102)}<path d="M60 104c30-34 70-34 100 0M78 105l-20 24M130 103l22 26" ${c}/><path d="M110 82l18-36" ${c}/>`),
    calf:svg(`${head(90,42)}<path d="M90 54v58M74 70l-22 28M106 70l22 28M82 112l-8 20M98 112l8 20" ${c}/><path d="M64 132h24M92 132h24M72 122c12-10 24-10 36 0" ${c}/>`),
    reversecrunch:svg(`${head(54,100)}<path d="M66 106h52M112 106l30-34M142 72l18 6M80 116l-20 16M106 116l-10 16" ${c}/>`),
    decline:svg(`${head(42,82)}<path d="M54 84h78M58 88l-18 34M132 84l26 12M76 122h46" ${c}/><path d="M128 96h34v28" ${c} opacity=".55"/>`),
    goodmorning:svg(`${head(74,52)}<path d="M78 64l34 40M112 104l-58 18M86 82l-34 20M116 104l20 26" ${c}/><path d="M48 44h76" ${c} opacity=".55"/>`),
    climber:svg(`${head(44,82)}<path d="M56 86h72M56 90l-20 32M128 86l24 26M70 122h26M90 96l42 32" ${c}/>`),
    archer:svg(`${head(44,86)}<path d="M56 88h84M58 92l-18 30M140 88l24 28M68 122h84" ${c}/><path d="M74 88l-16 24M108 88l34 4" ${c}/>`),
    ytw:svg(`${head(90,62)}<path d="M90 74v38M90 82L56 48M90 82l34-34M78 112l-20 20M102 112l20 20" ${c}/><path d="M55 48l-14-14M125 48l14-14" ${c} opacity=".5"/>`),
    rocks:svg(`${head(58,94)}<path d="M70 100c30 16 60 13 88-7M72 100l-38 18M130 96l28-30" ${c}/><path d="M48 122c28 8 70 8 98 0" ${c} opacity=".35"/>`)
  };
  return m[type] || m.warmup;
};

const workouts=[
{id:'day1',day:'Monday',title:'Upper + Core',accent:'#2563eb',icon:'💪',subtitle:'Chest, shoulders, triceps and core',focus:'Controlled tempo and clean upper-body strength',exercises:[
['warmup','Warm-up circuit','2 rounds','6–8 min','30 s','Jumping jacks, arm circles, slow squats, inchworms, shoulder taps and glute bridges.'],
['pushup','Push-up','4 sets','8–15 reps','60–90 s','Lower under control for 3 seconds. Add a 2-second pause at the bottom if it feels easy.'],
['shoulderTap','High plank shoulder taps','4 sets','10–16 / side','45 s','Keep hips quiet and brace the core.'],
['pike','Pike push-up','4 sets','6–12 reps','60–90 s','Hips high, head moves toward the floor, focus on shoulders.'],
['superman','Superman hold','4 sets','25–40 s','45 s','Squeeze glutes and upper back; keep neck neutral.'],
['diamond','Diamond / close-grip push-up','3 sets','6–12 reps','60 s','Triceps focus. Use close-grip push-ups if diamond is too hard.'],
['hollow','Hollow body hold','3 sets','20–40 s','45 s','Lower back glued to the floor.'],
['sideplank','Side plank','3 sets','30–45 s / side','30 s','Stack shoulders and hips. Do not let the hip drop.']]
},
{id:'day2',day:'Tuesday',title:'Lower + Core',accent:'#16a34a',icon:'🦵',subtitle:'Legs, glutes, calves and abs',focus:'Single-leg control and lower-body tension',exercises:[
['warmup','Warm-up circuit','2 rounds','6–8 min','30 s','Easy pulse raiser plus hip, knee and ankle mobility.'],
['squat','Paused bodyweight squat','4 sets','12–20 reps','60–90 s','Pause 2 seconds at the bottom. Keep knees tracking over toes.'],
['lunge','Reverse lunge or Bulgarian split squat','4 sets','8–12 / leg','60–90 s','Use a chair/sofa for Bulgarian if available; otherwise reverse lunge.'],
['singleRdl','Single-leg Romanian deadlift','3 sets','10–15 / leg','60 s','Hinge from the hip and keep the standing leg stable.'],
['bridge','Single-leg glute bridge','3 sets','10–15 / leg','45–60 s','Drive through the heel and squeeze glutes at the top.'],
['calf','Single-leg calf raise','4 sets','12–25 / leg','45 s','Full stretch at bottom and full contraction at top.'],
['reversecrunch','Reverse crunch','3 sets','10–20 reps','45 s','Curl the pelvis up; avoid swinging the legs.']]
},
{id:'day3',day:'Thursday',title:'Full Body Strength',accent:'#ea580c',icon:'🔥',subtitle:'Upper, lower and conditioning',focus:'Whole-body strength without destroying recovery',exercises:[
['warmup','Warm-up circuit','2 rounds','6–8 min','30 s','Move smoothly and prepare wrists, shoulders, hips and ankles.'],
['decline','Decline push-up or slow push-up','4 sets','8–15 reps','60–90 s','Use decline only if you have a safe place for your feet. Otherwise use slow push-ups.'],
['squat','Slow bodyweight squat','4 sets','12–20 reps','60 s','Three seconds down, strong drive up.'],
['pike','Pike push-up','3 sets','6–12 reps','60–90 s','Keep the torso as vertical as possible.'],
['lunge','Alternating lunge','3 sets','10–14 / leg','60 s','Controlled step, stable knee and upright torso.'],
['diamond','Close-grip push-up','3 sets','6–12 reps','60 s','Elbows close to the ribs, triceps focus.'],
['goodmorning','Bodyweight good morning','3 sets','15–20 reps','45 s','Hinge at the hips and feel hamstrings.'],
['climber','Controlled mountain climbers','3 sets','30–45 s','45 s','Keep quality high; do not turn it into messy cardio.']]
},
{id:'day4',day:'Saturday',title:'Upper + Core B',accent:'#7c3aed',icon:'⚡',subtitle:'Push-up variations, shoulders and core',focus:'Upper-body skill, shoulder stability and trunk control',exercises:[
['warmup','Warm-up circuit','2 rounds','6–8 min','30 s','Light cardio plus shoulder mobility and plank activation.'],
['pushup','Push-up ladder','5 sets','6–12 reps','45–60 s','Start easy and increase reps if form stays clean.'],
['pike','Pike push-up','4 sets','6–12 reps','60–90 s','Main shoulder strength movement.'],
['archer','Archer push-up regression','3 sets','5–8 / side','60–90 s','Use a wide push-up if archer is too hard.'],
['ytw','Prone Y-T-W','3 sets','8 + 8 + 8','45 s','Lie face down and raise arms in Y, T and W shapes. Rear delts and posture.'],
['rocks','Hollow rocks or hollow hold','3 sets','20–40 s','45 s','Use the hold if rocks break form.'],
['sideplank','Side plank with rotation','3 sets','8–12 / side','45 s','Rotate through the upper back while keeping hips stable.']]
}
];

const week=[['Monday','Upper + Core','Workout 1','Strength and core','blue'],['Tuesday','Lower + Core','Workout 2','Legs and abs','green'],['Wednesday','Active recovery','30–45 min','Walk + mobility','gray'],['Thursday','Full Body Strength','Workout 3','Whole-body control','orange'],['Friday','Rest or walk','20–40 min','Stay loose','gray'],['Saturday','Upper + Core B','Workout 4','Shoulders and core','purple'],['Sunday','Rest','Recovery','Sleep and reset','gray']];
const doneCount=w=>w.exercises.filter((_,i)=>progress[key(w.id,i)]).length;
const total=workouts.reduce((s,w)=>s+w.exercises.length,0);

function renderWeek(){document.getElementById('weekGrid').innerHTML=week.map(d=>`<article class="day-card"><span class="tag ${d[4]}">${d[2]}</span><strong>${d[0]}</strong><h3>${d[1]}</h3><p>${d[3]}</p></article>`).join('')}
function renderWorkouts(){document.getElementById('workoutGrid').innerHTML=workouts.map(w=>{const d=doneCount(w),p=Math.round(d/w.exercises.length*100);return `<article class="workout-card" style="--accent:${w.accent}"><div><div class="workout-icon">${w.icon}</div><h3>${w.day} — ${w.title}</h3><p>${w.subtitle}</p><div class="pills"><span class="pill">35–50 min</span><span class="pill">${w.exercises.length} exercises</span></div><div class="track"><div class="fill" style="width:${p}%"></div></div><small>${d}/${w.exercises.length} completed</small></div><button class="open" data-session="${w.id}">Open workout</button></article>`}).join('')}
function exerciseCard(w,e,i){const k=key(w.id,i);return `<article class="exercise-card" style="--accent:${w.accent}"><div class="art" aria-label="Illustration of ${e[1]}">${art(e[0])}</div><div><div class="exercise-top"><h3>${e[1]}</h3><label class="check">Done <input type="checkbox" data-check="${k}" ${progress[k]?'checked':''}></label></div><p class="cue"><strong>${e[2]}</strong></p><div class="pills"><span class="pill">${e[3]}</span><span class="pill">Rest: ${e[4]}</span></div><div class="note">${e[5]}</div></div></article>`}
function renderSession(id){const w=workouts.find(x=>x.id===id)||workouts[0];const d=doneCount(w),p=Math.round(d/w.exercises.length*100);document.getElementById('session').innerHTML=`<section class="session-head" style="--accent:${w.accent}"><div><p class="eyebrow">${w.day} session</p><h2>${w.title}</h2><p>${w.subtitle}. ${w.focus}.</p><div class="pills"><span class="pill">35–50 min</span><span class="pill">${d}/${w.exercises.length} done</span><span class="pill">3-second controlled lowering</span></div></div><div class="ring" style="--p:${p};color:${w.accent}"><span>${p}%</span></div></section><div class="exercise-list">${w.exercises.map((e,i)=>exerciseCard(w,e,i)).join('')}</div>`}
function updateSummary(){const d=workouts.reduce((s,w)=>s+doneCount(w),0),p=Math.round(d/total*100);document.getElementById('percent').textContent=`${p}%`;document.getElementById('ring').style.setProperty('--p',p);document.getElementById('summary').textContent=d?`${d}/${total} exercises completed this travel week.`:'No exercises checked yet.'}
function route(){const h=location.hash.replace('#','')||'home';document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));if(h.startsWith('session-')){document.getElementById('sessionPage').classList.add('active');renderSession(h.replace('session-',''))}else if(h==='workouts'){document.getElementById('workoutsPage').classList.add('active');renderWorkouts()}else{document.getElementById('homePage').classList.add('active')}document.getElementById('navLinks').classList.remove('open');updateSummary()}
document.addEventListener('click',e=>{const s=e.target.closest('[data-session]');if(s)location.hash=`session-${s.dataset.session}`;const r=e.target.closest('[data-route]');if(r)location.hash=r.dataset.route});
document.addEventListener('change',e=>{if(e.target.matches('[data-check]')){progress[e.target.dataset.check]=e.target.checked;save();route()}});
document.getElementById('resetBtn').addEventListener('click',()=>{if(confirm('Reset all checkboxes on this device?')){progress={};save();route()}});
document.getElementById('menuBtn').addEventListener('click',()=>document.getElementById('navLinks').classList.toggle('open'));
window.addEventListener('hashchange',route);renderWeek();renderWorkouts();updateSummary();route();
