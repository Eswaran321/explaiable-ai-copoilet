/* ============================================================
   AI Content Tester Co-Pilot — app.js
   Real-time content analysis, generation, voice, search
   ============================================================ */

// ─── Toggle Co-Pilot Window ──────────────────────────────
const trigger = document.getElementById('copilotTrigger');
const win     = document.getElementById('copilotWindow');
const closeBtn= document.getElementById('closeBtn');
const minBtn  = document.getElementById('minimizeBtn');

let isMinimized = false;

trigger.addEventListener('click', () => {
  if (win.classList.contains('hidden')) {
    win.classList.remove('hidden');
    win.style.animation = 'none';
    win.offsetHeight; // reflow
    win.style.animation = 'window-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    setStatus('Active · Analyzing overlay…');
  } else {
    win.classList.add('hidden');
  }
});

closeBtn.addEventListener('click', () => win.classList.add('hidden'));

minBtn.addEventListener('click', () => {
  const body = win.querySelectorAll('.cw-tabs, .tab-content, .cw-statusbar');
  isMinimized = !isMinimized;
  body.forEach(el => el.style.display = isMinimized ? 'none' : '');
  minBtn.textContent = isMinimized ? '▲' : '—';
});

// ─── Tab Switching ───────────────────────────────────────
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ─── Input Mode Switching ────────────────────────────────
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.input-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('mode-' + btn.dataset.mode).classList.add('active');
    hideResults();
  });
});

// ─── Detect / Analyze ────────────────────────────────────
const analyzeBtn  = document.getElementById('analyzeBtn');
const contentInput= document.getElementById('contentInput');
const resultsArea = document.getElementById('resultsArea');
const resultBadge = document.getElementById('resultBadge');
const scoreFill   = document.getElementById('scoreFill');
const scorePct    = document.getElementById('scorePct');
const resultCards = document.getElementById('resultCards');

const AI_TOOLS  = ['ChatGPT (OpenAI)','Midjourney','DALL·E 3','Stable Diffusion','Gemini','Claude','Sora','ElevenLabs','Runway ML','Synthesia','Kling AI'];
const AI_PROMPTS_POOL = [
  '"Create a photorealistic image of a futuristic city at night"',
  '"Write a compelling marketing caption about sustainability"',
  '"Generate a cinematic portrait with dramatic lighting"',
  '"Compose an upbeat background track for a product video"',
  '"Produce a professional voiceover for a tech startup"',
  '"Design an eye-catching social media post for a fashion brand"',
  '"Write a persuasive product description for an eco bag"',
  '"Create a 30-second explainer video script about AI"',
];
const PURPOSES = [
  'Marketing / Promotional content designed to drive engagement on social media platforms.',
  'Educational content intended to inform audiences about a specific topic.',
  'Entertainment content crafted to maximize viewer watch-time and algorithmic reach.',
  'Brand storytelling content meant to build emotional connection with audiences.',
  'Product advertising content optimized for conversion and click-through rates.',
  'Informational post created to establish authority and credibility in a niche.',
];

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function analyzeContent(label) {
  setStatus('Analyzing content with AI…');
  resultsArea.classList.add('hidden');
  resultCards.innerHTML = '<div style="padding:14px;text-align:center;color:var(--text2);font-size:12px;font-family:var(--mono)"><span class="spinner"></span>Running AI detection…</div>';
  resultsArea.classList.remove('hidden');

  setTimeout(() => {
    const score = Math.floor(Math.random() * 40) + 55; // 55-94%
    const isAI  = score > 60;
    const tool  = randomFrom(AI_TOOLS);
    const prompt= randomFrom(AI_PROMPTS_POOL);
    const purpose=randomFrom(PURPOSES);

    // Badge
    resultBadge.textContent = isAI ? '🤖 AI GENERATED' : '✅ HUMAN CREATED';
    resultBadge.className   = 'result-badge ' + (isAI ? 'ai' : 'human');

    // Score bar
    scoreFill.style.width = '0%';
    scorePct.textContent  = '0%';
    setTimeout(() => {
      scoreFill.style.width = score + '%';
      animateNumber(scorePct, 0, score, 800, '%');
    }, 80);

    // Cards
    resultCards.innerHTML = '';
    const cards = isAI ? [
      { label: 'DETECTED AI TOOL', value: `<span class="rc-tool"><span class="rc-tool-badge">${tool}</span></span>` },
      { label: 'ESTIMATED PROMPT USED', value: prompt },
      { label: 'CONTENT PURPOSE', value: purpose },
      { label: 'CONFIDENCE BREAKDOWN', value: buildConfidenceBar(score) },
      { label: 'RECOMMENDATION', value: 'This content appears AI-generated. Verify authenticity before sharing, especially in academic or journalistic contexts.' },
    ] : [
      { label: 'VERIFICATION STATUS', value: '<span class="rc-tool"><span class="rc-tool-badge" style="background:rgba(0,230,118,0.1);color:var(--green);border-color:rgba(0,230,118,0.3)">✅ Human Verified</span></span>' },
      { label: 'ANALYSIS NOTES', value: 'Natural language patterns, irregular sentence structure, and contextual depth strongly suggest human authorship.' },
      { label: 'AI ENHANCEMENT SUGGESTIONS', value: buildAISuggestions() },
      { label: 'CONFIDENCE BREAKDOWN', value: buildConfidenceBar(100 - score) },
    ];

    cards.forEach((c, i) => {
      const el = document.createElement('div');
      el.className = 'result-card';
      el.style.animationDelay = (i * 0.07) + 's';
      el.innerHTML = `<div class="rc-label">${c.label}</div><div class="rc-value">${c.value}</div>`;
      resultCards.appendChild(el);
    });

    setStatus('Analysis complete · ' + (isAI ? 'AI content detected' : 'Human content verified'));
  }, 1800);
}

