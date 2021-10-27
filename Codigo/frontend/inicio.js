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

// Rotina
const novaRotinaButton = document.querySelector('.rotina.criar')
const novaRotina = () => {
    window.location.href = 'rotina.html'
}
novaRotinaButton.addEventListener('mousedown', novaRotina)
