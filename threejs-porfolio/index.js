import * as THREE from "three";

const canvas = document.querySelector(".webgl");
const body = document.body;
const navShell = document.querySelector(".nav-shell");
const navToggle = document.querySelector(".nav-toggle");
const navToggleLabel = document.querySelector(".nav-toggle-label");
const navLinks = [...document.querySelectorAll(".top-nav a")];
const themeToggle = document.querySelector(".theme-toggle");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const ctaSection = document.querySelector(".closing-panel");
const contactForm = document.querySelector(".contact-form");
const emailInput = document.querySelector('input[name="email"]');
const emailError = document.querySelector("#email-error");
const formStatus = document.querySelector(".form-status");
const submitButton = contactForm?.querySelector('button[type="submit"]');

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x071116, 8, 22);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0.4, 8);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const getLaptopLayout = () =>
  window.innerWidth <= 640
    ? { x: 1.15, y: -0.08, scale: 0.62 }
    : { x: 0.68, y: -0.5, scale: 1 };

const group = new THREE.Group();
scene.add(group);
const initialLaptopLayout = getLaptopLayout();
group.position.set(initialLaptopLayout.x, initialLaptopLayout.y, 0.2);

const ambientLight = new THREE.AmbientLight(0xfff3d6, 0.8);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff7a18, 18, 20, 2);
pointLight.position.set(3, 3, 6);
scene.add(pointLight);

const fillLight = new THREE.PointLight(0x58a6ff, 10, 18, 2);
fillLight.position.set(-4, 1, 5);
scene.add(fillLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(2, 3, 5);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
rimLight.position.set(-3, 1, 4);
scene.add(rimLight);

const laptopScene = new THREE.Group();
group.add(laptopScene);

const laptopMaterial = new THREE.MeshStandardMaterial({
  color: 0xe1e1e1,
  emissive: 0x000000,
  emissiveIntensity: 0,
  metalness: 0.78,
  roughness: 0.16,
});

const screenMaterial = new THREE.MeshStandardMaterial({
  color: 0x151b20,
  emissive: 0x05080b,
  emissiveIntensity: 0.35,
  metalness: 0.08,
  roughness: 0.28,
});

const codeCanvas = document.createElement("canvas");
codeCanvas.width = 1024;
codeCanvas.height = 768;
const codeContext = codeCanvas.getContext("2d");

const drawCodeScreen = () => {
  if (!codeContext) {
    return;
  }

  codeContext.fillStyle = "#09131a";
  codeContext.fillRect(0, 0, codeCanvas.width, codeCanvas.height);

  codeContext.fillStyle = "#102430";
  codeContext.fillRect(0, 0, codeCanvas.width, 78);

  const dots = ["#ff7a18", "#ffd45c", "#7ec8ff"];
  dots.forEach((color, index) => {
    codeContext.beginPath();
    codeContext.fillStyle = color;
    codeContext.arc(56 + index * 28, 39, 9, 0, Math.PI * 2);
    codeContext.fill();
  });

  codeContext.font = "28px monospace";
  codeContext.fillStyle = "#8b949d";
  codeContext.fillText("portfolio.ts", 150, 48);

  const lines = [
    { indent: 0, color: "#ffb15c", text: "const engineer = {" },
    { indent: 1, color: "#d6dde3", text: "name: 'Viet Nguyen'," },
    { indent: 1, color: "#d6dde3", text: "role: 'Software Engineer'," },
    { indent: 1, color: "#d6dde3", text: "focus: ['frontend', 'backend']," },
    { indent: 1, color: "#d6dde3", text: "builds: 'clean web products'," },
    { indent: 0, color: "#ffb15c", text: "};" },
    { indent: 0, color: "#f0d27a", text: "ship(engineer);" },
  ];

  codeContext.font = "34px monospace";
  lines.forEach((line, index) => {
    codeContext.fillStyle = line.color;
    codeContext.fillText(
      line.text,
      72 + line.indent * 48,
      150 + index * 74
    );
  });

  for (let index = 0; index < 6; index += 1) {
    codeContext.fillStyle = "rgba(214, 221, 227, 0.08)";
    codeContext.fillRect(72, 610 + index * 18, 620 - index * 48, 6);
  }
};

drawCodeScreen();
const codeTexture = new THREE.CanvasTexture(codeCanvas);
codeTexture.colorSpace = THREE.SRGBColorSpace;

const laptopBase = new THREE.Mesh(
  new THREE.BoxGeometry(1.9, 0.08, 1.24),
  laptopMaterial
);
laptopBase.position.set(0, -0.18, 0.1);
laptopScene.add(laptopBase);

const keyboardDeck = new THREE.Mesh(
  new THREE.BoxGeometry(1.55, 0.03, 0.82),
  new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.62,
    roughness: 0.18,
  })
);
keyboardDeck.position.set(0, -0.12, 0.08);
laptopScene.add(keyboardDeck);

