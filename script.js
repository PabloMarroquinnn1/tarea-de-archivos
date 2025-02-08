let currentListType = '';
let dataList = [];
let historyList = [];

function showMenu(type) {
    currentListType = type;
    document.getElementById('form').classList.remove('hidden');
    document.getElementById('output').classList.add('hidden');
    document.getElementById('history').classList.remove('hidden');
    switch (type) {
        case 'array':
            document.getElementById('prompt').textContent = 'Ingrese hasta 10 elementos para la lista contigua (arreglo):';
            break;
        case 'linked':
            document.getElementById('prompt').textContent = 'Ingrese elementos para la lista ligada (escriba -1 para terminar):';
            break;
        case 'doublyLinked':
            document.getElementById('prompt').textContent = 'Ingrese elementos para la lista doblemente ligada (escriba -1 para terminar):';
            break;
        case 'indexed':
            document.getElementById('prompt').textContent = 'Ingrese hasta 10 elementos para la lista indexada:';
            break;
    }
}

function processInput() {
    const input = document.getElementById('inputField').value;
    let elements = input.split(',').map(el => el.trim()).filter(el => el !== '');
    if (elements.length === 0) {
        alert('Por favor, ingrese al menos un elemento válido.');
        return;
    }

    if (currentListType === 'linked' || currentListType === 'doublyLinked') {
        if (elements.includes('-1')) {
            elements = elements.slice(0, elements.indexOf('-1'));
            alert('Entrada finalizada con -1.');
        }
    }

    if ((currentListType === 'array' || currentListType === 'indexed') && dataList.length + elements.length > 10) {
        alert('No se pueden agregar más de 10 elementos.');
        elements = elements.slice(0, 10 - dataList.length);
    }

    dataList = dataList.concat(elements);
    displayList();
    addToHistory(`Datos añadidos: ${elements.join(', ')}`);
}

function displayList() {
    let output = document.getElementById('output');
    output.innerHTML = '';
    switch (currentListType) {
        case 'array':
            output.innerHTML = `<h3>Lista Contigua:</h3><p>${dataList.join(', ')}</p>`;
            break;
        case 'linked':
            output.innerHTML = `<h3>Lista Ligada:</h3><p>${formatLinkedList(dataList)}</p>`;
            break;
        case 'doublyLinked':
            output.innerHTML = `<h3>Lista Doblemente Ligada:</h3><p>${formatDoublyLinkedList(dataList)}</p>`;
            break;
        case 'indexed':
            output.innerHTML = `<h3>Lista Indexada:</h3><p>${formatIndexedList(dataList)}</p>`;
            break;
    }
    output.classList.remove('hidden');
}

function formatLinkedList(list) {
    return list.join(' -> ') + ' -> NULL';
}

function formatDoublyLinkedList(list) {
    return list.join(' <-> ') + ' <-> NULL';
}

function formatIndexedList(list) {
    return list.map((el, index) => `Índice: ${index + 1} -> Valor: ${el}`).join('<br>');
}

function addToHistory(action) {
    let historyList = document.getElementById('historyList');
    let listItem = document.createElement('li');
    listItem.textContent = action;
    historyList.appendChild(listItem);
}

function resetApp() {
    document.getElementById('form').classList.add('hidden');
    document.getElementById('output').classList.add('hidden');
    document.getElementById('history').classList.add('hidden');
    document.getElementById('inputField').value = '';
    dataList = [];
    currentListType = '';
    document.getElementById('historyList').innerHTML = '';
}