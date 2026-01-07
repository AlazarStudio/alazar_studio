import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import sharp from 'sharp';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Путь к папке с JSON файлами
const DATA_DIR = path.join(__dirname, 'data');
// Путь к папке с загруженными файлами
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Убеждаемся, что папки существуют (синхронно, чтобы быть готовыми до использования multer)
try {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
    console.log('Папка data создана');
  }
  if (!existsSync(UPLOADS_DIR)) {
    mkdirSync(UPLOADS_DIR, { recursive: true });
    console.log('Папка uploads создана');
  }
  console.log('Папки data и uploads готовы');
} catch (error) {
  console.error('Ошибка при создании папок:', error);
}

// Настройка multer для загрузки файлов (временное хранилище)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB лимит (до конвертации)
  fileFilter: (req, file, cb) => {
    // Проверяем, что это изображение
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Разрешены только изображения!'), false);
    }
  }
});

// Статическая раздача файлов из папки uploads
app.use('/uploads', express.static(UPLOADS_DIR));

// Вспомогательная функция для чтения JSON файла
async function readJsonFile(entityName) {
  const filePath = path.join(DATA_DIR, `${entityName}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Файл не существует, возвращаем пустой массив
      return [];
    }
    throw error;
  }
}

// Вспомогательная функция для записи JSON файла
async function writeJsonFile(entityName, data) {
  const filePath = path.join(DATA_DIR, `${entityName}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Универсальный роутер для CRUD операций
function createEntityRouter(entityName) {
  const router = express.Router();

  // GET /api/:entity - получить все записи
  router.get('/', async (req, res) => {
    try {
      const data = await readJsonFile(entityName);
      res.json(data);
    } catch (error) {
      console.error(`Ошибка при получении ${entityName}:`, error);
      res.status(500).json({ error: `Ошибка при получении ${entityName}` });
    }
  });

  // GET /api/:entity/:id - получить запись по ID
  router.get('/:id', async (req, res) => {
    try {
      const data = await readJsonFile(entityName);
      const id = parseInt(req.params.id);
      const item = data.find((item) => item.id === id);
      
      if (!item) {
        return res.status(404).json({ error: `${entityName} с id ${id} не найден` });
      }
      
      res.json(item);
    } catch (error) {
      console.error(`Ошибка при получении ${entityName} по ID:`, error);
      res.status(500).json({ error: `Ошибка при получении ${entityName}` });
    }
  });

  // POST /api/:entity - создать новую запись
  router.post('/', async (req, res) => {
    try {
      const data = await readJsonFile(entityName);
      const newItem = req.body;
      
      // Генерируем ID если его нет
      if (!newItem.id) {
        const maxId = data.length ? Math.max(...data.map((item) => item.id || 0)) : 0;
        newItem.id = maxId + 1;
      }
      
      data.push(newItem);
      await writeJsonFile(entityName, data);
      
      res.status(201).json(newItem);
    } catch (error) {
      console.error(`Ошибка при создании ${entityName}:`, error);
      res.status(500).json({ error: `Ошибка при создании ${entityName}` });
    }
  });

  // PUT /api/:entity/:id - обновить запись
  router.put('/:id', async (req, res) => {
    try {
      const data = await readJsonFile(entityName);
      const id = parseInt(req.params.id);
      const index = data.findIndex((item) => item.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: `${entityName} с id ${id} не найден` });
      }
      
      data[index] = { ...data[index], ...req.body, id };
      await writeJsonFile(entityName, data);
      
      res.json(data[index]);
    } catch (error) {
      console.error(`Ошибка при обновлении ${entityName}:`, error);
      res.status(500).json({ error: `Ошибка при обновлении ${entityName}` });
    }
  });

  // PATCH /api/:entity/:id - частичное обновление записи
  router.patch('/:id', async (req, res) => {
    try {
      const data = await readJsonFile(entityName);
      const id = parseInt(req.params.id);
      const index = data.findIndex((item) => item.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: `${entityName} с id ${id} не найден` });
      }
      
      data[index] = { ...data[index], ...req.body, id };
      await writeJsonFile(entityName, data);
      
      res.json(data[index]);
    } catch (error) {
      console.error(`Ошибка при обновлении ${entityName}:`, error);
      res.status(500).json({ error: `Ошибка при обновлении ${entityName}` });
    }
  });

  // DELETE /api/:entity/:id - удалить запись
  router.delete('/:id', async (req, res) => {
    try {
      const data = await readJsonFile(entityName);
      const id = parseInt(req.params.id);
      const filtered = data.filter((item) => item.id !== id);
      
      if (filtered.length === data.length) {
        return res.status(404).json({ error: `${entityName} с id ${id} не найден` });
      }
      
      await writeJsonFile(entityName, filtered);
      res.status(204).send();
    } catch (error) {
      console.error(`Ошибка при удалении ${entityName}:`, error);
      res.status(500).json({ error: `Ошибка при удалении ${entityName}` });
    }
  });

  return router;
}

// Регистрируем роуты для всех сущностей
const entities = ['categories', 'developers', 'cases', 'discussions', 'shops'];

entities.forEach((entity) => {
  app.use(`/api/${entity}`, createEntityRouter(entity));
});

// Endpoint для загрузки изображений
app.post('/api/upload', (req, res, next) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error('Ошибка multer:', err);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'Файл слишком большой. Максимальный размер: 50MB' });
        }
        return res.status(400).json({ error: 'Ошибка при загрузке файла', details: err.message });
      }
      return res.status(400).json({ error: err.message || 'Ошибка при загрузке файла' });
    }
    
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Файл не был загружен' });
      }
      
      // Генерируем уникальное имя файла
      const uniqueFilename = `${randomUUID()}.webp`;
      const outputPath = path.join(UPLOADS_DIR, uniqueFilename);
      
      // Конвертируем изображение в WebP
      await sharp(req.file.buffer)
        .webp({ quality: 85 }) // Качество 85% для баланса между размером и качеством
        .toFile(outputPath);
      
      console.log('Изображение конвертировано и сохранено:', uniqueFilename);
      
      // Возвращаем имя файла, которое будет сохранено в JSON
      res.json({ 
        filename: uniqueFilename,
        path: `/uploads/${uniqueFilename}`
      });
    } catch (error) {
      console.error('Ошибка при обработке загруженного файла:', error);
      res.status(500).json({ error: 'Ошибка при обработке файла', details: error.message });
    }
  });
});


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'JSON API Server is running' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`JSON API Server запущен на порту ${PORT}`);
  console.log(`API доступен по адресу: http://localhost:${PORT}/api`);
});

