import Head from "next/head";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Sample gallery categories and images (replace with actual data)
  const galleryCategories = [
    { id: "all", name: "सभी" },
    { id: "store", name: "दुकान" },
    { id: "products", name: "उत्पाद" },
    { id: "farm", name: "खेत" },
    { id: "customers", name: "ग्राहक" },
  ];
  
  const galleryImages = [
    { id: 1, src: "/images/store-front.jpg", alt: "लक्ष्मी कृषि केंद्र दुकान", category: "store" },
    { id: 2, src: "/images/seeds-display.jpg", alt: "बीज प्रदर्शन", category: "products" },
    { id: 3, src: "/images/fertilizers.jpg", alt: "उर्वरक और कीटनाशक", category: "products" },
    { id: 4, src: "/images/farm-visit.jpg", alt: "किसान भ्रमण", category: "farm" },
    { id: 5, src: "/images/customer-service.jpg", alt: "ग्राहक सेवा", category: "customers" },
    { id: 6, src: "/images/tools.jpg", alt: "कृषि उपकरण", category: "products" },
    { id: 7, src: "/images/store-interior.jpg", alt: "दुकान आंतरिक भाग", category: "store" },
    { id: 8, src: "/images/field-demo.jpg", alt: "खेत प्रदर्शन", category: "farm" },
  ];
  
  // Filter images based on active category
  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);
  
  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <Head>
        <title>गैलरी - लक्ष्मी कृषि केंद्र</title>
        <meta name="description" content="लक्ष्मी कृषि केंद्र की दुकान, उत्पाद और गतिविधियों की तस्वीरें देखें" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 to-emerald-800 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center">हमारी गैलरी</h1>
            <p className="mt-4 text-lg text-center text-green-100 max-w-3xl mx-auto">
              लक्ष्मी कृषि केंद्र की दुकान, उत्पाद और किसान भाइयों के साथ हमारी गतिविधियों की झलक
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 opacity-20">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 opacity-20">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Category Filter */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">श्रेणी देखें</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {galleryCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-white text-gray-700 border border-green-200 hover:bg-green-50'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <p className="text-center text-gray-600">
              {activeCategory === "all" 
                ? "सभी {galleryImages.length} तस्वीरें दिखाई जा रही हैं" 
                : `${galleryCategories.find(c => c.id === activeCategory)?.name} श्रेणी की ${filteredImages.length} तस्वीरें दिखाई जा रही हैं`}
            </p>
          </div>
          
          {/* Gallery Grid */}
          {!imagesLoaded ? (
            // Loading Skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse"></div>
              ))}
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map(image => (
                <div 
                  key={image.id} 
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 bg-white"
                >
                  {/* Image placeholder with fallback */}
                  <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <div className="text-center p-4">
                      <svg className="w-16 h-16 mx-auto text-green-300 mb-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="text-green-600 font-medium">{image.alt}</p>
                      <p className="text-sm text-green-500 mt-1">(तस्वीर जल्द ही उपलब्ध होगी)</p>
                    </div>
                  </div>
                  
                  {/* Image overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold">{image.alt}</h3>
                      <p className="text-sm text-green-100 mt-1">
                        {galleryCategories.find(c => c.id === image.category)?.name}
                      </p>
                    </div>
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                    {galleryCategories.find(c => c.id === image.category)?.name}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty state
            <div className="text-center py-16">
              <div className="inline-block p-6 bg-green-100 rounded-full mb-6">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">इस श्रेणी में अभी तस्वीरें उपलब्ध नहीं हैं</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                हम जल्द ही {galleryCategories.find(c => c.id === activeCategory)?.name} श्रेणी की तस्वीरें अपलोड करेंगे। कृपया अन्य श्रेणियां देखें।
              </p>
            </div>
          )}
          
          {/* Coming Soon Notice */}
          <div className="mt-16 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-amber-800 mb-3">जल्द ही और अधिक तस्वीरें!</h3>
            <p className="text-amber-700">
              हम अपनी गैलरी को और समृद्ध करने के लिए नई तस्वीरें जोड़ने की प्रक्रिया में हैं। 
              जल्द ही दुकान, उत्पाद और किसान भाइयों के साथ हमारे कार्यक्रमों की वास्तविक तस्वीरें उपलब्ध होंगी।
            </p>
            <div className="mt-4 flex justify-center">
              <span className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                अपडेट के लिए बने रहें
              </span>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">अपनी तस्वीर साझा करें</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              क्या आपने लक्ष्मी कृषि केंद्र से कोई उत्पाद खरीदा है? अपने खेत या उपज की तस्वीरें हमारे साथ साझा करें, 
              और हो सकता है कि वे हमारी गैलरी में दिखाई दें!
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              तस्वीर अपलोड करें
            </button>
          </div>
        </div>
      </div>
    </>
  );
}