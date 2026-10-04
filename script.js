 let vakansiyalarMaqomi = JSON.parse(localStorage.getItem('vakansiyalarMaqomi')) || [
    { id: 1, title: "Senior Frontend Developer", company: "TechCorp LLC", category: "IT", location: "Toshkent (Masofaviy)", type: "To'liq stavka", salary: "30 000 000 - 48 000 000 so'm", saved: false },
    { id: 2, title: "UI/UX Product Designer", company: "Creative Studio", category: "Dizayn", location: "Toshkent", type: "To'liq stavka", salary: "$15 000 000 - 22 000 000 so'm", saved: false },
    { id: 3, title: "Digital Marketing Lead", company: "Growth Agency", category: "Marketing", location: "Samarqand", type: "Yarim stavka", salary: "11 000 000 - $16 000 000 so'm", saved: false },
    { id: 4, title: "Finansist & Analitik", company: "Finans Consult", category: "Moliya", location: "Toshkent", type: "To'liq stavka", salary: "20 000 000 - 28 000 000 so'm", saved: false },
    { id: 5, title: "React Native Dasturchi", company: "Mobile Solutions", category: "IT", location: "Masofaviy", type: "Kontrakt", salary: "24 000 000 - 35 000 000 so'm", saved: false },
    { id: 6, title: "Junior Python Developer", company: "DataLab", category: "IT", location: "Toshkent", type: "Yarim stavka", salary: "8 000 000 - 13 000 000 so'm", saved: false },
    { id: 7, title: "UI/UX Product Designer", company: "Uzum Market", category: "Dizayn",location: "Toshkent",type:"To'liq stavka", salary: "12 000 000 - 18 000 000 so'm", saved: false },
    { id: 8, title: "Senior SMM Specialist", company: "Click", category: "Marketing", location:"Toshkent", type: "To'liq stavka", salary: "9 000 000 - 14 000 000 so'm", saved: false },
    { id: 9, title: "Financial Analyst", company: "Tenge Bank", category: "Moliya", location: "Toshkent", type: "To'liq stavka", salary: "10 000 000 - 16 000 000 so'm", saved: false },
    { id: 10, title: "Bosh Buxgalter", company: "Anglesey Food (Korzinka)", category: "Moliya", location: "Toshkent",type: "To'liq stavka",salary: "15 000 000 - 22 000 000 so'm", saved: false},
];

const jobsContainer = document.getElementById('jobsContainer');
const paginationContainer = document.getElementById('paginationContainer');
const qidiruvInput = document.getElementById('qidiruvInput');
const hududInput = document.getElementById('hududInput');
const qidiruvTugma = document.getElementById('qidiruvTugma');
const filtrniTozalashTugma = document.getElementById('filtrniTozalashTugma');
const kategoriyaKartalar = document.querySelectorAll('.category-card');
const turFiltri = document.getElementById('turFiltri');

const arizaModal = document.getElementById('arizaModal');
const arizaYopish = document.getElementById('arizaYopish');
const modalVakansiyaNomi = document.getElementById('modalVakansiyaNomi');
const arizaForma = document.getElementById('arizaForma');

const batafsilModal = document.getElementById('batafsilModal');
const batafsilYopish = document.getElementById('batafsilYopish');
const batafsilSarlavha = document.getElementById('batafsilSarlavha');
const batafsilKompaniya = document.getElementById('batafsilKompaniya');
const batafsilKat = document.getElementById('batafsilKat');
const batafsilJoy = document.getElementById('batafsilJoy');
const batafsilTur = document.getElementById('batafsilTur');
const batafsilMaosh = document.getElementById('batafsilMaosh');
const modalArizaOchishBtn = document.getElementById('modalArizaOchishBtn');

let joriyTanlanganIshTitle = "";

const elonModal = document.getElementById('elonModal');
const elonQoshishTugma = document.getElementById('elonQoshishTugma');
const elonYopish = document.getElementById('elonYopish');
const elonForma = document.getElementById('elonForma');

const saqlanganlarHavolasi = document.getElementById('saqlanganlarHavolasi');
const saqlanganlarSoni = document.getElementById('saqlanganlarSoni');
let faqatSaqlanganlar = false;

let joriySahifa = 1;
const harSahifada = 4;

function mahalliyXotiragaSaqlash() {
    localStorage.setItem('vakansiyalarMaqomi', JSON.stringify(vakansiyalarMaqomi));
}

