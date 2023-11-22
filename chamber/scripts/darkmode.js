const darkmode = document.querySelector('#dark-mode');
const bodyele = document.querySelector("body");

darkmode.addEventListener('click', ()=>{
    if (darkmode.textContent == 'DARK'){
        document.documentElement.style.setProperty('--background-color', 'black');
        document.documentElement.style.setProperty('--nav-background-color', '#031299');
        document.documentElement.style.setProperty('--nav-text-color', '#f2f3ae');
        document.documentElement.style.setProperty('--nav-hover-color', '#1c2fd9');
        document.documentElement.style.setProperty('--nav-text-hover-color', '#f2f3ae');
        document.documentElement.style.setProperty('--call-to-action-background', '#031299');
        document.documentElement.style.setProperty('--call-to-action-text', '#f2f3ae');
        document.documentElement.style.setProperty('--logo-background-color', '#031299');
        darkmode.textContent = 'LIGHT';
    }else{
        document.documentElement.style.setProperty('--background-color', '#1c2fd9');
        document.documentElement.style.setProperty('--nav-background-color', '#4ee7f9');
        document.documentElement.style.setProperty('--nav-text-color', 'black');
        document.documentElement.style.setProperty('--nav-hover-color', '#f2f3ae');
        document.documentElement.style.setProperty('--nav-text-hover-color', '#1c2fd9');
        document.documentElement.style.setProperty('--call-to-action-background', '#f2f3ae');
        document.documentElement.style.setProperty('--call-to-action-text', '#1c2fd9');
        document.documentElement.style.setProperty('--logo-background-color', 'none');
        darkmode.textContent = 'DARK';
    }
})