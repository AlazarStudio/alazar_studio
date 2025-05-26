import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import serverConfig from '../../../../serverConfig';
import uploadsConfig from '../../../../uploadsConfig';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const quillModules = {
  toolbar: [
    [{ font: [] }], // шрифт
    [{ size: ['small', false, 'large', 'huge'] }], // размер шрифта
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const quillFormats = [
  'font',
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'bullet',
  'align',
  'blockquote',
  'code-block',
  'link',
  'image',
  'video',
];

const CaseFormDialog = ({
  open,
  onClose,
  onSave,
  item,
  allCategories,
  allDevelopers,
}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');
  const [positionTop, setPositionTop] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);
  const [developerIds, setDeveloperIds] = useState([]);
  const [preview, setPreview] = useState(null); // новый файл preview
  const [previewName, setPreviewName] = useState(''); // существующее имя preview
  const [files, setFiles] = useState([]); // изображения
  const [taskDescription, setTaskDescription] = useState('');
  const [clientDescription, srtClientDescription] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const [contentBlocks, setContentBlocks] = useState([]);

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setPrice(item.price || '');
      setLink(item.link || '');
      setDate(item.date || '');
      setPositionTop(item.positionTop || '');
      setCategoryIds(item.categoryIds || []);
      setDeveloperIds(item.developerIds || []);
      setPreview(null);
      setPreviewName(item.preview || '');
      setFiles([]);
      setTaskDescription(item.taskDescription || '');
      srtClientDescription(item.clientDescription || '');
      setServiceDescription(item.serviceDescription || '');
    } else {
      setTitle('');
      setPrice('');
      setLink('');
      setDate('');
      setPositionTop('');
      setCategoryIds([]);
      setDeveloperIds([]);
      setPreview(null);
      setPreviewName('');
      setFiles([]);
      setTaskDescription('');
      srtClientDescription('');
      setServiceDescription('');
    }
  }, [item]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('link', link);
    formData.append('date', date);
    formData.append('positionTop', positionTop);
    formData.append('categoryIds', JSON.stringify(categoryIds));
    formData.append('developerIds', JSON.stringify(developerIds));
    formData.append('taskDescription', taskDescription);
    formData.append('clientDescription', clientDescription);
    formData.append('serviceDescription', serviceDescription);

    // 🔁 contentBlocks
    formData.append(
      'blocks',
      JSON.stringify(
        contentBlocks.map((b) => ({
          type: b.type,
          value:
            b.type === 'text'
              ? b.value
              : `block-${Math.random().toString(36).slice(2)}`,
        }))
      )
    );

    contentBlocks.forEach((b) => {
      if (b.type === 'image' && b.value instanceof File) {
        formData.append('blockImages', b.value);
      }
    });

    if (preview) {
      formData.append('preview', preview);
    }
    files.forEach((f) => formData.append('images', f));

    const url = item
      ? `${serverConfig}/cases/${item.id}`
      : `${serverConfig}/cases`;

    const method = item ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error('Ошибка при сохранении кейса');

      onSave();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{item ? 'Редактировать кейс' : 'Добавить кейс'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Цена"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Ссылка на сайт"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Дата"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="№ в топе"
          type="number"
          value={positionTop}
          onChange={(e) => setPositionTop(e.target.value)}
          margin="normal"
        />

        <InputLabel sx={{ mt: 2 }}>Категории</InputLabel>
        <Select
          multiple
          fullWidth
          value={categoryIds}
          onChange={(e) => setCategoryIds(e.target.value)}
          input={<OutlinedInput />}
          renderValue={(selected) =>
            selected
              .map((id) => {
                const cat = allCategories.find((c) => c.id === id);
                return cat ? cat.name : id;
              })
              .join(', ')
          }
        >
          {allCategories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              <Checkbox checked={categoryIds.includes(cat.id)} />
              <ListItemText primary={cat.name} />
            </MenuItem>
          ))}
        </Select>

        <InputLabel sx={{ mt: 2 }}>Разработчики</InputLabel>
        <Select
          multiple
          fullWidth
          value={developerIds}
          onChange={(e) => setDeveloperIds(e.target.value)}
          input={<OutlinedInput />}
          renderValue={(selected) =>
            selected
              .map((id) => {
                const dev = allDevelopers.find((d) => d.id === id);
                return dev ? dev.name : id;
              })
              .join(', ')
          }
        >
          {allDevelopers.map((dev) => (
            <MenuItem key={dev.id} value={dev.id}>
              <Checkbox checked={developerIds.includes(dev.id)} />
              <ListItemText primary={dev.name} />
            </MenuItem>
          ))}
        </Select>

        {/* Превью изображение */}
        <InputLabel sx={{ mt: 3 }}>Обложка (preview)</InputLabel>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPreview(e.target.files[0])}
        />
        {previewName && !preview && (
          <img
            src={`${uploadsConfig}/uploads/${previewName}`}
            alt="preview"
            style={{ marginTop: 10, maxWidth: 150, borderRadius: 8 }}
          />
        )}

        {/* Описание задачи */}
        <Box sx={{ mt: 3 }}>
          <InputLabel>Описание задачи</InputLabel>
          <ReactQuill
            theme="snow"
            value={taskDescription}
            onChange={setTaskDescription}
            modules={quillModules}
            formats={quillFormats}
            style={{ height: '200px', marginBottom: '50px', padding: '20px' }}
          />
        </Box>

        {/* Описание клиента */}
        <Box sx={{ mt: 3 }}>
          <InputLabel>Описание клиента</InputLabel>
          <ReactQuill
            theme="snow"
            value={clientDescription}
            onChange={srtClientDescription}
            modules={quillModules}
            formats={quillFormats}
            style={{ height: '200px', marginBottom: '50px', padding: '20px' }}
          />
        </Box>

        {/* Услуги */}
        <Box sx={{ mt: 3 }}>
          <InputLabel>Какие услуги были предоставлены</InputLabel>
          <ReactQuill
            theme="snow"
            value={serviceDescription}
            onChange={setServiceDescription}
            modules={quillModules}
            formats={quillFormats}
            style={{ height: '200px', marginBottom: '60px', padding: '20px' }}
          />
        </Box>

        {contentBlocks.map((block, index) => (
          <Box key={index} sx={{ mb: 3, marginTop: '20px' }}>
            {block.type === 'text' ? (
              <ReactQuill
                value={block.value}
                modules={quillModules}
                formats={quillFormats}
                onChange={(val) => {
                  const updated = [...contentBlocks];
                  updated[index].value = val;
                  setContentBlocks(updated);
                }}
              />
            ) : (
              <>
                <InputLabel>Изображение {index + 1}</InputLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const updated = [...contentBlocks];
                    updated[index].value = file;
                    setContentBlocks(updated);
                  }}
                />
                {block.value && typeof block.value === 'object' && (
                  <img
                    src={URL.createObjectURL(block.value)}
                    alt={`image-${index}`}
                    style={{ maxWidth: 200, marginTop: 10 }}
                  />
                )}
              </>
            )}
            <Button
              color="error"
              onClick={() => {
                const updated = contentBlocks.filter((_, i) => i !== index);
                setContentBlocks(updated);
              }}
            >
              Удалить
            </Button>
          </Box>
        ))}

        <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
          <Button
            variant="outlined"
            onClick={() =>
              setContentBlocks([...contentBlocks, { type: 'text', value: '' }])
            }
          >
            Добавить текст
          </Button>
          <Button variant="outlined" component="label">
            Добавить изображения
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (files.length) {
                  const newBlocks = files.map((file) => ({
                    type: 'image',
                    value: file,
                  }));
                  setContentBlocks([...contentBlocks, ...newBlocks]);
                  e.target.value = ''; // сбрасываем, чтобы сработал повторный выбор тех же файлов
                }
              }}
            />
          </Button>
        </Box>

        {/* Изображения */}
        {/* <InputLabel sx={{ mt: 3 }}>Галерея</InputLabel>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles([...e.target.files])}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CaseFormDialog;
