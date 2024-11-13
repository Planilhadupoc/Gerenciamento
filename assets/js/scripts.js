// scripts.js

let bancaInicial = 0;
let bancoDeDados = []; // Aqui armazenaremos os dados dos dias

// Função para iniciar a banca e adicionar os dias
function iniciarBanca() {
    bancaInicial = parseFloat(document.getElementById('bancaInicial').value);
    if (isNaN(bancaInicial) || bancaInicial <= 0) {
        alert("Por favor, insira um valor válido para a banca inicial!");
        return;
    }
    atualizarTabela();
}

// Função para atualizar a tabela com os cálculos
function atualizarTabela() {
    const tabelaBody = document.querySelector('#tabelaBanca tbody');
    tabelaBody.innerHTML = ''; // Limpa a tabela antes de adicionar novas linhas

    for (let dia = 1; dia <= 31; dia++) {
        const bancaMeta = bancaInicial * 0.15;
        const bancaStop = bancaInicial * 0.10;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dia}</td>
            <td>R$ ${bancaInicial.toFixed(2)}</td>
            <td><input type="number" id="resultado${dia}" placeholder="Lucro ou Perda" oninput="atualizarBanca(${dia})"></td>
            <td>R$ ${bancaMeta.toFixed(2)}</td>
            <td>R$ ${bancaStop.toFixed(2)}</td>
            <td id="bancaFinal${dia}">R$ ${bancaInicial.toFixed(2)}</td>
        `;
        tabelaBody.appendChild(row);
    }
}

// Função para atualizar a banca após o resultado do dia
function atualizarBanca(dia) {
    const resultado = parseFloat(document.getElementById(`resultado${dia}`).value);
    if (isNaN(resultado)) return;

    const bancaFinal = bancaInicial + resultado;
    document.getElementById(`bancaFinal${dia}`).textContent = `R$ ${bancaFinal.toFixed(2)}`;

    // Atualiza a banca para o próximo dia
    bancaInicial = bancaFinal;
}
    
