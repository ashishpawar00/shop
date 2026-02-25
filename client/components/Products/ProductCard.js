import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  // Ensure product is an object and has required properties
  if (!product || typeof product !== 'object') {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="h-48 bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🌾</div>
          <h3 className="text-xl font-bold text-gray-800">{product.name || 'Product Name'}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description || 'Product description'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-semibold capitalize">
            {product.category || 'category'}
          </span>
          <Link 
            href={`/products/${product.id || '1'}`}
            className="bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;