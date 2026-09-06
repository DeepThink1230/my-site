// 日期格式化等通用小工具
const zhCN = 'zh-CN';

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(zhCN, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatShort(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

// 按月分组的 key，例如 "2026年9月"
export function monthKey(date: Date): string {
  return new Intl.DateTimeFormat(zhCN, { year: 'numeric', month: 'long' }).format(date);
}

// 按月份分组（保持传入顺序，调用前先按日期倒序排好）
export function groupByMonth<T>(items: T[], getDate: (item: T) => Date): [string, T[]][] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = monthKey(getDate(item));
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }
  return [...map.entries()];
}
