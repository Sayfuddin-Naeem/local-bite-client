import React from 'react'
import { Link } from 'react-router';
import logo from "../../../assets/fabicon/fabicon.webp";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useAuth } from '../../../providers/AuthProvider';

const Footer = () => {
  const { fbUser } = useAuth();

  return (
    <footer className="bg-neutral text-neutral-content">
      <div className={`footer p-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 ${fbUser ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8 place-items-center text-center lg:text-left`}>
        {/* Branding */}
        <aside className='flex flex-col justify-center items-center lg:items-start'>
          <img src={logo} alt="Local Bite" className="w-12 h-12" />
          <p className="font-popins font-bold text-xl">
            Local Bite
            <br />
            <span className="font-inter font-normal text-sm opacity-80">
              Discover authentic local flavors
            </span>
          </p>
        </aside>

        {/* Quick Links */}
        <nav>
          <h6 className="footer-title font-popins">Quick Links</h6>
          <Link to="/" className="link link-hover font-inter">Home</Link>
          <Link to="/reviews" className="link link-hover font-inter">All Reviews</Link>
          <Link to="/about" className="link link-hover font-inter">About Us</Link>
        </nav>

        {/* For Food Lovers - Only show when logged in */}
        {fbUser && (
          <nav>
            <h6 className="footer-title font-popins">For Food Lovers</h6>
            <Link to="/my-profile" className="link link-hover font-inter">My Profile</Link>
            <Link to="/my-reviews" className="link link-hover font-inter">My Reviews</Link>
            <Link to="/my-favorites" className="link link-hover font-inter">My Favorites</Link>
          </nav>
        )}

        {/* Social */}
        <nav>
          <h6 className="footer-title font-popins">Follow Us</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <FaXTwitter className="w-6 h-6" />
            </a>
          </div>
        </nav>
      </div>

      {/* Copyright */}
      <div className="footer footer-center p-4 bg-neutral/80 text-neutral-content border-t border-neutral-content/10">
        <p className="font-inter text-sm">
          © {new Date().getFullYear()} Local Bite. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;