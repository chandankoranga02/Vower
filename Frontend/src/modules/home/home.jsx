import React, { useState, useEffect, useRef } from "react";
import {
  Car,
  History,
  Activity,
  MapPin,
  Zap,
  Settings
} from "lucide-react";
import QuickAction from "./components/actionCards";

const NEWSLETTER_SLIDES = [
  { 
    id: 1, 
    image: "https://imgs.search.brave.com/FMgg3QeOtzIN59anSy_rB3Pc16vKQhWKKbEGFHIqLOE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/MjgwOTYyNS9waG90/by9mb2N1cy1ldi1j/aGFyZ2luZy1zdGF0/aW9uLWF0LWhvbWUt/d2l0aC1ibHVyLXBy/b2dyZXNzaXZlLW1h/bi1pbi1iYWNrZ3Jv/dW5kLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1xX2hSVFlq/X3lub3VZUHNrQ1dj/VmRhdDJyckc3WUpz/d0I5anF4NXRpT2NF/PQ",
    text: "Future of EV Charging", 
    route: "/newsletter/1" 
  },
  { 
    id: 2, 
    image: "https://imgs.search.brave.com/EFTJgJm0GTYdDNYYF6AlCa5FwZOkd6SgvxERKReHhvM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGF0YXBvd2VyLmNv/bS9hZG9iZS9keW5h/bWljbWVkaWEvZGVs/aXZlci9kbS1haWQt/LTA2MWY0Zjc5LTg3/OTItNDI5MC1iMTFh/LTk0NWJkZTVjNjU2/Zi9jaGFyZ2Utc3Rh/dGlvbi53ZWJwP3dp/ZHRoPTEyMDgmcHJl/ZmVyd2VicD10cnVl/JnF1YWxpdHk9ODU", 
    text: "New Stations in Your Area", 
    route: "/newsletter/2" 
  },
  { 
    id: 3, 
    image: "https://imgs.search.brave.com/B6xEGwAkvdW-UShXY6c1VapokwItEUOtq3IEYKfQN_g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM0/ODYzMTAwNy9waG90/by9ldi1jaGFyZ2lu/Zy1zdGF0aW9uLWZv/ci1lbGVjdHJpYy1j/YXItaW4tY29uY2Vw/dC1vZi1ncmVlbi1l/bmVyZ3ktYW5kLWVj/by1wb3dlci5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9eVRM/OTVtQ1RQV1ROcUVP/NE5xaVdXU2VDX0pN/SU5OVUplQ2hFOWE2/WUtWYz0", 
    text: "Maximize Your Battery Life", 
    route: "/newsletter/3" 
  },
  { 
    id: 4, 
    image: "https://imgs.search.brave.com/TVWNxggCk5cQKVoscF8Yy6slRi5e2ef-7aq5AtdxHz4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE1/NjM3ODQ5My9waG90/by9ldi1jaGFyZ2lu/Zy1zdGF0aW9uLWlu/LXJlc2lkZW50aWFs/LWFyZWEuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPV9PUEZq/YUJFWkFNTWZZVk92/d28zMldrRzF3SFFN/MUM5R3RXV2V0VzRa/Zm89", 
    text: "Dummy TExt YARR", 
    route: "/newsletter/3" 
  },
  { 
    id: 5, 
    image: "https://imgs.search.brave.com/wzeOoLKWEhdheyPERAjZaHTXS4DaheMTGdh7XnZS7iI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGF0YXBvd2VyLmNv/bS9hZG9iZS9keW5h/bWljbWVkaWEvZGVs/aXZlci9kbS1wLW9p/ZC0teG9pS0pGeVk0/a3F3QlhvY3JpWnJt/UmdsYmh5ak1nTmVv/Wkc0d2hGLVV3cWM2/U2VaM2FJZDRNQXNv/RzFkSVljSWlEOGR2/TWpiSjhsbEUxTGFq/R2tZd2MtelRXQ2gz/TFRJSTlxQW1XZkxR/TS1oQXc0cl9GSk83/ODJkdF9JcW1ZODhz/MlBFWVVMWlA5VHZK/MUVDMEJxMDFwbENH/Rnc2ZFVaN3BOdnRu/b3I3TDdNL2Rlc2t0/b3AtaGVyby1iYW5u/ZXItbW9iaWxlLTA0/LXYyLndlYnA_cXVh/bGl0eT04NSZwcmVm/ZXJ3ZWJwPXRydWUm/d2lkdGg9NTc2MA", 
    text: "Dummy TExt YARR", 
    route: "/newsletter/3" 
  },
  { 
    id: 6, 
    image: "https://imgs.search.brave.com/7Rq0lJXWjZqrHKa9gwfrPnMk3so-_I0V0GprLTJG1Z8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjIv/NTA2LzYxOS9zbWFs/bC9lbGVjdHJpYy1j/YXItY2hhcmdpbmct/aW4tdW5kZXJncm91/bmQtZ2FyYWdlLXBs/dWdnZWQtYXQtaG9t/ZS1jaGFyZ2VyLXN0/YXRpb24tYmF0dGVy/eS1ldi12ZWhpY2xl/LXN0YW5kaW5nLXBh/cmtpbmctZnJlZS1w/aG90by5qcGc", 
    text:"Dummy TExt YARR", 
    route: "/newsletter/3" 
  },
];