const trackpad = new THREE.Mesh(
  new THREE.BoxGeometry(0.42, 0.01, 0.26),
  new THREE.MeshStandardMaterial({
    color: 0xf1f1f1,
    metalness: 0.52,
    roughness: 0.14,
  })
);
trackpad.position.set(0, -0.075, 0.42);
laptopScene.add(trackpad);

const controlMaterial = new THREE.MeshStandardMaterial({
  color: 0xbdbdbd,
  metalness: 0.55,
  roughness: 0.22,
});

const makeCanvasTexture = (draw, width = 512, height = 128) => {
  const canvasElement = document.createElement("canvas");
  canvasElement.width = width;
  canvasElement.height = height;
  const context = canvasElement.getContext("2d");

  if (context) {
    draw(context, width, height);
  }

  const texture = new THREE.CanvasTexture(canvasElement);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const labelTexture = makeCanvasTexture((context, width, height) => {
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#d8d8d8";
  context.font = "600 38px monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Viet Nguyen @ 2026", width / 2, height / 2);
});

const labelPlate = new THREE.Mesh(
  new THREE.PlaneGeometry(0.34, 0.055),
  new THREE.MeshBasicMaterial({
    map: labelTexture,
    transparent: true,
  })
);
labelPlate.position.set(-0.48, -0.182, 0.725);
laptopScene.add(labelPlate);

const buttonTargets = [];
const laptopButtons = [];

const buttonIconPaths = {
  github:
    "M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.09 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.06A9.3 9.3 0 0 1 12 6.84a9.3 9.3 0 0 1 2.5.35c1.9-1.33 2.74-1.06 2.74-1.06.56 1.42.21 2.47.11 2.73.64.73 1.03 1.65 1.03 2.78 0 3.96-2.35 4.83-4.58 5.08.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .28.18.61.69.5A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z",
  linkedin:
    "M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 .01 3.1ZM5.62 18.5h2.63V9.83H5.62V18.5Zm4.29 0h2.62v-4.84c0-1.28.24-2.52 1.8-2.52 1.54 0 1.56 1.44 1.56 2.6v4.76h2.63v-5.3c0-2.6-.56-4.6-3.6-4.6-1.47 0-2.45.82-2.85 1.6h-.04V9.83H9.91c.03.79 0 8.67 0 8.67Z",
};

const drawMailIcon = (context, width, height) => {
  const iconWidth = width * 0.42;
  const iconHeight = height * 0.28;
  const x = (width - iconWidth) / 2;
  const y = (height - iconHeight) / 2;
  const r = 8;

  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + iconWidth - r, y);
  context.quadraticCurveTo(x + iconWidth, y, x + iconWidth, y + r);
  context.lineTo(x + iconWidth, y + iconHeight - r);
  context.quadraticCurveTo(
    x + iconWidth,
    y + iconHeight,
    x + iconWidth - r,
    y + iconHeight
  );
  context.lineTo(x + r, y + iconHeight);
  context.quadraticCurveTo(x, y + iconHeight, x, y + iconHeight - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.stroke();

  context.beginPath();
  context.moveTo(x + 2, y + 2);
  context.lineTo(width / 2, y + iconHeight * 0.62);
  context.lineTo(x + iconWidth - 2, y + 2);
  context.stroke();
};

const drawPathIcon = (context, pathData, width, height) => {
  context.save();
  context.translate(width / 2, height / 2);
  context.scale(width * 0.026, height * 0.026);
  context.translate(-12, -12);
  context.fill(new Path2D(pathData));
  context.restore();
};

