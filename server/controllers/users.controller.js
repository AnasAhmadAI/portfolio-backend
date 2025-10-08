import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

// GET /api/users
export async function getAllUsers(req, res) {
  const users = await User.find().select("-password").lean();
  res.json(users);
}

// GET /api/users/:id
export async function getUserById(req, res) {
  const user = await User.findById(req.params.id).select("-password").lean();
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}

// POST /api/users
export async function createUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "name, email, and password are required" });
  }
  const created = await User.create({ name, email, password });
  // toJSON in the model hides password
  res.status(201).json(created);
}

// PUT /api/users/:id
export async function updateUserById(req, res) {
  const { id } = req.params;
  const update = { ...req.body };

  // If password is present in the update, hash it first
  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }

  const updated = await User.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  })
    .select("-password")
    .lean();

  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json(updated);
}

// DELETE /api/users/:id
export async function deleteUserById(req, res) {
  const { id } = req.params;
  const deleted = await User.findByIdAndDelete(id).lean();
  if (!deleted) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User removed", id });
}

// DELETE /api/users
export async function deleteAllUsers(req, res) {
  const result = await User.deleteMany({});
  res.json({ message: "All users removed", deletedCount: result.deletedCount });
}
