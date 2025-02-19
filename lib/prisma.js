import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();
// to query 

// if we were to use this new prisma client to query our db every time there is hot reloading i.e it prefetches our app it
// will create a brand new prisma app we dont want that.

if(process.env.NODE_ENV !== 'production'){
    globalThis.prisma = db
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.