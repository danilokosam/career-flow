import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const TEST_USER_CLERK_ID = process.env.TEST_USER_CLERK_ID;

if (!TEST_USER_CLERK_ID) {
  throw new Error("TEST_USER_CLERK_ID env variable is required to run the seed.");
}

const clerkId: string = TEST_USER_CLERK_ID;

const jobStatuses = ["pending", "interview", "declined"] as const;
const jobModes = ["full-time", "part-time", "internship"] as const;

const isProduction = process.env.NODE_ENV === "production";

async function main() {
  if (isProduction) {
    console.log("⚠️  Production mode: skipping deleteMany, only inserting new jobs.");
  } else {
    console.log("Clearing the database...");
    await prisma.job.deleteMany({});
    console.log("Database cleared.");
  }

  console.log("Seeding 100 jobs...");
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const jobs = Array.from({ length: 100 }, () => {
    const createdAt = faker.date.between({ from: sixMonthsAgo, to: now });
    const updatedAt = faker.date.between({ from: createdAt, to: now });

    return {
      clerkId,
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
