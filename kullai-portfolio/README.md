# Murikinati Kullai Reddy — AI & Machine Learning Engineer Portfolio

A modern, high-performance, glassmorphic portfolio web application built for **Murikinati Kullai Reddy**, B.Tech graduate in **Artificial Intelligence & Machine Learning** from **Mohan Babu University**.

---

## 🌟 Key Highlights & Engineering Features

### 1. Interactive 6-Stage Biometric Pipeline Lab
Directly demonstrates his flagship research project: **"A Non-Invasive Blood Group Prediction System using Fingerprints and Machine Learning"**:
- **Stage 1 (Image Acquisition)**: Raw 500 DPI optical scan ingestion with noise check and dynamic contrast normalization.
- **Stage 2 (Preprocessing & Thinning)**: 2D Gabor bandpass filtering tailored to ridge frequency orientation + Zhang-Suen morphological thinning to 1-pixel skeletons.
- **Stage 3 (Minutiae Extraction)**: Automated Crossing Number (CN) matrix analysis marking Bifurcations (red squares), Ridge Endings (cyan circles), and core singularities.
- **Stage 4 (Deep Feature Learning)**: PyTorch ResNet-50 512-dimensional feature embedding fusion with meta-classifier and Softmax cross-entropy activation.
- **Stage 5 (Explainable AI - Captum XAI)**: Integrated Gradients attribution heatmap proving clinical interpretability and absence of background artifacts.
- **Stage 6 (Deployment & ONNX Runtime)**: Sub-15ms inference latency benchmarking, FP16 quantization, and Flask REST API architecture.
- **Interactive Controls**: Automated sequence runner, pattern switchers (*Right Loop*, *Concentric Whorl*, *Tented Arch*, *Composite Twin Loop*), and live 8-class probability distribution bars.

### 2. Practical AI & Data Analytics Dashboard
Simulating his corporate data experience from **Deloitte**, **DeepLearning.AI**, and **Skill AP (Govt. of AP)**:
- **Neural Loss & Accuracy Curves**: Real-time SVG convergence graph with AdamW optimizer, cosine annealing schedule, and training vs validation loss tracking.
- **8-Class Confusion Matrix**: Interactive normalized matrix across all ABO/Rh classes (A+, A-, B+, B-, AB+, AB-, O+, O-).
- **LeetCode & Algorithmic Practice**: Proficiency breakdown covering Arrays, Trees, BFS/DFS, and Dynamic Programming.

### 3. Glassmorphic Cyber-Precision UI
- **Constellation Neural Mesh Canvas**: Interactive canvas nodes responding smoothly to cursor movement and magnetism.
- **Biometric HUD Telemetry Card**: Animated laser sweep, live status indicators, and real-time inference telemetry.
- **Dynamic Dark/Light Themes**: Smooth transitions between deep sapphire obsidian and crisp daylight modes with local storage persistence.
- **Modern Typography**: Google Fonts (`Plus Jakarta Sans`, `Outfit`, `JetBrains Mono`).

### 4. Education & Campus Leadership Timeline
- **Mohan Babu University**: B.Tech in Artificial Intelligence & Machine Learning (CGPA: 7.16 / 10).
- **Sri Chaitanya Junior College**: Class XII (Board of Intermediate Education) — 82.0%.
- **Sri Chaitanya Children's Academy**: Class X (Board of Secondary Education) — 98.2% (Outstanding academic foundation).
- **Team Coordinator**: University event management, logistics, and inter-student leadership at Mohan Babu University.
- **Coding & Competitive Programming**: Active participation in hackathons and LeetCode problem solving.

### 5. Integrated Executive Resume Viewer & Dedicated Print Stylesheet
- 1-click **"Resume"** modal displaying the complete, formatted resume.
- Custom print styles (`@media print`) that format the resume into an executive black-and-white printout or PDF via `Ctrl + P` or the **"Print / Save PDF"** button.

### 6. Quick Contact & One-Click Copy
- Instant clipboard copy for email (`kullaireddy882@gmail.com`) and phone (`+91 9392554749`) with glowing toast notifications.
- Interactive message form that drafts pre-filled emails with subjects directly in the user's mail client.

---

## 🚀 How to Run Locally

### Option 1: One-Click Launcher (Windows)
Double-click [`open_portfolio.bat`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/kullai-portfolio/open_portfolio.bat) or open [`index.html`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/kullai-portfolio/index.html) in your browser (Chrome, Edge, Brave, etc.).

### Option 2: Local HTTP Server (Python)
If Python is installed:
```powershell
cd C:\Users\rithv\.gemini\antigravity-ide\scratch\kullai-portfolio
python -m http.server 8124
```
Then visit: **`http://localhost:8124`** in your browser.

---

## 📁 Project Structure

```
kullai-portfolio/
├── index.html          # Semantic HTML5 layout, HUD telemetry, interactive labs & accessible modals
├── style.css           # Glassmorphism design system, dark/light themes, print stylesheet
├── app.js              # Neural canvas, 6-stage fingerprint simulation, analytics charts, toast system
├── open_portfolio.bat  # 1-click Windows launcher
└── README.md           # Comprehensive project documentation
```
