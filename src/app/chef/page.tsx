import PageHeader from "@/components/PageHeader";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

interface Chef {
  _id: string;
  name: string;
  position: string;
  experience: number;
  specialty: string;
  imageUrl: string;
  description: string;
  available: boolean;
}

export default async function FetchChef() {
  const query = `*[_type == "chef"] {
    _id,
    name,
    position,
    experience,
    specialty,
    "imageUrl": image.asset->url,
    description,
    available
  }`;

  const chefs: Chef[] = await client.fetch(query);

  return (
    <div className="bg-white">
      <PageHeader title="Our Chef" currentPage="chef" />
      <div className="p-6 mt-20 w-[80vw] mx-auto">
        {/* Grid layout for chefs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {chefs.map((chef) => (
            <div
              key={chef._id}
              className="relative overflow-hidden rounded-lg shadow-lg bg-white flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Chef Image with Position Overlay */}
              <div className="flex-1 relative">
                <Image
                  src={chef.imageUrl}
                  alt={chef.name}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                {/* Position Text (Top-Left Corner) */}
                <div className="absolute top-2 left-2 bg-orange-500 bg-opacity-75 text-white px-3 py-1 rounded-md text-sm font-medium">
                  {chef.position}
                </div>
              </div>

              {/* Chef Details */}
              <div className="p-4 text-center">
                {/* Name and Description */}
                <h3 className="text-gray-800 font-bold text-lg">{chef.name}</h3>
                <p className="text-gray-600 mt-2">{chef.description}</p>

                {/* Additional Details */}
                <div className="mt-4 space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Specialty:</span> {chef.specialty}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Experience:</span> {chef.experience} years
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`${
                        chef.available ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {chef.available ? "Available" : "Not Available"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}