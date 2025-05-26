import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import serverConfig from '../../../../serverConfig';
import uploadsConfig from '../../../../uploadsConfig';

const DeveloperFormDialog = ({ open, onClose, onSave, item }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [telegram, setTelegram] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [vk, setVk] = useState('');
  const [tiktok, setTikTok] = useState('');
  const [behance, setBehance] = useState('');
  const [pinterest, setPinterest] = useState('');
  const [artstation, setArtstation] = useState('');

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setPosition(item.position || '');
      setEmail(item.email || '');
      setAvatar(item.avatar || '');
      setTelegram(item.telegram || '');
      setInstagram(item.instagram || '');
      setWhatsapp(item.whatsapp || '');
      setVk(item.vk || '');
      setTikTok(item.tiktok || '');
      setBehance(item.behance || '');
      setPinterest(item.pinterest || '');
      setArtstation(item.artstation || '');
    } else {
      setName('');
      setPosition('');
      setEmail('');
      setAvatar('');
      setTelegram('');
      setInstagram('');
      setWhatsapp('');
      setVk('');
      setTikTok('');
      setBehance('');
      setPinterest('');
      setArtstation('');
    }
    setFile(null);
  }, [item]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('email', email);
    formData.append('telegram', telegram);
    formData.append('instagram', instagram);
    formData.append('whatsapp', whatsapp);
    formData.append('vk', vk);
    formData.append('tiktok', tiktok);
    formData.append('behance', behance);
    formData.append('pinterest', pinterest);
    formData.append('artstation', artstation);
    if (file) {
      formData.append('image', file);
    }

    const url = item
      ? `${serverConfig}/developers/${item.id}`
      : `${serverConfig}/developers`;

    const method = item ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');

      onSave();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {item ? 'Редактировать' : 'Добавить'} разработчика
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Имя"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Должность"
          fullWidth
          margin="normal"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="telegram"
          fullWidth
          margin="normal"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
        />
          <TextField
          label="instagram"
          fullWidth
          margin="normal"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
          <TextField
          label="whatsapp"
          fullWidth
          margin="normal"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
          <TextField
          label="vk"
          fullWidth
          margin="normal"
          value={vk}
          onChange={(e) => setVk(e.target.value)}
        />

          <TextField
          label="tiktok"
          fullWidth
          margin="normal"
          value={tiktok}
          onChange={(e) => setTikTok(e.target.value)}
        />
          <TextField
          label="behance"
          fullWidth
          margin="normal"
          value={behance}
          onChange={(e) => setBehance(e.target.value)}
        />
          <TextField
          label="pinterest"
          fullWidth
          margin="normal"
          value={pinterest}
          onChange={(e) => setPinterest(e.target.value)}
        />
          <TextField
          label="artstation"
          fullWidth
          margin="normal"
          value={artstation}
          onChange={(e) => setArtstation(e.target.value)}
        />

        <Box mt={2}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {avatar && !file && (
            <img
              src={`${uploadsConfig}/uploads/${avatar}`}
              alt="avatar"
              style={{ marginTop: 10, maxWidth: 100, borderRadius: '50%' }}
            />
          )}
        </Box>
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

export default DeveloperFormDialog;
