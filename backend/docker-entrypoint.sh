#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy

if [ "${SEED_ON_START:-false}" = "true" ]; then
  echo "Seeding database..."
  npx prisma db seed
else
  echo "Skipping database seed (SEED_ON_START=${SEED_ON_START:-false})"
fi

echo "Starting backend..."
exec node --import tsx dist/src/main.js
