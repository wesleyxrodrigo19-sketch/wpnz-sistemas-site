const DEMOS = {
  acaiteria: {
    route: "nome-da-sua-acaiteria", label: "Açaiteria", image: 0, accent: "#7c3aed",
    hero: "Seu açaí do seu jeito, do clique até a balança.", description: "Cardápio por tamanho ou peso, complementos, delivery, retirada, mesas e produção no mesmo fluxo.",
    categories: ["Destaques", "Açaí", "Combos", "Complementos"],
    products: [["Açaí 500 ml", "Creme de açaí com até 4 complementos.", "Açaí", 22.9], ["Açaí por peso", "Venda integrada à balança, valor por quilo.", "Açaí", 34.9], ["Combo Duplo", "2 bowls de 400 ml com 3 complementos.", "Combos", 39.9], ["Creme de cupuaçu", "Bowl de 400 ml com leite em pó e granola.", "Destaques", 19.9], ["Morango e Nutella", "Complemento premium para qualquer tamanho.", "Complementos", 5], ["Barca da Casa", "Açaí, frutas e adicionais para compartilhar.", "Destaques", 48]],
    features: ["Balança integrada", "Complementos com limite", "Delivery e mesas", "Baixa de insumos"]
  },
  "bar-restaurante": {
    route: "nome-do-seu-bar-restaurante", label: "Bar e restaurante", image: 1, accent: "#b45309",
    hero: "Mesa, garçom, cozinha e caixa trabalhando juntos.", description: "O pedido lançado na mesa chega ao setor correto, registra o garçom e permanece na comanda até o fechamento.",
    categories: ["Destaques", "Pratos", "Petiscos", "Bebidas"],
    products: [["Filé acebolado", "Filé, arroz, feijão tropeiro e salada.", "Pratos", 39.9], ["Executivo da Casa", "Proteína do dia, dois acompanhamentos e salada.", "Destaques", 27.9], ["Carne de sol com macaxeira", "Porção para compartilhar com vinagrete.", "Petiscos", 46], ["Caldinho regional", "Porção individual com torradas.", "Petiscos", 12], ["Suco natural 500 ml", "Sabores da estação.", "Bebidas", 9], ["Jarra de limonada", "Limonada suíça para até 3 pessoas.", "Bebidas", 18]],
    features: ["Comanda por garçom", "Impressão por setor", "Taxa de serviço", "Fechamento dividido"]
  },
  hamburgueria: {
    route: "nome-da-sua-hamburgueria", label: "Hamburgueria", image: 2, accent: "#dc2626",
    hero: "Do cardápio à chapa sem redigitar pedidos.", description: "Adicionais, combos, ponto da carne, taxas por bairro e acompanhamento completo para delivery, retirada e salão.",
    categories: ["Destaques", "Artesanais", "Combos", "Bebidas"],
    products: [["Burger da Casa", "Pão brioche, carne 160 g, queijo e molho especial.", "Destaques", 27.9], ["Duplo Bacon", "Duas carnes, cheddar, bacon e cebola caramelizada.", "Artesanais", 36.9], ["Combo Completo", "Burger da casa, fritas e refrigerante.", "Combos", 39.9], ["Frango Crocante", "Filé empanado, queijo, alface e maionese.", "Artesanais", 25.9], ["Batata com cheddar", "Fritas, cheddar cremoso e bacon.", "Combos", 19.9], ["Refrigerante lata", "Lata gelada, escolha o sabor.", "Bebidas", 7]],
    features: ["Adicionais e combos", "Ponto da carne", "Taxa por bairro", "Fila da chapa"]
  },
  pizzaria: {
    route: "nome-da-sua-pizzaria", label: "Pizzaria", image: 3, accent: "#ea580c",
    hero: "Tamanhos, sabores e bordas montados sem erro.", description: "O cliente escolhe meio a meio, adicionais e borda; a produção recebe a composição completa e o caixa acompanha tudo.",
    categories: ["Destaques", "Tradicionais", "Especiais", "Bebidas"],
    products: [["Pizza Grande", "Até 2 sabores tradicionais, 8 fatias.", "Destaques", 56], ["Calabresa Especial", "Calabresa, cebola roxa, queijo e azeitonas.", "Tradicionais", 52], ["Carne de sol", "Carne de sol, queijo coalho e cebola caramelizada.", "Especiais", 64], ["Frango com catupiry", "Frango temperado, milho e catupiry.", "Tradicionais", 55], ["Borda recheada", "Cheddar, catupiry ou chocolate.", "Especiais", 10], ["Refrigerante 1 litro", "Escolha o sabor no carrinho.", "Bebidas", 12]],
    features: ["Meio a meio", "Bordas e adicionais", "Duas vias de impressão", "Rastreio do pedido"]
  },
  marmitaria: {
    route: "nome-da-sua-marmitaria", label: "Marmitaria", image: 4, accent: "#059669",
    hero: "O pico do almoço organizado antes do meio-dia.", description: "Cardápio do dia, tamanhos, agendamento, contagem de produção e separação de entregas por rota.",
    categories: ["Hoje", "Executivas", "Leves", "Sobremesas"],
    products: [["Marmita Executiva", "Arroz, feijão, macarrão, salada e proteína.", "Hoje", 22], ["Marmita Grande", "Porção reforçada com duas opções de acompanhamento.", "Executivas", 28], ["Frango grelhado", "Arroz integral, legumes e salada fresca.", "Leves", 25], ["Carne de panela", "Carne macia, arroz, feijão e purê.", "Hoje", 24], ["Salada completa", "Folhas, legumes, frango e molho da casa.", "Leves", 23], ["Pudim da casa", "Fatia individual refrigerada.", "Sobremesas", 7]],
    features: ["Cardápio por dia", "Entrega agendada", "Produção em lote", "Rotas por região"]
  },
  espetaria: {
    route: "nome-da-sua-espetaria", label: "Espetaria", image: 5, accent: "#c2410c",
    hero: "Cada rodada chega à churrasqueira e ao bar certos.", description: "Comandas por mesa, ponto da carne, impressão por estação e fechamento flexível para operações de alto giro.",
    categories: ["Destaques", "Espetos", "Combos", "Bebidas"],
    products: [["Espeto bovino", "Carne bovina selecionada, farofa e vinagrete.", "Espetos", 13], ["Espeto de frango", "Frango temperado e assado na brasa.", "Espetos", 11], ["Combo da Brasa", "4 espetos, macaxeira e vinagrete.", "Destaques", 49], ["Queijo coalho", "Queijo coalho tostado com melaço.", "Espetos", 10], ["Macaxeira frita", "Porção crocante com molho da casa.", "Combos", 18], ["Balde com 6 bebidas", "Bebidas long neck bem geladas.", "Bebidas", 48]],
    features: ["Rodadas por mesa", "Bar e churrasqueira", "Ponto da carne", "Conta dividida"]
  },
  cafeteria: {
    route: "nome-da-sua-cafeteria", label: "Cafeteria e confeitaria", image: 6, accent: "#92400e",
    hero: "Balcão rápido, receitas padronizadas e encomendas no prazo.", description: "Senhas, variações de bebidas, combos, ficha técnica, validade e agenda de encomendas em uma experiência simples.",
    categories: ["Destaques", "Cafés", "Doces", "Combos"],
    products: [["Cappuccino da Casa", "Café, leite cremoso, chocolate e canela.", "Destaques", 13], ["Café coado", "Grão especial preparado na hora.", "Cafés", 8], ["Fatia de torta", "Torta artesanal do dia.", "Doces", 14], ["Croissant recheado", "Massa amanteigada com queijo e presunto.", "Combos", 16], ["Combo Manhã", "Cappuccino, croissant e fruta.", "Destaques", 24], ["Bolo por encomenda", "Bolo personalizado a partir de 1 kg.", "Doces", 65]],
    features: ["Senhas de balcão", "Ficha técnica", "Lotes e validade", "Agenda de encomendas"]
  },
  sushi: {
    route: "nome-do-seu-sushi", label: "Sushi e culinária oriental", image: 7, accent: "#0f766e",
    hero: "Combos e peças na sequência certa, sem perder observações.", description: "Cardápio com limites de troca, montagem de combos, filas fria e quente, delivery e histórico do cliente.",
    categories: ["Destaques", "Combos", "Temakis", "Quentes"],
    products: [["Combo 30 peças", "Seleção de salmão, uramaki e hot roll.", "Destaques", 74], ["Combo 20 peças", "Peças variadas para duas pessoas.", "Combos", 52], ["Temaki salmão", "Salmão fresco, arroz e cebolinha.", "Temakis", 29], ["Hot roll 10 unidades", "Rolinho empanado com cream cheese.", "Quentes", 27], ["Sunomono", "Salada de pepino agridoce com gergelim.", "Destaques", 15], ["Yakisoba misto", "Macarrão, carnes e legumes salteados.", "Quentes", 38]],
    features: ["Combos configuráveis", "Fila fria e quente", "Limites de troca", "Histórico do cliente"]
  },
  fatiado: {
    route: "nome-do-seu-fatiado", label: "Fatiados e conveniência", image: 8, accent: "#be123c",
    hero: "Venda por peso, kits e encomendas sem conta manual.", description: "Queijos, presuntos, salames e tábuas com balança integrada, etiquetas, estoque por lote e pedidos agendados.",
    categories: ["Destaques", "Fatiados", "Tábuas", "Kits"],
    products: [["Kit Café da Manhã", "Queijo, presunto, peito de peru e pães.", "Destaques", 39.9], ["Queijo muçarela", "Venda por peso com corte na hora.", "Fatiados", 46.9], ["Presunto cozido", "Fatiado fino ou tradicional, valor por quilo.", "Fatiados", 32.9], ["Tábua para 4 pessoas", "Queijos, salames, azeitonas e geleia.", "Tábuas", 79], ["Kit Sanduíche", "Fatiados, pão, requeijão e suco.", "Kits", 49], ["Queijo coalho", "Peça resfriada, venda por peso.", "Fatiados", 44.9]],
    features: ["Balança e etiqueta", "Preço por quilo", "Lotes e validade", "Encomendas programadas"]
  }
};

