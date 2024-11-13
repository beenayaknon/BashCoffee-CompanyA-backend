async function addMember(db, memberData) {
    const { Mname, Tel, Alumni } = memberData;
  
    if (!Mname || !Tel || Alumni === undefined) {
      throw new Error("All member fields are required");
    }
  
    const existingMember = await db.collection("member").findOne({ Tel });
    if (existingMember) {
      throw new Error("Member with this phone number already exists");
    }
  
    const lastMember = await db.collection("member")
      .find({})
      .sort({ MID: -1 })
      .limit(1)
      .toArray();
  
    const MID = lastMember.length > 0 ? lastMember[0].MID + 1 : 0;
    const Points = 0;
  
    const newMember = { MID, Mname, Tel, Points, Alumni };
    await db.collection("member").insertOne(newMember);
  
    return newMember;
  }
  
  module.exports = { addMember };
  