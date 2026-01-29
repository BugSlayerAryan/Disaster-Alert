import { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { disasters } from "../../assets/DisasterName";

const DisasterCarousel = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto scroll
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      const next = (activeIndex + 1) % disasters.length;
      container.scrollTo({
        left: next * container.offsetWidth,
        behavior: "smooth",
      });
      setActiveIndex(next);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeIndex, isHovering]);

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollTo({
      left: index * container.offsetWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section className="py-20 bg-slate-900">
      {/* 🔒 Scrollbar hidden ONLY for this component */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white">
            Do’s & Don’ts During Disasters
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Essential safety measures to minimize risk and protect lives during
            disasters.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative mt-14"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={() =>
              scrollToIndex(
                activeIndex === 0 ? disasters.length - 1 : activeIndex - 1
              )
            }
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                       bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full"
          >
            <ChevronLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() =>
              scrollToIndex((activeIndex + 1) % disasters.length)
            }
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
                       bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full"
          >
            <ChevronRight />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="
              flex
              overflow-x-auto
              snap-x snap-mandatory
              scroll-smooth
              hide-scrollbar
            "
          >
            {disasters.map((disaster, i) => (
              <div
                key={i}
                className="min-w-full snap-center px-4 flex justify-center"
              >
                <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden">
                  {/* Image */}
                  <div className="relative h-64">
                    <img
                      src={disaster.image}
                      alt={disaster.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                    <h3 className="absolute bottom-5 left-6 text-2xl font-bold text-white">
                      {disaster.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-8 grid md:grid-cols-2 gap-8">
                    {/* Do’s */}
                    <div>
                      <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-4">
                        <CheckCircle size={18} />
                        Do’s
                      </h4>
                      <ul className="space-y-3 text-gray-300">
                        {disaster.dos.map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <CheckCircle
                              size={16}
                              className="text-green-400 mt-1"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Don’ts */}
                    <div>
                      <h4 className="flex items-center gap-2 text-red-400 font-semibold mb-4">
                        <XCircle size={18} />
                        Don’ts
                      </h4>
                      <ul className="space-y-3 text-gray-300">
                        {disaster.donts.map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <XCircle
                              size={16}
                              className="text-red-400 mt-1"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {disasters.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2.5 rounded-full transition-all
                  ${
                    activeIndex === i
                      ? "bg-blue-400 w-6"
                      : "bg-slate-600 w-2.5"
                  }`}
              />
            ))}
          </div>

          {/* Mobile hint */}
          <p className="mt-2 text-center text-xs text-gray-500 md:hidden">
            Swipe to view more →
          </p>
        </div>
      </div>
    </section>
  );
};

export default DisasterCarousel;
