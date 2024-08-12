import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(0);
    const [link, setLink] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/api/banner/1');
            setDescription(result.data.description);
            setTimer(result.data.timer);
            setLink(result.data.link);
            setIsVisible(result.data.isVisible);
            setStartTime(result.data.start_time);
            setEndTime(result.data.end_time);
            setMediaType(result.data.media_type);
            setMediaUrl(result.data.media_url);
        };
        fetchData();
    }, []);

    // Convert date-time format to 'YYYY-MM-DD HH:MM:SS'
    const formatDateForMySQL = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${seconds}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        

        await axios.post('http://localhost:5000/api/banner', {
            description, 
            timer, 
            link, 
            isVisible, 
           
            mediaType, 
            mediaUrl
        });
        alert('Banner updated');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Banner Dashboard</h1>
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows="3"
                    placeholder="Enter banner description"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Link</label>
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    placeholder="Enter banner link URL"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Timer (seconds)</label>
                <input
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={timer}
                    onChange={e => setTimer(e.target.value)}
                    placeholder="Enter time duration for the banner"
                />
            </div>

            <div className="mb-6 flex items-center">
                <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => setIsVisible(!isVisible)}
                    className="mr-2 leading-tight"
                />
                <span className="text-gray-700 text-sm font-bold">Banner Visibility</span>
            </div>
            <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Media Type</label>
      <select
        value={mediaType}
        onChange={e => setMediaType(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select Media Type</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
    </div>

    {/* Media URL Field */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Media URL</label>
      <input
        type="text"
        value={mediaUrl}
        onChange={e => setMediaUrl(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter media URL"
      />
    </div>

            <div className="flex items-center justify-center">
                <button
                    onClick={handleSubmit}
                    className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
                >
                    Update Banner
                </button>
            </div>
            {/* <div className="mb-4">
<h3 className="text-xl font-bold text-gray-700">Click Count: {clickCount}</h3>
</div> */}
        </div>
    </div>
    );
};

export default Dashboard;
