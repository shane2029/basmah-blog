import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useBlogData from '../../hooks/useBlogData';
import formatDate from '../../utils/formatDate';
import Button from '../common/Button';
import BlogCard from './BlogCard';
import ImageGallery from './ImageGallery';
import { FaUser, FaCalendarAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { IoArrowForward, IoArrowBack, IoLink } from 'react-icons/io5';
import { BsHash } from 'react-icons/bs';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blog, blogs, loading, error } = useBlogData(id);
  
  // Auto-scroll to top when blog loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Get related posts based on category and tags
  const getRelatedPosts = () => {
    if (!blog) return [];
    
    // Filter blogs that have the same category or at least one common tag
    return blogs
      .filter(relatedBlog => 
        relatedBlog.id !== blog.id && 
        (
          relatedBlog.category === blog.category ||
          relatedBlog.tags.some(tag => blog.tags.includes(tag))
        )
      )
      .slice(0, 3); // Get up to 3 related posts
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-secondary flex flex-col items-center">
          <div className="w-8 h-8 mb-2 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="text-center py-10 bg-error/10 rounded-xl">
        <div className="text-error text-4xl mb-4">!</div>
        <p className="text-error font-medium mb-2">Post Not Found</p>
        <p className="text-gray-600 mb-4">{error || 'The blog post youre looking for doesnt exist or has been moved.'}</p>
        <Button to="/blog" variant="secondary">
          Browse All Posts
        </Button>
      </div>
    );
  }
  
  const relatedPosts = getRelatedPosts();

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center">
        <Link to="/" className="hover:text-secondary">Home</Link>
        <IoArrowForward className="h-3 w-3 mx-2" />
        <Link to="/blog" className="hover:text-secondary">Blog</Link>
        <IoArrowForward className="h-3 w-3 mx-2" />
        <span className="text-secondary font-medium truncate">
          {blog.title}
        </span>
      </nav>
      
      <article>
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="badge badge-primary flex items-center">
              <BiCategory className="mr-1" />
              {blog.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <FaCalendarAlt className="mr-1" size={12} />
              {formatDate(blog.date)}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{blog.title}</h1>
          
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center text-gray-500 mr-3">
              {blog.author.charAt(0)}
            </div>
            <div className="text-left">
              <div className="font-medium flex items-center">
                <FaUser className="mr-2" size={12} />
                {blog.author}
              </div>
              <div className="text-sm text-gray-500">Author</div>
            </div>
          </div>
        </header>

        {/* Image Gallery - Only render if blog has images */}
        {blog.images && blog.images.length > 0 && (
          <ImageGallery images={blog.images} />
        )}

        {/* Content */}
        <div 
          className="blog-content mb-8"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <BsHash size={20} className="mr-1" />
            Tags:
          </h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="category-tag hover:bg-primary hover:text-white transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Share Links */}
        <div className="mb-12 border-t border-b border-gray-200 py-6">
          <h3 className="text-lg font-semibold mb-3">Share this post:</h3>
          <div className="flex gap-3">
            <a 
              href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Share on Twitter"
            >
              <FaTwitter />
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Share on Facebook"
            >
              <FaFacebookF />
            </a>
            <a 
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${blog.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
              className="social-icon"
              aria-label="Copy link"
            >
              <IoLink />
            </button>
          </div>
        </div>
        
        {/* Post Navigation */}
        <nav className="grid grid-cols-2 gap-4 mb-12">
          {blogs.findIndex(b => b.id === blog.id) > 0 && (
            <button 
              onClick={() => {
                const currentIndex = blogs.findIndex(b => b.id === blog.id);
                if (currentIndex > 0) {
                  navigate(`/blog/${blogs[currentIndex - 1].id}`);
                }
              }}
              className="flex items-center justify-start p-4 rounded-lg bg-gray-100 hover:bg-primary-light transition-colors"
            >
              <IoArrowBack className="h-5 w-5 mr-2" />
              Previous Post
            </button>
          )}
          
          {blogs.findIndex(b => b.id === blog.id) < blogs.length - 1 && (
            <button 
              onClick={() => {
                const currentIndex = blogs.findIndex(b => b.id === blog.id);
                if (currentIndex < blogs.length - 1) {
                  navigate(`/blog/${blogs[currentIndex + 1].id}`);
                }
              }}
              className="flex items-center justify-end p-4 rounded-lg bg-gray-100 hover:bg-primary-light transition-colors ml-auto"
            >
              Next Post
              <IoArrowForward className="h-5 w-5 ml-2" />
            </button>
          )}
        </nav>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 relative">
              Related Posts
              <span className="absolute -bottom-2 left-0 h-1 w-16 bg-primary rounded-full"></span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedBlog => (
                <BlogCard key={relatedBlog.id} blog={relatedBlog} />
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center">
          <Button to="/blog" variant="secondary">
            Back to all posts
          </Button>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;