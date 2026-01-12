"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Character } from "@/lib/types";
import { getStatusColor } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export default function CharacterPage() {
  const params = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCharacter();
    }
  }, [params.id]);

  const fetchCharacter = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/proxy/character/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch character");
      }
      const data: Character = await response.json();
      setCharacter(data);
      
      // Загружаем AI описание
      fetchAiDescription(data.name);
    } catch (error) {
      console.error("Error fetching character:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAiDescription = async (characterName: string) => {
    setIsLoadingAi(true);
    try {
      const response = await fetch("/api/ai-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ characterName }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiDescription(data.description);
      }
    } catch (error) {
      console.error("Error fetching AI description:", error);
    } finally {
      setIsLoadingAi(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <ThemeToggle />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Skeleton className="w-full aspect-square rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Персонаж не найден</h1>
          <Button onClick={() => router.push("/")}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{character.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`w-3 h-3 rounded-full ${getStatusColor(character.status)}`}
                  />
                  <span className="text-lg">{character.status}</span>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Вид:</span>
                    <p className="font-medium">{character.species}</p>
                  </div>
                  {character.type && (
                    <div>
                      <span className="text-sm text-muted-foreground">Тип:</span>
                      <p className="font-medium">{character.type}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-muted-foreground">Пол:</span>
                    <p className="font-medium">{character.gender}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Происхождение:</span>
                    <p className="font-medium">{character.origin.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Местоположение:</span>
                    <p className="font-medium">{character.location.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Эпизодов:</span>
                    <p className="font-medium">{character.episode.length}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {aiDescription && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>AI Анализ</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingAi ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ) : (
                  <p className="text-muted-foreground">{aiDescription}</p>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Эпизоды</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {character.episode.map((episodeUrl) => {
                  const episodeId = episodeUrl.split("/").pop();
                  return (
                    <Link
                      key={episodeUrl}
                      href={episodeUrl.replace(
                        "https://rickandmortyapi.com/api",
                        "/api/proxy"
                      )}
                      className="text-sm text-primary hover:underline"
                    >
                      Эпизод {episodeId}
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
