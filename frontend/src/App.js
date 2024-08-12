import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';

function App() {
    return (
        <Router>
            <div>
                
                <Routes>
                    <Route path="/" element={<Banner userId={1} />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
