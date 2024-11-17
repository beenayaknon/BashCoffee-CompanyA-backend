async function getAllBeverages(db, query) {
    const { name, type } = query;
  
    const filter = {};
    if (name) filter.Drink_Name = name;
    if (type) filter.DrinkType = type;
  
    const beverages = await db.collection("beverage").find(filter).toArray();
    if (beverages.length === 0) {
      throw new Error("No beverages found matching the criteria.");
    }
  
    return beverages;
  }
  
  async function getBeverageByName(db, name) {
    const beverage = await db.collection("beverage").findOne({ Drink_Name: name });
  
    if (!beverage) {
      throw new Error("Beverage not found.");
    }
  
    return beverage;
  }
  
  async function getBeveragesByType(db, type) {
    const beverages = await db.collection("beverage").find({ DrinkType: type }).toArray();
  
    if (beverages.length === 0) {
      throw new Error("No beverages found for the specified type.");
    }
  
    return beverages;
  }
  
  async function getBeveragesWithImages(db) {
    const beverages = await db.collection("beverage").find({}).toArray();
  
    return beverages.map((beverage) => ({
      Drink_Name: beverage.Drink_Name,
      img_src: `/images/${beverage.img_src}`,
      Price: beverage.Price,
    }));
  }
  
  module.exports = {
    getAllBeverages,
    getBeverageByName,
    getBeveragesByType,
    getBeveragesWithImages,
  };  