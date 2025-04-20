import { StatusCodes } from "http-status-codes";


//desc: clear cookie and logout user    route: /api/user/logout
export const logout = async (req, res) => {

    res.clearCookie('jwtToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    }).status(StatusCodes.OK).json('Logged out successfully')
}