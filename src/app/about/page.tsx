'use client';

import Image from "next/image";
import { IoPlayOutline } from "react-icons/io5";
import PageHeader from "@/components/PageHeader";
import { FaQuoteRight, } from 'react-icons/fa'
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400', // Default weight
  subsets: ['latin'], // Choose character set
});


export default function About() {
  return (
    
    <div className="bg-white">
      <PageHeader 
        title="About Us"
        currentPage="About" 
      />


      {/* Second Section: Content and Buttons */}
      <section className="text-black body-font bg-white">
        <div className="container mx-auto flex flex-col md:flex-row px-5 py-24 items-center justify-between">
          

          {/* Left Images */}
          <div className="w-full md:w-[35%] flex flex-col space-y-6 mt-10 md:mt-0">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/choose1.png"
                alt="Lemon dish"
                className="object-cover"
                fill
              />
            </div>
            <div className="flex gap-6">
              <div className="relative w-1/2 aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/footer.png"
                  alt="Yogurt dish"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="relative w-1/2 aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/about3.png"
                  alt="Pasta dish"
                  className="object-cover"
                  fill
                />
              </div>
            </div>
          </div>
    

      {/* Left Text */}
      <div className="w-full md:w-[60%] flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-sm mb-4 font-medium text-[#FF9F0D] italic flex items-center gap-2">
              About us <span className="w-12 h-[1px] bg-[#FF9F0D] inline-block"></span>
            </h1>
            <p className="text-black title-font text-3xl font-bold">
              Food is an important part of a balanced Diet
            </p>
            <p className="mb-8 leading-relaxed mt-8 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum.
              Ultrices mattis vitae mus risus. Lacus nisi, et ac dapibus sit eu
              velit in consequat.
            </p>
            <div className="flex justify-center md:justify-start  space-x-4">
              <button className="inline-flex text-white bg-[#FF9F0D] py-2 px-4 sm:py-3 sm:px-6 focus:outline-none hover:bg-[#f59000] rounded text-lg transition-colors">
                Show More
              </button>
              <button className="inline-flex items-center text-black border-0 py-2 px-4 sm:py-3 sm:px-6 focus:outline-none rounded text-lg transition-colors">
                <IoPlayOutline className="mr-2 text-white bg-[#FF9F0D]  rounded-full text-2xl" />
                Watch video
              </button>
            </div>
          </div>
          </div>
          </section>

      {/* Third Section: Why Choose Us */}
      <section className="text-black body-font bg-gray-50">
        <div className="container mx-auto px-5 py-24">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum.
            </p>
          </div>
          <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden">
            <Image
              src="/about.png"
              alt="Why Choose Us"
              className="object-cover"
              fill
            />
          </div>
        </div>
      </section>

      {/* Fourth Section: Features */}
      <section className="text-black body-font bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {/* Feature 1 */}
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48 flex items-center justify-center">
                  <Image
                    src="/bestchef.png"
                    alt="Best Chef"
                    className="object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-center mb-4">BEST CHEF</h2>
                  <p className="text-gray-600 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48 flex items-center justify-center">
                  <Image
                    src="/fooditem.png"
                    alt="120 Item Food"
                    className="object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-center mb-4">120 Item Food</h2>
                  <p className="text-gray-600 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48 flex items-center justify-center">
                  <Image
                    src="/clean.png"
                    alt="Clean Environment"
                    className="object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-center mb-4">Clean Environment</h2>
                  <p className="text-gray-600 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Testimonial*/}
      <section className=" bg-transparent relative overflow-hidden">
            <div className="container mx-auto shadow-sm px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <h3 className={`${greatVibes.className} text-[#FF9F0D] text-3xl text-start mb-10`}>
                Testimonials
              </h3>
              <h1 className="text-black text-4xl font-bold text-start mb-5">
                  What Our Clients Say
              </h1>
      
              {/* Testimonial Card */}
              <div className="max-w-3xl mx-auto shadow-lg mb-12 text-center bg-white rounded-xl p-6">
                  
                {/* Quote Icon */}
                  {/* Quote Icon */}
                <div className="flex justify-center mb-5 ">
                  <legend>
                    <Image src="/test1.png" alt="quote" width={80} height={80} className="object-contain" />
                    </legend>
                </div>
                <div className="flex justify-center mb-5">
                <FaQuoteRight className="text-[#FF9F0D] text-5xl" />
                </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat.</p>
                 
                  <div className='flex justify-center mt-5'>
                  <span className="text-yellow-600 text-2xl">⭐⭐⭐⭐⭐</span>
                   </div>
                  <div className='flex justify-center mt-5'>
                  <span className='font-bold text-3xl'>Alamin Hasan</span>
                  </div>
                  <div className='flex justify-center mt-3'>
                    <span className='font-light text-2xl '>Food Specialist</span>
                  </div>
                  
                 </div>
                 </div>
                 </section>
    </div>
  );
} 