const PATH = '../textures/';

export function loadImages() {
    const images = {
        crafter: new Image(),
        furnace: new Image(),
        chest: new Image(),
        doubleChest: new Image(),
        enderChest: new Image(),
        miner: new Image(),
        rail: new Image()
    };

    images.crafter.src = PATH + "blocks/crafting_table_top.png";
    images.furnace.src = PATH + "blocks/furnace_front.png";
    images.chest.src = PATH + "blocks/chest_front.png";
    images.doubleChest.src = PATH + "blocks/chest_front.png";
    images.enderChest.src = PATH + "blocks/ender_chest_front.png";
    images.rail.src = PATH + "blocks/rail.png";

    return images;
}