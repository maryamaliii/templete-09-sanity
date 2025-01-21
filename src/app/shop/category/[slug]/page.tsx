// app/shop/category/[slug]/page.tsx
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: string;
  itemName: string;
  price: number;
  oldPrice?: number;
  description: string;
  ratingValue: number;
  ratingStars: number;
  reviewsCount: number;
  imageUrl: string;
  slug: { current: string };
  tags?: string[];
  category: {
    _id: string;
    name: string;
    slug: { current: string };
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Sanity se products fetch karna
  const productsQuery =`
    *[_type == "shop" && category->slug.current == $slug] {
      _id,
      itemName,
      price,
      oldPrice,
      description,
      ratingValue,
      ratingStars,
      reviewsCount,
      "imageUrl": image.asset->url,
      slug,
      tags,
      category-> {
        _id,
        name,
        slug
      }
    }
  `;

  const products: Product[] = await client.fetch(productsQuery, { slug });

  return (
    <div className="p-4 m-10">
      <h1 className="text-2xl text-[#FF9F0D] font-bold mb-10">
        Category: {slug.replace(/-/g, ' ')}
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products found in this category</p>
          <Link href="/shop" className="mt-4 inline-block text-blue-600 hover:underline">
            Back to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product._id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Link href={`/shop/${product.slug.current}`}>
                <div className="relative aspect-square">
                  <Image
                    src={product.imageUrl}
                    alt={product.itemName}
                    fill
                    className="w-full h-full object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {product.tags && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-sm">
                      {product.tags[0]}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{product.itemName}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-500">
                      {'★'.repeat(Math.floor(product.ratingStars))}
                    </span>
                    <span className="text-gray-600 text-sm">
                      ({product.reviewsCount} reviews)
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xl font-bold">${product.price}</span>
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Static generation ke liye paths generate karna
export async function generateStaticParams() {
  const query =`
    *[_type == "category"] {
      slug {
        current
      }
    }
  `;

  const categories = await client.fetch<{ slug: { current: string } }[]>(query);

  return categories.map((category) => ({
    slug: category.slug.current,
  }));
}

// ISR enable karna
export const revalidate = 3600; // 1 hour mein revalidate