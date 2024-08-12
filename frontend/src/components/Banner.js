import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CogIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
const Banner = ({ userId }) => {
    const [bannerData, setBannerData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/banner/${userId}`);
                setBannerData(response.data);
                setTimeLeft(response.data.timer);
            } catch (error) {
                console.error("Error fetching banner data:", error);
            }
        };

        fetchBannerData();
    }, [userId]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (bannerData) {
            axios.post('http://localhost:5000/api/banner/view', { id: bannerData.id });
        }
    }, [bannerData]);

    const handleBannerClick = () => {
        axios.post('http://localhost:5000/api/banner/click', { id: bannerData.id });
    };

    const formatTimeLeft = (seconds) => {
        const days = Math.floor(seconds / (24 * 3600));
        seconds %= 24 * 3600;
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
    };

    if (!bannerData || !bannerData.isVisible || timeLeft <= 0) {
        return null;
    }
    const handleSettingsClick = () => {
        navigate('/dashboard'); // Navigate to the Dashboard page
      };
    

    return (
        <div className="bg-gradient-to-r from-blue-700 to-[#B06AB3] font-sans px-6 py-12">
            <div className="container mx-auto flex flex-col justify-center items-center text-center">
            <CogIcon
          className="w-6 h-6 text-white cursor-pointer hover:text-gray-300"
          onClick={handleSettingsClick}
        />
                {bannerData.media_url && bannerData.media_type === 'image' && (
                    <img src={bannerData.media_url} alt="Banner Media" className="mb-4" />
                )}
                {bannerData.media_url && bannerData.media_type === 'video' && (
                    <video src={bannerData.media_url} controls className="mb-4" />
                )}
                <h2 className="text-white sm:text-4xl text-3xl font-bold mb-4">
                    {bannerData.title || "Explore the World"}
                </h2>
                <p className="text-white text-base text-center mb-8">
                    {bannerData.description}
                </p>
                {bannerData.link && (
                    <a
                        href={bannerData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleBannerClick}
                        className="mt-2 inline-block bg-white text-indigo-500 hover:bg-gray-200 px-6 py-3 rounded-full shadow-md font-semibold transition"
                    >
                        {bannerData.linkTitle || "Explore Now"}
                    </a>
                )}
                <p className="text-gray-400 text-center py-4">
                    Time remaining: {formatTimeLeft(timeLeft)}
                </p>
            </div>
        </div>
    );
};

export default Banner;
