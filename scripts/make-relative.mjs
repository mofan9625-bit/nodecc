import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.log('[make-relative] dist directory does not exist, skipping.');
  process.exit(0);
}

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

function convertHref(rawUrl, prefix, distDir) {
  // 忽略外部链接、锚点、邮件、电话或非绝对根路径链接
  if (!rawUrl.startsWith('/') || rawUrl.startsWith('//')) {
    return rawUrl;
  }

  // 提取路径部分、查询参数、锚点
  const match = rawUrl.match(/^(\/[^?#]*)([?][^#]*)?(#.*)?$/);
  if (!match) return rawUrl;

  let pathPart = match[1] || '/';
  const queryPart = match[2] || '';
  const hashPart = match[3] || '';

  // 1. 静态与特殊资源
  if (pathPart.startsWith('/_astro/')) {
    return `${prefix}_astro/${pathPart.slice(8)}${queryPart}${hashPart}`;
  }
  if (pathPart.startsWith('/images/')) {
    return `${prefix}images/${pathPart.slice(8)}${queryPart}${hashPart}`;
  }
  if (pathPart === '/favicon.svg') {
    return `${prefix}favicon.svg`;
  }
  if (pathPart === '/rss.xml') {
    return `${prefix}rss.xml`;
  }
  if (pathPart === '/sitemap-index.xml') {
    return `${prefix}sitemap-index.xml`;
  }
  if (pathPart === '/sitemap.xml') {
    return `${prefix}sitemap.xml`;
  }
  if (pathPart === '/sitemap-0.xml') {
    return `${prefix}sitemap-0.xml`;
  }

  // 2. 首页与带锚点/参数的首页
  if (pathPart === '' || pathPart === '/') {
    return `${prefix}index.html${queryPart}${hashPart}`;
  }

  // 3. 特殊路由映射
  if (pathPart === '/speedtest' || pathPart === '/speedtest/') {
    return `${prefix}speedtest-reports/index.html`;
  }
  if (pathPart === '/matrix' || pathPart === '/matrix/' || pathPart === '/comparison' || pathPart === '/comparison/') {
    return `${prefix}comparison-matrix/index.html`;
  }

  // 4. 清理路径首尾斜杠 (如 "/tools" -> "tools", "/reviews/dalaoyun-review/" -> "reviews/dalaoyun-review")
  const cleanPath = pathPart.replace(/^\/+/, '').replace(/\/+$/, '');

  // 5. 优先检测目录 index.html
  const dirIndex = path.join(distDir, cleanPath, 'index.html');
  if (fs.existsSync(dirIndex)) {
    return `${prefix}${cleanPath}/index.html${queryPart}${hashPart}`;
  }

  // 6. 检测直接文件 (如 /robots.txt 等)
  const directFile = path.join(distDir, cleanPath);
  if (fs.existsSync(directFile) && !fs.statSync(directFile).isDirectory()) {
    return `${prefix}${cleanPath}${queryPart}${hashPart}`;
  }

  // 7. 默认补全 index.html
  return `${prefix}${cleanPath}/index.html${queryPart}${hashPart}`;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`[make-relative] Processing ${htmlFiles.length} HTML files...`);

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const relDir = path.relative(path.dirname(filePath), distDir).replace(/\\/g, '/');
  const prefix = relDir ? (relDir.endsWith('/') ? relDir : relDir + '/') : './';

  // 替换所有 href 绝对根路径为相对路径 (支持 /tools#clash, /#comparison-matrix 等所有模式)
  content = content.replace(/href=["'](\/[^"']*)["']/g, (fullMatch, url) => {
    const converted = convertHref(url, prefix, distDir);
    return `href="${converted}"`;
  });

  // 替换所有 src 绝对根路径为相对路径
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

// 同步生成 sitemap.xml 完整单体文件（复制自包含全部 33 条 URL 的 sitemap-0.xml，便于搜索引擎直接抓取到完整条目）
const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
const sitemapAliasPath = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(sitemap0Path)) {
  fs.copyFileSync(sitemap0Path, sitemapAliasPath);
  console.log('[make-relative] Successfully created sitemap.xml containing all URLs from sitemap-0.xml');
}

console.log('[make-relative] Successfully converted all asset and navigation links to relative paths!');