const slug = document.body.dataset.niche || "hamburgueria";
const view = document.body.dataset.view || "cardapio";
const demo = DEMOS[slug] || DEMOS.hamburgueria;
const storageKey = `wpnz-demo-orders-${slug}`;
const state = { cart: [], category: demo.categories[0], ownerView: "dashboard", posCart: [] };

const money = value => Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const imagePosition = index => `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`;
const productImage = () => `<div class="food-image" style="--food-position:${imagePosition(demo.image)}" role="img" aria-label="Produto ilustrativo de ${esc(demo.label)}"></div>`;
const demoNotice = `<div class="demo-notice"><span></span><strong>Ambiente demonstrativo</strong> Todos os dados e pedidos são fictícios. Nenhum pagamento, impressão ou mensagem é enviado.</div>`;

function brand(viewName) {
  return `<a class="brand" href="/${demo.route}/cardapio/"><span class="logo-placeholder">SUA<br>LOGO<br>AQUI</span><span><strong>Sua logo aqui</strong><small>${esc(demo.label)}</small></span></a>`;
}

function loadStoredOrders() {
  try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch { return []; }
}

function saveStoredOrders(orders) {
  localStorage.setItem(storageKey, JSON.stringify(orders.slice(0, 20)));
}

function seedOrders() {
  const names = ["Marina", "Carlos", "Fernanda"];
  return [0, 1, 2].map((index) => ({
    id: `D${281 + index}`, customer: names[index], channel: index === 1 ? "Mesa 06" : index === 2 ? "Retirada" : "Delivery",
    status: ["Novo", "Em preparo", "Pronto"][index], total: demo.products[index][3] * (index === 0 ? 2 : 1), createdAt: ["Agora", "há 12 min", "há 24 min"][index],
    items: [{ name: demo.products[index][0], quantity: index === 0 ? 2 : 1 }], test: true
  }));
}

