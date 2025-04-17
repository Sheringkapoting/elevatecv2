
const testimonials = [
  {
    content:
      "Elevate CV helped me optimize my resume for ATS systems which was a game-changer. I started getting callbacks immediately after making the suggested changes.",
    author: "Sarah Johnson",
    role: "Software Engineer",
    company: "Recently hired at Google",
    imageUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    content:
      "I was skeptical at first, but the ATS score and recommendations were spot on. My resume now perfectly highlights my skills and experience for the jobs I'm applying to.",
    author: "Michael Chen",
    role: "Marketing Manager",
    company: "Recently hired at Adobe",
    imageUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    content:
      "The resume builder feature saved me hours of formatting and design work. The templates are professional and the customization options are extensive.",
    author: "Taylor Rodriguez",
    role: "Product Manager",
    company: "Recently hired at Microsoft",
    imageUrl: "https://i.pravatar.cc/150?img=3",
  },
];

const TestimonialsSection = () => {
  return (
    <div className="bg-primary-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-primary-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hear from our successful users
          </p>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            Real success stories from job seekers who improved their resumes with our platform.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-8 shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  className="h-12 w-12 rounded-full"
                  src={testimonial.imageUrl}
                  alt={testimonial.author}
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{testimonial.author}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <p className="text-sm font-medium text-primary-600">{testimonial.company}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
