import prisma from '../db/prisma.js';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../ErrorClass/bad-request.js';
import NotFoundError from '../ErrorClass/not-found.js';

//desc: Create Category           route: /api/category
export const createCategory = async (req, res) => {
    const { name, image } = req.body;

    if (!name || !image) {
        throw new BadRequestError('Please provide both name and image for the category');
    }

    // Check if category already exists
    const exists = await prisma.categories.findUnique({ where: { name } });
    if (exists) {
        throw new BadRequestError(`Category '${name}' already exists`);
    }

    const category = await prisma.categories.create({
        data: {
            name,
            image,
        },
    });

    res.status(StatusCodes.CREATED).json({ category });
};

//desc: Retrieve all Categories             route: /api/categories
export const getAllCategories = async (req, res) => {
    const categories = await prisma.categories.findMany();

    res.status(StatusCodes.OK).json({ categories });
};

//desc: Retrive Category by Id            route: /api/categories/:id    
export const getCategoryById = async (req, res) => {
    const { id } = req.params;

    const category = await prisma.categories.findUnique({
        where: { id: parseInt(id) },
    });

    if (!category) {
        throw new NotFoundError(`No category found with ID ${id}`);
    }

    res.status(StatusCodes.OK).json({ category });
};

//desc: Updae Category             route: /api/categories/:id
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body;

    const category = await prisma.categories.findUnique({
        where: { id: parseInt(id) },
    });

    if (!category) {
        throw new NotFoundError(`No category found with ID ${id}`);
    }

    const updated = await prisma.categories.update({
        where: { id: parseInt(id) },
        data: {
            name: name || category.name,
            image: image || category.image,
        },
    });

    res.status(StatusCodes.OK).json({ category: updated });
};

//desc: Deletes  Category            route: /api/categories/:id
export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    await prisma.categories.delete({ where: { id: parseInt(id) } });

    res.status(StatusCodes.OK).json({ message: 'Category deleted successfully and all food items linked to it' });
};
