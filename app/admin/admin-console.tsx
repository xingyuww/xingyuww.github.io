'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import styles from './admin.module.css';

type EntryKind = 'video' | 'game-guide' | 'wallpaper' | 'affiliate';
type EntryStatus = 'draft' | 'ready' | 'hidden';

type Entry = {
  id: string;
  kind: EntryKind;
  title: string;
  summary: string;
  url: string;
  inviteCode: string;
  disclosure: string;
  status: EntryStatus;
  updatedAt: string;
};

type EntryForm = Omit<Entry, 'id' | 'updatedAt'>;

const storageKey = 'xingyu-content-admin-v1';

const kindLabels: Record<EntryKind, string> = {
  video: '视频教学',
  'game-guide': '游戏教学',
  wallpaper: '动态壁纸',
  affiliate: '代理服务',
};

const statusLabels: Record<EntryStatus, string> = {
  draft: '草稿',
  ready: '可发布',
  hidden: '已隐藏',
};

const emptyForm: EntryForm = {
  kind: 'video',
  title: '',
  summary: '',
  url: '',
  inviteCode: '',
  disclosure: '',
  status: 'draft',
};

function isEntry(value: unknown): value is Entry {
  if (!value || typeof value !== 'object') return false;
  const entry = value as Partial<Entry>;
  return (
    typeof entry.id === 'string' &&
    ['video', 'game-guide', 'wallpaper', 'affiliate'].includes(entry.kind ?? '') &&
    typeof entry.title === 'string' &&
    typeof entry.summary === 'string' &&
    typeof entry.url === 'string' &&
    typeof entry.inviteCode === 'string' &&
    typeof entry.disclosure === 'string' &&
    ['draft', 'ready', 'hidden'].includes(entry.status ?? '') &&
    typeof entry.updatedAt === 'string'
  );
}