const createButtonIconTexture = (icon) =>
  makeCanvasTexture((context, width, height) => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#f1f1f1";
    context.strokeStyle = "#f1f1f1";
    context.lineWidth = 12;
    context.lineCap = "round";
    context.lineJoin = "round";

    if (icon === "mail") {
      drawMailIcon(context, width, height);
      return;
    }

    const pathData = buttonIconPaths[icon];
    if (pathData) {
      drawPathIcon(context, pathData, width, height);
    }
  }, 256, 256);

const createLaptopButton = ({ x, icon, action }) => {
  const buttonGroup = new THREE.Group();
  buttonGroup.position.set(x, -0.182, 0.725);
  laptopScene.add(buttonGroup);

  const buttonShape = new THREE.Shape();
  const buttonWidth = 0.05;
  const buttonHeight = 0.038;
  const buttonRadius = 0.006;
  const halfWidth = buttonWidth / 2;
  const halfHeight = buttonHeight / 2;

  buttonShape.moveTo(-halfWidth + buttonRadius, -halfHeight);
  buttonShape.lineTo(halfWidth - buttonRadius, -halfHeight);
  buttonShape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + buttonRadius);
  buttonShape.lineTo(halfWidth, halfHeight - buttonRadius);
  buttonShape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - buttonRadius, halfHeight);
  buttonShape.lineTo(-halfWidth + buttonRadius, halfHeight);
  buttonShape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - buttonRadius);
  buttonShape.lineTo(-halfWidth, -halfHeight + buttonRadius);
  buttonShape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + buttonRadius, -halfHeight);

  const buttonBase = new THREE.Mesh(
    new THREE.ExtrudeGeometry(buttonShape, {
      depth: 0.01,
      bevelEnabled: false,
    }),
    controlMaterial
  );
  buttonBase.position.z = -0.005;
  buttonGroup.add(buttonBase);

  const buttonIcon = new THREE.Mesh(
    new THREE.PlaneGeometry(0.038, 0.038),
    new THREE.MeshBasicMaterial({
      map: createButtonIconTexture(icon),
      transparent: true,
    })
  );
  buttonIcon.position.z = 0.0065;
  buttonGroup.add(buttonIcon);

  buttonTargets.push({ mesh: buttonBase, action });
  laptopButtons.push(buttonGroup);
};

const updateLaptopButtonLayout = () => {
  const buttonPositions =
    window.innerWidth <= 640 ? [-0.12, 0, 0.12] : [0.37, 0.47, 0.57];

  laptopButtons.forEach((buttonGroup, index) => {
    buttonGroup.position.x = buttonPositions[index];
  });
};

createLaptopButton({
  x: 0.37,
  icon: "mail",
  action: () => {
    window.location.href = "mailto:vietnguyent22@gmail.com";
  },
});

createLaptopButton({
  x: 0.47,
  icon: "github",
  action: () => {
    window.open("https://github.com/vietnguyen-dev", "_blank", "noopener,noreferrer");
  },
});

createLaptopButton({
  x: 0.57,
  icon: "linkedin",
  action: () => {
    window.open(
      "https://www.linkedin.com/in/vietnguyen-dev/",
      "_blank",
      "noopener,noreferrer"
    );
  },
});

updateLaptopButtonLayout();

const laptopHinge = new THREE.Mesh(
  new THREE.CylinderGeometry(0.04, 0.04, 1.28, 16),
  laptopMaterial
);
laptopHinge.rotation.z = Math.PI * 0.5;
laptopHinge.position.set(0, -0.12, -0.5);
laptopScene.add(laptopHinge);

const laptopLid = new THREE.Mesh(
  new THREE.BoxGeometry(1.78, 1.16, 0.08),
  laptopMaterial
);
laptopLid.position.set(0, 0.5, -0.64);
laptopLid.rotation.x = -0.62;
laptopScene.add(laptopLid);

const laptopScreen = new THREE.Mesh(
  new THREE.PlaneGeometry(1.62, 1),
  screenMaterial
);
laptopScreen.position.set(0, 0.5, -0.59);
laptopScreen.rotation.x = -0.62;
laptopScene.add(laptopScreen);

