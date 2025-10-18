import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const ContactModal = ({ toggleModal }) => {
  const form = useRef();
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY,
      )
      .then(
        () => {
          alert('Message sent successfully!');
          form.current.reset();
          setSending(false);
          toggleModal(); // close modal after success
        },
        () => {
          alert('Failed to send message. Try again later.');
          setSending(false);
        }
      );
  };

  return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-[60]"
        onClick={toggleModal}
      >

      <div
        className="bg-white rounded-2xl shadow-lg w-[90%] max-w-xl relative p-6 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button
          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer "
        >
          ✖
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">
          Contact Me
        </h1>

        {/* Form */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-white shadow-inner rounded-xl p-4 space-y-4"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-sky-500 text-white font-semibold py-3 rounded-lg hover:bg-sky-600 transition cursor-pointer"
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Email + Links */}
        <p className="mt-6 text-gray-600 text-center text-sm">
          Or email me directly at{' '}
          <a
            href="mailto:colep3@icloud.com"
            className="text-sky-600 underline hover:text-sky-800 transition"
          >
            colep3@icloud.com
          </a>
        </p>

        <div className="mt-6 flex justify-center gap-8 text-sky-700 text-2xl">
          <a
            href="https://www.linkedin.com/in/cole-plagens/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/colep39"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 transition"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;

