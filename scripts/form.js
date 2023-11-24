const rating = document.getElementById("rating")
rating.addEventListener('change', ()=>{
    document.getElementById("currentrating").innerHTML = rating.value
})