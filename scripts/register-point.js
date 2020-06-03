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
    linkApiIBGE(`/${ufValue}/municipios`, citySelectEl);
}

citySelectEl.onchange = event => {
    writeInputValues(event, cidade);
}




