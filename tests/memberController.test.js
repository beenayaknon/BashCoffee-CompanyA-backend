const { addMember, getMemberByPhoneNumber, getAllMembers, getRecordHistory } = require("../Database member/memberController");

describe("memberController", () => {
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

  describe("addMember", () => {
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

    it("should throw an error if a member with the same phone number already exists", async () => {
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

  describe("getMemberByPhoneNumber", () => {
    it("should return a member if found by phone number", async () => {
      const mockMember = { MID: 1, Mname: "John Doe", Tel: "1234567890", Points: 0, Alumni: true };
      mockDb.findOne.mockResolvedValue(mockMember);

      const result = await getMemberByPhoneNumber(mockDb, "1234567890");

      expect(result).toEqual(mockMember);
    });

    it("should throw an error if member is not found", async () => {
      mockDb.findOne.mockResolvedValue(null);

      await expect(getMemberByPhoneNumber(mockDb, "1234567890")).rejects.toThrow("Member not found");
    });
  });

  describe("getAllMembers", () => {
    it("should return all members", async () => {
      const mockMembers = [
        { MID: 1, Mname: "John Doe", Tel: "1234567890", Points: 0, Alumni: true },
        { MID: 2, Mname: "Jane Doe", Tel: "0987654321", Points: 10, Alumni: false }
      ];
      mockDb.toArray.mockResolvedValue(mockMembers);

      const result = await getAllMembers(mockDb);

      expect(result).toEqual(mockMembers);
    });

    it("should return an empty array if no members exist", async () => {
      mockDb.toArray.mockResolvedValue([]);

      const result = await getAllMembers(mockDb);

      expect(result).toEqual([]);
    });
  });

  describe("getRecordHistory", () => {
    it("should return all records", async () => {
      const mockRecords = [
        { Customer: "John Doe", Tel: "1234567890", Menu: [], totalPrice: 100, date: new Date() },
        { Customer: "Jane Doe", Tel: "0987654321", Menu: [], totalPrice: 200, date: new Date() }
      ];
      mockDb.toArray.mockResolvedValue(mockRecords);

      const result = await getRecordHistory(mockDb);

      expect(result).toEqual(mockRecords);
    });

    it("should return an empty array if no records exist", async () => {
      mockDb.toArray.mockResolvedValue([]);

      const result = await getRecordHistory(mockDb);

      expect(result).toEqual([]);
    });
  });
});
