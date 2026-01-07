import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  Chip,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { loadEntity, upsert, remove as removeItem } from '../../../jsonStore';
import jsonApiConfig from '../../../jsonApiConfig';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


// Компонент для сортируемой строки таблицы
const SortableTableRow = ({ caseItem, categories, developers, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: String(caseItem.id),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    backgroundColor: isDragging ? '#f5f5f5' : 'white',
    position: 'relative',
    zIndex: isDragging ? 1000 : 'auto',
    cursor: isDragging ? 'grabbing' : 'default',
  };

  const caseCategories = (caseItem.categoryIds || [])
    .map((id) => {
      const cat = categories.find((c) => c.id === id);
      return cat ? cat.name : null;
    })
    .filter(Boolean);

  const caseDevelopers = (caseItem.developerIds || [])
    .map((id) => {
      const dev = developers.find((d) => d.id === id);
      return dev ? dev.name : null;
    })
    .filter(Boolean);

  const formatDate = (date) => {
    if (!date) return '—';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      sx={{
        '&:hover': {
          backgroundColor: isDragging ? '#f5f5f5' : '#fafafa',
        },
      }}
    >
      <TableCell sx={{ width: 80, textAlign: 'center', verticalAlign: 'middle' }}>
        <Avatar
          src={caseItem.preview ? `${jsonApiConfig.uploads}/${caseItem.preview}` : ''}
          alt={caseItem.title}
          variant="rounded"
          sx={{ width: 50, height: 50, margin: '0 auto' }}
        >
          ?
        </Avatar>
      </TableCell>
      <TableCell sx={{ minWidth: 200, verticalAlign: 'middle' }}>
        <Typography variant="body2">{caseItem.title}</Typography>
      </TableCell>
      <TableCell sx={{ width: 100, verticalAlign: 'middle' }}>
        <Typography variant="body2">
          {caseItem.price ? `${caseItem.price} ₽` : '—'}
        </Typography>
      </TableCell>
      <TableCell sx={{ width: 120, verticalAlign: 'middle' }}>
        <Typography variant="body2">{formatDate(caseItem.date)}</Typography>
      </TableCell>
      <TableCell sx={{ minWidth: 200, verticalAlign: 'middle' }}>
        <Stack direction="row" flexWrap="wrap" sx={{ gap: '4px' }}>
          {caseCategories.length > 0 ? (
            caseCategories.map((name, idx) => (
              <Chip key={idx} label={name} size="small" variant="outlined" />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">—</Typography>
          )}
        </Stack>
      </TableCell>
      <TableCell sx={{ minWidth: 200, verticalAlign: 'middle' }}>
        <Stack direction="row" flexWrap="wrap" sx={{ gap: '4px' }}>
          {caseDevelopers.length > 0 ? (
            caseDevelopers.map((name, idx) => (
              <Chip key={idx} label={name} size="small" variant="outlined" />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">—</Typography>
          )}
        </Stack>
      </TableCell>
      <TableCell sx={{ width: 150, textAlign: 'center', verticalAlign: 'middle' }}>
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
          <IconButton size="small" color="primary" onClick={() => onEdit(caseItem)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => onDelete(caseItem.id)}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton 
            size="small" 
            {...listeners} 
            {...attributes} 
            sx={{ 
              cursor: 'grab',
              '&:active': {
                cursor: 'grabbing',
              },
            }}
          >
            <DragIndicatorIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

SortableTableRow.displayName = 'SortableTableRow';


const CasesMUI = () => {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  
  // Drag and Drop state
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  
  // Форма
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);
  const [developerIds, setDeveloperIds] = useState([]);
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [clientDescription, setClientDescription] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [contentBlocks, setContentBlocks] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [activeSection, setActiveSection] = useState('section-info');

  // Настройка сенсоров для @dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Активация drag только после движения на 5px
      },
    })
  );

  const quillModules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
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

  useEffect(() => {
    const fetchData = async () => {
      const [casesData, categoriesData, developersData] = await Promise.all([
        loadEntity('cases'),
        loadEntity('categories'),
        loadEntity('developers'),
      ]);
      
      // Фильтруем только кейсы (shop === false)
      const filteredCases = casesData.filter(c => !c.shop);
      // Сортируем по order (по убыванию, чтобы больший order был сверху)
      // Если order отсутствует, используем id как fallback
      filteredCases.sort((a, b) => {
        const orderA = a.order !== undefined ? a.order : a.id || 0;
        const orderB = b.order !== undefined ? b.order : b.id || 0;
        return orderB - orderA; // По убыванию
      });
      setRows(filteredCases);
      setCategories(categoriesData);
      setDevelopers(developersData);
    };
    fetchData();
  }, []);

  // Обработчики для @dnd-kit
  const handleDragStart = (event) => {
    const id = typeof event.active.id === 'string' ? Number(event.active.id) : event.active.id;
    setActiveId(id);
  };

  const handleDragOver = (event) => {
    const { over } = event;
    if (over) {
      const id = typeof over.id === 'string' ? Number(over.id) : over.id;
      setOverId(id);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over) return;

    const draggedId = typeof active.id === 'string' ? Number(active.id) : active.id;
    const targetId = typeof over.id === 'string' ? Number(over.id) : over.id;

    if (draggedId === targetId) return;

    const oldIndex = rows.findIndex((row) => row.id === draggedId);
    const newIndex = rows.findIndex((row) => row.id === targetId);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      const newRows = arrayMove(rows, oldIndex, newIndex);
      setRows(newRows);

      // Обновляем order для всех кейсов на основе нового порядка
      const updates = newRows.map((row, index) => ({
        ...row,
        order: newRows.length - index,
      }));

      // Сохраняем все изменения
      for (const updatedCase of updates) {
        await upsert('cases', updatedCase);
      }
    }
  };


  const handleOpenCreate = () => {
    setEditing(null);
    setTitle('');
    setPrice('');
    setLink('');
    setDate('');
    setCategoryIds([]);
    setDeveloperIds([]);
    setPreview(null);
    setPreviewName('');
    setTaskDescription('');
    setClientDescription('');
    setServiceDescription('');
    setContentBlocks([]);
    setActiveSection('section-info');
    setDialogOpen(true);
  };

  const handleEdit = (row) => {
    setEditing(row);
    setTitle(row.title || '');
    setPrice(row.price || '');
    setLink(row.link || '');
    setDate(row.date ? row.date.slice(0, 10) : '');
    setCategoryIds(row.categoryIds || []);
    setDeveloperIds(row.developerIds || []);
    setPreview(null);
    setPreviewName(row.preview || '');
    setTaskDescription(row.taskDescription || '');
    setClientDescription(row.clientDescription || '');
    setServiceDescription(row.serviceDescription || '');
    setContentBlocks(row.contentBlocks || []);
    setActiveSection('section-info');
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот кейс?')) {
      await removeItem('cases', id);
      const data = await loadEntity('cases');
      setRows(data.filter(c => !c.shop));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Preview будет показан через URL.createObjectURL
      };
      reader.readAsDataURL(file);
    }
  };

  const columns = useMemo(
    () => [
      {
        field: 'preview',
        headerName: 'Обложка',
        width: 100,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            {params.row.preview ? (
              <Avatar
                src={`${jsonApiConfig.uploads}/${params.row.preview}`}
                alt={params.row.title}
                variant="rounded"
                sx={{ width: 50, height: 50 }}
              />
            ) : (
              <Avatar variant="rounded" sx={{ width: 50, height: 50, bgcolor: 'grey.300' }}>
                ?
              </Avatar>
            )}
          </Box>
        ),
      },
      { 
        field: 'title', 
        headerName: 'Название', 
        flex: 1, 
        minWidth: 200,
      },
      { 
        field: 'price', 
        headerName: 'Цена', 
        width: 120,
        renderCell: (params) => params.row.price ? `${params.row.price} ₽` : '—'
      },
      { 
        field: 'date', 
        headerName: 'Дата', 
        width: 120,
        renderCell: (params) => {
          if (!params.row.date) return '—';
          try {
            const date = new Date(params.row.date);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
          } catch (error) {
            return params.row.date;
          }
        },
      },
      {
        field: 'categories',
        headerName: 'Категории',
        flex: 1,
        minWidth: 200,
        renderCell: (params) => {
          const caseCategories = (params.row.categoryIds || [])
            .map((id) => {
              const cat = categories.find((c) => c.id === id);
              return cat ? cat.name : null;
            })
            .filter(Boolean);
          
          return (
            <Stack 
              direction="row" 
              flexWrap="wrap" 
              sx={{ 
                py: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100%',
                gap: '4px',
                '& > *': {
                  marginLeft: '0 !important',
                },
              }}
            >
              {caseCategories.length > 0 ? (
                caseCategories.map((name, idx) => (
                  <Chip key={idx} label={name} size="small" />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">—</Typography>
              )}
            </Stack>
          );
        },
      },
      {
        field: 'developers',
        headerName: 'Разработчики',
        flex: 1,
        minWidth: 200,
        renderCell: (params) => {
          const caseDevelopers = (params.row.developerIds || [])
            .map((id) => {
              const dev = developers.find((d) => d.id === id);
              return dev ? dev.name : null;
            })
            .filter(Boolean);
          
          return (
            <Stack 
              direction="row" 
              flexWrap="wrap" 
              sx={{ 
                py: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100%',
                gap: '4px',
                '& > *': {
                  marginLeft: '0 !important',
                },
              }}
            >
              {caseDevelopers.length > 0 ? (
                caseDevelopers.map((name, idx) => (
                  <Chip key={idx} label={name} size="small" variant="outlined" />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">—</Typography>
              )}
            </Stack>
          );
        },
      },
      {
        field: 'actions',
        headerName: 'Действия',
        width: 120,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [categories, developers]
  );

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Поле "Название" обязательно для заполнения');
      return;
    }

    setUploading(true);
    let previewFilename = previewName;

    // Если выбран новый файл, загружаем его на сервер
    if (preview) {
      try {
        const formData = new FormData();
        formData.append('image', preview);

        const response = await axios.post(`${jsonApiConfig.base}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        previewFilename = response.data.filename;
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        const errorMessage = error.response?.data?.error || error.message || 'Ошибка при загрузке изображения';
        alert(`Ошибка при загрузке изображения: ${errorMessage}`);
        setUploading(false);
        return;
      }
    }

    // Обрабатываем contentBlocks - загружаем новые изображения
    const processedContentBlocks = await Promise.all(
      contentBlocks.map(async (block) => {
        if (block.type === 'image' && block.value instanceof File) {
          try {
            const formData = new FormData();
            formData.append('image', block.value);

            const response = await axios.post(`${jsonApiConfig.base}/api/upload`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            return {
              type: 'image',
              value: response.data.filename,
            };
          } catch (error) {
            console.error('Ошибка при загрузке изображения блока:', error);
            // Если ошибка, оставляем как есть (может быть уже загруженное имя файла)
            return block;
          }
        }
        // Для текста или уже загруженных изображений просто возвращаем как есть
        return block;
      })
    );

    // Если это новый кейс, устанавливаем order как максимальный + 1
    let order = editing?.order;
    if (!editing) {
      const allCases = await loadEntity('cases');
      const filteredCases = allCases.filter(c => !c.shop);
      const maxOrder = filteredCases.length > 0 
        ? Math.max(...filteredCases.map(c => c.order !== undefined ? c.order : c.id || 0))
        : 0;
      order = maxOrder + 1;
    }

    const item = {
      id: editing?.id,
      title: title.trim(),
      price: price ? parseFloat(price) : null,
      link: link.trim(),
      date: date || null,
      order: order,
      categoryIds: categoryIds,
      developerIds: developerIds,
      preview: previewFilename,
      taskDescription: taskDescription,
      clientDescription: clientDescription,
      serviceDescription: serviceDescription,
      contentBlocks: processedContentBlocks,
      shop: false, // Кейсы, не товары
    };

    await upsert('cases', item);
    const data = await loadEntity('cases');
    const filteredCases = data.filter(c => !c.shop);
    // Сортируем по order
    filteredCases.sort((a, b) => {
      const orderA = a.order !== undefined ? a.order : a.id || 0;
      const orderB = b.order !== undefined ? b.order : b.id || 0;
      return orderB - orderA; // По убыванию
    });
    setRows(filteredCases);
    setUploading(false);
    setDialogOpen(false);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} sx={{ flexShrink: 0 }}>
        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
            Кейсы
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управляйте портфолио проектов и кейсами.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{
            borderRadius: 999,
          }}
        >
          Добавить кейс
        </Button>
      </Stack>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <TableContainer 
          component={Paper} 
          sx={{ 
            flexGrow: 1,
            minHeight: 0,
            overflow: 'auto',
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 80, textAlign: 'center', backgroundColor: 'background.paper' }}>Обложка</TableCell>
                <TableCell sx={{ minWidth: 200, backgroundColor: 'background.paper' }}>Название</TableCell>
                <TableCell sx={{ width: 100, backgroundColor: 'background.paper' }}>Цена</TableCell>
                <TableCell sx={{ width: 120, backgroundColor: 'background.paper' }}>Дата</TableCell>
                <TableCell sx={{ minWidth: 200, backgroundColor: 'background.paper' }}>Категории</TableCell>
                <TableCell sx={{ minWidth: 200, backgroundColor: 'background.paper' }}>Разработчики</TableCell>
                <TableCell sx={{ width: 150, textAlign: 'center', backgroundColor: 'background.paper' }}>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <SortableContext
                items={rows.map((row) => String(row.id))}
                strategy={verticalListSortingStrategy}
              >
                {rows.map((caseItem) => (
                  <SortableTableRow
                    key={caseItem.id}
                    caseItem={caseItem}
                    categories={categories}
                    developers={developers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </TableContainer>

        <DragOverlay dropAnimation={null}>
          {activeId ? (
            (() => {
              const activeRow = rows.find((r) => r.id === activeId);
              if (!activeRow) return null;
              
              const caseCategories = (activeRow.categoryIds || [])
                .map((id) => {
                  const cat = categories.find((c) => c.id === id);
                  return cat ? cat.name : null;
                })
                .filter(Boolean);

              const caseDevelopers = (activeRow.developerIds || [])
                .map((id) => {
                  const dev = developers.find((d) => d.id === id);
                  return dev ? dev.name : null;
                })
                .filter(Boolean);

              const formatDate = (date) => {
                if (!date) return '—';
                const d = new Date(date);
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}.${month}.${year}`;
              };
              
              return (
                <Paper sx={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)' }}>
                  <Table>
                    <TableBody>
                      <TableRow sx={{ backgroundColor: 'white' }}>
                        <TableCell sx={{ width: 80, textAlign: 'center', verticalAlign: 'middle' }}>
                          <Avatar
                            src={activeRow.preview ? `${jsonApiConfig.uploads}/${activeRow.preview}` : ''}
                            alt={activeRow.title}
                            variant="rounded"
                            sx={{ width: 50, height: 50, margin: '0 auto' }}
                          >
                            ?
                          </Avatar>
                        </TableCell>
                        <TableCell sx={{ minWidth: 200, verticalAlign: 'middle' }}>
                          <Typography variant="body2">{activeRow.title}</Typography>
                        </TableCell>
                        <TableCell sx={{ width: 100, verticalAlign: 'middle' }}>
                          <Typography variant="body2">
                            {activeRow.price ? `${activeRow.price} ₽` : '—'}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ width: 120, verticalAlign: 'middle' }}>
                          <Typography variant="body2">{formatDate(activeRow.date)}</Typography>
                        </TableCell>
                        <TableCell sx={{ minWidth: 200, verticalAlign: 'middle' }}>
                          <Stack direction="row" flexWrap="wrap" sx={{ gap: '4px' }}>
                            {caseCategories.length > 0 ? (
                              caseCategories.map((name, idx) => (
                                <Chip key={idx} label={name} size="small" variant="outlined" />
                              ))
                            ) : (
                              <Typography variant="body2" color="text.secondary">—</Typography>
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ minWidth: 200, verticalAlign: 'middle' }}>
                          <Stack direction="row" flexWrap="wrap" sx={{ gap: '4px' }}>
                            {caseDevelopers.length > 0 ? (
                              caseDevelopers.map((name, idx) => (
                                <Chip key={idx} label={name} size="small" variant="outlined" />
                              ))
                            ) : (
                              <Typography variant="body2" color="text.secondary">—</Typography>
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ width: 150, textAlign: 'center', verticalAlign: 'middle' }}>
                          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                            <IconButton size="small" color="primary">
                              <EditIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton size="small">
                              <DragIndicatorIcon fontSize="inherit" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              );
            })()
          ) : null}
        </DragOverlay>
      </DndContext>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="lg">
        <DialogTitle>{editing ? 'Редактировать кейс' : 'Новый кейс'}</DialogTitle>
        <DialogContent 
          sx={{ position: 'relative' }}
          onScroll={(e) => {
            const container = e.currentTarget;
            const scrollTop = container.scrollTop;
            const containerHeight = container.clientHeight;
            
            const sections = [
              { id: 'section-info', element: document.getElementById('section-info') },
              { id: 'section-description', element: document.getElementById('section-description') },
              { id: 'section-content', element: document.getElementById('section-content') },
            ];
            
            // Находим секцию, которая находится в видимой области
            for (let i = sections.length - 1; i >= 0; i--) {
              const section = sections[i];
              if (section.element) {
                const rect = section.element.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const relativeTop = rect.top - containerRect.top;
                
                // Если секция видна (верхняя часть находится в видимой области или выше)
                if (relativeTop <= 100) {
                  setActiveSection(section.id);
                  break;
                }
              }
            }
          }}
        >
          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* Основной контент */}
            <Box sx={{ flex: 1 }}>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <Typography 
                  id="section-info"
                  variant="h6" 
                  sx={{ mb: 1, fontWeight: 600, scrollMarginTop: '80px' }}
                >
                  Информация о кейсе
                </Typography>
            
            <TextField
              label="Название *"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Цена (₽)"
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Stack>
            <TextField
              label="Ссылка на сайт"
              fullWidth
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <TextField
              label="Дата"
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            
            <InputLabel>Категории</InputLabel>
            <Select
              multiple
              fullWidth
              value={categoryIds}
              onChange={(e) => setCategoryIds(e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected
                  .map((id) => {
                    const cat = categories.find((c) => c.id === id);
                    return cat ? cat.name : id;
                  })
                  .join(', ')
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    overflowY: 'auto',
                  },
                },
                MenuListProps: {
                  sx: {
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 1,
                  },
                },
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  <Checkbox checked={categoryIds.includes(cat.id)} />
                  <ListItemText primary={cat.name} />
                </MenuItem>
              ))}
            </Select>

            <InputLabel>Разработчики</InputLabel>
            <Select
              multiple
              fullWidth
              value={developerIds}
              onChange={(e) => setDeveloperIds(e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected
                  .map((id) => {
                    const dev = developers.find((d) => d.id === id);
                    return dev ? dev.name : id;
                  })
                  .join(', ')
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    overflowY: 'auto',
                  },
                },
                MenuListProps: {
                  sx: {
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 1,
                  },
                },
              }}
            >
              {developers.map((dev) => (
                <MenuItem key={dev.id} value={dev.id}>
                  <Checkbox checked={developerIds.includes(dev.id)} />
                  <ListItemText primary={dev.name} />
                </MenuItem>
              ))}
            </Select>

            <Box>
              <InputLabel sx={{ mb: 1 }}>Обложка (preview)</InputLabel>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="preview-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="preview-upload">
                <Button variant="outlined" component="span" fullWidth>
                  Выбрать изображение
                </Button>
              </label>
              {(preview || previewName) && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Avatar
                    src={
                      preview
                        ? URL.createObjectURL(preview)
                        : previewName
                        ? `${jsonApiConfig.uploads}/${previewName}`
                        : ''
                    }
                    alt="Preview"
                    variant="rounded"
                    sx={{ width: 150, height: 150, mx: 'auto' }}
                  >
                    ?
                  </Avatar>
                  {preview && (
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      {preview.name}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            {/* Разделитель между информацией о кейсе и описанием */}
            <Divider sx={{ my: 3 }} />
            
            <Typography 
              id="section-description"
              variant="h6" 
              sx={{ mb: 2, fontWeight: 600, scrollMarginTop: '80px' }}
            >
              Описание кейса
            </Typography>

            {/* Описание задачи */}
            <Box>
              <InputLabel sx={{ mb: 1 }}>Описание задачи</InputLabel>
              <ReactQuill
                theme="snow"
                value={taskDescription}
                onChange={setTaskDescription}
                modules={quillModules}
                formats={quillFormats}
                style={{ height: '200px', marginBottom: '50px' }}
              />
            </Box>

            {/* Описание клиента */}
            <Box>
              <InputLabel sx={{ mb: 1 }}>Описание клиента</InputLabel>
              <ReactQuill
                theme="snow"
                value={clientDescription}
                onChange={setClientDescription}
                modules={quillModules}
                formats={quillFormats}
                style={{ height: '200px', marginBottom: '50px' }}
              />
            </Box>

            {/* Услуги */}
            <Box>
              <InputLabel sx={{ mb: 1 }}>Какие услуги были предоставлены</InputLabel>
              <ReactQuill
                theme="snow"
                value={serviceDescription}
                onChange={setServiceDescription}
                modules={quillModules}
                formats={quillFormats}
                style={{ height: '200px', marginBottom: '50px' }}
              />
            </Box>

            {/* Разделитель между описанием и блоками контента */}
            <Divider sx={{ my: 3 }} />
            
            <Typography 
              id="section-content"
              variant="h6" 
              sx={{ mb: 2, fontWeight: 600, scrollMarginTop: '80px' }}
            >
              Блоки контента
            </Typography>

            {/* Content Blocks */}
            <Box>
              {contentBlocks.map((block, index) => (
                <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  {/* Заголовок с кнопкой удаления */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <InputLabel sx={{ mb: 0 }}>
                      {block.type === 'text' ? `Текстовый блок ${index + 1}` : `Изображение ${index + 1}`}
                    </InputLabel>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => {
                        const updated = contentBlocks.filter((_, i) => i !== index);
                        setContentBlocks(updated);
                      }}
                    >
                      Удалить блок
                    </Button>
                  </Stack>

                  {block.type === 'text' ? (
                    <Box sx={{ paddingBottom: '20px' }}>
                      <ReactQuill
                        value={block.value}
                        modules={quillModules}
                        formats={quillFormats}
                        onChange={(val) => {
                          const updated = [...contentBlocks];
                          updated[index].value = val;
                          setContentBlocks(updated);
                        }}
                        style={{ height: '150px', marginBottom: '50px' }}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id={`content-block-${index}`}
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const updated = [...contentBlocks];
                          updated[index].value = file;
                          setContentBlocks(updated);
                        }}
                      />
                      <label htmlFor={`content-block-${index}`}>
                        <Button variant="outlined" component="span" size="small" sx={{ mb: 2 }}>
                          Выбрать изображение
                        </Button>
                      </label>
                      {block.value && (
                        <Box sx={{ mt: 1 }}>
                          <img
                            src={
                              typeof block.value === 'string'
                                ? `${jsonApiConfig.uploads}/${block.value}`
                                : URL.createObjectURL(block.value)
                            }
                            alt={`block-${index}`}
                            style={{ maxWidth: 200, borderRadius: 4 }}
                          />
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              ))}
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setContentBlocks([...contentBlocks, { type: 'text', value: '' }])
                  }
                >
                  Добавить текст
                </Button>
                <Button variant="outlined" component="label">
                  Добавить изображение
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
                        e.target.value = '';
                      }
                    }}
                  />
                </Button>
              </Stack>
            </Box>
          </Stack>
            </Box>

            {/* Боковая навигация с якорями */}
            <Box
              sx={{
                position: 'sticky',
                top: 20,
                alignSelf: 'flex-start',
                minWidth: 200,
                maxWidth: 200,
                pl: 2,
                borderLeft: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
                Навигация
              </Typography>
              <Stack spacing={1}>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    document.getElementById('section-info')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    color: activeSection === 'section-info' ? 'primary.main' : 'text.secondary',
                    fontWeight: activeSection === 'section-info' ? 600 : 400,
                    backgroundColor: activeSection === 'section-info' ? 'action.selected' : 'transparent',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  Информация о кейсе
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    document.getElementById('section-description')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    color: activeSection === 'section-description' ? 'primary.main' : 'text.secondary',
                    fontWeight: activeSection === 'section-description' ? 600 : 400,
                    backgroundColor: activeSection === 'section-description' ? 'action.selected' : 'transparent',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  Описание кейса
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    document.getElementById('section-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    color: activeSection === 'section-content' ? 'primary.main' : 'text.secondary',
                    fontWeight: activeSection === 'section-content' ? 600 : 400,
                    backgroundColor: activeSection === 'section-content' ? 'action.selected' : 'transparent',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  Блоки контента
                </Button>
              </Stack>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={uploading}>
            Отмена
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={uploading}>
            {uploading ? 'Загрузка...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CasesMUI;
