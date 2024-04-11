import { Breed } from "@/types";

class BreedService {
  public static async fetchRandomBreed(): Promise<Breed> {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    const breedName = data.message.split("/")[4];
    return {
      url: data.message,
      name: breedName.replace("-", " "),
      shortName: breedName,
    };
  }

  public static async fetchBreedImages(
    breed: string,
    amount?: number
  ): Promise<Breed[]> {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed.split("-").join("/")}/images/random/${
        amount || 3
      }`
    );
    const data = await response.json();
    return data.message.map((url: string) => ({
      url,
      name: breed.replace("-", " "),
      shortName: breed,
    }));
  }
}

export { BreedService };
