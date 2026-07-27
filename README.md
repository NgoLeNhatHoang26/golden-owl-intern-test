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

Lần đầu chạy sẽ tự migrate và seed database (có thể mất vài phút).

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
