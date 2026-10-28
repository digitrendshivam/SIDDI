import http from 'node:http';
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const url = process.argv[2] || 'http://localhost:4180/?noload=true';
const outputFile = process.argv[3] || 'screenshot.png';
const width = parseInt(process.argv[4] || '1440', 10);
const height = parseInt(process.argv[5] || '900', 10);
const scrollY = parseInt(process.argv[6] || '0', 10);

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserPath = fs.existsSync(edgePath) ? edgePath : chromePath;
const port = 9340 + Math.floor(Math.random() * 50);
const tempDir = `C:\\Users\\7x\\AppData\\Local\\Temp\\browser_scr_${Date.now()}`;

const proc = spawn(browserPath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-background-networking',
  '--disable-sync',
  '--disable-extensions',
  '--disable-component-update',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${tempDir}`,
  'about:blank'
]);

proc.stderr?.on('data', d => console.error('BROWSER ERR:', d.toString()));
proc.on('error', e => console.error('PROC ERR:', e));

const wait = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  let json = null;
  for (let attempt = 0; attempt < 25; attempt++) {
    await wait(250);
    try {
      json = await new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${port}/json/version`, res => {
          let data = '';
          res.on('data', c => data += c);
          res.on('end', () => {
            try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
          });
        });
        req.on('error', reject);
        req.setTimeout(500, () => req.destroy());
      });
      if (json?.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  if (!json?.webSocketDebuggerUrl) {
    throw new Error('Failed to connect to browser debugging port');
  }

  const ws = new WebSocket(json.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) cb.reject(msg.error);
      else cb.resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  function sendSession(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, sessionId, method, params }));
    });
  }

  await sendSession('Page.enable');
  await sendSession('Runtime.enable');
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768,
  });

  await sendSession('Page.navigate', { url });
  
  // Wait until content has mounted (up to 10 seconds)
  for (let i = 0; i < 20; i++) {
    await wait(500);
    try {
      const res = await sendSession('Runtime.evaluate', {
        expression: 'document.querySelectorAll("h1, h2, h3, article, section").length'
      });
      if (res?.result?.value > 0) {
        console.log(`Found ${res.result.value} content elements on page`);
        break;
      }
    } catch (e) {}
  }
  // Allow initial loaders / transitions to complete
  await wait(1000);

  setTimeout(() => {
    console.error('Safety timeout reached, terminating browser');
    proc.kill();
    process.exit(1);
  }, 12000);

  if (scrollY === -1) {
    await sendSession('Runtime.evaluate', {
      expression: `
        const nav = document.querySelector('nav[aria-label="Catalogue pagination"]');
        if (nav) {
          const rect = nav.getBoundingClientRect();
          window.scrollTo({ top: window.scrollY + rect.top - 400, behavior: 'instant' });
        }
      `
    });
    await wait(500);
  } else if (scrollY === -2) {
    await sendSession('Runtime.evaluate', {
      expression: `
        const mapEl = document.getElementById("studio-location-title");
        if (mapEl) {
          if (window.__lenis) {
            window.__lenis.scrollTo(mapEl, { offset: -80, immediate: true });
          } else {
            mapEl.scrollIntoView({ behavior: 'instant', block: 'start' });
          }
        }
      `
    });
    await wait(5000);
  } else if (scrollY === -3) {
    await sendSession('Runtime.evaluate', {
      expression: `
        const footerCta = document.querySelector('footer');
        if (footerCta) {
          if (window.__lenis) {
            window.__lenis.scrollTo(footerCta, { offset: -300, immediate: true });
          } else {
            footerCta.scrollIntoView({ behavior: 'instant', block: 'start' });
          }
        }
      `
    });
    await wait(4000);
  } else if (scrollY === -5) {
    await sendSession('Runtime.evaluate', {
      expression: `
        const el = Array.from(document.querySelectorAll('div, span')).find(e => e.textContent.includes('FIG. 01–04'));
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -120, immediate: true });
          } else {
            el.scrollIntoView({ behavior: 'instant', block: 'center' });
          }
        }
      `
    });
    await wait(3000);
  } else if (scrollY > 0) {
    await sendSession('Runtime.evaluate', {
      expression: `
        if (window.__lenis) {
          window.__lenis.scrollTo(${scrollY}, { immediate: true });
        } else {
          window.scrollTo({ top: ${scrollY}, behavior: 'instant' });
        }
      `
    });
    await wait(500);
  }

  const { data } = await sendSession('Page.captureScreenshot', {
    format: 'png',
  });

  fs.writeFileSync(outputFile, Buffer.from(data, 'base64'));
  console.log(`Saved screenshot to ${outputFile} (${width}x${height}, scrollY=${scrollY}, ${data.length} bytes)`);

  ws.close();
  proc.kill();
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  proc.kill();
  process.exit(1);
});
