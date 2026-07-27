import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Prisma } from '../generated/prisma/client';
import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });
const CSV_PATH = path.join(__dirname, 'data', 'diem_thi_thpt_2024.csv');
const BATCH_SIZE = 2000;

function parseFloatOrNull(value: string): number | null {
  const trimmed = value.trim();
  return trimmed === '' ? null : parseFloat(trimmed);
}

async function main() {
  const stream = fs.createReadStream(CSV_PATH);
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let batch: Prisma.StudentCreateManyInput[] = [];
  let isHeader = true;
  let total = 0;

  for await (const line of rl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }

    const [
      sbd,
      toan,
      ngu_van,
      ngoai_ngu,
      vat_li,
      hoa_hoc,
      sinh_hoc,
      lich_su,
      dia_li,
      gdcd,
      ma_ngoai_ngu,
    ] = line.split(',');

    batch.push({
      registrationNumber: sbd,
      math: parseFloatOrNull(toan),
      literature: parseFloatOrNull(ngu_van),
      foreignLanguage: parseFloatOrNull(ngoai_ngu),
      physics: parseFloatOrNull(vat_li),
      chemistry: parseFloatOrNull(hoa_hoc),
      biology: parseFloatOrNull(sinh_hoc),
      history: parseFloatOrNull(lich_su),
      geography: parseFloatOrNull(dia_li),
      civicEducation: parseFloatOrNull(gdcd),
      foreignLanguageCode: ma_ngoai_ngu?.trim() || null,
    });

    if (batch.length >= BATCH_SIZE) {
      await prisma.student.createMany({ data: batch, skipDuplicates: true });
      total += batch.length;
      console.log(`Seeded ${total} students...`);
      batch = [];
    }
  }

  if (batch.length > 0) {
    await prisma.student.createMany({ data: batch, skipDuplicates: true });
    total += batch.length;
  }

  console.log(`Done. Total seeded: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
