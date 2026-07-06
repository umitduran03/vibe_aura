const fs = require('fs');
const path = require('path');

const files = [
  'src/app/[lang]/soulmate-radar/page.tsx',
  'src/app/[lang]/ai-roast-me/page.tsx',
  'src/app/[lang]/aura-battle/page.tsx',
  'src/app/[lang]/bff-vibe-check/page.tsx',
  'src/app/[lang]/crush-calculator/page.tsx',
  'src/app/[lang]/duo-compatibility/page.tsx',
  'src/app/[lang]/ex-compatibility/page.tsx'
];

for (const file of files) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove "use client";
  content = content.replace(/"use client";\r?\n\r?\n?/g, '');
  
  // 2. Remove useParams import
  content = content.replace(/import\s*\{\s*useParams\s*\}\s*from\s*["']next\/navigation["'];\r?\n/g, '');
  
  // 3. Remove framer-motion import
  content = content.replace(/import\s*\{\s*motion[^}]*\}\s*from\s*["']framer-motion["'];\r?\n/g, '');
  
  // 4. Update component signature
  content = content.replace(/export default function\s+([A-Za-z0-9_]+)\s*\(\)\s*\{/g, 'export default async function $1({ params }: { params: Promise<{ lang: string }> }) {');
  
  // 5. Replace params extraction
  // Replace: const params = useParams();
  content = content.replace(/const params = useParams\(\);\s*\r?\n/g, 'const { lang } = await params;\n  ');
  // Remove: const lang = (params?.lang as string) ?? "en";
  content = content.replace(/const lang = \(params\?\.lang as string\) \?\? ["']en["'];\s*\r?\n/g, '');
  // Replace: const isTr = params?.lang === "tr";
  content = content.replace(/const isTr = params\?\.lang === ["']tr["'];/g, 'const isTr = lang === "tr";');
  
  // 6. Convert motion.div and motion.p to div and p
  content = content.replace(/<motion\.div/g, '<div');
  content = content.replace(/<\/motion\.div>/g, '</div>');
  content = content.replace(/<motion\.p/g, '<p');
  content = content.replace(/<\/motion\.p>/g, '</p>');
  content = content.replace(/<motion\.span/g, '<span');
  content = content.replace(/<\/motion\.span>/g, '</span>');
  
  // 7. Remove motion props
  // Matches initial={{ ... }}, animate={{ ... }}, etc.
  content = content.replace(/\s*(?:initial|animate|whileInView|viewport|transition)=\{\{[^}]*\}\}/g, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${file}`);
}
