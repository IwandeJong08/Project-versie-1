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


        // Draw highlight
        if (HIGHLIGHT.x !== null && HIGHLIGHT.y !== null) {
            ctx.save();
            ctx.fillStyle = HIGHLIGHT.color;
            ctx.globalAlpha = 0.5; // Semi-transparent highlight
            ctx.fillRect(
                HIGHLIGHT.x * this.baseCellSize * this.scale + this.offset.x,
                HIGHLIGHT.y * this.baseCellSize * this.scale + this.offset.y,
                this.baseCellSize * this.scale * HIGHLIGHT.size,
                this.baseCellSize * this.scale * HIGHLIGHT.size
            );
            ctx.restore();
        }


        ctx.restore();
    }

    update = () => {

        this.draw();
    }
}

const GRID = new Grid();
const HIGHLIGHT = {
    x: null,
    y: null,
    size: 1,
    color: 'rgba(255, 0, 0, 0.3)' // Highlight color
};


const mouse = {x: 0, y: 0};
const mouseStart = {x: 0, y: 0};
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

        HIGHLIGHT.x = null;
        HIGHLIGHT.y = null; // Don't highglight while panning
    } else {
        // Handle hover effects or other interactions here
        // determine which cell is hovered based on mouse position
        HIGHLIGHT.x = Math.floor((mouse.x - GRID.offset.x) / (GRID.baseCellSize * GRID.scale));
        HIGHLIGHT.y = Math.floor((mouse.y - GRID.offset.y) / (GRID.baseCellSize * GRID.scale));
    }
});

window.addEventListener('mouseup', (e) => {
    isPanning = false;
});

CANVAS.addEventListener('mouseleave', () => {
    isPanning = false;
    HIGHLIGHT.x = null;
    HIGHLIGHT.y = null; // Reset highlight when mouse leaves canvas
});

window.addEventListener('resize', () => {
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
});

function init(){;}

function animate(){
    requestAnimationFrame(animate);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    GRID.update();
}

init();
animate();