function allOrders() { return [...loadStoredOrders(), ...seedOrders()]; }

function toast(message) {
  let element = document.querySelector(".toast");
  if (!element) { element = document.createElement("div"); element.className = "toast"; document.body.appendChild(element); }
  element.textContent = message; element.classList.add("show"); clearTimeout(toast.timer); toast.timer = setTimeout(() => element.classList.remove("show"), 2600);
}

function renderCustomer() {
  document.title = `Cardápio demonstrativo — ${demo.label} | Wpnz`;
  document.documentElement.style.setProperty("--accent", demo.accent);
  document.querySelector("#app").innerHTML = `${demoNotice}
    <header class="store-header"><div class="shell header-inner">${brand()}
      <div class="store-actions"><span class="open-pill"><i></i> Aberto até 23:30</span><a class="owner-link" href="/${demo.route}/painel/">Painel do proprietário</a><button class="cart-icon" data-open-cart aria-label="Abrir carrinho">Sacola <b data-cart-count>0</b></button></div>
    </div></header>
    <main>
      <section class="menu-hero"><div class="shell menu-hero-grid"><div class="hero-food">${productImage()}<span>Fotos e produtos ilustrativos</span></div><div class="hero-copy"><span class="eyebrow">CARDÁPIO DIGITAL PERSONALIZADO</span><h1>${esc(demo.hero)}</h1><p>${esc(demo.description)}</p><div class="store-info"><div><small>Pedido mínimo</small><strong>R$ 10,00</strong></div><div><small>Entrega</small><strong>35–45 min</strong></div><div><small>Retirada</small><strong>20 min</strong></div></div></div></div></section>
      <section class="catalog shell"><div class="catalog-head"><div><span class="eyebrow">ESCOLHA SEUS ITENS</span><h2>Cardápio da demonstração</h2></div><label class="search"><span>⌕</span><input type="search" placeholder="Buscar no cardápio" data-search aria-label="Buscar produtos"></label></div>
        <div class="category-chips">${demo.categories.map((category, index) => `<button class="${index === 0 ? "active" : ""}" data-category="${esc(category)}">${esc(category)}</button>`).join("")}</div>
        <div class="product-grid" data-products></div>
      </section>
      <section class="feature-band"><div class="shell"><div><span class="eyebrow light">POR TRÁS DO CARDÁPIO</span><h2>O cliente vê simplicidade. A operação recebe controle.</h2></div><div class="feature-list">${demo.features.map(feature => `<span>✓ ${esc(feature)}</span>`).join("")}</div></div></section>
    </main>
    <footer class="showcase-footer"><div class="shell"><span>Conceito demonstrativo criado pela Wpnz Sistemas</span><a href="../../#projetos">Voltar às demonstrações</a></div></footer>
    <button class="cart-bar" data-open-cart><span><b data-cart-count>0</b> itens</span><strong data-cart-total>R$ 0,00</strong><em>Ver sacola</em></button>
    <div class="drawer-overlay" data-close-cart></div><aside class="cart-drawer" aria-label="Sacola de pedido"><div class="drawer-head"><div><small>PEDIDO DE TESTE</small><h2>Sua sacola</h2></div><button data-close-cart aria-label="Fechar">×</button></div><div class="drawer-body" data-cart-body></div></aside><div class="toast" role="status"></div>`;
  renderProducts(); renderCart(); bindCustomer();
}

