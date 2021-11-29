const listaRotinas = document.getElementById('listarotinas')
const inputElement = document.getElementById('inputrotina')
const adicionarRotina = document.querySelector('.botaorotina')
const botaoaddrotina = document.querySelector('#addRotina')
const janelaRotina = document.getElementById('janelaRotina')
const suasRotinas = document.getElementById('suasRotinas')
const editarRotina = document.getElementById('editarRotina')
const botaofechar = document.getElementById('botaofechar')
const botaoCancelar = document.getElementById('botaoCancelar')
const btnNovaTarefa = document.getElementById('btnnovatarefa')


const rotinas = JSON.parse(localStorage.getItem('listaRotinas')) || []

botaoaddrotina.addEventListener('click', addRotina)
adicionarRotina.addEventListener('click', abrirRotina)
botaofechar.addEventListener('click', fecharRotina)
btnNovaTarefa.addEventListener('click', abrirTarefa)
botaoCancelar.addEventListener('click', fecharTarefa)


function addRotina() {

    const novarotina = document.createElement('li')
    novarotina.setAttribute('class', 'rotinas')
    const novobotao = document.createElement('button')
    novobotao.setAttribute('class', 'botaorotina')

    const iconbox = document.createElement('i')
    iconbox.setAttribute('class', 'fa fa-cube')
    const nomeRotina = document.createElement('span')
    nomeRotina.setAttribute('id', 'spanRotina')
    const negrito = document.createElement('b')

    const rotina = inputElement.value
    negrito.innerHTML = rotina

    listaRotinas.prepend(novarotina)
    novarotina.appendChild(novobotao)
    novobotao.appendChild(iconbox)
    novobotao.appendChild(nomeRotina)
    nomeRotina.appendChild(negrito)
    rotinas.push(rotina)
    inputElement.value = ''
    salvarNoLS()
}

function salvarNoLS() {
    localStorage.setItem.id('listaRotinas', JSON.stringify(rotinas))
}

function abrirRotina() {
    suasRotinas.removeAttribute('class')
    suasRotinas.setAttribute('class', 'fechar')
    janelaRotina.setAttribute('class', 'abrir')
    editarRotina.removeAttribute('class')
    editarRotina.setAttribute('class', 'fechar')
}

function fecharRotina() {
    suasRotinas.removeAttribute('class')
    suasRotinas.setAttribute('class', 'abrir')
    editarRotina.removeAttribute('class')
    janelaRotina.removeAttribute('class')
}

function abrirTarefa() {
    suasRotinas.removeAttribute('class')
    suasRotinas.setAttribute('class', 'fechar')
    janelaRotina.setAttribute('class', 'fechar')
    editarRotina.removeAttribute('class')
    editarRotina.setAttribute('class', 'abrir')
}

