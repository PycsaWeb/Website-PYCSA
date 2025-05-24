// src/pages/blog.js
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../SupabaseClient';
import FadeInSection from '../components/FadeInSection';
import HeroBlog from '../components/Blog/HeroBlog';
import BlogPostsGrid from '../components/Blog/BlogPostsGrid';
import Sidebar from '../components/Blog/Sidebar';
import Pagination from '../components/Blog/Pagination';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppChatbox from '../components/WhatsAppChatbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const POSTS_PER_PAGE = 6;

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const showSidebar = true;

  const fetchPosts = useCallback(async (page) => {
    setLoading(true);
    setError(null);

    const from = (page - 1) * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    try {
      const {
        data,
        error: fetchError,
        count,
      } = await supabase
        .from('blogs')
        .select('id, title, excerpt, date, image_urls, category', {
          count: 'exact',
        })
        .order('date', { ascending: false })
        .range(from, to);

      if (fetchError) throw fetchError;

      if (data) {
        const formattedPosts = data.map((post) => ({
          ...post,
          imageUrl:
            post.image_urls && post.image_urls.length > 0
              ? post.image_urls[0]
              : '/assets/logo.png',
        }));
        setPosts(formattedPosts);
        setTotalPages(Math.ceil((count || 0) / POSTS_PER_PAGE));
      } else {
        setPosts([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(
        'No se pudieron cargar las entradas del blog. Inténtalo más tarde.'
      );
      setPosts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, fetchPosts]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="m-0 p-0">
      <Header />
      <div className="bg-gray-50 min-h-screen">
        <HeroBlog />
        <div className="container mx-auto px-4 py-8 md:py-12">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 md:mb-12 text-center">
              Blog{' '}
              <span className="inline-block border-b-4 border-brand-orange pb-2 leading-tight">
                Seguridad
              </span>
            </h1>
          </FadeInSection>
          <div
            className={`flex flex-col ${
              showSidebar ? 'md:flex-row' : ''
            } gap-8 md:gap-12`}
          >
            <div className={`${showSidebar ? 'md:w-3/4' : 'w-full'}`}>
              {loading && (
                <div className="text-center py-10">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    size="3x"
                    className="text-brand-orange"
                  />
                  <p className="mt-4 text-gray-600">Cargando artículos...</p>
                </div>
              )}
              {error && (
                <div className="text-center py-10 text-red-600 bg-red-100 p-4 rounded border border-red-300">
                  {error}
                </div>
              )}
              {!loading && !error && (
                <>
                  <BlogPostsGrid posts={posts} />
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </div>
            {showSidebar && (
              <div className="md:w-1/4">
                <Sidebar />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppChatbox />
    </div>
  );
}

export default Blog;
