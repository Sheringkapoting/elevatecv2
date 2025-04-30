
const CTASection = () => {
  return (
    <div className="bg-primary-600">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Ready to boost your</span>
                <span className="block text-primary-600">job application success?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Start analyzing and optimizing your resume today. Our AI-powered tools will help you pass ATS systems and impress hiring managers.
              </p>
            </div>
          </div>
          <div className="aspect-w-5 aspect-h-3 -mt-6 md:aspect-w-2 md:aspect-h-1">
            <img
              className="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="https://images.unsplash.com/photo-1496115965489-21be7e6e59a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              alt="Resume review app screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
