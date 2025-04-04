import React from "react";

const MapSection = () => {
    return (
        <div className="w-full h-[750px] py-20">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.5341452973726!2d21.012643453139987!3d52.2155127732276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecce798f3068b%3A0x112c475bf20e6a3!2sPolna%207A%2C%2000-625%20Warszawa!5e0!3m2!1spl!2spl!4v1743807964671!5m2!1spl!2spl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                className="rounded-lg shadow-2xl"
            ></iframe>
        </div>
    );
};

export default MapSection;
