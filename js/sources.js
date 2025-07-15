class Tree{
    constructor(x,y, type){
        this.x = x;
        this.y = y;
        this.type = type; // e.g., 'oak', 'birch', 'spruce'
    }
}

class Mountain{
    constructor(x, y, type){
        this.x = x;
        this.y = y;
        this.type = type; // e.g., 'stone', 'diorite''
    }
}

class River{
    constructor(x, y, width){
        this.x = x;
        this.y = y;
        this.width = width; // Width of the river
    }
}