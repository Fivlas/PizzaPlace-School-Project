import React from "react";
import Image from "next/image";

const History = () => {
    return (
        <div id="about" className="py-20">
            <div className="bg-stone-50 rounded-3xl shadow-xl py-20">
                <div className="container mx-auto md:px-8 px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-[Shrikhand] text-[#e74a27] decoration-wavy underline underline-offset-15 mb-4">
                            Our History
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto pt-4">
                            From humble beginnings to becoming a beloved
                            culinary destination, our journey has been filled
                            with passion for authentic flavors.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src="/pizzaShop.jpg"
                                alt="Our restaurant in the early days"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="border-l-4 border-[#e74a27] pl-4">
                                <h3 className="text-2xl font-bold mb-2">
                                    1985 - Where It All Began
                                </h3>
                                <p className="text-gray-600">
                                    Our founder, Maria Rodriguez, opened the
                                    first small taqueria with just five tables
                                    and her grandmother&apos;s recipes.
                                </p>
                            </div>

                            <div className="border-l-4 border-[#e74a27] pl-4">
                                <h3 className="text-2xl font-bold mb-2">
                                    1995 - Expanding Our Vision
                                </h3>
                                <p className="text-gray-600">
                                    After a decade of success, we moved to our
                                    current location and expanded our menu while
                                    staying true to our authentic roots.
                                </p>
                            </div>

                            <div className="border-l-4 border-[#e74a27] pl-4">
                                <h3 className="text-2xl font-bold mb-2">
                                    2010 - Award-Winning Cuisine
                                </h3>
                                <p className="text-gray-600">
                                    Our dedication to quality earned us
                                    recognition as the "Best Mexican Restaurant"
                                    in the city for three consecutive years.
                                </p>
                            </div>

                            <div className="border-l-4 border-[#e74a27] pl-4">
                                <h3 className="text-2xl font-bold mb-2">
                                    Today
                                </h3>
                                <p className="text-gray-600">
                                    We continue to serve our community with the
                                    same passion and commitment to authentic
                                    flavors that started it all.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
