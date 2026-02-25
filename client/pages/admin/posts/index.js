// admin/posts/index.js
import { useState, useEffect } from 'react';
import AdminLayout from '../layout';
import Head from 'next/head';
import { 
  FiFileText, 
  FiEdit, 
  FiTrash2, 
  FiPlus, 
  FiEye,
  FiCalendar,
  FiUser,
  FiCheck,
  FiX
} from 'react-icons/fi';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    status: 'draft',
    image: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    // Mock data - Replace with actual API call
    setTimeout(() => {
      const mockPosts = [
        {
          id: 1,
          title: 'गेहूँ की नई किस्म - उच्च उपज',
          content: 'इस नई किस्म में रोग प्रतिरोधक क्षमता अधिक है और उपज पारंपरिक किस्मों से 20% अधिक है।',
          category: 'farming-tips',
          author: 'डॉ. राजेश शर्मा',
          date: '2024-04-05',
          status: 'published',
          views: 245
        },
        {
          id: 2,
          title: 'जैविक खेती के लाभ',
          content: 'जैविक खेती से न केवल उत्पाद की गुणवत्ता बढ़ती है बल्कि मिट्टी की उर्वरता भी बनी रहती है।',
          category: 'organic-farming',
          author: 'सीता देवी',
          date: '2024-03-28',
          status: 'published',
          views: 189
        },
        {
          id: 3,
          title: 'मौसम पूर्वानुमान अप्रैल 2024',
          content: 'इस महीने सामान्य से कम बारिश की संभावना है, किसान भाई समय पर सिंचाई की व्यवस्था करें।',
          category: 'weather',
          author: 'मौसम विभाग',
          date: '2024-03-30',
          status: 'published',
          views: 312
        },
        {
          id: 4,
          title: 'कीट प्रबंधन के आधुनिक तरीके',
          content: 'नई तकनीकों के साथ कीट प्रबंधन करने से उत्पादन लागत कम होती है और पर्यावरण सुरक्षित रहता है।',
          category: 'pest-control',
          author: 'कृषि वैज्ञानिक',
          date: '2024-03-25',
          status: 'draft',
          views: 0
        },
        {
          id: 5,
          title: 'सरकारी योजनाओं का लाभ उठाएं',
          content: 'केंद्र और राज्य सरकार की विभिन्न कृषि योजनाओं के बारे में पूरी जानकारी।',
          category: 'government-schemes',
          author: 'विजय कुमार',
          date: '2024-03-20',
          status: 'published',
          views: 156
        }
      ];
      setPosts(mockPosts);
      setLoading(false);
    }, 800);
  };

  const categories = [
    { value: 'general', label: 'सामान्य' },
    { value: 'farming-tips', label: 'खेती के टिप्स' },
    { value: 'organic-farming', label: 'जैविक खेती' },
    { value: 'weather', label: 'मौसम' },
    { value: 'pest-control', label: 'कीट नियंत्रण' },
    { value: 'government-schemes', label: 'सरकारी योजनाएं' },
    { value: 'success-stories', label: 'सफलता की कहानियां' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'ड्राफ्ट' },
    { value: 'published', label: 'प्रकाशित' },
    { value: 'archived', label: 'आर्काइव' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingPost.id ? { ...post, ...formData } : post
      ));
    } else {
      // Add new post
      const newPost = {
        id: posts.length + 1,
        ...formData,
        author: 'एडमिन',
        date: new Date().toISOString().split('T')[0],
        views: 0
      };
      setPosts([newPost, ...posts]);
    }
    
    resetForm();
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      category: post.category,
      status: post.status,
      image: ''
    });
    setShowForm(true);
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setPosts(posts.filter(p => p.id !== postToDelete.id));
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'general',
      status: 'draft',
      image: ''
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const getCategoryLabel = (categoryValue) => {
    return categories.find(c => c.value === categoryValue)?.label || categoryValue;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'published': return 'प्रकाशित';
      case 'draft': return 'ड्राफ्ट';
      case 'archived': return 'आर्काइव';
      default: return status;
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>पोस्ट प्रबंधन - एडमिन पैनल</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">पोस्ट प्रबंधन</h1>
            <p className="text-gray-600">ब्लॉग और सूचना पोस्ट प्रबंधित करें</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <FiPlus /> नई पोस्ट
          </button>
        </div>

        {/* Create/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">
                {editingPost ? 'पोस्ट संपादित करें' : 'नई पोस्ट बनाएं'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    शीर्षक *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="पोस्ट का शीर्षक"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    श्रेणी
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  सामग्री *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="8"
                  placeholder="पोस्ट की सामग्री लिखें..."
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    स्थिति
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    छवि URL (वैकल्पिक)
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editingPost ? 'अपडेट करें' : 'प्रकाशित करें'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">कोई पोस्ट नहीं मिली</h3>
              <p className="text-gray-600">अभी तक कोई पोस्ट नहीं बनाई गई है</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {posts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Post Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800">{post.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <FiUser /> {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiCalendar /> {post.date}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                              {getCategoryLabel(post.category)}
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(post.status)}`}>
                          {getStatusText(post.status)}
                        </span>
                      </div>
                      
                      <p className="mt-4 text-gray-600 line-clamp-2">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                        <span>👁️ {post.views} दृश्य</span>
                        {post.status === 'published' && (
                          <button className="text-blue-600 hover:text-blue-700">
                            लाइव देखें →
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:w-32 flex lg:flex-col gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
                      >
                        <FiEdit />
                        संपादित
                      </button>
                      <button
                        onClick={() => handleDeleteClick(post)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                      >
                        <FiTrash2 />
                        हटाएं
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
                पोस्ट हटाएं
              </h3>
              <p className="text-gray-600 mb-6">
                क्या आप वाकई "{postToDelete?.title}" को हटाना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती।
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