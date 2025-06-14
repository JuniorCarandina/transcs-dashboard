
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('viagemForm');
  const tabela = document.getElementById('tabelaViagens');
  const receitas = document.getElementById('receita');
  const despesas = document.getElementById('despesa');
  const lucro = document.getElementById('lucro');
  const kmRodado = document.getElementById('kmRodado');

  let dados = JSON.parse(localStorage.getItem('viagens')) || [];

  function atualizarDashboard() {
    let totalReceita = 0;
    let totalDespesa = 0;
    let totalKM = 0;

    dados.forEach(item => {
      totalReceita += parseFloat(item.receita);
      totalDespesa += parseFloat(item.despesas);
      totalKM += parseFloat(item.km);
    });

    receitas.innerText = totalReceita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    despesas.innerText = totalDespesa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    lucro.innerText = (totalReceita - totalDespesa).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    kmRodado.innerText = totalKM.toLocaleString('pt-BR') + " km";
  }

  function preencherTabela() {
    tabela.innerHTML = '';
    dados.forEach(item => {
      const linha = document.createElement('tr');
      linha.innerHTML = \`
        <td>\${item.data}</td>
        <td>\${item.cliente}</td>
        <td>R$\${parseFloat(item.receita).toFixed(2)}</td>
        <td>R$\${parseFloat(item.despesas).toFixed(2)}</td>
        <td>R$\${(item.receita - item.despesas).toFixed(2)}</td>
        <td>\${item.km} km</td>
      \`;
      tabela.appendChild(linha);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = form.data.value;
    const cliente = form.cliente.value;
    const receita = parseFloat(form.receita.value) || 0;
    const despesas = parseFloat(form.despesas.value) || 0;
    const km = parseFloat(form.km.value) || 0;

    dados.push({ data, cliente, receita, despesas, km });
    localStorage.setItem('viagens', JSON.stringify(dados));
    preencherTabela();
    atualizarDashboard();
    form.reset();
  });

  preencherTabela();
  atualizarDashboard();
});
