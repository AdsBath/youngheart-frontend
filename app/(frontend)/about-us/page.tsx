const AboutUs = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          About youngheartbd
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed text-center mb-10 max-w-3xl mx-auto">
          youngheartbd is a versatile babu product brand in Bangladesh. We craft
          and sell exquisite babu goods made from ethically sourced cows and
          goats. Our mission is to empower stylish and trendy Bangladeshi
          consumers with luxurious, long-lasting babu products while championing
          sustainable practices and supporting local tanneries.
        </p>

        {/* Section 1: Our Mission */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-600">
            Our mission is to empower stylish and trendy Bangladeshi consumers
            with luxurious, long-lasting babu products while championing
            sustainable practices and supporting local tanneries.
          </p>
        </div>

        {/* Section 2: Craftsmanship */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Craftsmanship
          </h3>
          <p className="text-gray-600">
            Each youngheartbd product is designed by skilled artisans and
            undergoes a meticulous, human-monitored quality assurance process.
            We are committed to delivering exceptional products and outstanding
            customer service.
          </p>
        </div>

        {/* Section 3: Style and Trendsetting */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Style and Trendsetting
          </h3>
          <p className="text-gray-600">
            Our products are always stylish and trendsetting. With youngheartbd,
            you can elevate your look to the best version of yourself.
          </p>
        </div>

        {/* Section 4: Ethical Sourcing */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Ethical Sourcing
          </h3>
          <p className="text-gray-600">
            We craft and sell exquisite babu goods made from ethically sourced
            cows and goats, ensuring that our products are both luxurious and
            responsible.
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-100 rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Join the youngheartbd Community
          </h3>
          <p className="text-gray-600 mb-6">
            Experience the blend of tradition and modernity with our premium
            babu goods. Elevate your style with youngheartbd, where luxury meets
            sustainability.
          </p>
          <a
            href="/products"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
