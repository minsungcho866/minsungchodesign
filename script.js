    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const sphere = new THREE.SphereGeometry(2, 32, 32);
    const vertices = sphere.attributes.position;

    const textureLoader = new THREE.TextureLoader();

    const images = [
      "images/photo1.jpg",
      "images/photo2.jpg",
      "images/photo3.jpg",
      "images/photo4.jpg",
      "images/photo5.jpg",
      "images/photo6.jpg"
    ];

    for (let i = 0; i < vertices.count; i += 10) {
      const vertex = new THREE.Vector3().fromBufferAttribute(vertices, i);

      const planeGeo = new THREE.PlaneGeometry(0.4, 0.4);
      const texture = textureLoader.load(images[i % images.length]);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
      });

      const plane = new THREE.Mesh(planeGeo, material);
      plane.position.copy(vertex);
      plane.lookAt(0, 0, 0);

      group.add(plane);
    }

    window.addEventListener("mousemove", (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      group.rotation.y = x * Math.PI * 0.2;
      group.rotation.x = y * Math.PI * 0.2;
    });

    function animate() {
      requestAnimationFrame(animate);
      group.rotation.y += 0.001;
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });