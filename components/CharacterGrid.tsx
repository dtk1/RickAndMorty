"use client";

import { Character } from "@/lib/types";
import { CharacterCard } from "./CharacterCard";
import { CharacterGridSkeleton } from "./LoadingStates";

interface CharacterGridProps {
  characters: Character[];
  isLoading?: boolean;
}

export function CharacterGrid({ characters, isLoading }: CharacterGridProps) {
  if (isLoading) {
    return <CharacterGridSkeleton />;
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          Персонажи не найдены
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {characters.map((character, index) => (
        <div
          key={character.id}
          className="animate-in fade-in slide-in"
          style={{
            animationDelay: `${Math.min(index * 50, 500)}ms`,
            animationFillMode: "both",
          }}
        >
          <CharacterCard character={character} />
        </div>
      ))}
    </div>
  );
}
