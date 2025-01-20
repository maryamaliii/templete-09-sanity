"use client"; 

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories from Sanity
    const fetchCategories = async () => {
      const response = await fetch("/api/categories"); // Create an API route to fetch categories
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((category: Category) => (
          <Link
            key={category._id}
            href={`/shop/category/${category.slug.current}`} // Dynamic Link
            className="bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            
                {category.name} 
                
          </Link>
        ))}
      </div>
    </div>
  );
}