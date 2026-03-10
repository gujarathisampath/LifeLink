import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Scale, Activity, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import '../styles/donate.css';

const Donate: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    weight: '',
    hbPercentage: '',
    email: '',
    phone: '',
    bloodGroup: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const user = session.user;
        setFormData(prev => ({
          ...prev,
          fullName: user.user_metadata?.full_name || prev.fullName,
          email: user.email || prev.email,
          bloodGroup: user.user_metadata?.blood_group || prev.bloodGroup
        }));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const user = session.user;
          setFormData(prev => ({
            ...prev,
            fullName: user.user_metadata?.full_name || prev.fullName,
            email: user.email || prev.email,
            bloodGroup: user.user_metadata?.blood_group || prev.bloodGroup
          }));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('donors')
        .insert([
          {
            full_name: formData.fullName,
            age: parseInt(formData.age),
            gender: formData.gender,
            weight: formData.gender === 'Female' && formData.weight ? parseFloat(formData.weight) : null,
            hb_percentage: formData.gender === 'Female' && formData.hbPercentage ? parseFloat(formData.hbPercentage) : null,
            email: formData.email,
            phone: formData.phone,
            blood_group: formData.bloodGroup
          }
        ]);

      if (supabaseError) throw supabaseError;

      setIsSuccess(true);
      setFormData({
        fullName: '',
        age: '',
        gender: '',
        weight: '',
        hbPercentage: '',
        email: '',
        phone: '',
        bloodGroup: ''
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred while registering. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="page-container success-view">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card success-card"
        >
          <div className="success-icon-wrapper">
            <CheckCircle2 className="success-icon" />
          </div>
          <h2 className="success-title">Registration Successful!</h2>
          <p className="success-desc">
            Thank you for becoming a donor. You're now a lifesaver in our community.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="btn btn-primary btn-full"
          >
            Register Another Donor
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-container donate-container">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="section-header"
      >
        <div className="badge">
          Be a Hero
        </div>
        <h1 className="section-title">Register as a Donor</h1>
        <p className="section-subtitle">
          Your contribution can give someone a second chance at life.
        </p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <User className="form-icon" />
              <input 
                type="text" 
                name="fullName"
                placeholder="John Doe" 
                className="form-control" 
                required 
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <Mail className="form-icon" />
              <input 
                type="email" 
                name="email"
                placeholder="john@example.com" 
                className="form-control" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <Phone className="form-icon" />
              <input 
                type="tel" 
                name="phone"
                placeholder="+91 98765 43210" 
                className="form-control" 
                required 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Age</label>
              <Activity className="form-icon" />
              <input 
                type="number" 
                name="age"
                placeholder="25" 
                min="18" 
                max="65" 
                className="form-control" 
                required 
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <Heart className="form-icon" />
              <select 
                name="bloodGroup"
                className="form-control" 
                required 
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
            </select>
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <User className="form-icon" />
              <select 
                name="gender"
                className="form-control" 
                required 
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Conditional fields for health metadata */}
          {formData.gender === 'Female' && (
            <div className="health-meta-box">
              <h3 className="form-label mb-4" style={{ fontSize: '1.125rem' }}>Health Metadata</h3>
              <div className="form-grid" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Weight (kg)</label>
                  <Scale className="form-icon" />
                  <input 
                    type="number" 
                    name="weight"
                    placeholder="65" 
                    min="40" 
                    className="form-control" 
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">HB Percentage (%)</label>
                  <Activity className="form-icon" />
                  <input 
                    type="number" 
                    name="hbPercentage"
                    placeholder="13.5" 
                    step="0.1" 
                    className="form-control" 
                    value={formData.hbPercentage}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary btn-full"
            style={{ marginTop: '32px' }}
          >
            {isLoading ? 'Registering...' : (
              <>
                Register as Donor <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Donate;
