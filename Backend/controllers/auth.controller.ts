import type { Request, Response } from "express";
import User from "../modals/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
import { json } from "stream/consumers";
export const registryUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, name, avatar } = req.body;
  try {
    let user = await User.findOne({ email });
    // Проверка на существующего юзера
    if (user) {
      res.status(400).json({ success: false, msg: "User alredy exist" });
      return;
    }

    // Новый юзер создается
    user = new User({
      email,
      password,
      name,
      avatar: avatar || "",
    });

    // Кешируем Пароль
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // сохр юзера
    await user.save();

    // генерируем токен
    const token = generateToken(user);

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    //    ищем по почте юзера
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, msg: "Invalid credentials" });
      return;
    }

    // сравниваем пароли
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ success: false, msg: "Invalid credentials" });
      return;
    }

    // генерируем токен
    const token = generateToken(user);

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
