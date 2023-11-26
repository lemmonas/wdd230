const banner = document.getElementById('banner');
const close = document.getElementById('close-banner');

close.addEventListener('click', ()=>{
    banner.style.display = 'none';
});

function showBanner() {
    const day = new Date().getDay();
    if (day == 1 || day == 2 || day == 3) {
        banner.style.display = 'block';
    }
}

showBanner();