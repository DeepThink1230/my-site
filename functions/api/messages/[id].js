// /api/messages/:id —— DELETE 删除留言（仅站长，需 X-Admin-Key 头）
import { ensureSchema, json } from '../_lib.js';

export async function onRequestDelete(context) {
  const { request, env, params } = context;
  if (!env.DB) return json({ error: '服务未配置' }, 503);
  if (!env.ADMIN_KEY) return json({ error: '站长还未设置管理密码（ADMIN_KEY）' }, 503);

  const key = request.headers.get('X-Admin-Key') || '';
  if (key !== env.ADMIN_KEY) return json({ error: '管理密码不对' }, 401);

  await ensureSchema(env.DB);
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) return json({ error: 'id 不对' }, 400);

  const res = await env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(id).run();
  if (!res.meta.changes) return json({ error: '这条留言不存在' }, 404);
  return json({ ok: true });
}
