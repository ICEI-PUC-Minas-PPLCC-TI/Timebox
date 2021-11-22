const main = document.querySelector('#main')
let isLogged = localStorage.getItem('usuario_logado') !== null ? true : false
if (isLogged) {
    const loginBtn = document.querySelector('#login-btn'),
        header = document.querySelector('header'),
        userDiv = document.createElement('div')

    userDiv.innerHTML = `
        <div class="user-info">
            Bem vindo, <span class="user-name">${JSON.parse(localStorage.getItem('usuario_logado')).user}</span>
        </div>
        <div class="button">
            Sair
        </div>
    `
    loginBtn.remove()
    header.classList.add('logged')
    userDiv.classList.add('user-div')

    header.appendChild(userDiv)
    userDiv.querySelector('.button').addEventListener('click', () => {
        localStorage.removeItem('usuario_logado')
        window.location.href = 'inicio.html'
    })
}

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
    const saveButton = document.createElement('div')
    const cancelButton = document.createElement('div')
    saveButton.className = 'button'
    cancelButton.className = 'button'
    saveButton.innerHTML = 'Salvar'
    cancelButton.innerHTML = 'Cancelar'
    cancelButton.addEventListener('click', () => {
        popupDiv.style.opacity = '0'
        setTimeout(() => { popupDiv.remove() }, 200)
    })
    popupDiv.innerHTML = `
        <div class="popup-content">
            <textarea id="title" placeholder="Título"></textarea>
            <div id="info">
                        <div class="info-item" id="campo-data">
                            <div class="info-item-title"><span class="icon">calendar_today</span>Data:</div>
                            <input type="date" id="date" value="${new Date().toISOString().split('T')[0]}">
                        <div class="info-item" id="campo-repetir">
                            <input type="checkbox" id="repetir">
                            <label for="repetir">Repetir a cada</label>
                            <input type="number"> dia(s)
                        </div>
                        <div class="info-item" id="campo-tempo-limite">
                            <input type="checkbox" id="limite">
                            <label for="repetir">Tempo limite</label>
                            <input type="number"> minuto(s)
                        </div>
                            </div>
                        
                <div class="info-item" id="campo-notificacao">
                    <div class="info-item-title"><span class="icon">notifications</span>Notificar:</div>
                    <input type="time" id="time" value="0">
                </div>
                <div class="info-column">
                    <div class="column">
                        <div class="info-item" id="campo-description">
                            <div class="info-item-title"><span class="icon">description</span>Descrição:</div>
                            <textarea id="description-textarea" placeholder="Descrição"></textarea>
                        </div>
                        <div class="button">
                            <span>backup</span>Adicionar arquivo
                        </div>
                    </div>
                    <div class="column">
                        <div class="info-item" id="campo-progress">
                            <div class="info-item-title"><span class="icon">trending_up</span>Progresso:</div>
                            <input type="number" value="1">
                        </div>
                        <div class="info-item" id="campo-categoria">
                            <div class="info-item-title"><span class="icon">label</span>Categoria:</div>
                            <select>
                                <option value="Importante">Importante</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="info-item">
                    <input type="checkbox" id="campo-concluido">
                            <label for="concluido">Já concluído?</label>
                </div>
            </div>
            <div id="buttons"></div>
        </div>
    `
    const close = (mouse) => {
        if (mouse.target === popupDiv) {
            popupDiv.style.opacity = '0'
            setTimeout(() => { popupDiv.remove() }, 200)
        }
    }

    document.body.appendChild(popupDiv)
    popupDiv.querySelector('#buttons').appendChild(saveButton)
    popupDiv.querySelector('#buttons').appendChild(cancelButton)
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

//Notificações
const notificacoesButton = document.querySelector('#notification-btn')
const openNotifications = () => {
    const popupDiv = document.querySelector('.notifications')

    const close = (mouse) => {
        if (mouse.target != document.querySelector('.notification-content')) {
            popupDiv.classList.remove('opened')
        }
    }

    setTimeout(() => {
        if (!popupDiv.classList.contains('opened')) {
            popupDiv.classList.add('opened')
        }
    }, 1)


    window.addEventListener('click', close)
}

notificacoesButton.addEventListener('click', openNotifications)