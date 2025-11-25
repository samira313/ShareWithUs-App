import { logError } from "../util/logging.js";
import User from "../models/User.js";

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, msg: "Email is required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "User with this email not found" });
    }

    // Here, normally we generate a reset token and send an email.
    // But for now, just success response.

    return res.status(200).json({
      success: true,
      msg: "Password reset link sent (simulated)",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to process forgot password request, try again later",
    });
  }
};

export default forgotPassword;
