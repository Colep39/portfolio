import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVEICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY,
      )
      .then(
        () => {
          alert('Message sent successfully!');
          form.current.reset();
        },
        () => {
          alert('Failed to send message. Try again later.');
        }
      );
  };

  return (
    <section
      id="contact"
      className="h-screen flex flex-col justify-between bg-gradient-to-b from-sky-50 to-white"
    >
      {/* Content container (flex-grow pushes footer down) */}
      <div className="flex-grow flex flex-col items-center justify-start px-4 sm:px-8 py-18">
        <div className="max-w-xl w-full text-center">
          <h1 className="text-4xl font-bold text-sky-700 mb-8">Contact Me</h1>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-white shadow-xl rounded-xl p-6 space-y-6"
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
              className="w-full bg-sky-500 text-white font-semibold py-3 rounded-lg hover:bg-sky-600 transition cursor-pointer"
            >
              Send Message
            </button>
          </form>

          <p className="mt-6 text-gray-600 text-center text-sm">
            Or feel free to email me directly at{' '}
            <a
                href="mailto:colep3@icloud.com"
                className="text-sky-600 underline hover:text-sky-800 transition"
            >
                colep3@icloud.com
            </a>
          </p>
        </div>
      </div>

      {/* Sticky Footer at bottom */}
      <footer className="bg-sky-100 py-6 text-center text-gray-600">
        <p className="mb-3 text-sm">© {new Date().getFullYear()} Cole Plagens</p>
        <div className="flex justify-center gap-8 text-sky-700 text-3xl">
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
        </footer>

    </section>
  );
};

export default Contact;
