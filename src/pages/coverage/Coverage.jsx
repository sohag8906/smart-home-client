import React, { useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLoaderData } from 'react-router-dom';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Coverage = () => {
    const position = [23.6850, 90.3563];
    const servicesCenter = useLoaderData();
    const mapRef = useRef(null);
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const location = search;

        const district = servicesCenter.find(c =>
            c.district.toLowerCase().includes(location.toLowerCase())
        );

        if (district && mapRef.current) {
            const coord = [district.latitude, district.longitude];
            mapRef.current.flyTo(coord, 14);
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 transition-colors duration-300'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2'>We are available in 64 districts</h2>
                <p className='text-gray-600 dark:text-gray-300 mb-6'>Find our service coverage across Bangladesh</p>

                {/* Search Bar */}
                <div className='mb-6'>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="flex-1 relative">
                            <input 
                                type="search" 
                                className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
                                placeholder="Search district..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="absolute left-3 top-3.5">
                                <svg className="w-5 h-5 text-gray-400 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
                                    <path d="m21 21-4.3-4.3" strokeWidth="2"></path>
                                </svg>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Map Container */}
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700'>
                    <div className='h-[500px] md:h-[600px]'>
                        <MapContainer 
                            center={position} 
                            zoom={7} 
                            scrollWheelZoom={true}
                            className='h-full w-full'
                            ref={mapRef}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {servicesCenter.map((center, index) => (
                                <Marker key={index} position={[center.latitude, center.longitude]}>
                                    <Popup>
                                        <div className='p-2'>
                                            <strong className='text-green-700 dark:text-green-400'>{center.district}</strong> 
                                            <br /> 
                                            <span className='text-gray-600 dark:text-gray-300'>Service Areas:</span>
                                            <div className='mt-1'>
                                                {Array.isArray(center.covered_area) 
                                                    ? center.covered_area.join(', ')
                                                    : center.covered_area
                                                }
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>

                {/* Info Section */}
                <div className='mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-green-200 dark:border-gray-700 transition-colors duration-300'>
                    <h3 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3'>Nationwide Service Network</h3>
                    <p className='text-gray-600 dark:text-gray-300 mb-4'>
                        Our professional decorators are available in every district of Bangladesh. 
                        Book your decoration service today!
                    </p>
                    <a 
                        href="/contact" 
                        className='inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium'
                    >
                        Contact for Service
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Coverage;
