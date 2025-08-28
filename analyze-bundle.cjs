const fs = require('fs');
const path = require('path');

function analyzeBuildFolder() {
  const buildDir = './build/client';
  
  if (!fs.existsSync(buildDir)) {
    console.log('Build folder not found. Run npm run build first.');
    return;
  }

  console.log('📊 Bundle Analysis Report\n');
  console.log('=' .repeat(50));
  
  const files = fs.readdirSync(path.join(buildDir, 'assets'));
  
  let totalSize = 0;
  const categories = {
    js: [],
    css: [],
    other: []
  };

  files.forEach(file => {
    const filePath = path.join(buildDir, 'assets', file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    totalSize += size;
    
    const ext = path.extname(file);
    const category = ext === '.js' ? 'js' : ext === '.css' ? 'css' : 'other';
    
    categories[category].push({
      name: file,
      size,
      sizeKB: (size / 1024).toFixed(2)
    });
  });

  // Sort by size
  Object.keys(categories).forEach(cat => {
    categories[cat].sort((a, b) => b.size - a.size);
  });

  console.log(`Total Bundle Size: ${(totalSize / 1024).toFixed(2)} KB\n`);

  console.log('🟨 JavaScript Files:');
  categories.js.forEach(file => {
    const bar = '█'.repeat(Math.floor(file.size / totalSize * 30));
    console.log(`${file.sizeKB.padStart(8)} KB │${bar.padEnd(30)}│ ${file.name}`);
  });

  console.log('\n🟦 CSS Files:');
  categories.css.forEach(file => {
    const bar = '█'.repeat(Math.floor(file.size / totalSize * 30));
    console.log(`${file.sizeKB.padStart(8)} KB │${bar.padEnd(30)}│ ${file.name}`);
  });

  if (categories.other.length > 0) {
    console.log('\n🟪 Other Files:');
    categories.other.forEach(file => {
      const bar = '█'.repeat(Math.floor(file.size / totalSize * 30));
      console.log(`${file.sizeKB.padStart(8)} KB │${bar.padEnd(30)}│ ${file.name}`);
    });
  }

  console.log('\n' + '='.repeat(50));
  
  // Performance recommendations
  const largeFiles = [...categories.js, ...categories.css]
    .filter(file => file.size > 100 * 1024); // > 100KB
  
  if (largeFiles.length > 0) {
    console.log('⚠️  Large Files (>100KB):');
    largeFiles.forEach(file => {
      console.log(`   • ${file.name} (${file.sizeKB} KB)`);
    });
  }

  const jsTotal = categories.js.reduce((sum, file) => sum + file.size, 0);
  const cssTotal = categories.css.reduce((sum, file) => sum + file.size, 0);
  
  console.log(`\n📈 Summary:`);
  console.log(`   JavaScript: ${(jsTotal / 1024).toFixed(2)} KB (${((jsTotal / totalSize) * 100).toFixed(1)}%)`);
  console.log(`   CSS: ${(cssTotal / 1024).toFixed(2)} KB (${((cssTotal / totalSize) * 100).toFixed(1)}%)`);
  console.log(`   Other: ${((totalSize - jsTotal - cssTotal) / 1024).toFixed(2)} KB`);
}

analyzeBuildFolder();