function renderProducts(query = "") {
  const normalized = query.toLowerCase();
  const products = demo.products.filter(product => {
    const byCategory = state.category === demo.categories[0] || product[2] === state.category || product[2] === demo.categories[0];
    return byCategory && (!normalized || `${product[0]} ${product[1]}`.toLowerCase().includes(normalized));
  });
  document.querySelector("[data-products]").innerHTML = products.length ? products.map((product) => {
    const index = demo.products.indexOf(product);
    return `<article class="product-card">${productImage()}<div class="product-copy"><span>${esc(product[2])}</span><h3>${esc(product[0])}</h3><p>${esc(product[1])}</p><div><strong>${money(product[3])}</strong><button data-add="${index}" aria-label="Adicionar ${esc(product[0])}">Adicionar</button></div></div></article>`;
  }).join("") : `<div class="empty-state"><strong>Nenhum item encontrado.</strong><span>Tente outro termo ou categoria.</span></div>`;
}

function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = state.cart.reduce((sum, item) => sum + demo.products[item.index][3] * item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach(element => element.textContent = count);
  document.querySelector("[data-cart-total]").textContent = money(total);
  const body = document.querySelector("[data-cart-body]");
  body.innerHTML = state.cart.length ? `<div class="cart-lines">${state.cart.map(item => {
    const product = demo.products[item.index];
    return `<div class="cart-line"><div><strong>${esc(product[0])}</strong><small>${money(product[3] * item.quantity)}</small></div><div class="quantity"><button data-qty="-1" data-index="${item.index}">−</button><b>${item.quantity}</b><button data-qty="1" data-index="${item.index}">+</button></div></div>`;
  }).join("")}</div><form class="checkout" data-checkout><h3>Finalizar pedido de teste</h3><div class="form-row"><label>Nome<input name="name" required placeholder="Seu nome"></label><label>Telefone<input name="phone" required placeholder="(87) 99999-9999"></label></div><div class="form-row"><label>Como receber<select name="channel"><option>Delivery</option><option>Retirada</option><option>Consumir no local</option></select></label><label>Pagamento<select name="payment"><option>Pix</option><option>Dinheiro</option><option>Cartão na entrega</option></select></label></div><label>Endereço ou observação<input name="note" placeholder="Rua, bairro, referência ou mesa"></label><div class="checkout-total"><span>Total ilustrativo</span><strong>${money(total)}</strong></div><button class="finish-button">Criar pedido de teste</button><p>Nenhum pagamento será solicitado.</p></form>` : `<div class="empty-cart"><div>▢</div><h3>Sua sacola está vazia</h3><p>Adicione produtos para testar o fluxo completo.</p></div>`;
}

