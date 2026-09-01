import bcrypt from 'bcryptjs';
import { prisma } from '../config/db.js';
import { generateToken, setAuthCookie } from '../utils/token.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered on HubMall' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'BUYER',
      },
      select: { id: true, name: true, email: true, role: true },
    });

    const token = generateToken({ id: user.id, role: user.role });
    setAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      message: 'Welcome to HubMall! Account created successfully.',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { store: true }
    });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken({ id: user.id, role: user.role });
    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      message: 'Logged into HubMall successfully',
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role, store: user.store },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return res.status(200).json({ success: true, message: 'Logged out of HubMall successfully' });
};

export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};
