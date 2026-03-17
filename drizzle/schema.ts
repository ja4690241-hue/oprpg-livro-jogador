import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// OPRPG Character Table
export const characters = mysqlTable("characters", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("userId").notNull(),
  
  // Basic Info
  name: varchar("name", { length: 255 }).notNull(),
  level: int("level").default(1).notNull(),
  experiencePoints: int("experiencePoints").default(0).notNull(),
  
  // Character Details
  species: mysqlEnum("species", ["humano", "homem-peixe", "mink", "celestial", "gigante", "anao", "lunariano", "mestico"]).notNull(),
  combatStyle: mysqlEnum("combatStyle", ["lutador", "espadachim", "atirador", "ninja", "ciborgue", "guerrilheiro", "okama-kenpo", "rokushiki", "guerreiro-oni", "carateca-homem-peixe"]).notNull(),
  profession: mysqlEnum("profession", ["cozinheiro", "medico", "navegador", "timoneiro", "carpinteiro", "engenheiro", "musico", "arqueólogo", "adestrador", "combatente", "cacador-recompensas"]),
  
  appearance: text("appearance"),
  personality: text("personality"),
  dream: text("dream"),
  philosophy: text("philosophy"),
  background: text("background"),
  
  // Attributes (JSON)
  attributes: json("attributes").notNull(),
  
  // Skills (JSON)
  skills: json("skills").notNull(),
  proficiencies: json("proficiencies"),
  
  // Health & Power
  maxHealth: int("maxHealth").default(10).notNull(),
  currentHealth: int("currentHealth").default(10).notNull(),
  maxPowerPoints: int("maxPowerPoints").default(5).notNull(),
  currentPowerPoints: int("currentPowerPoints").default(5).notNull(),
  exhaustionLevel: int("exhaustionLevel").default(0).notNull(),
  
  // Combat
  armorClass: int("armorClass").default(10).notNull(),
  proficiencyBonus: int("proficiencyBonus").default(2).notNull(),
  
  // Haki
  haki: json("haki"),
  ambitionPoints: int("ambitionPoints").default(0).notNull(),
  maxAmbitionPoints: int("maxAmbitionPoints").default(0).notNull(),
  
  // Akuma no Mi
  akumaNoMi: json("akumaNoMi"),
  
  // Equipment
  weapons: json("weapons"),
  armor: varchar("armor", { length: 255 }),
  items: json("items"),
  bellys: decimal("bellys", { precision: 15, scale: 0 }).default("0").notNull(),
  
  // Trainings & Masteries
  trainings: json("trainings"),
  masteries: json("masteries"),
  
  // Bounty
  bounty: decimal("bounty", { precision: 15, scale: 0 }).default("0").notNull(),
  
  // Crew
  crewName: varchar("crewName", { length: 255 }),
  crewRole: varchar("crewRole", { length: 255 }),
  
  // Metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CharacterDB = typeof characters.$inferSelect;
export type InsertCharacter = typeof characters.$inferInsert;