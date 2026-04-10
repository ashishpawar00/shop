import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import {
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiMail,
  FiCheckCircle,
  FiMessageSquare,
  FiUser,
  FiHome
} from "react-icons/fi";
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { API_URL } from "@/lib/api";

export default function Contact() {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    village: "",
    cropType: "",
    enquiryType: "general",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Enquiry types
  const enquiryTypes = [
    { value: "general", label: language === 'hi' ? 'सामान्य पूछताछ' : 'General Enquiry' },
    { value: "product", label: language === 'hi' ? 'उत्पाद जानकारी' : 'Product Information' },
    { value: "price", label: language === 'hi' ? 'मूल्य जानकारी' : 'Price Information' },
    { value: "technical", label: language === 'hi' ? 'तकनीकी सहायता' : 'Technical Support' },
    { value: "bulk", label: language === 'hi' ? 'थोक खरीद' : 'Bulk Purchase' }
  ];

  // Crop types
  const cropTypes = [
    { value: "", label: language === 'hi' ? 'फसल चुनें' : 'Select Crop' },
    { value: "wheat", label: language === 'hi' ? 'गेहूं' : 'Wheat' },
    { value: "rice", label: language === 'hi' ? 'धान' : 'Rice' },
    { value: "cotton", label: language === 'hi' ? 'कपास' : 'Cotton' },
    { value: "sugarcane", label: language === 'hi' ? 'गन्ना' : 'Sugarcane' },
    { value: "vegetables", label: language === 'hi' ? 'सब्जियां' : 'Vegetables' },
    { value: "pulses", label: language === 'hi' ? 'दलहन' : 'Pulses' },
    { value: "oilseeds", label: language === 'hi' ? 'तिलहन' : 'Oilseeds' },
    { value: "other", label: language === 'hi' ? 'अन्य' : 'Other' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          village: formData.village || undefined,
          message: `[${formData.enquiryType}] ${formData.cropType ? `(${formData.cropType}) ` : ''}${formData.message}`
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed');
      }

      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        village: "",
        cropType: "",
        enquiryType: "general",
        message: ""
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(language === 'hi'
        ? 'कुछ गलत हुआ। कृपया पुनः प्रयास करें।'
        : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social media links
  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaYoutube, href: "#", label: "YouTube" }
  ];

  return (
    <>
      <Head>
        <title>{language === 'hi' ? 'संपर्क करें - लक्ष्मी कृषि केंद्र' : 'Contact Us - Laxmi Krashi Kendra'}</title>
        <meta name="description" content={language === 'hi'
          ? 'लक्ष्मी कृषि केंद्र से संपर्क करें। कॉल: 9977938192, व्हाट्सएप या पूछताछ फॉर्म भरें। सिराथा में स्थित।'
          : 'Contact Laxmi Krashi Kendra. Call: 9977938192, WhatsApp or fill enquiry form. Located in Siratha.'} />
      </Head>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-green-600 transition-colors">
                {language === 'hi' ? 'होम' : 'Home'}
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li aria-current="page" className="text-green-600 font-semibold">
              {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </li>
          </ol>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {language === 'hi' ? 'हमसे संपर्क करें' : 'Get In Touch'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'hi'
              ? 'हमारी टीम आपकी सभी कृषि समस्याओं का समाधान करने के लिए तैयार है'
              : 'Our team is ready to help you with all your agricultural needs'}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Call Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-4">
              <FiPhone size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {language === 'hi' ? 'फोन करें' : 'Call Us'}
            </h3>
            <a
              href="tel:9977938192"
              className="text-2xl font-bold text-green-700 hover:text-green-800 transition-colors block mb-2"
            >
              9977938192
            </a>
            <p className="text-gray-600 text-sm">
              {language === 'hi' ? '24/7 कॉल सपोर्ट' : '24/7 Call Support'}
            </p>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-4">
              <FaWhatsapp size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              WhatsApp
            </h3>
            <a
              href="https://wa.me/919977938192"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold text-green-700 hover:text-green-800 transition-colors block mb-2"
            >
              9977938192
            </a>
            <p className="text-gray-600 text-sm">
              {language === 'hi' ? 'तुरंत जवाब' : 'Instant Response'}
            </p>
          </div>

          {/* Visit Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-4">
              <FiMapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {language === 'hi' ? 'स्टोर पर आएं' : 'Visit Store'}
            </h3>
            <p className="text-gray-600 mb-2">
              {language === 'hi' ? 'बस स्टैंड चौक, सिराथा' : 'Bus Stand Chowk, Siratha'}
            </p>
            <p className="text-sm text-gray-500">
              {language === 'hi' ? 'पिन: 480334' : 'Pin: 480334'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FiClock className="text-green-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">
                  {language === 'hi' ? 'कार्य समय' : 'Business Hours'}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium">{language === 'hi' ? 'सोमवार - शनिवार' : 'Monday - Saturday'}</span>
                  <span className="font-semibold text-green-600">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium">{language === 'hi' ? 'रविवार' : 'Sunday'}</span>
                  <span className="font-semibold text-green-600">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium">{language === 'hi' ? 'आपातकालीन' : 'Emergency'}</span>
                  <span className="font-semibold text-green-600">
                    <a href="tel:9977938192" className="hover:text-green-700">9977938192</a>
                  </span>
                </div>
              </div>

              {/* Holiday Notice */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                <p className="text-sm text-yellow-700">
                  {language === 'hi'
                    ? '📌 ध्यान दें: सभी राष्ट्रीय अवकाशों पर स्टोर बंद रहेगा।'
                    : '📌 Note: Store will be closed on all national holidays.'}
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {language === 'hi' ? 'हमें फॉलो करें' : 'Follow Us'}
              </h3>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-100 text-gray-600 hover:bg-green-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">📍</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {language === 'hi' ? 'हमारा स्थान' : 'Our Location'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'hi' ? 'गूगल मैप्स पर देखें' : 'View on Google Maps'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-8">
              <FiMessageSquare className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">
                {language === 'hi' ? 'पूछताछ फॉर्म' : 'Enquiry Form'}
              </h2>
            </div>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
                <FiCheckCircle className="mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold">
                    {language === 'hi'
                      ? 'धन्यवाद! आपकी पूछताछ सफलतापूर्वक भेज दी गई है।'
                      : 'Thank you! Your enquiry has been submitted successfully.'}
                  </p>
                  <p className="text-sm mt-1">
                    {language === 'hi'
                      ? 'हम जल्द ही आपसे संपर्क करेंगे।'
                      : 'We will contact you soon.'}
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'आपका नाम *' : 'Your Name *'}
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    required
                    type="text"
                    placeholder={language === 'hi' ? 'आपका पूरा नाम' : 'Your full name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'फोन नंबर *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                      required
                      type="tel"
                      placeholder={language === 'hi' ? '9876543210' : '9876543210'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'ईमेल' : 'Email'}
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      placeholder={language === 'hi' ? 'आपका@ईमेल.com' : 'your@email.com'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Village & Crop Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'गाँव / शहर' : 'Village / City'}
                  </label>
                  <div className="relative">
                    <FiHome className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder={language === 'hi' ? 'आपका गाँव या शहर' : 'Your village or city'}
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'फसल प्रकार' : 'Crop Type'}
                  </label>
                  <select
                    value={formData.cropType}
                    onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  >
                    {cropTypes.map((crop) => (
                      <option key={crop.value} value={crop.value}>
                        {crop.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Enquiry Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'पूछताछ प्रकार' : 'Enquiry Type'}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {enquiryTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, enquiryType: type.value })}
                      className={`px-4 py-2 rounded-lg border transition ${formData.enquiryType === type.value
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'आपकी पूछताछ *' : 'Your Enquiry *'}
                </label>
                <textarea
                  required
                  rows="5"
                  placeholder={language === 'hi'
                    ? 'कृपया अपनी पूछताछ विस्तार से लिखें...'
                    : 'Please write your enquiry in detail...'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {language === 'hi' ? 'भेज रहे हैं...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <FiSend className="mr-3" />
                    {language === 'hi' ? 'संदेश भेजें' : 'Send Message'}
                  </>
                )}
              </button>

              {/* Privacy Notice */}
              <p className="text-center text-sm text-gray-500">
                {language === 'hi'
                  ? 'हम आपकी जानकारी गोपनीय रखेंगे।'
                  : 'We will keep your information confidential.'}
              </p>
            </form>
          </div>
        </div>

        {/* WhatsApp Quick Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <a
            href="https://wa.me/919977938192"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={28} />
          </a>
        </div>
      </main>
    </>
  );
}