function xabarKorsat(xabar) {
    const konteyner = document.getElementById('toastContainer');
    if (!konteyner) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${xabar}</span>`;
    konteyner.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// Kategoriya bo'yicha mos ikonka tanlash funksiyasi
function kategoriyaIkonkasi(kategoriya) {
    switch(kategoriya) {
        case 'IT': return '<i class="fa-solid fa-code"></i> IT';
        case 'Dizayn': return '<i class="fa-solid fa-palette"></i> Dizayn';
        case 'Marketing': return '<i class="fa-solid fa-bullhorn"></i> Marketing';
        case 'Moliya': return '<i class="fa-solid fa-chart-pie"></i> Moliya';
        default: return `<i class="fa-solid fa-briefcase"></i> ${kategoriya}`;
    }
}
 function vakansiyalarniChizish(ishlar) {
    jobsContainer.innerHTML = '';
    
    if (ishlar.length === 0) {
        jobsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">Hech qanday vakansiya topilmadi.</p>`;
        paginationContainer.innerHTML = '';
        return;
    }

    const boshlanishIndex = (joriySahifa - 1) * harSahifada;
    const tugashIndex = boshlanishIndex + harSahifada;
    const bolinganIshlar = ishlar.slice(boshlanishIndex, tugashIndex);

    bolinganIshlar.forEach(ish => {
        const karta = document.createElement('div');
        karta.className = 'job-card animate-on-scroll';

        karta.innerHTML = `
            <button class="save-btn ${ish.saved ? 'saved' : ''}" onclick="saqlashniOzgartirish(${ish.id})">
                <i class="fa-${ish.saved ? 'solid' : 'regular'} fa-bookmark"></i>
            </button>
            <div class="job-header">
                <div class="job-title">
                    <h3>${ish.title}</h3>
                    <span class="company-name">${ish.company}</span>
                </div>
                <span class="job-badge">${kategoriyaIkonkasi(ish.category)}</span>
            </div>
            <div class="job-details">
                <span><i class="fa-solid fa-location-dot"></i> ${ish.location}</span>
                <span><i class="fa-solid fa-briefcase"></i> ${ish.type}</span>
            </div>
            <div class="job-footer">
                <span class="salary">${ish.salary}</span>
                <div class="job-actions">
                    <button class="btn-outline batafsil-btn" data-id="${ish.id}" style="padding: 6px 12px; font-size: 12px;">Batafsil</button>
                    <button class="btn-primary ariza-berish-btn" data-title="${ish.title}" style="padding: 6px 14px; font-size: 12px;">Ariza</button>
                </div>
            </div>
        `;
        jobsContainer.appendChild(karta);
    });

    // Yangi qo'shilgan kartalarga Intersection Observer ulash
    

    document.querySelectorAll('.batafsil-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const topilganIsh = vakansiyalarMaqomi.find(item => item.id === id);
            if (topilganIsh) {
                batafsilSarlavha.textContent = topilganIsh.title;
                batafsilKompaniya.textContent = topilganIsh.company;
                batafsilKat.textContent = topilganIsh.category;
                batafsilJoy.textContent = topilganIsh.location;
                batafsilTur.textContent = topilganIsh.type;
                batafsilMaosh.textContent = topilganIsh.salary;
                joriyTanlanganIshTitle = topilganIsh.title;
                batafsilModal.style.display = 'flex';
            }
        });
    });

    document.querySelectorAll('.ariza-berish-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            modalVakansiyaNomi.textContent = e.target.getAttribute('data-title');
            arizaModal.style.display = 'flex';
        });
    });

    sahifalashniChizish(ishlar.length);
    saqlanganlarSoniYangilash();
}

function sahifalashniChizish(jamiIshlar) {
    paginationContainer.innerHTML = '';
    const jamiSahifalar = Math.ceil(jamiIshlar / harSahifada);
    if (jamiSahifalar <= 1) return;

    for (let i = 1; i <= jamiSahifalar; i++) {
        const tugma = document.createElement('button');
        tugma.className = `page-btn ${i === joriySahifa ? 'active' : ''}`;
        tugma.textContent = i;
        tugma.addEventListener('click', () => {
            joriySahifa = i;
            vakansiyalarniFiltrleesh();
            document.getElementById('vakansiyalar').scrollIntoView({ behavior: 'smooth' });
        });
        paginationContainer.appendChild(tugma);
    }
}

