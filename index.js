


async function searchCard(){
    
    //variavel cardName, vai pegar o valor do nome digitado no campo input.
    const cardNameInput = document.getElementById('cardNameInput');
    const cardName = cardNameInput.value;
        //pesquisa o valor de cardName dentro da url da Api
   // console.log('Valor de cardName:', cardName);

   if(!cardName){
    alert("Digite o nome de uma carta!");
    return;
   }

   const apiUrl =`https://digimoncard.io/api-public/search.php?n=${encodeURIComponent(cardName)}&desc=include`; //

    const digiList = document.getElementById('digimonCardInfo');
    digiList.innerHTML = ""; //para limpar resultados anteriores.

 try
{
    //define a variavel resposta que é igual a esperar a busca de informações do nome do card na api
    const response = await fetch(apiUrl);
    
   
            if (!response.ok) {
                throw new Error(`Erro na solicitação da API. Status: ${response.status}`);
            }
            //data apenas transforma a resposta em um arquivo json.
            const data = await response.json();
            console.log("Dados retornados pela API:", data);

            if(data.length === 0){
                digiList.innerHTML = "<p>Nenhuma carta encontrada.</p>";
                return;
            }

            data.forEach(digimon => {
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("imagem");

                const img = document.createElement("img");
                img.src = `https://images.digimoncard.io/images/cards/${digimon.id}.jpg` || "fallback-image.jpg";
                img.classList.add("imagemDigi");
                img.alt = digimon.name || "Digimon Card";

                const infoDiv = document.createElement("div");
                infoDiv.classList.add("infoTitle");

                const title = document.createElement("h2");
                title.classList.add("titulo");
                title.textContent = digimon.name || "Nome desconhecido";

                const infoText = document.createElement("p");
                infoText.classList.add("cartasInfo");
                infoText.innerHTML = (digimon.main_effect ? `<b>Efeito principal </b>${digimon.main_effect}` : "Sem efeito") + 
                 "<br>" + 
                 (digimon.source_effect ? `<b>Efeito de Herança: </b>${digimon.source_effect}` : "sem efeito de herança");

                infoDiv.appendChild(title);
                infoDiv.appendChild(infoText);
                cardDiv.appendChild(img);
                cardDiv.appendChild(infoDiv);
                digiList.appendChild(cardDiv);

            });


        }catch(error){
            console.error("Erro ao buscar a carta:", error);
            digiList.innerHTML = "<p>Erro ao buscar a carta. Tente novamente.</p>";
        }
    }

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
  document.getElementById('cardNameInput').value = "";
};

fetch("https://digimoncard.io/api-public/search.php?n=Agumon")
    .then(response => response.json())
    .then(data => console.log("Data 2 retornada", data));