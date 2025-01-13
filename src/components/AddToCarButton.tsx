"use client";

import { useCart } from '@/app/context/CartContex';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddToCartButton = ({
  product,
}: {
  product: { id: string; name: string; price: number; image: string }; // Add image to the product object
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image, // Include the image URL
    });
    toast.success(`${product.name} has been added to the cart!`);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="bg-orange-500 text-white px-6 py-3 mb-8 rounded-md font-semibold hover:bg-orange-600 transition"
      >
        Add to Cart
      </button>
      <ToastContainer />
    </>
  );
};

export default AddToCartButton;