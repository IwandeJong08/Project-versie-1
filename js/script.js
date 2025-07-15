const CANVAS = document.getElementById('myCanvas');
const ctx = CANVAS.getContext('2d');
CANVAS.width = innerWidth;
CANVAS.height = innerHeight;






let objecjts = [];





function init(){

}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    // Update and draw objects here
    objecjts.forEach(object => {
        object.update();
    });     
}

init();
animate();