import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsJournalText } from 'react-icons/bs';
import { FiUser, FiMail } from 'react-icons/fi';

const Navigation = ({ mobile, setIsMenuOpen }) => {
  const navItems = [
    { 
      name: 'Home', 
      path: '/',
      icon: <AiOutlineHome className="h-5 w-5" />
    },
    { 
      name: 'Blog', 
      path: '/blog',
      icon: <BsJournalText className="h-5 w-5" />
    },
    { 
      name: 'About', 
      path: '/about',
      icon: <FiUser className="h-5 w-5" />
    },
    { 
      name: 'Contact', 
      path: '/contact',
      icon: <FiMail className="h-5 w-5" />
    },
  ];

  const handleClick = () => {
    if (mobile && setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={mobile ? 'space-y-2' : 'flex items-center space-x-1'}>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={handleClick}
          className={({ isActive }) => {
            return mobile 
              ? `flex items-center py-3 px-4 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary-light text-secondary font-medium' 
                    : 'text-gray-600 hover:text-secondary hover:bg-gray-100'
                }`
              : `px-4 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary-light text-secondary font-medium' 
                    : 'text-gray-600 hover:text-secondary hover:bg-gray-100'
                }`;
          }}
          end
        >
          {mobile ? (
            <div className="flex items-center">
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </div>
          ) : (
            item.name
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;