import React, { useEffect, useState } from 'react';
import CaseFormDialog from './CaseFormDialog';
import serverConfig from '../../../../serverConfig';
import './CasesPage.css';
import uploadsConfig from '../../../../uploadsConfig';

const ITEMS_PER_PAGE = 10;

const CasesPage = () => {
  const [cases, setCases] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const fetchAll = async () => {
    const [casesRes, devsRes, catsRes] = await Promise.all([
      fetch(`${serverConfig}/cases`),
      fetch(`${serverConfig}/developers`),
      fetch(`${serverConfig}/categories`),
    ]);

    const [caseData, devs, cats] = await Promise.all([
      casesRes.json(),
      devsRes.json(),
      catsRes.json(),
    ]);

    setCases(caseData);
    setDevelopers(devs);
    setCategories(cats);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Фильтрация по поиску и по статусу shop === false
  const filtered = cases
    .filter((c) => c.shop === false)
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  // Разворачиваем массив кейсов перед пагинацией
  const reversedCases = [...filtered].reverse();

  // Пагинация
  const paged = reversedCases.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleDelete = async (id) => {
    await fetch(`${serverConfig}/cases/${id}`, {
      method: 'DELETE',
    });
    fetchAll();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setDialogOpen(true);
  };

  return (
    <div className="cases-container">
      <div className="cases-header">
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setEditItem(null);
            setDialogOpen(true);
          }}
        >
          Добавить кейс
        </button>
      </div>

      <table className="cases-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Цена</th>
            <th>Дата</th>
            <th>Категории</th>
            <th>Разработчики</th>
            <th>№ в топе</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.price} ₽</td>
              <td>{c.date}</td>
              <td>
                {c.categoryIds
                  .map((id) => {
                    const cat = categories.find((c) => c.id === id);
                    return cat ? cat.name : id;
                  })
                  .join(', ')}
              </td>
              <td>
                {c.developerIds
                  .map((id) => {
                    const dev = developers.find((d) => d.id === id);
                    return dev ? dev.name : id;
                  })
                  .join(', ')}
              </td>
              <td>{c.positionTop}</td>
              <td>
                <button onClick={() => handleEdit(c)}>✎</button>
                <button onClick={() => handleDelete(c.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cases-pagination">
        {Array.from(
          { length: Math.ceil(filtered.length / ITEMS_PER_PAGE) },
          (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? 'active' : ''}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      <CaseFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={() => {
          setDialogOpen(false);
          fetchAll();
        }}
        item={editItem}
        allCategories={categories}
        allDevelopers={developers}
      />
    </div>
  );
};

export default CasesPage;
