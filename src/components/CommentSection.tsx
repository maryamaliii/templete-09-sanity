// components/CommentSection.tsx
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Define the structure of a comment
interface Comment {
  id: number;
  name: string;
  email: string;
  content: string;
  profileImage: string;
  createdAt: string;
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  // Load comments from localStorage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Save comments to localStorage whenever the comments array changes
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  // Handle form submission
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !content) {
      alert("Please fill out your name and comment.");
      return;
    }

    const newComment: Comment = {
      id: Date.now(), // Unique ID for each comment
      name,
      email,
      content,
      profileImage: "/commentprofile.png", // Default profile image
      createdAt: new Date().toLocaleString(),
    };

    setComments([newComment, ...comments]);
    setName("");
    setEmail("");
    setContent("");
  };

  return (
    <section className="pt-12 border-t border-gray-200">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Post a Comment</h2>

      {/* Comment Form */}
      <form className="space-y-6" onSubmit={handlePostComment}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF9F0D] focus:border-[#FF9F0D] outline-none transition-all"
            required
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF9F0D] focus:border-[#FF9F0D] outline-none transition-all"
          />
        </div>
        <textarea
          placeholder="Write a Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF9F0D] focus:border-[#FF9F0D] outline-none resize-y min-h-[150px] transition-all"
          required
        />
        <button
          type="submit"
          className="bg-[#FF9F0D] text-white px-8 py-3 rounded-lg hover:bg-[#e88d00] transition-all duration-300 text-sm md:text-base"
        >
          Post Comment
        </button>
      </form>

      {/* Display Comments */}
      <div className="mt-12 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-4">
            <Image
              src="/commentprofile.png"
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold">{comment.name}</h4>
              <p className="text-sm text-gray-500">{comment.createdAt}</p>
              <p className="mt-2">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
