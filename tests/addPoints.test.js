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
    { MID: 1, Mname: "Phi Phinat", Tel: "0987654321", Points: 5, Alumni: false },
    { MID: 2, Mname: "Thanatos Thanat", Tel: "1234567890", Points: 4, Alumni: true },
    { MID: 3, Mname: "Phi Phinat", Tel: "0987654321", Points: 0, Alumni: false }
  ]);
});

afterAll(async () => {
  await client.close();
});

// Test 1: Valid request - Add points to existing member
test("Add points to a member - valid request", async () => {
  const response = await request(app)
    .put("/member/add-points")
    .send({ MID: 3, points: 50 });

  // Expect 200 OK and the correct response structure
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Points added successfully");
  expect(response.body.member.Points).toBe(50); // Check updated points
});

// Test 2: Invalid points value - points are 0 or negative
test("Add points to a member - invalid points value", async () => {
  const response = await request(app)
    .put("/member/add-points")
    .send({ MID: 3, points: -10 });

  // Expect 400 Bad Request and validation error message
  expect(response.status).toBe(400);
  expect(response.body.error).toBe("Valid MID and a positive number of points are required.");
});

// Test 3: Member not found
test("Add points to a member - member not found", async () => {
  const response = await request(app)
    .put("/member/add-points")
    .send({ MID: 99, points: 10 }); // Non-existing MID

  // Expect 404 Not Found and error message
  expect(response.status).toBe(404);
  expect(response.body.error).toBe("Member not found.");
});