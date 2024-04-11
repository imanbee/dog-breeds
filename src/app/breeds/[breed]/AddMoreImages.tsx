"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { BreedService } from "@/services/breedService";
import { Breed } from "@/types";
import { rgbDataURL } from "@/utils/placeholderGenerator";
import Image from "next/image";
import { useCallback, useState } from "react";

interface AddMoreImagesProps {
  breed: string;
}

const AddMoreImages = (props: AddMoreImagesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [breedImages, setBreedImages] = useState<Breed[]>([]);

  const loadBreedImages = async (breed: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const breedImages = await BreedService.fetchBreedImages(breed);
      setIsLoading(false);
      setBreedImages((images) => [...images, ...breedImages]);
    } catch (error) {
      setIsLoading(false);
      setError("Cannot fetch breed images, please try again later");
    }
  };

  return (
    <>
      <div className="mt-4 grid grid-cols-3 gap-3 w-full md:w-auto h-auto">
        {breedImages &&
          breedImages.map((breed) => {
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
      <button
        onClick={() => loadBreedImages(props.breed)}
        className="flex justify-center items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 p-4 mt-10"
      >
        {isLoading ? <LoadingSpinner /> : "Load more images"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default AddMoreImages;
