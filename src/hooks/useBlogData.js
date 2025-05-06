import { useState, useEffect } from 'react';
import blogData from '../data/blogData';

export const useBlogData = (blogId = null, category = null, tag = null, searchTerm = '') => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to filter blogs
  const filterBlogs = (data, category, tag, search) => {
    return data.filter(blog => {
      // Filter by category
      if (category && blog.category !== category) {
        return false;
      }
      
      // Filter by tag
      if (tag && !blog.tags.includes(tag)) {
        return false;
      }
      
      // Filter by search term
      if (search) {
        const searchLower = search.toLowerCase();
        const titleMatch = blog.title.toLowerCase().includes(searchLower);
        const excerptMatch = blog.excerpt.toLowerCase().includes(searchLower);
        const contentMatch = blog.content.toLowerCase().includes(searchLower);
        const tagMatch = blog.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!(titleMatch || excerptMatch || contentMatch || tagMatch)) {
          return false;
        }
      }
      
      return true;
    });
  };

  useEffect(() => {
    try {
      setLoading(true);
      
      // Set all blogs
      setBlogs(blogData);
      
      // Apply filters if any
      const filtered = filterBlogs(blogData, category, tag, searchTerm);
      setFilteredBlogs(filtered);
      
      // If a specific blog ID is requested
      if (blogId) {
        const selectedBlog = blogData.find(blog => blog.id === blogId);
        if (selectedBlog) {
          setBlog(selectedBlog);
        } else {
          setError('Blog post not found');
        }
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error in blog data hook:', err);
      setError('Failed to load blog data');
      setLoading(false);
    }
  }, [blogId, category, tag, searchTerm]);

  return { 
    blogs,                    // All blogs
    filteredBlogs,            // Blogs with filters applied
    blog,                     // Single blog (when ID is provided)
    loading, 
    error,
    featuredBlogs: blogs.filter(blog => blog.featured)  // Featured blogs
  };
};

export default useBlogData;