/**
 * ============================================================================
 * MURIKINATI KULLAI REDDY - PORTFOLIO INTERACTIVE CORE
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTypewriter();
  initThemeToggle();
  initSkillsFilter();
  initPipelineLab();
  initAnalyticsTabs();
  initConfusionMatrix();
  initResumeModal();
  initContactActions();
  initMobileNav();
});

/* ============================================================================
 * 1. NEURAL MESH & PARTICLES CANVAS
 * ============================================================================ */
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
  const particles = [];

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.7)' : 'rgba(2, 132, 199, 0.6)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const linkColor = isDark ? 'rgba(56, 189, 248, ' : 'rgba(2, 132, 199, ';

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = 0.18 * (1 - dist / 130);
          ctx.strokeStyle = `${linkColor}${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ============================================================================
 * 2. TYPEWRITER EFFECT
 * ============================================================================ */
function initTypewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;

  const words = [
    'Artificial Intelligence & Machine Learning',
    'Computer Vision & Biometrics',
    'PyTorch & Deep Neural Architectures',
    'Python & Backend Development',
    'Explainable AI (Captum & Saliency Maps)',
    'Algorithmic Problem Solving (LeetCode)'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ============================================================================
 * 3. THEME TOGGLE (DARK / LIGHT)
 * ============================================================================ */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('mkr-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('mkr-theme', newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  });
}

/* ============================================================================
 * 4. SKILLS FILTERING
 * ============================================================================ */
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('#skillsFilterBar .filter-btn');
  const skillCards = document.querySelectorAll('#skillsGrid .skill-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      skillCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================================
 * 5. INTERACTIVE 6-STAGE FINGERPRINT LAB
 * ============================================================================ */
const PIPELINE_STAGE_DATA = {
  1: {
    tag: 'STAGE 1: IMAGE ACQUISITION',
    title: 'Biometric Image Acquisition & Ingestion',
    tech: 'OpenCV cv2.imread • Sensor Standard ISO/IEC 19794-2',
    desc: 'Ingests high-resolution biometric fingerprint scans via optical sensors. Standardizes aspect ratios, normalizes dynamic contrast, and validates minimum DPI (500 DPI) for reliable sub-dermal ridge pattern recognition.',
    steps: [
      'Raw biometric 8-bit grayscale optical capture.',
      'Validation against contrast thresholds and blur variance (Laplacian >= 100).',
      'Dynamic ROI (Region of Interest) cropping to eliminate sensor background edges.'
    ],
    hudInfo: 'RESOLUTION: 500 DPI | FORMAT: 8-BIT GRAYSCALE | LAPLACIAN VAR: 242.8'
  },
  2: {
    tag: 'STAGE 2: PREPROCESSING & THINNING',
    title: 'Gabor Ridge Filtering & Zhang-Suen Thinning',
    tech: 'OpenCV Gabor Kernels • Zhang-Suen Skeletonization • Albumentations',
    desc: 'Applies 2D Gabor spatial filtering aligned with local ridge orientation angles (θ) to enhance ridge clarity while removing high-frequency noise. Follows with iterative morphological thinning to reduce ridge lines to single-pixel width skeletons.',
    steps: [
      'Adaptive Gaussian thresholding for local contrast equalization.',
      'Gabor bandpass filtering tailored to fingerprint spatial frequency (f ≈ 0.12).',
      'Zhang-Suen morphological thinning to produce an exact topological skeleton.'
    ],
    hudInfo: 'GABOR ORIENTATIONS: 8 (0°-180°) | SKELETON THICKNESS: 1 PIXEL'
  },
  3: {
    tag: 'STAGE 3: MINUTIAE FEATURE EXTRACTION',
    title: 'Minutiae Detection (Bifurcations & Endings)',
    tech: 'Crossing Number (CN) Method • Poincaré Index • Topological Maps',
    desc: 'Calculates the Crossing Number (CN) over 3x3 local pixel neighborhoods to extract critical biometric landmarks: Ridge Endings (CN = 1) and Bifurcations (CN = 3). Filters false minutiae near image boundaries.',
    steps: [
      'Crossing Number matrix computation: CN = 0.5 * Σ |P_i - P_{i+1}|.',
      'Classification into 36 Bifurcation points and 42 Ridge Endings.',
      'Extraction of Core point and Delta singularity coordinates.'
    ],
    hudInfo: 'DETECTED MINUTIAE: 78 | BIFURCATIONS: 36 | ENDINGS: 42'
  },
  4: {
    tag: 'STAGE 4: DEEP FEATURE LEARNING & CLASSIFICATION',
    title: 'Deep CNN Embeddings & ABO/Rh Meta-Classification',
    tech: 'PyTorch ResNet-50 • scikit-learn Meta-Classifier • Cross-Entropy Loss',
    desc: 'Feed-forward forward pass through deep convolutional layers extracting high-level latent feature representations. A stacked meta-classifier fuses deep image embeddings with topological minutiae density vectors to output 8-class probabilities.',
    steps: [
      '512-dimensional convolutional feature vector extraction.',
      'Fusion of minutiae spatial distribution and frequency histograms.',
      'Softmax cross-entropy activation producing 8 calibrated probability scores.'
    ],
    hudInfo: 'EMBEDDING DIM: 512 | LOSS: 0.18 | TOP CONFIDENCE: 94.8%'
  },
  5: {
    tag: 'STAGE 5: EXPLAINABLE AI (CAPTUM XAI)',
    title: 'Integrated Gradients & Ridge Feature Attribution',
    tech: 'Captum • Integrated Gradients • Saliency Heatmaps • Medical XAI',
    desc: 'Utilizes PyTorch Captum to compute Integrated Gradients along the straight path from a black baseline image to the input scan. Generates attribution heatmaps proving that model predictions rely on genuine ridge curvature and delta points rather than background artifacts.',
    steps: [
      'Riemann sum approximation over 50 interpolation steps.',
      'Saliency overlay pinpointing high-attribution ridge whorls.',
      'Clinical validation: zero background attribution confirms ethical interpretability.'
    ],
    hudInfo: 'XAI METHOD: INTEGRATED GRADIENTS | BASELINE: ZERO TENSOR | CONVERGENCE: <0.02'
  },
  6: {
    tag: 'STAGE 6: DEPLOYMENT & ONNX RUNTIME',
    title: 'Optimized Inference Engine & Flask REST API',
    tech: 'ONNX Runtime • FP16 Quantization • Flask REST Microservice',
    desc: 'The trained PyTorch checkpoint is exported to Open Neural Network Exchange (ONNX) format with FP16 post-training quantization. Packaged into a high-throughput Flask REST API serving inferences under 15ms per biometric scan.',
    steps: [
      'ONNX graph optimization eliminating redundant tensor reshape operations.',
      'Sub-20ms inference latency (benchmarked at 14.2ms on CPU).',
      'Production-ready JSON response payload with medical screening disclaimers.'
    ],
    hudInfo: 'LATENCY: 14.2 ms | MEMORY: 68 MB | ENGINE: ONNX RUNTIME FP16'
  }
};

const SAMPLE_PREDICTIONS = {
  loop: {
    top: 'O+',
    probs: [
      { group: 'O+', pct: 94.8 },
      { group: 'A+', pct: 2.4 },
      { group: 'B+', pct: 1.5 },
      { group: 'O-', pct: 0.6 },
      { group: 'A-', pct: 0.3 },
      { group: 'B-', pct: 0.2 },
      { group: 'AB+', pct: 0.1 },
      { group: 'AB-', pct: 0.1 }
    ]
  },
  whorl: {
    top: 'B+',
    probs: [
      { group: 'B+', pct: 93.6 },
      { group: 'O+', pct: 3.1 },
      { group: 'AB+', pct: 1.8 },
      { group: 'B-', pct: 0.7 },
      { group: 'A+', pct: 0.4 },
      { group: 'AB-', pct: 0.2 },
      { group: 'A-', pct: 0.1 },
      { group: 'O-', pct: 0.1 }
    ]
  },
  arch: {
    top: 'A+',
    probs: [
      { group: 'A+', pct: 92.4 },
      { group: 'O+', pct: 4.2 },
      { group: 'A-', pct: 1.6 },
      { group: 'B+', pct: 0.9 },
      { group: 'AB+', pct: 0.5 },
      { group: 'O-', pct: 0.2 },
      { group: 'B-', pct: 0.1 },
      { group: 'AB-', pct: 0.1 }
    ]
  },
  composite: {
    top: 'AB+',
    probs: [
      { group: 'AB+', pct: 91.8 },
      { group: 'B+', pct: 4.1 },
      { group: 'A+', pct: 2.3 },
      { group: 'AB-', pct: 0.9 },
      { group: 'O+', pct: 0.5 },
      { group: 'B-', pct: 0.2 },
      { group: 'A-', pct: 0.1 },
      { group: 'O-', pct: 0.1 }
    ]
  }
};

let currentStep = 1;
let currentSample = 'loop';
let autoAnimTimer = null;

function initPipelineLab() {
  const stepperButtons = document.querySelectorAll('#pipelineStepper .step-btn');
  const sampleSelect = document.getElementById('sampleFingerprintSelect');
  const runAnimBtn = document.getElementById('runPipelineAnimBtn');
  const resetBtn = document.getElementById('resetPipelineBtn');

  stepperButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      clearInterval(autoAnimTimer);
      const step = parseInt(btn.getAttribute('data-step'), 10);
      setPipelineStep(step);
    });
  });

  if (sampleSelect) {
    sampleSelect.addEventListener('change', (e) => {
      currentSample = e.target.value;
      renderPipelineCanvas(currentStep, currentSample);
      renderProbabilityBars(currentSample);
    });
  }

  if (runAnimBtn) {
    runAnimBtn.addEventListener('click', () => {
      clearInterval(autoAnimTimer);
      let s = 1;
      setPipelineStep(s);
      autoAnimTimer = setInterval(() => {
        s++;
        if (s > 6) {
          clearInterval(autoAnimTimer);
          showToast('Automated 6-Stage Pipeline Sequence Completed');
          return;
        }
        setPipelineStep(s);
      }, 2000);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      clearInterval(autoAnimTimer);
      setPipelineStep(1);
      showToast('Pipeline View Reset to Stage 1');
    });
  }

  setPipelineStep(1);
}

function setPipelineStep(step) {
  currentStep = step;

  // Update Stepper UI
  document.querySelectorAll('#pipelineStepper .step-btn').forEach((btn) => {
    const s = parseInt(btn.getAttribute('data-step'), 10);
    btn.classList.toggle('active', s === step);
  });

  // Update Canvas Tag & Overlay HUD
  const stageData = PIPELINE_STAGE_DATA[step];
  const tagEl = document.getElementById('canvasStageTag');
  const hudEl = document.getElementById('canvasOverlayHUD');
  if (tagEl) tagEl.textContent = stageData.tag;
  if (hudEl) hudEl.textContent = stageData.hudInfo;

  // Update Details Pane
  const infoBox = document.getElementById('stageInfoBox');
  if (infoBox) {
    infoBox.innerHTML = `
      <h3 class="stage-title">${stageData.title}</h3>
      <span class="stage-tech-tag">${stageData.tech}</span>
      <p class="stage-desc">${stageData.desc}</p>
      <ul class="stage-steps-list">
        ${stageData.steps.map((st) => `<li>${st}</li>`).join('')}
      </ul>
    `;
  }

  // Draw Canvas
  renderPipelineCanvas(step, currentSample);
  renderProbabilityBars(currentSample);
}

/**
 * Draws algorithmic simulations of fingerprints at each stage
 */
function renderPipelineCanvas(step, pattern) {
  const canvas = document.getElementById('pipelineCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Background tone
  ctx.fillStyle = '#050814';
  ctx.fillRect(0, 0, w, h);

  // Background Grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const cx = w / 2;
  const cy = h / 2 - 10;

  // Determine line style per step
  let strokeColor = '#38bdf8';
  let lineWidth = 2.5;

  if (step === 1) {
    // Raw scan - slightly noisy & thicker
    strokeColor = 'rgba(180, 210, 240, 0.85)';
    lineWidth = 3.5;
  } else if (step === 2) {
    // Thinning - single pixel sharp lines
    strokeColor = '#10b981';
    lineWidth = 1.2;
  } else if (step === 3) {
    // Minutiae extraction
    strokeColor = 'rgba(56, 189, 248, 0.6)';
    lineWidth = 1.6;
  } else if (step === 4) {
    // Deep Feature Learning
    strokeColor = '#a855f7';
    lineWidth = 2.2;
  } else if (step === 5) {
    // Captum Saliency Heatmap
    strokeColor = '#f43f5e';
    lineWidth = 2.0;
  } else if (step === 6) {
    // ONNX deployment
    strokeColor = '#38bdf8';
    lineWidth = 2.0;
  }

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  // Draw concentric mathematical ridges according to pattern
  drawFingerprintPattern(ctx, cx, cy, pattern, step);

  // Stage Specific Overlays
  if (step === 3) {
    // Draw Minutiae Points
    drawMinutiaeMarkers(ctx, cx, cy, pattern);
  } else if (step === 4) {
    // Draw Deep Feature Bounding / Receptive Field Grid
    drawNeuralReceptiveFields(ctx, w, h);
  } else if (step === 5) {
    // Draw Captum Explainable AI Saliency Heatmap Overlay
    drawCaptumHeatmap(ctx, cx, cy, pattern);
  } else if (step === 6) {
    // Draw ONNX Quantization & Verification Stamp
    drawONNXBadge(ctx, w, h);
  }
}

function drawFingerprintPattern(ctx, cx, cy, pattern, step) {
  const ridgeCount = 14;

  for (let r = 1; r <= ridgeCount; r++) {
    const rx = r * 10;
    const ry = r * 14;

    ctx.beginPath();

    if (pattern === 'loop') {
      // Loop pattern: arches up and loops back down to right
      ctx.ellipse(cx - 10, cy, rx, ry, 0.15, Math.PI * 0.1, Math.PI * 1.9);
    } else if (pattern === 'whorl') {
      // Concentric whorl: spirals / nested ellipses
      ctx.ellipse(cx, cy, rx, ry * 1.05, 0, 0, Math.PI * 2);
    } else if (pattern === 'arch') {
      // Tented arch: sharp peak in middle
      ctx.ellipse(cx, cy + 20, rx * 1.1, ry * 0.9, 0, Math.PI * 0.8, Math.PI * 2.2);
    } else {
      // Composite / Twin Loop
      ctx.ellipse(cx - 15, cy - 10, rx * 0.85, ry * 0.9, 0.4, 0, Math.PI * 2);
    }

    ctx.stroke();
  }

  // Draw Core Singularity Center
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fill();
}

function drawMinutiaeMarkers(ctx, cx, cy, pattern) {
  const minutiae = [
    { x: cx - 45, y: cy - 35, type: 'bifurcation' },
    { x: cx + 38, y: cy - 50, type: 'ending' },
    { x: cx - 20, y: cy + 45, type: 'bifurcation' },
    { x: cx + 55, y: cy + 25, type: 'ending' },
    { x: cx - 60, y: cy + 15, type: 'ending' },
    { x: cx + 18, y: cy - 70, type: 'bifurcation' },
    { x: cx, y: cy, type: 'core' }
  ];

  minutiae.forEach((m) => {
    ctx.beginPath();
    if (m.type === 'bifurcation') {
      ctx.strokeStyle = '#ef4444'; // Red
      ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.rect(m.x - 5, m.y - 5, 10, 10);
      ctx.stroke();
      ctx.fill();
    } else if (m.type === 'ending') {
      ctx.strokeStyle = '#38bdf8'; // Cyan
      ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.arc(m.x, m.y, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
    } else {
      ctx.strokeStyle = '#a855f7'; // Purple Core
      ctx.arc(m.x, m.y, 7, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  // Legend at bottom
  ctx.font = '10px JetBrains Mono';
  ctx.fillStyle = '#ef4444';
  ctx.fillText('■ Bifurcations (36)', 15, 360);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('● Ridge Endings (42)', 155, 360);
}

function drawNeuralReceptiveFields(ctx, w, h) {
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 50, w - 80, h - 120);

  // Sub-blocks simulating 7x7 CNN convolutional kernels
  const kernelSize = 36;
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
  ctx.strokeRect(w / 2 - kernelSize / 2, h / 2 - kernelSize / 2, kernelSize, kernelSize);
  ctx.fillRect(w / 2 - kernelSize / 2, h / 2 - kernelSize / 2, kernelSize, kernelSize);

  ctx.font = '10px JetBrains Mono';
  ctx.fillStyle = '#c084fc';
  ctx.fillText('Conv5_x Receptive Field [512d]', w / 2 - 85, h / 2 + 35);
}

function drawCaptumHeatmap(ctx, cx, cy, pattern) {
  // Draw Radial Heatmap Gradient representing Integrated Gradients Attribution
  const grad = ctx.createRadialGradient(cx, cy - 10, 10, cx, cy, 110);
  grad.addColorStop(0, 'rgba(244, 63, 94, 0.65)'); // High attribution (Rose)
  grad.addColorStop(0.4, 'rgba(245, 158, 11, 0.45)'); // Medium (Amber)
  grad.addColorStop(0.8, 'rgba(56, 189, 248, 0.2)'); // Low (Cyan)
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, 120, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = '10px JetBrains Mono';
  ctx.fillStyle = '#f43f5e';
  ctx.fillText('▲ Captum Integrated Gradients: Ridge Core Attribution', 15, 360);
}

function drawONNXBadge(ctx, w, h) {
  ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(20, h - 55, w - 40, 38);
  ctx.fillRect(20, h - 55, w - 40, 38);

  ctx.font = '11px JetBrains Mono';
  ctx.fillStyle = '#10b981';
  ctx.fillText('✓ ONNX ENGINE VALIDATED • 14.2ms INFERENCE', 32, h - 32);
}

function renderProbabilityBars(sampleKey) {
  const container = document.getElementById('probDistributionBars');
  if (!container) return;

  const data = SAMPLE_PREDICTIONS[sampleKey] || SAMPLE_PREDICTIONS.loop;

  container.innerHTML = data.probs
    .map((item) => {
      const isTop = item.group === data.top;
      return `
        <div class="prob-row ${isTop ? 'top-prediction' : ''}">
          <span class="blood-group-tag">${item.group}</span>
          <div class="prob-track">
            <div class="prob-fill" style="width: ${item.pct}%;"></div>
          </div>
          <span class="prob-val-text">${item.pct}%</span>
        </div>
      `;
    })
    .join('');
}

/* ============================================================================
 * 6. ANALYTICS TABS & DATA INSIGHTS
 * ============================================================================ */
function initAnalyticsTabs() {
  const buttons = document.querySelectorAll('#analyticsTabButtons .analytics-tab-btn');
  const panes = document.querySelectorAll('.analytics-tab-pane');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      panes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = `pane-${btn.getAttribute('data-tab')}`;
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

function initConfusionMatrix() {
  const container = document.getElementById('confusionMatrixContainer');
  if (!container) return;

  const groups = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];

  // Normalized values with high diagonal dominance
  const matrixValues = [
    [0.954, 0.012, 0.015, 0.005, 0.008, 0.002, 0.003, 0.001],
    [0.015, 0.938, 0.021, 0.008, 0.004, 0.009, 0.003, 0.002],
    [0.018, 0.014, 0.941, 0.012, 0.003, 0.002, 0.008, 0.002],
    [0.008, 0.022, 0.026, 0.926, 0.002, 0.004, 0.004, 0.008],
    [0.025, 0.006, 0.008, 0.002, 0.932, 0.015, 0.008, 0.004],
    [0.008, 0.028, 0.006, 0.004, 0.012, 0.924, 0.012, 0.006],
    [0.009, 0.008, 0.031, 0.005, 0.009, 0.014, 0.918, 0.006],
    [0.005, 0.018, 0.022, 0.035, 0.006, 0.008, 0.012, 0.894]
  ];

  let html = '';

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const val = matrixValues[r][c];
      const isDiag = r === c;
      const opacity = isDiag ? val * 0.9 : Math.max(val * 4, 0.08);
      const bg = isDiag
        ? `rgba(56, 189, 248, ${opacity})`
        : `rgba(255, 255, 255, ${opacity * 0.3})`;
      const textColor = isDiag ? '#ffffff' : 'rgba(255,255,255,0.4)';

      html += `
        <div class="matrix-cell" style="background: ${bg}; color: ${textColor};" 
             title="Actual ${groups[r]} → Pred ${groups[c]}: ${(val * 100).toFixed(1)}%">
          ${(val * 100).toFixed(0)}
        </div>
      `;
    }
  }

  container.innerHTML = html;
}

/* ============================================================================
 * 7. RESUME MODAL & PRINTING
 * ============================================================================ */
function initResumeModal() {
  const modal = document.getElementById('resumeModal');
  const openBtn = document.getElementById('openResumeModalBtn');
  const closeBtn = document.getElementById('closeResumeModalBtn');
  const printBtn = document.getElementById('printResumeBtn');

  if (!modal || !openBtn) return;

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close upon backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Print button
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ============================================================================
 * 8. CONTACT ACTIONS & TOASTS
 * ============================================================================ */
function initContactActions() {
  const quickEmailBtn = document.getElementById('quickCopyEmailBtn');
  const copyEmailAction = document.getElementById('copyEmailAction');
  const copyPhoneAction = document.getElementById('copyPhoneAction');
  const contactForm = document.getElementById('contactForm');

  const email = 'kullaireddy882@gmail.com';
  const phone = '+919392554749';

  function copyText(text, label) {
    navigator.clipboard.writeText(text).then(
      () => {
        showToast(`Copied ${label} to clipboard!`);
      },
      () => {
        showToast(`Clipboard error. Text: ${text}`);
      }
    );
  }

  if (quickEmailBtn) {
    quickEmailBtn.addEventListener('click', () => copyText(email, 'Email'));
  }
  if (copyEmailAction) {
    copyEmailAction.addEventListener('click', () => copyText(email, 'Email'));
  }
  if (copyPhoneAction) {
    copyPhoneAction.addEventListener('click', () => copyText(phone, 'Phone number'));
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const userEmail = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
        `[Portfolio] ${subject}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${userEmail}\n\nMessage:\n${message}`
      )}`;

      window.location.href = mailtoUrl;
      showToast('Opening your default email client...');
      contactForm.reset();
    });
  }
}

function showToast(msg) {
  let toast = document.getElementById('toastNotification');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

/* ============================================================================
 * 9. MOBILE NAVIGATION TOGGLE
 * ============================================================================ */
function initMobileNav() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!mobileBtn || !navLinks) return;

  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close nav when clicking any link
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}
