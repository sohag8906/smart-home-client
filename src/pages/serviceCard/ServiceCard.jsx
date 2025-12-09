import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{service?.service_name}</h2>
            <p>{service?.description}</p>
            <p className="text-green-600 font-semibold">Price: ${service?.price}</p>
        </div>
    );
};

export default ServiceCard;
