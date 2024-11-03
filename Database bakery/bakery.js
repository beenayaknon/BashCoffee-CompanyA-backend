const dbName = "BashCoffeeDB";
const collectionName = "bakery";

// Function to create the Baker collection if it doesn't exist
async function initializbakeryCollectionIfNotExist(client) {
  const db = client.db(dbName);
  const collections = await db.listCollections({ name: collectionName }).toArray();

    // If the collection does not exist, create it
    if (collections.length === 0) {
      await db.createCollection('bakery');

      // Insert some data
      await db.collection('bakery').insertMany([
        {
          Bakery_ID: 201,
          Bakery_Name: "Cookies",
          Description: "Freshly baked cookies with a rich, buttery flavor and a soft, chewy texture.",
          Price: {
            singlePrice: 70
          },
          Category: "Bakery",
          Tag: ["bakery", "cookies"],
          isRecommended: false,
          image_src: "/images/drinks/24.png"
        },
        {
          Bakery_ID: 202,
          Bakery_Name: "PlainCroissant",
          Description: "Freshly baked cookies with a rich, buttery flavor and a soft, chewy texture.",
          Price: {
            singlePrice: 45
          },
          Category: "Bakery",
          Tag: ["bakery", "croissant"],
          isRecommended: false,
          image_src: "/images/drinks/24.png"
        },
        {
          Bakery_ID: 203,
          Bakery_Name: "ChocolateCroissant",
          Description: "A buttery, flaky pastry with a golden, crispy crust and a soft, airy interior. Made with layers of rich dough, the plain croissant is perfect on its own or with a touch of jam or butter, offering a delicate balance of lightness and indulgence.",
          Price: {
            singlePrice: 50
          },
          Category: "Bakery",
          Tag: ["croissant", "chocolate", "bakery", "sweet"],
          isRecommended: true,
          image_src: "/images/drinks/24.png"
        },
        {
          Bakery_ID: 204,
          Bakery_Name: "ChocolateCroissant",
          Description: " A flaky, buttery pastry with a rich, chocolate filling. This classic French treat combines the lightness of a croissant with the decadence of chocolate, creating a perfect balance of texture and flavor.",
          Price: {
            singlePrice: 50
          },
          Category: "Bakery",
          Tag: ["croissant", "chocolate", "bakery", "sweet"],
          isRecommended: true,
          image_src: "/images/drinks/24.png"
        },
        {
          Bakery_ID: 205,
          Bakery_Name: "NutellaCroissant",
          Description: " A flaky, buttery croissant filled with rich, creamy Nutella, offering a perfect blend of crisp pastry layers and smooth, chocolate-hazelnut goodness in every bite. An indulgent treat that combines the best of French pastry with a decadent, chocolatey twist.",
          Price: {
            singlePrice: 65
          },
          Category: "Bakery",
          Tag: ["croissant", "nutella", "bakery", "chocolate", "sweet"],
          isRecommended: true,
          image_src: "/images/drinks/24.png"
        },
        {
          Bakery_ID: 206,
          Bakery_Name: "CreamCheeseDanish",
          Description: "A delightful pastry with a soft, flaky crust and a creamy, tangy cream cheese filling at its center. This Danish is lightly golden and slightly crisp on the edges, with a rich, melt-in-your-mouth flavor that perfectly balances sweetness and creaminess. A treat that combines texture and taste, ideal for any time of day.",
          Price: {
            singlePrice: 50
          },
          Category: "Bakery",
          Tag: ["danish", "cream cheese", "bakery", "cheese"],
          isRecommended: true,
          image_src: "/images/drinks/24.png"
        },
        {
          Bakery_ID: 207,
          Bakery_Name: "Donut",
          Description: "A soft, sweet ring-shaped pastry that's fried to golden perfection and often coated in sugar, glaze, or icing. This classic treat has a light, fluffy interior and a slightly crispy exterior, making it an irresistible snack any time of day.",
          Price: {
            singlePrice: 50
          },
          Category: "Bakery",
          Tag: ["donut", "bakery", "sweet"],
          isRecommended: false,
          image_src: "/images/drinks/24.png"
        },
      ]);

      console.log(`Collection 'bakery' created with initial bakery items.`);
    } else {
      console.log(`Collection 'bakery' already exists.`);
    }
}

module.exports = initializbakeryCollectionIfNotExist;
