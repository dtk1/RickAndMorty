"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Character } from "@/lib/types";
import { getStatusColor } from "@/lib/utils";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/character/${character.id}`}>
      <Card className="group hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {character.name}
          </h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${getStatusColor(character.status)}`}
              />
              <span>{character.status}</span>
            </div>
            <p className="line-clamp-1">{character.species}</p>
            <p className="line-clamp-1">{character.location.name}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-xs text-muted-foreground">
            {character.episode.length} эпизод{character.episode.length !== 1 ? "ов" : ""}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
