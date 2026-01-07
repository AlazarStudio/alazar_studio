// ===== ГЛАВНЫЙ КОНФИГ API =====
// Измените baseUrl здесь для переключения между локальным и продакшн сервером
// Локальный: 'http://localhost:3001'
// Продакшн: 'https://json-api.alazarstudio.ru' (или другой URL)

function jsonApiConfig() {
  // Локальный сервер для разработки
  const baseUrl = 'http://localhost:3001';
  const apiUrl = `${baseUrl}/api`;
  const uploadsUrl = `${baseUrl}/uploads`;
  
  // Для продакшена раскомментируйте и укажите URL:
  // const baseUrl = 'https://json-api.alazarstudio.ru';
  // const apiUrl = `${baseUrl}/api`;
  // const uploadsUrl = `${baseUrl}/uploads`;
  
  return {
    base: baseUrl,
    api: apiUrl,
    uploads: uploadsUrl,
  };
}

export default jsonApiConfig();

