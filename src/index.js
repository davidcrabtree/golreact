import {GameOfLife} from './GameOfLife.js';
import './MainCSS.css'

export const canvas = document.querySelector("#gamefield")
export const ctx = canvas.getContext("2d") //https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
let isRun = 0;

const game = new GameOfLife();
game.gameSetup();

window.onload = () => {
    //console.log("TESTVALUE");
    document.querySelector("#start-random").addEventListener("click", 
        () => {
            isRun = 1;
            game.arrayRandomize();
            game.fillArray();
            //console.log("Start Listener");
            let gameInterval = window.setInterval(()=>{
                if(isRun === 1){
                    game.runGame();
                }else{
                    window.clearInterval(gameInterval);
                }
            }, 300)
        }
    )
    document.querySelector("#stop").addEventListener("click",
        () => {
            //console.log("Stop Listener");
            isRun = 0;
            game.gameSetup();
        }
    )
}