const screenInset = new THREE.Mesh(
  new THREE.PlaneGeometry(1.54, 0.92),
  new THREE.MeshBasicMaterial({
    map: codeTexture,
    transparent: true,
    opacity: 1,
  })
);
screenInset.position.set(0, 0.5, -0.545);
screenInset.rotation.x = -0.62;
laptopScene.add(screenInset);

const laptopAura = new THREE.Mesh(
  new THREE.TorusGeometry(1.8, 0.025, 16, 120),
  new THREE.MeshBasicMaterial({
    color: 0x9aa4ad,
    transparent: true,
    opacity: 0.12,
  })
);
laptopAura.rotation.x = Math.PI * 0.52;
laptopScene.add(laptopAura);

const particleCount = 700;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 18;
  positions[i + 1] = (Math.random() - 0.5) * 12;
  positions[i + 2] = (Math.random() - 0.5) * 14;
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particles = new THREE.Points(
  particleGeometry,
  new THREE.PointsMaterial({
    color: 0xffd45c,
    size: 0.03,
    transparent: true,
    opacity: 0.9,
  })
);
scene.add(particles);
const particlePointerOffset = new THREE.Vector3();
const pointerTrail = [];
const pointerTrailTarget = new THREE.Vector3();
const pointerTrailGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.08);
const pointerTrailScreenDepth = 5.2;
const pointerTrailAnchor = new THREE.Vector3();
let pointerTrailVisible = false;
let pointerTrailFade = 0;
let lastPointerMoveAt = 0;

for (let index = 0; index < 9; index += 1) {
  const trailMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd45c,
    transparent: true,
    opacity: 0.22 - index * 0.02,
  });
  const trailBox = new THREE.Mesh(pointerTrailGeometry, trailMaterial);
  const scale = 1 - index * 0.06;
  trailBox.scale.setScalar(scale);
  trailBox.position.set(0, 0, 0.8 - index * 0.05);
  scene.add(trailBox);
  pointerTrail.push(trailBox);
}

const cursor = { x: 0, y: 0 };
const scrollState = {
  progress: 0,
  current: 0,
  ctaFocus: 0,
  ctaCurrent: 0,
};
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let hoveredButton = null;
const themeConfig = {
  dark: {
    themeColor: "#071116",
    fog: 0x071116,
    ambient: 0xf4f6f8,
    ambientIntensity: 1.05,
    point: 0xffffff,
    pointIntensity: 8,
    fill: 0xf7f9fb,
    fillIntensity: 5,
    key: 0xffffff,
    keyIntensity: 2.5,
    rim: 0xf2f5f7,
    rimIntensity: 1.6,
    particles: 0xffd45c,
    screen: 0x151b20,
    screenEmissive: 0x05080b,
    aura: 0x9aa4ad,
    laptop: 0xe1e1e1,
    laptopEmissive: 0x000000,
    laptopEmissiveIntensity: 0,
    laptopMetalness: 0.78,
    laptopRoughness: 0.16,
    keyboard: 0xd4d4d4,
    keyboardMetalness: 0.62,
    keyboardRoughness: 0.18,
    trackpad: 0xf1f1f1,
    trackpadMetalness: 0.52,
    trackpadRoughness: 0.14,
  },
  light: {
    themeColor: "#f4f7f9",
    fog: 0xe7eef2,
    ambient: 0xffffff,
    ambientIntensity: 1.1,
    point: 0xff9a3c,
    pointIntensity: 10,
    fill: 0x6faeff,
    fillIntensity: 6,
    key: 0xffffff,
    keyIntensity: 1.6,
    rim: 0xe7eef2,
    rimIntensity: 1,
    particles: 0xb56a19,
    screen: 0x101418,
    screenEmissive: 0x020304,
    aura: 0x3a444d,
    laptop: 0x111417,
    laptopEmissive: 0x010203,
    laptopEmissiveIntensity: 0.04,
    laptopMetalness: 0.22,
    laptopRoughness: 0.68,
    keyboard: 0x1a1f23,
    keyboardMetalness: 0.14,
    keyboardRoughness: 0.74,
    trackpad: 0x20272d,
    trackpadMetalness: 0.12,
    trackpadRoughness: 0.52,
  },
};

