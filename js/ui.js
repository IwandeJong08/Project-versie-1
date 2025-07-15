let onBuildingSelect = null;

const building = {
    blue: document.querySelector("#building-blue"),
}

building.blue.addEventListener("click", () => {
    if (onBuildingSelect) onBuildingSelect("crafter");
});





export function selectBuilding(callback) {
    onBuildingSelect = callback;
}