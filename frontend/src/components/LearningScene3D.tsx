import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface LearningScene3DProps {
  className?: string;
}

const LearningScene3D: React.FC<LearningScene3DProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0.2, y: 3.2, z: 3.8 });
  const [isHovered, setIsHovered] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState({ fps: 60, triangles: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    scene.fog = new THREE.Fog(0x0a0a1a, 10, 50);
    sceneRef.current = scene;

    // Camera setup with better positioning
    const camera = new THREE.PerspectiveCamera(
      65,
      mountRef.current.offsetWidth / mountRef.current.offsetHeight,
      0.1,
      1000
    );
    // 相机几乎正对显示器屏幕，微微右偏，高度与显示器屏幕基本平齐
    camera.position.set(0.2, 1.9, 3.8);
    camera.lookAt(0, 1.85, 0);
    cameraRef.current = camera;

    // Enhanced renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    // Main directional light (warm desk lamp effect)
    const directionalLight = new THREE.DirectionalLight(0xffa500, 2.5);
    directionalLight.position.set(3, 6, 4);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // Blue monitor glow with animation
    const monitorLight = new THREE.PointLight(0x4a90e2, 2.0, 12);
    monitorLight.position.set(0, 2.5, 1);
    scene.add(monitorLight);

    // Warm desk light with flickering effect
    const deskLight = new THREE.PointLight(0xffaa44, 1.5, 10);
    deskLight.position.set(-2, 3.5, -1);
    scene.add(deskLight);

    // RGB keyboard light
    const keyboardLight = new THREE.PointLight(0xff0080, 1.2, 6);
    keyboardLight.position.set(0, 1, 2.2);
    scene.add(keyboardLight);

    // Create wooden desk
    const createDesk = () => {
      const group = new THREE.Group();
      
      // Main desk surface
      const deskGeometry = new THREE.BoxGeometry(7, 0.3, 4.5);
      const deskMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8b4513,
        map: createWoodTexture(),
        normalMap: createWoodNormalMap(),
        roughness: 0.7,
        metalness: 0.1
      });
      const desk = new THREE.Mesh(deskGeometry, deskMaterial);
      desk.position.set(0, 0, 0);
      desk.receiveShadow = true;
      desk.castShadow = true;
      group.add(desk);

      // Desk legs
      const legGeometry = new THREE.BoxGeometry(0.15, 1.8, 0.15);
      const legMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x654321,
        roughness: 0.8,
        metalness: 0.1
      });
      
      const legPositions = [
        [-3.2, -0.9, -2], [3.2, -0.9, -2],
        [-3.2, -0.9, 2], [3.2, -0.9, 2]
      ];
      
      legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        group.add(leg);
      });

      return group;
    };

    // Create wood texture
    const createWoodTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      
      // Wood grain pattern
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(0, 0, 512, 512);
      
      for (let i = 0; i < 50; i++) {
        ctx.strokeStyle = `rgba(139, 69, 19, ${0.1 + Math.random() * 0.2})`;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * 512);
        ctx.lineTo(512, Math.random() * 512);
        ctx.stroke();
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      return texture;
    };

    // Create wood normal map
    const createWoodNormalMap = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      
      // Base normal color (neutral)
      ctx.fillStyle = '#8080ff';
      ctx.fillRect(0, 0, 512, 512);
      
      // Add some variation for wood grain normals
      for (let i = 0; i < 30; i++) {
        ctx.strokeStyle = `rgba(128, 128, ${200 + Math.random() * 55}, 0.3)`;
        ctx.lineWidth = 2 + Math.random() * 3;
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * 512);
        ctx.lineTo(512, Math.random() * 512);
        ctx.stroke();
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      return texture;
    };

    // Create monitor
    const createMonitor = () => {
      const group = new THREE.Group();
      
      // Monitor base - 调整位置与支架对齐
      const baseGeometry = new THREE.CylinderGeometry(0.5, 0.6, 0.15, 16);
      const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2a2a2a,
        roughness: 0.3,
        metalness: 0.8
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.set(0, 0.225, -0.1); // Z位置与支架对齐
      base.castShadow = true;
      group.add(base);

      // Monitor stand - 调整高度避免伸进屏幕
      const standGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.0, 12); // 高度从1.2降到1.0
      const standMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.2,
        metalness: 0.9
      });
      const stand = new THREE.Mesh(standGeometry, standMaterial);
      stand.position.set(0, 0.8, -0.1); // Y位置从0.9降到0.8，Z位置向后偏移-0.1避免与屏幕重叠
      stand.castShadow = true;
      group.add(stand);

      // Monitor arm - 连接支架和屏幕的连接臂
      const armGeometry = new THREE.BoxGeometry(0.12, 0.04, 0.3); 
      const armMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.2,
        metalness: 0.9
      });
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.set(0, 1.68, -0.08); // 连接支架顶部和屏幕背面
      arm.castShadow = true;
      group.add(arm);

      // Monitor bezel (outer frame) - 更窄更薄，金属光泽
      const bezelGeometry = new THREE.BoxGeometry(2.44, 1.64, 0.06); // 边框宽度缩小，厚度更薄
      const bezelMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x23272a,
        roughness: 0.18, // 更光滑
        metalness: 0.7,  // 明显金属感
        envMapIntensity: 1.2
      });
      const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
      bezel.position.set(0, 1.7, 0.01); // 更贴近屏幕
      bezel.castShadow = true;
      group.add(bezel);

      // Monitor screen (black when off) - 更薄
      const screenGeometry = new THREE.BoxGeometry(2.36, 1.56, 0.018); // 屏幕厚度更薄
      const screenMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000000,
        emissive: 0x001122,
        emissiveIntensity: 0.08,
        roughness: 0.1,
        metalness: 0.85
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(0, 1.7, 0.045); // 贴近bezel
      screen.castShadow = true;
      group.add(screen);

      // Screen content (code editor)
      const codeGeometry = new THREE.PlaneGeometry(2.28, 1.48);
      const codeTexture = createCodeTexture();
      const codeMaterial = new THREE.MeshStandardMaterial({ 
        map: codeTexture,
        transparent: true,
        emissive: 0x002244,
        emissiveIntensity: 0.25,
        roughness: 0.9,
        metalness: 0.0
      });
      const codeScreen = new THREE.Mesh(codeGeometry, codeMaterial);
      codeScreen.position.set(0, 1.7, 0.055); // 贴近屏幕表面
      group.add(codeScreen);

      // Monitor brand logo
      const logoGeometry = new THREE.PlaneGeometry(0.3, 0.1);
      const logoMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        emissive: 0x111111,
        emissiveIntensity: 0.2
      });
      const logo = new THREE.Mesh(logoGeometry, logoMaterial);
      logo.position.set(0, 1.0, 0.11);
      group.add(logo);

      group.position.set(0, 0.15, 1.2);
      return group;
    };

    // Create code texture
    const createCodeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      
      // Dark background
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 512, 512);
      
      // Code lines
      ctx.font = '12px monospace';
      const lines = [
        '// Learning System',
        'function learn() {',
        '  const skill = study();',
        '  const knowledge = practice();',
        '  return skill + knowledge;',
        '}',
        '',
        'const user = {',
        '  name: "学习者",',
        '  progress: 75,',
        '  goals: ["React", "TypeScript"]',
        '};'
      ];
      
      lines.forEach((line, i) => {
        let color = '#58a6ff'; // Default blue
        if (line.includes('//')) color = '#7c3aed'; // Comments in purple
        if (line.includes('function') || line.includes('const')) color = '#f97316'; // Keywords in orange
        if (line.includes('"')) color = '#10b981'; // Strings in green
        
        ctx.fillStyle = color;
        ctx.fillText(line, 20, 40 + i * 20);
      });
      
      return new THREE.CanvasTexture(canvas);
    };

    // Create keyboard
    const createKeyboard = () => {
      const group = new THREE.Group();
      
      // Keyboard base
      const keyboardGeometry = new THREE.BoxGeometry(2.2, 0.12, 0.9);
      const keyboardMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        roughness: 0.6,
        metalness: 0.2,
        emissive: 0x330033,
        emissiveIntensity: 0.1
      });
      const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
      keyboard.castShadow = true;
      group.add(keyboard);

      // Individual keys with RGB backlight
      const keyRows = [
        { keys: 13, yOffset: 0.3 },
        { keys: 13, yOffset: 0.15 },
        { keys: 12, yOffset: 0 },
        { keys: 10, yOffset: -0.15 }
      ];

      keyRows.forEach((row, rowIndex) => {
        for (let col = 0; col < row.keys; col++) {
          const keyGeometry = new THREE.BoxGeometry(0.13, 0.06, 0.13);
          const hue = (col + rowIndex * 3) % 360;
          const keyColor = new THREE.Color().setHSL(hue / 360, 0.7, 0.3);
          
          const keyMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xf0f0f0,
            roughness: 0.3,
            metalness: 0.1,
            emissive: keyColor,
            emissiveIntensity: 0.2
          });
          
          const key = new THREE.Mesh(keyGeometry, keyMaterial);
          key.position.set(
            (col - row.keys/2 + 0.5) * 0.16,
            0.09,
            row.yOffset
          );
          key.castShadow = true;
          group.add(key);
        }
      });

      // Spacebar
      const spaceGeometry = new THREE.BoxGeometry(1.2, 0.06, 0.13);
      const spaceMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf0f0f0,
        roughness: 0.3,
        metalness: 0.1,
        emissive: 0x0066ff,
        emissiveIntensity: 0.2
      });
      const spacebar = new THREE.Mesh(spaceGeometry, spaceMaterial);
      spacebar.position.set(0, 0.09, -0.35);
      spacebar.castShadow = true;
      group.add(spacebar);

      group.position.set(0, 0.21, 2.2);
      return group;
    };

    // Create mouse
    const createMouse = () => {
      const mouseGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.5);
      mouseGeometry.scale(1, 1, 1);
      const mouseMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
      const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
      mouse.position.set(1.5, 0.125, 2.8);
      mouse.castShadow = true;
      
      // Mouse wheel
      const wheelGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8);
      const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x555555 });
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(1.5, 0.16, 2.9);
      wheel.castShadow = true;
      
      const group = new THREE.Group();
      group.add(mouse);
      group.add(wheel);
      return group;
    };

    // Create speakers
    const createSpeakers = () => {
      const group = new THREE.Group();
      
      for (let i = 0; i < 2; i++) {
        const speakerGroup = new THREE.Group();
        
        // Speaker body
        const speakerGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.3);
        const speakerMaterial = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
        const speaker = new THREE.Mesh(speakerGeometry, speakerMaterial);
        speaker.castShadow = true;
        speakerGroup.add(speaker);

        // Speaker cone
        const coneGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02, 16);
        const coneMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const cone = new THREE.Mesh(coneGeometry, coneMaterial);
        cone.rotation.x = Math.PI / 2;
        cone.position.set(0, 0.1, 0.16);
        speakerGroup.add(cone);

        // LED indicator
        const ledGeometry = new THREE.SphereGeometry(0.02);
        const ledMaterial = new THREE.MeshLambertMaterial({ 
          color: 0x00ff00,
          emissive: 0x004400,
          emissiveIntensity: 0.5
        });
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(0.1, 0.3, 0.16);
        speakerGroup.add(led);

        speakerGroup.position.set(i === 0 ? -2.5 : 2.5, 0.5, 0.5);
        group.add(speakerGroup);
      }
      
      return group;
    };

    // Create coffee cup
    const createCoffeeCup = () => {
      const group = new THREE.Group();
      
      // Cup
      const cupGeometry = new THREE.CylinderGeometry(0.12, 0.1, 0.25, 16);
      const cupMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
      const cup = new THREE.Mesh(cupGeometry, cupMaterial);
      cup.castShadow = true;
      group.add(cup);

      // Coffee
      const coffeeGeometry = new THREE.CylinderGeometry(0.11, 0.09, 0.02, 16);
      const coffeeMaterial = new THREE.MeshLambertMaterial({ color: 0x4a2c17 });
      const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
      coffee.position.y = 0.12;
      group.add(coffee);

      // Handle
      const handleGeometry = new THREE.TorusGeometry(0.08, 0.02, 8, 16, Math.PI);
      const handleMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
      const handle = new THREE.Mesh(handleGeometry, handleMaterial);
      handle.rotation.z = Math.PI / 2;
      handle.position.set(0.15, 0, 0);
      group.add(handle);

      group.position.set(-1.5, 0.225, 2.5);
      return group;
    };

    // Create notebook
    const createNotebook = () => {
      const group = new THREE.Group();
      
      // Notebook pages
      const pagesGeometry = new THREE.BoxGeometry(0.6, 0.02, 0.8);
      const pagesMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
      const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
      pages.castShadow = true;
      group.add(pages);

      // Cover
      const coverGeometry = new THREE.BoxGeometry(0.62, 0.01, 0.82);
      const coverMaterial = new THREE.MeshLambertMaterial({ color: 0x2563eb });
      const cover = new THREE.Mesh(coverGeometry, coverMaterial);
      cover.position.y = 0.015;
      cover.castShadow = true;
      group.add(cover);

      group.position.set(-1.8, 0.125, 0.5);
      group.rotation.y = Math.PI / 6;
      return group;
    };

    // Create pen
    const createPen = () => {
      const penGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.6, 8);
      const penMaterial = new THREE.MeshLambertMaterial({ color: 0x2563eb });
      const pen = new THREE.Mesh(penGeometry, penMaterial);
      pen.position.set(-1.6, 0.15, 0.3);
      pen.rotation.z = Math.PI / 3;
      pen.castShadow = true;
      return pen;
    };

    // Create enhanced plant with realistic leaves
    const createPlant = () => {
      const group = new THREE.Group();
      
      // Pot
      const potGeometry = new THREE.CylinderGeometry(0.25, 0.2, 0.3, 12);
      const potMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
      const pot = new THREE.Mesh(potGeometry, potMaterial);
      pot.position.y = 0.15;
      pot.castShadow = true;
      group.add(pot);

      // Soil
      const soilGeometry = new THREE.CylinderGeometry(0.23, 0.23, 0.02, 12);
      const soilMaterial = new THREE.MeshLambertMaterial({ color: 0x4a3c1a });
      const soil = new THREE.Mesh(soilGeometry, soilMaterial);
      soil.position.y = 0.29;
      group.add(soil);

      // Plant stem
      const stemGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 6);
      const stemMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.y = 0.7;
      group.add(stem);

      // Create realistic leaves
      for (let i = 0; i < 8; i++) {
        const leafGeometry = new THREE.PlaneGeometry(0.2, 0.4);
        leafGeometry.translate(0, 0.2, 0);
        const leafMaterial = new THREE.MeshLambertMaterial({ 
          color: 0x228b22,
          side: THREE.DoubleSide 
        });
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        
        const angle = (i / 8) * Math.PI * 2;
        const height = 0.8 + (i % 3) * 0.1;
        leaf.position.set(
          Math.cos(angle) * 0.15,
          height,
          Math.sin(angle) * 0.15
        );
        leaf.rotation.y = angle;
        leaf.rotation.z = Math.PI / 6;
        leaf.castShadow = true;
        group.add(leaf);
      }

      group.position.set(-2.2, 0.1, 1.5);
      return group;
    };

    // Create stack of books with realistic details
    const createBookStack = () => {
      const group = new THREE.Group();
      
      const books = [
        { color: 0x8b0000, height: 0.05, title: 'React' },
        { color: 0x006400, height: 0.06, title: 'TypeScript' },
        { color: 0x4169e1, height: 0.04, title: 'Three.js' },
        { color: 0xff8c00, height: 0.05, title: 'Web Design' }
      ];

      books.forEach((book, i) => {
        const bookGeometry = new THREE.BoxGeometry(0.5, book.height, 0.8);
        const bookMaterial = new THREE.MeshLambertMaterial({ color: book.color });
        const bookMesh = new THREE.Mesh(bookGeometry, bookMaterial);
        
        bookMesh.position.y = i * book.height + book.height / 2;
        bookMesh.castShadow = true;
        group.add(bookMesh);

        // Book spine text (simplified as a colored strip)
        const spineGeometry = new THREE.BoxGeometry(0.02, book.height * 0.8, 0.6);
        const spineMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const spine = new THREE.Mesh(spineGeometry, spineMaterial);
        spine.position.set(0.24, i * book.height + book.height / 2, 0);
        group.add(spine);
      });

      group.position.set(2, 0.12, 1.2);
      group.rotation.y = Math.PI / 8;
      return group;
    };

    // Create desk lamp with realistic lighting
    const createDeskLamp = () => {
      const group = new THREE.Group();
      
      // Lamp base
      const baseGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.1, 12);
      const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x2c2c2c });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = 0.05;
      base.castShadow = true;
      group.add(base);

      // Lamp arm
      const armGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 8);
      const armMaterial = new THREE.MeshLambertMaterial({ color: 0x2c2c2c });
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.set(0.3, 0.8, 0);
      arm.rotation.z = Math.PI / 6;
      arm.castShadow = true;
      group.add(arm);

      // Lamp shade
      const shadeGeometry = new THREE.ConeGeometry(0.2, 0.3, 12, 1, true);
      const shadeMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xffffff,
        side: THREE.DoubleSide 
      });
      const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
      shade.position.set(0.5, 1.3, 0);
      shade.rotation.z = Math.PI / 4;
      shade.castShadow = true;
      group.add(shade);

      // Light bulb glow
      const bulbGeometry = new THREE.SphereGeometry(0.05);
      const bulbMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xffffaa,
        emissive: 0xffff88,
        emissiveIntensity: 0.5
      });
      const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
      bulb.position.set(0.5, 1.2, 0);
      group.add(bulb);

      group.position.set(-1.5, 0.1, 0.8);
      return group;
    };

    // Create computer case with realistic details
    const createComputerCase = () => {
      const group = new THREE.Group();
      
      // Main case body
      const caseGeometry = new THREE.BoxGeometry(0.8, 1.6, 1.2);
      const caseMaterial = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
      const computerCase = new THREE.Mesh(caseGeometry, caseMaterial);
      computerCase.castShadow = true;
      group.add(computerCase);

      // Tempered glass side panel
      const glassGeometry = new THREE.BoxGeometry(0.02, 1.4, 1);
      const glassMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x88ccff,
        transparent: true,
        opacity: 0.3
      });
      const glass = new THREE.Mesh(glassGeometry, glassMaterial);
      glass.position.set(-0.39, 0, 0);
      group.add(glass);

      // Power LED with pulsing effect
      const ledGeometry = new THREE.SphereGeometry(0.03);
      const ledMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x0066ff,
        emissive: 0x002266,
        emissiveIntensity: 0.8
      });
      const led = new THREE.Mesh(ledGeometry, ledMaterial);
      led.position.set(0.35, 0.6, 0.61);
      group.add(led);

      // RGB strips inside case (visible through glass)
      for (let i = 0; i < 4; i++) {
        const stripGeometry = new THREE.BoxGeometry(0.6, 0.02, 0.02);
        const stripMaterial = new THREE.MeshLambertMaterial({ 
          color: 0xff0080,
          emissive: 0x660033,
          emissiveIntensity: 0.6
        });
        const strip = new THREE.Mesh(stripGeometry, stripMaterial);
        strip.position.set(-0.3, 0.5 - i * 0.3, 0.4);
        group.add(strip);
      }

      // Ventilation grille with realistic spacing
      for (let i = 0; i < 10; i++) {
        const grillGeometry = new THREE.BoxGeometry(0.6, 0.02, 0.01);
        const grillMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const grill = new THREE.Mesh(grillGeometry, grillMaterial);
        grill.position.set(0, 0.4 - i * 0.08, 0.61);
        group.add(grill);
      }

      // Front I/O panel
      const ioGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.02);
      const ioMaterial = new THREE.MeshLambertMaterial({ color: 0x2a2a2a });
      const ioPanel = new THREE.Mesh(ioGeometry, ioMaterial);
      ioPanel.position.set(0.2, 0.7, 0.61);
      group.add(ioPanel);

      // USB ports
      for (let i = 0; i < 3; i++) {
        const usbGeometry = new THREE.BoxGeometry(0.04, 0.02, 0.01);
        const usbMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        const usb = new THREE.Mesh(usbGeometry, usbMaterial);
        usb.position.set(0.1 + i * 0.05, 0.7, 0.62);
        group.add(usb);
      }

      group.position.set(3.5, 0.9, 0);
      return group;
    };

    // Create floating particles for ambient effect
    const createParticles = () => {
      const particleCount = 50;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        // Random positions around the scene
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = Math.random() * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

        // Random colors (mostly blue tones)
        colors[i * 3] = 0.2 + Math.random() * 0.3;     // R
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4; // G  
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      return particleSystem;
    };

    // Enhanced floor with reflection-like effect
    const createFloor = () => {
      const floorGeometry = new THREE.PlaneGeometry(25, 25, 32, 32);
      
      // Create a subtle pattern for the floor
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      
      // Dark base
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, 512, 512);
      
      // Add subtle grid pattern
      ctx.strokeStyle = '#2a2a3e';
      ctx.lineWidth = 1;
      for (let i = 0; i < 512; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }
      
      const floorTexture = new THREE.CanvasTexture(canvas);
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(4, 4);
      
      const floorMaterial = new THREE.MeshLambertMaterial({ 
        map: floorTexture,
        transparent: true,
        opacity: 0.8
      });
      
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.1;
      floor.receiveShadow = true;
      
      return floor;
    };

    // Add all objects to scene
    scene.add(createDesk());
    scene.add(createMonitor());
    scene.add(createKeyboard());
    scene.add(createMouse());
    scene.add(createSpeakers());
    scene.add(createCoffeeCup());
    scene.add(createNotebook());
    scene.add(createPen());
    scene.add(createComputerCase());
    scene.add(createPlant());
    scene.add(createBookStack());
    scene.add(createDeskLamp());
    scene.add(createParticles());
    scene.add(createFloor());

    // Add floor with wood texture
    const floorGeometry = new THREE.PlaneGeometry(25, 25);
    const floorTexture = createWoodTexture();
    floorTexture.repeat.set(8, 8);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      map: floorTexture,
      color: 0x654321,
      roughness: 0.8,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.15;
    floor.receiveShadow = true;
    scene.add(floor);

    // Add back wall
    const wallGeometry = new THREE.PlaneGeometry(25, 15);
    
    // 创建更亮的墙面纹理，添加沙漏图案
    const createBrightWallTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;
      
      // 明亮的渐变底色
      const grad = ctx.createLinearGradient(0, 0, 0, 1024);
      grad.addColorStop(0, '#5a5a9a');  // 更亮的蓝紫色
      grad.addColorStop(0.5, '#4a4a8a');
      grad.addColorStop(1, '#3a3a7a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);
      
      // 添加沙漏图案
      const drawHourglass = (x: number, y: number, size: number) => {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';  // 金色沙漏
        ctx.font = `${size}px Arial`;
        ctx.fillText('⌛', x, y);
      };
      
      // 在墙面上绘制多个沙漏
      for (let i = 0; i < 15; i++) {
        const x = (i % 5) * 200 + 100;
        const y = Math.floor(i / 5) * 250 + 150;
        drawHourglass(x, y, 80 + Math.random() * 40);
      }
      
      // 添加装饰线条
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 1024, 0);
        ctx.lineTo(Math.random() * 1024, 1024);
        ctx.stroke();
      }
      
      return new THREE.CanvasTexture(canvas);
    };
    
    const wallTexture = createBrightWallTexture();
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(2, 1);
    
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      map: wallTexture,
      color: 0xffffff,  // 白色混合让墙面更亮
      roughness: 0.8,
      metalness: 0.0
    });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(0, 7, -5);
    wall.receiveShadow = true;
    scene.add(wall);

    // Performance monitoring
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;
    
    const updateFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
      }
    };

    // Debug info update
    const updateDebugInfo = () => {
      if (rendererRef.current && sceneRef.current) {
        const info = rendererRef.current.info;
        setDebugInfo({
          fps: fps,
          triangles: info.render.triangles
        });
      }
    };

    // Update debug info every second
    const debugInterval = setInterval(updateDebugInfo, 1000);

    // Adaptive quality based on performance
    const adjustQuality = () => {
      if (fps < 30 && renderer.getPixelRatio() > 1) {
        renderer.setPixelRatio(1);
      } else if (fps > 50 && renderer.getPixelRatio() < 1.5) {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      }
    };

    // Enhanced animation loop with performance monitoring
    const clock = new THREE.Clock();
    let rgbTime = 0;
    let performanceCheckInterval = 0;
    
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const deltaTime = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      rgbTime += deltaTime;
      
      // Update FPS counter
      updateFPS();
      
      // Check performance every 60 frames
      performanceCheckInterval++;
      if (performanceCheckInterval >= 60) {
        adjustQuality();
        performanceCheckInterval = 0;
      }

      // Smooth camera rotation around vertical axis instead of position changes
      if (cameraRef.current) {
        const camera = cameraRef.current;
        
        // Set fixed camera distance and height
        const radius = 3.8;
        const baseHeight = 1.9;
        const baseAngle = 0.05; // 约3度的右偏角度
        
        // Add gentle rotation around vertical axis with hover effect
        let rotationSpeed = 0.2; // 慢速旋转
        if (isHovered) {
          rotationSpeed *= 1.5; // Slightly faster rotation when hovered
        }
        
        const angle = baseAngle + Math.sin(elapsedTime * rotationSpeed) * 0.17; // ±10度摆动
        
        // Calculate camera position in circular motion
        camera.position.x = Math.sin(angle) * radius;
        camera.position.z = Math.cos(angle) * radius;
        camera.position.y = baseHeight + Math.sin(elapsedTime * 0.3) * 0.05; // 轻微上下浮动
        
        // Always look at the monitor screen center
        camera.lookAt(0, 1.85, 0);
      }
      
      // Animate monitor light intensity
      monitorLight.intensity = 1.2 + Math.sin(elapsedTime * 2) * 0.2;
      
      // Animate RGB keyboard light
      const hue = (rgbTime * 50) % 360;
      keyboardLight.color.setHSL(hue / 360, 1, 0.5);
      
      // Animate desk light flickering
      deskLight.intensity = 0.8 + Math.sin(elapsedTime * 5) * 0.1;
      
      renderer.render(scene, camera);
    };

    animate();

    // Enhanced resize handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const width = mountRef.current.offsetWidth;
      const height = mountRef.current.offsetHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Mouse movement handler (removed dynamic position changes)
    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      mouseRef.current = { x, y };
      
      // No longer update target position - keep camera stable
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    if (mountRef.current) {
      mountRef.current.addEventListener('mousemove', handleMouseMove);
      mountRef.current.addEventListener('mouseenter', handleMouseEnter);
      mountRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        mountRef.current.removeEventListener('mouseenter', handleMouseEnter);
        mountRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      clearInterval(debugInterval);
    };
  }, [isHovered]);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mountRef} 
        className={`w-full h-full cursor-pointer transition-all duration-300 ${className || ''} ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        style={{ minHeight: '400px' }}
        onDoubleClick={() => setShowDebug(!showDebug)}
      />
      
      {/* Debug Panel */}
      {showDebug && (
        <div className="absolute top-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono">
          <div>FPS: {debugInfo.fps}</div>
          <div>Triangles: {debugInfo.triangles.toLocaleString()}</div>
          <div className="text-gray-400 mt-1">Double-click to hide</div>
        </div>
      )}
      
      {/* Loading indicator */}
      {!sceneRef.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
          <div className="text-white text-lg">Loading 3D Scene...</div>
        </div>
      )}
    </div>
  );
};

export default LearningScene3D;
