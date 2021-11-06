const newUserBtn = document.querySelector('#new-user-btn')

const openPopup = () => {
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
            <h3>Cadastro</h3>
            <form>
                            <div class="form-group">
                                <label for="user">Usuário</label>
                                <input
                                    type="text"
                                    name="user"
                                    id="user"
                                    class="form-control"
                                    placeholder="Usuário"
                                />
                            </div>
                            <div class="form-group">
                                <label for="email">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    class="form-control"
                                    placeholder="E-mail"
                                />
                            </div>
                            <div class="form-group">
                                <label for="senha">Senha</label>
                                <input
                                    type="password"
                                    name="senha"
                                    id="senha"
                                    class="form-control"
                                    placeholder="Senha"
                                />
                            </div>
                            <div class="form-group">
                                <label for="rsenha">Repetir senha</label>
                                <input
                                    type="password"
                                    name="rsenha"
                                    id="rsenha"
                                    class="form-control"
                                    placeholder="Confirmar senha"
                                />
                            </div>
            </form>
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

newUserBtn.addEventListener('click', openPopup)