import Item from "../models/Item.js";
import { logError } from "../util/logging.js";

// Add a new item to the DB
const addItem = async (req, res) => {
  // Get the User passed from authUser
  const user = req.user;
  try {
    const {
      title,
      category,
      model,
      condition,
      borrowDuration,
      description,
      images,
      availability,
      value,
      price,
    } = req.body;

    const newItem = new Item({
      ownerId: user._id,
      title,
      category,
      model,
      condition,
      borrowDuration,
      description,
      images,
      availability,
      value,
      price,
    });

    // Save new item
    const savedItem = await newItem.save();

    // Update ownedItems array of the user with the newly added item
    user.ownedItems.push(savedItem._id);
    await user.save();

    res.status(201).json({ success: true, item: savedItem });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: error.message || "Unable to add item, try again later.",
    });
  }
};

export default addItem;
