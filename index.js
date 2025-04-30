let allCards = [];
let currentPage = 1;
let cardsPerPage = 30;
let displayMode = 'grid';
const toggle = document.getElementById('mudar-tema');
const body = document.body;


async function searchCard(page = 1) {
  currentPage = page;
  


  const cardNameInput = document.getElementById("cardNameInput");
  const cardName = cardNameInput.value.trim();

  
  
  const series = "Digimon Card Game";
  const rarity = document.getElementById("rarity").value; 
  const color = document.getElementById("cardColor").value;
  const type = document.getElementById("tipoDeCarta").value;
  const level = document.getElementById("level").value;


  let apiUrl = `https://digimoncard.io/api-public/search.php?exact=true`;

 
  if (cardName) apiUrl += `&n=${encodeURIComponent(cardName)}`;
  if (rarity) apiUrl += `&rarity=${encodeURIComponent(rarity.toLowerCase())}`;
  if (color) apiUrl += `&color=${encodeURIComponent(color)}`;
  if (level) apiUrl += `&level=${encodeURIComponent(level)}`;
  if (type) apiUrl += `&type=${encodeURIComponent(type)}`;
  apiUrl += `&series=${encodeURIComponent(series)}`;

  console.log("URL da API gerada:", apiUrl);

  const digiList = document.getElementById("digimonCardInfo");
  digiList.innerHTML = ""; 

  try {
 
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Erro na solicitação da API. Status: ${response.status}`);
    }

    const data = await response.json();
    //console.log("Dados retornados pela API:", data); 

    if (data.length === 0) {
      digiList.innerHTML = "<p>Nenhuma carta encontrada.</p>";
      return;
    }

    allCards = data;
    if(rarity){
        allCards = allCards.filter(card => card.rarity?.toLowerCase() === rarity.toLowerCase()
    );
    }

    atualizarPagina(data.length);
    mostrarPaginaAtual(); 
  } catch (error) {
    console.error("Erro ao buscar a carta:", error);
    digiList.innerHTML = "<p>Erro ao buscar a carta. Tente novamente.</p>";
  }
}
function mostrarPaginaAtual() {
  if (!allCards.length) return; 

  const digiList = document.getElementById("digimonCardInfo");
  digiList.innerHTML = "";
  digiList.className = displayMode;

  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const paginaCartas = allCards.slice(start, end);

  paginaCartas.forEach((digimon) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("imagem");

    const img = document.createElement("img");
    img.src =
      digimon.img_url ||
      `https://images.digimoncard.io/images/cards/${digimon.id}.jpg` ||
      "fallback-image.jpg";
    img.classList.add("imagemDigi");
    img.alt = digimon.name || "Digimon Card";

    cardDiv.appendChild(img);

    if(displayMode === 'list'){
      const infoDiv = document.createElement("div");
      infoDiv.classList.add("infoTitle");
  
      const title = document.createElement("h2");
      title.classList.add("titulo");
      title.textContent = digimon.name || "Nome desconhecido";
  
      const infoText = document.createElement("p");
      infoText.classList.add("cartasInfo");
      infoText.innerHTML =
        (digimon.main_effect
          ? `<b>Efeito principal </b>${digimon.main_effect}`
          : "<b>Sem efeito</b>") +
        "<br>" +
        "<br>" +
        (digimon.source_effect
          ? `<b>Efeito de Herança: </b>${digimon.source_effect}`
          : "<b>sem efeito de herança</b>");

          infoDiv.appendChild(title);
          infoDiv.appendChild(infoText);
          cardDiv.appendChild(infoDiv);
    } else {
      cardDiv.addEventListener('click', () => mostrarModal(digimon));
    }

    digiList.appendChild(cardDiv);
  });


}

function atualizarPagina(resultadoTotal) {
  const paginaDiv = document.getElementById("pagina");
  paginaDiv.innerHTML = "";

  if (currentPage > 0) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "< Pagina Anterior.";
    prevButton.onclick = () => searchCard(currentPage - 1);
    paginaDiv.appendChild(prevButton);
  }

  if (allCards.length > currentPage * cardsPerPage) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "Proxima pagina >";
    nextButton.onclick = () => searchCard(currentPage + 1);
    paginaDiv.appendChild(nextButton);
  }
}
searchCard(currentPage);
function alterarLimite(novoLimite) {
  cardsPerPage = parseInt(novoLimite);
  searchCard(1);
}


function limpaText() {
  document.getElementById("rarity").value = "";
  document.getElementById("cardColor").value = "";
  document.getElementById("cardNameInput").value = "";
  document.getElementById("level").value = "";
  document.getElementById("tipoDeCarta").value = "";
}


function setDisplayMode(mode) {
  displayMode = mode;

  const container = document.getElementById('digimonCardInfo');
  container.className = displayMode;
  mostrarPaginaAtual()
}

function mostrarModal(digimon){
const modal = document.createElement('div');

const existingModal = document.querySelector('.modal');
if(existingModal) existingModal.remove();

modal.className = 'modal';

modal.innerHTML= `<div class='modal-content'>
<span class='close-button'>&times;</span>
<h2>${digimon.name || "Nome Desconhecido"}</h2>
<img src="${digimon.img_url || `https://images.digimoncard.io/images/cards/${digimon.id}.jpg`}" alt="${digimon.name}" class="imagemDigi">
<p><b>Efeito Principal:</b> ${digimon.main_effect || "Sem Efeito"}</p>
<p><b>Efeito de Herança:</b> ${digimon.source_effect || "Sem efeito de herança"}</p>
</div>`;

document.body.appendChild(modal);

const closeButton = modal.querySelector('.close-button');
closeButton.onclick = () => modal.remove();
};


toggle.addEventListener('click', () => {
  body.classList.toggle('modo-escuro');
  const temaAtual = body.classList.contains('modo-escuro') ? 'escuro' : 'claro';
  localStorage.setItem('tema', temaAtual);
});

window.addEventListener('DOMContentLoaded', () => {
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') {
    body.classList.add('modo-escuro');
  };
});