import Game from "./game/main";
import { appState } from "./stateHandler";

const game = new Game();
game.init();

console.log(appState.loading)

// if(appState.loading){
//     const loader = document.querySelector('.loader');
//     console.log(loader)
//     loader.classList.replace('hidden', 'flex')
// }

// function validateUrlParams(evt: MouseEvent): void {
//     const params = new URLSearchParams(window.location.search);

//     params.forEach(elm => {
//         console.log("yoyo", elm)
//     })
// }

// window.addEventListener('onload', validateUrlParams)