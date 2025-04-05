import React from "react";

const MapSection = () => {
    return (
        <div className="py-20">
            <div className="py-20 bg-stone-50 rounded-3xl shadow-xl">
                <div className="container mx-auto md:px-8 px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-[Shrikhand] text-[#e74a27] decoration-wavy underline underline-offset-15 mb-4">
                            Find us
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto pt-4">
                            We are located in the center of Warsaw, in the heart
                            of the city.
                        </p>
                    </div>

                    <div className="relative h-[600px] rounded-lg overflow-hidden shadow-xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.5341452973726!2d21.012643453139987!3d52.2155127732276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecce798f3068b%3A0x112c475bf20e6a3!2sPolna%207A%2C%2000-625%20Warszawa!5e0!3m2!1spl!2spl!4v1743807964671!5m2!1spl!2spl"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            width="100%"
                            height="100%"
                            className="rounded-lg shadow-2xl border-4 border-dashed border-[#6d947c]"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapSection;
