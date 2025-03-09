"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AccountSidebar from '@/components/account/AccountSidebar';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [activeTab, setActiveTab] = useState('personal');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  // Load user data on page load
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/auth/signin');
        return;
      }
      
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setFormData({
          ...formData,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || ''
        });
      } catch (error) {
        console.error('Failed to parse user data:', error);
        router.push('/auth/signin');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    
    // Clear success message
    if (successMessage) {
      setSuccessMessage('');
    }
  };
  
  const validatePersonalInfo = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    return newErrors;
  };
  
  const validatePassword = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
    
    if (formData.newPassword) {
      if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    return newErrors;
  };
  
  const handleSavePersonalInfo = async (e) => {
    e.preventDefault();
    
    const newErrors = validatePersonalInfo();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setSaving(true);
    
    try {
      // This would be your API call to update user data
      // For demo purposes, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local storage
      const updatedUser = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setSuccessMessage('Personal information updated successfully!');
    } catch (error) {
      setErrors({
        form: 'Failed to update profile. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    const newErrors = validatePassword();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setSaving(true);
    
    try {
      // This would be your API call to change password
      // For demo purposes, we'll just simulate a successful password change
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setSuccessMessage('Password changed successfully!');
    } catch (error) {
      setErrors({
        form: 'Failed to change password. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/auth/signin');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-textColor-secondary font-primary">
        <Navbar />
        <main className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-textColor-secondary font-primary">
      <Navbar />
      
      <main className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <AccountSidebar activePage="profile" />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-background-secondary p-6 md:p-8 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h1 className="text-2xl font-light text-primary">My Profile</h1>
                    <p className="text-textColor-muted mt-1">Manage your account details</p>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="btn-outline-primary flex items-center gap-2 px-4 py-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Logout
                  </button>
                </div>
                
                {successMessage && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-500 px-4 py-3 rounded mb-6">
                    {successMessage}
                  </div>
                )}
                
                {errors.form && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded mb-6">
                    {errors.form}
                  </div>
                )}
                
                {/* Tabs */}
                <div className="mb-8 border-b border-primary/10">
                  <div className="flex overflow-x-auto hide-scrollbar">
                    <button
                      onClick={() => setActiveTab('personal')}
                      className={`px-6 py-3 relative ${
                        activeTab === 'personal' ? 'text-primary' : 'text-textColor-muted hover:text-primary'
                      }`}
                    >
                      Personal Information
                      {activeTab === 'personal' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('security')}
                      className={`px-6 py-3 relative ${
                        activeTab === 'security' ? 'text-primary' : 'text-textColor-muted hover:text-primary'
                      }`}
                    >
                      Change Password
                      {activeTab === 'security' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                      )}
                    </button>
                  </div>
                </div>
                
                {activeTab === 'personal' && (
                  <form onSubmit={handleSavePersonalInfo} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-normal mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`input-primary w-full ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-normal mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`input-primary w-full ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-normal mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`input-primary w-full ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-normal mb-2">
                        Phone Number (optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-primary w-full"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={saving}
                        className="btn-primary flex items-center justify-center px-8 py-3"
                      >
                        {saving ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </div>
                  </form>
                )}
                
                {activeTab === 'security' && (
                  <form onSubmit={handleChangePassword} className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-normal mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className={`input-primary w-full ${errors.currentPassword ? 'border-red-500' : ''}`}
                        placeholder="••••••••"
                      />
                      {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-normal mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className={`input-primary w-full ${errors.newPassword ? 'border-red-500' : ''}`}
                        placeholder="••••••••"
                      />
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
                      )}
                      <p className="mt-2 text-xs text-textColor-muted">
                        Password must be at least 8 characters long
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-normal mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`input-primary w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        placeholder="••••••••"
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={saving}
                        className="btn-primary flex items-center justify-center px-8 py-3"
                      >
                        {saving ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Change Password'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Custom Styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
} 