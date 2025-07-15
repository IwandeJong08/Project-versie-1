const PATH = '../textures/';

export function loadImages() {
    const images = {
        crafter: new Image(),
        furnace: new Image(),
        chest: new Image(),
        enderChest: new Image(),
        miner: new Image()
    };

    images.crafter.src = PATH + "blocks/crafting_table_top.png";
    images.furnace.src = PATH + "blocks/furnace_front.png";

    return images;
}