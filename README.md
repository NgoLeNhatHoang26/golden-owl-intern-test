# Golden Owl Intern Test

**Demo:** [https://golden-owl-intern.vercel.app/search](https://golden-owl-intern.vercel.app/search)

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

### Kiến trúc

```
Vercel (Frontend)  →  Render Web Service (Backend)  →  Render PostgreSQL
```

| Thành phần | Platform | File cấu hình |
| --- | --- | --- |
| Frontend | [Vercel](https://vercel.com) | `frontend/vercel.json` |
| Backend API | [Render](https://render.com) | `render.yaml` |
| Database | Render PostgreSQL | `render.yaml` |

### Thứ tự deploy

```
1. Render: PostgreSQL + Backend
2. Vercel: Frontend
3. Render: set FRONTEND_URL = URL Vercel
4. Seed database (1 lần)
```

### Bước 1 — Render (Backend + PostgreSQL)

1. Push code lên GitHub
2. Render Dashboard → **New Blueprint** → chọn repo → dùng `render.yaml`
3. Sau khi deploy, copy URL backend (vd: `https://golden-owl-api.onrender.com`)

**Biến môi trường (Web Service):**

| Key | Value |
| --- | --- |
| `DATABASE_URL` | **Internal Database URL** (Render tự gán từ Blueprint) |
| `FRONTEND_URL` | URL Vercel — set sau bước 2 (vd: `https://golden-owl-intern.vercel.app`) |

> `DATABASE_URL` trên Render **không dùng** `localhost:5435`. Phải là Internal URL từ PostgreSQL trên Render.

### Bước 2 — Vercel (Frontend)

1. Import repo → **Root Directory:** `frontend`
2. Thêm biến môi trường:

| Key | Value |
| --- | --- |
| `VITE_API_URL` | URL backend Render (vd: `https://golden-owl-api.onrender.com`) |

3. Deploy

> `VITE_API_URL` được embed lúc build — đổi URL backend phải **Redeploy** frontend.

### Bước 3 — Cập nhật CORS

Quay lại Render → Web Service → Environment → set `FRONTEND_URL` = URL Vercel → Save (tự redeploy).

### Bước 4 — Seed database (1 lần)

Chạy từ máy local, dùng **External Database URL** từ Render (có `?sslmode=require`):

```powershell
cd backend
npm install

$env:DATABASE_URL = "postgresql://USER:PASS@dpg-xxxxx.render.com/dbname?sslmode=require"

npx prisma migrate deploy
npx prisma db seed
```

Seed xong **không cần deploy lại** — data đã nằm trong PostgreSQL trên Render.

### Lưu ý

- **Internal URL** — backend trên Render kết nối DB
- **External URL** — seed/migrate từ máy local
- Render Free tier: backend sleep sau ~15 phút không dùng, request đầu có thể chậm ~30s

