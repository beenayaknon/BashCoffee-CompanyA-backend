const { addPoints } = require("../Database member/pointsController");

describe("addPoints", () => {
  let mockDb;

  beforeEach(() => {
    mockDb = {
      collection: jest.fn().mockReturnThis(),
      findOne: jest.fn(),
      updateOne: jest.fn()
    };
  });

  // Test 1: Valid request - Add points to existing member
  it("should add points to a member with a valid request", async () => {
    const memberData = { MID: 3, points: 50 };
    mockDb.findOne.mockResolvedValue({ MID: 3, Points: 0 }); // Existing member with 0 points

    const response = await addPoints(mockDb, memberData);

    expect(response.message).toBe("Points added successfully");
    expect(response.member).toEqual({ MID: 3, Points: 50 }); // Points updated to 50
    expect(mockDb.updateOne).toHaveBeenCalledWith(
      { MID: 3 },
      { $set: { Points: 50 } }
    );
  });

  // Test 2: Invalid points value - points are 0 or negative
  it("should return an error for invalid points value (negative or zero)", async () => {
    const memberData = { MID: 3, points: -10 }; // Negative points

    await expect(addPoints(mockDb, memberData)).rejects.toThrow("Valid MID and a positive number of points are required.");
    expect(mockDb.updateOne).not.toHaveBeenCalled();
  });

  // Test 3: Member not found
  it("should return an error when member is not found", async () => {
    const memberData = { MID: 99, points: 10 }; // Non-existing member
    mockDb.findOne.mockResolvedValue(null); // No member found with MID

    await expect(addPoints(mockDb, memberData)).rejects.toThrow("Member not found.");
    expect(mockDb.updateOne).not.toHaveBeenCalled();
  });
});