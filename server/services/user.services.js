import { prisma } from "../db.js";

function findUserByEmail(email) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
}
export {findUserByEmail}