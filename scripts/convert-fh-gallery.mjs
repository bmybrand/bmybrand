import sharp from 'sharp';

const files = [
  'public/bmyb-case-fountain-hills-gallery-01.svg',
  'public/bmyb-case-fountain-hills-gallery-02.svg',
  'public/bmyb-case-fountain-hills-gallery-03.svg',
];

const quality = 82;

async function convert() {
  for (const file of files) {
    try {
      const out = file.replace(/\.[^.]+$/, '.webp');
      await sharp(file).webp({ quality }).toFile(out);
      console.log(`OK ${file} -> ${out}`);
    } catch (err) {
      console.error('FAIL', file, err);
    }
  }
}

convert();
