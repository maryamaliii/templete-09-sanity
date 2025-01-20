import React from 'react'
import Image from 'next/image'

interface MenuItemProps {
  image: string
  title: string
  description: string
  price: string
}

const MenuItem = ({ image, title, description, price }: MenuItemProps) => {
  return (
    <div className="flex items-start gap-3 md:gap-4 w-full max-w-[300px] min-h-[79px] mx-auto">
      {/* Image */}
      <div className="relative w-[45px] h-[45px] md:w-[50px] md:h-[50px] flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-md object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white text-lg md:text-xl font-bold mb-1 truncate">
          {title}
        </h3>
        <p className="text-white text-xs md:text-sm mb-1 line-clamp-2">
          {description}
        </p>
        <span className="text-[#FF9F0D] text-base md:text-lg font-bold">
          {price}$
        </span>
      </div>
    </div>
  )
}

export default MenuItem