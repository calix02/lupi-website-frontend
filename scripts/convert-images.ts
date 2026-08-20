import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = path.resolve("src/assets/gallery");
const outputDir = path.resolve("src/assets/gallery/webp");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();

  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    continue;
  }

  const inputPath = path.join(inputDir, file);

  const outputName = path.basename(file, ext) + ".webp";

  const outputPath = path.join(outputDir, outputName);

  await sharp(inputPath)
    .resize({
      width: 1600,
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
    })
    .toFile(outputPath);

  console.log(`✓ ${file} → ${outputName}`);
}

console.log("Image conversion complete!");
