# Rick and Morty - Fullstack приложение

Fullstack приложение на Next.js (App Router) с TypeScript и Tailwind CSS для изучения персонажей из мультсериала Rick and Morty.

## Технологии

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn UI** компоненты
- **next-themes** для поддержки темной/светлой темы
- **Rick and Morty API** (через прокси-сервер)

## Особенности

### Архитектура API (Level 2)
- Все запросы к внешнему API проходят через серверные роуты `/app/api/proxy/[...path]/route.ts`
- Фронтенд не обращается напрямую к `rickandmortyapi.com`

### UI (Level 1)
- Главная страница с поиском и фильтрацией персонажей
- Компоненты Shadcn UI (Card, Input, Button, Skeleton)
- Сетка карточек персонажей с индикаторами статуса (Alive, Dead, Unknown)
- Адаптивный дизайн

### Навигация (Level 2)
- Детальные страницы для персонажей (`/character/[id]`)
- Функциональная пагинация с поддержкой большого количества страниц

### Бонусный уровень
- Поддержка темной и светлой темы (next-themes)
- Skeleton loaders для состояния загрузки
- AI эндпоинт `/api/ai-description` с мок-данными (готов для интеграции с OpenAI/Gemini)

## Структура проекта

```
├── app/
│   ├── api/
│   │   ├── proxy/[...path]/route.ts    # Прокси для Rick and Morty API
│   │   └── ai-description/route.ts     # AI эндпоинт (мок)
│   ├── character/[id]/page.tsx         # Детальная страница персонажа
│   ├── layout.tsx                      # Корневой layout с ThemeProvider
│   ├── page.tsx                        # Главная страница
│   └── globals.css                     # Глобальные стили и CSS переменные
├── components/
│   ├── ui/                             # Shadcn UI компоненты
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── skeleton.tsx
│   ├── CharacterCard.tsx               # Карточка персонажа
│   ├── CharacterGrid.tsx               # Сетка персонажей
│   ├── Filters.tsx                     # Компонент фильтров
│   ├── Pagination.tsx                  # Компонент пагинации
│   ├── SearchBar.tsx                   # Поисковая строка
│   ├── ThemeProvider.tsx               # Провайдер темы
│   └── ThemeToggle.tsx                 # Переключатель темы
├── hooks/
│   └── useDebounce.ts                  # Хук для debounce поиска
└── lib/
    ├── types.ts                        # TypeScript типы
    └── utils.ts                        # Утилиты (cn, getStatusColor)
```

## Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Запустите dev сервер:
```bash
npm run dev
```

3. Откройте [http://localhost:3000](http://localhost:3000) в браузере

## Скрипты

- `npm run dev` - Запуск dev сервера
- `npm run build` - Сборка production версии
- `npm run start` - Запуск production сервера
- `npm run lint` - Проверка кода линтером

## Использование

### Главная страница
- Используйте поисковую строку для поиска персонажей по имени
- Применяйте фильтры по статусу, полу и виду
- Переключайтесь между страницами с помощью пагинации
- Переключайте тему с помощью иконки в правом верхнем углу

### Детальная страница персонажа
- Нажмите на карточку персонажа для просмотра детальной информации
- Просмотрите AI анализ персонажа (мок-данные)
- Изучите список эпизодов с участием персонажа

## API Endpoints

### Прокси API
- `GET /api/proxy/character` - Получить список персонажей
- `GET /api/proxy/character/[id]` - Получить персонажа по ID

### AI API
- `POST /api/ai-description` - Получить AI описание персонажа
  - Body: `{ "characterName": "Rick Sanchez" }`
  - Response: `{ "characterName": "...", "description": "...", "analysis": {...} }`

## Интеграция с AI

Эндпоинт `/api/ai-description` подготовлен для интеграции с OpenAI или Gemini API. В данный момент используются мок-данные. Для интеграции:

1. Добавьте API ключ в переменные окружения
2. Замените мок-логику в `app/api/ai-description/route.ts` на реальный вызов API
3. Обновите типы ответа при необходимости

## Лицензия

MIT
