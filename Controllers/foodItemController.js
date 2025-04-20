import prisma from '../db/prisma.js';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../ErrorClass/bad-request.js';
import NotFoundError from '../ErrorClass/not-found.js';


//desc: Creates new FoodItem            route: /api/foodItem
export const createFoodItem = async (req, res) => {
    const {
        name,
        categoryName,
        description,
        price,
        offerPrice,
        images,
    } = req.body;

    if (!name || !categoryName || !price || !images)
        throw new BadRequestError(
            'Please provide all required fields: name, categoryName, price, images');


    // ✅ Check if category exists
    const category = await prisma.categories.findUnique({
        where: { name: categoryName },
    });

    if (!category) {
        throw new BadRequestError(
            `Category '${categoryName}' does not exist. Please select an existing category.`
        );
    }

    const foodItem = await prisma.foodItem.create({
        data: {
            name,
            categoryName,
            description,
            price: parseFloat(price),
            offerPrice: offerPrice ? parseFloat(offerPrice) : null,
            images,
        },
    });

    res.status(StatusCodes.CREATED).json({ foodItem });
};

//desc: Retriev all FoodItems           route: /api/foodItem
export const getAllFoodItems = async (req, res) => {
    const foodItems = await prisma.foodItem.findMany();
    res.status(StatusCodes.OK).json({ foodItems });
};

//desc: Retriev only single FoodItem            route: /api/foodItem/:id
export const getFoodItemById = async (req, res) => {
    const { id } = req.params;

    const foodItem = await prisma.foodItem.findUnique({
        where: { id: parseInt(id) },
    });

    if (!foodItem) {
        throw new NotFoundError(`No FoodItem found with ID ${id}`);
    }

    res.status(StatusCodes.OK).json({ foodItem });
};

//desc: Updates FoodItem            route: /api/foodItem
export const updateFoodItem = async (req, res) => {
    const { id } = req.params;

    const existingItem = await prisma.foodItem.findUnique({
        where: { id: parseInt(id) },
    });

    if (!existingItem) {
        throw new NotFoundError(`No FoodItem found with ID ${id}`);
    }

    const updatedItem = await prisma.foodItem.update({
        where: { id: parseInt(id) },
        data: req.body,
    });

    res.status(StatusCodes.OK).json({ updatedItem });
};

//desc: Deletes  FoodItem            route: /api/foodItem
export const deleteFoodItem = async (req, res) => {
    const { id } = req.params;

    const deletedItem = await prisma.foodItem.delete({
        where: { id: parseInt(id) },
    });

    res.status(StatusCodes.OK).json({ message: 'FoodItem deleted', deletedItem });
};