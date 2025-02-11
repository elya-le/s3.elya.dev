import React, { useState, useEffect } from 'react';
import { RiSendPlaneLine } from 'react-icons/ri'; // for the send button icon

const ContactForm = () => {
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
      return { height: "400px", width: "900px" }; // fullscreen
    } else if (screenWidth > 715) {
      return { height: "400px", width: "800px" }; // tablet
    } else {
      return { height: "700px", width: "99%" }; // mobile
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
      className="contact-section flex flex-col items-center justify-center bg-[var(--bg-primary)] p-4 -mt-24"
      id="contact">
      <div
        style={{
          height: responsiveSectionDimensions.height,
          width: responsiveSectionDimensions.width,
        }}>
        <div className="w-full text-left mb-2 pl-3 sm:pl-6 sm:mb-4">
          <p className="text-white text-lg sm:text-xl font-thin">Lets build together!!</p>
        </div>
        <div className="w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/2 bg-[var(--bg-secondary)] p-6">
            <img
              src="/assets/Elya_PhotonDesk2019.jpg"
              alt="Elya Photon Desk 2019"
              style={{
                width: '100%', // or any specific width
                height: '300px', // or any specific height
                objectFit: 'cover', // 'cover', 'contain', 'fill', 'none', 'scale-down'
              }}
            />
          </div>
          <div className="w-full sm:w-1/2 bg-[var(--bg-secondary)] p-6">
            <h2 className="text-2xl font-bold mb-6 text-left"></h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-white focus:border-white sm:text-sm peer bg-[var(--bg-input)] border border-white border-opacity-10 focus:border-opacity-100 placeholder-white placeholder-opacity-30"
                  placeholder="Email"
                  style={{ borderRadius: '0px', color: 'white' }}
                  required
                />
              </div>

              {/* Message input */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-white focus:border-white sm:text-sm peer bg-[var(--bg-input)] border border-white border-opacity-10 focus:border-opacity-100 placeholder-white placeholder-opacity-30"
                  placeholder="Message"
                  style={{ borderRadius: '0px', color: 'white' }}
                  required
                ></textarea>
              </div>

              {/* Status message */}
              <div className="flex justify-between items-center">
                <div className="flex-1 flex items-center">
                  {status && (
                    <p
                      className="inline-flex items-center text-white text-left text-sm"
                      dangerouslySetInnerHTML={{ __html: status }}
                    ></p>
                  )}
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    className="text-white text-sm inline-flex items-center border border-white border-opacity-50 rounded-full pl-4 pr-4 py-1.5 transition-colors bg-[var(--bg-button)] hover:bg-[var(--bg-button-hover)]"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send'} <RiSendPlaneLine className="pl-1.5" size={18} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
