import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { ArrowRight, CheckCircle, Users, Coins, Heart, Zap, Shield, Star } from 'lucide-react';
import * as THREE from 'three';

// Animated background particles component
function AnimatedParticles() {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const radius = Math.random() * 10 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0026B5"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

// Feature card component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-[#0026B5] to-[#E24E1B] rounded-xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-[#D9DDE7] leading-relaxed">{description}</p>
  </motion.div>
);

// Why HustlU item component
const WhyItem = ({ icon: Icon, text, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center space-x-3 mb-4"
  >
    <div className="w-8 h-8 bg-gradient-to-br from-[#FF7F50] to-[#E24E1B] rounded-full flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-white" />
    </div>
    <span className="text-white text-lg">{text}</span>
  </motion.div>
);

const LandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const handleEnterApp = () => {
    window.location.href = '/home';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#031E34] via-[#0026B5] to-[#031E34] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <AnimatedParticles />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#031E34]/80 via-transparent to-[#031E34]/80 z-10" />

      {/* Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ y, opacity }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#FF7F50] to-[#E24E1B] rounded-2xl flex items-center justify-center shadow-2xl">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-2 tracking-tight">
                HustlU
              </h1>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Made for{' '}
              <span className="bg-gradient-to-r from-[#FF7F50] to-[#E24E1B] bg-clip-text text-transparent">
                Hustlers
              </span>
              ,<br />
              by{' '}
              <span className="bg-gradient-to-r from-[#0026B5] to-[#FF7F50] bg-clip-text text-transparent">
                Hustlers
              </span>
              .
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-[#D9DDE7] mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              One campus. Hundreds of hustlers.{' '}
              <span className="text-[#FF7F50] font-semibold">Need help?</span>{' '}
              Just HustlU.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={handleEnterApp}
                className="group bg-gradient-to-r from-[#E24E1B] to-[#FF7F50] text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-[#E24E1B]/25 transition-all duration-300 flex items-center space-x-3 mx-auto"
              >
                <span>Enter HustlU</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF7F50] mb-1">500+</div>
                <div className="text-[#D9DDE7]">Active Hustlers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF7F50] mb-1">1,200+</div>
                <div className="text-[#D9DDE7]">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF7F50] mb-1">4.9★</div>
                <div className="text-[#D9DDE7]">Average Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-[#D9DDE7] max-w-2xl mx-auto">
                Connect with fellow students for quick help and earn while you assist others
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Users}
                title="Ask for Help"
                description="Need a charger, notes, or quick advice? Post your request and get help from nearby students in minutes."
                delay={0}
              />
              <FeatureCard
                icon={Coins}
                title="Offer Help"
                description="Earn coins and build your reputation by helping fellow students with their requests around campus."
                delay={0.2}
              />
              <FeatureCard
                icon={Heart}
                title="Build Your Circle"
                description="Create lasting connections with your peers and build a network of mutual support on campus."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Why HustlU Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
                  Why{' '}
                  <span className="bg-gradient-to-r from-[#FF7F50] to-[#E24E1B] bg-clip-text text-transparent">
                    HustlU
                  </span>
                  ?
                </h2>
                
                <WhyItem
                  icon={CheckCircle}
                  text="Peer-to-peer micro-support"
                  delay={0}
                />
                <WhyItem
                  icon={Star}
                  text="Built by students, for students"
                  delay={0.1}
                />
                <WhyItem
                  icon={Shield}
                  text="No bloat, just results"
                  delay={0.2}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0026B5] to-[#FF7F50] rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Campus Community</div>
                        <div className="text-[#D9DDE7] text-sm">Verified students only</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E24E1B] to-[#FF7F50] rounded-full flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Instant Help</div>
                        <div className="text-[#D9DDE7] text-sm">Get assistance in minutes</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FF7F50] to-[#0026B5] rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Safe & Secure</div>
                        <div className="text-[#D9DDE7] text-sm">Built-in safety features</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Start{' '}
              <span className="bg-gradient-to-r from-[#FF7F50] to-[#E24E1B] bg-clip-text text-transparent">
                Hustling
              </span>
              ?
            </h2>
            <p className="text-xl text-[#D9DDE7] mb-8">
              Join hundreds of students already helping each other succeed
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={handleEnterApp}
                className="group bg-gradient-to-r from-[#E24E1B] to-[#FF7F50] text-white px-12 py-5 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-[#E24E1B]/25 transition-all duration-300 flex items-center space-x-4 mx-auto"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[#D9DDE7]">
              © 2024 HustlU. Made with ❤️ by students, for students.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;