import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Analytics = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/analytics');
                setBanners(response.data);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Banner Analytics</h2>
            <div className="space-y-4">
                {banners.length > 0 ? (
                    banners.map((banner) => (
                        <div key={banner.id} className="bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{banner.description}</h3>
                            <p className="text-gray-600 mb-1">Views: {banner.views}</p>
                            <p className="text-gray-600 mb-1">Clicks: {banner.clicks}</p>
                            <p className="text-gray-600">Click-Through Rate: {((banner.clicks / banner.views) * 100).toFixed(2)}%</p>
                        </div>
                    ))
                ) : (
                    <p>No banner analytics available.</p>
                )}
            </div>
        </div>
    );
};

export default Analytics;
