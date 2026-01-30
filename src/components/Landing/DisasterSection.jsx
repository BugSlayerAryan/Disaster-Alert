// import { useEffect, useRef, useState } from "react";
// import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
// import { disasters } from "../../assets/DisasterName";

// const DisasterCarousel = () => {
//   const scrollRef = useRef(null);
//   const activeIndexRef = useRef(0);

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);

//   /* Keep ref in sync */
//   useEffect(() => {
//     activeIndexRef.current = activeIndex;
//   }, [activeIndex]);

//   /* ================= AUTO SCROLL (EVERY 3s) ================= */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (isHovering) return;

//       const container = scrollRef.current;
//       if (!container) return;

//       const nextIndex = (activeIndexRef.current + 1) % disasters.length;

//       container.scrollTo({
//         left: nextIndex * container.offsetWidth,
//         behavior: "smooth",
//       });

//       setActiveIndex(nextIndex);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isHovering]);

//   /* ============ UPDATE PAGINATION ON MANUAL SCROLL ============ */
//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const index = Math.round(container.scrollLeft / container.offsetWidth);
//       setActiveIndex(index);
//     };

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, []);

//   /* ================= SCROLL TO INDEX ================= */
//   const scrollToIndex = (index) => {
//     const container = scrollRef.current;
//     if (!container) return;

//     container.scrollTo({
//       left: index * container.offsetWidth,
//       behavior: "smooth",
//     });

//     setActiveIndex(index);
//   };
//   return (
//     <section className="py-20 bg-slate-900">
//       <style>{`
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>

//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header */}
//         <div className="text-center">
//           <h2 className="text-4xl font-extrabold text-white">
//             Do’s & Don’ts During Disasters
//           </h2>
//           <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
//             Essential safety measures to minimize risk and protect lives during
//             disasters.
//           </p>
//         </div>

//         {/* Carousel */}
//         <div
//           className="relative mt-14"
//           onMouseEnter={() => setIsHovering(true)}
//           onMouseLeave={() => setIsHovering(false)}
//         >
//           {/* Left Arrow */}
//           <button
//             onClick={() =>
//               scrollToIndex(
//                 activeIndex === 0 ? disasters.length - 1 : activeIndex - 1,
//               )
//             }
//             className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
//             bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full"
//           >
//             <ChevronLeft />
//           </button>

//           {/* Right Arrow */}
//           <button
//             onClick={() => scrollToIndex((activeIndex + 1) % disasters.length)}
//             className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
//             bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full"
//           >
//             <ChevronRight />
//           </button>

//           {/* Scroll Container */}
//           <div
//             ref={scrollRef}
//             className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
//           >
//             {disasters.map((disaster, i) => (
//               <div
//                 key={i}
//                 className="min-w-full snap-center px-4 flex justify-center"
//               >
//                 <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full h-[520px] flex flex-col overflow-hidden">
//                   {/* Image */}
//                   <div className="relative h-[75%]">
//                     <img
//                       src={disaster.image}
//                       alt={disaster.title}
//                       className="h-full w-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
//                     <h3 className="absolute bottom-5 left-6 text-2xl font-bold text-white">
//                       {disaster.title}
//                     </h3>
//                   </div>

//                   {/* Content (ONLY UPDATED PART) */}
//                   {/* Content (Do’s & Don’ts) */}
//                   <div className="p-6 grid md:grid-cols-2 gap-6">
//                     {/* Do’s Section */}
//                     <div className="flex flex-col justify-between h-full">
//                       <div>
//                         <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-4">
//                           <CheckCircle size={18} /> Do’s
//                         </h4>
//                         <ul className="space-y-3 text-gray-300">
//                           {disaster.dos.slice(0, 4).map((item, idx) => (
//                             <li key={idx} className="flex gap-2 line-clamp-1">
//                               <CheckCircle
//                                 size={16}
//                                 className="text-green-400 mt-1 shrink-0"
//                               />
//                               {item}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       {/* Learn More Button */}
//                       <div className="mt-4 flex justify-end">
//                         <a
//                           href={`/disaster/${disaster.title.toLowerCase()}`} // dynamic link
//                           className="inline-flex items-center gap-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
//                         >
//                           Learn More +
//                         </a>
//                       </div>
//                     </div>

