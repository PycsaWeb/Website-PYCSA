// src/components/Blog/Sidebar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faClock,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { supabase } from '../../SupabaseClient';

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function Sidebar() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    async function getRecentPosts() {
      setLoadingRecent(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, category')
        .order('date', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching recent posts:', error);
      } else {
        setRecentPosts(data || []);
      }
      setLoadingRecent(false);
    }

    getRecentPosts();
  }, []);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 sticky top-24"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Sección Categorías */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center">
        <FontAwesomeIcon
          icon={faFolder}
          className="mr-2 text-gray-500"
        />
        Categorías
      </h3>
      {loadingRecent ? (
        <div className="text-center py-2">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-gray-400"
          />
        </div>
      ) : recentPosts.length > 0 ? (
        <ul className="space-y-2">
          {recentPosts.map((post, index) => (
            <motion.li
              key={index}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                //to={`/blog/${recentPosts}`}
                to="/blog"
                className="text-gray-700 hover:text-brand-orange transition duration-200 ease-in-out block hover:translate-x-1"
              >
                {post.category}
              </Link>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No hay categorías disponibles.</p>
      )}

      {/* Sección Posts Recientes */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4 border-b pb-2 border-gray-200 flex items-center">
        <FontAwesomeIcon
          icon={faClock}
          className="mr-2 text-gray-500"
        />
        Artículos Recientes
      </h3>
      {loadingRecent ? (
        <div className="text-center py-2">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-gray-400"
          />
        </div>
      ) : recentPosts.length > 0 ? (
        <ul className="space-y-2">
          {recentPosts.map((post, index) => (
            <motion.li
              key={post.id}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.3,
                delay: (recentPosts.length + index) * 0.05,
              }}
            >
              <Link
                to={`/blog/${post.id}`}
                className="text-gray-700 hover:text-brand-orange transition duration-200 ease-in-out block hover:translate-x-1"
              >
                {post.title}
              </Link>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No hay artículos recientes.</p>
      )}
    </motion.div>
  );
}
