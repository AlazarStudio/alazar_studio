// CategoriesPage.jsx (без MUI)
import React, { useEffect, useState } from 'react';
import CategoryFormDialog from './CategoryFormDialog';
import styles from './CategoriesPage.module.css';
import serverConfig from '../../../../serverConfig';

const ITEMS_PER_PAGE = 5;

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchData = async () => {
    const res = await fetch(`${serverConfig}/categories`);
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = categories.filter((cat) =>
      Object.values(cat).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFiltered(filteredData);
  }, [search, categories]);

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const sortedData = [...filtered].sort((a, b) => {
    const valA = a[orderBy]?.toString().toLowerCase() || '';
    const valB = b[orderBy]?.toString().toLowerCase() || '';
    return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const pagedData = sortedData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = async (id) => {
    await fetch(`${serverConfig}/categories/${id}`, {
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

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleAdd} className={styles.addButton}>Добавить категорию</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th >
              Название
            </th>
            <th >
              Описание 
            </th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <button onClick={() => handleEdit(cat)} className={styles.iconButton}>✎</button>
                <button onClick={() => handleDelete(cat.id)} className={styles.iconButton}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`${styles.pageButton} ${page === i + 1 ? styles.activePage : ''}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <CategoryFormDialog
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

export default CategoriesPage;
