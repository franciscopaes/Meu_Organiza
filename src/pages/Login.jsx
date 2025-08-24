import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import './Login.css';
import logo from '../assets/logo.png';


// Importando ícones do React Icons
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaLinkedinIn, FaGithub, FaFacebookF } from 'react-icons/fa';

// Importa o objeto de autenticação configurado do seu firebaseConfig.js
import { auth } from '../services/firebaseConfig';
import {
  signInWithEmailAndPassword,     // Para login com e-mail e senha
  createUserWithEmailAndPassword, // Para cadastro com e-mail e senha
  signInWithPopup,                // Para login com provedores sociais (Google, etc.)
  GoogleAuthProvider              // Provedor Google
} from 'firebase/auth';


const Login = () => {
  const navigate = useNavigate(); // Inicializa o hook useNavigate para redirecionamento

  // Estado para controlar se estamos no modo de Login (true) ou Cadastro (false)
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Estados para armazenar os valores dos campos do formulário
  const [username, setUsername] = useState(''); // Usado apenas no cadastro
  const [email, setEmail] = useState('');       // Usado em ambos
  const [password, setPassword] = useState(''); // Usado em ambos
  const [error, setError] = useState(null);     // Estado para mensagens de erro do Firebase
  const [successMessage, setSuccessMessage] = useState(null); // Estado para mensagens de sucesso

   useEffect(() => {
    if (!error) return; // só cria timer se tiver erro
    const timer = setTimeout(() => {
      setError(null);
    }, 5000); 

    return () => clearTimeout(timer); // limpa se mudar antes dos 10s
  }, [error]);

  // Função para lidar com o envio do formulário (Login ou Cadastro)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página
    setError(null);     // Limpa qualquer erro anterior
    setSuccessMessage(null); // Limpa qualquer mensagem de sucesso anterior
    

    try {
      if (isLoginMode) {
        // Lógica para LOGIN com Email e Senha via Firebase
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage('Login efetuado com sucesso!');
        console.log('Login efetuado com sucesso!');
        navigate('/home'); // Redireciona para a página /home após o login
      } else {
        // Lógica para CADASTRO com Email e Senha via Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMessage('Cadastro efetuado com sucesso!');
        console.log('Cadastro efetuado com sucesso!', userCredential.user.uid);
        navigate('/'); // Redireciona para a página /home após o cadastro
      }
    } catch (err) {
      // Captura e exibe erros do Firebase (ex: e-mail inválido, senha fraca, usuário não encontrado)
      console.error("Erro de autenticação Firebase:", err.code, err.message);
      setError(err.message);
    }

    // Limpa os campos após a tentativa (sucesso ou falha)
    setUsername('');
    setEmail('');
    setPassword('');
  };

  // Função para lidar com o login social via Google
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Instancia o provedor Google
    setError(null);
    setSuccessMessage(null);

    try {
      await signInWithPopup(auth, provider); // Abre um pop-up para o login com Google
      setSuccessMessage('Login com Google efetuado com sucesso!');
      console.log('Login com Google efetuado com sucesso!');
      navigate('/home'); // Redireciona para a página /home após o login social
    } catch (err) {
      console.error("Erro ao logar com Google:", err.code, err.message);
      setError(err.message); // Exibe o erro
    }
  };

  // Função para alternar entre os modos de Login e Cadastro
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode); // Inverte o modo
    // Limpa todos os campos e erros ao trocar de modo
    setUsername('');
    setEmail('');
    setPassword('');
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-side">
          {/* Título dinâmico do formulário */}
          <h2 className="form-title">{isLoginMode ? 'Login' : 'Cadastro'}</h2>

          <form onSubmit={handleSubmit}>
            {/* Campo de Nome de Usuário: Aparece SOMENTE no modo de CADASTRO */}
            {!isLoginMode && (
              <div className="input-field">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Nome de usuário"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}

            {/* Campo de E-mail: Aparece em AMBOS os modos */}
            <div className="input-field">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Campo de Senha: Aparece em AMBOS os modos */}
            <div className="input-field">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Botão principal de submit */}
            <button type="submit" className="main-button">
              {isLoginMode ? 'Entrar' : 'Cadastrar'}
            </button>

            {/* Exibe mensagem de erro se houver */}
            {error && <p className="error-message">{error}</p>}
            {/* Exibe mensagem de sucesso se houver */}
            {successMessage && <p className="success-message">{successMessage}</p>}


            {/* Seção de Login Social */}
            <p className="social-text">Ou {isLoginMode ? 'entre' : 'cadastre-se'} com plataformas sociais</p>
            <div className="social-icons">
              <a href="#" className="social-icon" onClick={handleGoogleSignIn}>
                <FaGoogle />
              </a>
              <a href="#" className="social-icon" onClick={() => console.log('Integre com Facebook via Firebase!')}>
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon" onClick={() => console.log('Integre com GitHub via Firebase!')}>
                <FaGithub />
              </a>
              <a href="#" className="social-icon" onClick={() => console.log('Integre com LinkedIn via Firebase!')}>
                <FaLinkedinIn />
              </a>
            </div>
          </form>
        </div>

        {/* Lado de Boas-Vindas */}
        <div className="welcome-side">
          <img
            src={logo}
            alt="Logo"
            className="welcome-logo"
          />
          <h3>{isLoginMode ? 'Olá, bem-vindo!' : 'Bem-vindo de volta!'}</h3>
          <p>{isLoginMode ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}</p>
          <button onClick={toggleMode}>
            {isLoginMode ? 'Cadastre-se' : 'Entrar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
