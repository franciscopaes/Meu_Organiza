import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { AiOutlineLogout } from 'react-icons/ai';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Evita múltiplos cliques
    
    setIsLoggingOut(true);
    
    try {
      await signOut(auth);
      console.log('Logout realizado com sucesso!');
      navigate('/'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setIsLoggingOut(false); // Reseta o estado em caso de erro
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Meu Organiza</h1>
      </div>
      
      <div className="header-right">
        <button 
          className={`header-icon ${isLoggingOut ? 'loading' : ''}`}
          title={isLoggingOut ? 'Saindo...' : 'Sair'}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <AiOutlineLogout />
        </button>
      </div>
    </header>
  );
};

export default Header; 