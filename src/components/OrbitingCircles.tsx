import React from 'react';
import { Circles } from 'react-loader-spinner'; // Importer le composant Circles

const OrbitingCircles: React.FC = () => {
    return (
        <div className="orbiting-circles">
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default OrbitingCircles;