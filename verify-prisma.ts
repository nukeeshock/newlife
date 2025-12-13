
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        // Just try to count properties to see if connection works
        const count = await prisma.property.count();
        console.log(`Success! Found ${count} properties.`);

        // Also check if we can query the Admin table
        const adminCount = await prisma.admin.count();
        console.log(`Success! Found ${adminCount} admins.`);

        // Check one enum usage check (often an issue)
        const availableProps = await prisma.property.count({
            where: {
                status: 'available'
            }
        });
        console.log(`Success! Found ${availableProps} available properties.`);


    } catch (e) {
        console.error('Error connecting to database:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
