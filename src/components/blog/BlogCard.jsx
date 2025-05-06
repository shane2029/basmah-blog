import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import formatDate from '../../utils/formatDate';

const BlogCard = ({ blog, featured = false }) => {
  // Use featuredImage as main image for the card, or first image from images array if available
  const displayImage = blog.featuredImage || (blog.images && blog.images.length > 0 ? blog.images[0].url : '');
  const imageAlt = blog.images && blog.images.length > 0 ? blog.images[0].alt : blog.title;

  return (
    <article className={`card animate-scaleIn ${featured ? 'featured-card' : ''}`}>
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={displayImage}
          alt={imageAlt}
          className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
        />
        <div className="absolute top-0 left-0 m-4 z-10">
          <span className="badge badge-primary">{blog.category}</span>
        </div>
        
        {featured && (
          <div className="absolute top-0 right-0 m-4 z-10">
            <span className="badge badge-secondary">Featured</span>
          </div>
        )}
        
        {/* Image count indicator for multiple images */}
        {blog.images && blog.images.length > 1 && (
          <div className="absolute bottom-0 right-0 m-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded flex items-center">
            <span className="mr-1">{blog.images.length}</span>
            <span>images</span>
          </div>
        )}
        
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-gray-500 text-sm mb-2 space-x-2">
          <div className="flex items-center">
            <FiClock className="mr-1" size={14} />
            <span>{formatDate(blog.date)}</span>
          </div>
          <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
          <div className="flex items-center">
            <FaUser className="mr-1" size={12} />
            <span>{blog.author}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3 hover:text-secondary transition-colors">
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{blog.excerpt}</p>
        
        <div className="flex flex-wrap gap-2 my-3">
          {blog.tags.slice(0, 3).map(tag => (
            <span key={tag} className="category-tag">#{tag}</span>
          ))}
          {blog.tags.length > 3 && <span className="category-tag">+{blog.tags.length - 3}</span>}
        </div>
        
        <Link 
          to={`/blog/${blog.id}`} 
          className="inline-flex items-center font-medium text-secondary hover:text-accent transition-colors group"
          aria-label={`Read more about ${blog.title}`}
        >
          Read More
          <BsArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;