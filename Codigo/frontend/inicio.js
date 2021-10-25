const main = document.querySelector('#main')

// Menu
const menu = document.querySelector('#menu')
const button = document.querySelector('#menu-button')
let opened = false

const toggleMenu = () => {
    opened = !opened
    menu.setAttribute('data-opened', opened ? `true` : `false`)
    button.style.transform = opened ? `rotate(180deg)` : `rotate(0deg)`
    menu.style.width = opened ? `250px` : `0px`
    main.style.marginLeft = opened ? `250px` : `0px`

}
button.addEventListener('mousedown', toggleMenu)