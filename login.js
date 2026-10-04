const kirishTabBtn = document.getElementById('kirishTabBtn');
const royxatTabBtn = document.getElementById('royxatTabBtn');
const formaSarlavha = document.getElementById('formaSarlavha');
const formaMatn = document.getElementById('formaMatn');
const ismGroup = document.getElementById('ismGroup');
const submitBtn = document.getElementById('submitBtn');
const authForma = document.getElementById('authForma');

let ismRuxsat = false; 

function xabarKorsat(xabar) {
    const konteyner = document.getElementById('toastContainer');
    if(!konteyner) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${xabar}</span>`;
    konteyner.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

kirishTabBtn.addEventListener('click', () => {
    ismRuxsat = false;
    kirishTabBtn.classList.add('active');
    royxatTabBtn.classList.remove('active');
    ismGroup.style.display = 'none';
    formaSarlavha.textContent = "Tizimga kirish";
    formaMatn.textContent = "E'lon berish va boshqarish uchun profilingizga kiring";
    submitBtn.textContent = "Kirish";
});

royxatTabBtn.addEventListener('click', () => {
    ismRuxsat = true;
    royxatTabBtn.classList.add('active');
    kirishTabBtn.classList.remove('active');
    ismGroup.style.display = 'block';
    formaSarlavha.textContent = "Ro'yxatdan o'tish";
    formaMatn.textContent = "Yangi akkaunt oching va e'lon bering";
    submitBtn.textContent = "Ro'yxatdan o'tish";
});

authForma.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Foydalanuvchi tizimga kirdi deb belgilaymiz
    localStorage.setItem('ishtopAuth', 'true');

    if(ismRuxsat) {
        xabarKorsat("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    } else {
        xabarKorsat("Tizimga muvaffaqiyatli kirdingiz!");
    }

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
});