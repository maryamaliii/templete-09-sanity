
import AddToCartButton from "@/components/AddToCarButton";
import PageHeader from "@/components/PageHeader";
import ProductTabs from "@/components/ProductTabs";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { FaHeart, FaExchangeAlt } from "react-icons/fa";

interface ShopDetails {
  itemName: string;
  price: number;
  description: string;
  ratingValue: number;
  ratingStars: number;
  reviewsCount: number;
  slug: { current: string };
  tags: string;
  category: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
  };
  oldPrice: number;
  imageUrl: string;
}

async function fetchProduct(slug: string) {
  const query = `*[_type == "shop" && slug.current == $slug][0] {
    itemName,
    price,
    description,
    ratingValue,
    ratingStars,
    reviewsCount,
    slug,
    tags,
    category-> { 
      _id,
      name,
      slug {
        current
      }
    },
    oldPrice,
    "imageUrl": image.asset->url
  }`;
  const shop: ShopDetails = await client.fetch(query, { slug });
  return shop;
}

async function fetchSimilarProducts() {
  const query = `*[_type == "shop"][0...4]{
    itemName,
    price,
    ratingStars,
    slug,
    "imageUrl": image.asset->url
  }`;
  const shops: ShopDetails[] = await client.fetch(query);
  return shops;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const shop = await fetchProduct(slug);
  const shops = await fetchSimilarProducts();

  if (!shop) return <p>Product not found</p>;

  return (
    <div className="bg-white">
      <PageHeader title="Shop Detail" currentPage="Shop Detail" />
      <div className="container mx-auto mt-10 px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative">
            {shop.tags ? (
              <span className="absolute top-4 left-4 bg-orange-500 bg-opacity-75 text-white px-2 py-1 rounded-lg text-sm">
                {shop.tags}
              </span>
            ) : null}
            <Image
              src={shop.imageUrl}
              alt={shop.itemName}
              width={491}
              height={596}
              className="w-full h-auto sm:w-[491px] sm:h-[596px] object-cover rounded-md shadow-lg"
            />
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold mb-2 md:mb-4">
              In Stock
            </button>
            <h1 className="text-2xl sm:text-3xl font- mb-2 md:mb-4">{shop.itemName}</h1>
            <p className="text-gray-700 text-base sm:text-lg mb-3 md:mb-7 leading-relaxed">
              {shop.description}
            </p>
            <div className="flex gap-4 text-xl font-semibold text-gray-800 mb-2 md:mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-black mb-2 md:mb-6">
                ${shop.price}.00
              </span>
              {shop.oldPrice ? (
                <p className="text-[#828282] line-through">${shop.oldPrice}.00</p>
              ) : null}
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-base sm:text-lg  md:mb-4">
              <span className="text-yellow-500 text-2xl">
                {"★".repeat(shop.ratingStars)}
              </span>
              <span>|</span>
              <span>{shop.ratingValue.toFixed(1)} Rating</span>
              <span>|</span>
              <span>{shop.reviewsCount} Reviews</span>
            </div>
            <div className="md:mb-8 mb-3 text-lg">
              <h3 className="font-semibold mb-2">Dictum/cursus/Risus</h3>
            </div>
            <AddToCartButton
              product={{
                id: shop.slug.current,
                name: shop.itemName,
                price: shop.price,
                image: shop.imageUrl,
              }}
            />
            <div className="flex items-center gap-6  md:mt-6">
              <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
                <FaHeart />
                <span className="text-sm sm:text-base">Add to Wishlist</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
                <FaExchangeAlt />
                <span className="text-sm sm:text-base">Compare</span>
              </button>
            </div>
            <div className="border-t pt-6 mt-3 md:mt-6">
              <p className="mb-2 text-sm sm:text-base">
                <span className="font-semibold">Category:</span>{" "}
                <span className="text-gray-600">{shop.category.name}</span>
              </p>
              <p className="mb-2 text-sm sm:text-base">
                <span className="font-semibold">Tag:</span>{" "}
                <span className="text-gray-600">Our Shop</span>
              </p>
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <span className="font-semibold">Share:</span>
                <div className="flex gap-2">
                  {/* Add social media icons here */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Description and review tab */}
        <ProductTabs />

        {/* Similar Products Section */}
        <div className="mt-4 md:mt-10">
          <h3 className="text-2xl font-semibold mb-2 md:mb-4">Similar Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {shops.map((shop) => (
              <div key={shop.slug.current} className="mb-4">
                <Image
                  src={shop.imageUrl}
                  alt={shop.itemName}
                  width={400}
                  height={300}
                  className="w-full h-48 sm:h-64 object-cover rounded-md shadow-lg"
                />
                <div className="flex flex-col text-lg mt-2">
                  <h1 className="font-semibold text-base sm:text-lg">{shop.itemName}</h1>
                  <p className="text-orange-500 text-base sm:text-lg">${shop.price}.00</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}