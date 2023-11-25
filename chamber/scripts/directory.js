var gridSelector = document.querySelector('#directory-grid');
var listSelector = document.querySelector('#directory-list');
var directoryData = document.querySelector('#directory-data');

gridSelector.addEventListener('click', ()=>{
    if (!gridSelector.classList.contains('active')){    
        gridSelector.classList.add('active');
        listSelector.classList.remove('active');
        directoryData.classList.add('directory-cards')
        directoryData.classList.remove('directory-list')
    }
});

listSelector.addEventListener('click', ()=>{
    if (!listSelector.classList.contains('active')){
        listSelector.classList.add('active');
        gridSelector.classList.remove('active');
        directoryData.classList.add('directory-list')
        directoryData.classList.remove('directory-cards')
    }
});

const url = "./data/members.json";

const displayMembers = (members) => {
  const cards = document.querySelector(".directory-cards");

  members.forEach((business) => {
    let card = document.createElement("section");
    card.innerHTML = `
    <img src="${business.image}" loading="lazy">
    <p>${business.name}</p>
    <p>${business.address}</p>
    <p><a class="card-button" href="${business.website}">Website</a></p>
    `;
    cards.appendChild(card);
  });
  
};

async function getBusinessData() {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    displayMembers(data.members);
  } else {
    console.error("Data couldn't be loaded");
    const cards = document.querySelector("directory-cards");
    cards.innerHTML = "<section><h1>Data couldn't be loaded</h1></section>";
  }
}

getBusinessData();