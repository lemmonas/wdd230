let date = new Date();
let year = date.getFullYear();

document.querySelector('#yr').textContent = year;
document.querySelector('#lastModified').innerHTML = 'Last Modified: ' + document.lastModified;