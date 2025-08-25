// src/components/Login.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CosmosBackground from './cosmoBackground';
import Logo from './img/logo.png';
import { authService } from '../../services/authService';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login({
        username: username,
        password: password
      });
      
      // Redirecionar para dashboard após login bem-sucedido
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-between relative">
      {/* Left Login Page */}
      <div className="h-full bg-[#121920]/80 backdrop-blur-sm lg:w-2/5 w-full py-8 px-5 z-10">
        <form onSubmit={handleSubmit}>
          <h2 className="w-full flex flex-wrap items-center justify-between text-font-medium sm-[345px]:text-right mb-8">
            <img src={Logo} alt="Logo" className="h-12" />
            <span className="text-white">
              RCS
              <p className="text-xs text-gray-400">Somente pessoas autorizadas</p>
            </span>
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="w-full flex flex-col gap-1 mb-6">
            <label htmlFor="username" className="text-base font-medium text-gray-300">
              Nome de usuário
            </label>
            <input 
              type="text" 
              placeholder="Digite seu nome de usuário"
              className="w-full px-3 h-12 rounded-md bg-[#121920] shadow-sm text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="w-full flex flex-col gap-1 mb-6">
            <label htmlFor="password" className="text-base font-medium text-gray-300">
              Palavra-passe
            </label>
            <input 
              type="password" 
              placeholder="*****************"
              className="w-full px-3 h-12 rounded-md bg-[#121920] shadow-sm text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* REMEMBER ME */}
          <div className="mt-5 w-full flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 accent-blue-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="remember" className="cursor-pointer">
                Lembrar-me
              </label>
            </div>

            <button
              type="button"
              className="text-xs text-gray-400 hover:text-gray-300 hover:underline transition-all duration-300"
              disabled={loading}
            >
              Esqueceu sua senha?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-medium text-lg py-3 bg-gray-300 text-[#121920] rounded-md shadow-lg hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <Link to={'/'} className="flex justify-center mt-4">
            <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
              Voltar
            </p>
          </Link>
        </form>
      </div>

      {/* Fundo animado */}
      <CosmosBackground />
    </div>
  );
}