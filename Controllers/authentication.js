import prisma from "../db/prisma";

const login = async(req,res) => {
    const [email, password] = req.body; 
    if(!email || !password) return 

}