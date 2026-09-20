const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPng(width, height, r, g, b) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 2; // Color type: 2 (Truecolor RGB)
  ihdrData[10] = 0; // Compression: 0
  ihdrData[11] = 0; // Filter: 0
  ihdrData[12] = 0; // Interlace: 0
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Scanlines with filter byte 0
  const rowBytes = 1 + width * 3;
  const rawData = Buffer.alloc(rowBytes * height);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      // Border or center mark pattern
      const isBorder = (x < 6 || x >= width - 6 || y < 6 || y >= height - 6);
      const isCenter = Math.abs(x - width/2) < width * 0.25 && Math.abs(y - height/2) < height * 0.25;
      
      if (isCenter) {
        rawData[pxOffset] = 241;     // #F1EFE9 (bg warm neutral)
        rawData[pxOffset + 1] = 239;
        rawData[pxOffset + 2] = 233;
      } else {
        rawData[pxOffset] = r;       // #A15A2B (accent clay)
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc >>> 0, 8 + len);
  return chunk;
}

// CRC32 implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

const outDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Generate Wayfind Accent Clay (#A15A2B: R:161, G:90, B:43)
fs.writeFileSync(path.join(outDir, 'icon-192.png'), createPng(192, 192, 161, 90, 43));
fs.writeFileSync(path.join(outDir, 'icon-512.png'), createPng(512, 512, 161, 90, 43));
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), createPng(180, 180, 161, 90, 43));
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), createPng(32, 32, 161, 90, 43));

console.log('PWA icons created successfully.');
