"use client";

import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

/**
 * Skeleton для карточки персонажа
 */
export function CharacterCardSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <Skeleton className="w-full aspect-square rounded-t-lg" />
      <div className="p-4 space-y-3 flex-1 border border-border rounded-b-lg bg-card">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="pt-2">
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton для сетки персонажей
 */
export function CharacterGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton для поисковой строки
 */
export function SearchBarSkeleton() {
  return <Skeleton className="h-10 w-full rounded-md" />;
}

/**
 * Skeleton для фильтров
 */
export function FiltersSkeleton() {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex-1 min-w-[200px] space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton для пагинации
 */
export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Skeleton className="h-10 w-10 rounded-md" />
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-md" />
        ))}
      </div>
      <Skeleton className="h-10 w-10 rounded-md" />
    </div>
  );
}

/**
 * Skeleton для детальной страницы персонажа
 */
export function CharacterDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Skeleton className="w-full aspect-square rounded-lg" />
        <div className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-8 w-full rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Skeleton для AI описания
 */
export function AiDescriptionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="ml-4 space-y-2 mt-4">
        <div className="flex items-start gap-2">
          <Skeleton className="h-2 w-2 rounded-full mt-2" />
          <Skeleton className="h-4 flex-1" />
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="h-2 w-2 rounded-full mt-2" />
          <Skeleton className="h-4 flex-1" />
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="h-2 w-2 rounded-full mt-2" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mt-4" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

/**
 * Компонент для плавного появления контента
 */
export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      className="animate-in fade-in duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
