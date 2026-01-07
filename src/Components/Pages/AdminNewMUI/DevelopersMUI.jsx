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
  Avatar,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { loadEntity, upsert, remove as removeItem } from '../../../jsonStore';
import jsonApiConfig from '../../../jsonApiConfig';
import axios from 'axios';

const DevelopersMUI = () => {
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [telegram, setTelegram] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [vk, setVk] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [behance, setBehance] = useState('');
  const [pinterest, setPinterest] = useState('');
  const [artstation, setArtstation] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadEntity('developers');
      setRows(data);
    };
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setEditing(null);
    setName('');
    setPosition('');
    setEmail('');
    setAvatar('');
    setAvatarFile(null);
    setAvatarPreview('');
    setTelegram('');
    setInstagram('');
    setWhatsapp('');
    setVk('');
    setTiktok('');
    setBehance('');
    setPinterest('');
    setArtstation('');
    setDialogOpen(true);
  };

  const handleEdit = (row) => {
    setEditing(row);
    setName(row.name || '');
    setPosition(row.position || '');
    setEmail(row.email || '');
    setAvatar(row.avatar || '');
    setAvatarFile(null);
    setAvatarPreview(row.avatar ? `${jsonApiConfig.uploads}/${row.avatar}` : '');
    setTelegram(row.telegram || '');
    setInstagram(row.instagram || '');
    setWhatsapp(row.whatsapp || '');
    setVk(row.vk || '');
    setTiktok(row.tiktok || '');
    setBehance(row.behance || '');
    setPinterest(row.pinterest || '');
    setArtstation(row.artstation || '');
    setDialogOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Создаем preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого разработчика?')) {
      await removeItem('developers', id);
      const data = await loadEntity('developers');
      setRows(data);
    }
  };

  const columns = useMemo(
    () => [
      {
        field: 'avatar',
        headerName: 'Фото',
        width: 80,
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
            <Avatar
              src={params.row.avatar ? `${jsonApiConfig.uploads}/${params.row.avatar}` : ''}
              alt={params.row.name}
              sx={{ width: 40, height: 40 }}
            >
              {params.row.name?.charAt(0) || '?'}
            </Avatar>
          </Box>
        ),
      },
      { field: 'name', headerName: 'Имя', flex: 1, minWidth: 150 },
      { field: 'position', headerName: 'Должность', flex: 1, minWidth: 150 },
      { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
      { field: 'telegram', headerName: 'Telegram', width: 120 },
      { field: 'instagram', headerName: 'Instagram', width: 120 },
      {
        field: 'actions',
        headerName: 'Действия',
        width: 120,
        sortable: false,
        filterable: false,
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
    []
  );

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Поле "Имя" обязательно для заполнения');
      return;
    }

    setUploading(true);
    let avatarFilename = avatar;

    // Если выбран новый файл, загружаем его на сервер
    if (avatarFile) {
      try {
        const formData = new FormData();
        formData.append('image', avatarFile);

        const response = await axios.post(`${jsonApiConfig.base}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        avatarFilename = response.data.filename;
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        const errorMessage = error.response?.data?.error || error.message || 'Ошибка при загрузке изображения';
        alert(`Ошибка при загрузке изображения: ${errorMessage}`);
        setUploading(false);
        return;
      }
    }

    const item = {
      id: editing?.id,
      name: name.trim(),
      position: position.trim(),
      email: email.trim(),
      avatar: avatarFilename,
      telegram: telegram.trim(),
      instagram: instagram.trim(),
      whatsapp: whatsapp.trim(),
      vk: vk.trim(),
      tiktok: tiktok.trim(),
      behance: behance.trim(),
      pinterest: pinterest.trim(),
      artstation: artstation.trim(),
    };

    await upsert('developers', item);
    const data = await loadEntity('developers');
    setRows(data);
    setUploading(false);
    setDialogOpen(false);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} sx={{ flexShrink: 0 }}>
        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
            Разработчики
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управляйте командой разработчиков и их контактами.
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
          Добавить разработчика
        </Button>
      </Stack>

      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          minHeight: 0,
          maxHeight: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 25, page: 0 } },
          }}
          disableRowSelectionOnClick
          sx={{
            flexGrow: 1,
            '& .MuiDataGrid-root': {
              height: '100%',
            },
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'auto',
            },
          }}
        />
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{editing ? 'Редактировать разработчика' : 'Новый разработчик'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Имя *"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Должность"
              fullWidth
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Аватар
              </Typography>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="avatar-upload">
                <Button variant="outlined" component="span" fullWidth>
                  Выбрать изображение
                </Button>
              </label>
              {avatarPreview && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Avatar
                    src={avatarPreview}
                    alt="Preview"
                    sx={{ width: 100, height: 100, mx: 'auto' }}
                  />
                  {avatarFile && (
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      {avatarFile.name}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Социальные сети
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Telegram"
                fullWidth
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
              <TextField
                label="Instagram"
                fullWidth
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="WhatsApp"
                fullWidth
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
              <TextField
                label="VK"
                fullWidth
                value={vk}
                onChange={(e) => setVk(e.target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="TikTok"
                fullWidth
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
              />
              <TextField
                label="Behance"
                fullWidth
                value={behance}
                onChange={(e) => setBehance(e.target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Pinterest"
                fullWidth
                value={pinterest}
                onChange={(e) => setPinterest(e.target.value)}
              />
              <TextField
                label="Artstation"
                fullWidth
                value={artstation}
                onChange={(e) => setArtstation(e.target.value)}
              />
            </Stack>
          </Stack>
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

export default DevelopersMUI;
