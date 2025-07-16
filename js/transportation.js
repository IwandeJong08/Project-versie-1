class Belt {
    constructor(x, y, rotation) {
        this.x = x; // X coordinate of the belt
        this.y = y; // Y coordinate of the belt
        this.rotation = rotation; // Rotation of the belt in degrees
    }
}

class Minecart {
    constructor(x, y, type) {
        this.x = x; // X coordinate of the minecart
        this.y = y; // Y coordinate of the minecart
        this.type = type; // Type of the minecart (e.g., 'normal', 'hopper', 'chest')
    }
}

class Rail {
    constructor() {
        this.x = null; // X coordinate of the rail
        this.y = null; // Y coordinate of the rail
        this.rotation = null; // Direction of the rail (e.g., 'straight', 'curve', 'turn')
    }
}

export { Belt, Minecart, Rail };