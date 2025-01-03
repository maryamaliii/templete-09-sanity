"use client";

import { useCart } from "@/app/context/CartContex";




const AddToCartButton = ({
  product,
}: {
  product: { id: string; name: string; price: number };
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-orange-500 text-white px-6 py-3 mb-8 rounded-md font-semibold hover:bg-orange-600 transition"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
