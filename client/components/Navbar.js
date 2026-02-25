import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useLanguage } from "../../contexts/LanguageContext";

const Navbar = () => {
  const { language, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    {
      label: t("nav.products"),
      href: "/products",
      dropdown: [
        { label: t("products.seeds"), href: "/products?category=seeds" },
        { label: t("products.fertilizers"), href: "/products?category=fertilizers" },
        { label: t("products.pesticides"), href: "/products?category=pesticides" },
        { label: t("products.hardware"), href: "/products?category=hardware" }
      ]
    },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.advisory"), href: "/advisory" },
    { label: t("nav.gallery"), href: "/gallery" },
    { label: t("nav.contact"), href: "/contact" }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
              LK
            </div>
            <div>
              <h1 className="text-lg font-bold text-green-800">
                लक्ष्मी कृषि केंद्र
              </h1>
              <p className="text-xs text-gray-500">
                25+ वर्षों का विश्वास
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 text-gray-700 hover:text-green-600">
                    {item.label}
                    <FiChevronDown />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-600"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600"
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Language Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => changeLanguage("hi")}
                className={`px-2 py-1 rounded text-sm ${
                  language === "hi"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-1 rounded text-sm ${
                  language === "en"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-2">
          {navItems.map((item) =>
            item.dropdown ? (
              <details key={item.label}>
                <summary className="flex justify-between items-center cursor-pointer py-2">
                  {item.label}
                  <FiChevronDown />
                </summary>
                <div className="pl-4">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block py-1 text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="block py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}

          {/* Mobile Language Toggle */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => changeLanguage("hi")}
              className={`px-3 py-1 rounded ${
                language === "hi"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`px-3 py-1 rounded ${
                language === "en"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
