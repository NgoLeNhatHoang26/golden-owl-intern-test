# Golden Owl Intern Test

## Yêu cầu

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Chạy project

```bash
docker compose up -d --build
```

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3000 |

Lần đầu chạy, seed data thủ công (chỉ 1 lần):

```bash
docker compose exec backend npx prisma db seed
```

## Lệnh hữu ích

```bash
docker compose logs -f backend   # xem log
docker compose down              # dừng
docker compose down -v           # dừng và xóa data
docker compose up -d --build     # rebuild sau khi sửa code
```

## Chỉ chạy database (dev local)

```bash
docker compose up postgres -d
```

Backend: `npm install` → `npx prisma generate` → `npx prisma migrate deploy` → `npx prisma db seed` → `npm run start:dev`

Frontend: `npm install` → `npm run dev`

## Deploy (Vercel + Render)

### Render (Backend + PostgreSQL)

1. Push code lên GitHub
2. Render Dashboard → **New Blueprint** → chọn repo → dùng `render.yaml`
3. Set env `FRONTEND_URL` = URL Vercel (sau khi deploy FE)
4. Shell (1 lần): `npx prisma db seed`

### Vercel (Frontend)

1. Import repo → Root Directory: `frontend`
2. Set env `VITE_API_URL` = URL backend Render (vd: `https://golden-owl-api.onrender.com`)
3. Deploy

