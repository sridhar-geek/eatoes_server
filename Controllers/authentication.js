import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import prisma from '../db/prisma.js'
import BadRequestError from "../ErrorClass/bad-request.js";
import NotFoundError from "../ErrorClass/not-found.js";

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const verifyPassword = async (inputPassword, hashedPassword) => {
    return bcrypt.compare(inputPassword, hashedPassword);
}

//desc: validates crendentails and create token     route: /api/auth/login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError('Please provide all required feilds')

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) throw new NotFoundError("invalid Credentails")
    if (!verifyPassword(password, user.password)) throw new NotFoundError('Invalid Credetails')
    const payload = { id: user.id, role: user.role }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' })
    const { password: _, ...userWithoutPassword } = user;
    res.cookie('jwtToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    }).status(StatusCodes.OK).json({ user: userWithoutPassword, token })
}

//desc: post new data to database        route: /api/auth/register
export const register = async (req, res) => {
    const { name, email, password, phoneNo } = req.body;

    // Basic validation
    if (!name || !email || !password || !phoneNo)
        throw new BadRequestError('Please provide all required feilds')

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
        throw new BadRequestError('Email already exists')


    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashed,
            phoneNo,
        },
    });
    res.status(StatusCodes.CREATED).json("registration Successful")
}