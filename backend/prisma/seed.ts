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
      title: 'El Lago de la Seguridad',
      description: 'Prioridad 1 y 2',
      questions: [
        { text: 'Tener protocolos escritos es suficiente para garantizar una cultura organizacional segura.', order: 0 },
        { text: 'Que cada miembro sepa cómo actuar ante un riesgo es un elemento clave de una cultura organizacional segura.', order: 1 },
        { text: 'Contar con un comité de seguridad hace innecesaria la participación activa de los demás miembros.', order: 2 },
        { text: 'Las capacitaciones anuales son el único mecanismo necesario para mantener la seguridad en una organización.', order: 3 },
        { text: 'El reconocimiento y la visibilidad son factores que contribuyen a retener a un voluntario comprometido.', order: 4 },
        { text: 'La formación continua y el crecimiento personal no tienen impacto en la retención de voluntarios.', order: 5 },
        { text: 'La flexibilidad para conciliar el voluntariado con la vida personal es irrelevante para el compromiso del voluntario.', order: 6 },
        { text: 'El sentido de pertenencia y propósito es uno de los factores más críticos para retener a un voluntario comprometido.', order: 7 },
      ],
    },
    {
      code: 'stand-2',
      title: 'Gobernanza y Organización Influyente',
      description: 'Prioridad 3 y 4',
      questions: [
        { text: 'Una organización que toma decisiones rápidas es necesariamente una organización adecuada a su propósito.', order: 0 },
        { text: 'La transparencia y la sostenibilidad financiera son características de una organización adecuada a su propósito.', order: 1 },
        { text: 'Tener muchos niveles de control garantiza que una organización esté alineada con su misión.', order: 2 },
        { text: 'Ejecutar el 100% del presupuesto no es por sí solo indicador de que una organización cumple su propósito.', order: 3 },
        { text: 'El tamaño y reconocimiento del aliado es lo que hace que una alianza estratégica sea realmente poderosa.', order: 4 },
        { text: 'El beneficio económico que genera una alianza es su único valor real para la organización.', order: 5 },
        { text: 'Una alianza estratégica es más poderosa cuando genera impacto compartido en los jóvenes y la comunidad.', order: 6 },
        { text: 'La facilidad de gestión y operación es el criterio más importante al evaluar una alianza estratégica.', order: 7 },
      ],
    },
    {
      code: 'stand-3',
      title: 'Fortalecimiento de Regiones',
      description: 'Prioridad 5',
      questions: [
        { text: 'Aumentar el presupuesto asignado es el primer paso para fortalecer una región scout débil.', order: 0 },
        { text: 'Enviar líderes nacionales a apoyar una región garantiza su fortalecimiento a largo plazo.', order: 1 },
        { text: 'Identificar y desarrollar liderazgo local es el primer paso más efectivo para fortalecer una región scout débil.', order: 2 },
        { text: 'Crear más grupos scouts en el territorio es suficiente para fortalecer una región que tiene dificultades.', order: 3 },
      ],
    },
  ]

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
              create: [
                { text: 'VERDADERO', isCorrect: true },
                { text: 'FALSO', isCorrect: false },
              ],
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