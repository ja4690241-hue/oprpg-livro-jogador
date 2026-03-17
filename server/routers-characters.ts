import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { createCharacter, getCharacterById, getUserCharacters, updateCharacter, deleteCharacter, duplicateCharacter } from "./db-characters";
import { TRPCError } from "@trpc/server";

// Validação de personagem
const characterInputSchema = z.object({
  name: z.string().min(1).max(255),
  species: z.enum(["humano", "homem-peixe", "mink", "celestial", "gigante", "anao", "lunariano", "mestico"]),
  combatStyle: z.enum(["lutador", "espadachim", "atirador", "ninja", "ciborgue", "guerrilheiro", "okama-kenpo", "rokushiki", "guerreiro-oni", "carateca-homem-peixe"]),
  profession: z.enum(["cozinheiro", "medico", "navegador", "timoneiro", "carpinteiro", "engenheiro", "musico", "arqueólogo", "adestrador", "combatente", "cacador-recompensas"]).optional(),
  appearance: z.string().optional(),
  personality: z.string().optional(),
  dream: z.string().optional(),
  philosophy: z.string().optional(),
  background: z.string().optional(),
  attributes: z.object({
    forca: z.number().min(1).max(20),
    destreza: z.number().min(1).max(20),
    constituicao: z.number().min(1).max(20),
    sabedoria: z.number().min(1).max(20),
    vontade: z.number().min(1).max(20),
    presenca: z.number().min(1).max(20),
  }),
  skills: z.record(z.string(), z.number().min(0)).optional(),
  proficiencies: z.array(z.string()).optional(),
  maxHealth: z.number().min(1).optional(),
  currentHealth: z.number().min(0).optional(),
  maxPowerPoints: z.number().min(0).optional(),
  currentPowerPoints: z.number().min(0).optional(),
  armorClass: z.number().optional(),
  trainings: z.array(z.string()).optional(),
  masteries: z.array(z.string()).optional(),
  weapons: z.array(z.string()).optional(),
  items: z.array(z.string()).optional(),
  bellys: z.number().min(0).optional(),
  bounty: z.number().min(0).optional(),
  crewName: z.string().optional(),
  crewRole: z.string().optional(),
});

export const charactersRouter = router({
  // Criar novo personagem
  create: protectedProcedure
    .input(characterInputSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const character = await createCharacter(ctx.user.id, {
          name: input.name,
          species: input.species,
          combatStyle: input.combatStyle,
          profession: input.profession,
          appearance: input.appearance,
          personality: input.personality,
          dream: input.dream,
          philosophy: input.philosophy,
          background: input.background,
          attributes: input.attributes,
          skills: input.skills || {},
          proficiencies: input.proficiencies,
          maxHealth: input.maxHealth || 10,
          currentHealth: input.currentHealth || input.maxHealth || 10,
          maxPowerPoints: input.maxPowerPoints || 5,
          currentPowerPoints: input.currentPowerPoints || input.maxPowerPoints || 5,
          armorClass: input.armorClass || 10,
          trainings: input.trainings,
          masteries: input.masteries,
          weapons: input.weapons,
          items: input.items,
          bellys: input.bellys ? input.bellys.toString() : "0",
          bounty: input.bounty ? input.bounty.toString() : "0",
          crewName: input.crewName,
          crewRole: input.crewRole,
        });
        return character;
      } catch (error) {
        console.error("Error creating character:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create character" });
      }
    }),

  // Listar personagens do usuário
  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await getUserCharacters(ctx.user.id);
    } catch (error) {
      console.error("Error listing characters:", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to list characters" });
    }
  }),

  // Obter personagem por ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const character = await getCharacterById(input.id);
        if (!character || character.userId !== ctx.user.id) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Character not found" });
        }
        return character;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Error getting character:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to get character" });
      }
    }),

  // Atualizar personagem
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      data: characterInputSchema.partial(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const character = await getCharacterById(input.id);
        if (!character || character.userId !== ctx.user.id) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Character not found" });
        }

        const updateData: any = { ...input.data };
        if (input.data.bellys !== undefined) {
          updateData.bellys = input.data.bellys.toString();
        }
        if (input.data.bounty !== undefined) {
          updateData.bounty = input.data.bounty.toString();
        }
        return await updateCharacter(input.id, updateData);
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Error updating character:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update character" });
      }
    }),

  // Deletar personagem
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const success = await deleteCharacter(input.id, ctx.user.id);
        if (!success) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Character not found" });
        }
        return { success: true };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Error deleting character:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete character" });
      }
    }),

  // Duplicar personagem
  duplicate: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const original = await getCharacterById(input.id);
        if (!original || original.userId !== ctx.user.id) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Character not found" });
        }

        const newCharacter = await duplicateCharacter(input.id, ctx.user.id);
        if (!newCharacter) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to duplicate character" });
        }
        return newCharacter;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Error duplicating character:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to duplicate character" });
      }
    }),
});
