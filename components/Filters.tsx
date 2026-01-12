"use client";

import { CharacterFilters } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  filters: CharacterFilters;
  onFilterChange: (filters: CharacterFilters) => void;
}

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const handleStatusChange = (status: string) => {
    onFilterChange({
      ...filters,
      status: status === "all" ? undefined : (status as CharacterFilters["status"]),
    });
  };

  const handleGenderChange = (gender: string) => {
    onFilterChange({
      ...filters,
      gender: gender === "all" ? undefined : (gender as CharacterFilters["gender"]),
    });
  };

  const handleSpeciesChange = (species: string) => {
    onFilterChange({
      ...filters,
      species: species === "all" ? undefined : species,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      name: filters.name,
      page: filters.page,
    });
  };

  const hasActiveFilters =
    filters.status || filters.gender || filters.species;

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <label className="text-sm font-medium mb-2 block">Статус</label>
        <Select
          value={filters.status || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Все статусы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="Alive">Жив</SelectItem>
            <SelectItem value="Dead">Мертв</SelectItem>
            <SelectItem value="unknown">Неизвестно</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="text-sm font-medium mb-2 block">Пол</label>
        <Select
          value={filters.gender || "all"}
          onValueChange={handleGenderChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Все полы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все полы</SelectItem>
            <SelectItem value="Male">Мужской</SelectItem>
            <SelectItem value="Female">Женский</SelectItem>
            <SelectItem value="Genderless">Бесполый</SelectItem>
            <SelectItem value="unknown">Неизвестно</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="text-sm font-medium mb-2 block">Вид</label>
        <Select
          value={filters.species || "all"}
          onValueChange={handleSpeciesChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Все виды" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все виды</SelectItem>
            <SelectItem value="Human">Человек</SelectItem>
            <SelectItem value="Alien">Инопланетянин</SelectItem>
            <SelectItem value="Humanoid">Гуманоид</SelectItem>
            <SelectItem value="Robot">Робот</SelectItem>
            <SelectItem value="Animal">Животное</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters}>
          Сбросить фильтры
        </Button>
      )}
    </div>
  );
}
