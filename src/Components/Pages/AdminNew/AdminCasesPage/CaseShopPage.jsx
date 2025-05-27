import React, { useEffect, useState } from 'react';
import CaseFormDialog from './CaseFormDialog';
import serverConfig from '../../../../serverConfig';
import './CasesPage.css';
import uploadsConfig from '../../../../uploadsConfig';

const ITEMS_PER_PAGE = 5;

const CaseShopPage = () => {
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

const filtered = cases
  .filter((c) => c.shop === true)
  .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  const paged = filtered.slice(
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
            <th>Изображения</th>
            <th>Описание задачи</th>
            <th>Описание клиента</th>
            <th>Описание услуг</th>
            <th>Контент</th>
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
                {c.images?.length}
                {/* {c.images?.map((img, i) => (
                  <img
                    key={i}
                    src={`${uploadsConfig}/uploads/${img}`}
                    alt=""
                    className="case-img"
                  />
                ))} */}
              </td>
              <td>{c.taskDescription}</td>
              <td>{c.clientDescription}</td>
              <td>{c.serviceDescription}</td>
              <td>
  {Array.isArray(c.contentBlocks) && c.contentBlocks.length > 0 ? (
    <div className="content-preview">
      {c.contentBlocks.slice(0, 3).map((block, i) =>
        block.type === 'text' ? (
          <div
            key={i}
            dangerouslySetInnerHTML={{ __html: block.value }}
            className="block-text"
          />
        ) : (
          <img
            key={i}
            src={`${uploadsConfig}/uploads/${block.value}`}
            alt="block"
            className="block-img"
          />
        )
      )}
      {c.contentBlocks.length > 3 && <span>…</span>}
    </div>
  ) : (
    '—'
  )}
</td>

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

export default CaseShopPage;
