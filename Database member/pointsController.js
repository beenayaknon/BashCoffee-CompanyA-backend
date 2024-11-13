async function addPoints(db, memberData) {
    const { MID, points } = memberData;
  
    // Validate MID and points
    if (MID === undefined || points <= 0) {
      throw new Error("Valid MID and a positive number of points are required.");
    }
  
    // Find the member by MID
    const member = await db.collection("member").findOne({ MID });
    if (!member) {
      throw new Error("Member not found.");
    }
  
    // Update points
    const updatedPoints = member.Points + points;
    await db.collection("member").updateOne(
      { MID },
      { $set: { Points: updatedPoints } }
    );
  
    // Return updated member data
    return {
      message: "Points added successfully",
      member: { MID, Points: updatedPoints }
    };
  }

async function redeemPoints(db, memberData) {
    const { MID, points } = memberData;
  
    // Validate MID and points
    if (MID === undefined || points <= 0) {
      throw new Error("Valid MID and a positive number of points are required.");
    }
  
    // Find the member by MID
    const member = await db.collection("member").findOne({ MID });
    if (!member) {
      throw new Error("Member not found.");
    }
  
    // Check if the member has enough points for redemption
    if (member.Points < points) {
      throw new Error("Insufficient points for redemption.");
    }
  
    // Deduct points
    const updatedPoints = member.Points - points;
    await db.collection("member").updateOne(
      { MID },
      { $set: { Points: updatedPoints } }
    );
  
    // Return updated member data
    return {
      message: "Points redeemed successfully",
      member: { MID, Points: updatedPoints }
    };
  }   

  module.exports = { addPoints, redeemPoints };  