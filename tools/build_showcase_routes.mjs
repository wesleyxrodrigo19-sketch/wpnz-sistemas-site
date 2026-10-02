import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const dist = path.join(projectRoot, "dist");
const routes = [
  ["acaiteria", "nome-da-sua-acaiteria", "Açaiteria"],
  ["bar-restaurante", "nome-do-seu-bar-restaurante", "Bar e restaurante"],
  ["hamburgueria", "nome-da-sua-hamburgueria", "Hamburgueria"],
  ["pizzaria", "nome-da-sua-pizzaria", "Pizzaria"],
  ["marmitaria", "nome-da-sua-marmitaria", "Marmitaria"],
  ["espetaria", "nome-da-sua-espetaria", "Espetaria"],
  ["cafeteria", "nome-da-sua-cafeteria", "Cafeteria"],
  ["sushi", "nome-do-seu-sushi", "Sushi"],
  ["fatiado", "nome-do-seu-fatiado", "Fatiados"]
];

const page = (niche, view, label) => `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="robots" content="noindex,nofollow">
  <meta name="theme-color" content="#071b1c">
  <title>${view === "painel" ? "Painel do proprietário" : "Cardápio"} demonstrativo — ${label} | Wpnz</title>
  <meta name="description" content="Demonstração fictícia e segura de ${label.toLowerCase()} criada pela Wpnz Sistemas.">
  <link rel="icon" type="image/svg+xml" href="../../assets/favicon.svg">
  <link rel="stylesheet" href="../../demonstracoes/experience.css">
</head>
<body data-niche="${niche}" data-view="${view}">
  <div id="app"><div style="min-height:100vh;display:grid;place-items:center;font:600 16px system-ui;color:#28413f">Carregando demonstração...</div></div>
  <script src="../../demonstracoes/experience.js"></script>
</body>
</html>`;

for (const [niche, route, label] of routes) {
  for (const view of ["cardapio", "painel"]) {
    const directory = path.join(dist, route, view);
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, "index.html"), page(niche, view, label), "utf8");
  }

  const legacyDirectory = path.join(dist, "demonstracoes", niche);
  await fs.mkdir(legacyDirectory, { recursive: true });
  await fs.writeFile(path.join(legacyDirectory, "index.html"), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=../../${route}/cardapio/"><link rel="canonical" href="../../${route}/cardapio/"><title>Redirecionando para a demonstração</title></head><body><p><a href="../../${route}/cardapio/">Abrir demonstração de ${label}</a></p></body></html>`, "utf8");
}

console.log(`Criadas ${routes.length * 2} rotas demonstrativas e ${routes.length} redirecionamentos.`);
