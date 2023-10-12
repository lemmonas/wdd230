const input = document.querySelector('#favchap')
const button = document.querySelector('#button')
const list = document.querySelector('#list')

button.addEventListener('click', ()=>{
    if (input.value == ''){
        input.focus()
        return
    }

    let listitem = document.createElement("li")
    let deletebutton = document.createElement("button")
    listitem.textContent = input.value
    deletebutton.textContent = '❌'
    listitem.appendChild(deletebutton)
    list.appendChild(listitem)

    deletebutton.addEventListener('click', ()=>{
        listitem.remove()
    })

    input.focus()
    input.value = ''
})