import prisma from "@/app/libs/prismadb";

export default async function getUsers() {
    try {
        // Busca todos los usuarios
        const users = await prisma.user.findMany();

        // Transforma la lista de usuarios, si es necesario
        return users.map(user => ({
            ...user,
            createdAt: user.createdAt.toString(),
            updatedAt: user.updatedAt.toString(),
            emailVerified: user.emailVerified?.toString() || null,
        }));

    } catch (error: any) {
        throw new Error(error);
    }
}