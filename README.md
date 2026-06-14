# 株式会社FlowTech ホームページ

Astro で実装した `https://flowtech.co.jp` 向けの会社ホームページです。

## 開発

```sh
npm install
npm run dev
```

## microCMS

お知らせ欄は microCMS のリスト API から取得します。`.env.example` を参考に `.env` または Vercel の環境変数へ設定してください。

```sh
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
MICROCMS_NEWS_ENDPOINT=news
```

想定フィールドは `title`, `publishedAt`, `category`, `excerpt`, `body` です。未設定でもビルドは通り、「現在掲載中のお知らせはありません。」を表示します。

## Vercel

ビルドコマンドは `npm run build`、出力先は `dist` です。

Vercel CLI を使う場合:

```sh
npm i -g vercel
vercel link
vercel env pull
vercel --prod
```
