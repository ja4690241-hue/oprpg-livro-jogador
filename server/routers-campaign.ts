import { z } from "zod";
import { router, publicProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { quests, sessionLogs, islands } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

export const campaignRouter = router({
  // Quests
  getQuests: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return await db.select().from(quests).orderBy(desc(quests.createdAt));
  }),

  createQuest: publicProcedure
    .input(z.object({
      title: z.string(),
      description: z.string().optional(),
      rewardXp: z.number().default(0),
      rewardBellys: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const id = nanoid();
      await db.insert(quests).values({ id, ...input });
      return { id };
    }),

  updateQuestStatus: publicProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(["ativa", "concluida", "fracassada"]),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      await db.update(quests).set({ status: input.status }).where(eq(quests.id, input.id));
      return { success: true };
    }),

  // Session Logs
  getLogs: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return await db.select().from(sessionLogs).orderBy(desc(sessionLogs.sessionNumber));
  }),

  createLog: publicProcedure
    .input(z.object({
      sessionNumber: z.number(),
      title: z.string().optional(),
      content: z.string(),
      islandName: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const id = nanoid();
      await db.insert(sessionLogs).values({ id, ...input });
      return { id };
    }),

  // Islands
  getIslands: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return await db.select().from(islands).orderBy(desc(islands.createdAt));
  }),
});
