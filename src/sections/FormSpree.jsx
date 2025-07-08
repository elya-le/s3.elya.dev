import React, { useState, useEffect } from 'react';
import { RiSendPlaneLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';
import HorizontalArrow from "./HorizontalArrow.jsx";

const ContactForm = () => {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveSectionDimensions = () => {
    if (screenWidth > 1024) {
      return { height: "500px", width: "900px" };
    } else if (screenWidth > 715) {
      return { height: "500px", width: "800px" };
    } else {
      return { height: "770px", width: "99%" };
    }
  };
  
  const responsiveSectionDimensions = getResponsiveSectionDimensions();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/mwpvkavd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ email: '', message: '' });
      } else {
        setStatus('Failed to send — Try via <a href="mailto:elyaj.le@gmail.com" style="text-decoration: underline;">direct email link</a>');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error — Try via <a href="mailto:elyaj.le@gmail.com" style="text-decoration: underline;">direct email link</a>');
    }
    setLoading(false);
  };

  return (
    <section 
      className="contact-section"
      id="contact"
    >
      <div
        key={screenWidth}
        style={{
          height: responsiveSectionDimensions.height,
          width: responsiveSectionDimensions.width,
        }}
      >
        <div className="contact-header-text">
          <p className={screenWidth > 715 ? "text-xl" : "text-lg"}>Lets build together!!</p>
        </div>
        
        <div className="contact-main-container">
          <div className="contact-image-section">
            <img
              src="/assets/Elya_PhotonDesk2019.jpg"
              alt="Elya Photon Desk 2019"
              className="contact-image"
            />
          </div>
          
          <div className="contact-form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-input-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-input"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="contact-input-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="contact-textarea"
                  placeholder="Message"
                  required
                ></textarea>
              </div>

              <div className="contact-form-footer">
                <div className="contact-status-message">
                  {status && (
                    <p dangerouslySetInnerHTML={{ __html: status }}></p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="contact-submit-button"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send'} 
                    <RiSendPlaneLine size={18} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Link to non-code projects */}
        <div className="w-full flex justify-center mt-4">
          <Link 
            to="/non-code-projects"
            onClick={(e) => {
              e.preventDefault();
              navigate('/non-code-projects');
              window.scrollTo(0, 0);
            }}
            className="contact-nav-link"
          > 
            <span className="contact-nav-text">
              Non-Code Projects
            </span>
            <div className="contact-nav-arrow">
              <HorizontalArrow />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;