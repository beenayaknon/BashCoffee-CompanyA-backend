const { redeemPoints } = require("../Database member/pointsController");

describe("redeemPoints", () => {
  let mockDb;

  beforeEach(() => {
    mockDb = {
      collection: jest.fn().mockReturnThis(),
      findOne: jest.fn(),
      updateOne: jest.fn()
    };
  });

  // Test 1: Valid request - Redeem points from existing member
  it("should redeem points from a member with a valid request", async () => {
    const memberData = { MID: 0, points: 100 };
    mockDb.findOne.mockResolvedValue({ MID: 0, Points: 200 }); // Existing member with sufficient points

    const response = await redeemPoints(mockDb, memberData);

    expect(response.message).toBe("Points redeemed successfully");
    expect(response.member).toEqual({ MID: 0, Points: 100 }); // Points reduced by 100
    expect(mockDb.updateOne).toHaveBeenCalledWith(
      { MID: 0 },
      { $set: { Points: 100 } }
    );
  });

  // Test 2: Invalid points value - points are 0 or negative
  it("should return an error for invalid points value (negative or zero)", async () => {
    const memberData = { MID: 0, points: -10 }; // Negative points

    await expect(redeemPoints(mockDb, memberData)).rejects.toThrow("Valid MID and a positive number of points are required.");
    expect(mockDb.updateOne).not.toHaveBeenCalled();
  });

  // Test 3: Member not found
  it("should return an error when member is not found", async () => {
    const memberData = { MID: 99, points: 50 }; // Non-existing member
    mockDb.findOne.mockResolvedValue(null); // No member found with MID

    await expect(redeemPoints(mockDb, memberData)).rejects.toThrow("Member not found.");
    expect(mockDb.updateOne).not.toHaveBeenCalled();
  });

  // Test 4: Insufficient points
  it("should return an error when member has insufficient points", async () => {
    const memberData = { MID: 0, points: 150 }; // Redeem more than available points
    mockDb.findOne.mockResolvedValue({ MID: 0, Points: 100 }); // Existing member with insufficient points

    await expect(redeemPoints(mockDb, memberData)).rejects.toThrow("Insufficient points for redemption.");
    expect(mockDb.updateOne).not.toHaveBeenCalled();
  });
});
