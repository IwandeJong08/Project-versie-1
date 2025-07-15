class Crafter {
    constructor(size, x, y){
        this.size = size;
        this.x = x;
        this.y = y;
    }
}

class Furnace {
    constructor(x, y){
        this.x = x;
        this.y = y;
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

export {Crafter, Furnace, Chest, EnderChest, Miner};