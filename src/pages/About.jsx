import React from 'react';
import Button from '../components/common/Button';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About Me</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Writer, designer, and mindfulness enthusiast sharing thoughts on intentional living.
        </p>
      </div>

      <div className="mb-12 flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <img
            src="https://source.unsplash.com/random/600x600/?portrait"
            alt="Author Portrait"
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </div>
        
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Hello, I'm Basmah</h2>
          <p className="text-gray-700 mb-4">
            Welcome to Blossom, my corner of the internet where I share my thoughts on mindful living, creativity, and finding beauty in everyday moments.
          </p>
          <p className="text-gray-700 mb-4">
            With a background in design and a passion for writing, I created this blog to inspire others to live more intentionally and appreciate the small joys that make life meaningful.
          </p>
          <p className="text-gray-700 mb-6">
            When I'm not writing, you can find me exploring nature trails, experimenting with new recipes, or curled up with a good book and a cup of tea.
          </p>
          
          <div className="flex gap-4">
            <Button to="/contact">Get in Touch</Button>
            <Button to="/blog" variant="outline">Read My Blog</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-primary-light p-6 rounded-xl text-center">
          <div className="text-secondary text-4xl mb-2">
            <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">My Mission</h3>
          <p className="text-gray-600">
            To inspire mindful living and help others find beauty in everyday moments.
          </p>
        </div>
        
        <div className="bg-primary-light p-6 rounded-xl text-center">
          <div className="text-secondary text-4xl mb-2">
            <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">My Values</h3>
          <p className="text-gray-600">
            Authenticity, creativity, mindfulness, and sustainable living.
          </p>
        </div>
        
        <div className="bg-primary-light p-6 rounded-xl text-center">
          <div className="text-secondary text-4xl mb-2">
            <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">My Work</h3>
          <p className="text-gray-600">
            Writing, photography, and creating resources for intentional living.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;