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
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { loadEntity, upsert, remove as removeItem } from '../../../jsonStore';

const CategoriesMUI = () => {
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadEntity('categories');
      setRows(data);
    };
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setEditing(null);
    setName('');
    setDescription('');
    setDialogOpen(true);
  };

  const handleEdit = (row) => {
    setEditing(row);
    setName(row.name || '');
    setDescription(row.description || '');
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    await removeItem('categories', id);
    const data = await loadEntity('categories');
    setRows(data);
  };

  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Название', flex: 1, minWidth: 160 },
      { field: 'description', headerName: 'Описание', flex: 1.5, minWidth: 220 },
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
    if (!name.trim()) return;

    const item = {
      id: editing?.id,
      name: name.trim(),
      description: description.trim(),
    };

    await upsert('categories', item);
    const data = await loadEntity('categories');
    setRows(data);
    setDialogOpen(false);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} sx={{ flexShrink: 0 }}>
        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
            Категории
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управляйте группами, в которые попадают кейсы и товары.
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
          Добавить категорию
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

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Редактировать категорию' : 'Новая категория'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Название"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Описание"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleSave}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesMUI;


