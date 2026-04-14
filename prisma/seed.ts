import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const jobStatuses = ["pending", "interview", "declined"] as const;
const jobModes = ["full-time", "part-time", "internship"] as const;

async function main() {
  console.log("Clearing the database...");
  await prisma.job.deleteMany({});
  console.log("Database cleared.");

  console.log("Seeding 100 jobs...");
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const jobs = Array.from({ length: 100 }, () => {
    const createdAt = faker.date.between({ from: sixMonthsAgo, to: now });
    const updatedAt = faker.date.between({ from: createdAt, to: now });

    return {
      clerkId: "user_3CLKbL3qjerOH0IyovvEQTLUOoS",
      position: faker.person.jobTitle(),
      company: faker.company.name(),
      location: faker.location.city(),
      status: faker.helpers.arrayElement(jobStatuses),
      mode: faker.helpers.arrayElement(jobModes),
      createdAt,
      updatedAt,
    };
  });

  await prisma.job.createMany({
    data: jobs,
  });

  console.log("✅ 100 jobs seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