const applyTheme = (theme) => {
  const nextTheme = theme === "light" ? "light" : "dark";
  const config = themeConfig[nextTheme];

  body.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);

  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", config.themeColor);
  }

  scene.fog.color.setHex(config.fog);
  ambientLight.color.setHex(config.ambient);
  ambientLight.intensity = config.ambientIntensity;
  pointLight.color.setHex(config.point);
  pointLight.intensity = config.pointIntensity;
  fillLight.color.setHex(config.fill);
  fillLight.intensity = config.fillIntensity;
  keyLight.color.setHex(config.key);
  keyLight.intensity = config.keyIntensity;
  rimLight.color.setHex(config.rim);
  rimLight.intensity = config.rimIntensity;
  particles.material.color.setHex(config.particles);
  for (const trailBox of pointerTrail) {
    trailBox.material.color.setHex(config.particles);
  }
  screenMaterial.color.setHex(config.screen);
  screenMaterial.emissive.setHex(config.screenEmissive);
  laptopAura.material.color.setHex(config.aura);
  laptopMaterial.color.setHex(config.laptop);
  laptopMaterial.emissive.setHex(config.laptopEmissive);
  laptopMaterial.emissiveIntensity = config.laptopEmissiveIntensity;
  laptopMaterial.metalness = config.laptopMetalness;
  laptopMaterial.roughness = config.laptopRoughness;
  keyboardDeck.material.color.setHex(config.keyboard);
  keyboardDeck.material.metalness = config.keyboardMetalness;
  keyboardDeck.material.roughness = config.keyboardRoughness;
  trackpad.material.color.setHex(config.trackpad);
  trackpad.material.metalness = config.trackpadMetalness;
  trackpad.material.roughness = config.trackpadRoughness;
  controlMaterial.color.setHex(config.keyboard);
  controlMaterial.metalness = Math.min(config.keyboardMetalness + 0.18, 0.72);
  controlMaterial.roughness = Math.max(config.keyboardRoughness - 0.14, 0.14);
};

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme || "dark");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const setFormStatus = (type, message) => {
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.classList.remove("is-pending", "is-success", "is-error");

  if (type) {
    formStatus.classList.add(`is-${type}`);
  }
};

const validateEmailField = () => {
  if (!emailInput || !emailError) {
    return true;
  }

  const emailValue = emailInput.value.trim();
  const isValid = emailValue === "" || emailPattern.test(emailValue);

  emailInput.classList.toggle("is-invalid", !isValid);
  emailInput.setAttribute("aria-invalid", String(!isValid));
  emailError.textContent = isValid ? "" : "Please enter a valid email address.";

  return isValid;
};

const closeNav = () => {
  if (!navShell || !navToggle) {
    return;
  }

  navShell.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  if (navToggleLabel) {
    navToggleLabel.textContent = "Menu";
  }
};

const openNav = () => {
  if (!navShell || !navToggle) {
    return;
  }

  navShell.classList.add("is-open");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Close navigation");
  if (navToggleLabel) {
    navToggleLabel.textContent = "Close";
  }
};

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navShell.classList.contains("is-open");

    if (isOpen) {
      closeNav();
      return;
    }

    openNav();
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  });
}

if (emailInput) {
  emailInput.addEventListener("blur", validateEmailField);
  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("is-invalid")) {
      validateEmailField();
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateEmailField()) {
      setFormStatus("error", "Please fix the highlighted fields and try again.");
      emailInput?.focus();
      return;
    }

    const apiUrl = contactForm.dataset.apiUrl;
    if (!apiUrl) {
      setFormStatus("error", "Form configuration is missing. Please try again later.");
      return;
    }

    const formData = new FormData(contactForm);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      note: String(formData.get("note") || "").trim(),
    };

    contactForm.classList.add("is-submitting");
    if (submitButton) {
      submitButton.disabled = true;
    }
    setFormStatus("pending", "Sending your message...");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      contactForm.reset();
      validateEmailField();
      setFormStatus("success", "Message sent successfully. I’ll get back to you soon.");
    } catch (error) {
      console.error("Contact form submission failed.", error);
      setFormStatus(
        "error",
        "Message failed to send. Please try again or email me directly."
      );
    } finally {
      contactForm.classList.remove("is-submitting");
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

for (const link of navLinks) {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 640) {
      closeNav();
    }
  });
}