function buildConfidenceBar(score) {
  const hue = score > 70 ? '#a259ff' : '#00e676';
  return `
    <div style="display:flex;flex-direction:column;gap:5px;margin-top:4px;">
      ${['Linguistic patterns','Visual artifacts','Metadata signals','Semantic coherence'].map((l,i) => {
        const v = Math.max(30, score - (i*7) + Math.floor(Math.random()*12));
        return `<div style="display:flex;align-items:center;gap:8px;font-size:10px;font-family:var(--mono)">
          <span style="width:110px;color:var(--text3)">${l}</span>
          <div style="flex:1;height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden">
            <div style="width:${v}%;height:100%;background:${hue};border-radius:2px;transition:width 0.8s ease ${0.2+i*0.1}s"></div>
          </div>
          <span style="color:${hue};width:28px;text-align:right">${v}%</span>
        </div>`;
      }).join('')}
    </div>`;
}

function buildAISuggestions() {
  const items = ['Grammar & clarity enhancement','Auto-caption generation','Image alt-text AI writer','Tone optimizer for audience','SEO keyword suggestions'];
  return items.map(s => `<div style="display:flex;align-items:center;gap:6px;padding:3px 0;font-size:11px;font-family:var(--mono);color:var(--text2)">
    <span style="color:var(--accent)">→</span> ${s}
  </div>`).join('');
}

analyzeBtn.addEventListener('click', () => {
  const text = contentInput.value.trim();
  if (!text) { contentInput.style.borderColor='var(--red)'; setTimeout(()=>contentInput.style.borderColor='',800); return; }
  analyzeContent('text');
});

document.getElementById('analyzeImgBtn').addEventListener('click', () => analyzeContent('image'));

function hideResults() {
  resultsArea.classList.add('hidden');
  resultCards.innerHTML = '';
}

// ─── Generate Tab ────────────────────────────────────────
document.querySelectorAll('.gen-type').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gen-type').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Show/hide style options
    const genOptions = document.getElementById('genOptions');
    genOptions.style.display = ['image','gif','sticker','video'].includes(btn.dataset.gen) ? '' : 'none';
  });
});

const generateBtn = document.getElementById('generateBtn');
const genResult   = document.getElementById('genResult');
const genPrompt   = document.getElementById('genPrompt');

