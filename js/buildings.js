class Crafter {
    constructor(size, texture){
        this.size = size;
        this.x = null;
        this.y = null;
        this.texture = texture;
        this.items = [];
        this.result = [];
        this.recipe = null;
    }

    addItem(item) {
        this.items.push(item);
    }

    setRecipe(recipe) {
        this.recipe = recipe;
    } 
    

    crafting() {
        
        let craftable = false;
        this.recipe.ingriedients.forEach(part => {
            if(this.items.includes(part)) {
                craftable = true
            } else {
                craftable = false
            }

            
        })
        if(craftable) {
            this.recipe.ingriedients.forEach(part => {
                this.items.find(item => item == part).destroy;
            });
            this.result.push(this.recipe.result);
        }
    }

    update(){
        this.crafting();
        console.log("CRAFTING");
    }
}

class Furnace {
    constructor(texture){
        this.x = null;
        this.y = null;
        this.size = 1;
        this.texture = texture
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    update(){

    }
}

class Chest {
    constructor(texture){
        this.size = 1;
        this.x = null;
        this.y = null;
        this.texture = texture
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }   
    
    deleteItem(item){
        items.forEach(part => {
            if(part == item){
                part.destroy();
            }
        });
    }
}

class DoubleChest {
    constructor(texture){
        this.size = 2;
        this.x = null;
        this.y = null;
        this.texture = texture;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }
}   

class EnderChest {
    constructor(texture){
        this.size = 1; // Default size for Ender Chest
        this.x = null;
        this.y = null;
        this.texture = texture;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
        // Logic to add item to the Ender Chest
        // This could involve checking if the item already exists, etc.
    }
}

class Miner {
    constructor( x, y){
        this.x = x;
        this.y = y;
    }

    update(){

    }
}

export { Crafter, Furnace, Chest, DoubleChest, EnderChest, Miner };