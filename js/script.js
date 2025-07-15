/**
 * Iwan Project - Version 1
 * This script handles the grid system, building placement, and user interactions.
 * It allows users to select buildings and place them on a grid.
 */


// IMPORTS
import { selectBuilding } from './ui.js'
import { Crafter, Furnace, Chest, EnderChest, Miner } from './buildings.js';
import { loadImages } from './sprites.js';

// CANVAS SETUP
const CANVAS = document.getElementById('myCanvas');
const ctx = CANVAS.getContext('2d');
CANVAS.width = innerWidth;
CANVAS.height = innerHeight;


// CLASSES
class Grid {
    constructor() {
        this.offset = {x: CANVAS.width/2, y: CANVAS.height/2};
        this.baseCellSize = 50; // size of each grid cell with scale = 1.
        this.scale = 1;

        this.sources = this.generateSources();
        this.buildings = []; // Default building for testing
    }

    /**
     * Generates an array of source objects. 
     * @returns {Array} - Returns an array of source objects.
     */
    generateSources = () => {return []};


    /**
     * Checks if a building can be placed at the specified coordinates.
     * Works for buildings of any size.
     * 
     * @param {Number} x - The x-coordinate of the building.
     * @param {Number} y - The y-coordinate of the building.
     * @param {Number} size - The size of the building.
     * @returns whether the building can be placed at the specified coordinates.
     */
    canPlace = (x, y, size) => {
        // Check if the coordinates are within the grid bounds
        return this.buildings.every(b => 
            !(b.x < x + size && 
              b.x + b.size > x && 
              b.y < y + size && 
              b.y + b.size > y));   
    }

    /**
     * Places a building on the grid at the specified coordinates.
     * @param {*} building - The building object to be placed on the grid.
     */
    placeBuilding = (building) => {
        if (GRID.canPlace(building.x, building.y, building.size)) {
            this.buildings.push(building);
        } else {
            console.warn("Cannot place building here, space is occupied.");
        }
    }

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
            
            if (building.texture) {
                ctx.drawImage(building.texture, 0, 0,
                    this.baseCellSize * this.scale * building.size,
                    this.baseCellSize * this.scale * building.size);
            } else {
                ctx.fillStyle = '#9900c4ff'; // Default color if no texture
                ctx.fillRect(0, 0, 
                    this.baseCellSize * this.scale * building.size,
                    this.baseCellSize * this.scale * building.size
                );
            }
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

// GLOBAL VARIABLES
const GRID = new Grid(); // handles placement of all buildings and sources
const HIGHLIGHT = {
    x: null,
    y: null,
    size: 1,
    color: 'rgba(0, 200, 255, 0.3)' // Highlight color
};


// MOUSE VARIABLES
const mouse = {x: 0, y: 0};
const mouseStart = {x: 0, y: 0}; // Used for panning the grid
let isPanning = false;

// EVENT LISTENERS
window.addEventListener("contextmenu", e => e.preventDefault());
window.addEventListener('mousedown', (e) => {
    e.preventDefault();
    switch (e.button) {
        case 0: // left mouse button: placing a building
            if (placingBuilding) {
                placingBuilding.x = HIGHLIGHT.x; // place building at highlighted position
                placingBuilding.y = HIGHLIGHT.y;
                GRID.placeBuilding(placingBuilding);
                placingBuilding = null; // Reset after placing
                HIGHLIGHT.x = null; // Reset highlight after placing
                HIGHLIGHT.y = null;
                HIGHLIGHT.size = 1; // Reset size to default
            }
            break;
        case 1: // middle mouse button
            break;
        case 2: // right mouse button: panning
            isPanning = true;
            mouseStart.x = e.clientX;
            mouseStart.y = e.clientY;
    }
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (isPanning) {
        // Panning the grid
        GRID.offset.x -= mouseStart.x - mouse.x;
        GRID.offset.y -= mouseStart.y - mouse.y;
        mouseStart.x = mouse.x;
        mouseStart.y = mouse.y;

        HIGHLIGHT.x = null;
        HIGHLIGHT.y = null; // Don't highlight while panning
    } else {
        // Hovering
        if (placingBuilding) {
            // Check if the building can be placed at the specified coordinates            
            HIGHLIGHT.color = (GRID.canPlace(HIGHLIGHT.x, HIGHLIGHT.y, placingBuilding.size)) 
                ? 'rgba(0, 255, 0, 0.3)'
                : 'rgba(255, 0, 0, 0.3)';
        } else {
            HIGHLIGHT.color = 'rgba(0, 200, 255, 0.3)'; // Default highlight color
        }

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


let placingBuilding = null;
selectBuilding((buildingType) => {
    switch (buildingType) {
        case 'crafter':
            placingBuilding = new Crafter(3, sprites.crafter);
            HIGHLIGHT.size = placingBuilding.size;
            break;
    }
});


let sprites;
function init(){
    sprites = loadImages();
}

function animate(){
    requestAnimationFrame(animate);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    GRID.update();
}

init();
animate();