// /api/messages —— GET 拉取留言列表，POST 发布新留言
import { ensureSchema, ipHash, json, cleanText } from './_lib.js';

export async function onRequestGet(context) {
  const { env } = context;
  if (!env.DB) return json({ error: '留言板还没配置数据库（站长操作见 README）' }, 503);
  await ensureSchema(env.DB);
  const { results } = await env.DB
    .prepare('SELECT id, name, content, created_at FROM messages ORDER BY created_at DESC, id DESC LIMIT 100')
    .all();
  return json({ messages: results });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.DB) return json({ error: '留言板还没配置数据库（站长操作见 README）' }, 503);
  await ensureSchema(env.DB);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: '请求格式不对' }, 400);
  }

  // 蜜罐字段：正常用户看不到也填不到，机器人会填——直接假装成功丢弃
  if (typeof body.website === 'string' && body.website.length > 0) {
    return json({ ok: true });
  }

  const name = cleanText(body.name, 16) || '匿名小伙伴';
  const content = cleanText(body.content, 500, true);
  if (!content) return json({ error: '留言内容不能为空' }, 400);

  // 限流：同一 IP 一小时最多 3 条
  const ip = await ipHash(request);
  const now = Date.now();
  const rate = await env.DB
    .prepare('SELECT COUNT(*) AS n FROM messages WHERE ip_hash = ? AND created_at > ?')
    .bind(ip, now - 60 * 60 * 1000)
    .first();
  if (rate.n >= 3) return json({ error: '留言太频繁啦，一小时后再试试 🌱' }, 429);

  const res = await env.DB
    .prepare('INSERT INTO messages (name, content, ip_hash, created_at) VALUES (?, ?, ?, ?)')
    .bind(name, content, ip, now)
    .run();

  return json(
    { ok: true, message: { id: res.meta.last_row_id, name, content, created_at: now } },
    201
  );
}
