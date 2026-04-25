import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Countdown from 'react-countdown';
import { MapPin, Calendar, Heart, Phone, Mail, Navigation, ExternalLink, QrCode } from 'lucide-react';
import { QRCode } from 'react-qr-code';
import confetti from 'canvas-confetti';

// Placeholder date - Change this to the actual wedding date
const WEDDING_DATE = new Date('2026-07-02T10:00:00');

const App = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const mapUrl = "https://www.google.com/maps/place/Dandatikaru+Sarpanje+Garden+%26+Function+Hall/@17.1615985,78.7253632,16.11z/data=!4m6!3m5!1s0x3bcb061bf125c74b:0xb312f5bf0bc14924!8m2!3d17.1562887!4d78.731529!16s%2Fg%2F11fxw2hb_6?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D";

  useEffect(() => {
    // Initial confetti burst
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-luxury-gold text-4xl font-serif">Today is the Day!</span>;
    }
    return (
      <div className="flex gap-4 md:gap-8 justify-center items-center">
        {[
          { label: 'Days', value: days },
          { label: 'Hours', value: hours },
          { label: 'Min', value: minutes },
          { label: 'Sec', value: seconds }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-full mb-2">
              <span className="text-2xl md:text-4xl font-bold text-luxury-gold">{item.value}</span>
            </div>
            <span className="text-xs md:text-sm uppercase tracking-widest text-white/80 font-inter">{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] selection:bg-luxury-gold selection:text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/assets/hero.png" 
            alt="Wedding Background" 
            className="w-full h-full object-cover brightness-50"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-white/80 uppercase tracking-[0.3em] text-sm md:text-base font-inter mb-4 block">
              We are Getting Married
            </span>
            <h1 className="text-6xl md:text-9xl font-playfair italic text-white mb-6 drop-shadow-2xl">
              Saikiran <span className="text-luxury-gold">&</span> Akshitha
            </h1>
            <div className="h-[1px] w-32 bg-luxury-gold mx-auto mb-6"></div>
            <p className="text-white/90 text-xl md:text-2xl font-serif-elegant tracking-widest mb-12">
              2 JULY 2026 • HYDERABAD
            </p>
            
            <div className="mt-8">
              <Countdown date={WEDDING_DATE} renderer={renderer} />
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
        >
          <p className="text-xs uppercase tracking-widest mb-2">Scroll to Explore</p>
          <div className="w-[1px] h-10 bg-white/30 mx-auto"></div>
        </motion.div>
      </section>

      {/* Couple Section */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-playfair text-luxury-dark mb-4">Meet the Couple</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-luxury-gold"></div>
            <Heart className="text-luxury-gold fill-luxury-gold" size={20} />
            <div className="h-[1px] w-12 bg-luxury-gold"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-right"
          >
            <div className="relative inline-block mb-6 group">
              <div className="absolute -inset-4 border-2 border-luxury-gold/30 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
              <img 
                src="/bav.jpeg" 
                alt="Saikiran" 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white shadow-2xl relative z-10"
              />
            </div>
            <h3 className="text-3xl font-playfair text-luxury-dark mb-2">Saikiran</h3>
            <p className="text-luxury-gold font-serif-elegant italic text-lg mb-4">The Groom</p>
            <p className="text-gray-600 font-inter leading-relaxed max-w-sm ml-auto">
              A man of vision and kindness, Saikiran is ready to embark on this beautiful journey of love and togetherness with his soulmate.
            </p>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <div className="relative inline-block mb-6 group">
              <div className="absolute -inset-4 border-2 border-luxury-gold/30 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
              <img 
                src="/sweet.jpeg" 
                alt="Akshitha" 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white shadow-2xl relative z-10"
              />
            </div>
            <h3 className="text-3xl font-playfair text-luxury-dark mb-2">Akshitha</h3>
            <p className="text-luxury-gold font-serif-elegant italic text-lg mb-4">The Bride</p>
            <p className="text-gray-600 font-inter leading-relaxed max-w-sm">
              Radiating elegance and grace, Akshitha is the heart of this union, bringing joy and color to Saikiran's world as they start their forever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Invitation Card Section */}
      <section className="py-24 bg-luxury-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 border-l-4 border-t-4 border-luxury-gold"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 border-r-4 border-b-4 border-luxury-gold"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-playfair mb-12">The Invitation</h2>
            <div className="glass-card p-4 md:p-8 rounded-lg shadow-2xl relative group">
              <img 
                src="/assets/card.png" 
                alt="Wedding Invitation Card" 
                className="w-full h-auto rounded shadow-lg group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 border-2 border-luxury-gold/50 m-2 md:m-6 pointer-events-none"></div>
            </div>
            <p className="mt-12 text-luxury-gold font-serif-elegant italic text-2xl">
              "We request the honor of your presence as we celebrate our love."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Special Invitees */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-playfair text-luxury-dark mb-16 underline decoration-luxury-gold/30 underline-offset-8">Specially Inviting People</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { name: "Palle Srinivas", role: "Special Guest" },
              { name: "Palle Rudra", role: "Special Guest" }
            ].map((person, idx) => (
              <motion.div
                key={idx}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="p-8 border border-luxury-gold/20 rounded-xl hover:shadow-xl transition-shadow duration-300 bg-[#fdfbf7]"
              >
                <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-luxury-gold" fill="currentColor" size={24} />
                </div>
                <h3 className="text-2xl font-playfair text-luxury-dark mb-2">{person.name}</h3>
                <p className="text-luxury-gold uppercase tracking-widest text-sm font-inter">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Location */}
      <section className="py-24 px-4 bg-[#f9f7f2]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-playfair mb-6">Venue & Location</h2>
            <div className="flex justify-center items-center gap-4 text-luxury-gold mb-8">
              <div className="h-[1px] w-12 bg-luxury-gold/50"></div>
              <MapPin size={24} />
              <div className="h-[1px] w-12 bg-luxury-gold/50"></div>
            </div>
            <p className="text-gray-700 text-lg font-serif-elegant tracking-wide">
              Dandatikaru Sarpanje Garden & Function Hall, Telangana
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.523423736735!2d78.7293403114948!3d17.156288699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb061bf125c74b%3A0xb312f5bf0bc14924!2sDandatikaru%20Sarpanje%20Garden%20%26%20Function%20Hall!5e0!3m2!1sen!2sin!4v1713950000000!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
              ></iframe>
            </div>

            {/* QR Code */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 flex flex-col items-center justify-center text-center">
              <div className="bg-white p-4 rounded-xl mb-6 shadow-xl">
                <QRCode 
                  value="https://www.google.com/maps/place/Dandatikaru+Sarpanje+Garden+%26+Function+Hall/@17.1562887,78.731529,17z" 
                  size={200}
                  fgColor="#000000"
                />
              </div>
              <h3 className="text-2xl font-playfair text-luxury-dark mb-4 flex items-center gap-2">
                <QrCode className="text-luxury-gold" /> Scan for Directions
              </h3>
              <p className="text-gray-600 font-inter mb-8 max-w-sm">
                Scan this QR code with your mobile camera to open the venue location directly in Google Maps.
              </p>
              <a 
                href={mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-luxury-gold text-white px-8 py-3 rounded-full font-inter hover:bg-luxury-gold/90 transition-colors shadow-lg"
              >
                Open in Maps <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-luxury-dark text-white text-center">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
        >
          <h2 className="text-4xl md:text-6xl font-playfair italic mb-8">Saikiran <span className="text-luxury-gold">&</span> Akshitha</h2>
          <p className="text-white/60 tracking-[0.4em] uppercase text-sm mb-12">Save the Date • 02.07.2026</p>
          <div className="flex justify-center gap-6 mb-12 text-luxury-gold">
            <Heart fill="currentColor" />
            <Heart fill="currentColor" />
            <Heart fill="currentColor" />
          </div>
          <p className="text-white/40 text-sm font-inter">
            © 2026 Saikiran & Akshitha Wedding Invitation. All rights reserved.
          </p>
          <p className="text-white/40 text-sm font-inter mt-2 uppercase tracking-[0.2em]">
            Developed by Palle Prabhas
          </p>
          <a 
            href="mailto:prabhaspalle1131@gmail.com"
            className="inline-flex items-center gap-2 text-luxury-gold/80 hover:text-luxury-gold transition-colors text-sm font-inter mt-4"
          >
            <Mail size={16} /> prabhaspalle1131@gmail.com
          </a>
        </motion.div>
      </footer>
    </div>
  );
};

export default App;
