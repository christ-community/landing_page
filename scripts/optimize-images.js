const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const outputDir = path.join(publicDir, 'optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image formats to convert
const formats = ['webp', 'avif'];

// Function to convert image to different formats
async function convertImage(inputPath, outputPath, format) {
  try {
    await sharp(inputPath)
      .resize(1920, null, { withoutEnlargement: true }) // Max width 1920px
      .toFormat(format, { quality: 80 })
      .toFile(outputPath);
    
    console.log(`✅ Converted ${path.basename(inputPath)} to ${format}`);
  } catch (error) {
    console.error(`❌ Error converting ${path.basename(inputPath)} to ${format}:`, error.message);
  }
}

// Function to process all images in a directory
async function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(filePath);
    } else if (stat.isFile()) {
      // Check if it's an image file
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const fileName = path.basename(file, ext);
        
        // Convert to different formats
        for (const format of formats) {
          const outputPath = path.join(outputDir, `${fileName}.${format}`);
          await convertImage(filePath, outputPath, format);
        }
      }
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting image optimization...');
  console.log(`📁 Processing images in: ${publicDir}`);
  console.log(`💾 Output directory: ${outputDir}`);
  console.log(`🎯 Target formats: ${formats.join(', ')}`);
  console.log('');
  
  try {
    await processDirectory(publicDir);
    console.log('');
    console.log('🎉 Image optimization completed!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Update your image references to use the optimized versions');
    console.log('2. Consider using Next.js Image component with srcSet for responsive images');
    console.log('3. Test performance improvements in Lighthouse');
  } catch (error) {
    console.error('💥 Error during optimization:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { convertImage, processDirectory };
