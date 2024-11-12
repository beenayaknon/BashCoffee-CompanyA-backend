const { addMember } = require("../Database member/memberController");

describe("addMember", () => {
  let mockDb;

  beforeEach(() => {
    mockDb = {
      collection: jest.fn().mockReturnThis(),
      findOne: jest.fn(),
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
      insertOne: jest.fn()
    };
  });

  it("should add a new member with valid data", async () => {
    mockDb.findOne.mockResolvedValue(null); // No existing member
    mockDb.toArray.mockResolvedValue([{ MID: 1 }]); // Last member has MID 1

    const memberData = {
      Mname: "John Doe",
      Tel: "1234567890",
      Alumni: true
    };

    const result = await addMember(mockDb, memberData);

    expect(result).toEqual({
      MID: 2,
      Mname: "John Doe",
      Tel: "1234567890",
      Points: 0,
      Alumni: true
    });
    expect(mockDb.insertOne).toHaveBeenCalledWith(result);
  });

  it("should throw an error if required fields are missing", async () => {
    const memberData = { Mname: "Jane Doe", Tel: "" }; // Missing 'Alumni'

    await expect(addMember(mockDb, memberData)).rejects.toThrow("All member fields are required");
    expect(mockDb.insertOne).not.toHaveBeenCalled();
  });

  it("should throw an error if member with the same phone number already exists", async () => {
    mockDb.findOne.mockResolvedValue({ MID: 1, Tel: "1234567890" });

    const memberData = {
      Mname: "Duplicate Member",
      Tel: "1234567890",
      Alumni: true
    };

    await expect(addMember(mockDb, memberData)).rejects.toThrow("Member with this phone number already exists");
    expect(mockDb.insertOne).not.toHaveBeenCalled();
  });
});
