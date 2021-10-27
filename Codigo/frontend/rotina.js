const main = document.querySelector('#main')

// Menu
const menu = document.querySelector('#menu')
const menuButton = document.querySelector('#menu-button')
let opened = false

const toggleMenu = () => {
    opened = !opened
    menu.setAttribute('data-opened', opened ? `true` : `false`)
    menuButton.style.transform = opened ? `rotate(180deg)` : `rotate(0deg)`
    menu.style.width = opened ? `250px` : `0px`
    main.style.marginLeft = opened ? `250px` : `0px`

}
menuButton.addEventListener('mousedown', toggleMenu)

//Campos de texto
const allTextFields = Array.from(document.querySelectorAll('textarea'))

allTextFields.forEach(textfield => {
    textfield.addEventListener('input', () => { autoGrowing(textfield) })
})

const autoGrowing = (element) => {
    element.style.height = 'auto'
    element.style.height = `${element.scrollHeight}px`
}

//Criar tarefa e texto
const createTaskButton = document.querySelector('#novo-campo-task')
const createTextButton = document.querySelector('#novo-campo-texto')
const createTask = () => {

    const popupDiv = document.createElement('div')
    popupDiv.classList.add('popup')
    const saveButton = document.createElement('button')
    const cancelButton = document.createElement('button')

    popupDiv.innerHTML = `
        <div class="popup-content">
            <textarea id="title" placeholder="Título"></textarea>
            <div id="info">
                <div class="info-item">
                    <div class="info-item-title"><span class="icon">calendar_today</span>Data:</div>
                    <input type="date" id="date" value="${new Date().toISOString().split('T')[0]}">
                    <div class="info-item-optional">
                        <input type="checkbox" id="repetir">
                        <label for="repetir">Repetir a cada</label>
                        <input type="number"> dia(s)
                    </div>
                    <div class="info-item-optional">
                        <input type="checkbox" id="limite">
                        <label for="repetir">Tempo limite</label>
                        <input type="number">
                    </div>
                </div>
            </div>
        </div>
    `
    const close = (mouse) => {
        if (mouse.target === popupDiv) {
            popupDiv.style.opacity = '0'
            setTimeout(() => { popupDiv.remove() }, 200)
        }
    }

    document.body.appendChild(popupDiv)
    setTimeout(() => { popupDiv.style.opacity = '1' }, 1)
    popupDiv.addEventListener('click', close)
}
const createTextField = () => {
    const textField = document.createElement('textarea')
    textField.classList.add('text-field')
    textField.placeholder = 'Campo de texto...'
    textField.id = "line"
    textField.name = "line"
    textField.addEventListener('input', () => { autoGrowing(textField) })
    document.querySelector('.editavel').appendChild(textField)
}
createTaskButton.addEventListener('click', createTask)
createTextButton.addEventListener('click', createTextField)