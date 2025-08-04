import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
                /*
                const dummyData = [
                    { rank: 1, name: 'Sarah Chen', referralCode: 'sarah2025', donationsRaised: 28500, referrals: 42 },
                    { rank: 2, name: 'Michael Rodriguez', referralCode: 'mike2025', donationsRaised: 24800, referrals: 38 },
                    { rank: 3, name: 'Emily Davis', referralCode: 'emily2025', donationsRaised: 22100, referrals: 35 },
                    { rank: 4, name: 'James Wilson', referralCode: 'james2025', donationsRaised: 19750, referrals: 31 },
                    { rank: 5, name: 'Alex Johnson', referralCode: 'alex2025', donationsRaised: 15420, referrals: 23 },
                    { rank: 6, name: 'Jessica Thompson', referralCode: 'jess2025', donationsRaised: 14200, referrals: 22 },
                    { rank: 7, name: 'David Kim', referralCode: 'david2025', donationsRaised: 12800, referrals: 19 },
                    { rank: 8, name: 'Lisa Anderson', referralCode: 'lisa2025', donationsRaised: 11500, referrals: 18 },
                    { rank: 9, name: 'Chris Parker', referralCode: 'chris2025', donationsRaised: 10200, referrals: 16 },
                    { rank: 10, name: 'Anna Martinez', referralCode: 'anna2025', donationsRaised: 9750, referrals: 15 },
                ];
                setLeaderboardData(dummyData);
                */
                const res = await fetch("http://localhost:8080/api/leaderboard");
                const dummyData = await res.json();
                console.log(dummyData);
                setLeaderboardData(dummyData);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-6 h-6 text-yellow-500" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Award className="w-6 h-6 text-amber-600" />;

            default:
                return <span className='w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600'>#{rank}</span>
        }
    }
    const getRankCardClass = (rank) => {
        switch (rank) {
            case 1:
                return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 shadow-md';
            case 2:
                return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 shadow-md';
            case 3:
                return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-md';
            default:
                return 'bg-white border-gray-200 hover:bg-gray-50';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboard</h1>
                <p className="text-lg text-gray-600">See how you stack up against other interns</p>
            </div>
            { /* Leaderboard Entries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {leaderboardData.slice(0, 3).map((entry, index) => (
                    <div
                        key={entry.rank}
                        className={`${getRankCardClass(entry.rank)} rounded-xl p-6 border-2 transition-all duration-200 ${index === 0 ? 'md:order-2 transform md:scale-105' : index === 1 ? 'md:order-1' : 'md:order-3'
                            }`}
                    >
                        <div className='text-center'>
                            <div className='flex justify-center mb-4'>{getRankIcon(entry.rank)}</div>
                            <h3 className='text-xl font-bold text-gray-900 mb-2'>{entry.name}</h3>
                            <p className='text-sm text-gray-600 mb-1'>@{entry.referralCode}</p>
                            <div className='mt-4 space-y-2'>
                                <div className='flex items-center justify-center space-x-2'>
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className='text-lg font-semibold text-gray-900'>${entry.donationsRaised.toLocaleString()} Raised</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{entry.referrals} referrals</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Full Leaderboard */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                <div className='px-6 py-4 border-b border-gray-200'>
                    <h2 className='text-xl font-semibold text-gray-900'>Full Rankings</h2>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Rank</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Intern Name</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Referral Code</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Donations Raised</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Referrals</th>
                            </tr>
                        </thead>
                        {/* divide-y Adds horizontal dividers between each row (<tr>) inside the body. */}
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {leaderboardData.map((entry) => (
                                <tr
                                    key={entry.rank}
                                    className={`transition-colors duration-200 ${entry.name === 'Alex Johnson'
                                        ? 'bg-blue-50 border-l-4 border-blue-500'
                                        : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {/* whitespace-nowrap means: ‘Keep the text on a single line, no matter how long it is. Do not move to the next line. */}
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>{getRankIcon(entry.rank)}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-white font-medium text-sm">
                                                    {entry.name
                                                        .split(' ')  // Split the name into an array of words
                                                        .map((n) => n[0])  // Get the first letter of each word
                                                        .join('')} {/* Joins all those letters together as one string */}
                                                </span>
                                            </div>
                                            <div className='text-sm font-medium text-gray-900'>
                                                {entry.name}
                                                {entry.name === 'Alex Johnson' && (
                                                    <span className='ml-2 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                                                        You
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>@{entry.referralCode}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                        ${entry.donationsRaised.toLocaleString()}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>{entry.referrals}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
                    <div className='text-center'>
                        <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3'>
                            <TrendingUp className='w-6 h-6 text-green-600' />
                        </div>
                        <p className='text-2xl font-bold text-gray-900'>
                            ${leaderboardData.reduce((sum, entry) => sum + entry.donationsRaised, 0).toLocaleString()}
                        </p>
                        <p className='text-sm text-gray-600'>Total Raised</p>
                    </div>
                </div>
                <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Trophy className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{leaderboardData.length}</p>
                        <p className="text-sm text-gray-600">Active Interns</p>
                    </div>
                </div>
                <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Award className="w-6 h-6 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {leaderboardData.reduce((sum, entry) => sum + entry.referrals, 0)}
                        </p>
                        <p className="text-sm text-gray-600">Total Referrals</p>
                    </div>
                </div>
            </div>
        </div>
    );
}