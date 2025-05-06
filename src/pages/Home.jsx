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
              Welcome to <span className="text-gradient">Blossom</span>
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

      {/* Categories Section */}
      <section className="py-12 bg-primary-lighter rounded-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Explore Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Mindfulness', icon: <FiSmile className="h-6 w-6" /> },
              { name: 'Interior Design', icon: <FiHome className="h-6 w-6" /> },
              { name: 'Lifestyle', icon: <FiActivity className="h-6 w-6" /> },
              { name: 'Food & Cooking', icon: <FiBookOpen className="h-6 w-6" /> },
              { name: 'Wellness', icon: <FiCloud className="h-6 w-6" /> },
              { name: 'Digital Wellbeing', icon: <FiSmartphone className="h-6 w-6" /> }
            ].map((category, index) => (
              <Link 
                key={category.name} 
                to={`/blog?category=${category.name}`} 
                className="bg-white rounded-lg p-4 text-center shadow-md hover-lift hover-shadow transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-secondary text-2xl mb-2 flex justify-center">
                  {category.icon}
                </div>
                <h3 className="font-semibold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 my-12 bg-secondary-lighter rounded-xl">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to My Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Stay updated with my latest blog posts, creative insights, and exclusive content.
          </p>
          
          {subscribed ? (
            <div className="bg-success/20 text-success rounded-lg p-4 max-w-md mx-auto animate-scaleIn flex items-center justify-center">
              <BsCheckCircleFill className="w-6 h-6 mr-2" />
              <p>Thank you for subscribing! Check your email for confirmation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          )}
        </div>
      </section>

      {/* Latest Posts Teaser */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-light to-secondary-lighter rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Discover More Articles</h2>
              <p className="text-gray-700">Explore the full collection of posts on mindfulness, creativity, and intentional living.</p>
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