document.getElementById("viagemForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = document.getElementById("data").value;
  const cliente = document.getElementById("cliente").value;
  const receita = parseFloat(document.getElementById("receita").value);
  const despesas = parseFloat(document.getElementById("despesas").value);
  const km = parseFloat(document.getElementById("km").value);

  const lucro = receita - despesas;

  const table = document.getElementById("historicoTable").querySelector("tbody");
  const row = table.insertRow();
  row.innerHTML = `<td>${data}</td><td>${cliente}</td><td>R$ ${receita.toFixed(2)}</td><td>R$ ${despesas.toFixed(2)}</td><td>R$ ${lucro.toFixed(2)}</td><td>${km} km</td>`;

  updateDashboard(receita, despesas, lucro, km);

  this.reset();
});

let totalReceita = 0;
let totalDespesas = 0;
let totalLucro = 0;
let totalKm = 0;

function updateDashboard(receita, despesas, lucro, km) {
  totalReceita += receita;
  totalDespesas += despesas;
  totalLucro += lucro;
  totalKm += km;

  document.getElementById("receitaCard").innerHTML = `Receita Mensal<br/><strong>R$ ${totalReceita.toFixed(2)}</strong>`;
  document.getElementById("despesaCard").innerHTML = `Despesas Mensais<br/><strong>R$ ${totalDespesas.toFixed(2)}</strong>`;
  document.getElementById("lucroCard").innerHTML = `Lucro Líquido<br/><strong>R$ ${totalLucro.toFixed(2)}</strong>`;
  document.getElementById("kmCard").innerHTML = `KM Rodado<br/><strong>${totalKm} km</strong>`;
}