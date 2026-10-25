import os
import re
import sys
from urllib.parse import urlparse, unquote
sys.stdout.reconfigure(encoding='utf-8')

dist_dir = os.path.abspath('dist')

html_files = []
for root, dirs, files in os.walk(dist_dir):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

print(f"Total HTML files generated in dist: {len(html_files)}")

broken_links = []
checked_links = 0
aff_links = []

for file_path in html_files:
    rel_file = os.path.relpath(file_path, dist_dir)
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()

    # 提取所有 href 属性
    hrefs = re.findall(r'href=["\']([^"\']+)["\']', content)
    for href in hrefs:
        # 忽略外部全路径、mailto、javascript、锚点
        if href.startswith(('http://', 'https://', 'mailto:', 'tel:', 'javascript:', '#', 'data:')):
            continue
        
        checked_links += 1
        # 解析 query 和 path
        parsed = urlparse(href)
        path = unquote(parsed.path)

        if '/go.html' in path or path.startswith('/go'):
            aff_links.append((rel_file, href))

        # 检查对应文件是否存在
        target_path = None
        if path.startswith('/'):
            target_candidate = os.path.join(dist_dir, path.lstrip('/'))
        else:
            current_dir = os.path.dirname(file_path)
            target_candidate = os.path.join(current_dir, path)

        # 尝试匹配路径、路径.html、或者路径/index.html
        if os.path.exists(target_candidate) and not os.path.isdir(target_candidate):
            target_path = target_candidate
        elif os.path.isdir(target_candidate) and os.path.exists(os.path.join(target_candidate, 'index.html')):
            target_path = os.path.join(target_candidate, 'index.html')
        elif os.path.exists(target_candidate + '.html'):
            target_path = target_candidate + '.html'
        elif path == '' and parsed.fragment:
            target_path = file_path

        if not target_path:
            broken_links.append((rel_file, href))

print(f"Checked internal links: {checked_links}")
print(f"Found /go links count: {len(aff_links)}")
print(f"Broken links count: {len(broken_links)}")

if broken_links:
    for src, lk in broken_links[:20]:
        print(f"  [BROKEN] in {src} -> {lk}")
else:
    print("SUCCESS: 0 broken links! All internal routes & /go links are healthy.")
