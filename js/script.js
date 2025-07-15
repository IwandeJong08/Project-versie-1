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
        this.offset = {x: 0, y: 0};
        this.baseCellSize = 50; // size of each grid cell with scale = 1.
        this.scale = 1;

        this.sources = this.generateSources();
        this.buildings = [];
    }

    generateSources() {return []};

    draw = () => {
        ctx.save();
    
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

        ctx.restore();
    }

    update = () => {

    }
}

let mouse = {x: 0, y: 0};
let mouseStart = {x: 0, y: 0};
let isPanning = false;
CANVAS.addEventListener("contextmenu", e => e.preventDefault());
CANVAS.addEventListener('mousedown', (e) => {
    if (e.button !== 2) return; // Only allow right-click for panning
    e.preventDefault();
    isPanning = true;
    mouseStart.x = e.clientX;
    mouseStart.y = e.clientY;
});

CANVAS.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (isPanning) {
        offset.x = mouseStart.x - mouse.x;
        offset.y = mouseStart.y - mouse.y;
    }
});

CANVAS.addEventListener('mouseup', (e) => {
    isPanning = false;
});

CANVAS.addEventListener('resize', () => {
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