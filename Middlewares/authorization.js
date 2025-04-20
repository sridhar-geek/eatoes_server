// this middleware used for authorization for the user, it verify token and allow user accourding to it

import jwt from "jsonwebtoken";

import UnauthenticatedError from "../ErrorClass/unauthenticated.js";


export const authorization = async (req, res, next) => {
    const token = req.cookies.jwtToken;

    if (!token) {
        return res.redirect('/api/user/logout');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role };
        next(); // ✅ Token valid, go to next route
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.redirect(`/api/user/logout`);
        }

        throw new UnauthenticatedError('Authentication invalid');
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'You are not authorized to access this resource',
            });
        }
        next();
    };
}