function fecharTarefa(event) {
    suasRotinas.removeAttribute('class')
    suasRotinas.setAttribute('class', 'fechar')
    janelaRotina.removeAttribute('class')
    janelaRotina.setAttribute('class', 'abrir')
    editarRotina.removeAttribute('class')
    editarRotina.setAttribute('class', 'fechar')
    event.preventDefault()
}
/*
const rotinas = {
    "li": { "class": "rotinas" },
    "button": { "class": "botaorotina" },
    span = { id: "spanRotina", value: "" }
};


/*
function addTarefa() {

}

/*
function criarnovarotina() {
    for (item of tarefas) {
        const itemRotina = document.createElement('li')
        const novaRotina = document.innerHTML(item)



    }

}

function mostraTarefas() {

    for (item of tarefas) {
        const itemList = document.createElement('li')
        const itemText = document.createTextNode(item)
        itemList.innerHTML(itemText)

        itemList.setAttribute('class', 'rotinas')

        const criarbotao = document.createElement('button')
        criarbotao.setAttribute('id', 'botaoaddrotina')

        const criaricon = document.createElement('svg')
        criaricon.setAttribute('class', 'bi bi-box')


        itemList.appendChild(criarbotao)
        listElement.appendChild(itemList)
    }
}

mostraTarefas()

function addTarefa() {
    const tarefa = inputElement.value
    tarefas.push(tarefa)
    inputElement.value = ''
    mostraTarefas()
    salvarNoLS()
}

buttonElement.setAttribute('onclick', 'addTarefa()')



function salvarNoLS() {
    localStorage.setItem('list_tarefas', JSON.stringify(tarefas))
}

/*function fetchApiData() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then((response) => response.json())
        .then((data) => {
            const list = document.querySelector('#listarotinas');
            data.map((item) => {
                const li = document.createElement('li');
                li.setAttribute('id', item.id);
                li.innerHTML = item.title;
                list.appendChild(li);
            })

        })
}




/* const inputElement = document.queryselector("Input");
const buttonElement = document.querySalector("form button");
const ulElement = document.querySelector("ul");

buttonElement.onclick = ev => {
    ev.preventDefault();
    if (inputElement.value) {
        const liElement = document.createElement("li");
        liElement.innerHIML = `<span>S{inputElement.value}</span>`;
        ulElement.appendChild(liElement);
        inputElement.value = "";
    }
};

/*inputnovarotina = $("#inputnovarotina");
botaoaddrotina = $("#botaoaddrotina");
listarotina = $("#listarotina");
janelaedicao = $("#janelaedicao");
janelaedicaofundo = $("#janelaedicaofundo");
janelaedicaobotaofechar = $("#janelaedicaobotaofechar");
botaoatualizarrotina = $("#botaoatualizarrotina");
idrotinaedicao = $("#idrotinaedicao");
inputrotinanomeedicao = $("#inputrotinanomeedicao");
myElement = $("#id01");



inputnovarotina.addEventListener('keypress', (e) => {
    if(e.keyCode == 13 ) {
        let rotina = {
            nome: inputnovarotina.value,
            id: gerarId(),
        }
        addrotina(rotina);
    }
});

janelaedicaobotaofechar.addEventListener('click', (e) => {
    alternarjanelaedicao();
});


botaoatualizarrotina.addEventListener('click', (e) => {
    e.preventDefault();
    let idrotina = idrotinaedicao.innerHTML.replace('#', '');
    let rotina = {
        nome: inputrotinanomeedicao.value,
        id: idrotina
    }

    let rotinaatual = document.getElementById(''+idrotina+'');

    if(rotinaatual) {
    let li = criartagli(rotina);
    listarotina.replaceChild(li, rotinaatual);
    alternarjanelaedicao();

    }
    else {
        alert('Elemento HTML não encontrado!');
    }
});

function funcaoaddrotina() {
    document.addEventListener('click', (e) => {
        let tarefa = {
            nome: inputnovatarefa.value,
            id: gerarId(),
        }
        addtarefa(tarefa);
});
}

function gerarId() {
    return Math.floor(Math.random() * 3000);
}

function addrotina (rotina) {
    let li = criartagli(rotina);
    listarotina.appendChild(li);
    inputnovarotina.value = '';
}

function criartagli(rotina) {
    let li = document.createElement('li');
    li.id = rotina.id;

    let span = document.createElement('span');
    span.classList.add('textorotina');
    span.innerHTML = rotina.nome;

    let div = document.createElement('div');
    
    let botaoeditar = document.createElement('button');
    botaoeditar.classList.add('botaoacao');
    botaoeditar.innerHTML = '<i class="fa fa-pencil"></i>';
    botaoeditar.setAttribute('onclick', 'editar('+rotina.id+')');

    let botaoexcluir = document.createElement('button');
    botaoexcluir.classList.add('botaoacao');
    botaoexcluir.innerHTML = '<i class="fa fa-trash"></i>';
    botaoexcluir.setAttribute('onclick', 'excluir('+rotina.id+')');

    div.appendChild(botaoeditar);
    div.appendChild(botaoexcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function editar(idrotina) {

    let li = document.getElementById('' + idrotina + '');
        if(li) {
            idrotinaedicao.innerHTML = '#' + idrotina;
            inputrotinanomeedicao.value = li.innerText;
            alternarjanelaedicao();
        }
        else {
            alert('Elemento HTML não encontrado!');
        }
}

function excluir(idrotina) {
    let confirmacao = window.confirm('Tem certeza que deseja excluir?');
    if(confirmacao){
        let li = document.getElementById('' + idrotina + '');
        if(li) {
            listarotina.removeChild(li);
        }
    }
    else {
        alert('Elemento HTML não encontrado!');
    }
}

function alternarjanelaedicao() {
    janelaedicao.classList.toggle('abrir');
    janelaedicaofundo.classList.toggle('abrir');
}
*/