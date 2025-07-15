let onBuildingSelect = null;

const building = {
    blue: document.querySelector("#building-blue"),
    red: document.querySelector("#building-red"),
    green: document.querySelector("#building-green"),   
    purple: document.querySelector("#building-purple"),
    yellow: document.querySelector("#building-yellow"),
}

building.blue.addEventListener("click", () => {
    if (onBuildingSelect) onBuildingSelect("crafter");
});

building.red.addEventListener("click", () => {
    if (onBuildingSelect) onBuildingSelect("furnace");
});

building.green.addEventListener("click", () => {
    if (onBuildingSelect) onBuildingSelect("chest");
});

building.purple.addEventListener("click", () => {
    if (onBuildingSelect) onBuildingSelect("double_chest");
});

building.yellow.addEventListener("click", () => {
    if (onBuildingSelect) onBuildingSelect("enderchest");
});







export function selectBuilding(callback) {
    onBuildingSelect = callback;
}