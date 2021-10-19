// Menu
const menu = document.querySelector('#menu')
const button = document.querySelector('#abrir-menu')
let opened = false
const toggleMenu = () => {
    opened = !opened
    menu.setAttribute('data-opened', opened ? `true` : `false`)
    button.style.transform = opened ? `rotate(180deg)` : `rotate(0deg)`
}
button.addEventListener('mousedown', toggleMenu)