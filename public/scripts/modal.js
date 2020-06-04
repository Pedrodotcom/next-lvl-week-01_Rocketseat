const modal = document.querySelector('#modal');

document.getElementsByTagName('a')[1].onclick = () => {
    modal.classList.remove('hide');
}

document.querySelector('#modal header a').onclick = () => {
    modal.classList.add('hide')
}
