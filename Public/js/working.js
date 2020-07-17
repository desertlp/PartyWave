// Change Color of Liked Beach Star

const icon = document.querySelector('.like-surf-board-icon');
console.log(icon);
icon.addEventListener('click', clickSurfBoard);

function clickSurfBoard(event) { 
    // need to call on the api route and push the beach to the user array
    console.log('clicked');
    fetch('/liked/api/v1/beaches', {
        credentials: 'include',
    })
        .then((stream) => stream.json())
        .then((data) => console.log(data)); // gets me the beach, sweet
};

//start with the js file and event listener that loads in the browser on the html page
// your function click needs to make a fetch call (done, it's trying but getting back html) to your api (your express server) with a route and method type that will update user collection. a path that would identify the user and the beach