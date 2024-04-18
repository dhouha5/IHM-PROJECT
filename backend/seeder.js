import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import categories from './data/categories.js'; // Import categories data
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js'
import Category from './models/categoryModel.js'; // Import Category model
import connectDB from './config/db.js';

dotenv.config();

connectDB();

// Insert sample data
const importData = async () => {
    try {
        // First wipe database
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany(); // Wipe categories as well

        // Migrate categories
        await Category.insertMany(categories);

        // Migrate users
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // Map adminUser to each product
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // Migrate products
        await Product.insertMany(sampleProducts);

        console.log('Data imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Delete/Wipe sample data
const destroyData = async () => {
    try {
        // First wipe database
        await Order.deleteMany()
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany(); // Wipe categories as well

        console.log('Data destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Check if '-d' flag is provided in command line argument
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
