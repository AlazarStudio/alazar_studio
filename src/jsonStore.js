// JSON-хранилище для админки через API бэкенда.
// Бэкенд работает с JSON файлами в server/data/

import axios from 'axios';
import jsonApiConfig from './jsonApiConfig';

// Базовый URL для локального JSON API сервера
const JSON_API_URL = jsonApiConfig.api;

/**
 * Загружает данные сущности из API
 * @param {string} entityName - имя сущности (categories, developers, cases, etc.)
 * @returns {Promise<Array>} массив объектов
 */
export const loadEntity = async (entityName) => {
  try {
    const response = await axios.get(`${JSON_API_URL}/${entityName}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(`Ошибка загрузки ${entityName}:`, error);
    return [];
  }
};

/**
 * Сохраняет данные сущности через API (создает новую запись)
 * @param {string} entityName - имя сущности
 * @param {Array} data - массив объектов для сохранения
 */
export const saveEntity = async (entityName, data) => {
  try {
    // Для массового сохранения нужно удалить все и создать заново
    // Или использовать отдельный endpoint для массового обновления
    // Пока просто возвращаем данные
    return data;
  } catch (error) {
    console.error(`Ошибка сохранения ${entityName}:`, error);
    throw error;
  }
};

/**
 * Добавляет или обновляет элемент в сущности
 * @param {string} entityName - имя сущности
 * @param {Object} item - объект для добавления/обновления (должен иметь поле id)
 * @returns {Promise<Object>} сохранённый элемент
 */
export const upsert = async (entityName, item) => {
  try {
    if (item.id) {
      // Обновляем существующую запись
      const response = await axios.put(`${JSON_API_URL}/${entityName}/${item.id}`, item);
      return response.data;
    } else {
      // Создаем новую запись
      const response = await axios.post(`${JSON_API_URL}/${entityName}`, item);
      return response.data;
    }
  } catch (error) {
    console.error(`Ошибка при upsert ${entityName}:`, error);
    throw error;
  }
};

/**
 * Удаляет элемент по id
 * @param {string} entityName - имя сущности
 * @param {number|string} id - id элемента для удаления
 */
export const remove = async (entityName, id) => {
  try {
    await axios.delete(`${JSON_API_URL}/${entityName}/${id}`);
  } catch (error) {
    console.error(`Ошибка при удалении ${entityName}:`, error);
    throw error;
  }
};

/**
 * Получает элемент по id
 * @param {string} entityName - имя сущности
 * @param {number|string} id - id элемента
 * @returns {Promise<Object|null>} найденный элемент или null
 */
export const getById = async (entityName, id) => {
  try {
    const response = await axios.get(`${JSON_API_URL}/${entityName}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error(`Ошибка при получении ${entityName} по ID:`, error);
    return null;
  }
};
