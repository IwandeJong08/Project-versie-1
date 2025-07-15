class Crafter {
    constructor(size, texture){
        this.size = size;
        this.x = null;
        this.y = null;

        this.texture = texture;
    }
}

class Furnace {
    constructor(texture){
        this.x = null;
        this.y = null;

        this.texture = texture
    }
}

class Chest {
    constructor(size, x, y){
        this.size = size;
        this.x = x;
        this.y = y;
    }
}

class EnderChest {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Miner {
    constructor( x, y){
        this.x = x;
        this.y = y;
    }
}

export { Crafter, Furnace, Chest, EnderChest, Miner };