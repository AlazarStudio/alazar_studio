import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
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

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function CaseModal({
  open,
  onClose,
  caseItem,
  allDevelopers,
  allCategories,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
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

  const modalScrollRef = useRef(null);
  const modalLenisRef = useRef(null);

  useEffect(() => {
    if (open) {
      // Блокировка прокрутки на фоне
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = ''; // Восстановление прокрутки при закрытии
      };
    }
  }, [open]);

  useEffect(() => {
    let lenis;

    if (open) {
      const timeout = setTimeout(() => {
        if (!modalScrollRef.current) return;

        lenis = new Lenis({
          wrapper: modalScrollRef.current,
          content: modalScrollRef.current.firstChild || modalScrollRef.current,
          duration: 0.6, // Плавная но быстрая
          easing: (t) => t, // линейная
          smooth: true,
          smoothTouch: true,
          touchMultiplier: 1.4,
          wheelMultiplier: 0.5, // шаг чуть меньше
          gestureOrientation: 'vertical',
          direction: 'vertical',
          autoResize: true,
        });

        modalLenisRef.current = lenis;

        const raf = (time) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
        document.body.setAttribute('data-lenis-prevent', 'true');
      }, 100);

      return () => {
        clearTimeout(timeout);
        if (lenis) lenis.destroy();
        document.body.removeAttribute('data-lenis-prevent');
      };
    }
  }, [open]);

  useEffect(() => {
    if (caseItem) {
      setIsLoading(true);
      const timeout = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [caseItem]);

  const handleClose = () => {
    setTimeout(() => {
      onClose();
    }, 0);
  };

  const handleCopyUrl = () => {
    const decodedUrl = decodeURIComponent(window.location.href);
    navigator.clipboard.writeText(decodedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formattedTitle = caseItem.title
    .replace(/["']/g, '«')
    .replace(/«(.*?)«/g, '«$1»');

  const handleDownloadPDF = async () => {
    const doc = new jsPDF('p', 'pt', 'a4'); // A4 в поинтах
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 30;
    const maxWidth = pageWidth - margin * 2;

    const addTextPage = async (htmlContent) => {
      const div = document.createElement('div');
      div.innerHTML = htmlContent;
      div.style.width = `${maxWidth}px`;
      div.style.padding = '20px';
      div.style.fontSize = '14px';
      div.style.lineHeight = '1.5';
      div.style.color = '#000';
      div.style.backgroundColor = '#fff';

      document.body.appendChild(div);

      const canvas = await html2canvas(div, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#fff',
      });

      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * maxWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', margin, margin, maxWidth, imgHeight);
      doc.addPage();

      document.body.removeChild(div);
    };

    const addImagePage = async (url) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const ratio = img.width / img.height;
      const imgWidth = maxWidth;
      const imgHeight = imgWidth / ratio;

      // Если изображение слишком высокое — уменьшим его до высоты страницы
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;
      if (imgHeight > pageHeight - margin * 2) {
        finalHeight = pageHeight - margin * 2;
        finalWidth = finalHeight * ratio;
      }

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      doc.addImage(
        imgData,
        'JPEG',
        (pageWidth - finalWidth) / 2,
        (pageHeight - finalHeight) / 2,
        finalWidth,
        finalHeight
      );
      doc.addPage();
    };

    // Добавим описание (через canvas)
    await addTextPage(`<h2>Общая информация</h2>${caseItem.clientDescription}`);
    await addTextPage(`<h2>Задача</h2>${caseItem.taskDescription}`);
    await addTextPage(`<h2>Услуги</h2>${caseItem.serviceDescription}`);

    // Динамичные блоки
    for (const block of caseItem.contentBlocks) {
      if (block.type === 'text') {
        await addTextPage(block.value);
      } else if (block.type === 'image') {
        await addImagePage(`${uploadsConfig}/uploads/${block.value}`);
      }
    }

    // Удаляем последнюю пустую страницу
    if (doc.getNumberOfPages() > 1) {
      doc.deletePage(doc.getNumberOfPages());
    }

    doc.save(`${caseItem.title || 'case'}.pdf`);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
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
      <div onClick={handleClose} className={styles.closeButton}>
        <CloseIcon />
      </div>
      <Box
        className={styles.modalRoot}
        // data-lenis-scroll="true"
        // ref={modalScrollRef}
      >
        {/* Кнопка закрытия */}
        {/* <IconButton onClick={onClose} className={styles.closeButton}>
          <Close />
        </IconButton> */}

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
                  {formattedTitle}
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
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Указываем значения для обоих
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
              <div className={styles.blockTop}>
                <div className={styles.block_text}>
                  <span>Общая информация</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: caseItem.clientDescription,
                    }}
                  >
                    {/* {caseItem.clientDescription.replace(/<[^>]*>/g, '')} */}
                  </div>
                </div>
                <div className={styles.block_text}>
                  <span>Задача</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: caseItem.taskDescription,
                    }}
                  >
                    {/* {caseItem.taskDescription.replace(/<[^>]*>/g, '')} */}
                  </div>
                </div>
                <div className={styles.block_text}>
                  <span>Услуги</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: caseItem.serviceDescription,
                    }}
                  >
                    {/* {caseItem.serviceDescription.replace(/<[^>]*>/g, '')} */}
                  </div>
                </div>
              </div>

              {caseItem.contentBlocks.map((block, i) =>
                block.type === 'text' ? (
                  <div
                    key={i}
                    dangerouslySetInnerHTML={{ __html: block.value }}
                    className={styles.descText1}
                  />
                ) : (
                  <img
                    key={i}
                    loading="lazy"
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
                {/* <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDiscussion(true);
                  }}
                  className={styles.iconButton}
                >
                  <img src="../images/em.svg" alt="email" width={50} />
                </a> */}

                <a
                  href="https://wa.me/79283995384"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.iconButton}
                  data-cursor-hover
                  data-cursor-text="WhatsApp"
                  data-cursor-color="#0bda51"
                >
                  <img src="../images/wh.svg" alt="whatsapp" width={50} />
                </a>

                <a
                  href="https://t.me/alazarstudio"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.iconButton}
                  data-cursor-hover
                  data-cursor-text="Telegram"
                  data-cursor-color="#0084f0"
                >
                  <img src="../images/te.svg" alt="telegram" width={50} />
                </a>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCopyUrl();
                  }}
                  className={styles.copyButton}
                  data-cursor-hover
                  data-cursor-text="Ссылка"
                  data-cursor-color="#434575"
                >
                  <img src="../images/link.svg" alt="copy link" width={50} />
                </a>
                <a
                  href="#"
                  onClick={handleDownloadPDF}
                  className={styles.copyButton}
                  data-cursor-hover
                  data-cursor-text="Скачать"
                  data-cursor-color="#ff5d00"
                >
                  <img
                    src="../images/download.svg"
                    alt="copy link"
                    width={50}
                  />
                </a>

                {/* Всплывающее уведомление */}
                {copied && (
                  <div className={styles.toast}>
                    <span>URL скопирован</span>
                  </div>
                )}
                {/* {showDiscussion && (
                  <DiscussionModal
                    open={showDiscussion}
                    onClose={() => setShowDiscussion(false)}
                  />
                )} */}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
