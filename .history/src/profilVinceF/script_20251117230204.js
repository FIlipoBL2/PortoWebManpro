const cube = document.getElementById("cube");

let rotX = -20, rotY = 20;
let velX = 0, velY = 0;
let isDragging = false;
let lastX = 0, lastY = 0;
let autoRotate = true;

function animate() {
    if (autoRotate) {
        // Auto rotation when idle
        rotY += 0.5;
    }
    
    // Apply throwing velocity
    if (!isDragging) {
        rotX += velX;
        rotY += velY;
        
        // Add friction
        velX *= 0.985;
        velY *= 0.985;
        
        // Stop when slow
        if (Math.abs(velX) < 0.01) velX = 0;
        if (Math.abs(velY) < 0.01) velY = 0;
        if (Math.abs(velX) < 0.01 && Math.abs(velY) < 0.01) autoRotate = truel
    }
    
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    requestAnimationFrame(animate);
}
animate();

// Drag start
cube.addEventListener("mousedown", (e) => {
    isDragging = true;
    autoRotate = false;
    lastX = e.clientX;
    lastY = e.clientY;
    velX = 0;
    velY = 0;
});

cube.addEventListener("mousedown", () => {
    console.log("CUBE CLICKED");
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
});

// Drag end
document.addEventListener("mouseup", () => {
    isDragging = false;
    
    // Resume auto rotation after 1 seconds of no throwing
    setTimeout(() => {
        if (velX === 0 && velY === 0) autoRotate = true;
    }, 500);
});

// Drag movement
document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    
    rotY += dx * 0.5;
    rotX -= dy * 0.5;
    
    // Store velocity for throw
    velY = dx * 0.35;
    velX = -dy * 0.35;
    
    lastX = e.clientX;
    lastY = e.clientY;
});