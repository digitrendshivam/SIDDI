import http from 'node:http';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9355;
const tempDir = `C:\\Users\\7x\\AppData\\Local\\Temp\\edge_trans_${Date.now()}`;

const inputPath = process.argv[2] || 'C:\\Users\\7x\\.gemini\\antigravity\\brain\\6a883add-40a1-4b1a-9c3a-afcc67d88c31\\siddi_trade_desk_illustration_1793104446304.jpg';
const outputPath = process.argv[3] || 'C:\\Users\\7x\\Downloads\\Siddi\\public\\trade-desk-support.png';

const proc = spawn(edgePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${tempDir}`,
  'about:blank'
]);

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

  const imgB64 = fs.readFileSync(inputPath).toString('base64');
  const mime = inputPath.endsWith('.png') ? 'image/png' : 'image/jpeg';

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="background:transparent;margin:0;">
        <img id="ref" src="data:${mime};base64,${imgB64}" />
        <canvas id="c"></canvas>
      </body>
    </html>
  `;

  await sendSession('Page.setDocumentContent', { html, frameId: (await sendSession('Page.getFrameTree')).frameTree.frame.id });
  await wait(1200);

  const res = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const img = document.getElementById('ref');
      const c = document.getElementById('c');
      c.width = img.naturalWidth || img.width;
      c.height = img.naturalHeight || img.height;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, c.width, c.height);
      const data = imgData.data;
      const len = data.length;

      // Sample border pixels to get the exact background color
      let bgR = 0, bgG = 0, bgB = 0;
      let count = 0;
      for (let x = 0; x < c.width; x += 10) {
        // top edge
        let idx = (0 * c.width + x) * 4;
        bgR += data[idx]; bgG += data[idx + 1]; bgB += data[idx + 2];
        count++;
        // bottom edge
        idx = ((c.height - 1) * c.width + x) * 4;
        bgR += data[idx]; bgG += data[idx + 1]; bgB += data[idx + 2];
        count++;
      }
      for (let y = 0; y < c.height; y += 10) {
        // left edge
        let idx = (y * c.width + 0) * 4;
        bgR += data[idx]; bgG += data[idx + 1]; bgB += data[idx + 2];
        count++;
        // right edge
        idx = (y * c.width + (c.width - 1)) * 4;
        bgR += data[idx]; bgG += data[idx + 1]; bgB += data[idx + 2];
        count++;
      }

      bgR = bgR / count;
      bgG = bgG / count;
      bgB = bgB / count;

      // Color distance keying
      for (let i = 0; i < len; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const dist = Math.sqrt(
          (r - bgR) ** 2 +
          (g - bgG) ** 2 +
          (b - bgB) ** 2
        );

        if (dist < 28) {
          data[i + 3] = 0; // Transparent
        } else if (dist < 50) {
          const alpha = (dist - 28) / (50 - 28);
          data[i + 3] = Math.round(data[i + 3] * alpha);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      return c.toDataURL('image/png').split(',')[1];
    })()`,
    returnByValue: true
  });

  if (res && res.result && res.result.value) {
    fs.writeFileSync(outputPath, Buffer.from(res.result.value, 'base64'));
    console.log(`Saved transparent PNG: ${outputPath}`);
  } else {
    console.error('Failed to process image:', res);
  }

  ws.close();
  proc.kill();
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (_) {}
}

run();
