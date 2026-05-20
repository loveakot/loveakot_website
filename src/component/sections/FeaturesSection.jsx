import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import feature1 from "../../assets/features/1.png";
import feature2 from "../../assets/features/2.png";
import feature3 from "../../assets/features/3.png";
import feature4 from "../../assets/features/4.png";
import feature5 from "../../assets/features/5.png";
import feature6 from "../../assets/features/6.png";
import feature7 from "../../assets/features/7.png";

const features = [
    {
        text: "Love Akot Market",
        description:
            "Get complete information about the city's marketplaces. Locate grocery stores, clothing shops, electronics outlets, and various other stores along with their timings and offers.",
        image: feature7,
        accent: "#6f40ff",
    },
    {
        text: "Love Akot Jivandata",
        description:
            "Important details on blood donation and healthcare services. Find out where blood is needed, which hospitals have blood banks, and access emergency health services.",
        image: feature5,
        accent: "#e84040",
    },
    {
        text: "Love Akot Times",
        description:
            "Read the latest local and national news here. Stay updated with your city's events, government decisions, and trending social, economic, and political news.",
        image: feature2,
        accent: "#0f7bff",
    },
    {
        text: "Love Akot Sahayata",
        description:
            "Emergency contacts for immediate help. Includes information for police, ambulance services, fire brigades, power outages, and other urgent services.",
        image: feature3,
        accent: "#ff7f00",
    },
    {
        text: "Love Akot Prices",
        description:
            "Get updated information on agricultural yields and market prices. Check current rates for produce, sale updates, and other key financial details for farmers and traders.",
        image: feature6,
        accent: "#12a86a",
    },
    {
        text: "Love Akot Nagarisamsya",
        description:
            "Information on the city's civic amenities and services. Learn about water supply, waste management, tax payments, road repairs, and other civic updates.",
        image: feature4,
        accent: "#c000c8",
    },
    {
        text: "Love Akot Gupshup",
        description:
            "A dedicated section for community discussions and forums. Connect with local residents on various topics, make new friends, and actively participate in your community.",
        image: feature1,
        accent: "#e6a817",
    },
];

const FeatureItem = ({ text, description, accent, index, isActive, onInView }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) onInView(index); },
            { threshold: 0.5, rootMargin: "-25% 0px -25% 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [index, onInView]);

    return (
        <div
            ref={ref}
            className="min-h-[70vh] flex items-center py-10 transition-opacity duration-500"
            style={{ opacity: isActive ? 1 : 0.3 }}
        >
            <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.4 }}
            >
                <div
                    className="w-10 h-10 rounded-full mb-6 flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: accent }}
                >
                    {index + 1}
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {text}
                </h3>
                <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-md">
                    {description}
                </p>
                {isActive && (
                    <motion.div
                        className="mt-6 h-1 w-16 rounded-full"
                        style={{ backgroundColor: accent }}
                        initial={{ width: 0 }}
                        animate={{ width: 64 }}
                        transition={{ duration: 0.4 }}
                    />
                )}
            </motion.div>
        </div>
    );
};

const PhoneFrame = ({ activeIndex }) => (
    <div className="relative w-[240px] lg:w-[270px] flex-shrink-0">
        {/* Outer phone shell */}
        <div className="relative w-full aspect-[9/19] rounded-[44px] bg-gray-900 border-[10px] border-gray-800 shadow-[0_40px_80px_rgba(0,0,0,0.35)] overflow-hidden">
            {/* Status bar notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-gray-900 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-10 h-1.5 bg-gray-700 rounded-full" />
            </div>

            {/* Screenshot area */}
            <div className="w-full h-full bg-gray-100 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeIndex}
                        src={features[activeIndex].image}
                        alt={features[activeIndex].text}
                        className="w-full h-full object-cover object-top"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -60, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                    />
                </AnimatePresence>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-1 bg-gray-600 rounded-full z-20" />
        </div>

        {/* Dot progress indicators */}
        <div className="flex justify-center gap-2 mt-6">
            {features.map((f, i) => (
                <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                        width: i === activeIndex ? "20px" : "6px",
                        height: "6px",
                        backgroundColor: i === activeIndex ? features[activeIndex].accent : "#d1d5db",
                    }}
                />
            ))}
        </div>
    </div>
);

