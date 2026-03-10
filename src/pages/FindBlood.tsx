import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Phone, Droplets, AlertCircle, Loader2, User, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import '../styles/findblood.css';

interface Donor {
  id: string;
  full_name: string;
  blood_group: string;
  phone: string;
  email: string;
  gender: string;
}

const FindBlood: React.FC = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [broadcastStatus, setBroadcastStatus] = useState<'idle' | 'broadcasting' | 'success'>('idle');

  useEffect(() => {
    fetchRecentDonors();
  }, []);

  const fetchRecentDonors = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(9);
      
      if (error) throw error;
      setDonors(data || []);
    } catch (err) {
      console.error('Error fetching recent donors:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDonors = async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      let query = supabase
        .from('donors')
        .select('*');
      
      if (bloodGroup) {
        query = query.eq('blood_group', bloodGroup);
      }

      const { data, error } = await query;
      if (error) throw error;
      setDonors(data || []);
    } catch (err) {
      console.error('Error fetching donors:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setHasSearched(false);
    setBloodGroup('');
    fetchRecentDonors();
  };

  const handleBroadcast = () => {
    setBroadcastStatus('broadcasting');
    // Simulate network request for broadcasting emergency
    setTimeout(() => {
      setBroadcastStatus('success');
      setTimeout(() => {
        setBroadcastStatus('idle');
      }, 5000);
    }, 2000);
  };

  return (
    <div className="page-container findblood-container">
      {/* Search Header */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="section-header"
      >
        <h1 className="section-title">Find Life-Saving Help</h1>
        <p className="section-subtitle">
          Search our database of verified donors and get help instantly during emergencies.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card search-card"
      >
        <div className="search-input-wrapper">
          <Droplets className="search-icon" />
          <select 
            className="search-select"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">All Blood Groups</option>
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={fetchDonors}
          disabled={isLoading}
          className="search-button"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <><Search size={20} /> Search Donors</>}
        </button>
      </motion.div>

      {/* Results Section */}
      <div className="results-section">
        <div className="results-header">
          <h2 className="results-title">
            {hasSearched ? `Found ${donors.length} Donors` : 'Recent Registrations'}
          </h2>
          {hasSearched && (
            <button 
              onClick={handleClear}
              className="clear-button"
            >
              Clear Results
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="loading-state">
            <Loader2 size={48} className="loading-icon animate-spin" />
            <p className="loading-text">Searching donor database...</p>
          </div>
        ) : (
          <div className="results-grid">
            <AnimatePresence>
              {donors.length > 0 ? (
                donors.map((donor, idx) => (
                  <motion.div 
                    key={donor.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="card donor-card"
                  >
                    <div className="donor-header">
                      <div className="donor-icon-wrapper">
                        <User size={24} />
                      </div>
                      <span className="badge badge-red">{donor.blood_group}</span>
                    </div>
                    <h3 className="donor-name">{donor.full_name}</h3>
                    <div className="donor-details">
                      <div className="donor-detail-item">
                        <MapPin size={16} />
                        <span>Verified Location</span>
                      </div>
                      <div className="donor-detail-item">
                        <Phone size={16} />
                        <span>{donor.phone}</span>
                      </div>
                    </div>
                    <a 
                      href={`tel:${donor.phone}`}
                      className="btn btn-secondary btn-full donor-contact-btn"
                    >
                      Contact Donor
                    </a>
                  </motion.div>
                ))
              ) : hasSearched ? (
                <div className="empty-state">
                  <AlertCircle size={64} className="empty-icon text-accent" />
                  <h3 className="empty-title">No Donors Found</h3>
                  <p className="empty-text">Try searching for a different blood group or area.</p>
                </div>
              ) : (
                <div className="empty-state">
                  <p className="empty-text">No recent registrations found.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Emergency Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="emergency-banner"
      >
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">In a Critical Emergency?</h2>
          <p className="text-white/80 mb-8 text-lg" style={{
            color: "white"
          }}>
            Trigger a real-time broadcast to all donors in our network. This will notify everyone within 10km immediately.
          </p>
          <button 
            onClick={handleBroadcast}
            disabled={broadcastStatus !== 'idle'}
            className="bg-white text-primary px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform active:scale-95 flex items-center gap-2 mx-auto disabled:opacity-80 disabled:hover:scale-100"
          >
            {broadcastStatus === 'idle' && <><AlertCircle className="w-6 h-6" /> BROADCAST EMERGENCY</>}
            {broadcastStatus === 'broadcasting' && <><Loader2 className="w-6 h-6 animate-spin" /> BROADCASTING...</>}
            {broadcastStatus === 'success' && <><CheckCircle2 className="w-6 h-6 text-green-500" /> ALERT SENT SUCESSFULLY!</>}
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </motion.div>
    </div>
  );
};

export default FindBlood;
