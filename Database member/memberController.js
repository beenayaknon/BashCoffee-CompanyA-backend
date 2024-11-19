async function addMember(db, memberData) {
  const { Mname, Tel, Alumni } = memberData;

  if (!Mname || !Tel || Alumni === undefined) {
    throw new Error("All member fields are required");
  }

  const existingMember = await db.collection("member").findOne({ Tel });
  if (existingMember) {
    throw new Error("Member with this phone number already exists");
  }

  const lastMember = await db
    .collection("member")
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

async function getMemberByPhoneNumber(db, tel) {
  try {
    const member = await db.collection("member").findOne({ Tel: tel });
    if (!member) {
      throw new Error("Member not found");
    }
    return member;
  } catch (err) {
    console.error("Error fetching member by phone number:", err);
    throw err;
  }
}

async function getAllMembers(db) {
  try {
    const members = await db.collection("member").find({}).toArray();
    return members;
  } catch (err) {
    console.error("Error fetching members:", err);
    throw err;
  }
}

async function getRecordHistory(db) {
  try {
    const record = await db.collection("record").find({}).toArray();
    return record;
  } catch (err) {
    console.error("Error fetching record history:", err);
    throw err;
  }
}


module.exports = { addMember, getMemberByPhoneNumber, getAllMembers, getRecordHistory };