function bindCustomer() {
  document.addEventListener("click", event => {
    const add = event.target.closest("[data-add]");
    if (add) { const index = Number(add.dataset.add); const found = state.cart.find(item => item.index === index); found ? found.quantity++ : state.cart.push({ index, quantity: 1 }); renderCart(); toast(`${demo.products[index][0]} adicionado à sacola.`); }
    const category = event.target.closest("[data-category]");
    if (category) { state.category = category.dataset.category; document.querySelectorAll("[data-category]").forEach(button => button.classList.toggle("active", button === category)); renderProducts(document.querySelector("[data-search]").value); }
    if (event.target.closest("[data-open-cart]")) document.body.classList.add("cart-open");
    if (event.target.closest("[data-close-cart]")) document.body.classList.remove("cart-open");
    const qty = event.target.closest("[data-qty]");
    if (qty) { const item = state.cart.find(entry => entry.index === Number(qty.dataset.index)); if (item) item.quantity += Number(qty.dataset.qty); state.cart = state.cart.filter(entry => entry.quantity > 0); renderCart(); }
  });
  document.querySelector("[data-search]").addEventListener("input", event => renderProducts(event.target.value));
  document.addEventListener("submit", event => {
    if (!event.target.matches("[data-checkout]")) return;
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const total = state.cart.reduce((sum, item) => sum + demo.products[item.index][3] * item.quantity, 0);
    const order = { id: `T${String(Date.now()).slice(-5)}`, customer: data.name, channel: data.channel, status: "Novo", total, createdAt: "Agora", note: data.note, payment: data.payment, test: true, items: state.cart.map(item => ({ name: demo.products[item.index][0], quantity: item.quantity })) };
    saveStoredOrders([order, ...loadStoredOrders()]); state.cart = [];
    document.querySelector("[data-cart-body]").innerHTML = `<div class="success-state"><span>✓</span><h2>Pedido ${order.id} criado!</h2><p>Ele já aparece no painel fictício do proprietário deste segmento.</p><a href="/${demo.route}/painel/">Abrir painel do proprietário</a><button data-close-cart>Continuar no cardápio</button></div>`;
    document.querySelectorAll("[data-cart-count]").forEach(element => element.textContent = "0"); document.querySelector("[data-cart-total]").textContent = money(0);
  });
}