export default function HomePage() {
  const [activeItem, setActiveItem] = useState("overview");
  const sliderRef = useRef(null); // Reference to the scroll container

  const handleNavigate = (routeKey, path) => {
    setActiveItem(routeKey);
    console.log(`Navigating to: ${path}`);
  };

  // Auto-scroll logic
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let interval;
    
    const startTimer = () => {
      interval = setInterval(() => {
        // Calculate max scrollable area
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        
        // If at the end, jump back to start. Otherwise, scroll right by approx one slide.
        if (slider.scrollLeft >= maxScroll - 10) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slider.scrollBy({ left: slider.clientWidth * 0.85, behavior: "smooth" });
        }
      }, 3500); // 3500ms = 3.5 seconds
    };

    const stopTimer = () => clearInterval(interval);

    startTimer();

    // Pause auto-scroll on interaction
    slider.addEventListener("mouseenter", stopTimer);
    slider.addEventListener("mouseleave", startTimer);
    slider.addEventListener("touchstart", stopTimer, { passive: true });
    slider.addEventListener("touchend", startTimer, { passive: true });

    // Cleanup listeners on unmount
    return () => {
      stopTimer();
      slider.removeEventListener("mouseenter", stopTimer);
      slider.removeEventListener("mouseleave", startTimer);
      slider.removeEventListener("touchstart", stopTimer);
      slider.removeEventListener("touchend", startTimer);
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-neutral-100 text-black overflow-hidden font-sans">
      
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 pb-24">
        
        {/* ROW 1: Vehicle & Session (Top Blocks) */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <QuickAction 
            label="Vehicle" 
            bgImage="https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop"
            className="h-40 sm:h-52"
            onClick={() => handleNavigate("vehicle", "/vehicle-path")} 
          />
          <QuickAction 
            label="Session" 
            bgImage="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop"
            className="h-40 sm:h-52"
            onClick={() => handleNavigate("session", "/session-path")} 
          />
        </div>

        {/* ROW 2: Newsletter Slider */}
        <div className="w-full relative">
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-black mb-3 px-1">Updates</h2>
          
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 px-4 -mx-4 sm:px-6 sm:-mx-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {NEWSLETTER_SLIDES.map((slide) => (
              <button
                key={slide.id}
                onClick={() => handleNavigate(`newsletter-${slide.id}`, slide.route)}
                className="relative min-w-[85%] sm:min-w-[400px] h-44 sm:h-52 rounded-3xl overflow-hidden snap-center bg-white shadow-sm border border-black/5 text-left cursor-pointer active:scale-95 transition-transform"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <img 
                  src={slide.image} 
                  alt={slide.text}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-white font-bold text-lg sm:text-xl drop-shadow-lg leading-tight block">
                    {slide.text}
                  </span>
                </div>
              </button>
            ))}
            <div className="min-w-[10px] sm:min-w-[20px] shrink-0" aria-hidden="true"></div>
          </div>
        </div>

        {/* ROW 3 & 4: The 2x2 Grid (1st, 2nd, 3rd, 4th) */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <QuickAction 
            icon={Activity} 
            label="1st" 
            accent="#2F6FED" 
            className="h-36 sm:h-44"
            onClick={() => handleNavigate("1st", "/1st-path")} 
          />
          <QuickAction 
            icon={MapPin} 
            label="2nd" 
            accent="#B4FF39" 
            className="h-36 sm:h-44"
            onClick={() => handleNavigate("2nd", "/2nd-path")} 
          />
          <QuickAction 
            icon={Zap} 
            label="3rd" 
            accent="#B4FF39" 
            className="h-36 sm:h-44"
            onClick={() => handleNavigate("3rd", "/3rd-path")} 
          />
          <QuickAction 
            icon={Settings} 
            label="4th" 
            accent="#2F6FED" 
            className="h-36 sm:h-44"
            onClick={() => handleNavigate("4th", "/4th-path")} 
          />
        </div>

      </main>
    </div>
  );
}
