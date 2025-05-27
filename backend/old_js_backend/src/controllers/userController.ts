import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: '获取用户列表失败', error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, bio, interests } = req.body;
    const user = new User({ username, password, bio, interests });
    const savedUser = await user.save();
    res.status(201).json({ message: '用户创建成功', user: savedUser });
  } catch (error) {
    res.status(400).json({ message: '创建用户失败', error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '获取用户信息失败', error });
  }
};
