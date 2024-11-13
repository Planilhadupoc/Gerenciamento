// scripts.js

let historico = [];

function calcular() {
    const bancaInicial = parseFloat(document.getElementById('banca').value);
    const resultadoDia = parseFloat(document.getElementById('resultado').value);

    if (isNaN(bancaInicial) || isNaN(resultadoDia)) {
        alert('Por favor, insira valores válidos para a banca e o resultado.');
        return;
    }

    const meta = bancaInicial * 0.15;
    const stopLoss = bancaInicial * 0.10;
    const bancaFinal = bancaInicial + resultadoDia;

    // Atualizar os valores na página
    document.getElementById('bancaAtual').innerText = `R$ ${bancaFinal.toFixed(2)}`;
    document.getElementById('meta').innerText = `R$ ${meta.toFixed(2)}`;
    document.getElementById('stopLoss').innerText = `R$ ${stopLoss.toFixed(2)}`;

    // Adicionar ao histórico
    const data = new Date().toLocaleDateString();
    historico.push({ data, resultado: resultadoDia, banca: bancaFinal });

    // Atualizar a tabela de histórico
    atualizarHistorico();
}

function atualizarHistorico() {
    const tabelaHistorico = document.getElementById('tabelaHistorico');
    tabelaHistorico.innerHTML = '';

    historico.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.data}</td><td>R$ ${item.resultado.toFixed(2)}</td><td>R$ ${item.banca.toFixed(2)}</td>`;
        tabelaHistorico.appendChild(row);
    });
}
