import React, { useState } from 'react';
import { Moon, Menu, Globe, LogIn, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMosquesOpen, setIsMosquesOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-4">
            <Moon className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-600">Islamic Center</span>
          </Link>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <nav className={`absolute md:relative top-20 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent
            ${isMenuOpen ? 'block' : 'hidden'} md:block shadow-md md:shadow-none z-50`}>
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-8 p-4 md:p-0">
              {['home', 'services', 'prayer-times', 'contact'].map((item) => (
                <li key={item} className="py-2 md:py-0">
                  <a
                    href={`#${item}`}
                    className="text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    {t(`nav.${item}`)}
                  </a>
                </li>
              ))}
              <li className="relative py-2 md:py-0">
                <button
                  onClick={() => setIsMosquesOpen(!isMosquesOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <span>Mosques</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isMosquesOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {emirates.map((emirate) => (
                      <li key={emirate}>
                        <a
                          href={`#${emirate.toLowerCase()}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {emirate}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="py-2 md:py-0">
                <button onClick={toggleLanguage} className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>{i18n.language.toUpperCase()}</span>
                </button>
              </li>
              <li className="py-2 md:py-0">
                {isAuthenticated ? (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
                  >
                    <span>Admin Panel</span>
                  </Link>
                ) : (
                  <Link
                    to="/admin/auth"
                    className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>{t('nav.login')}</span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;