function renderOwner() {
  document.title = `Painel demonstrativo — ${demo.label} | Wpnz`;
  document.documentElement.style.setProperty("--accent", demo.accent);
  document.querySelector("#app").innerHTML = `${demoNotice}<div class="owner-app"><aside class="owner-sidebar">${brand()}<nav>${[["dashboard","Visão geral"],["orders","Pedidos"],["pos","Balcão / novo pedido"],["menu","Cardápio"],["tables","Mesas e comandas"],["settings","Configurações"]].map(([key, label], index) => `<button class="${index === 0 ? "active" : ""}" data-owner-view="${key}"><span>${["▦","▤","＋","◫","⌗","⚙"][index]}</span>${label}</button>`).join("")}</nav><div class="sidebar-foot"><small>DEMONSTRAÇÃO WPNZ</small><strong>Sua operação, do seu jeito.</strong></div></aside><section class="owner-workspace"><header class="owner-top"><button class="mobile-owner-menu" data-menu>☰</button><div><small>PAINEL DO PROPRIETÁRIO</small><h1 data-owner-title>Visão geral</h1></div><div><span class="sync-pill"><i></i> Dados de teste</span><a href="/${demo.route}/cardapio/">Ver cardápio</a></div></header><main class="owner-content" data-owner-content></main></section></div><div class="toast" role="status"></div>`;
  renderOwnerView(); bindOwner();
}

function ownerStats(orders) {
  const total = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  return [["Pedidos hoje", orders.length], ["Em produção", orders.filter(order => order.status === "Em preparo").length], ["Faturamento teste", money(total)], ["Ticket médio", money(orders.length ? total / orders.length : 0)]];
}

function orderCard(order, compact = false) {
  const next = { "Novo": "Em preparo", "Em preparo": "Pronto", "Pronto": "Concluído" }[order.status];
  return `<article class="order-card"><div class="order-code"><strong>#${esc(order.id)}</strong><span class="status status-${order.status.replaceAll(" ", "-").toLowerCase()}">${esc(order.status)}</span></div><div class="order-customer"><strong>${esc(order.customer)}</strong><span>${esc(order.channel)} · ${esc(order.createdAt)}</span></div>${compact ? "" : `<ul>${order.items.map(item => `<li>${item.quantity}× ${esc(item.name)}</li>`).join("")}</ul>`}<div class="order-total"><span>${order.test ? "Pedido de teste" : "Pedido"}</span><strong>${money(order.total)}</strong></div>${next ? `<button data-advance="${esc(order.id)}">Marcar como ${next}</button>` : ""}</article>`;
}

