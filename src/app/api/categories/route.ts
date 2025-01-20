import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

// Define Category Type
interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
}

const categoriesQuery = groq`
  *[_type == "category"] {
    _id,
    name,
    slug {
      current
    }
  }
`;

export async function GET() {
  try {
    const categories: Category[] = await client.fetch(categoriesQuery);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}