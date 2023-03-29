'use strict'

const form = document.querySelector("form")
const lista = document.querySelector(".lista")
const template = document.querySelector('.template').content
const fragment = document.createDocumentFragment()

let tareas = {}

document.addEventListener('DOMContentLoaded', (e) => {
    if(localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    listarTareas()
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    agregarTarea()
})

lista.addEventListener('click', (e) => {
    boton(e)
})

const agregarTarea = e => {
    const texto = input.value
    if(texto.trim() === '') {
        return
    }
    
    const tarea = {
        id: Date.now(),
        texto: texto,
        estado: false,
    }

    tareas[tarea.id] = tarea
    listarTareas()
    form.reset()
} 

const listarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
    
    if (Object.values(tareas).length === 0) {
        lista.innerHTML = `
        <h5>Sin tareas pendientes!</h5>
        `
        return
    }
    lista.innerHTML = ""

    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if (tarea.estado === true) {
            clone.querySelector('.fa-regular').classList.replace('fa-circle', 'fa-circle-check')
            clone.querySelector('p').style.textDecoration = 'line-through'
            clone.querySelector('li').style.backgroundColor = 'grey'
        }

        clone.querySelectorAll('.fa-regular')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fa-solid')[0].dataset.id = tarea.id
        fragment.appendChild(clone)
    })

    lista.appendChild(fragment)
}

const boton = e => {
    if(e.target.classList.contains('fa-circle')){
        tareas[e.target.dataset.id].estado = true
        console.log(e.target.dataset.id);
        listarTareas()
    }
    if(e.target.classList.contains('fa-delete-left')){
        delete tareas[e.target.dataset.id]
        console.log(tareas);
        listarTareas()
    }
    if(e.target.classList.contains('fa-circle-check')){
        tareas[e.target.dataset.id].estado = false
        listarTareas()
    }
    e.stopPropagation()
}

