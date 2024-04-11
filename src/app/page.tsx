"use client";
import React, { useEffect, useState } from "react";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { BreedService } from "@/services/breedService";
import { Breed } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { rgbDataURL } from "@/utils/placeholderGenerator";

export default function RandomBreedPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [breed, setBreed] = useState<Breed | null>(null);

  const fetchRandomBreed = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const breed = await BreedService.fetchRandomBreed();
      setIsLoading(false);
      setBreed(breed);
    } catch (error) {
      setIsLoading(false);
      setError("Cannot fetch random breed, please try again later");
    }
  };

  useEffect(() => {
    fetchRandomBreed();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="flex flex-col place-items-center">
        <div className="flex flex-col justify-center items-center w-full min-h-80">
          {isLoading && <LoadingSpinner />}
          {!isLoading && breed && (
            <>
              <div className="relative flex flex-col justify-center w-64 h-64">
                <Image
                  className="relative cursor-pointer rounded-xl"
                  src={breed.url}
                  fill
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL={rgbDataURL(214, 219, 220)}
                  alt="Next.js Logo"
                  priority
                />
              </div>

              <Link
                className="capitalize mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                href={`/breeds/${breed.shortName}`}
              >
                {breed.name}
              </Link>
            </>
          )}
        </div>
        <button
          onClick={fetchRandomBreed}
          className="flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 p-4 mt-10"
        >
          {imageLoading ? <LoadingSpinner /> : "Get random breed"}
        </button>
        {error && <div className="text-red-500 mt-8">{error}</div>}
        {imageLoading && <p className="mt-4">Loading image...</p>}
      </div>
    </main>
  );
}
