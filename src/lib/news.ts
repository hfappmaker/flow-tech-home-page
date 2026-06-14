type MicroCmsContent = {
  id: string;
  title?: string;
  publishedAt?: string;
  createdAt?: string;
  category?: string | { name?: string };
  excerpt?: string;
  body?: string;
};

type MicroCmsResponse = {
  contents?: MicroCmsContent[];
};

export type NewsItem = {
  id: string;
  title: string;
  publishedAt: string;
  displayDate: string;
  category?: string;
  excerpt?: string;
};

export type NewsResult = {
  configured: boolean;
  items: NewsItem[];
};

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;
const endpoint = import.meta.env.MICROCMS_NEWS_ENDPOINT || 'news';

export async function getNews(limit = 3): Promise<NewsResult> {
  if (!serviceDomain || !apiKey) {
    return { configured: false, items: [] };
  }

  const url = new URL(`https://${serviceDomain}.microcms.io/api/v1/${endpoint}`);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('orders', '-publishedAt');
  url.searchParams.set('fields', 'id,title,publishedAt,createdAt,category,excerpt,body');

  try {
    const response = await fetch(url, {
      headers: {
        'X-MICROCMS-API-KEY': apiKey,
      },
    });

    if (!response.ok) {
      return { configured: true, items: [] };
    }

    const data = (await response.json()) as MicroCmsResponse;
    const items = (data.contents || [])
      .filter((item) => item.id && item.title)
      .map((item) => normalizeNewsItem(item));

    return { configured: true, items };
  } catch {
    return { configured: true, items: [] };
  }
}

function normalizeNewsItem(item: MicroCmsContent): NewsItem {
  const publishedAt = item.publishedAt || item.createdAt || new Date().toISOString();
  const category =
    typeof item.category === 'string' ? item.category : item.category?.name || undefined;

  return {
    id: item.id,
    title: item.title || 'お知らせ',
    publishedAt,
    displayDate: new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(publishedAt)),
    category,
    excerpt: item.excerpt || stripHtml(item.body || '').slice(0, 92),
  };
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
