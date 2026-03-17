import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Copy, Eye } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function CharactersList() {
  const [, navigate] = useLocation();
  const { data: characters, isLoading } = trpc.characters.list.useQuery();
  const deleteCharacter = trpc.characters.delete.useMutation();
  const duplicateCharacter = trpc.characters.duplicate.useMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar este personagem?")) {
      setDeletingId(id);
      try {
        await deleteCharacter.mutateAsync({ id });
        // Refetch list
        window.location.reload();
      } catch (error) {
        console.error("Error deleting character:", error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const newChar = await duplicateCharacter.mutateAsync({ id });
      if (newChar) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error duplicating character:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.03_240)] text-[oklch(0.92_0.01_240)] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="font-['Cinzel_Decorative'] text-3xl font-bold mb-2">Meus Personagens</h1>
            <p className="text-[oklch(0.55_0.02_240)]">Gerencie suas fichas de personagem</p>
          </div>
          <Button
            onClick={() => navigate("/character-creator")}
            className="gap-2 bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)]"
          >
            <Plus className="w-4 h-4" />
            Novo Personagem
          </Button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-[oklch(0.50_0.02_240)]">Carregando personagens...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!characters || characters.length === 0) && (
          <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-12 text-center">
            <p className="text-[oklch(0.50_0.02_240)] mb-4">Você ainda não criou nenhum personagem.</p>
            <Button
              onClick={() => navigate("/character-creator")}
              className="gap-2 bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)]"
            >
              <Plus className="w-4 h-4" />
              Criar Primeiro Personagem
            </Button>
          </Card>
        )}

        {/* Characters Grid */}
        {!isLoading && characters && characters.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map(character => (
              <Card
                key={character.id}
                className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6 hover:border-[oklch(0.55_0.22_25)] transition-all"
              >
                <div className="mb-4">
                  <h2 className="font-['Cinzel'] text-xl font-bold text-[oklch(0.92_0.01_240)] mb-1">
                    {character.name || "Sem Nome"}
                  </h2>
                  <p className="text-sm text-[oklch(0.55_0.02_240)]">
                    Nível {character.level}
                  </p>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <p>
                    <span className="text-[oklch(0.55_0.22_25)]">Espécie:</span> {character.species}
                  </p>
                  <p>
                    <span className="text-[oklch(0.55_0.22_25)]">Estilo:</span> {character.combatStyle}
                  </p>
                  {character.profession && (
                    <p>
                      <span className="text-[oklch(0.55_0.22_25)]">Profissão:</span> {character.profession}
                    </p>
                  )}
                  <p>
                    <span className="text-[oklch(0.55_0.22_25)]">PV:</span> {character.currentHealth}/{character.maxHealth}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => navigate(`/character/${character.id}`)}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </Button>
                  <Button
                    onClick={() => handleDuplicate(character.id)}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(character.id)}
                    variant="outline"
                    size="sm"
                    className="gap-1 text-[oklch(0.55_0.22_25)] hover:text-[oklch(0.65_0.25_25)]"
                    disabled={deletingId === character.id}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
