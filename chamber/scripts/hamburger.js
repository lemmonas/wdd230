const hideButton = document.querySelector('.menu-close');
const showButton = document.querySelector('.menu-open');
const navigation = document.querySelector('.nav');

hideButton.addEventListener('click', () => {
	
	hideButton.classList.toggle('open');
	showButton.classList.toggle('open');
	navigation.classList.toggle('open');
});

showButton.addEventListener('click', () => {
	
	hideButton.classList.toggle('open');
	showButton.classList.toggle('open');
	navigation.classList.toggle('open');
});