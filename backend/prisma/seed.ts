// prisma/seed.ts
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
      title: 'El Bosque Primario',
      description: 'Aprende sobre los bosques nativos',
      questions: [
        {
          text: '¿Cuál es el árbol más alto del mundo?',
          order: 0,
          options: [
            { text: 'Sequoia', isCorrect: true },
            { text: 'Pino', isCorrect: false },
            { text: 'Roble', isCorrect: false },
            { text: 'Cedro', isCorrect: false },
          ],
        },
        {
          text: '¿Qué produce la fotosíntesis?',
          order: 1,
          options: [
            { text: 'Oxígeno', isCorrect: true },
            { text: 'Nitrógeno', isCorrect: false },
            { text: 'CO2', isCorrect: false },
            { text: 'Hidrógeno', isCorrect: false },
          ],
        },
        {
          text: '¿Cuántos años puede vivir un árbol milenario?',
          order: 2,
          options: [
            { text: 'Más de 1000 años', isCorrect: true },
            { text: '100 años', isCorrect: false },
            { text: '500 años', isCorrect: false },
            { text: '50 años', isCorrect: false },
          ],
        },
      ],
    },
    {
      code: 'stand-2',
      title: 'La Selva Húmeda',
      description: 'Descubre la biodiversidad tropical',
      questions: [
        {
          text: '¿Qué porcentaje de especies viven en selvas tropicales?',
          order: 0,
          options: [
            { text: 'Más del 50%', isCorrect: true },
            { text: '10%', isCorrect: false },
            { text: '25%', isCorrect: false },
            { text: '5%', isCorrect: false },
          ],
        },
        {
          text: '¿Cuál es el río más grande que atraviesa una selva?',
          order: 1,
          options: [
            { text: 'Amazonas', isCorrect: true },
            { text: 'Nilo', isCorrect: false },
            { text: 'Congo', isCorrect: false },
            { text: 'Orinoco', isCorrect: false },
          ],
        },
        {
          text: '¿Qué animal es símbolo de la selva amazónica?',
          order: 2,
          options: [
            { text: 'Jaguar', isCorrect: true },
            { text: 'León', isCorrect: false },
            { text: 'Tigre', isCorrect: false },
            { text: 'Puma', isCorrect: false },
          ],
        },
      ],
    },
    {
      code: 'stand-3',
      title: 'Los Páramos',
      description: 'Ecosistemas de alta montaña',
      questions: [
        {
          text: '¿A qué altura se encuentran los páramos?',
          order: 0,
          options: [
            { text: 'Entre 3000 y 5000 msnm', isCorrect: true },
            { text: 'A nivel del mar', isCorrect: false },
            { text: 'Entre 500 y 1000 msnm', isCorrect: false },
            { text: 'Más de 6000 msnm', isCorrect: false },
          ],
        },
        {
          text: '¿Qué planta es característica del páramo?',
          order: 1,
          options: [
            { text: 'Frailejón', isCorrect: true },
            { text: 'Cactus', isCorrect: false },
            { text: 'Palmera', isCorrect: false },
            { text: 'Bambú', isCorrect: false },
          ],
        },
        {
          text: '¿Para qué son vitales los páramos?',
          order: 2,
          options: [
            { text: 'Regulación del agua', isCorrect: true },
            { text: 'Producción de petróleo', isCorrect: false },
            { text: 'Minería de oro', isCorrect: false },
            { text: 'Ganadería intensiva', isCorrect: false },
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