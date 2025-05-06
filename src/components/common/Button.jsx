import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon = null,
  iconPosition = 'right',
  disabled = false,
  ...rest
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-secondary text-white hover:shadow-lg',
    secondary: 'bg-secondary hover:bg-accent text-white hover:shadow-lg',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    text: 'text-secondary hover:text-accent underline',
  };
  
  const sizeClasses = {
    sm: 'text-xs py-1 px-3',
    md: 'text-sm py-2 px-5',
    lg: 'text-base py-3 px-6',
  };
  
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  // Handle rendering of button with icon
  const renderContent = () => {
    if (!icon) {
      return children;
    }
    
    return (
      <>
        {iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </>
    );
  };

  // Link button (internal)
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {renderContent()}
      </Link>
    );
  }

  // Anchor button (external)
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {renderContent()}
      </a>
    );
  }

  // Regular button
  return (
    <button className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {renderContent()}
    </button>
  );
};

export default Button;