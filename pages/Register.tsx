import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login(email, name);
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 animate-fade-in-up">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-black uppercase text-slate-900 dark:text-white tracking-tighter">
            Vytvořit účet
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Staňte se členem StyleHub komunity
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">Jméno</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-4 border border-slate-300 dark:border-white/20 placeholder-slate-500 text-slate-900 dark:text-white dark:bg-white/5 focus:outline-none focus:ring-black focus:border-black dark:focus:border-white sm:text-sm"
                placeholder="Vaše jméno"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-4 border border-slate-300 dark:border-white/20 placeholder-slate-500 text-slate-900 dark:text-white dark:bg-white/5 focus:outline-none focus:ring-black focus:border-black dark:focus:border-white sm:text-sm"
                placeholder="Emailová adresa"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Heslo</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-4 border border-slate-300 dark:border-white/20 placeholder-slate-500 text-slate-900 dark:text-white dark:bg-white/5 focus:outline-none focus:ring-black focus:border-black dark:focus:border-white sm:text-sm"
                placeholder="Heslo"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold uppercase tracking-widest text-white bg-black dark:bg-white dark:text-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center gap-2">
                  Zaregistrovat se <UserPlus size={18} />
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Již máte účet?{' '}
            <Link to="/login" className="font-bold text-black dark:text-white hover:underline">
              Přihlaste se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;