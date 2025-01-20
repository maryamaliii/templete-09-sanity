import React from 'react'
import Image from 'next/image'
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400', // Default weight
  subsets: ['latin'], // Choose character set
});

const FoodTeam = () => {
  const chefs = [
    {
      image: '/chef1.png',
      name: 'D.Estwood',
      role: 'Chief Chef',
    },
    {
      image: '/chef2.png',
      name: 'D.Scoriesh',
      role: 'Assistant Chef',
    },
    {
      image: '/chef3.png',
      name: 'M.William',
      role: 'Advertising Chef',
    },
    {
      image: '/chef4.png',
      name: 'W.Readfroad',
      role: 'Chef',
    },
  ]

  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className={`${greatVibes.className} text-[#FF9F0D] text-3xl mb-2`}>
            Chefs
          </h3>
          <h2 className="text-[#FF9F0D] text-6xl font-bold">
            Me<span className="text-white">et Our Chef</span>
          </h2>
        </div>

        {/* Chefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {chefs.map((chef, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg"
            >
              {/* Chef Image */}
              <div className="relative h-[400px] w-full">
                <Image
                  src={chef.image}
                  alt={chef.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Chef Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold mb-1">
                  {chef.name}
                </h3>
                <p className="text-[#FF9F0D] text-lg">
                  {chef.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center">
          <button className="px-8 py-3 border border-[#FF9F0D] text-[#FF9F0D] rounded-xl bg-transparent hover:bg-[#FF9F0D] hover:text-white transition-colors duration-300">
            See More
          </button>
        </div>
      </div>
    </section>
  )
}

export default FoodTeam 