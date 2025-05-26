// src/components/ui/DiscussionTable.jsx
import React, { useEffect, useState } from 'react';
import styles from './DiscussionTable.module.css';
import serverConfig from '../../../../serverConfig';

const ITEMS_PER_PAGE = 5;

const DiscussionTable = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const res = await fetch(`${serverConfig}/discussions`);
    const data = await res.json();
    setDiscussions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = discussions.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFiltered(filteredData);
  }, [search, discussions]);

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
    await fetch(`${serverConfig}/discussions/${id}`, {
      method: 'DELETE',
    });
    fetchData();
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
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className={styles.sortable}>Имя</th>
            <th onClick={() => handleSort('email')} className={styles.sortable}>Email</th>
            <th onClick={() => handleSort('phone')} className={styles.sortable}>Телефон</th>
            <th>Компания</th>
            <th>Бюджет</th>
            <th>Сообщение</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.company}</td>
              <td>{item.budget}</td>
              <td>{item.message}</td>
              <td>
                <button
                  onClick={() => handleDelete(item.id)}
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
              className={`${styles.pageButton} ${page === i + 1 ? styles.active : ''}`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default DiscussionTable;
