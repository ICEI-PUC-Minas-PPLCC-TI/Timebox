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
    userDiv.classList.add('user-div')
    loginBtn.remove()
    header.classList.add('logged')
    header.appendChild(userDiv)
    userDiv.querySelector('.button').addEventListener('click', () => {
        localStorage.removeItem('usuario_logado')
        document.location.reload(true)
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

// Criação de rotinas
const adicionarRotinaButton = document.querySelector('#addRotina'),
    adicionarRotinaInput = document.querySelector('#inputrotina')

const coresAleatorias = () => {
    const cores = [
        '#FFADAD',
        '#FFD6A5',
        '#FDFFB6',
        '#CAFFBF',
        '#9BF6FF',
        '#A0C4FF',
        '#BDB2FF',
        '#FFC6FF',
        '#B4E4E4',
        '#BEB9DF',
    ]
    const coresAleatorias = []
    while (coresAleatorias.length < 1) {
        const cor = cores[Math.floor(Math.random() * cores.length)]
        if (!coresAleatorias.includes(cor)) {
            coresAleatorias.push(cor)
        }
    }

    return coresAleatorias[0]
}

const criarRotina = () => {
    const titulo = adicionarRotinaInput.value

    if (titulo.length > 0) {
        const rotinasCriadas = JSON.parse(localStorage.getItem('rotinas')) || []

        const rotina = {
            id: localStorage.getItem('rotinas') !== null ? JSON.parse(localStorage.getItem('rotinas')).length : 0,
            titulo: titulo,
            data: new Date().toISOString().split('T')[0],
            hora: new Date().toLocaleTimeString(),
            usuario: JSON.parse(localStorage.getItem('usuario_logado')).id,
            cor: coresAleatorias(),
            tarefas: [],
            subtitulos: []
        }

        localStorage.setItem('rotinas', JSON.stringify(rotinasCriadas.concat(rotina)))

        criarRotinas()

        adicionarRotinaInput.value = ''
    }
}

adicionarRotinaInput.addEventListener('keyup', (key) => {
    if (key.keyCode == 13) {
        criarRotina()
    }
})

adicionarRotinaButton.addEventListener('click', criarRotina)

const criarRotinas = () => {
    const rotinasCriadas = JSON.parse(localStorage.getItem('rotinas')) || []
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado')).id
    const rotinas = document.querySelector('#listarotinas')

    rotinasCriadas.forEach(rotina => {
        if (rotina.usuario == usuarioLogado && rotinas.querySelector(`#rotina-${rotina.id}`) === null) {
            const rotinaDiv = document.createElement('li')
            rotinaDiv.classList.add('rotinas')
            rotinaDiv.id = `rotina-${rotina.id}`
            rotinaDiv.innerHTML = `
            <button class="botaorotina" style="background-color:${rotina.cor}">
                <i class="fa fa-cube"></i>
                <div class="rotina-title">
                    ${rotina.titulo}
                </div>
            </button>
        `
            rotinas.insertBefore(rotinaDiv, rotinas.firstChild)

            rotinaDiv.addEventListener('click', () => {
                window.location.href = `./rotina.html?id=${rotina.id}`
            })
        }
    })
}
criarRotinas()

