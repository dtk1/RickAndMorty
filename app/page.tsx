"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Filters } from "@/components/Filters";
import { CharacterGrid } from "@/components/CharacterGrid";
import { Pagination } from "@/components/Pagination";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useDebounce } from "@/hooks/useDebounce";
import { CharacterFilters, CharacterResponse } from "@/lib/types";

export default function Home() {
  const [characters, setCharacters] = useState<CharacterResponse["results"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<CharacterFilters>({ page: 1 });
  const [pagination, setPagination] = useState<CharacterResponse["info"]>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      name: debouncedSearch || undefined,
      page: 1,
    }));
  }, [debouncedSearch]);

  useEffect(() => {
    fetchCharacters();
  }, [filters]);

  const fetchCharacters = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.name) params.append("name", filters.name);
      if (filters.status) params.append("status", filters.status);
      if (filters.species) params.append("species", filters.species);
      if (filters.gender) params.append("gender", filters.gender);
      if (filters.page) params.append("page", filters.page.toString());

      const response = await fetch(`/api/proxy/character?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }

      const data: CharacterResponse = await response.json();
      setCharacters(data.results || []);
      setPagination(data.info);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacters([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilters: CharacterFilters) => {
    setFilters({ ...newFilters, page: 1 });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Rick and Morty</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6 mb-8">
          <div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <CharacterGrid characters={characters} isLoading={isLoading} />

        {pagination.pages > 1 && !isLoading && (
          <div className="mt-8">
            <Pagination
              currentPage={filters.page || 1}
              totalPages={pagination.pages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
    </div>
  );
}
