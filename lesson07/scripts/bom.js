const myinput = document.querySelector("#favchap")
const mybutton = document.querySelector("#button")
const mylist = document.querySelector("#list")

const chapters = getChapterList() || [];
chapters.forEach(createItem)

function getChapterList(){
    const chapterList = localStorage.getItem('chapters');
    if (chapterList == null){
        return null
    }
    return JSON.parse(chapterList)
}

function updateLocalStorage(){
    localStorage.setItem('chapters',JSON.stringify(chapters));
}

function createItem(chapter) {
    let listitem = document.createElement("li");
    let deletebutton = document.createElement("button");
    listitem.textContent = chapter
    deletebutton.textContent = '❌'

    listitem.appendChild(deletebutton)
    mylist.appendChild(listitem)

   deletebutton.addEventListener('click', () => {
        let removeIndex = chapters.indexOf(listitem.textContent);
        chapters.splice(removeIndex, 1);
        updateLocalStorage();
        listitem.remove()
    })

    chapters.push(chapter);
    updateLocalStorage()
}

mybutton.addEventListener('click', () => {
    if (myinput.value == '') {
        myinput.focus()
        return
    }

    createItem(myinput.value);
    myinput.focus()
    myinput.value = ''
})