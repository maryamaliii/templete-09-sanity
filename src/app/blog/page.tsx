"use client"; // Client-side rendering ke liye

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { GoArrowUpRight } from "react-icons/go";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { CiSearch, CiMenuBurger } from "react-icons/ci";

interface Blog {
  heading: string;
  paragraph1: string;
  image1Url: string;
  slug: { current: string };
}

export default function FetchBlogs() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query ke liye state
  const [blogs, setBlogs] = useState<Blog[]>([]); // Sanity se fetch kiye gaye blogs
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]); // Filtered blogs ke liye state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state

  // Fetch blogs from Sanity
  useEffect(() => {
    const fetchData = async () => {
      const query = `
        *[_type == "blog"]{
          "image1Url": image1.asset->url,
          heading,
          paragraph1,
          slug
        }
      `;
      const data: Blog[] = await client.fetch(query);
      setBlogs(data);
      setFilteredBlogs(data); // Initially, all blogs are shown
    };

    fetchData();
  }, []);

  // Filter blogs based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = blogs.filter((blog) =>
        blog.heading.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs); // If search query is empty, show all blogs
    }
  }, [searchQuery, blogs]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <PageHeader title="Blog" currentPage="Blog" />

      {/* Toggle Button and Search Bar (Fixed Below PageHeader) */}
      <div className="lg:hidden top-24 left-0 right-0 bg-white z-50 mt-4 p-4">
        <div className="flex  justify-between items-center">
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="bg-orange-500 text-white p-2 rounded-lg"
          >
            <CiMenuBurger size={24} />
          </button>

          {/* Search Bar */}
          <div className="flex flex-1 ml-4">
            <input
              type="text"
              placeholder="Search Blog"
              className="flex-1 border p-2 rounded-l focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-orange-500 text-white px-4 rounded-r">
              <CiSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {/* Blog List */}
          <div className="lg:col-span-2 cursor-pointer space-y-12">
            {/* Display Filtered Blogs */}
            <ul>
              {filteredBlogs.map((blog) => (
                <li key={blog.slug.current} className="blog-item">
                  <Image
                    src={blog.image1Url}
                    alt={blog.heading}
                    width={800}
                    height={460}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover mb-3 rounded-lg"
                  />
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/calender.png"
                        alt="Calendar icon"
                        width={20}
                        height={20}
                      />
                      <span>date</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/days.png"
                        alt="Comments icon"
                        width={20}
                        height={20}
                      />
                      <span>comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/admin.png"
                        alt="Admin icon"
                        width={20}
                        height={20}
                      />
                      <span>Admin</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    {blog.heading}
                  </h2>
                  <p className="inline-block py-3 text-gray-500">
                    {blog.paragraph1}
                  </p>
                  <button>
                    <Link
                      href={`/blog/${blog.slug.current}`}
                      className="flex text-lg mb-10 text-orange-500 bg-white border border-orange-500 scale-100 hover:scale-105 px-6 py-2 rounded-lg gap-2"
                    >
                      Read More{" "}
                      <span className="mt-1">
                        <GoArrowUpRight />
                      </span>
                    </Link>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Sidebar (Collapsible on Small Screens) */}
            <div
              className={`fixed lg:static inset-y-0 right-0 w-80 lg:w-full bg-white p-6 lg:p-0 transform transition-transform duration-300 ease-in-out z-40 ${
                isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
              }`}
              style={{ overflowY: "auto" }} // Enable vertical scrolling
            >
              {/* Close Button for Small Screens */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-orange-500"
              >
                ✕
              </button>

              {/* Sidebar Component */}
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}