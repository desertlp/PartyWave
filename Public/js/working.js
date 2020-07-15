console.log('blue');



// const likeIcon = document.getElementsByTagName('i');
// console.log(likeIcon);


const icon = document.querySelector('.likeSurfBoard');
console.log(icon);
icon.addEventListener('click', click);

function click () {
    console.log('clicked');
};