function makeId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function AdminConsole() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState<EntryForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | EntryKind>('all');
  const [loaded, setLoaded] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setEntries(parsed.filter(isEntry));
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setLoaded(true);
    }
  }, []);

  const visibleEntries = useMemo(
    () => entries
      .filter((entry) => filter === 'all' || entry.kind === filter)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [entries, filter],
  );

  const counts = useMemo(() => ({
    total: entries.length,
    ready: entries.filter((entry) => entry.status === 'ready').length,
    draft: entries.filter((entry) => entry.status === 'draft').length,
    affiliate: entries.filter((entry) => entry.kind === 'affiliate').length,
  }), [entries]);

  function persist(next: Entry[]) {
    setEntries(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function updateField<K extends keyof EntryForm>(key: K, value: EntryForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = form.title.trim();
    if (!title) return;

    const now = new Date().toISOString();
    if (editingId) {
      persist(entries.map((entry) => (
        entry.id === editingId
          ? { ...entry, ...form, title, updatedAt: now }
          : entry
      )));
    } else {
      persist([{ id: makeId(), ...form, title, updatedAt: now }, ...entries]);
    }
    resetForm();
  }

  function editEntry(entry: Entry) {
    setEditingId(entry.id);
    setForm({
      kind: entry.kind,
      title: entry.title,
      summary: entry.summary,
      url: entry.url,
      inviteCode: entry.inviteCode,
      disclosure: entry.disclosure,
      status: entry.status,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function removeEntry(entry: Entry) {
    if (!window.confirm(`确定删除“${entry.title}”吗？`)) return;
    persist(entries.filter((item) => item.id !== entry.id));
    if (editingId === entry.id) resetForm();
  }

  function exportData() {
    const file = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = `xingyu-content-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importData(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!Array.isArray(parsed) || !parsed.every(isEntry)) {
        window.alert('文件格式不正确，没有导入任何内容。');
        return;
      }
      if (!window.confirm(`导入后会替换当前的 ${entries.length} 条记录，是否继续？`)) return;
      persist(parsed);
      resetForm();
    } catch {
      window.alert('无法读取这个 JSON 文件。');
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p>PRIVATE CONTENT DESK / 2026</p>
          <h1>内容后台</h1>
        </div>
        <a href="/">返回网站 ↗</a>
      </header>

      <section className={styles.notice}>
        <strong>当前是本地数据版</strong>
        <p>记录只保存在这台设备的当前浏览器中。可以随时导出 JSON 备份；不会修改公开首页，也不会把代理入口自动发布出去。</p>
      </section>

      <section className={styles.metrics} aria-label="内容统计">
        <article><span>全部记录</span><strong>{counts.total}</strong></article>
        <article><span>可发布</span><strong>{counts.ready}</strong></article>
        <article><span>草稿</span><strong>{counts.draft}</strong></article>
        <article><span>代理服务</span><strong>{counts.affiliate}</strong></article>
      </section>

      <section className={styles.workspace}>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.sectionTitle}>
            <span>{editingId ? 'EDIT RECORD' : 'NEW RECORD'}</span>
            <h2>{editingId ? '修改内容' : '新增内容'}</h2>
          </div>

          <label>
            内容类型
            <select value={form.kind} onChange={(event) => updateField('kind', event.target.value as EntryKind)}>
              {Object.entries(kindLabels).map(([value, label]) => (
                <option value={value} key={value}>{label}</option>
              ))}
            </select>
          </label>

          <label>
            标题
            <input
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="填写一个明确的内容名称"
              required
            />
          </label>

          <label>
            简介
            <textarea
              value={form.summary}
              onChange={(event) => updateField('summary', event.target.value)}
              placeholder="说明它是什么、给谁看、解决什么问题"
              rows={4}
            />
          </label>

          <label>
            外部链接
            <input
              value={form.url}
              onChange={(event) => updateField('url', event.target.value)}
              placeholder="https://"
              inputMode="url"
            />
          </label>

          {form.kind === 'affiliate' && (
            <div className={styles.affiliateFields}>
              <label>
                邀请码
                <input
                  value={form.inviteCode}
                  onChange={(event) => updateField('inviteCode', event.target.value)}
                  placeholder="没有时可以留空"
                />
              </label>
              <label>
                佣金与第三方说明
                <textarea
                  value={form.disclosure}
                  onChange={(event) => updateField('disclosure', event.target.value)}
                  placeholder="例如：服务由第三方提供，我可能从推广中获得佣金。"
                  rows={3}
                />
              </label>
              <p>这里只填写公开推广链接和邀请码，不要保存账号密码、验证码、付款凭据或客户资料。</p>
            </div>
          )}

          <label>
            状态
            <select value={form.status} onChange={(event) => updateField('status', event.target.value as EntryStatus)}>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option value={value} key={value}>{label}</option>
              ))}
            </select>
          </label>

          <div className={styles.formActions}>
            <button type="submit">{editingId ? '保存修改' : '添加记录'}</button>
            {editingId && <button type="button" onClick={resetForm}>取消</button>}
          </div>
        </form>

        <div className={styles.records}>
          <div className={styles.recordsHeader}>
            <div>
              <span>CONTENT RECORDS</span>
              <h2>内容记录</h2>
            </div>
            <div className={styles.dataActions}>
              <button type="button" onClick={exportData} disabled={!entries.length}>导出 JSON</button>
              <button type="button" onClick={() => importRef.current?.click()}>导入 JSON</button>
              <input ref={importRef} type="file" accept=".json,application/json" onChange={importData} hidden />
            </div>
          </div>

          <div className={styles.filters} aria-label="筛选内容">
            <button className={filter === 'all' ? styles.activeFilter : ''} onClick={() => setFilter('all')} type="button">全部</button>
            {Object.entries(kindLabels).map(([value, label]) => (
              <button
                className={filter === value ? styles.activeFilter : ''}
                onClick={() => setFilter(value as EntryKind)}
                type="button"
                key={value}
              >
                {label}
              </button>
            ))}
          </div>

          {!loaded ? (
            <p className={styles.empty}>正在读取本地记录…</p>
          ) : visibleEntries.length === 0 ? (
            <div className={styles.empty}>
              <strong>还没有记录</strong>
              <p>从左侧添加第一条内容，或者导入之前导出的 JSON 文件。</p>
            </div>
          ) : (
            <div className={styles.recordList}>
              {visibleEntries.map((entry) => (
                <article className={styles.recordCard} key={entry.id}>
                  <div className={styles.recordMeta}>
                    <span>{kindLabels[entry.kind]}</span>
                    <i data-status={entry.status}>{statusLabels[entry.status]}</i>
                  </div>
                  <h3>{entry.title}</h3>
                  {entry.summary && <p>{entry.summary}</p>}
                  {entry.kind === 'affiliate' && entry.inviteCode && (
                    <code>邀请码：{entry.inviteCode}</code>
                  )}
                  <div className={styles.recordActions}>
                    <button type="button" onClick={() => editEntry(entry)}>编辑</button>
                    <button type="button" onClick={() => removeEntry(entry)}>删除</button>
                    {entry.url && (
                      <a href={entry.url} target="_blank" rel="noopener noreferrer nofollow sponsored">
                        检查链接 ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
