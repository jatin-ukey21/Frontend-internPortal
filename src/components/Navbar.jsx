// components/Navbar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Trophy, LogOut, User } from 'lucide-react';

const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
];
export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    }
    return (
        <div className="bg-white shadow-lg border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/dashboard" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">Intern Portal</span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map(({ to, label, icon: Icon }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${location.pathname === to
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className='font-medium'>Logout</span>
                    </button>
                </div>

                {/* Mobile menu button */}
                <div className='md:hidden pb-4'>
                    <div className='flex space-x-1'>
                        {navLinks.map(({ to, label, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 flex-1 justify-center ${location.pathname === to
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="font-medium text-sm">{label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
