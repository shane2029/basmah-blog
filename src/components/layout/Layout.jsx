import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-6">
        <div className="container mx-auto px-4 animate-fadeIn">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
