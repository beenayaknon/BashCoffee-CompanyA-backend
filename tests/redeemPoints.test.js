const request = require("supertest");
const app = require("../server"); // Adjust the path based on your file structure
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "BashCoffeeDB";

beforeAll(async () => {
  await client.connect();
  console.log("Connected to MongoDB");
  const db = client.db(dbName);
  await db.collection("member").deleteMany({}); // Clear the collection before tests

  // Insert test members
  await db.collection("member").insertMany([
    { MID: 0, Mname: "Thanat Phi", Tel: "0625916127", Points: 999, Alumni: true },
    { MID: 1, Mname: "Phi Phinat", Tel: "0987654321", Points: 50, Alumni: false }
  ]);
});

afterAll(async () => {
  await client.close();
});

// Test 1: Redeem points from a member - valid request
test("Redeem points from a member - valid request", async () => {
  const response = await request(app)
    .put("/member/redeem-points")
    .send({ MID: 0, points: 50 });

  // Expect 200 OK and the correct response structure
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Points redeemed successfully");
  expect(response.body.member.Points).toBe(949); // Check updated points after redemption
});

// Test 2: Redeem points from a member - insufficient points
test("Redeem points from a member - insufficient points", async () => {
  const response = await request(app)
    .put("/member/redeem-points")
    .send({ MID: 1, points: 100 }); // Attempt to redeem more points than available

  // Expect 400 Bad Request and insufficient points error message
  expect(response.status).toBe(400);
  expect(response.body.error).toBe("Insufficient points for redemption.");
});

// Test 3: Redeem points from a member - member not found
test("Redeem points from a member - member not found", async () => {
  const response = await request(app)
    .put("/member/redeem-points")
    .send({ MID: 99, points: 50 }); // Non-existing MID

  // Expect 404 Not Found and error message
  expect(response.status).toBe(404);
  expect(response.body.error).toBe("Member not found.");
});