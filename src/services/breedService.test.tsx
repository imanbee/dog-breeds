import { BreedService } from "./breedService";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("BreedService", () => {
  describe("fetchRandomBreed", () => {
    it("fetches a random breed and formats the response correctly", async () => {
      const mockImageUrl =
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg";
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: mockImageUrl, status: "success" })
      );

      const breed = await BreedService.fetchRandomBreed();

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://dog.ceo/api/breeds/image/random"
      );
      expect(breed).toEqual({
        url: mockImageUrl,
        name: "hound afghan",
        shortName: "hound-afghan",
      });
    });
  });

  describe("fetchBreedImages", () => {
    it("fetches images for a specific breed and formats the response correctly", async () => {
      const mockImageUrls = [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg",
      ];
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: mockImageUrls, status: "success" })
      );

      const breed = "hound-afghan";
      const images = await BreedService.fetchBreedImages(breed, 3);

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://dog.ceo/api/breed/${breed
          .split("-")
          .join("/")}/images/random/3`
      );
      expect(images).toEqual(
        mockImageUrls.map((url) => ({
          url,
          name: "hound afghan",
          shortName: "hound-afghan",
        }))
      );
    });
  });
});