function renderOwnerView() {
  const content = document.querySelector("[data-owner-content]");
  const titles = { dashboard: "Visão geral", orders: "Pedidos", pos: "Balcão / novo pedido", menu: "Cardápio", tables: "Mesas e comandas", settings: "Configurações" };
  document.querySelector("[data-owner-title]").textContent = titles[state.ownerView];
  const orders = allOrders();
  if (state.ownerView === "dashboard") {
    content.innerHTML = `<div class="content-heading"><div><span class="eyebrow">OPERAÇÃO DE HOJE</span><h2>Bem-vindo ao painel da sua empresa.</h2><p>Dados ilustrativos baseados no fluxo real de um sistema completo.</p></div><button class="primary-action" data-test-order>+ Gerar pedido de teste</button></div><div class="stats-grid">${ownerStats(orders).map(([label, value]) => `<article><small>${label}</small><strong>${value}</strong><span>Atualizado agora</span></article>`).join("")}</div><section class="owner-panel"><div class="panel-heading"><div><span class="eyebrow">PEDIDOS RECENTES</span><h3>Fila em tempo real</h3></div><button data-go-orders>Ver todos</button></div><div class="recent-grid">${orders.slice(0, 4).map(order => orderCard(order, true)).join("")}</div></section><div class="insight-grid"><article><span>Impressão automática</span><strong>Caixa e produção conectados</strong><small>2 impressoras configuradas</small></article><article><span>Canal com mais pedidos</span><strong>Delivery · 46%</strong><small>Comparativo demonstrativo</small></article><article><span>Tempo médio</span><strong>18 minutos</strong><small>Do aceite até ficar pronto</small></article></div>`;
  } else if (state.ownerView === "orders") {
    const columns = ["Novo", "Em preparo", "Pronto", "Concluído"];
    content.innerHTML = `<div class="content-heading"><div><span class="eyebrow">GESTÃO DE PEDIDOS</span><h2>Acompanhe cada etapa.</h2><p>Pedidos do cardápio de teste aparecem aqui automaticamente.</p></div><button class="primary-action" data-test-order>+ Gerar pedido de teste</button></div><div class="kanban">${columns.map(status => `<section><header><strong>${status}</strong><b>${orders.filter(order => order.status === status).length}</b></header>${orders.filter(order => order.status === status).map(order => orderCard(order)).join("") || `<div class="empty-column">Nenhum pedido</div>`}</section>`).join("")}</div>`;
  } else if (state.ownerView === "pos") {
    const posTotal = state.posCart.reduce((sum, item) => sum + demo.products[item.index][3] * item.quantity, 0);
    content.innerHTML = `<div class="content-heading"><div><span class="eyebrow">PDV DE BALCÃO</span><h2>Novo pedido presencial.</h2><p>Toque nos itens e abra uma comanda de teste.</p></div></div><div class="pos-layout"><section class="pos-products">${demo.products.map((product, index) => `<button data-pos-add="${index}">${productImage()}<span><strong>${esc(product[0])}</strong><small>${money(product[3])}</small></span></button>`).join("")}</section><aside class="pos-cart"><div><span class="eyebrow">PEDIDO ATUAL</span><h3>Comanda de balcão</h3></div>${state.posCart.length ? state.posCart.map(item => `<div class="pos-line"><span>${item.quantity}× ${esc(demo.products[item.index][0])}</span><strong>${money(item.quantity * demo.products[item.index][3])}</strong></div>`).join("") : `<div class="pos-empty">Adicione produtos ao pedido.</div>`}<label>Cliente<input data-pos-customer placeholder="Nome do cliente"></label><label>Canal<select data-pos-channel><option>Balcão</option><option>Mesa 04</option><option>Retirada</option></select></label><div class="pos-total"><span>Total</span><strong>${money(posTotal)}</strong></div><button class="primary-action full" data-finish-pos ${state.posCart.length ? "" : "disabled"}>Criar comanda de teste</button></aside></div>`;
  } else if (state.ownerView === "menu") {
    content.innerHTML = `<div class="content-heading"><div><span class="eyebrow">GESTÃO DO CARDÁPIO</span><h2>Produtos e disponibilidade.</h2><p>Exemplo de manutenção de preços, itens e categorias.</p></div><button class="primary-action" data-fake-save>+ Novo produto</button></div><section class="owner-panel table-panel"><table><thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Disponível</th></tr></thead><tbody>${demo.products.map(product => `<tr><td><span class="table-product">${productImage()}<strong>${esc(product[0])}</strong></span></td><td>${esc(product[2])}</td><td><input value="${product[3].toFixed(2).replace(".", ",")}"></td><td><label class="switch"><input type="checkbox" checked><span></span></label></td></tr>`).join("")}</tbody></table><div class="table-save"><button class="primary-action" data-fake-save>Salvar alterações de teste</button></div></section>`;
  } else if (state.ownerView === "tables") {
    content.innerHTML = `<div class="content-heading"><div><span class="eyebrow">SALÃO EM TEMPO REAL</span><h2>Mesas e comandas.</h2><p>Ocupação, garçom, consumo e tempo de atendimento.</p></div><button class="primary-action" data-fake-save>+ Abrir comanda</button></div><div class="tables-dashboard">${Array.from({ length: 12 }, (_, index) => { const occupied = index % 3 !== 0; return `<article class="${occupied ? "occupied" : ""}"><span>Mesa ${String(index + 1).padStart(2, "0")}</span><strong>${occupied ? money(28 + index * 7) : "Livre"}</strong><small>${occupied ? `${["Caio", "Lia", "Rafael"][index % 3]} · ${8 + index} min` : "Pronta para abrir"}</small><button data-fake-save>${occupied ? "Ver comanda" : "Abrir mesa"}</button></article>`; }).join("")}</div>`;
  } else {
    content.innerHTML = `<div class="content-heading"><div><span class="eyebrow">CONFIGURAÇÕES</span><h2>Adapte o sistema à operação.</h2><p>Campos demonstrativos inspirados em configurações reais.</p></div></div><form class="settings-grid" data-settings><section class="owner-panel"><div class="panel-heading"><div><h3>Funcionamento e atendimento</h3><p>Informações exibidas no cardápio.</p></div><label class="switch"><input type="checkbox" checked><span></span></label></div><label>Horário de encerramento<input value="23:30"></label><label>Pedido mínimo<input value="10,00"></label><label>Tempo de entrega<input value="35–45 min"></label><label>Quantidade de mesas<input type="number" value="12"></label></section><section class="owner-panel"><div class="panel-heading"><div><h3>Impressão automática</h3><p>Direcionamento por setor.</p></div><span class="connected">Configurado</span></div><label>Impressora do caixa<input value="EPSON Caixa"></label><label>Impressora da produção<input value="ELGIN Produção"></label><label class="check"><input type="checkbox" checked> Imprimir pedidos automaticamente</label><label class="check"><input type="checkbox" checked> Permitir reimpressão auditada</label></section><section class="owner-panel wide"><div class="panel-heading"><div><h3>Recursos deste segmento</h3><p>Todos os módulos podem ser personalizados.</p></div></div><div class="settings-features">${demo.features.map(feature => `<label class="check"><input type="checkbox" checked> ${esc(feature)}</label>`).join("")}</div><button class="primary-action" type="submit">Salvar configurações de teste</button></section></form>`;
  }
}