const GEN_RESPONSES = {
  image:   () => `<div style="color:var(--accent2)">🖼 <strong>Image Generated</strong></div>
    <div style="margin:8px 0;width:100%;height:120px;border-radius:8px;background:linear-gradient(135deg,rgba(162,89,255,0.2),rgba(79,140,255,0.2));display:flex;align-items:center;justify-content:center;border:1px solid var(--border);font-size:28px">🎨</div>
    <div style="font-size:11px;color:var(--text2)">1024×1024 · Realistic · Generated with <span style="color:var(--accent)">Anthropic Vision</span></div>`,
  video:   () => `<div style="color:var(--accent2)">🎬 <strong>Video Clip Ready</strong></div>
    <div style="margin:8px 0;font-size:11px;color:var(--text2)">Duration: 5s · 1080p · MP4 · <span style="color:var(--accent)">Sora-compatible export</span></div>
    <div style="font-size:11px;color:var(--text3)">Estimated render: ~45 seconds on GPU</div>`,
  audio:   () => `<div style="color:var(--accent2)">🎵 <strong>Audio Track Generated</strong></div>
    <div style="margin:8px 0;font-size:11px;color:var(--text2)">Duration: 30s · WAV 44.1kHz · Stereo</div>
    <div style="display:flex;gap:4px;margin-top:8px">${Array.from({length:24},()=>`<div style="flex:1;height:${8+Math.random()*30}px;background:var(--accent);opacity:0.7;border-radius:2px"></div>`).join('')}</div>`,
  gif:     () => `<div style="color:var(--accent2)">🎞 <strong>GIF Created</strong></div>
    <div style="margin:8px 0;font-size:11px;color:var(--text2)">480×480 · 24fps · 2.4MB · Looping</div>`,
  sticker: () => `<div style="color:var(--accent2)">😎 <strong>Sticker Pack (4)</strong></div>
    <div style="margin:8px 0;display:flex;gap:10px;font-size:28px">😎🔥✨🎯</div>
    <div style="font-size:11px;color:var(--text2)">512×512 px · WebP · Transparent BG</div>`,
  text:    () => `<div style="color:var(--accent2)">📝 <strong>Generated Copy</strong></div>
    <div style="margin:8px 0;font-size:11px;color:var(--text2);line-height:1.6">"Unlock the future of content — where every pixel, every word, every sound tells your story with the precision of AI and the soul of a human creator."</div>`,
  code:    () => `<div style="color:var(--accent2)">💻 <strong>Code Generated</strong></div>
    <pre style="margin:8px 0;font-size:10px;color:var(--green);background:rgba(0,0,0,0.3);padding:10px;border-radius:6px;overflow-x:auto;line-height:1.6">function analyzeContent(text) {
  const score = await aiDetect(text);
  return { isAI: score > 0.6, confidence: score };
}</pre>`,
};

generateBtn.addEventListener('click', () => {
  const prompt = genPrompt.value.trim();
  if (!prompt) { genPrompt.style.borderColor='var(--red)'; setTimeout(()=>genPrompt.style.borderColor='',800); return; }
  const activeType = document.querySelector('.gen-type.active')?.dataset.gen || 'image';
  genResult.classList.remove('hidden');
  genResult.innerHTML = `<span class="spinner"></span> Generating ${activeType}…`;
  setStatus('Generating ' + activeType + '…');
  setTimeout(() => {
    genResult.innerHTML = (GEN_RESPONSES[activeType] || GEN_RESPONSES.text)();
    setStatus('Generated · ' + activeType + ' ready');
  }, 2200);
});

// ─── Voice Tab ───────────────────────────────────────────
const voiceOrb      = document.getElementById('voiceOrb');
const voiceStatus   = document.getElementById('voiceStatus');
const voiceTranscript= document.getElementById('voiceTranscript');
const voiceActions  = document.getElementById('voiceActions');
let recognition, isListening = false;

function initSpeechRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;
  const r = new SR();
  r.continuous = true;
  r.interimResults = true;
  r.lang = 'en-US';
  r.onresult = e => {
    let final = '', interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      e.results[i].isFinal ? final += t : interim += t;
    }
    voiceTranscript.innerHTML = voiceTranscript.textContent.replace(/<[^>]*>/g,'') + final +
      (interim ? `<span style="color:var(--text3)">${interim}</span>` : '');
    if (final) { voiceActions.classList.remove('hidden'); }
  };
  r.onerror = () => stopListening('Error · Mic not available');
  r.onend   = () => { if (isListening) r.start(); };
  return r;
}

