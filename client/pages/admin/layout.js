// admin/layout.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  FiHome, 
  FiPackage, 
  FiMessageSquare, 
  FiFileText, 
  FiUsers,
  FiLogOut,
  FiMenu,
  FiX,
  FiSettings,
  FiBarChart2
} from 'react-icons/fi';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { href: '/admin/dashboard', icon: <FiHome />, label: 'डैशबोर्ड' },
    { href: '/admin/products', icon: <FiPackage />, label: 'उत्पाद' },
    { href: '/admin/enquiries', icon: <FiMessageSquare />, label: 'पूछताछ' },
    { href: '/admin/posts', icon: <FiFileText />, label: 'पोस्ट्स' },
    { href: '/admin/advisory', icon: <FiUsers />, label: 'सलाहकार सेवा' },
    { href: '/admin/settings', icon: <FiSettings />, label: 'सेटिंग्स' },
  ];

  const handleLogout = () => {
    // Clear admin session/token
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">लक्ष्मी कृषि एडमिन</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-green-800 text-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-green-700">
            <h1 className="text-xl font-bold">लक्ष्मी कृषि केंद्र</h1>
            <p className="text-green-200 text-sm mt-1">एडमिन पैनल</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${router.pathname === item.href 
                    ? 'bg-green-700 text-white' 
                    : 'hover:bg-green-700/50 text-green-100'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-green-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-green-700 text-green-100 transition-colors"
            >
              <FiLogOut />
              <span>लॉगआउट</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}