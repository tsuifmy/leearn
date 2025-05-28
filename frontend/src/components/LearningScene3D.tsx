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

    // Enhanced lighting setup - 温暖基础照明
    const ambientLight = new THREE.AmbientLight(0xffeaa7, 1.0); // 提高环境光强度，使用温暖色调
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

    // 添加斜上方温暖光照 - 主要照明源
    const cozyTopLight = new THREE.DirectionalLight(0xffeaa7, 1.8); // 温暖的奶黄色
    cozyTopLight.position.set(-4, 8, 3); // 左上方斜照
    cozyTopLight.castShadow = true;
    cozyTopLight.shadow.mapSize.width = 2048;
    cozyTopLight.shadow.mapSize.height = 2048;
    cozyTopLight.shadow.camera.near = 0.1;
    cozyTopLight.shadow.camera.far = 30;
    cozyTopLight.shadow.camera.left = -8;
    cozyTopLight.shadow.camera.right = 8;
    cozyTopLight.shadow.camera.top = 8;
    cozyTopLight.shadow.camera.bottom = -8;
    scene.add(cozyTopLight);

    // 右上方补光 - 平衡阴影
    const fillLight = new THREE.DirectionalLight(0xffd3a5, 1.2); // 温暖的桃色补光
    fillLight.position.set(5, 6, 2); // 右上方
    fillLight.castShadow = false; // 补光不产生阴影
    scene.add(fillLight);

    // 顶部柔和环境光 - 营造整体温馨氛围
    const softTopLight = new THREE.HemisphereLight(0xffeaa7, 0xff9a8b, 0.6); // 上方暖色，下方偏红
    softTopLight.position.set(0, 10, 0);
    scene.add(softTopLight);

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
      
      // Monitor base - 调整位置与支架对齐，完全在屏幕后面
      const baseGeometry = new THREE.CylinderGeometry(0.5, 0.6, 0.15, 16);
      const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2a2a2a,
        roughness: 0.3,
        metalness: 0.8
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.set(0, 0.225, -0.15); // Z位置与支架对齐，更向后
      base.castShadow = true;
      group.add(base);

      // Monitor stand - 调整高度和强度以支撑更大显示器
      const standGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.05, 12); // 稍微增高以支撑更大屏幕
      const standMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.2,
        metalness: 0.9
      });
      const stand = new THREE.Mesh(standGeometry, standMaterial);
      stand.position.set(0, 0.825, -0.15); // 稍微提高以适应更大屏幕
      stand.castShadow = true;
      group.add(stand);

      // Monitor arm - 连接支架和屏幕的连接臂，增强以支撑更大屏幕
      const armGeometry = new THREE.BoxGeometry(0.12, 0.04, 0.28); // 稍微增大以支撑更大屏幕
      const armMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.2,
        metalness: 0.9
      });
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.set(0, 1.75, -0.15); // 提高位置适应更大屏幕
      arm.castShadow = true;
      group.add(arm);

      // Monitor bezel (outer frame) - 更窄更薄，金属光泽，更大尺寸
      const bezelGeometry = new THREE.BoxGeometry(3.25, 2.19, 0.06); // 增大约33%
      const bezelMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x23272a,
        roughness: 0.18, // 更光滑
        metalness: 0.7,  // 明显金属感
        envMapIntensity: 1.2
      });
      const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
      bezel.position.set(0, 1.8, 0.01); // 稍微调高位置适应更大屏幕
      bezel.castShadow = true;
      group.add(bezel);

      // Monitor screen (black when off) - 更薄，更大尺寸
      const screenGeometry = new THREE.BoxGeometry(3.15, 2.08, 0.018); // 增大约33%
      const screenMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000000,
        emissive: 0x001122,
        emissiveIntensity: 0.08,
        roughness: 0.1,
        metalness: 0.85
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(0, 1.8, 0.045); // 贴近bezel，调高位置
      screen.castShadow = true;
      group.add(screen);

      // Screen content (code editor) - 更大尺寸
      const codeGeometry = new THREE.PlaneGeometry(3.04, 1.97); // 增大约33%
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
      codeScreen.position.set(0, 1.8, 0.055); // 贴近屏幕表面，调高位置适应更大屏幕
      group.add(codeScreen);

      // Monitor brand logo - 调整位置适应更大屏幕
      const logoGeometry = new THREE.PlaneGeometry(0.3, 0.1);
      const logoMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        emissive: 0x111111,
        emissiveIntensity: 0.2
      });
      const logo = new THREE.Mesh(logoGeometry, logoMaterial);
      logo.position.set(0, 1.05, 0.11); // 稍微调高位置适应更大屏幕
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

    // Create enhanced mouse with modern design
    const createMouse = () => {
      const group = new THREE.Group();
      
      // Modern mouse body with curves
      const mouseGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.5);
      // Add curves to the mouse
      mouseGeometry.scale(1, 1.2, 1);
      const mouseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2a2a2a,
        roughness: 0.3,
        metalness: 0.1,
        emissive: 0x111111,
        emissiveIntensity: 0.05
      });
      const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
      mouse.position.set(1.5, 0.125, 2.8);
      mouse.castShadow = true;
      group.add(mouse);
      
      // Mouse wheel with metallic finish
      const wheelGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 12);
      const wheelMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x666666,
        roughness: 0.2,
        metalness: 0.8
      });
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(1.5, 0.16, 2.9);
      wheel.castShadow = true;
      group.add(wheel);

      // Mouse buttons (left and right click)
      const leftButtonGeometry = new THREE.BoxGeometry(0.12, 0.02, 0.2);
      const rightButtonGeometry = new THREE.BoxGeometry(0.12, 0.02, 0.2);
      const buttonMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3a3a3a,
        roughness: 0.4,
        metalness: 0.05
      });
      
      const leftButton = new THREE.Mesh(leftButtonGeometry, buttonMaterial);
      leftButton.position.set(1.44, 0.158, 2.9);
      group.add(leftButton);
      
      const rightButton = new THREE.Mesh(rightButtonGeometry, buttonMaterial);
      rightButton.position.set(1.56, 0.158, 2.9);
      group.add(rightButton);

      // RGB LED strip at the bottom
      const ledGeometry = new THREE.BoxGeometry(0.25, 0.01, 0.4);
      const ledMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff0066,
        emissive: 0xff0066,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.8
      });
      const rgbLed = new THREE.Mesh(ledGeometry, ledMaterial);
      rgbLed.position.set(1.5, 0.105, 2.8);
      group.add(rgbLed);
      
      return group;
    };

    // Create speakers with modern design and premium materials
    const createSpeakers = () => {
      const group = new THREE.Group();
      
      for (let i = 0; i < 2; i++) {
        const speakerGroup = new THREE.Group();
        
        // Speaker body with premium matte finish
        const speakerGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.3);
        const speakerMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x1a1a1a,
          roughness: 0.8,
          metalness: 0.1,
          emissive: 0x0a0a0a,
          emissiveIntensity: 0.05
        });
        const speaker = new THREE.Mesh(speakerGeometry, speakerMaterial);
        speaker.castShadow = true;
        speakerGroup.add(speaker);

        // Main speaker cone with realistic details
        const coneGeometry = new THREE.CylinderGeometry(0.15, 0.12, 0.03, 24);
        const coneMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x333333,
          roughness: 0.6,
          metalness: 0.2
        });
        const cone = new THREE.Mesh(coneGeometry, coneMaterial);
        cone.rotation.x = Math.PI / 2;
        cone.position.set(0, 0.1, 0.16);
        speakerGroup.add(cone);

        // Tweeter (small speaker)
        const tweeterGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.02, 16);
        const tweeterMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x444444,
          roughness: 0.4,
          metalness: 0.3
        });
        const tweeter = new THREE.Mesh(tweeterGeometry, tweeterMaterial);
        tweeter.rotation.x = Math.PI / 2;
        tweeter.position.set(0, -0.2, 0.16);
        speakerGroup.add(tweeter);

        // Speaker grille
        for (let j = 0; j < 8; j++) {
          const grillGeometry = new THREE.BoxGeometry(0.25, 0.01, 0.01);
          const grillMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x666666,
            roughness: 0.3,
            metalness: 0.7
          });
          const grill = new THREE.Mesh(grillGeometry, grillMaterial);
          grill.position.set(0, 0.2 - j * 0.05, 0.16);
          speakerGroup.add(grill);
        }

        // LED indicator with pulsing effect
        const ledGeometry = new THREE.SphereGeometry(0.015);
        const ledMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x00ff88,
          emissive: 0x004422,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.9
        });
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(0.12, 0.35, 0.16);
        speakerGroup.add(led);

        // Speaker base with rubber feet
        const baseGeometry = new THREE.CylinderGeometry(0.18, 0.2, 0.02, 16);
        const baseMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x2a2a2a,
          roughness: 0.9,
          metalness: 0.05
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(0, -0.41, 0);
        speakerGroup.add(base);

        speakerGroup.position.set(i === 0 ? -2.5 : 2.5, 0.5, 0.5);
        group.add(speakerGroup);
      }
      
      return group;
    };

    // Create premium coffee cup with realistic details
    const createCoffeeCup = () => {
      const group = new THREE.Group();
      
      // Premium ceramic cup with subtle texture
      const cupGeometry = new THREE.CylinderGeometry(0.12, 0.1, 0.25, 24);
      const cupMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.05,
        emissive: 0x111111,
        emissiveIntensity: 0.02
      });
      const cup = new THREE.Mesh(cupGeometry, cupMaterial);
      cup.castShadow = true;
      group.add(cup);

      // Rich coffee with foam
      const coffeeGeometry = new THREE.CylinderGeometry(0.11, 0.09, 0.02, 24);
      const coffeeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4a2c17,
        roughness: 0.8,
        metalness: 0.0,
        emissive: 0x2a1509,
        emissiveIntensity: 0.1
      });
      const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
      coffee.position.y = 0.12;
      group.add(coffee);

      // Coffee foam layer
      const foamGeometry = new THREE.CylinderGeometry(0.105, 0.095, 0.005, 24);
      const foamMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf5e6d3,
        roughness: 0.9,
        metalness: 0.0,
        transparent: true,
        opacity: 0.8
      });
      const foam = new THREE.Mesh(foamGeometry, foamMaterial);
      foam.position.y = 0.125;
      group.add(foam);

      // Elegant handle with modern design
      const handleGeometry = new THREE.TorusGeometry(0.08, 0.015, 8, 20, Math.PI);
      const handleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.05
      });
      const handle = new THREE.Mesh(handleGeometry, handleMaterial);
      handle.rotation.z = Math.PI / 2;
      handle.position.set(0.15, 0, 0);
      group.add(handle);

      // Coffee steam particles
      const steamGroup = new THREE.Group();
      for (let i = 0; i < 5; i++) {
        const steamGeometry = new THREE.SphereGeometry(0.005, 8, 6);
        const steamMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xffffff,
          transparent: true,
          opacity: 0.3 - i * 0.05,
          emissive: 0x222222,
          emissiveIntensity: 0.1
        });
        const steam = new THREE.Mesh(steamGeometry, steamMaterial);
        steam.position.set(
          (Math.random() - 0.5) * 0.1, 
          0.15 + i * 0.03, 
          (Math.random() - 0.5) * 0.1
        );
        steamGroup.add(steam);
      }
      group.add(steamGroup);

      group.position.set(-1.5, 0.225, 2.5);
      return group;
    };

    // Create premium notebook with realistic details
    const createNotebook = () => {
      const group = new THREE.Group();
      
      // High-quality notebook pages with subtle texture
      const pagesGeometry = new THREE.BoxGeometry(0.6, 0.02, 0.8);
      const pagesMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        roughness: 0.8,
        metalness: 0.0,
        emissive: 0x0f0f0f,
        emissiveIntensity: 0.02
      });
      const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
      pages.castShadow = true;
      group.add(pages);

      // Premium cover with embossed logo
      const coverGeometry = new THREE.BoxGeometry(0.62, 0.01, 0.82);
      const coverMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2563eb,
        roughness: 0.3,
        metalness: 0.1,
        emissive: 0x102040,
        emissiveIntensity: 0.05
      });
      const cover = new THREE.Mesh(coverGeometry, coverMaterial);
      cover.position.y = 0.015;
      cover.castShadow = true;
      group.add(cover);

      // Spiral binding with metallic finish
      for (let i = 0; i < 15; i++) {
        const ringGeometry = new THREE.TorusGeometry(0.015, 0.005, 6, 12);
        const ringMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x888888,
          roughness: 0.2,
          metalness: 0.8
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(-0.25, 0.02, -0.35 + (i * 0.05));
        ring.rotation.y = Math.PI / 2;
        group.add(ring);
      }

      // Bookmark ribbon
      const bookmarkGeometry = new THREE.BoxGeometry(0.02, 0.005, 0.4);
      const bookmarkMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff6b35,
        roughness: 0.6,
        metalness: 0.0
      });
      const bookmark = new THREE.Mesh(bookmarkGeometry, bookmarkMaterial);
      bookmark.position.set(0.2, 0.025, 0);
      group.add(bookmark);

      group.position.set(-1.8, 0.125, 0.5);
      group.rotation.y = Math.PI / 6;
      return group;
    };

    // Create premium pen with realistic details
    const createPen = () => {
      const group = new THREE.Group();
      
      // Pen body with premium metallic finish
      const bodyGeometry = new THREE.CylinderGeometry(0.012, 0.008, 0.5, 16);
      const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e3a8a,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0x051560,
        emissiveIntensity: 0.05
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0.25;
      body.castShadow = true;
      group.add(body);

      // Pen tip with black ink
      const tipGeometry = new THREE.CylinderGeometry(0.002, 0.004, 0.05, 8);
      const tipMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000000,
        roughness: 0.9,
        metalness: 0.1
      });
      const tip = new THREE.Mesh(tipGeometry, tipMaterial);
      tip.position.y = 0.025;
      group.add(tip);

      // Pen cap with premium finish
      const capGeometry = new THREE.CylinderGeometry(0.014, 0.012, 0.1, 16);
      const capMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e40af,
        roughness: 0.15,
        metalness: 0.9
      });
      const cap = new THREE.Mesh(capGeometry, capMaterial);
      cap.position.y = 0.525;
      group.add(cap);

      // Pen clip with metallic shine
      const clipGeometry = new THREE.BoxGeometry(0.005, 0.08, 0.02);
      const clipMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xc0c0c0,
        roughness: 0.1,
        metalness: 0.95
      });
      const clip = new THREE.Mesh(clipGeometry, clipMaterial);
      clip.position.set(0.012, 0.52, 0);
      group.add(clip);

      // Brand logo engraving
      const logoGeometry = new THREE.BoxGeometry(0.025, 0.003, 0.05);
      const logoMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffd700,
        roughness: 0.3,
        metalness: 0.7,
        emissive: 0x332200,
        emissiveIntensity: 0.1
      });
      const logo = new THREE.Mesh(logoGeometry, logoMaterial);
      logo.position.y = 0.35;
      group.add(logo);

      group.position.set(-1.6, 0.15, 0.3);
      group.rotation.z = Math.PI / 3;
      group.castShadow = true;
      return group;
    };

    // Create premium plant with realistic leaves and textures
    const createPlant = () => {
      const group = new THREE.Group();
      
      // Elegant ceramic pot with texture
      const potGeometry = new THREE.CylinderGeometry(0.25, 0.2, 0.3, 16);
      const potMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf5f5dc,
        roughness: 0.3,
        metalness: 0.0,
        emissive: 0x0a0a08,
        emissiveIntensity: 0.02
      });
      const pot = new THREE.Mesh(potGeometry, potMaterial);
      pot.position.y = 0.15;
      pot.castShadow = true;
      group.add(pot);

      // Rich soil texture
      const soilGeometry = new THREE.CylinderGeometry(0.23, 0.23, 0.02, 16);
      const soilMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2d1b0e,
        roughness: 0.9,
        metalness: 0.0
      });
      const soil = new THREE.Mesh(soilGeometry, soilMaterial);
      soil.position.y = 0.29;
      group.add(soil);

      // Multiple stems for fuller look
      for (let s = 0; s < 3; s++) {
        const stemGeometry = new THREE.CylinderGeometry(0.018, 0.025, 0.8, 8);
        const stemMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x2d5016,
          roughness: 0.7,
          metalness: 0.0
        });
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        const stemAngle = (s / 3) * Math.PI * 2;
        stem.position.set(
          Math.cos(stemAngle) * 0.05,
          0.7,
          Math.sin(stemAngle) * 0.05
        );
        stem.rotation.z = (Math.random() - 0.5) * 0.2;
        group.add(stem);
      }

      // Realistic leaves with varied shapes and positions
      for (let i = 0; i < 12; i++) {
        const leafGeometry = new THREE.PlaneGeometry(0.25, 0.4);
        leafGeometry.translate(0, 0.2, 0);
        
        // Curve the leaf for realism
        const positions = leafGeometry.attributes.position;
        for (let j = 0; j < positions.count; j++) {
          const y = positions.getY(j);
          const x = positions.getX(j);
          positions.setX(j, x + Math.sin(y * 2) * 0.02);
        }
        
        const leafMaterial = new THREE.MeshStandardMaterial({ 
          color: i % 2 === 0 ? 0x228b22 : 0x32cd32,
          side: THREE.DoubleSide,
          roughness: 0.8,
          metalness: 0.0,
          transparent: true,
          opacity: 0.9
        });
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.12 + Math.random() * 0.08;
        const height = 0.75 + (i % 4) * 0.15 + Math.random() * 0.1;
        leaf.position.set(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        );
        leaf.rotation.y = angle + Math.random() * 0.5;
        leaf.rotation.z = (Math.random() - 0.5) * 0.4;
        leaf.rotation.x = (Math.random() - 0.5) * 0.3;
        leaf.castShadow = true;
        leaf.receiveShadow = true;
        group.add(leaf);
      }

      // Small decorative stones around the soil
      for (let k = 0; k < 6; k++) {
        const stoneGeometry = new THREE.SphereGeometry(0.015, 8, 6);
        const stoneMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x696969,
          roughness: 0.9,
          metalness: 0.0
        });
        const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
        const stoneAngle = (k / 6) * Math.PI * 2;
        stone.position.set(
          Math.cos(stoneAngle) * 0.18,
          0.305,
          Math.sin(stoneAngle) * 0.18
        );
        group.add(stone);
      }

      group.position.set(-2.2, 0.1, 1.5);
      return group;
    };

    // Create premium book stack with realistic details
    const createBookStack = () => {
      const group = new THREE.Group();
      
      const books = [
        { color: 0x8b0000, height: 0.05, title: 'React Advanced Patterns', spine: 0xdc143c },
        { color: 0x006400, height: 0.06, title: 'TypeScript Handbook', spine: 0x32cd32 },
        { color: 0x4169e1, height: 0.04, title: 'Three.js Fundamentals', spine: 0x1e90ff },
        { color: 0xff8c00, height: 0.05, title: 'Modern Web Design', spine: 0xffa500 }
      ];

      books.forEach((book, i) => {
        // Main book body with premium material
        const bookGeometry = new THREE.BoxGeometry(0.5, book.height, 0.8);
        const bookMaterial = new THREE.MeshStandardMaterial({ 
          color: book.color,
          roughness: 0.7,
          metalness: 0.0,
          emissive: new THREE.Color(book.color).multiplyScalar(0.05),
          emissiveIntensity: 0.1
        });
        const bookMesh = new THREE.Mesh(bookGeometry, bookMaterial);
        
        // Add slight rotation for realistic stacking
        const rotationOffset = (Math.random() - 0.5) * 0.15;
        bookMesh.rotation.y = rotationOffset;
        bookMesh.position.y = i * book.height + book.height / 2;
        bookMesh.castShadow = true;
        bookMesh.receiveShadow = true;
        group.add(bookMesh);

        // Book spine with title area
        const spineGeometry = new THREE.BoxGeometry(0.02, book.height * 0.8, 0.6);
        const spineMaterial = new THREE.MeshStandardMaterial({ 
          color: book.spine,
          roughness: 0.4,
          metalness: 0.1,
          emissive: new THREE.Color(book.spine).multiplyScalar(0.02),
          emissiveIntensity: 0.05
        });
        const spine = new THREE.Mesh(spineGeometry, spineMaterial);
        spine.position.set(0.24, i * book.height + book.height / 2, 0);
        spine.rotation.y = rotationOffset;
        group.add(spine);

        // Embossed title on spine
        const titleGeometry = new THREE.BoxGeometry(0.005, book.height * 0.6, 0.4);
        const titleMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xffd700,
          roughness: 0.2,
          metalness: 0.8,
          emissive: 0x332200,
          emissiveIntensity: 0.1
        });
        const title = new THREE.Mesh(titleGeometry, titleMaterial);
        title.position.set(0.245, i * book.height + book.height / 2, 0);
        title.rotation.y = rotationOffset;
        group.add(title);

        // Book pages with realistic edge texture
        const pagesGeometry = new THREE.BoxGeometry(0.48, book.height - 0.01, 0.78);
        const pagesMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xfffef7,
          roughness: 0.9,
          metalness: 0.0
        });
        const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
        pages.position.set(-0.01, i * book.height + book.height / 2, 0);
        pages.rotation.y = rotationOffset;
        group.add(pages);

        // Corner bookmarks for some books
        if (i % 2 === 0) {
          const bookmarkGeometry = new THREE.BoxGeometry(0.08, 0.002, 0.02);
          const bookmarkMaterial = new THREE.MeshStandardMaterial({ 
            color: i === 0 ? 0xff6b35 : 0x9333ea,
            roughness: 0.6,
            metalness: 0.0
          });
          const bookmark = new THREE.Mesh(bookmarkGeometry, bookmarkMaterial);
          bookmark.position.set(0.2, i * book.height + book.height + 0.01, 0.35);
          bookmark.rotation.y = rotationOffset;
          group.add(bookmark);
        }
      });

      group.position.set(2, 0.12, 1.2);
      group.rotation.y = Math.PI / 8;
      return group;
    };

    // Create premium desk lamp with realistic lighting and materials
    const createDeskLamp = () => {
      const group = new THREE.Group();
      
      // Weighted lamp base with premium finish
      const baseGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.1, 16);
      const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2a2a2a,
        roughness: 0.3,
        metalness: 0.8,
        emissive: 0x0a0a0a,
        emissiveIntensity: 0.05
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = 0.05;
      base.castShadow = true;
      group.add(base);

      // Adjustable lamp arm with realistic joints
      const armGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 12);
      const armMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3a3a3a,
        roughness: 0.4,
        metalness: 0.7
      });
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.set(0.3, 0.8, 0);
      arm.rotation.z = Math.PI / 6;
      arm.castShadow = true;
      group.add(arm);

      // Joint connector at the base
      const jointGeometry = new THREE.SphereGeometry(0.035, 12, 8);
      const jointMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x404040,
        roughness: 0.2,
        metalness: 0.9
      });
      const joint = new THREE.Mesh(jointGeometry, jointMaterial);
      joint.position.set(0.15, 0.15, 0);
      group.add(joint);

      // Modern lamp shade with brushed metal finish
      const shadeGeometry = new THREE.ConeGeometry(0.22, 0.35, 16, 1, true);
      const shadeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf8f8f8,
        side: THREE.DoubleSide,
        roughness: 0.1,
        metalness: 0.7,
        emissive: 0x111111,
        emissiveIntensity: 0.02
      });
      const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
      shade.position.set(0.5, 1.3, 0);
      shade.rotation.z = Math.PI / 4;
      shade.castShadow = true;
      group.add(shade);

      // LED bulb with warm glow
      const bulbGeometry = new THREE.SphereGeometry(0.05, 12, 8);
      const bulbMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xfffacd,
        emissive: 0xffaa44,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.8
      });
      const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
      bulb.position.set(0.5, 1.2, 0);
      group.add(bulb);

      // Power cord for realism
      const cordGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.6, 8);
      const cordMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        roughness: 0.8,
        metalness: 0.0
      });
      const cord = new THREE.Mesh(cordGeometry, cordMaterial);
      cord.position.set(-0.15, 0.05, -0.2);
      cord.rotation.x = Math.PI / 3;
      group.add(cord);

      // Lamp switch/button
      const switchGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.01, 8);
      const switchMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.3,
        metalness: 0.6
      });
      const lampSwitch = new THREE.Mesh(switchGeometry, switchMaterial);
      lampSwitch.position.set(0.1, 0.12, 0);
      group.add(lampSwitch);

      // Light ring around the base
      const ringGeometry = new THREE.TorusGeometry(0.18, 0.005, 8, 24);
      const ringMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00aaff,
        emissive: 0x004488,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.7
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.y = 0.02;
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      group.position.set(-1.5, 0.1, 0.8);
      return group;
    };

    // Create premium computer case with RGB and realistic details
    const createComputerCase = () => {
      const group = new THREE.Group();
      
      // Main case body with premium finish
      const caseGeometry = new THREE.BoxGeometry(0.8, 1.6, 1.2);
      const caseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        roughness: 0.3,
        metalness: 0.7,
        emissive: 0x0a0a0a,
        emissiveIntensity: 0.05
      });
      const computerCase = new THREE.Mesh(caseGeometry, caseMaterial);
      computerCase.castShadow = true;
      computerCase.receiveShadow = true;
      group.add(computerCase);

      // Premium tempered glass side panel with realistic reflection
      const glassGeometry = new THREE.BoxGeometry(0.02, 1.4, 1);
      const glassMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x88ccff,
        transparent: true,
        opacity: 0.15,
        roughness: 0.0,
        metalness: 0.0
      });
      const glass = new THREE.Mesh(glassGeometry, glassMaterial);
      glass.position.set(-0.39, 0, 0);
      group.add(glass);

      // Power LED with realistic glow
      const ledGeometry = new THREE.SphereGeometry(0.03, 12, 8);
      const ledMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0088ff,
        emissive: 0x0066cc,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.9
      });
      const led = new THREE.Mesh(ledGeometry, ledMaterial);
      led.position.set(0.35, 0.6, 0.61);
      group.add(led);

      // RGB LED strips inside case (premium RGB lighting)
      const rgbColors = [0xff0080, 0x00ff80, 0x8000ff, 0xff8000];
      for (let i = 0; i < 4; i++) {
        const stripGeometry = new THREE.BoxGeometry(0.6, 0.02, 0.02);
        const stripMaterial = new THREE.MeshStandardMaterial({ 
          color: rgbColors[i],
          emissive: rgbColors[i],
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.8
        });
        const strip = new THREE.Mesh(stripGeometry, stripMaterial);
        strip.position.set(-0.3, 0.5 - i * 0.3, 0.4);
        group.add(strip);
      }

      // Realistic ventilation grille with hexagonal pattern
      for (let i = 0; i < 12; i++) {
        const grillGeometry = new THREE.BoxGeometry(0.6, 0.015, 0.01);
        const grillMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x333333,
          roughness: 0.6,
          metalness: 0.4
        });
        const grill = new THREE.Mesh(grillGeometry, grillMaterial);
        grill.position.set(0, 0.4 - i * 0.07, 0.61);
        group.add(grill);
      }

      // Premium front I/O panel with brushed metal
      const ioGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.02);
      const ioMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x404040,
        roughness: 0.2,
        metalness: 0.8
      });
      const ioPanel = new THREE.Mesh(ioGeometry, ioMaterial);
      ioPanel.position.set(0.2, 0.7, 0.61);
      group.add(ioPanel);

      // USB ports with realistic design
      for (let i = 0; i < 3; i++) {
        const usbGeometry = new THREE.BoxGeometry(0.04, 0.02, 0.015);
        const usbMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x000000,
          roughness: 0.9,
          metalness: 0.1
        });
        const usb = new THREE.Mesh(usbGeometry, usbMaterial);
        usb.position.set(0.1 + i * 0.05, 0.7, 0.625);
        group.add(usb);
      }

      // Audio jacks
      for (let j = 0; j < 2; j++) {
        const jackGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.015, 8);
        const jackMaterial = new THREE.MeshStandardMaterial({ 
          color: j === 0 ? 0x00aa00 : 0xff6600,
          roughness: 0.4,
          metalness: 0.6
        });
        const jack = new THREE.Mesh(jackGeometry, jackMaterial);
        jack.position.set(0.25 + j * 0.03, 0.65, 0.625);
        jack.rotation.x = Math.PI / 2;
        group.add(jack);
      }

      // Case feet with rubber material
      for (let k = 0; k < 4; k++) {
        const footGeometry = new THREE.CylinderGeometry(0.02, 0.025, 0.03, 8);
        const footMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x2a2a2a,
          roughness: 0.9,
          metalness: 0.0
        });
        const foot = new THREE.Mesh(footGeometry, footMaterial);
        const footX = k % 2 === 0 ? -0.35 : 0.35;
        const footZ = k < 2 ? -0.55 : 0.55;
        foot.position.set(footX, -0.815, footZ);
        group.add(foot);
      }

      // CPU cooler fan visible through glass
      const fanGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 8);
      const fanMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x444444,
        roughness: 0.4,
        metalness: 0.6
      });
      const fan = new THREE.Mesh(fanGeometry, fanMaterial);
      fan.position.set(-0.3, 0.2, 0);
      fan.rotation.x = Math.PI / 2;
      group.add(fan);

      group.position.set(3.5, 0.9, 0);
      return group;
    };

    // Create premium floating particles for ambient atmosphere
    const createParticles = () => {
      const particleCount = 100;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        // Strategic positioning around the scene for better ambiance
        positions[i * 3] = (Math.random() - 0.5) * 25;     // X
        positions[i * 3 + 1] = Math.random() * 10 + 1;     // Y (above ground)
        positions[i * 3 + 2] = (Math.random() - 0.5) * 25; // Z

        // Varied warm particle colors for cozy atmosphere
        const colorVariation = Math.random();
        if (colorVariation < 0.3) {
          // Warm blue tones
          colors[i * 3] = 0.2 + Math.random() * 0.3;     // R
          colors[i * 3 + 1] = 0.4 + Math.random() * 0.4; // G  
          colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
        } else if (colorVariation < 0.6) {
          // Golden warm tones
          colors[i * 3] = 0.8 + Math.random() * 0.2;     // R
          colors[i * 3 + 1] = 0.6 + Math.random() * 0.3; // G  
          colors[i * 3 + 2] = 0.2 + Math.random() * 0.2; // B
        } else {
          // Soft purple accents
          colors[i * 3] = 0.6 + Math.random() * 0.3;     // R
          colors[i * 3 + 1] = 0.3 + Math.random() * 0.3; // G  
          colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
        }

        // Varied particle sizes for depth
        sizes[i] = 0.01 + Math.random() * 0.03;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        alphaTest: 0.001
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      return particleSystem;
    };

    // Enhanced premium floor with realistic reflection and texture
    const createFloor = () => {
      const floorGeometry = new THREE.PlaneGeometry(25, 25, 64, 64);
      
      // Create sophisticated floor pattern with subtle variations
      const createPremiumFloorTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d')!;
        
        // Rich dark base with subtle gradient
        const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.5, '#16213e');
        gradient.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1024, 1024);
        
        // Sophisticated hexagonal pattern
        const hexSize = 32;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        
        for (let y = 0; y < 1024; y += hexSize * 1.5) {
          for (let x = 0; x < 1024; x += hexSize * Math.sqrt(3)) {
            const offsetX = (y / (hexSize * 1.5)) % 2 === 1 ? hexSize * Math.sqrt(3) / 2 : 0;
            drawHexagon(ctx, x + offsetX, y, hexSize / 2);
          }
        }
        
        // Add subtle marble-like veining
        ctx.strokeStyle = 'rgba(100, 120, 150, 0.08)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 15; i++) {
          ctx.beginPath();
          const startX = Math.random() * 1024;
          const startY = Math.random() * 1024;
          ctx.moveTo(startX, startY);
          
          // Create curved veining
          for (let j = 0; j < 5; j++) {
            const controlX = startX + (Math.random() - 0.5) * 200;
            const controlY = startY + (Math.random() - 0.5) * 200;
            const endX = startX + (Math.random() - 0.5) * 400;
            const endY = startY + (Math.random() - 0.5) * 400;
            ctx.quadraticCurveTo(controlX, controlY, endX, endY);
          }
          ctx.stroke();
        }
        
        // Subtle ambient dots for texture variation
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        for (let k = 0; k < 200; k++) {
          const dotX = Math.random() * 1024;
          const dotY = Math.random() * 1024;
          const radius = Math.random() * 3 + 1;
          ctx.beginPath();
          ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
        
        return new THREE.CanvasTexture(canvas);
      };

      // Helper function to draw hexagon
      const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const hexX = x + size * Math.cos(angle);
          const hexY = y + size * Math.sin(angle);
          if (i === 0) {
            ctx.moveTo(hexX, hexY);
          } else {
            ctx.lineTo(hexX, hexY);
          }
        }
        ctx.closePath();
        ctx.stroke();
      };

      const floorTexture = createPremiumFloorTexture();
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(6, 6);

      // Premium floor material with enhanced properties
      const floorMaterial = new THREE.MeshStandardMaterial({ 
        map: floorTexture,
        color: 0x2a2a4a,
        roughness: 0.2,
        metalness: 0.3,
        emissive: 0x0a0a1a,
        emissiveIntensity: 0.05,
        transparent: true,
        opacity: 0.95
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
