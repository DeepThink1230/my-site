// 共享工具库。下划线开头的文件不会变成路由，只被其他接口引用。

// 注意：D1 的 exec 按行拆分语句，每条 SQL 必须写成单行
const SCHEMA_STATEMENTS = [
  'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, content TEXT NOT NULL, ip_hash TEXT, created_at INTEGER NOT NULL)',
  'CREATE INDEX IF NOT EXISTS idx_msg_time ON messages(created_at)',
  'CREATE INDEX IF NOT EXISTS idx_msg_ip ON messages(ip_hash, created_at)',
];

// 数据库表只需建一次；每个隔离实例内缓存标记，避免重复执行
let schemaReady = false;
export async function ensureSchema(db) {
  if (schemaReady) return;
  for (const sql of SCHEMA_STATEMENTS) {
    await db.exec(sql);
  }
  schemaReady = true;
}

// 只存 IP 的哈希，不存明文，保护留言者隐私
export async function ipHash(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const data = new TextEncoder().encode('gb-salt-v1-' + ip);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

// 清洗用户输入：去掉控制字符、限长。content 允许保留换行
export function cleanText(s, maxLen, keepNewlines = false) {
  if (typeof s !== 'string') return '';
  const pattern = keepNewlines ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]+/g : /[\u0000-\u001f\u007f]+/g;
  return s.replace(pattern, ' ').trim().slice(0, maxLen);
}
