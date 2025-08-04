import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { User, Mail, Lock, ArrowRight } from 'lucide-react'; // Assuming you have lucide-react installed for icons

export default function LoginSignup() {
    const [activeTab, setActiveTab] = useState('login'); // State to manage active tab
    const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to dashboard (no real authentication, but that could be added later)
    navigate('/dashboard');
  };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
            <div className='w-full max-w-md'> {/*Take up the full width of the parent container up to a max of 448px. */}
                <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                    {/* Header section */}
                    <div id='header' className='bg-gradient-to-r from-blue-600 to-emerald-600 p-8 flex flex-col items-center justify-center gap-2.5'>
                        <div className='flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-1.5'>
                            <User className='w-8 h-8 text-white' />
                        </div>
                        <h1 className="text-2xl font-bold text-white ">Intern Portal</h1>
                        <p className="text-blue-100">Welcome to your dashboard</p>
                    </div>


                    {/* Tabs for Login and Signup */}
                    <div className='flex bg-gray-50'>
                        {/* Here flex-1 divides space evenly between components*/}
                        <button onClick={() => setActiveTab('login')} className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200  ${activeTab === 'login' ? 'bg-blue-40 text-blue-600 bg-white border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Login</button>
                        <button onClick={() => setActiveTab('signup')} className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${activeTab === 'signup' ? 'bg-blue-40  text-blue-600 bg-white border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Sign Up</button>
                    </div>

                    <div className='p-8'>
                        {/* {activeTab === 'login' ? (<h1>hello login</h1>) : (<h1>hello login</h1>)} */}
                        <form onSubmit={handleSubmit} className='space-y-6'>
                            {activeTab === 'signup' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>

                                    <div className="flex items-center gap-3.5 border border-gray-200 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                                        <User className="w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className="w-full bg-transparent placeholder-gray-400 text-gray-700 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>

                                <div className="flex items-center gap-3.5 border border-gray-200 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className="w-full bg-transparent placeholder-gray-400 text-gray-700 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>

                                <div className="flex items-center gap-3.5 border border-gray-200 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        className="w-full bg-transparent placeholder-gray-400 text-gray-700 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <button className='w-full rounded-lg text-white font-medium text-md py-3 bg-gradient-to-r from-blue-600 to-emerald-600 group hover:from-blue-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2'>
                                <span>{activeTab == 'login' ? 'Sign In' : 'Create Account'}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                {activeTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                                <button
                                    onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                                >
                                    {activeTab === 'login' ? 'Sign Up' : 'Sign In'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
