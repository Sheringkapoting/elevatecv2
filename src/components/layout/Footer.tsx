
import { Link } from "react-router-dom";
import { FileText, Mail, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <FileText className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-primary-600">Elevate CV</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Boost your job applications with AI-powered resume analysis and building tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/analyze" className="text-gray-600 hover:text-primary-600">Resume Analysis</Link>
              </li>
              <li>
                <Link to="/builder" className="text-gray-600 hover:text-primary-600">Resume Builder</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600">Dashboard</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary-600">ATS Optimization</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary-600">Blog</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary-600">Career Tips</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary-600">Resume Templates</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary-600">Help Center</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary-600">About Us</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary-600">Contact</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary-600">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary-600">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Elevate CV (.NET). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
