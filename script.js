// 1. SCENE SETUP
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#canvas3d'), antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 2. 4D GEOMETRY (Torus Knot + Points)
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.05 });
const mesh = new THREE.Points(geometry, material);
scene.add(mesh);
camera.position.z = 30;

// 3. INTRO TO SITE TRANSITION
let hasTransitioned = false;

window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    
    // Switch from Intro to Main Site
    if (scroll > 50 && !hasTransitioned) {
        document.getElementById('intro-overlay').style.opacity = '0';
        document.getElementById('intro-overlay').style.transform = 'scale(2)';
        
        setTimeout(() => {
            document.getElementById('intro-overlay').classList.add('hidden');
            document.getElementById('main-site').classList.remove('hidden');
            setTimeout(() => document.getElementById('main-site').classList.add('visible'), 50);
            hasTransitioned = true;
        }, 1500);
    }

    // 4D EFFECT: Morphing shape based on scroll
    mesh.rotation.y = scroll * 0.005;
    mesh.rotation.x = scroll * 0.002;
    mesh.scale.set(1 + scroll * 0.001, 1 + scroll * 0.001, 1 + scroll * 0.001);
});

// 4. ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.z += 0.001;
    
    // Auto-scroll reveal trigger
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });

    renderer.render(scene, camera);
}
animate();

// Resize support
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});