function createTestOrder(channel = "Delivery", customer = "Cliente de teste", items = null) {
  const chosen = items || [{ index: Math.floor(Math.random() * demo.products.length), quantity: 1 }];
  const order = { id: `T${String(Date.now()).slice(-5)}`, customer, channel, status: "Novo", total: chosen.reduce((sum, item) => sum + demo.products[item.index][3] * item.quantity, 0), createdAt: "Agora", test: true, items: chosen.map(item => ({ name: demo.products[item.index][0], quantity: item.quantity })) };
  saveStoredOrders([order, ...loadStoredOrders()]); return order;
}

function bindOwner() {
  document.addEventListener("click", event => {
    const viewButton = event.target.closest("[data-owner-view]");
    if (viewButton) { state.ownerView = viewButton.dataset.ownerView; document.querySelectorAll("[data-owner-view]").forEach(button => button.classList.toggle("active", button === viewButton)); document.querySelector(".owner-sidebar").classList.remove("open"); renderOwnerView(); }
    if (event.target.closest("[data-menu]")) document.querySelector(".owner-sidebar").classList.toggle("open");
    if (event.target.closest("[data-test-order]")) { const order = createTestOrder(); toast(`Pedido ${order.id} criado na fila.`); renderOwnerView(); }
    if (event.target.closest("[data-go-orders]")) { state.ownerView = "orders"; document.querySelectorAll("[data-owner-view]").forEach(button => button.classList.toggle("active", button.dataset.ownerView === "orders")); renderOwnerView(); }
    const advance = event.target.closest("[data-advance]");
    if (advance) { const orders = loadStoredOrders(); const order = orders.find(item => item.id === advance.dataset.advance); if (order) { order.status = { "Novo": "Em preparo", "Em preparo": "Pronto", "Pronto": "Concluído" }[order.status] || order.status; saveStoredOrders(orders); toast("Status atualizado no pedido de teste."); } else toast("Este pedido ilustrativo é somente leitura."); renderOwnerView(); }
    const posAdd = event.target.closest("[data-pos-add]");
    if (posAdd) { const index = Number(posAdd.dataset.posAdd); const item = state.posCart.find(entry => entry.index === index); item ? item.quantity++ : state.posCart.push({ index, quantity: 1 }); renderOwnerView(); }
    if (event.target.closest("[data-finish-pos]")) { const customer = document.querySelector("[data-pos-customer]")?.value || "Cliente balcão"; const channel = document.querySelector("[data-pos-channel]")?.value || "Balcão"; const order = createTestOrder(channel, customer, state.posCart); state.posCart = []; toast(`Comanda ${order.id} aberta.`); state.ownerView = "orders"; document.querySelectorAll("[data-owner-view]").forEach(button => button.classList.toggle("active", button.dataset.ownerView === "orders")); renderOwnerView(); }
    if (event.target.closest("[data-fake-save]")) toast("Alteração salva apenas nesta demonstração.");
  });
  document.addEventListener("submit", event => { if (event.target.matches("[data-settings]")) { event.preventDefault(); toast("Configurações de teste salvas."); } });
}

if (view === "painel") renderOwner(); else renderCustomer();
