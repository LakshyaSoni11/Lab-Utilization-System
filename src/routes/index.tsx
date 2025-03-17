import { createFileRoute } from "@tanstack/react-router";
import React, { useRef } from "react";
// import Typed from 'react-typed'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

import type { Swiper as SwiperType } from "swiper";

export const Route = createFileRoute("/")({
    component: () => <RouteComponent />,
});

interface LabType {
    name: string;
    icon: string;
    description: string;
}

function RouteComponent(): JSX.Element {
    const labTypes: LabType[] = [
        { name: "Computer Labs", icon: "💻", description: "Modern computing facilities with latest software" },
        { name: "Hardware Labs", icon: "🔧", description: "Equipment for circuit design and testing" },
        { name: "Chemical Labs", icon: "🧪", description: "Fully equipped for experiments and research" },
        { name: "Electrical Labs", icon: "⚡", description: "Power systems and electrical engineering" },
        { name: "Mechanical Labs", icon: "⚙️", description: "Machinery and mechanical testing equipment" },
        { name: "Electronic Labs", icon: "📱", description: "Electronic component testing and design" },
        { name: "Physics Labs", icon: "🔭", description: "Experimental setup for physics research" },
    ];

    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* Hero Section */}
                <div className="text-center mb-16 pt-8">
                    <h1 className="text-6xl font-bold text-blue-700 mb-10">
                        Welcome to Lab Management System
                    </h1>
                    <p className="text-gray-500 text-2xl max-w-3xl mx-auto">
                        Efficiently manage and allocate laboratory resources across
                        departments with our comprehensive solution for faculty and
                        students.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                            Get Started
                        </button>
                        <button className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mb-16">
                    <h2 className="text-6xl font-bold mb-8 text-center text-gray-800">
                        Key Features
                    </h2>
                    <div className="flex justify-center gap-4 mb-8 text-4xl">
                        {/* <Typed
                            strings={[
                                "Easy Scheduling...",
                                "Real-time Updates...",
                                "Resource Tracking...",
                                "Automated Reports...",
                            ]}
                            typeSpeed={60}
                            backSpeed={50}
                            loop
                            className="font-medium"
                        /> */}
                    </div>
                </div>

                {/* Lab Types Section with Swiper */}
                <div className="mt-16 mb-16">
                    <h2 className="text-3xl font-semibold mb-11 text-center text-gray-800">
                        Available Laboratory Types
                    </h2>
                    <div className="flex items-center justify-between">
                        <button
                            className="text-3xl"
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Previous Slide"
                        >
                            <FaArrowAltCircleLeft />
                        </button>

                        <Swiper
                            onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
                            slidesPerView={1}
                            spaceBetween={25}
                            navigation
                            pagination
                            loop={true}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {labTypes.map((lab, index) => (
                                <SwiperSlide key={index}>
                                    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-all hover:-translate-y-1 duration-300 border border-gray-100">
                                        <div className="text-3xl">{lab.icon}</div>
                                        <h3 className="text-2xl font-semibold">{lab.name}</h3>
                                        <p className="text-gray-600 text-xl">{lab.description}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button
                            className="text-3xl"
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="Next Slide"
                        >
                            <FaArrowAltCircleRight />
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RouteComponent;
