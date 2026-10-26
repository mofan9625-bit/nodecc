import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');
const publicDir = path.resolve(projectRoot, 'public');

// 1. 站点基础信息配置
const HOST = 'nodebench.cc';
const BASE_URL = `https://${HOST}`;
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';

// 2. 动态读取 32 位十六进制 IndexNow 密钥
function getIndexNowKey() {
  const publicFiles = fs.readdirSync(publicDir);
  const keyFile = publicFiles.find((f) => /^[a-f0-9]{32}\.txt$/i.test(f));
  if (keyFile) {
    const key = keyFile.replace(/\.txt$/i, '');
    return {
      key,
      keyLocation: `${BASE_URL}/${keyFile}`,
    };
  }
  // 备用默认密钥
  const defaultKey = 'dfca911326fcb2ed9f5797a0779a8158';
  return {
    key: defaultKey,
    keyLocation: `${BASE_URL}/${defaultKey}.txt`,
  };
}

// 3. 从生成的站点地图中解析全部 URL
function getUrlsFromSitemap() {
  const sitemapPaths = [
    path.join(distDir, 'sitemap-0.xml'),
    path.join(distDir, 'sitemap-index.xml'),
    path.join(publicDir, 'sitemap.xml'),
  ];

  for (const sitemapPath of sitemapPaths) {
    if (fs.existsSync(sitemapPath)) {
      const content = fs.readFileSync(sitemapPath, 'utf-8');
      const matches = content.match(/<loc>(https:\/\/nodebench\.cc\/[^<]*)<\/loc>/g);
      if (matches && matches.length > 0) {
        const urls = matches.map((m) => m.replace(/<\/?loc>/g, '').trim());
        // 过滤排除 sitemap 自身文件以及 /go 重定向承接页
        const filtered = urls.filter((u) => !u.endsWith('.xml') && !u.includes('/go'));
        if (filtered.length > 0) {
          return Array.from(new Set(filtered));
        }
      }
    }
  }

  // 备选方案：如果找不到 xml sitemap，直接从 dist HTML 目录中提取
  if (fs.existsSync(distDir)) {
    function scanHtmlUrls(dir, baseRoute = '') {
      let urls = [];
      const list = fs.readdirSync(dir);
      for (const item of list) {
        const full = path.join(dir, item);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          urls = urls.concat(scanHtmlUrls(full, `${baseRoute}/${item}`));
        } else if (item === 'index.html') {
          urls.push(baseRoute ? `${BASE_URL}${baseRoute}/` : `${BASE_URL}/`);
        }
      }
      return urls;
    }
    const htmlUrls = scanHtmlUrls(distDir);
    if (htmlUrls.length > 0) {
      return Array.from(new Set(htmlUrls));
    }
  }

  // 默认保底首页 URL
  return [`${BASE_URL}/`];
}

async function submitToIndexNow(payload) {
  console.log(`[IndexNow] 正在向 ${INDEXNOW_API} 提交 ${payload.urlList.length} 个 URL...`);
  console.log(`[IndexNow] Host: ${payload.host}`);
  console.log(`[IndexNow] Key: ${payload.key}`);
  console.log(`[IndexNow] KeyLocation: ${payload.keyLocation}`);

  try {
    const response = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'nodebench-indexnow-submitter/1.0',
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const text = await response.text();

    if (status === 200 || status === 202) {
      console.log(`\x1b[32m✔ [IndexNow] 推送成功！HTTP 状态码: ${status} (${response.statusText || 'Accepted'})\x1b[0m`);
      console.log(`[IndexNow] 搜索引擎已受理该批次 URL，正在后台校验密钥并排队抓取。`);
      return true;
    } else if (status === 403) {
      console.warn(`\x1b[33m⚠ [IndexNow] 响应状态: HTTP 403 (Forbidden)\x1b[0m`);
      console.warn(`[IndexNow] 原因说明: IndexNow 验证服务会尝试请求 ${payload.keyLocation} 校验密钥。`);
      console.warn(`[IndexNow] 若当前站点尚未正式上线部署或 DNS 暂未解析，该报错属于正常现象。`);
      console.warn(`[IndexNow] 一旦将 build 生成的 dist 部署上线，IndexNow 成功拉取到 key 文件后即会自动验证通过并受理！`);
      return false;
    } else {
      console.warn(`\x1b[33m⚠ [IndexNow] 提交返回非成功状态: HTTP ${status} - ${response.statusText}\x1b[0m`);
      if (text) console.warn(`[IndexNow] 详情: ${text}`);
      return false;
    }
  } catch (err) {
    console.warn(`\x1b[33m⚠ [IndexNow] 请求异常 (可能处于离线或网络受限环境): ${err.message}\x1b[0m`);
    return false;
  }
}

async function main() {
  const { key, keyLocation } = getIndexNowKey();

  // 支持通过命令行传参推送单个或指定 URL：node scripts/indexnow-submit.mjs https://nodebench.cc/
  const cliUrls = process.argv.slice(2).filter((arg) => arg.startsWith('http'));
  const urlList = cliUrls.length > 0 ? cliUrls : getUrlsFromSitemap();

  const payload = {
    host: HOST,
    key,
    keyLocation,
    urlList,
  };

  await submitToIndexNow(payload);
}

main();
