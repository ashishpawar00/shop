import React from 'react';
import Navbar from './NavbarModern';
import Footer from './FooterModern';
import WhatsAppFloat from './WhatsAppFloatEnhanced';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Layout;
