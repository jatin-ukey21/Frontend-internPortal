import React, { useState, useEffect } from 'react';
import { DollarSign, Users, Award, Gift, TrendingUp, Copy, Check } from 'lucide-react';

export default function Dashboard() {
    const [internData, setInternData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchInternData = async () => {
            try {
                setLoading(true);
                // await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
                // const dummyData = {
                //     name: 'Steve Rogers',
                //     referralCode: 'alex2025',
                //     totalDonations: 15420,
                //     totalReferrals: 23,
                //     rank: 5,
                // };
                const res = await fetch("http://localhost:8080/api/intern");
                const dummyData = await res.json();
                console.log(dummyData);
                setInternData(dummyData);
            }
            catch (error) {
                console.error('Error fetching intern data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchInternData();
    }, []);

    const copyReferralCode = async () => {
        if (internData?.referralCode) {
            // Copy the referral code to clipboard
            navigator.clipboard.writeText(internData.referralCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    const rewards = [
        { id: 1, title: 'First Donation', description: 'Complete your first referral', unlocked: true, icon: Gift },
        { id: 2, title: 'Team Player', description: 'Refer 10 people', unlocked: true, icon: Users },
        { id: 3, title: 'Rising Star', description: 'Raise $10,000', unlocked: true, icon: TrendingUp },
        { id: 4, title: 'Top Performer', description: 'Reach top 5 leaderboard', unlocked: true, icon: Award },
        { id: 5, title: 'Champion', description: 'Raise $25,000', unlocked: false, icon: Award },
        { id: 6, title: 'Legend', description: 'Reach #1 on leaderboard', unlocked: false, icon: Award },
    ];

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-96'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-200' ></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className=' bg-gradient-to-r from-blue-600 to-emerald-600 p-8 rounded-2xl text-white'>
                <h1 className="text-3xl font-bold mb-4">Welcome, {internData?.name}!</h1>
                <p className='text-blue-100'>Here's your performance overview</p>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <StatCard
                    title="Total Donations"
                    value={`$${internData?.totalDonations.toLocaleString()}`}
                    Icon={DollarSign}
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                />
                <StatCard
                    title="Referrals"
                    value={internData?.totalReferrals}
                    Icon={Users}
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <StatCard
                    title="Leaderboard Rank"
                    value={`#${internData?.rank}`}
                    Icon={Award}
                    iconBg="bg-orange-100"
                    iconColor="text-orange-600"
                />
                <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm font-medium text-gray-600'>Referral Code</p>
                            <div className="flex items-center space-x-2">
                                <p className="text-xl font-bold text-gray-900">{internData?.referralCode}</p>
                                <button
                                    onClick={copyReferralCode}
                                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                    )}


                                </button>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Gift className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>


            </div>
            {/* Rewards Section */}
            <div className='bg-white rounded-xl p-8 shadow-sm border border-gray-100'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Rewards & Achievments</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {rewards.map((reward) => {
                        const IconComponent = reward.icon;
                        return (
                            <div
                                key={reward.id}
                                className={`p-6 rounded-lg border-2 transition-all duration-200 ${reward.unlocked
                                    ? 'border-green-200 bg-green-50 hover:bg-green-100'
                                    : 'border-gray-200 bg-gray-50 opacity-60'
                                    }`}
                            >
                                <div className='flex items-center space-x-3 mb-3'>
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${reward.unlocked
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        <IconComponent className='w-5 h-5' />
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold ${reward.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                                            {reward.title}
                                        </h3>
                                        {reward.unlocked && (
                                            <span className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Unlocked
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className={`text-sm ${reward.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {reward.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, Icon, iconBg, iconColor }) => {

    return (
        <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>
        </div>
    )
};