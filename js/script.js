import './buildings.js';
import './sources.js';
import './transportation.js';



const CANVAS = document.getElementById('myCanvas');
const ctx = CANVAS.getContext('2d');
CANVAS.width = innerWidth;
CANVAS.height = innerHeight;




let offset = {y: 0, x: 0};
let baseCellSize = 50; // size of each grid cell with scale = 1.
let scale = 1;
function drawGrid() {
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    ctx.strokeStyle = '#ccc';
    ctx.beginPath();

    const step = baseCellSize * scale;
    const startX = -((offset.x % step) + step) % step;
    const startY = -((offset.y % step) + step) % step;

    for (let x = startX; x < CANVAS.width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS.height);
    }
    for (let y = startY; y < CANVAS.height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS.width, y);
    }
    ctx.stroke();
}
addEventListener('resize', () => {
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
});


let objects = [];
function init(){

}

function animate(){
    requestAnimationFrame(animate);
    drawGrid();
    // Update and draw objects here
    objects.forEach(object => {
        object.update();
    });     
}

init();
animate();