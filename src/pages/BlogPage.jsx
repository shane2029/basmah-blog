import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BlogList from '../components/blog/BlogList';
import useBlogData from '../hooks/useBlogData';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { BiCategoryAlt, BiTag } from 'react-icons/bi';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const location = useLocation();
  
  // Get blogs with proper filtering
  const { blogs, filteredBlogs, loading, error } = useBlogData(
    null, 
    selectedCategory,
    selectedTag,
    searchTerm
  );
  
  // Get unique categories and tags from blogs
  const categories = [...new Set(blogs.map(blog => blog.category))];
  const tags = [...new Set(blogs.flatMap(blog => blog.tags))];
  
  useEffect(() => {
    // Check for query parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const tagParam = params.get('tag');
    const searchParam = params.get('search');
    
    // Apply filters from URL if present
    if (categoryParam) setSelectedCategory(categoryParam);
    if (tagParam) setSelectedTag(tagParam);
    if (searchParam) setSearchTerm(searchParam);
  }, [location]);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTag('');
  };
  
  // Count how many filters are applied
  const activeFilterCount = [
    searchTerm, 
    selectedCategory, 
    selectedTag
  ].filter(Boolean).length;

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">The Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore my thoughts, inspirations, and creative insights on mindfulness, design, and intentional living.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-12 bg-primary-lighter p-6 rounded-xl">
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="form-control pl-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FiSearch className="h-5 w-5" />
              </div>
              {searchTerm && (
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  <FiX className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categories */}
            <div>
              <label className="form-label flex items-center">
                <BiCategoryAlt className="mr-2" />
                Filter by Category
              </label>
              <div className="relative">
                <select 
                  className="form-control appearance-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiFilter className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="form-label flex items-center">
                <BiTag className="mr-2" />
                Filter by Tag
              </label>
              <div className="relative">
                <select 
                  className="form-control appearance-none"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  <option value="">All Tags</option>
                  {tags.map(tag => (
                    <option key={tag} value={tag}>#{tag}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiFilter className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Active filter indicator */}
          {activeFilterCount > 0 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{filteredBlogs.length}</span> {filteredBlogs.length === 1 ? 'result' : 'results'} found
                {selectedCategory && <span> in <span className="font-semibold">{selectedCategory}</span></span>}
                {selectedTag && <span> with tag <span className="font-semibold">#{selectedTag}</span></span>}
                {searchTerm && <span> containing <span className="font-semibold">"{searchTerm}"</span></span>}
              </div>
              <button 
                onClick={clearFilters}
                className="text-sm text-secondary hover:text-secondary-dark font-medium flex items-center"
              >
                <FiX className="mr-1" />
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Blog List */}
      <BlogList 
        blogs={filteredBlogs} 
        loading={loading} 
        error={error}
      />
    </div>
  );
};

export default BlogPage;