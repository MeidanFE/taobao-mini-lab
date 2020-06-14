import { createScopedThreejs } from 'threejs-miniprogram';

Page({
  data:{
    systemInfo:my.getSystemInfoSync()
  },
  onReady() {
    console.log(this.data.systemInfo)
    const {windowWidth,windowHeight} = this.data.systemInfo;
    this.canvas = my._createCanvas({
      id: "canvas",
      success: (canvas) => {
        this.canvas = canvas;
        const THREE = createScopedThreejs(canvas)

        

        var camera, scene, renderer;
        var geometry, material, mesh;

        camera = new THREE.PerspectiveCamera(70,  windowWidth/ windowHeight, 0.01, 10);
        camera.position.z = 1;

        scene = new THREE.Scene();

        geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        material = new THREE.MeshNormalMaterial();

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer({ antialias: true,canvas:canvas });
  


        function animate() {

          canvas.requestAnimationFrame(animate);

          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.02;

          renderer.render(scene, camera);

        }

        animate();
      },
    });
  },
});