vakansiyalarniChizish(vakansiyalarMaqomi);
 function vakansiyalarniFiltrleesh() {
    const sorov = qidiruvInput.value.toLowerCase();
    const hududSorov = hududInput.value.toLowerCase();
    const tanlanganTur = turFiltri.value;

    let natijalar = vakansiyalarMaqomi.filter(ish => {
        const mosSorov = ish.title.toLowerCase().includes(sorov) || ish.company.toLowerCase().includes(sorov);
        const mosHudud = ish.location.toLowerCase().includes(hududSorov);
        const mosTur = tanlanganTur === "" || ish.type === tanlanganTur;
        const mosSaqlangan = !faqatSaqlanganlar || ish.saved;
        return mosSorov && mosHudud && mosTur && mosSaqlangan;
    });

    vakansiyalarniChizish(natijalar);
}

window.tezkorQidiruv = function(kalitSoz) {
    qidiruvInput.value = kalitSoz;
    joriySahifa = 1;
    vakansiyalarniFiltrleesh();
    document.getElementById('vakansiyalar').scrollIntoView({ behavior: 'smooth' });
}

qidiruvTugma.addEventListener('click', () => { joriySahifa = 1; vakansiyalarniFiltrleesh(); });
qidiruvInput.addEventListener('keyup', (e) => { if(e.key === 'Enter') { joriySahifa = 1; vakansiyalarniFiltrleesh(); } });
hududInput.addEventListener('keyup', (e) => { if(e.key === 'Enter') { joriySahifa = 1; vakansiyalarniFiltrleesh(); } });
turFiltri.addEventListener('change', () => { joriySahifa = 1; vakansiyalarniFiltrleesh(); });

kategoriyaKartalar.forEach(karta => {
    karta.addEventListener('click', () => {
        const kat = karta.getAttribute('data-category');
        faqatSaqlanganlar = false;
        qidiruvInput.value = '';
        hududInput.value = '';
        turFiltri.value = '';
        joriySahifa = 1;
        vakansiyalarniChizish(vakansiyalarMaqomi.filter(i => i.category === kat));
        document.getElementById('vakansiyalar').scrollIntoView({ behavior: 'smooth' });
    });
});

window.saqlashniOzgartirish = function(id) {
    const ish = vakansiyalarMaqomi.find(j => j.id === id);
    if(ish) {
        ish.saved = !ish.saved;
        mahalliyXotiragaSaqlash();
        vakansiyalarniFiltrleesh();
        xabarKorsat(ish.saved ? "Vakansiya saqlanganlarga qo'shildi!" : "Saqlanganlardan olib tashlandi.");
    }
}

function saqlanganlarSoniYangilash() {
    saqlanganlarSoni.textContent = vakansiyalarMaqomi.filter(j => j.saved).length;
}

saqlanganlarHavolasi.addEventListener('click', (e) => {
    e.preventDefault();
    faqatSaqlanganlar = !faqatSaqlanganlar;
    saqlanganlarHavolasi.style.color = faqatSaqlanganlar ? 'var(--accent)' : 'var(--text-muted)';
    joriySahifa = 1;
    vakansiyalarniFiltrleesh();
    document.getElementById('vakansiyalar').scrollIntoView({ behavior: 'smooth' });
});

filtrniTozalashTugma.addEventListener('click', () => {
    qidiruvInput.value = '';
    hududInput.value = '';
    turFiltri.value = '';
    faqatSaqlanganlar = false;
    saqlanganlarHavolasi.style.color = 'var(--text-muted)';
    joriySahifa = 1;
    vakansiyalarniChizish(vakansiyalarMaqomi);
});

batafsilYopish.addEventListener('click', () => batafsilModal.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target === batafsilModal) batafsilModal.style.display = 'none'; });

modalArizaOchishBtn.addEventListener('click', () => {
    batafsilModal.style.display = 'none';
    modalVakansiyaNomi.textContent = joriyTanlanganIshTitle;
    arizaModal.style.display = 'flex';
});

arizaYopish.addEventListener('click', () => arizaModal.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target === arizaModal) arizaModal.style.display = 'none'; });

arizaForma.addEventListener('submit', (e) => {
    e.preventDefault();
    arizaModal.style.display = 'none';
    arizaForma.reset();
    xabarKorsat("Arizangiz muvaffaqiyatli yuborildi!");
});

elonQoshishTugma.addEventListener('click', () => {
    const isLogin = localStorage.getItem('ishtopAuth');
    if (isLogin === 'true') {
        elonModal.style.display = 'flex';
    } else {
        alert("E'lon berish uchun oldin tizimga kiring!");
        window.location.href = 'login.html';
    }
});
 elonYopish.addEventListener('click', () => elonModal.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target === elonModal) elonModal.style.display = 'none'; });

elonForma.addEventListener('submit', (e) => {
    e.preventDefault();
    const yangiIsh = {
        id: Date.now(),
        title: document.getElementById('elonSarlavha').value,
        company: document.getElementById('elonKompaniya').value,
        category: document.getElementById('elonKategoriya').value,
        location: document.getElementById('elonManzil').value,
        type: document.getElementById('elonTur').value,
        salary: document.getElementById('elonMaosh').value,
        saved: false
    };

    vakansiyalarMaqomi.unshift(yangiIsh);
    mahalliyXotiragaSaqlash();
    joriySahifa = 1;
    vakansiyalarniChizish(vakansiyalarMaqomi);
    elonModal.style.display = 'none';
    elonForma.reset();
    xabarKorsat("Yangi ish e'loni muvaffaqiyatli joylandi!");
});

// --- ANIMATSIYALAR VA SANAGICH (COUNTER) JAVASCRIPT QISMI ---

// 1. Statistikani 0 dan boshlab animatsiya bilan sanash
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 50; // Tezlikni sozlash

        const updateCount = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count).toLocaleString();
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
}

// 2. Scroll qilinganda elementlarni chiqib kelishini boshqarish (Intersection Observer)
const observer = {
    observeElements: function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const observerInstance = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Agar statistika bloki ko'rinsa, sanagichni ishga tushirish
                    if (entry.target.querySelector('.counter')) {
                        startCounters();
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        elements.forEach(el => observerInstance.observe(el));
    }
};

// Sahifa yuklanganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    observer.observeElements();
});
// Vakansiyani saqlash (yoki saqlanganlardan o'chirish)
function toggleSaveJob(jobId, jobTitle, jobCompany, jobLocation, jobType) {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    
    // O'sha ish oldin saqlanganmi yoki yo'qligini tekshiramiz
    let index = savedJobs.findIndex(job => job.id === jobId);
    
    if (index === -1) {
        // Agar saqlanmagan bo'lsa, ro'yxatga qo'shamiz
        savedJobs.push({ id: jobId, title: jobTitle, company: jobCompany, location: jobLocation, type: jobType });
        alert("Vakansiya saqlanganlarga qo'shildi! ⭐");
    } else {
        // Agar allaqachon saqlangan bo'lsa, ro'yxatdan olib tashlaymiz
        savedJobs.splice(index, 1);
        alert("Vakansiya saqlanganlardan olib tashlandi.");
    }
    
    // LocalStorage ga yangilangan ma'lumotni yozamiz
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    
    // Agar saqlanganlar sahifasida bo'lsa, ro'yxatni yangilaymiz
    if (typeof renderSavedJobs === 'function') {
        renderSavedJobs();
    }
}
// Saqlangan vakansiyalarni ekranga chiqarish funksiyasi
function renderSavedJobs() {
    const container = document.getElementById('savedJobsContainer');
    if (!container) return; // Agar bu boshqa sahifa bo'lsa va bu id topilmasa, to'xtaydi

    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

    // Agar saqlangan ishlar bo'lmasa
    if (savedJobs.length === 0) {`
        container.innerHTML = 
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
                <h3>Hozircha saqlangan vakansiyalar yo'q 📭</h3>
                <p>O'zingizga yoqqan istalgan ish e'lonidagi saqlash tugmasini bosing.</p>
            </div>
        `;
        return;
    }

    // Saqlangan ishlar bo'lsa, ularni kartochka ko'rinishida chiqaramiz
    container.innerHTML = '';
    
    savedJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card'; // Sizning vakansiya kartochka klassingiz
        
        jobCard.innerHTML =`
            <h3>${job.title}</h3>
            <p style="color: #3b82f6; font-weight: 500;">${job.company}</p>
            <p style="color: #94a3b8; font-size: 14px;">📍 ${job.location} • 🕒 ${job.type}</p>
            <button onclick="removeSavedJob('${job.id}')" style="background: #ef4444; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; margin-top: 10px;">
                O'chirish ❌
            </button>
        `;
        
        container.appendChild(jobCard);
    });
}

// Saqlanganlar ro'yxatidan bittasini o'chirish
function removeSavedJob(jobId) {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    savedJobs = savedJobs.filter(job => job.id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    renderSavedJobs(); // Ro'yxatni yangilash
}

// Sahifa yuklanganda avtomatik ishga tushishi uchun
document.addEventListener('DOMContentLoaded', () => {
    renderSavedJobs();
});
