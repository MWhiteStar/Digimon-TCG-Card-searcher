
let allCards = [];
let currentPage = 1;
let cardsPerPage = 30;
//valores base da pagina atual e quantas cartas por pagina.

async function searchCard(page = 1){
    currentPage = page;
    mostrarPaginaAtual();


    //variavel cardName, vai pegar o valor do nome digitado no campo input.
    const cardNameInput = document.getElementById('cardNameInput');
    const cardName = cardNameInput.value.trim();
    //pesquisa o valor de cardName dentro da url da Api


    const rarity = document.getElementById('rarity').value; //filtro de raridade não esta funcionando, estudar depois o por que.
    const color = document.getElementById('cardColor').value;
    const type = document.getElementById('tipoDeCarta').value;
    const level = document.getElementById('level').value;
       //filtros de pesquisa.


   
   let apiUrl =`https://digimoncard.io/api-public/search.php?exact=true`; //buscas refinada para retornar somente cartas iguais ao pesquisado.

   //adicionando os filtros a pesquisa
   if(cardName) apiUrl += `&n=${encodeURIComponent(cardName)}`;
   if(rarity) apiUrl += `&rarity=${encodeURIComponent(rarity)}`;
   if(color) apiUrl += `&color=${encodeURIComponent(color)}`;
   if(level) apiUrl += `&level=${encodeURIComponent(level)}`;
   if(type) apiUrl += `&type=${encodeURIComponent(type)}`;

   console.log("URL da API gerada:", apiUrl); // Debug para ver a URL gerada

    const digiList = document.getElementById('digimonCardInfo');
    digiList.innerHTML = ""; //para limpar resultados anteriores.

 try
{
    //define a variavel resposta que é igual a esperar a busca de informações do nome do card na api
    const response = await fetch(apiUrl);
      
            if (!response.ok) {
                throw new Error(`Erro na solicitação da API. Status: ${response.status}`);
            }
            //A variavel data apenas transforma a resposta em um arquivo json.
            const data = await response.json();
            //console.log("Dados retornados pela API:", data); somente para ajudar no debug

            if(data.length === 0){
                digiList.innerHTML = "<p>Nenhuma carta encontrada.</p>";
                return;
            }

            allCards = data;        
            atualizarPagina(data.length);
            mostrarPaginaAtual(); //renderiza o resultado na tela.


        }catch(error){
            console.error("Erro ao buscar a carta:", error);
            digiList.innerHTML = "<p>Erro ao buscar a carta. Tente novamente.</p>";
        }
    }
                function mostrarPaginaAtual(){
                if (!allCards.length) return; //evita que a função seja chamada antes de allCards seja preenchido

                const digiList = document.getElementById('digimonCardInfo');
                digiList.innerHTML = "";
                
                const start = (currentPage - 1) * cardsPerPage;
                const end = start + cardsPerPage;
                const paginaCartas = allCards.slice(start, end);

                paginaCartas.forEach(digimon => {
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("imagem");

                const img = document.createElement("img");
                img.src = digimon.img_url || `https://images.digimoncard.io/images/cards/${digimon.id}.jpg` || "fallback-image.jpg";
                img.classList.add("imagemDigi");
                img.alt = digimon.name || "Digimon Card";

                const infoDiv = document.createElement("div");
                infoDiv.classList.add("infoTitle");

                const title = document.createElement("h2");
                title.classList.add("titulo");
                title.textContent = digimon.name || "Nome desconhecido";

                const infoText = document.createElement("p");
                infoText.classList.add("cartasInfo");
                infoText.innerHTML = (digimon.main_effect ? `<b>Efeito principal </b>${digimon.main_effect}` : "<b>Sem efeito</b>") + 
                 "<br>" +  "<br>" +
                 (digimon.source_effect ? `<b>Efeito de Herança: </b>${digimon.source_effect}` : "<b>sem efeito de herança</b>");

                infoDiv.appendChild(title);
                infoDiv.appendChild(infoText);
                cardDiv.appendChild(img);
                cardDiv.appendChild(infoDiv);
                digiList.appendChild(cardDiv);

            });}

    function atualizarPagina(resultadoTotal){
        const paginaDiv =   document.getElementById("pagina");
        paginaDiv.innerHTML = "";

        if(currentPage > 0){
            const prevButton = document.createElement("button");
            prevButton.textContent = "< Pagina Anterior.";
            prevButton.onclick = () => searchCard(currentPage - 1);
            paginaDiv.appendChild(prevButton);
        }

        if(allCards.length > currentPage * cardsPerPage){
            const nextButton = document.createElement("button");
            nextButton.textContent = "Proxima pagina >";
            nextButton.onclick = () => searchCard(currentPage + 1);
            paginaDiv.appendChild(nextButton);
        }
    }

    function alterarLimite(novoLimite){
        cardsPerPage = parseInt(novoLimite);
        searchCard(1);
    };
    

            //decidi tentar o metodo a cima para melhor otimização do codigo.


            
        //.then(data => {
            //console.log("data", data )
            //digiList.innerHTML = '';
            //digimon = elemento da array.
            //data.forEach(digimon => {
                //InnerHTML me permite escrever um HTML dentro do javascrip.
               // digiList.innerHTML += 
                //`<div class="imagem">
                //<img src="${digimon.image_url}" class="imagemDigi" id="cardImage" alt="Digimon card">
                //<div class="infoTitle">
                //<h2 id="tituloCarta" class="titulo">${digimon.name}</h2>
                //<p id="infoCarta" class="cartaInfos">${digimon.maineffect + "<br>" + digimon.soureeffect}</p>
                //</div>
        //</div>`
           // })
           //document.getElementById('cardImage').src = data.image;
            //document.getElementById('tituloCarta').innerText = data.title;
            //document.getElementById('infoCarta').innerText = data.description;
            //document.querySelector('.info').style.display = 'flex';
        //})
    //}

//};

function limpaText(){
  document.getElementById('rarity').value = "";
  document.getElementById('cardColor').value = "";
  document.getElementById('cardNameInput').value = "";
  document.getElementById('level').value= "";
  document.getElementById('tipoDeCarta').value ="";
};