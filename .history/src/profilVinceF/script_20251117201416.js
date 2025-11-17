const cube = document.getElementById("cube");
let rotX = 20, rotY = 20;
let autoRotate = true;
let isDragging = false;
let lastX, lastY;
let idleTimer;

// Auto rotation loop
function animate() {
    if (autoRotate) {
        rotY += 0.3;
        rotX += 0.15;
        cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
    requestAnimationFrame(animate);
}
animate();

// Stop auto rotation on drag
cube.addEventListener("mousedown", (e) => {
    isDragging = true;
    autoRotate = false;
    lastX = e.clientX;
    lastY = e.clientY;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    
    // Restart auto rotation after 2 seconds of idling
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => autoRotate = true, 2000);
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    
    rotY += deltaX * 0.5;
    rotX -= deltaY * 0.5;
    
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
});