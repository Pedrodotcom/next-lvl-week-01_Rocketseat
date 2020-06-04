// API IBGE

    const ufSelectEl = document.querySelector('[name=uf]');
    const estado = document.querySelector('[name=estado]');

    const citySelectEl = document.querySelector('[name=cities]');
    const cidade = document.querySelector('[name=cidade]');

    const linkApiIBGE = (path, select) => {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados${path}?orderBy=nome`)
            .then( response => response.json() )
            .then( data => {
                for( item of data) {
                    select.innerHTML += `<option value="${item.id}">${item.nome}</option>`;
                };
            }).catch( err => {
                alert("[ERRO] Recarregue a página e tente novamente!");
                console.warn(`Erro na API - IBGE - ${err}`);
            })
    }

    const writeInputValues = (event, subject) => {
        const indexOfSelectedList = event.target.selectedIndex;
        subject.value = event.target.options[indexOfSelectedList].text;
    };

    linkApiIBGE("", ufSelectEl);

    ufSelectEl.onchange = function getCities(event) {
        const ufValue = event.target.value;
        writeInputValues(event, estado);

        citySelectEl.disabled = false;
        citySelectEl.innerHTML = `<option value="">Selecione a cidade</option>`
        linkApiIBGE(`/${ufValue}/municipios`, citySelectEl);
    }

    citySelectEl.onchange = event => {
        writeInputValues(event, cidade);
    }

// Itens de coleta

const images = [
    "https://images.pexels.com/photos/1495580/pexels-photo-1495580.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/698485/pexels-photo-698485.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/1555199/pexels-photo-1555199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/719399/pexels-photo-719399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://cdn4.ecycle.com.br/cache/images/50-650-lixo-organico.jpg",
    "https://cdn4.ecycle.com.br/cache/images/materias/Nomundo/2013-05/50-750-garrafas.jpg"
]

let selectedItems = [];
const itemsToCollect = document.querySelectorAll('.items-grid li');
const itemsInput = document.querySelector('[name=items]');
const itemsImages = document.querySelector('[name=picture-items]');

    for(item of itemsToCollect) {
        item.onclick = event => {
            const itemLi = event.target;
                itemLi.classList.toggle('selected');

            const itemId = itemLi.dataset.id;
                if(selectedItems.indexOf(itemId) == -1) {
                    selectedItems.push(itemId);
                } else {
                    selectedItems.splice(selectedItems.indexOf(itemId), 1);
                };

            itemsInput.value = selectedItems.sort();
            
            // Inserindo uma imagem aleatória de um dos itens coletados

            let imagesToSelect = selectedItems.map(item => item - 1);
                let randomIndex = imagesToSelect[parseInt(Math.random() * imagesToSelect.length)];
            itemsImages.value = images[randomIndex];
        };
    };
    