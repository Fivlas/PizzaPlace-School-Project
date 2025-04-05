import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Marquee from "react-fast-marquee";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="relative min-h-screen w-full bg-[#ffead1]">
            {/* Left Side Grid (hidden on mobile) */}
            <div
                className="hidden md:block absolute top-0 left-0 h-full w-[100px] bg-[url('/landingSideGrid.png')] bg-repeat bg-[length:200px_200px] z-0"
                style={{ imageRendering: "pixelated" }}
            />

            {/* Right Side Grid (hidden on mobile) */}
            <div
                className="hidden md:block absolute top-0 right-0 h-full w-[100px] bg-[url('/landingSideGrid.png')] bg-repeat bg-[length:200px_200px] z-0"
                style={{ imageRendering: "pixelated" }}
            />

            {/* Main Content */}
            <div className="relative z-10 md:px-[100px]">
                {/* <Marquee className="bg-[#e74a27] py-2 text-[#fff8e7] font-bold text-sm md:text-base tracking-wide uppercase font-['Courier_New',_monospace]"> */}
                <Marquee className="bg-[#6D947C] py-4.5 text-[#fff8e7] font-bold text-sm md:text-base tracking-wide uppercase font-['Courier_New',_monospace]">
                    <div className="mx-8">🍕 Hot slices, cooler vibes! 🍕</div>
                    <div className="mx-8">
                        🛵 Free delivery in under 30 minutes! 🛵
                    </div>
                    <div className="mx-8">
                        🌈 Taste the 'za that grooves with your soul 🌈
                    </div>
                    <div className="mx-8">
                        🕺 Dine-in special: 2-for-1 on Funky Fridays! 🕺
                    </div>
                    <div className="mx-8">
                        📼 70s tunes & steamy slices daily 📼
                    </div>
                </Marquee>
                {/* <Navbar /> */}
                <main>{children}</main>
                <Footer/>
            </div>
        </div>
    );
}
