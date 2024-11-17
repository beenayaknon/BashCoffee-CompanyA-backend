const {
    getAllBeverages,
    getBeverageByName,
    getBeveragesByType,
    getBeveragesWithImages,
  } = require("../Database beverage/beverageController");
  
  describe("Beverage Controller", () => {
    let mockDb;
  
    beforeEach(() => {
      mockDb = {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        findOne: jest.fn(),
        toArray: jest.fn(),
      };
    });
  
    it("should fetch all beverages with filters", async () => {
      const query = { name: "Latte", type: "Hot/Cold" };
      mockDb.toArray.mockResolvedValue([{ Drink_Name: "Latte", DrinkType: "Hot/Cold" }]);
  
      const result = await getAllBeverages(mockDb, query);
  
      expect(result).toEqual([{ Drink_Name: "Latte", DrinkType: "Hot/Cold" }]);
      expect(mockDb.find).toHaveBeenCalledWith({ Drink_Name: "Latte", DrinkType: "Hot/Cold" });
    });
  
    it("should throw an error if no beverages match the criteria", async () => {
      mockDb.toArray.mockResolvedValue([]);
  
      await expect(getAllBeverages(mockDb, {})).rejects.toThrow("No beverages found matching the criteria.");
    });
  
    it("should fetch a beverage by name", async () => {
      mockDb.findOne.mockResolvedValue({ Drink_Name: "Latte", DrinkType: "Hot/Cold" });
  
      const result = await getBeverageByName(mockDb, "Latte");
  
      expect(result).toEqual({ Drink_Name: "Latte", DrinkType: "Hot/Cold" });
      expect(mockDb.findOne).toHaveBeenCalledWith({ Drink_Name: "Latte" });
    });
  
    it("should throw an error if beverage by name is not found", async () => {
      mockDb.findOne.mockResolvedValue(null);
  
      await expect(getBeverageByName(mockDb, "Unknown")).rejects.toThrow("Beverage not found.");
    });
  
    it("should fetch beverages by type", async () => {
      mockDb.toArray.mockResolvedValue([{ Drink_Name: "Latte", DrinkType: "Hot/Cold" }]);
  
      const result = await getBeveragesByType(mockDb, "Hot/Cold");
  
      expect(result).toEqual([{ Drink_Name: "Latte", DrinkType: "Hot/Cold" }]);
      expect(mockDb.find).toHaveBeenCalledWith({ DrinkType: "Hot/Cold" });
    });
  
    it("should throw an error if no beverages match the type", async () => {
      mockDb.toArray.mockResolvedValue([]);
  
      await expect(getBeveragesByType(mockDb, "Unknown")).rejects.toThrow("No beverages found for the specified type.");
    });
  
    it("should fetch beverages with image URLs", async () => {
      mockDb.toArray.mockResolvedValue([
        { Drink_Name: "Latte", img_src: "latte.png", Price: { hotPrice: 60, coldPrice: 65 } },
      ]);
  
      const result = await getBeveragesWithImages(mockDb);
  
      expect(result).toEqual([
        {
          Drink_Name: "Latte",
          img_src: "/images/latte.png",
          Price: { hotPrice: 60, coldPrice: 65 },
        },
      ]);
    });
  });  