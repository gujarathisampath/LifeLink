import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Zap, Shield, ArrowRight } from 'lucide-react';
import '../styles/home.css';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-content"
          >
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Live Database Active
            </div>
            
            <h1 className="hero-title">
              Find Blood.<br />
              <span>Save Lives.</span>
            </h1>
            
            <p className="hero-desc">
              Connect directly with blood donors in your area during emergencies. 
              A seamless, real-time platform bridging the gap between donors and recipients.
            </p>
            
            <div className="hero-buttons">
              <Link to="/find-blood" className="btn btn-primary btn-full">
                <Heart size={20} className="fill-white" /> Find Donor Now
              </Link>
              <Link to="/donate" className="btn btn-secondary btn-full">
                Register as Donor
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-image-wrapper"
          >
            <div className="hero-image-card">
              <img 
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2000&auto=format&fit=crop" 
                alt="Blood Donation" 
                className="hero-image"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="features-grid"
          >
            {[
              {
                icon: <Zap size={32} />,
                title: 'Real-time Search',
                desc: 'Find donors instantly based on blood group and location. No waiting, no middlemen.'
              },
              {
                icon: <Shield size={32} />,
                title: 'Verified Donors',
                desc: 'Our donors are registered with their complete health profiles for safe donations.'
              },
              {
                icon: <MapPin size={32} />,
                title: 'Location Based',
                desc: 'Find donors closest to your hospital to minimize emergency transportation time.'
              }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} className="card feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="vision-container">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="vision-content"
          >
            <h2 className="vision-title">Why LifeLink?</h2>
            <p className="vision-desc">
              Every two seconds, someone needs blood. LifeLink was created to ensure that 
              <span> nobody has to wait</span> in critical situations. By decentralizing 
              the search process, we empower families to contact donors directly.
            </p>
            <Link to="/about" className="vision-link">
              Read our story <ArrowRight size={20} />
            </Link>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="vision-stats"
          >
            <div className="stat-col offset">
              <motion.div variants={itemVariants} className="stat-card">
                <h3 className="stat-value">5M+</h3>
                <p className="stat-label">Units Needed Yearly</p>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <h3 className="stat-value">3</h3>
                <p className="stat-label">Lives Saved / Donation</p>
              </motion.div>
            </div>
            <div className="stat-col">
              <motion.div variants={itemVariants} className="stat-card">
                <h3 className="stat-value">12+</h3>
                <p className="stat-label">Cities Covered</p>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-card">
                <h3 className="stat-value">24/7</h3>
                <p className="stat-label">Available Search</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
