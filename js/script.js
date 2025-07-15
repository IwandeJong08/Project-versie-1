import './buildings.js';
import './sources.js';
import './transportation.js';


const CANVAS = document.getElementById('myCanvas');
const ctx = CANVAS.getContext('2d');
CANVAS.width = innerWidth;
CANVAS.height = innerHeight;


class Cell {
    constructor(x, y, size, building) {
        this.x = x; // X position in grid
        this.y = y; // Y position in grid
        this.size = size; // Size of the cell
        this.building = building; // Building object
    }
}

class Grid {
    constructor() {
        this.offset = {x: CANVAS.width/2, y: CANVAS.height/2};
        this.baseCellSize = 50; // size of each grid cell with scale = 1.
        this.scale = 1;

        this.sources = this.generateSources();
        this.buildings = [{x: 0, y: 0, size: 3},];
    }

    generateSources() {return []};

    draw = () => {
        ctx.save();
    
        ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
        ctx.strokeStyle = '#ccc';
        ctx.beginPath();

        const step = this.baseCellSize * this.scale;
        const startX = ((this.offset.x % step) + step) % step;
        const startY = ((this.offset.y % step) + step) % step;

        for (let x = startX; x < CANVAS.width; x += step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, CANVAS.height);
        }
        for (let y = startY; y < CANVAS.height; y += step) {
            ctx.moveTo(0, y);
            ctx.lineTo(CANVAS.width, y);
        }
        ctx.stroke();


        // Draw buildings
        this.buildings.forEach(building => {
            ctx.save();
            ctx.translate(building.x * this.baseCellSize * this.scale + this.offset.x, 
                          building.y * this.baseCellSize * this.scale + this.offset.y);
            ctx.fillStyle = building.color || '#9900c488'; // Default color if not specified
            ctx.fillRect(0, 0, this.baseCellSize * this.scale * building.size, this.baseCellSize * this.scale * building.size);
            ctx.restore();
        });



        ctx.restore();
    }

    update = () => {
        this.draw();
    }
}

let mouse = {x: 0, y: 0};
let mouseStart = {x: 0, y: 0};
let isPanning = false;
window.addEventListener("contextmenu", e => e.preventDefault());
window.addEventListener('mousedown', (e) => {
    if (e.button !== 2) return; // Only allow right-click for panning
    e.preventDefault();
    isPanning = true;
    mouseStart.x = e.clientX;
    mouseStart.y = e.clientY;
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (isPanning) {
        GRID.offset.x -= mouseStart.x - mouse.x;
        GRID.offset.y -= mouseStart.y - mouse.y;
        mouseStart.x = mouse.x;
        mouseStart.y = mouse.y;
    }
});

window.addEventListener('mouseup', (e) => {
    isPanning = false;
});

window.addEventListener('resize', () => {
    console.log('Resizing canvas');
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
});


const GRID = new Grid();
function init(){;}

function animate(){
    requestAnimationFrame(animate);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    GRID.update();
}

init();
animate();