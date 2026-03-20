import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding...');

  const stands = [
    {
      code: 'stand-1',
      title: 'Consejo Scout Nacional',
      description: 'Informe del Consejo Scout Nacional',
      questions: [
        {
          text: 'Durante el 2026 el Consejo Scout Nacional logró que Colombia fuera sede del MOOT 2030?',
          order: 0,
          options: [
            { text: 'VERDADERO', isCorrect: true },
            { text: 'FALSO', isCorrect: false },
          ],
        },
      ],
    },
    {
      code: 'stand-2',
      title: 'Comité Nacional',
      description: 'Informe del Comité Nacional',
      questions: [
        {
          text: 'El Comité Nacional aprobó el plan de desarrollo scout 2026-2030?',
          order: 0,
          options: [
            { text: 'VERDADERO', isCorrect: true },
            { text: 'FALSO', isCorrect: false },
          ],
        },
      ],
    },
    {
      code: 'stand-3',
      title: 'Dirección Ejecutiva',
      description: 'Informe de la Dirección Ejecutiva',
      questions: [
        {
          text: 'Colombia tiene más de 60.000 scouts activos en 2026?',
          order: 0,
          options: [
            { text: 'VERDADERO', isCorrect: true },
            { text: 'FALSO', isCorrect: false },
          ],
        },
      ],
    },
  ];

  for (const standData of stands) {
    const stand = await prisma.stand.create({
      data: {
        code: standData.code,
        title: standData.title,
        description: standData.description,
        questions: {
          create: standData.questions.map((q) => ({
            text: q.text,
            order: q.order,
            options: {
              create: q.options,
            },
          })),
        },
      },
    });
    console.log(`Stand creado: ${stand.title}`);
  }

  console.log('seed completo');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });