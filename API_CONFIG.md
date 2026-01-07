# Конфигурация API

## Главный файл конфигурации

Все настройки API находятся в одном месте: **`src/jsonApiConfig.js`**

### Как изменить URL API:

1. Откройте файл `src/jsonApiConfig.js`
2. Измените значение `baseUrl` на нужное:

```javascript
// Для локальной разработки:
const baseUrl = 'http://localhost:3001';

// Для продакшена:
const baseUrl = 'https://json-api.alazarstudio.ru';
```

## Использование в компонентах

Импортируйте конфиг в ваш компонент:

```javascript
import jsonApiConfig from '../../../jsonApiConfig';

// Использование:
fetch(`${jsonApiConfig.api}/cases`)  // API запросы
fetch(`${jsonApiConfig.uploads}/image.webp`)  // Загруженные файлы
```

## Структура конфига

```javascript
jsonApiConfig = {
  base: 'http://localhost:3001',           // Базовый URL
  api: 'http://localhost:3001/api',        // API endpoints
  uploads: 'http://localhost:3001/uploads' // Загруженные файлы
}
```

## Компоненты использующие jsonApiConfig

- ✅ `HomePage.jsx`
- ✅ `AllCasesPage.jsx`
- ✅ `CasesMUI.jsx` (админка)
- ✅ `DevelopersMUI.jsx` (админка)
- ✅ `CategoriesMUI.jsx` (админка)
- ✅ `CaseModal.jsx`
- ✅ `CaseHomeCard.jsx`
- ✅ `jsonStore.js`

## Устаревшие файлы (не используйте!)

- ❌ `src/serverConfig.js` - старый конфиг
- ❌ `src/uploadsConfig.js` - старый конфиг

Эти файлы остались для совместимости со старой админкой.

