import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent text-white">
            <div className="text-center">
                <div className="loader border-t-4 border-purple-500 rounded-full w-24 h-24 mb-4 animate-spin"></div>
                <h1 className="text-2xl font-bold animate-gradient animate-pulse">Loading...</h1>
            </div>
        </div>
    );
};

export default LoadingScreen;