//                     {/* Don’ts Section */}
//                     <div className="flex flex-col justify-between h-full">
//                       <div>
//                         <h4 className="flex items-center gap-2 text-red-400 font-semibold mb-4">
//                           <XCircle size={18} /> Don’ts
//                         </h4>
//                         <ul className="space-y-3 text-gray-300">
//                           {disaster.donts.slice(0, 4).map((item, idx) => (
//                             <li key={idx} className="flex gap-2 line-clamp-1">
//                               <XCircle
//                                 size={16}
//                                 className="text-red-400 mt-1 shrink-0"
//                               />
//                               {item}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       {/* Learn More Button */}
//                       <div className="mt-4 flex justify-end">
//                         <a
//                           href={`/disaster/${disaster.title.toLowerCase()}`} // dynamic link
//                           className="inline-flex items-center gap-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
//                         >
//                           Learn More +
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center gap-2 mt-6">
//             {disasters.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => scrollToIndex(i)}
//                 className={`h-2.5 rounded-full transition-all ${
//                   activeIndex === i ? "bg-blue-400 w-6" : "bg-slate-600 w-2.5"
//                 }`}
//               />
//             ))}
//           </div>

//           <p className="mt-2 text-center text-xs text-gray-500 md:hidden">
//             Swipe to view more →
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DisasterCarousel;


import { useEffect, useRef, useState } from "react";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { disasters } from "../../assets/DisasterName";

const DisasterCarousel = () => {
  const scrollRef = useRef(null);
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  /* Keep ref in sync */
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  /* AUTO SCROLL EVERY 3s */
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovering) return;

      const container = scrollRef.current;
      if (!container) return;

      const nextIndex = (activeIndexRef.current + 1) % disasters.length;

      container.scrollTo({
        left: nextIndex * container.offsetWidth,
        behavior: "smooth",
      });

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering]);

  /* Update pagination on manual scroll */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  /* Scroll to index */
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
            onClick={() => scrollToIndex((activeIndex + 1) % disasters.length)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
            bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full"
          >
            <ChevronRight />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
          >
            {disasters.map((disaster, i) => (
              <div
                key={i}
                className="min-w-full snap-center px-4 flex justify-center"
              >
                <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full h-[520px] flex flex-col overflow-hidden">
                  {/* Image (75%) */}
                  <div className="relative h-[75%]">
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

                  {/* Content (25%) */}
                  <div className="h-[25%] p-6 grid md:grid-cols-2 gap-6">
                    {/* Do’s Section */}
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-4">
                          <CheckCircle size={18} /> Do’s
                        </h4>
                        <ul className="space-y-3 text-gray-300">
                          {disaster.dos.slice(0, 4).map((item, idx) => (
                            <li key={idx} className="flex gap-2 line-clamp-1">
                              <CheckCircle
                                size={16}
                                className="text-green-400 mt-1 shrink-0"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Learn More Button */}
                      <div className="flex justify-end mt-2">
                        <a
                          href={`/disaster/${encodeURIComponent(
                            disaster.title.toLowerCase()
                          )}`}
                          className="inline-flex items-center gap-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
                        >
                          Learn More +
                        </a>
                      </div>
                    </div>

                    {/* Don’ts Section */}
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h4 className="flex items-center gap-2 text-red-400 font-semibold mb-4">
                          <XCircle size={18} /> Don’ts
                        </h4>
                        <ul className="space-y-3 text-gray-300">
                          {disaster.donts.slice(0, 4).map((item, idx) => (
                            <li key={idx} className="flex gap-2 line-clamp-1">
                              <XCircle
                                size={16}
                                className="text-red-400 mt-1 shrink-0"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Learn More Button */}
                      <div className="flex justify-end mt-2">
                        <a
                          href={`/disaster/${encodeURIComponent(
                            disaster.title.toLowerCase()
                          )}`}
                          className="inline-flex items-center gap-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
                        >
                          Learn More +
                        </a>
                      </div>
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
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === i ? "bg-blue-400 w-6" : "bg-slate-600 w-2.5"
                }`}
              />
            ))}
          </div>

          <p className="mt-2 text-center text-xs text-gray-500 md:hidden">
            Swipe to view more →
          </p>
        </div>
      </div>
    </section>
  );
};

export default DisasterCarousel;

