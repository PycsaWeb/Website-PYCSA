// src/pages/BlogPostDetail.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../SupabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faTag,
  faUser,
  faComment,
  faSpinner,
  faExclamationTriangle,
  faArrowLeft,
  faCheckCircle,
  faTimesCircle,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppChatbox from '../components/WhatsAppChatbox';

function BlogPostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);

  const [commenterName, setCommenterName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({
    type: null,
    message: '',
  });

  const fetchPostAndComments = useCallback(async () => {
    setLoading(true);
    setLoadingComments(true);
    setError(null);
    setSubmissionStatus({ type: null, message: '' });

    try {
      const { data: postData, error: postError } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', postId)
        .single();

      if (postError)
        throw new Error(`Error al cargar el post: ${postError.message}`);
      if (!postData) throw new Error('Post no encontrado.');
      setPost(postData);

      const { data: commentsData, error: commentsError } = await supabase
        .from('blog_comments')
        .select('id, created_at, name, comment')
        .eq('blog_id', postId)
        .order('created_at', { ascending: false });

      if (commentsError) {
        console.warn('Error fetching comments:', commentsError);
        setComments([]);
      } else {
        setComments(commentsData || []);
      }
    } catch (err) {
      console.error('Error loading blog post details:', err);
      setError(err.message);
      setPost(null);
      setComments([]);
    } finally {
      setLoading(false);
      setLoadingComments(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      fetchPostAndComments();
    } else {
      setError('ID de post inválido.');
      setLoading(false);
      setLoadingComments(false);
    }
    return () => {
      setPost(null);
      setComments([]);
    };
  }, [postId, fetchPostAndComments]);

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    setSubmissionStatus({ type: null, message: '' });

    if (!commenterName.trim() || !commentText.trim()) {
      setSubmissionStatus({
        type: 'error',
        message: 'Por favor, completa tu nombre y comentario.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: newComment, error: insertError } = await supabase
        .from('blog_comments')
        .insert([
          {
            blog_id: postId,
            name: commenterName.trim(),
            comment: commentText.trim(),
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      if (newComment) {
        setSubmissionStatus({
          type: 'success',
          message: '¡Comentario enviado con éxito!',
        });
        setCommenterName('');
        setCommentText('');
        setComments((prevComments) => [newComment, ...prevComments]);
        setTimeout(
          () => setSubmissionStatus({ type: null, message: '' }),
          4000
        );
      } else {
        throw new Error('No se recibió confirmación del servidor.');
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      setSubmissionStatus({
        type: 'error',
        message: 'Hubo un error al enviar tu comentario. Inténtalo de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCommentDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const formatPostDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    return new Date(dateString + 'T00:00:00').toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          size="3x"
          className="text-brand-orange"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          size="3x"
          className="text-red-500 mb-4"
        />
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          Error al Cargar
        </h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link
          to="/blog"
          className="inline-flex items-center px-6 py-2 bg-brand-orange text-white rounded hover:bg-brand-orange-dark transition duration-200"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="mr-2"
          />
          Volver al Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return <div className="text-center py-10">Post no encontrado.</div>;
  }

  return (
    <div className="bg-white">
      <Header />
      {post.image_urls && post.image_urls[0] && (
        <motion.div
          className="relative h-64 md:h-96 bg-gray-800 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={post.image_urls[0]}
            alt={`Imagen principal para ${post.title}`}
            className="w-full h-full object-cover object-top opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        </motion.div>
      )}

      <motion.article
        className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 md:py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link
          to="/blog"
          className="inline-flex items-center text-sm text-gray-600 hover:text-brand-orange mb-6 transition duration-200 group"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="mr-2 transition-transform duration-200 group-hover:-translate-x-1"
          />
          Volver a todos los artículos
        </Link>

        {post.category && (
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-brand-orange mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FontAwesomeIcon
              icon={faTag}
              className="mr-1.5"
            />
            {post.category}
          </motion.p>
        )}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {post.title}
        </motion.h1>

        <motion.div
          className="text-sm text-gray-500 mb-8 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="mr-2"
          />
          Publicado el {formatPostDate(post.date)}
        </motion.div>

        <motion.div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {post.info && post.info.length > 0 ? (
            post.info.length === 1 ? (
              <>
                <p>{post.info[0]}</p>

                {post.image_urls && post.image_urls.length > 1 && (
                  <motion.div
                    className="mt-12 grid grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {post.image_urls.slice(1).map((url, index) => (
                      <motion.img
                        key={index}
                        src={url}
                        alt={`Imagen adicional ${index + 1} para ${post.title}`}
                        className="rounded-lg shadow-md object-cover w-full h-40 transition-transform duration-300 hover:scale-105"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      />
                    ))}
                  </motion.div>
                )}
              </>
            ) : (
              post.info.map((paragraph, index) => (
                <React.Fragment key={index}>
                  <p>{paragraph}</p>
                  {post.image_urls &&
                    post.image_urls.length > index + 1 && ( // aseguramos que hay imagen para este párrafo
                      <motion.img
                        src={post.image_urls[index + 1]}
                        alt={`Imagen ${index + 1} para ${post.title}`}
                        className="rounded-lg shadow-md object-cover w-full h-[60vh] transition-transform duration-300 hover:scale-105"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      />
                    )}
                </React.Fragment>
              ))
            )
          ) : (
            <p>Contenido no disponible.</p>
          )}
        </motion.div>

        <motion.section
          className="mt-16 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <FontAwesomeIcon
              icon={faComment}
              className="mr-3 text-gray-500"
            />
            Comentarios ({comments.length})
          </h2>

          <motion.form
            onSubmit={handleSubmitComment}
            className="mb-10 p-6 bg-gray-50 rounded-lg border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Deja tu comentario
            </h3>
            <div className="mb-4">
              <label
                htmlFor="commenterName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tu Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="commenterName"
                value={commenterName}
                onChange={(e) => setCommenterName(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-orange focus:border-brand-orange sm:text-sm disabled:bg-gray-100"
                placeholder="Ej: Juan Pérez"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="commentText"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Comentario <span className="text-red-500">*</span>
              </label>
              <textarea
                id="commentText"
                rows="4"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-orange focus:border-brand-orange sm:text-sm disabled:bg-gray-100"
                placeholder="Escribe tu opinión o pregunta aquí..."
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-orange hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      className="mr-2"
                    />
                    Enviando...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="mr-2"
                    />
                    Enviar Comentario
                  </>
                )}
              </button>

              <AnimatePresence>
                {submissionStatus.type && (
                  <motion.div
                    key="submission-feedback"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`text-sm font-medium flex items-center p-2 rounded ${
                      submissionStatus.type === 'success'
                        ? 'text-green-700 bg-green-100'
                        : 'text-red-700 bg-red-100'
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        submissionStatus.type === 'success'
                          ? faCheckCircle
                          : faTimesCircle
                      }
                      className="mr-2"
                    />
                    {submissionStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {loadingComments ? (
            <div className="text-center py-4">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-gray-500"
              />
              <span className="ml-2 text-gray-600">
                Cargando comentarios...
              </span>
            </div>
          ) : comments.length > 0 ? (
            <ul className="space-y-6">
              <AnimatePresence initial={false}>
                {comments.map((comment) => (
                  <motion.li
                    key={comment.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm border-l-4 border-gray-200"
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: -50, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="flex items-center mb-2">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-gray-500 mr-2"
                      />
                      <strong className="text-gray-800 mr-3">
                        {comment.name}
                      </strong>
                      <span className="text-xs text-gray-500 ml-auto">
                        {formatCommentDate(comment.created_at)}
                      </span>{' '}
                    </div>
                    <p className="text-gray-700 pl-1">{comment.comment}</p>{' '}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          ) : (
            <p className="text-gray-600 italic">
              Aún no hay comentarios. ¡Sé el primero en compartir tu opinión!
            </p>
          )}
        </motion.section>
      </motion.article>
      <Footer />
      <WhatsAppChatbox />
    </div>
  );
}

export default BlogPostDetail;
