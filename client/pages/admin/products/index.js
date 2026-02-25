// admin/products/index.js
import { useState, useEffect } from 'react';
import AdminLayout from '../layout';
import Head from 'next/head';
import { 
  FiPackage, 
  FiEdit, 
  FiTrash2, 
  FiPlus, 
  FiSearch,
  FiFilter,
  FiEye,
  FiCheck,
  FiX
} from 'react-icons/fi';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    // Mock data - Replace with actual API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: 'उच्च उपज गेहूँ बीज',
          category: 'seeds',
          price: 850,
          stock: 150,
          status: 'active',
          createdAt: '2024-03-15',
          sales: 45
        },
        {
          id: 2,
          name: 'जैविक उर्वरक',
          category: 'fertilizers',
          price: 1200,
          stock: 80,
          status: 'active',
          createdAt: '2024-03-10',
          sales: 38
        },
        {
          id: 3,
          name: 'कीटनाशक स्प्रेयर',
          category: 'hardware',
          price: 2500,
          stock: 25,
          status: 'active',
          createdAt: '2024-03-05',
          sales: 29
        },
        {
          id: 4,
          name: 'ड्रिप सिंचाई किट',
          category: 'irrigation',
          price: 5500,
          stock: 0,
          status: 'out-of-stock',
          createdAt: '2024-02-28',
          sales: 18
        },
        {
          id: 5,
          name: 'हाइब्रिड चावल बीज',
          category: 'seeds',
          price: 950,
          stock: 200,
          status: 'active',
          createdAt: '2024-02-20',
          sales: 32
        },
        {
          id: 6,
          name: 'खाद फैलाने वाला',
          category: 'tools',
          price: 3200,
          stock: 15,
          status: 'low-stock',
          createdAt: '2024-02-15',
          sales: 22
        }
      ];
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  };

  const categories = [
    { value: 'all', label: 'सभी श्रेणियाँ' },
    { value: 'seeds', label: 'बीज' },
    { value: 'fertilizers', label: 'उर्वरक' },
    { value: 'pesticides', label: 'कीटनाशक' },
    { value: 'hardware', label: 'उपकरण' },
    { value: 'tools', label: 'औजार' },
    { value: 'irrigation', label: 'सिंचाई' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'सक्रिय';
      case 'out-of-stock': return 'स्टॉक खत्म';
      case 'low-stock': return 'कम स्टॉक';
      default: return status;
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Delete product logic
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <AdminLayout>
      <Head>
        <title>उत्पाद प्रबंधन - एडमिन पैनल</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">उत्पाद प्रबंधन</h1>
            <p className="text-gray-600">आपके सभी उत्पादों को प्रबंधित करें</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
            <FiPlus /> नया उत्पाद जोड़ें
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="उत्पाद खोजें..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-64">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <FiFilter className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">कोई उत्पाद नहीं मिला</h3>
              <p className="text-gray-600">अभी तक कोई उत्पाद नहीं जोड़ा गया है</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      उत्पाद
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      श्रेणी
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      मूल्य
                    </th>
                    <th className="px 6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      स्टॉक
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      स्थिति
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      क्रियाएं
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mr-3">
                            <FiPackage className="text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.sales} बिक्री</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {categories.find(c => c.value === product.category)?.label || product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${product.stock > 50 ? 'bg-green-500' : product.stock > 10 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${Math.min(product.stock, 100)}%` }}
                            ></div>
                          </div>
                          <span className="ml-3 text-sm text-gray-600">{product.stock}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                          {getStatusText(product.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-800 p-1">
                            <FiEye size={18} />
                          </button>
                          <button className="text-green-600 hover:text-green-800 p-1">
                            <FiEdit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(product)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <FiTrash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                उत्पाद हटाएं
              </h3>
              <p className="text-gray-600 mb-6">
                क्या आप वाकई "{productToDelete?.name}" को हटाना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती।
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FiX className="inline mr-2" />
                  रद्द करें
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FiCheck className="inline mr-2" />
                  हटाएं
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}