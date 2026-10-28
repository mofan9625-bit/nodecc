import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.log('[post-build] dist directory does not exist, skipping.');
  process.exit(0);
}

// 1. 同步生成 sitemap.xml 完整单体文件（复制自包含全部 33 条 URL 的 sitemap-0.xml，便于国内外搜索引擎直接抓取全量条目）
const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
const sitemapAliasPath = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(sitemap0Path)) {
  fs.copyFileSync(sitemap0Path, sitemapAliasPath);
  console.log('[post-build] ✔ 成功同步生成包含全量 URL 的 sitemap.xml！');
}

// 2. 补齐所有静态 HTML（含重定向页与独立承接页）的 meta description 标签，彻底消除搜索引擎扫描“缺少元描述”报错
function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const allHtmlFiles = getAllHtmlFiles(distDir);
let fixedMetaCount = 0;
for (const filePath of allHtmlFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes('name="description"') && !content.includes("name='description'")) {
    const defaultDesc = '<meta name="description" content="节点实验室（NodeBench）- 专业网络加速与节点服务综合评测平台。">';
    if (content.includes('</title>')) {
      content = content.replace('</title>', `</title>\n  ${defaultDesc}`);
    } else if (content.includes('<head>')) {
      content = content.replace('<head>', `<head>\n  ${defaultDesc}`);
    } else if (/<!doctype html>/i.test(content)) {
      content = content.replace(/<!doctype html>/i, `<!doctype html><head>${defaultDesc}</head>`);
    }
    fs.writeFileSync(filePath, content, 'utf-8');
    fixedMetaCount++;
  }
}
if (fixedMetaCount > 0) {
  console.log(`[post-build] ✔ 成功为 ${fixedMetaCount} 个重定向或承接 HTML 补齐 meta description 标签！`);
}

// 3. 检测是否为离线打包模式（如生成 dist.zip 供 Windows 本地双击预览）
const isOfflineMode = process.argv.includes('--offline') || process.env.OFFLINE === 'true';

if (!isOfflineMode) {
  console.log('\x1b[32m✔ [post-build] 生产环境规范化构建完成：保持 Astro 原生 Clean URL 与 Canonical 规范路径一致（利于 Google/Bing 权重聚焦与 PageRank 流转）。\x1b[0m');
  console.log('[post-build] 如需生成本地无服务器双击预览的离线包，请执行: npm run build:offline');
  process.exit(0);
}

console.log('[post-build] 检测到 --offline 参数，正在将 HTML 内链与资源转为相对路径...');

function convertHref(rawUrl, prefix, distDir) {
  if (!rawUrl.startsWith('/') || rawUrl.startsWith('//')) {
    return rawUrl;
  }

  const match = rawUrl.match(/^(\/[^?#]*)([?][^#]*)?(#.*)?$/);
  if (!match) return rawUrl;

  let pathPart = match[1] || '/';
  const queryPart = match[2] || '';
  const hashPart = match[3] || '';

  if (pathPart.startsWith('/_astro/')) {
    return `${prefix}_astro/${pathPart.slice(8)}${queryPart}${hashPart}`;
  }
  if (pathPart.startsWith('/images/')) {
    return `${prefix}images/${pathPart.slice(8)}${queryPart}${hashPart}`;
  }
  if (pathPart === '/favicon.svg') return `${prefix}favicon.svg`;
  if (pathPart === '/favicon.ico') return `${prefix}favicon.ico`;
  if (pathPart === '/apple-touch-icon.png') return `${prefix}apple-touch-icon.png`;
  if (pathPart === '/rss.xml') return `${prefix}rss.xml`;
  if (pathPart === '/sitemap-index.xml') return `${prefix}sitemap-index.xml`;
  if (pathPart === '/sitemap.xml') return `${prefix}sitemap.xml`;
  if (pathPart === '/sitemap-0.xml') return `${prefix}sitemap-0.xml`;

  if (pathPart === '' || pathPart === '/') {
    return `${prefix}index.html${queryPart}${hashPart}`;
  }

  const cleanPath = pathPart.replace(/^\/+/, '').replace(/\/+$/, '');
  const dirIndex = path.join(distDir, cleanPath, 'index.html');
  if (fs.existsSync(dirIndex)) {
    return `${prefix}${cleanPath}/index.html${queryPart}${hashPart}`;
  }

  const directFile = path.join(distDir, cleanPath);
  if (fs.existsSync(directFile) && !fs.statSync(directFile).isDirectory()) {
    return `${prefix}${cleanPath}${queryPart}${hashPart}`;
  }

  return `${prefix}${cleanPath}/index.html${queryPart}${hashPart}`;
}

const htmlFiles = getAllHtmlFiles(distDir);
for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const relDir = path.relative(path.dirname(filePath), distDir).replace(/\\/g, '/');
  const prefix = relDir ? (relDir.endsWith('/') ? relDir : relDir + '/') : './';

  content = content.replace(/href=["'](\/[^"']*)["']/g, (fullMatch, url) => {
    const converted = convertHref(url, prefix, distDir);
    return `href="${converted}"`;
  });

  content = content.replace(/src=["'](\/[^"']*)["']/g, (fullMatch, url) => {
    if (url.startsWith('//') || url.startsWith('http://') || url.startsWith('https://')) {
      return fullMatch;
    }
    if (url.startsWith('/_astro/')) {
      return `src="${prefix}_astro/${url.slice(8)}"`;
    }
    if (url.startsWith('/images/')) {
      return `src="${prefix}images/${url.slice(8)}"`;
    }
    return `src="${prefix}${url.replace(/^\/+/, '')}"`;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
}

console.log('[post-build] 离线相对路径转换完成！');
