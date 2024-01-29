import prisma from "../lib/db";

export async function seed(recordCount = 6) {
  await prisma.comment.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.members.deleteMany({});
  await prisma.project.deleteMany({});

  for (let i = 1; i <= recordCount; i++) {
    const project = await prisma.project.create({
      data: {
        name: `Projekt ${i}`,
        description: `Opis Projektu ${i}`,
        startDate: new Date(),
        endDate: new Date(),
      },
    });

    for (let j = 1; j <= recordCount; j++) {
      const member = await prisma.members.create({
        data: {
          name: `Pracownik ${i}-${j}`,
          projectId: project.id,
        },
      });

      const taskCount = Math.floor(Math.random() * 6) + 1; // 1 to 6 tasks
      for (let k = 1; k <= taskCount; k++) {
        const task = await prisma.task.create({
          data: {
            name: `Zadanie ${i}-${j}-${k}`,
            description: `Opis Zadania ${i}-${j}-${k}`,
            expectTerm: new Date(),
            piority: "normal",
            projectId: project.id,
          },
        });

        const commentText = `Komentarz do Zadania ${i}-${j}-${k}`;
        await prisma.comment.create({
          data: {
            text: commentText,
            taskId: task.id,
          },
        });
      }
    }
  }
}
