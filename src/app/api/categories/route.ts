import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

// Categories Fetch Karne Ke Liye Query
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
  const categories = await client.fetch(categoriesQuery);
  return NextResponse.json(categories);
}