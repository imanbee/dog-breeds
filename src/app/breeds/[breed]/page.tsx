import { BreedService } from "@/services/breedService";
import Image from "next/image";
import { Suspense } from "react";
import AddMoreImages from "./AddMoreImages";
import { rgbDataURL } from "@/utils/placeholderGenerator";

async function loadBreedImages(breed: string) {
  try {
    const breedImages = await BreedService.fetchBreedImages(breed);
    return breedImages;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function BreedPage({
  params,
}: {
  params: { breed: string };
}) {
  const images = await loadBreedImages(params.breed);
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <h1 className="capitalize mt-4 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300">
          {params.breed.replace("-", " ")}
        </h1>
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto h-auto">
          {images.map((breed) => {
            return (
              <div
                key={breed.url}
                className="relative justify-center w-full md:w-40 lg:w-48 h-20 md:h-40 lg:h-48"
              >
                <Image
                  className="relative cursor-pointer rounded-xl"
                  src={breed.url}
                  placeholder="blur"
                  blurDataURL={rgbDataURL(214, 219, 220)}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Next.js Logo"
                  priority
                />
              </div>
            );
          })}
        </div>
        <AddMoreImages breed={params.breed} />
      </Suspense>
    </main>
  );
}
