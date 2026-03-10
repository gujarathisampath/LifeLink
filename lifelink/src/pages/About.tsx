import React from 'react';
import { motion } from 'framer-motion';
import { Info, Users, Code, Linkedin, Mail, Github, Heart, User } from 'lucide-react';
import '../styles/about.css';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="page-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-header"
      >
        <span className="badge">Our Story</span>
        <h1 className="section-title">About LifeLink</h1>
        <p className="section-subtitle">
          We're on a mission to ensure that no life is lost due to a lack of timely blood donation.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="about-grid"
      >
        <motion.div variants={itemVariants} className="card about-card">
          <div className="about-icon-wrapper">
            <Info size={32} />
          </div>
          <h2 className="about-card-title">The Project</h2>
          <p className="about-card-desc">
            LifeLink is a next-generation blood donation platform that leverages technology to bridge the communication gap between donors and those in need. Built with React, Supabase, and pure CSS, it provides a seamless, real-time experience during critical emergencies.
          </p>
          <Code size={128} className="about-bg-icon" />
        </motion.div>

        <motion.div variants={itemVariants} className="card about-card">
          <div className="about-icon-wrapper">
            <Users size={32} />
          </div>
          <h2 className="about-card-title">Our Vision</h2>
          <p className="about-card-desc">
            We aim to create a global network of verified donors where help is just a click away. Our vision is to eliminate the panic of finding blood during emergencies by providing a transparent, fast, and secure locator system.
          </p>
          <Heart size={128} className="about-bg-icon" />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="card profile-card"
      >
        <div className="profile-content">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <h2 className="profile-name">Gujjula Ravithreni</h2>
          <p className="profile-role">Lead Developer</p>
          <p className="profile-desc">
            A B.Tech Computer Science student at Malla Reddy College of Engineering and Technology. Passionate about creating software that solves real-world problems. Ravithreni combined her technical skills with a social mission to create LifeLink.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" title="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="social-link" title="GitHub">
              <Github size={20} />
            </a>
            <a href="#" className="social-link" title="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="profile-blob"></div>
      </motion.div>
    </div>
  );
};

export default About;
