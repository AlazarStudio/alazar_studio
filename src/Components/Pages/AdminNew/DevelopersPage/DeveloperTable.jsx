// DeveloperTable.jsx
import React, { useEffect, useState } from 'react';
import DeveloperFormDialog from './DeveloperFormDialog';
import styles from './DeveloperTable.module.css';
import serverConfig from '../../../../serverConfig';
import uploadsConfig from '../../../../uploadsConfig';

const ITEMS_PER_PAGE = 5;

const DeveloperTable = () => {
  const [developers, setDevelopers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchData = async () => {
    const res = await fetch(`${serverConfig}/developers`);
    const data = await res.json();
    setDevelopers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = developers.filter((dev) =>
      Object.values(dev).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFiltered(filteredData);
  }, [search, developers]);

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const sortedData = [...filtered].sort((a, b) => {
    const valA = a[orderBy]?.toString().toLowerCase() || '';
    const valB = b[orderBy]?.toString().toLowerCase() || '';
    return order === 'asc'
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  const pagedData = sortedData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleDelete = async (id) => {
    await fetch(`${serverConfig}/developers/${id}`, {
      method: 'DELETE',
    });
    fetchData();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditItem(null);
    setDialogOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <input
          className={styles.searchInput}
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.addButton} onClick={handleAdd}>
          + Добавить разработчика
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Фото</th>
            <th onClick={() => handleSort('name')} className={styles.sortable}>
              Имя
            </th>
            <th
              onClick={() => handleSort('position')}
              className={styles.sortable}
            >
              Должность
            </th>
            <th onClick={() => handleSort('email')} className={styles.sortable}>
              Email
            </th>
            <th>telegram</th>
            <th>instagram</th>
            <th>whatsapp</th>
            <th>vk</th>
            <th>tiktok</th>
            <th>behance</th>
            <th>pinterest</th>
            <th>artstation</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((dev) => (
            <tr key={dev.id}>
              <td>
                {dev.avatar && (
                  <img
                    src={`${uploadsConfig}/uploads/${dev.avatar}`}
                    alt="avatar"
                    className={styles.avatar}
                  />
                )}
              </td>
              <td>{dev.name}</td>
              <td>{dev.position}</td>
              <td>{dev.email}</td>
              <td>{dev.telegram}</td>
              <td>{dev.instagram}</td>
              <td>{dev.whatsapp}</td>
              <td>{dev.vk}</td>
              <td>{dev.tiktok}</td>
              <td>{dev.behance}</td>
              <td>{dev.pinterest}</td>
              <td>{dev.artstation}</td>
              <td>
                <button
                  onClick={() => handleEdit(dev)}
                  className={styles.actionButton}
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDelete(dev.id)}
                  className={styles.actionButton}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(filtered.length / ITEMS_PER_PAGE) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`${styles.pageButton} ${
                page === i + 1 ? styles.active : ''
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      <DeveloperFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={() => {
          setDialogOpen(false);
          fetchData();
        }}
        item={editItem}
      />
    </div>
  );
};

export default DeveloperTable;
