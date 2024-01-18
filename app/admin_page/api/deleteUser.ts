import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../firebase_admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.body;

  admin
    .auth()
    .deleteUser(uid)
    .then((userRecord) => {
      res.status(200).json({
        message: "User profile deleted successfully",
        userRecord: userRecord,
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error deleting user profile", error: error });
    });
}
