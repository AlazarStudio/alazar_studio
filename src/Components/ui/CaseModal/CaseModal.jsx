// src/components/ui/CaseModal/CaseModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Drawer,
  Button,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import styles from './CaseModal.module.css';
import uploadsConfig from '../../../uploadsConfig';
import DiscussionModal from '../DiscussionModal/DiscussionModal';
import serverConfig from '../../../serverConfig';
import CloseIcon from '@mui/icons-material/Close';

export default function CaseModal({
  open,
  onClose,
  caseItem,
  allDevelopers,
  allCategories,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [copied, setCopied] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!caseItem) return null;

  const caseCategories = allCategories.filter((cat) =>
    caseItem.categoryIds.includes(cat.id)
  );
  const caseDevelopers = allDevelopers.filter((dev) =>
    caseItem.developerIds.includes(dev.id)
  );

  useEffect(() => {
    if (caseItem) {
      setIsLoading(true);
      // Даем время на "рендер", можно позже заменить на реальные async операции
      const timeout = setTimeout(() => setIsLoading(false), 300); // 300 мс можно заменить
      return () => clearTimeout(timeout);
    }
  }, [caseItem]);

  const handleClose = () => {
    setIsHiding(true); // активируем анимацию исчезновения
    setTimeout(() => {
      onClose(); // вызываем родительское закрытие
    }, 400); // время должно совпадать с duration анимации
  };

  const handleCopyUrl = () => {
    const decodedUrl = decodeURIComponent(window.location.href);
    navigator.clipboard.writeText(decodedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      // onClose={onClose}
      ModalProps={{
        BackdropProps: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          },
        },
      }}
      PaperProps={{
        sx: {
          background: 'none',
          boxShadow: 'none',
          overflow: 'hidden',
        },
      }}
    >
      <Box className={styles.modalRoot}>
        {/* Кнопка закрытия */}
        {/* <IconButton onClick={onClose} className={styles.closeButton}>
          <Close />
        </IconButton> */}
        <div onClick={onClose} className={styles.closeButton}>
          {/* <IconButton onClick={onClose} className={styles.closeButton}> */}
          <CloseIcon fontSize="large" />
          {/* </IconButton> */}
        </div>
        {/* Контент */}

        {isLoading ? (
          <Box className={styles.preloaderWrapper}>
            <div className={styles.spinner}></div>
          </Box>
        ) : (
          // основной контент модалки

          <Box className={styles.container}>
            <Box className={styles.topRow}>
              <Box>
                <Typography className={styles.title}>
                  {caseItem.title}
                </Typography>
                <Box className={styles.categories}>
                  {caseCategories.map((cat) => cat.name).join(' • ')}
                </Box>
              </Box>

              {/* Разработчики */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {caseDevelopers.length === 1 ? (
                  // Один разработчик — показываем просто
                  <Box className={styles.popoverList1}>
                    {caseDevelopers.map((dev) => (
                      <ListItem key={dev.id}>
                        <ListItemAvatar>
                          <Avatar
                            src={
                              dev.avatar
                                ? `${uploadsConfig}/uploads/${dev.avatar}`
                                : ''
                            }
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={dev.name}
                          secondary={dev.position || 'Без должности'}
                          secondaryTypographyProps={{
                            className: styles.devRole,
                          }}
                        />
                      </ListItem>
                    ))}
                  </Box>
                ) : (
                  // Несколько — кнопка с аватарками и поповером
                  <button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    className={styles.devButton}
                  >
                    <Box className={styles.devAvatars}>
                      {caseDevelopers.map((dev, i) => (
                        <Avatar
                          key={i}
                          src={
                            dev.avatar
                              ? `${uploadsConfig}/uploads/${dev.avatar}`
                              : ''
                          }
                          style={{
                            marginLeft: i !== 0 ? '-15px' : 0,
                            zIndex: caseDevelopers.length - i,
                          }}
                        />
                      ))}
                    </Box>
                    Разработчики проекта ▾
                  </button>
                )}
              </Box>
            </Box>

            {/* Поповер с разработчиками */}
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: 'bottom' }}
            >
              <List className={styles.popoverList}>
                {caseDevelopers.map((dev) => (
                  <ListItem key={dev.id}>
                    <ListItemAvatar>
                      <Avatar
                        src={
                          dev.avatar
                            ? `${uploadsConfig}/uploads/${dev.avatar}`
                            : ''
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={dev.name}
                      secondary={dev.position || 'Без должности'}
                      secondaryTypographyProps={{ className: styles.devRole }}
                    />
                  </ListItem>
                ))}
              </List>
            </Popover>

            {/* Изображения кейса */}
            <Box className={styles.imagesWrapper}>
              {/* {caseItem.images.map((img, index) => (
              <Box key={index} className={styles.imageBox}>
                <img
                  src={`${uploadsConfig}/uploads/${img}`}
                  alt={`case-img-${index}`}
                  className={styles.image}
                />
              </Box>
            ))} */}

              <div className={styles.block_text}>
                {caseItem.taskDescription.replace(/<[^>]*>/g, '')}
              </div>
              <div className={styles.block_text}>
                {caseItem.clientDescription.replace(/<[^>]*>/g, '')}
              </div>
              <div className={styles.block_text}>
                {caseItem.serviceDescription.replace(/<[^>]*>/g, '')}
              </div>
              {caseItem.contentBlocks.map((block, i) =>
                block.type === 'text' ? (
                  <div
                    key={i}
                    dangerouslySetInnerHTML={{ __html: block.value }}
                    className={styles.block_text}
                  />
                ) : (
                  <img
                    key={i}
                    src={`${uploadsConfig}/uploads/${block.value}`}
                    alt="block"
                    className={styles.img}
                  />
                )
              )}

              <List className={styles.popoverListMobile}>
                {caseDevelopers.map((dev) => (
                  <ListItem key={dev.id}>
                    <ListItemAvatar>
                      <Avatar
                        src={
                          dev.avatar
                            ? `https://backend.alazarstudio.ru/uploads/${dev.avatar}`
                            : ''
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={dev.name}
                      secondary={dev.position || 'Без должности'}
                      secondaryTypographyProps={{ className: styles.devRole }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box className={styles.messengerBlock}>
                {/* <a
                href="mailto:info@alazarstudio.ru"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/mail.png" alt="email" width={50} />
              </a> */}
                <button
                  onClick={() => setShowDiscussion(true)}
                  className={styles.iconButton}
                >
                  <img src="/images/mail.png" alt="email" width={50} />
                </button>

                <a
                  href="https://wa.me/79283995384"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/images/whatsapp.png" alt="whatsapp" width={50} />
                </a>
                <a
                  href="https://t.me/alazarstudio"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/images/telegram.png" alt="telegram" width={50} />
                </a>
                {/* Кнопка копирования */}
                <button onClick={handleCopyUrl} className={styles.copyButton}>
                  <img src="/images/telegram.png" alt="copy link" width={50} />
                </button>

                {/* Всплывающее уведомление */}
                {copied && (
                  <div className={styles.toast}>
                    <span>URL скопирован</span>
                  </div>
                )}
                {showDiscussion && (
                  <DiscussionModal
                    open={showDiscussion}
                    onClose={() => setShowDiscussion(false)}
                  />
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
