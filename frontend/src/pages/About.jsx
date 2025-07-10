import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <main>
      <h1 className="text-center text-[#4B5563] font-semibold text-3xl">
        ABOUT <span className="text-[#1F2937]">US</span>
      </h1>
      <div className="flex flex-col lg:flex-row gap-10 mt-10 items-center">
        <div>
          <img src={assets.about_image} />
        </div>
        <div className="w-full text-[#4B5563] text-lg font-otufit leading-8">
          <p className="mb-10">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <h3 className="font-semibold mt-12 mb-4">Our Vision</h3>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
      <h1 className="text-[#4B5563] font-semibold text-xl mt-20 mb-10">
        WHY <span className="text-[#1F2937]">CHOOSE US</span>
      </h1>
      <div className="flex flex-col md:flex-row font-outfit border border-[#ABABAB]">
        <div className="px-4 md:px-20 py-8 md:py-16 md:w-1/3 border-b border-[#ABABAB] md:border-r">
          <h3 className="text-[#1F2937] font-semibold">EFFICIENCY:</h3>
          <p className="text-[#4B5563] leading-6 mt-2 md:mt-6">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="px-4 md:px-20 py-8 md:py-16 md:w-1/3 border-b border-[#ABABAB] md:border-r">
          <h3 className="text-[#1F2937] font-semibold">CONVENIENCE:</h3>
          <p className="text-[#4B5563] leading-6 mt-2 md:mt-6">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="px-4 md:px-20 py-8 md:py-16 md:w-1/3">
          <h3 className="text-[#1F2937] font-semibold">PERSONALIZATION:</h3>
          <p className="text-[#4B5563] leading-6 mt-2 md:mt-6">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
