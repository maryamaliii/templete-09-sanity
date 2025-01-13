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
  imageUrl: string;
}

async function fetchProduct(slug: string) {
  const query = `*[_type == "shop" && slug.current == $slug][0]
  {
    itemName,
    price,
    description,
    ratingValue,
    ratingStars,
    reviewsCount,
    slug,
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
        <div className="w-full lg:w-auto">
          <Image
            src={shop.imageUrl}
            alt={shop.itemName}
            width={491}
            height={596}
            className="w-[491px] h-[596px] object-fill rounded-md shadow-lg"
          />
        </div>

        {/* Details Section */}
        <div className="flex-1 lg:w-1/2">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold mb-4">
            In Stock
          </button>
          <h1 className="text-3xl font-bold mb-4">{shop.itemName}</h1>
          <p className="text-gray-700 text-lg mb-7 leading-relaxed line-clamp-3">
            {shop.description}
          </p>
          <p className="text-xl font-semibold text-gray-800 mb-4">
            <span className="text-3xl font-bold text-black mb-6">{shop.price}.00$</span>
          </p>
          <div className="flex items-center gap-2 text-gray-600 text-lg mb-4">
            <span className="text-yellow-500 text-2xl">
              {"★".repeat(shop.ratingStars)}
            </span>
            <span>|</span>
            <span>{shop.ratingValue.toFixed(1)} Rating</span>
            <span>|</span>
            <span>{shop.reviewsCount} Reviews</span>
          </div>
          <div className="mb-8 text-lg">
            <h3 className="font-semibold mb-2">Dictum/cursus/Risus</h3>
          </div>
          <AddToCartButton
        product={{
          id: shop.slug.current,
          name: shop.itemName,
          price: shop.price,
          image:shop.imageUrl
        }}
      />
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
              <FaHeart />
              Add to Wishlist
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
              <FaExchangeAlt />
              Compare
            </button>
          </div>
          <div className="border-t pt-6">
            <p className="mb-2">
              <span className="font-semibold">Category:</span>{" "}
              <span className="text-gray-600">Pizza</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Tag:</span>{" "}
              <span className="text-gray-600">Our Shop</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Share:</span>
              <div className="flex gap-2">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Description and review tab */}
      <ProductTabs />

      {/* Similar Products Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Similar Products</h3>
        <div className="flex flex-col md:flex-row lg:flex-row gap-5">
          {shops.map((shop) => (
            <div key={shop.slug.current} className="mb-4 items-center gap-4">
              <Image
                src={shop.imageUrl}
                alt={shop.itemName}
                width={400}
                    height={300}
                    className="w-full h-64 sm:object-fill md:object-cover lg:object-cover rounded-md shadow-lg"
              />
              <div className="flex flex-col text-lg">
                <h1 className="font-semibold text-lg">{shop.itemName}</h1>
                <p className=" text-orange-500"> ${shop.price}.00</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
