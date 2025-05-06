import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/blog/BlogCard';
import Button from '../components/common/Button';
import useBlogData from '../hooks/useBlogData';
import { BsArrowRight, BsCheckCircleFill } from 'react-icons/bs';
import { FiSmile, FiBookOpen, FiHome, FiActivity, FiCloud, FiSmartphone } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';

const Home = () => {
  const { featuredBlogs, loading } = useBlogData();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Subscribed with email:', email);
    setSubscribed(true);
    setEmail('');
    
    // Reset the subscribed state after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="hero bg-gradient mb-12 md:mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl hero-content animate-slideUp">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to <span className="text-gradient">Kay</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              A personal blog sharing thoughts, inspiration, and creative ideas for a more mindful and beautiful life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                to="/blog" 
                size="lg"
                icon={<MdOutlineExplore />}
                iconPosition="right"
              >
                Explore Articles
              </Button>
              <Button 
                to="/about" 
                variant="outline" 
                size="lg"
                icon={<FiSmile />}
                iconPosition="right"
              >
                About Me
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold relative">
              Featured Posts
              <span className="absolute -bottom-2 left-0 h-1 w-16 bg-primary rounded-full"></span>
            </h2>
            <Link to="/blog" className="text-secondary hover:text-accent font-medium inline-flex items-center group">
              View All
              <BsArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-secondary flex flex-col items-center">
                <div className="w-8 h-8 mb-2 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                <p>Loading featured posts...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.map((blog, index) => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog} 
                  featured={true}
                  style={{ animationDelay: `${index * 0.1}s` }} 
                />
              ))}
            </div>
          )}
        </div>
      </section>





      {/* Latest Posts Teaser */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-light to-secondary-lighter rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Discover More Articles</h2>
              <p className="text-gray-700">Explore the full collection of posts</p>
            </div>
            <Button 
              to="/blog" 
              variant="secondary" 
              size="lg"
              icon={<BsArrowRight />}
              iconPosition="right"
            >
              Browse All Posts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;