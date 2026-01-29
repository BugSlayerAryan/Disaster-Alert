import { Star } from "lucide-react";

const TestimonialsSection = ({ testimonials }) => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by Professionals Worldwide
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-gray-500">
            See what our users have to say about their experience with CloudShare.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transform transition duration-500 hover:scale-105"
            >
              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                    } fill-current mr-1`}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-4 text-gray-700 italic text-base sm:text-lg">
                “{testimonial.quote}”
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
