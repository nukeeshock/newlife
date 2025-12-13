import { prisma } from "@/lib/db";
import { DashboardClient } from "@/components/admin/dashboard-client";
import { serializeBigInt } from "@/lib/serialize";

export default async function AdminPage() {
  // Fetch all data in parallel via Prisma
  const [archivedProperties, cities, inquiries] = await Promise.all([
    prisma.property.findMany({
      where: { status: "archived" },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.city.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    }),
  ]);

  // Serialize BigInt values (priceVND) for client component
  const serializedArchive = serializeBigInt(archivedProperties);

  // Convert Date objects to ISO strings for client component
  const serializedInquiries = inquiries.map((inquiry) => ({
    ...inquiry,
    createdAt: inquiry.createdAt.toISOString(),
  }));

  return (
    <DashboardClient
      initialArchive={serializedArchive}
      initialCities={cities}
      initialInquiries={serializedInquiries}
    />
  );
}