function startListening() {
  recognition = recognition || initSpeechRecognition();
  if (!recognition) {
    // Fallback simulation
    voiceStatus.textContent = 'Listening… (simulated)';
    voiceOrb.classList.add('listening');
    isListening = true;
    setStatus('Voice input active…');
    const DEMO_TEXT = 'This is a sample voice transcription. The AI Content Tester Co-Pilot is now actively listening to your voice input and converting it to text in real time.';
    let idx = 0;
    const ticker = setInterval(() => {
      if (!isListening) { clearInterval(ticker); return; }
      voiceTranscript.textContent = DEMO_TEXT.slice(0, idx += 3);
      if (idx >= DEMO_TEXT.length) {
        clearInterval(ticker);
        voiceActions.classList.remove('hidden');
        voiceStatus.textContent = 'Done · Review or act on text';
      }
    }, 60);
    return;
  }
  recognition.start();
  voiceOrb.classList.add('listening');
  isListening = true;
  voiceStatus.textContent = 'Listening…';
  setStatus('Voice input active…');
}

function stopListening(msg = 'Stopped · Review transcript') {
  if (recognition) { try { recognition.stop(); } catch(e) {} }
  voiceOrb.classList.remove('listening');
  isListening = false;
  voiceStatus.textContent = msg;
  setStatus('Ready · Overlay active on all apps');
}

voiceOrb.addEventListener('click', () => {
  isListening ? stopListening() : startListening();
});

document.getElementById('voiceCopy').addEventListener('click', () => {
  navigator.clipboard?.writeText(voiceTranscript.textContent).catch(()=>{});
  showToast('Copied!');
});
document.getElementById('voiceClear').addEventListener('click', () => {
  voiceTranscript.textContent = '';
  voiceActions.classList.add('hidden');
});
document.getElementById('voiceSearch').addEventListener('click', () => {
  const txt = voiceTranscript.textContent.trim();
  if (txt) { document.querySelector('[data-tab="search"]').click(); document.getElementById('searchInput').value = txt; }
});
document.getElementById('voiceAnalyze').addEventListener('click', () => {
  const txt = voiceTranscript.textContent.trim();
  if (txt) { document.querySelector('[data-tab="detect"]').click(); contentInput.value = txt; analyzeBtn.click(); }
});

// ─── Search Tab ──────────────────────────────────────────
const searchInput  = document.getElementById('searchInput');
const searchGo     = document.getElementById('searchGo');
const searchResults= document.getElementById('searchResults');

document.querySelectorAll('.smode').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.smode').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

const MOCK_RESULTS = [
  { title: 'AI Content Detection Guide 2025', snippet: 'Comprehensive guide on identifying AI-generated text, images, and videos using the latest detection models including GPT-4 and Claude classifiers.', tag: 'deepresearch.io' },
  { title: 'How to Spot AI-Generated Images', snippet: 'Visual artifacts, perfect symmetry, and unusual backgrounds are telltale signs of AI-generated images from tools like Midjourney and DALL·E.', tag: 'techcrunch.com' },
  { title: 'AI Writing vs Human Writing: Key Differences', snippet: 'Studies show AI writing tends to be more uniform in sentence length and lacks personal anecdotes, making it detectable through linguistic analysis.', tag: 'openai-blog' },
  { title: 'Content Authenticity Initiative (CAI)', snippet: 'Industry coalition for content provenance standards and metadata watermarking to verify whether content is AI-generated or human-made.', tag: 'c2pa.org' },
];

function doSearch(query) {
  if (!query.trim()) return;
  searchResults.innerHTML = `<div style="padding:14px;text-align:center;font-family:var(--mono);font-size:12px;color:var(--text2)"><span class="spinner"></span> AI searching for "${query}"…</div>`;
  setStatus('Searching: ' + query);
  setTimeout(() => {
    searchResults.innerHTML = MOCK_RESULTS.map(r => `
      <div class="sr-result">
        <div class="sr-result-title">${r.title}</div>
        <div class="sr-result-snippet">${r.snippet}</div>
        <span class="sr-tag">${r.tag}</span>
      </div>`).join('') +
      `<div style="padding:10px 0;font-size:11px;font-family:var(--mono);color:var(--text3)">AI Summary: ${query} relates to content provenance, AI detection accuracy, and digital authenticity standards.</div>`;
    setStatus('Search complete · ' + MOCK_RESULTS.length + ' results');
  }, 1500);
}

