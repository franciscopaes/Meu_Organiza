import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import {
  AiFillHome,
  AiOutlineCheckSquare,
  AiOutlineBarChart,
  AiOutlineBell,
  AiOutlineSetting,
} from 'react-icons/ai';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  const menuItems = [
    { icon: <AiFillHome />, label: 'Início', path: '/home' },
    { icon: <AiOutlineCheckSquare />, label: 'Minhas Tarefas', path: '/tarefas' },
    { icon: <AiOutlineBarChart />, label: 'Gráficos', path: '/graficos' },
    { icon: <AiOutlineBell />, label: 'Notificações', path: '/notificacoes' },
    { icon: <AiOutlineSetting />, label: 'Configurações', path: '/configuracoes' },
  ];

  return (
    <div
      className={`sidebar ${open ? 'open' : 'collapsed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `menu-link ${isActive ? 'active' : ''}`
              }
            >
              {item.icon}
              {open && <span>{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
