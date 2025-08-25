import React, { useState } from 'react';
import { X, Phone, Mail, User, MapPin, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const indianCities = [
  // Metro Cities
  'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune',
  
  // Major Cities (A-H)
  'Ahmedabad', 'Agra', 'Amritsar', 'Aurangabad', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Coimbatore',
  'Dehradun', 'Faridabad', 'Ghaziabad', 'Gurgaon', 'Guwahati', 'Hubli-Dharwad',
  
  // Major Cities (I-P)
  'Indore', 'Jabalpur', 'Jaipur', 'Jammu', 'Jodhpur', 'Kanpur', 'Kochi', 'Kozhikode', 'Lucknow',
  'Ludhiana', 'Madurai', 'Mangalore', 'Meerut', 'Mysuru', 'Nagpur', 'Nashik', 'Noida', 'Patna',
  
  // Major Cities (R-Z)
  'Rajkot', 'Ranchi', 'Salem', 'Shimla', 'Srinagar', 'Surat', 'Thane', 'Thiruvananthapuram',
  'Tiruchirappalli', 'Udaipur', 'Vadodara', 'Varanasi', 'Vijayawada', 'Visakhapatnam', 'Warangal'
].sort();

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  console.log('AuthModal rendered, isOpen:', isOpen);
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    otp: ''
  });
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSendOTP = () => {
    if (!formData.phone) {
      setError('Please enter your mobile number');
      return;
    }
    
    if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setOtpSent(true);
    setMode('otp');
    setError('');
  };

  const handleLogin = async () => {
    console.log('handleLogin called with formData:', formData);
    try {
      await login({
        phone: formData.phone,
        otp: formData.otp
      });
      console.log('Login successful, closing modal');
      onClose();
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.city) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city
      });
      onClose();
    } catch (err) {
      setError('Registration failed');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', city: '', otp: '' });
    setError('');
    setOtpSent(false);
  };

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      <div
        className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden z-[10000]"
      >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {mode === 'login' ? 'Welcome Back!' : 
                     mode === 'otp' ? 'Verify OTP' : 'Join EcoWaste'}
                  </h2>
                  <p className="text-green-100 text-sm">
                    {mode === 'login' ? 'Sign in to your account' : 
                     mode === 'otp' ? 'Enter the OTP sent to your phone' : 
                     'Create your account to get started'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {error && (
                <div
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                >
                  {error}
                </div>
              )}

              {mode === 'login' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your 10-digit mobile number"
                        className="input-enhanced pl-10"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                  >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => switchMode('register')}
                      className="text-green-600 dark:text-green-400 hover:underline text-sm"
                    >
                      Don't have an account? Register here
                    </button>
                  </div>
                </div>
              )}

              {mode === 'otp' && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      OTP sent to +91 {formData.phone}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      For demo, use: <span className="font-mono font-bold">1234</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleInputChange}
                      placeholder="Enter 4-digit OTP"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white text-center text-lg tracking-widest"
                      maxLength={4}
                    />
                  </div>

                  <button
                    onClick={handleLogin}
                    disabled={isLoading || formData.otp.length !== 4}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Login'}
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => setMode('login')}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
                    >
                      ← Back to mobile number
                    </button>
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your 10-digit mobile number"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select your city</option>
                        {indianCities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Your data is secure and will only be used for waste management services.
                  </div>

                  <button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => switchMode('login')}
                      className="text-green-600 dark:text-green-400 hover:underline text-sm"
                    >
                      Already have an account? Sign in
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
  );
}