window.addEventListener("pointermove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
  pointer.x = (event.clientX / sizes.width) * 2 - 1;
  pointer.y = -(event.clientY / sizes.height) * 2 + 1;
  lastPointerMoveAt = performance.now();
  pointerTrailVisible = true;
  console.log("pointermove", {
    x: event.clientX,
    y: event.clientY,
    normalizedX: pointer.x,
    normalizedY: pointer.y,
  });
});

window.addEventListener("click", () => {
  if (scrollState.ctaCurrent < 0.25) {
    return;
  }

  raycaster.setFromCamera(pointer, camera);
  const intersections = raycaster.intersectObjects(
    buttonTargets.map((button) => button.mesh),
    false
  );

  if (!intersections.length) {
    return;
  }

  const match = buttonTargets.find(
    (button) => button.mesh === intersections[0].object
  );

  if (match) {
    match.action();
  }
});

const updateScrollState = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollState.progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

  if (!ctaSection) {
    scrollState.ctaFocus = 0;
    return;
  }

  const bounds = ctaSection.getBoundingClientRect();
  const focusRange = window.innerHeight * 0.55;
  const entryProgress = (window.innerHeight * 0.72 - bounds.top) / focusRange;
  scrollState.ctaFocus = THREE.MathUtils.clamp(entryProgress, 0, 1);
};

window.addEventListener("scroll", () => {
  updateScrollState();
});

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  updateScrollState();
  updateLaptopButtonLayout();

  if (window.innerWidth > 640) {
    closeNav();
  }
});

