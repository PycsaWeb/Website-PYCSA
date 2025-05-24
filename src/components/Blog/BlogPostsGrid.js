// src/components/Blog/BlogPostsGrid.js
import React from 'react';
import BlogPostCard from './BlogPostCard';

export default function BlogPostsGrid({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">
          No hay artículos de seguridad disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {posts.map((post, index) => (
        <BlogPostCard
          key={post.id || index}
          post={post}
        />
      ))}
    </div>
  );
}
