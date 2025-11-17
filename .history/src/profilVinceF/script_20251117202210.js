const cube = document.getElementById("cube");
  let rotX = -20, rotY = 20;
  let isDragging = false;
  let lastX, lastY;
  let autoRotate = true;

  function animate() {
    if (autoRotate) {
      rotY += 0.3;
      cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
    requestAnimationFrame(animate);
  }
  animate();

  cube.addEventListener("mousedown", (e) => {
    isDragging = true;
    autoRotate = false;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    setTimeout(() => autoRotate = true, 2000);
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;

    rotY += deltaX * 0.5;
    rotX -= deltaY * 0.5;

    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    lastX = e.clientX;
    lastY = e.clientY;
  });