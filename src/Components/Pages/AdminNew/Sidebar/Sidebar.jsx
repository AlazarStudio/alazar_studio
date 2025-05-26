// src/pages/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../Sidebar/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { text: 'Категории', path: '/admin/categories' },
    { text: 'Разработчики', path: '/admin/developers' },
    { text: 'Кейсы', path: '/admin/cases' },
    { text: 'Заявки', path: '/admin/discussion' },
  ];

  return (
    <div className="sidebar">
      <Link to="/" target="_blank" className="sidebar-logo">
        <img src="/images/headerLogo.png" alt="Logo" />
      </Link>
      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const isActive =
            currentPath === item.path ||
            (currentPath === '/admin' && item.path === '/admin/categories');

          return (
            <li key={item.text} className={isActive ? 'active' : ''}>
              <button onClick={() => navigate(item.path)}>{item.text}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;