searchGo.addEventListener('click', () => doSearch(searchInput.value));
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(searchInput.value); });

// ─── Draw to Search ──────────────────────────────────────
const canvas  = document.getElementById('drawCanvas');
const ctx     = canvas ? canvas.getContext('2d') : null;
let drawing   = false;

if (ctx) {
  ctx.strokeStyle = '#4f8cff';
  ctx.lineWidth   = 2.5;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';

  canvas.addEventListener('mousedown', e => { drawing = true; ctx.beginPath(); ctx.moveTo(...pos(e,canvas)); });
  canvas.addEventListener('mousemove', e => { if (!drawing) return; ctx.lineTo(...pos(e,canvas)); ctx.stroke(); });
  canvas.addEventListener('mouseup',   () => drawing = false);
  canvas.addEventListener('mouseleave',() => drawing = false);

  // Touch
  canvas.addEventListener('touchstart',  e => { e.preventDefault(); drawing = true; ctx.beginPath(); ctx.moveTo(...pos(e.touches[0],canvas)); });
  canvas.addEventListener('touchmove',   e => { e.preventDefault(); if (!drawing) return; ctx.lineTo(...pos(e.touches[0],canvas)); ctx.stroke(); });
  canvas.addEventListener('touchend',    () => drawing = false);

  document.getElementById('clearCanvas').addEventListener('click', () => ctx.clearRect(0,0,canvas.width,canvas.height));
}

function pos(e, el) {
  const r = el.getBoundingClientRect();
  return [e.clientX - r.left, e.clientY - r.top];
}

// ─── Drag to Search ──────────────────────────────────────
const dragZone = document.getElementById('dragZone');
if (dragZone) {
  dragZone.addEventListener('dragover',  e => { e.preventDefault(); dragZone.classList.add('dragover'); });
  dragZone.addEventListener('dragleave', () => dragZone.classList.remove('dragover'));
  dragZone.addEventListener('drop', e => {
    e.preventDefault();
    dragZone.classList.remove('dragover');
    const text = e.dataTransfer.getData('text/plain');
    if (text) {
      dragZone.innerHTML = `<span style="color:var(--green)">✓</span><p style="font-size:11px;color:var(--text2)">"${text.slice(0,60)}…" ready</p>`;
      setTimeout(() => { contentInput.value = text; }, 500);
    }
  });
}

// ─── Select to Screen (simulated) ───────────────────────
document.getElementById('startSelectBtn')?.addEventListener('click', () => {
  setStatus('Select mode · Drag over screen area…');
  showToast('Screen select activated (simulated)');
  setTimeout(() => {
    contentInput.value = 'Selected screen content: This post appears to use AI-generated caption with suspiciously perfect grammar and uniform sentence cadence.';
    document.querySelector('[data-mode="text"]').click();
    setStatus('Screen content captured · Ready to analyze');
  }, 2000);
});

// ─── Image File Input ────────────────────────────────────
document.getElementById('imgFile')?.addEventListener('change', function() {
  if (this.files[0]) {
    document.querySelector('#mode-image .drop-zone').innerHTML = `<span style="color:var(--green)">✓ ${this.files[0].name} loaded</span>`;
  }
});

// ─── Helpers ─────────────────────────────────────────────
function setStatus(msg) {
  document.getElementById('statusText').textContent = msg;
}

function animateNumber(el, from, to, dur, suffix = '') {
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(from + (to - from) * easeOut(p)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position:'fixed', bottom:'160px', right:'28px', zIndex:'99999',
    background:'rgba(79,140,255,0.9)', color:'white',
    padding:'8px 14px', borderRadius:'8px', fontSize:'12px',
    fontFamily:'var(--mono)', backdropFilter:'blur(10px)',
    boxShadow:'0 4px 16px rgba(79,140,255,0.4)',
    animation:'fade-up 0.3s ease forwards',
    transition:'opacity 0.3s',
  });
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 1800);
}

// ─── Keyboard Shortcut: Alt+A ────────────────────────────
document.addEventListener('keydown', e => {
  if (e.altKey && e.key === 'a') trigger.click();
  if (e.key === 'Escape' && !win.classList.contains('hidden')) win.classList.add('hidden');
});

// ─── Auto-open on load (for demo) ───────────────────────
setTimeout(() => { trigger.click(); }, 600);
