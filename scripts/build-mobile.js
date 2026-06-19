const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const apiPath = path.join(__dirname, '..', 'src', 'app', 'api');
const hiddenApiPath = path.join(__dirname, '..', 'src', 'app', '_api');
const nextCachePath = path.join(__dirname, '..', '.next');

// 1. Temizleme ve Gizleme
if (fs.existsSync(nextCachePath)) {
  fs.rmSync(nextCachePath, { recursive: true, force: true });
}

let wasRenamed = false;
if (fs.existsSync(apiPath)) {
  fs.renameSync(apiPath, hiddenApiPath);
  wasRenamed = true;
  console.log('✅ API route handlers temporarily hidden for mobile build.');
}

try {
  // 2. Build İşlemi
  console.log('🚀 Running Next.js mobile build...');
  execSync('cross-env MOBILE_BUILD=true next build', { stdio: 'inherit' });
  
  console.log('📄 Creating index.html for Capacitor routing...');
  const outPath = path.join(__dirname, '..', 'out');
  const indexHtmlPath = path.join(outPath, 'index.html');
  const indexHtmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script>
      var lang = navigator.language || navigator.userLanguage || '';
      if (lang.toLowerCase().startsWith('tr')) {
        window.location.replace('/tr/');
      } else {
        window.location.replace('/en/');
      }
    </script>
  </head>
  <body></body>
</html>`;
  if (fs.existsSync(outPath)) {
    fs.writeFileSync(indexHtmlPath, indexHtmlContent);
  }

  console.log('📱 Syncing Capacitor...');
  execSync('cap sync', { stdio: 'inherit' });
} catch (err) {
  console.error('❌ Build failed!');
  process.exitCode = 1;
} finally {
  // 3. Geri Alma (Hata olsa bile kesin çalışır)
  if (wasRenamed && fs.existsSync(hiddenApiPath)) {
    fs.renameSync(hiddenApiPath, apiPath);
    console.log('✅ API route handlers restored.');
  }
}
