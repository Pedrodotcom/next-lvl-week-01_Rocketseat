const images = [
    "https://images.pexels.com/photos/1495580/pexels-photo-1495580.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/698485/pexels-photo-698485.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/1555199/pexels-photo-1555199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/719399/pexels-photo-719399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://cdn4.ecycle.com.br/cache/images/50-650-lixo-organico.jpg",
    "https://cdn4.ecycle.com.br/cache/images/materias/Nomundo/2013-05/50-750-garrafas.jpg"
];

const itemsList = ['Lâmpadas', 'Pilhas e baterias', 'Papel e papelão', 'Resíduos eletrônicos', 'Resíduos orgânicos', 'Óleo de cozinha'];

const cards = document.querySelectorAll('.card h3');
const itemsImages = document.querySelectorAll('.card img');

cards.forEach((item, index, cards) => {
    let h3s = item.innerText.split(',');
    let itemNums = h3s.map(item => Number(item));

    // Inserindo uma imagem aleatória de um dos itens coletados no local

        let itemImage = itemsImages[index]

        let imagesToSelect = itemNums.map(el => el - 1);
        let randomIndex = imagesToSelect[parseInt(Math.random() * imagesToSelect.length)];
            itemImage.setAttribute('src', images[randomIndex]);

    // Inserindo uma listagem dinâmica dos itens coletados no local

        let list = itemNums.map(num => itemsList[num - 1]);
        list.forEach((d, i, list) => {
            if(i == 0) {
                item.innerHTML = d
            } else if (i > 0 && i < (list.length - 1)){
                item.innerHTML += ` ${d.toLowerCase()},`
            } else {
                item.innerHTML += ` e ${d.toLowerCase()}`
            }
        })
})

