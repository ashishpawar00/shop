// admin/enquiries/index.js
import { useState, useEffect } from 'react';
import AdminLayout from '../layout';
import Head from 'next/head';
import { 
  FiMessageSquare, 
  FiCheck, 
  FiX, 
  FiEye,
  FiFilter,
  FiCalendar,
  FiPhone,
  FiMail
} from 'react-icons/fi';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    // Mock data - Replace with actual API call
    setTimeout(() => {
      const mockEnquiries = [
        {
          id: 1,
          name: 'राम सिंह',
          email: 'ram@example.com',
          phone: '+91 9876543210',
          product: 'गेहूँ बीज',
          message: 'इस बीज की अंकुरण दर क्या है? क्या यह हमारे क्षेत्र के लिए उपयुक्त है?',
          status: 'pending',
          date: '2024-04-10 14:30',
          source: 'वेबसाइट'
        },
        {
          id: 2,
          name: 'सीता देवी',
          email: 'sita@example.com',
          phone: '+91 9876543211',
          product: 'जैविक उर्वरक',
          message: 'इस उर्वरक की कीमत थोक खरीद पर क्या होगी? डिलीवरी समय?',
          status: 'completed',
          date: '2024-04-09 11:15',
          source: 'फोन'
        },
        {
          id: 3,
          name: 'मोहन लाल',
          email: 'mohan@example.com',
          phone: '+91 9876543212',
          product: 'कीटनाशक स्प्रेयर',
          message: 'क्या आपके पास मोटर वाला स्प्रेयर भी है? वारंटी कितने साल की है?',
          status: 'pending',
          date: '2024-04-08 16:45',
          source: 'वेबसाइट'
        },
        {
          id: 4,
          name: 'गीता शर्मा',
          email: 'geeta@example.com',
          phone: '+91 9876543213',
          product: 'ड्रिप सिंचाई किट',
          message: 'कृपया मुझे 5 एकड़ के लिए किट की कीमत और तकनीकी विशेषताएं भेजें।',
          status: 'in-progress',
          date: '2024-04-07 09:20',
          source: 'ईमेल'
        },
        {
          id: 5,
          name: 'राजेश कुमार',
          email: 'rajesh@example.com',
          phone: '+91 9876543214',
          product: 'हाइब्रिड चावल बीज',
          message: 'क्या यह बीज बाढ़ प्रतिरोधी है? उपज कितनी होती है?',
          status: 'pending',
          date: '2024-04-06 13:10',
          source: 'वेबसाइट'
        }
      ];
      setEnquiries(mockEnquiries);
      setLoading(false);
    }, 800);
  };

  const statusOptions = [
    { value: 'all', label: 'सभी' },
    { value: 'pending', label: 'लंबित' },
    { value: 'in-progress', label: 'प्रगति पर' },
    { value: 'completed', label: 'पूर्ण' }
  ];

  const filteredEnquiries = selectedStatus === 'all' 
    ? enquiries 
    : enquiries.filter(e => e.status === selectedStatus);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'लंबित';
      case 'in-progress': return 'प्रगति पर';
      case 'completed': return 'पूर्ण';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('hi-IN');
  };

  const handleStatusChange = (id, newStatus) => {
    setEnquiries(enquiries.map(enquiry => 
      enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
    ));
  };

  return (
    <AdminLayout>
      <Head>
        <title>पूछताछ प्रबंधन - एडमिन पैनल</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">पूछताछ प्रबंधन</h1>
          <p className="text-gray-600">ग्राहक पूछताछ को प्रबंधित करें</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">कुल पूछताछ</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">{enquiries.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiMessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">लंबित</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {enquiries.filter(e => e.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FiMessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">पूर्ण</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {enquiries.filter(e => e.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiMessageSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <h3 className="font-medium text-gray-700">स्थिति फ़िल्टर</h3>
            </div>
            <div className="flex gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`px-4 py-2 rounded-lg transition-colors ${selectedStatus === status.value 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enquiries List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">कोई पूछताछ नहीं मिली</h3>
              <p className="text-gray-600">अभी तक कोई पूछताछ नहीं आई है</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Enquiry Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800">{enquiry.name}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <FiMail /> {enquiry.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiPhone /> {enquiry.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiCalendar /> {formatDate(enquiry.date)}
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(enquiry.status)}`}>
                          {getStatusText(enquiry.status)}
                        </span>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-gray-700">
                          <strong>उत्पाद:</strong> {enquiry.product}
                        </p>
                        <p className="mt-2 text-gray-600">
                          <strong>संदेश:</strong> {enquiry.message}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          <strong>स्रोत:</strong> {enquiry.source}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:w-48 flex lg:flex-col gap-2">
                      <button
                        onClick={() => setSelectedEnquiry(selectedEnquiry?.id === enquiry.id ? null : enquiry)}
                        className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${selectedEnquiry?.id === enquiry.id 
                          ? 'bg-gray-100 text-gray-700' 
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                      >
                        <FiEye />
                        {selectedEnquiry?.id === enquiry.id ? 'कम करें' : 'विवरण'}
                      </button>
                      
                      {enquiry.status !== 'completed' && (
                        <button
                          onClick={() => handleStatusChange(enquiry.id, 'completed')}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg"
                        >
                          <FiCheck />
                          पूर्ण करें
                        </button>
                      )}
                      
                      {enquiry.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(enquiry.id, 'in-progress')}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
                        >
                          प्रगति पर
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedEnquiry?.id === enquiry.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">अतिरिक्त जानकारी</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">संपर्क विवरण:</p>
                          <p className="font-medium">ईमेल: {enquiry.email}</p>
                          <p className="font-medium">फोन: {enquiry.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">तिथि और समय:</p>
                          <p className="font-medium">{formatDate(enquiry.date)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <textarea
                          placeholder="उत्तर लिखें..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          rows="3"
                        ></textarea>
                        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                          उत्तर भेजें
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}