const clock = new THREE.Clock();
updateScrollState();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  scrollState.current += (scrollState.progress - scrollState.current) * 0.08;
  scrollState.ctaCurrent += (scrollState.ctaFocus - scrollState.ctaCurrent) * 0.08;
  const scrollRotation = scrollState.current * Math.PI * 0.75;
  const ctaFocus = scrollState.ctaCurrent;
  const laptopLayout = getLaptopLayout();

  const groupTargetX = THREE.MathUtils.lerp(laptopLayout.x + cursor.x * 0.35, 0, ctaFocus);
  const groupTargetY = THREE.MathUtils.lerp(laptopLayout.y - cursor.y * 0.18, -0.02, ctaFocus);
  const groupTargetZ = THREE.MathUtils.lerp(0.2, 2.4, ctaFocus);

  group.position.x += (groupTargetX - group.position.x) * 0.04;
  group.position.y += (groupTargetY - group.position.y) * 0.04;
  group.position.z += (groupTargetZ - group.position.z) * 0.04;

  const groupRotationX = THREE.MathUtils.lerp(0.14 + scrollRotation * 0.04, 0, ctaFocus);
  const groupRotationY = THREE.MathUtils.lerp(0.24 + scrollRotation * 0.16, 0, ctaFocus);
  const groupRotationZ = THREE.MathUtils.lerp(0.02 + scrollRotation * 0.05, 0, ctaFocus);

  group.rotation.x += (groupRotationX - group.rotation.x) * 0.05;
  group.rotation.y += (groupRotationY - group.rotation.y) * 0.05;
  group.rotation.z += (groupRotationZ - group.rotation.z) * 0.05;

  const laptopFloatY = Math.sin(elapsedTime * 1.1) * 0.08 - scrollState.current * 1.8;
  const laptopFloatX = Math.cos(elapsedTime * 0.7) * 0.08;
  const laptopRotationX = -0.16 + Math.sin(elapsedTime * 0.9) * 0.04;
  const laptopRotationY = elapsedTime * 0.12 + scrollRotation;
  const laptopRotationZ = 0.05 + Math.sin(elapsedTime * 1.1) * 0.02;

  laptopScene.position.x += (THREE.MathUtils.lerp(laptopFloatX, 0, ctaFocus) - laptopScene.position.x) * 0.08;
  laptopScene.position.y += (THREE.MathUtils.lerp(laptopFloatY, 0.02, ctaFocus) - laptopScene.position.y) * 0.08;
  laptopScene.position.z += (THREE.MathUtils.lerp(0, 0.9, ctaFocus) - laptopScene.position.z) * 0.08;
  laptopScene.rotation.x += (THREE.MathUtils.lerp(laptopRotationX, 0, ctaFocus) - laptopScene.rotation.x) * 0.08;
  laptopScene.rotation.y += (THREE.MathUtils.lerp(laptopRotationY, 0, ctaFocus) - laptopScene.rotation.y) * 0.06;
  laptopScene.rotation.z += (THREE.MathUtils.lerp(laptopRotationZ, 0, ctaFocus) - laptopScene.rotation.z) * 0.06;
  laptopScene.scale.setScalar(THREE.MathUtils.lerp(laptopLayout.scale, 2.75, ctaFocus));

  laptopScreen.rotation.x = THREE.MathUtils.lerp(
    -0.62 + Math.sin(elapsedTime * 0.8) * 0.03,
    0,
    ctaFocus
  );
  screenInset.rotation.x = laptopScreen.rotation.x;
  laptopLid.rotation.x = laptopScreen.rotation.x;
  laptopAura.rotation.z = THREE.MathUtils.lerp(
    -elapsedTime * 0.12 - scrollRotation * 0.08,
    0,
    ctaFocus
  );
  laptopAura.material.opacity = THREE.MathUtils.lerp(0.12, 0.02, ctaFocus);
  screenInset.material.opacity = THREE.MathUtils.lerp(1, 0, ctaFocus);

  if (ctaFocus > 0.22) {
    raycaster.setFromCamera(pointer, camera);
    const intersections = raycaster.intersectObjects(
      buttonTargets.map((button) => button.mesh),
      false
    );
    hoveredButton = intersections[0]?.object || null;
  } else {
    hoveredButton = null;
  }

  document.body.style.cursor = hoveredButton ? "pointer" : "";

  for (const button of buttonTargets) {
    const isHovered = button.mesh === hoveredButton;
    button.mesh.scale.setScalar(isHovered ? 1.08 : 1);
  }

  particlePointerOffset.set(
    cursor.x * 1.8,
    -cursor.y * 0.9,
    (Math.abs(cursor.x) + Math.abs(cursor.y)) * 0.45
  );
  pointerTrailTarget.set(pointer.x, pointer.y, 0);
  pointerTrailTarget.unproject(camera);
  pointerTrailTarget.sub(camera.position).normalize();
  pointerTrailTarget.multiplyScalar(pointerTrailScreenDepth);
  pointerTrailTarget.add(camera.position);
  if (performance.now() - lastPointerMoveAt > 220) {
    pointerTrailVisible = false;
  }
  pointerTrailFade += ((pointerTrailVisible ? 1 : 0) - pointerTrailFade) * 0.18;
  pointerTrailAnchor.lerp(pointerTrailTarget, 0.22);

  for (let index = 0; index < pointerTrail.length; index += 1) {
    const trailBox = pointerTrail[index];
    const followTarget = index === 0 ? pointerTrailAnchor : pointerTrail[index - 1].position;
    const easing = index === 0 ? 0.32 : Math.max(0.16 - index * 0.01, 0.08);

    trailBox.position.lerp(followTarget, easing);
    trailBox.position.z -= index * 0.025;
    trailBox.rotation.x = elapsedTime * 0.8 + index * 0.12;
    trailBox.rotation.y = elapsedTime * 0.55 + index * 0.18;
    trailBox.material.opacity = Math.max(0, (0.22 - index * 0.02) * pointerTrailFade);
    trailBox.visible = trailBox.material.opacity > 0.01;
  }

  particles.rotation.y = elapsedTime * 0.03 + scrollRotation * 0.08 + cursor.x * 0.18;
  particles.rotation.x = scrollState.current * 0.2 - cursor.y * 0.14;
  particles.position.x += (particlePointerOffset.x - particles.position.x) * 0.05;
  particles.position.y +=
    (-scrollState.current * 1.4 + particlePointerOffset.y - particles.position.y) * 0.05;
  particles.position.z += (particlePointerOffset.z - particles.position.z) * 0.05;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