const HorizontalScroll = () => {
    const trackRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - trackRef.current.offsetLeft);
        setScrollLeft(trackRef.current.scrollLeft);
    };
    const onMouseLeave = () => setIsDragging(false);
    const onMouseUp = () => setIsDragging(false);
    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - trackRef.current.offsetLeft;
        trackRef.current.scrollLeft = scrollLeft - (x - startX);
    };

    return (
        <div className="mt-20 mb-0">
            <div className="text-center mb-8 px-4">
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">Swipe or drag to explore</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">All Features at a Glance</h3>
            </div>

            {/* Horizontal drag-scroll track */}
            <div
                ref={trackRef}
                className="flex gap-6 overflow-x-auto px-8 md:px-16 pb-10 cursor-grab active:cursor-grabbing select-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        className="flex-shrink-0 flex flex-col items-center"
                        style={{ scrollSnapAlign: "center" }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Mini phone frame */}
                        <div
                            className="relative rounded-[32px] border-[8px] border-gray-800 bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden"
                            style={{ width: "160px", aspectRatio: "9/19" }}
                        >
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-4 bg-gray-900 rounded-b-xl z-10" />
                            <img
                                src={feature.image}
                                alt={feature.text}
                                className="w-full h-full object-cover object-top pointer-events-none"
                                draggable={false}
                            />
                            {/* Bottom indicator */}
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-gray-600 rounded-full z-10" />
                        </div>

                        {/* Label */}
                        <div className="mt-4 text-center max-w-[160px]">
                            <div
                                className="inline-block w-2 h-2 rounded-full mb-2"
                                style={{ backgroundColor: feature.accent }}
                            />
                            <p className="text-sm font-semibold text-gray-800 leading-tight">{feature.text}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Custom scrollbar track */}
            <div className="flex justify-center mt-2 mb-6">
                <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-[#6f40ff] rounded-full" />
                </div>
            </div>
        </div>
    );
};

const FeaturesSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleInView = useCallback((index) => setActiveIndex(index), []);

    return (
        <section id="features" className="bg-[#f7f6fe]">
            {/* Header */}
            <div className="pt-16 pb-4 text-center px-4">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
                    Exclusive Features of Love Akot
                </h2>
                <p className="text-base sm:text-lg text-gray-500">
                    Discover the useful and unique features of our app
                </p>
            </div>

            {/* ── Desktop: sticky phone + scrolling text ── */}
            <div className="hidden md:flex container mx-auto px-6 lg:px-16 gap-12 lg:gap-24 relative">
                {/* Left — scrolling feature text */}
                <div className="flex-1">
                    {features.map((feature, i) => (
                        <FeatureItem
                            key={i}
                            {...feature}
                            index={i}
                            isActive={activeIndex === i}
                            onInView={handleInView}
                        />
                    ))}
                </div>

                {/* Right — sticky phone */}
                <div className="w-[240px] lg:w-[280px] flex-shrink-0">
                    <div
                        className="sticky flex flex-col items-center justify-center"
                        style={{ top: "10vh", height: "80vh" }}
                    >
                        <PhoneFrame activeIndex={activeIndex} />
                    </div>
                </div>
            </div>

            {/* ── Mobile: horizontal snap scroll ── */}
            <div className="md:hidden overflow-x-auto flex gap-5 px-5 py-8 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
                {features.map((feature, i) => (
                    <div
                        key={i}
                        className="snap-center flex-shrink-0 w-[80vw] rounded-2xl bg-white overflow-hidden shadow-sm border border-gray-100"
                    >
                        <img
                            src={feature.image}
                            alt={feature.text}
                            className="w-full h-56 object-cover object-top"
                        />
                        <div className="p-5">
                            <div
                                className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                                style={{ backgroundColor: feature.accent }}
                            >
                                Feature {i + 1}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.text}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Horizontal scroll strip (all screen sizes) ── */}
            <HorizontalScroll />

            <div className="pb-10" />
        </section>
    );
};

export default FeaturesSection;
