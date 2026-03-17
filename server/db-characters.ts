import { eq, and } from "drizzle-orm";
import { characters, CharacterDB, InsertCharacter } from "../drizzle/schema";
import { getDb } from "./db";
import { nanoid } from "nanoid";

export async function createCharacter(userId: number, data: Omit<InsertCharacter, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = nanoid();
  const character: InsertCharacter = {
    id,
    userId,
    ...data,
  };

  await db.insert(characters).values(character);
  return getCharacterById(id);
}

export async function getCharacterById(id: string): Promise<CharacterDB | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(characters)
    .where(eq(characters.id, id))
    .limit(1);

  return result[0];
}

export async function getUserCharacters(userId: number): Promise<CharacterDB[]> {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(characters)
    .where(eq(characters.userId, userId));
}

export async function updateCharacter(id: string, data: Partial<Omit<InsertCharacter, 'id' | 'userId' | 'createdAt'>>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(characters)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(characters.id, id));

  return getCharacterById(id);
}

export async function deleteCharacter(id: string, userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db
      .delete(characters)
      .where(and(eq(characters.id, id), eq(characters.userId, userId)));
    return true;
  } catch {
    return false;
  }
}

export async function duplicateCharacter(id: string, userId: number): Promise<CharacterDB | undefined> {
  const original = await getCharacterById(id);
  if (!original || original.userId !== userId) return undefined;

  const { id: _, userId: __, createdAt, updatedAt, ...data } = original;
  return createCharacter(userId, data as any);
}
