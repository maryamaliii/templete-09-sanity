import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

// Define Product Type
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
  params: Promise<{ slug: string }>; // params is a Promise
}) {
  const { slug } = await params; // Await params before destructuring

  try {
    // Fetch products for the category
    const productsQuery = groq`
      *[_type == "shop" && category->slug.current == $slug] {
        _id,
        itemName,
        price,
        oldPrice,
        ratingStars,
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
          Category : {slug}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
              <Link href={`/shop/${product.slug.current}`}>
                <div className="relative">
                  <Image
                    src={product.imageUrl}
                    alt={product.itemName}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover mb-4 rounded-t-lg"
                  />
                  {product.tags && (
                    <span className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-lg">
                      {product.tags.join(", ")}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold">{product.itemName}</h3>
                <div className="flex items-center gap-2 text-gray-600 text-lg mb-2">
                  <span className="text-yellow-500 text-2xl">
                    {"★".repeat(product.ratingStars)}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4">
                  <p className="text-gray-800 font-bold">${product.price}</p>
                  {product.oldPrice && (
                    <p className="text-[#828282] line-through">
                      ${product.oldPrice}.00
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products. Please try again later.</div>;
  }
}

// Generate static paths
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const categoriesQuery = groq`
    *[_type == "category"] {
      slug {
        current
      }
    }
  `;

  const categories: { slug: { current: string } }[] = await client.fetch(categoriesQuery);

  return categories.map((category) => ({
    slug: category.slug.current,
  }));
}