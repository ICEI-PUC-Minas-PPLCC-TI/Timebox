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
const rotinaID = window.location.search.split('=')[1]

let rotinasSalvas = JSON.parse(localStorage.getItem('rotinas')),
    rotinaLS = rotinasSalvas[rotinaID],
    rotinaTitle = document.querySelector('#title')

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
    saveButton.addEventListener('click', () => {
        const titulo = popupDiv.querySelector('#title').value
        const descricao = popupDiv.querySelector('#description-textarea').value
        const data = popupDiv.querySelector('#date').value
        const progresso = popupDiv.querySelector('#campo-progress input').value
        const categoria = popupDiv.querySelector('#campo-categoria select').value
        const concluido = popupDiv.querySelector('#campo-concluido').checked
        const repetir = popupDiv.querySelector('#repetir').checked
        const repetirValue = popupDiv.querySelector('#campo-repetir input[type="number"]').value
        const notificar = popupDiv.querySelector('#campo-notificacao input').value

        const tarefa = {
            titulo: titulo,
            descricao: descricao,
            data: data,
            progresso: progresso,
            categoria: categoria,
            concluido: concluido,
            repetir: repetir,
            repetirValue: repetirValue,
            notificar: notificar
        }

        if (titulo === '') {
            alert('Preencha o título')
        } else {
            rotinasSalvas[rotinaID].tarefas.push(tarefa)
            localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
            rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
            popupDiv.style.opacity = '0'
            mostrarTarefas()
            setTimeout(() => { popupDiv.remove() }, 200)
        }
    })
    popupDiv.querySelector('#buttons').appendChild(saveButton)
    saveButton.style.backgroundColor = rotinaLS.cor
    popupDiv.querySelector('#buttons').appendChild(cancelButton)
    setTimeout(() => { popupDiv.style.opacity = '1' }, 1)
    popupDiv.addEventListener('click', close)
}
const createTextField = (texto, index) => {
    const textField = document.createElement('textarea')
    textField.classList.add('text-field')
    textField.classList.add(`line-${index + 1}`)
    textField.placeholder = 'Subtítulo...'
    textField.id = "line"
    textField.name = "line"
    if (texto.length > 0) {
        textField.value = texto
    }
    textField.addEventListener('input', () => { autoGrowing(textField) })
    textField.addEventListener('input', () => {
        console.log(textField.classList[1].slice(5) - 1)
        if (textField.value.length > 0) {
            if (rotinasSalvas[rotinaID].subtitulos[textField.classList[1].slice(5) - 1] === undefined) {
                rotinasSalvas[rotinaID].subtitulos.push(textField.value)

                localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
                rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
                textField.className = `text-field line-${rotinasSalvas[rotinaID].subtitulos.length}`

            }
            else {
                rotinasSalvas[rotinaID].subtitulos[textField.classList[1].slice(5) - 1] = textField.value
                localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
                rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
            }
        }
        else {
            rotinasSalvas[rotinaID].subtitulos.splice(textField.classList[1].slice(5) - 1, 1)
            localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
            rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
            textField.remove()
        }
    })
    document.querySelector('.editavel').appendChild(textField)
}
createTaskButton.addEventListener('click', createTask)
createTextButton.addEventListener('click', createTextField)

rotinaLS.subtitulos.forEach((subtitulo, index) => {
    createTextField(subtitulo, index)
})

const mostrarTarefas = () => {
    rotinaLS.tarefas.forEach((tarefa, index) => {
        const tarefaDiv = document.createElement('div')
        tarefaDiv.classList.add('tarefa')
        tarefaDiv.classList.add(`tarefa-${index + 1}`)
        tarefaDiv.innerHTML = `
            <div class="tarefa-info">
                <div class="tarefa-info-item" id="campo-titulo">
                    <div class="tarefa-info-item-title"><span class="icon">title</span>Título:</div>
                    <input type="text" value="${tarefa.titulo}">
                </div>
                <div class="tarefa-info-item" id="campo-data">
                    <div class="tarefa-info-item-title"><span class="icon">event</span>Data:</div>
                    <input type="date" value="${tarefa.data}">
                </div>
                <div class="tarefa-info-item" id="campo-hora">
                    <div class="tarefa-info-item-title"><span class="icon">notifications</span>Hora:</div>
                    <input type="time" value="${tarefa.notificar}">
                </div>
                <div class="tarefa-info-item" id="campo-progress">
                    <div class="tarefa-info-item-title"><span class="icon">trending_up</span>Progresso:</div>
                    <input type="number" value="${tarefa.progresso}">
                </div>
                `
        if (tarefa.concluido) {
            tarefaDiv.innerHTML += `
                <div class="tarefa-info-item" id="campo-concluido">
                    <div class="tarefa-info-item-title"><span class="icon">check_circle</span>Concluído:</div>
                    <input type="checkbox" checked>
                </div>
            `
        }
        else {
            tarefaDiv.innerHTML += `
                <div class="tarefa-info-item" id="campo-concluido">
                    <div class="tarefa-info-item-title"><span class="icon">check_circle</span>Concluído:</div>
                    <input type="checkbox">
                </div>
            `
        }
        if (tarefa.repetir) {
            tarefaDiv.innerHTML += `
                <div class="tarefa-info-item" id="campo-repetir">
                    <div class="tarefa-info-item-title"><span class="icon">repeat</span>Repetir:</div>
                    <input type="checkbox" checked>
                </div>
            `
        }
        else {
            tarefaDiv.innerHTML += `
                <div class="tarefa-info-item" id="campo-repetir">
                    <div class="tarefa-info-item-title"><span class="icon">repeat</span>Repetir:</div>
                    <input type="checkbox">
                </div>
            `
        }
        tarefaDiv.innerHTML += `
            <div class="tarefa-info-item" id="campo-descricao">
                <div class="tarefa-info-item-title"><span class="icon">description</span>Descrição:</div>
                <textarea>${tarefa.descricao}</textarea>
            </div>
        `
        document.querySelector('.editavel').appendChild(tarefaDiv)
    })
}
mostrarTarefas()

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

//Ler a rotina
rotinaTitle.innerHTML = rotinaLS.titulo

rotinaTitle.addEventListener('input', () => {
    rotinaLS.titulo = rotinaTitle.value

    rotinasSalvas[rotinaID] = rotinaLS

    localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
})