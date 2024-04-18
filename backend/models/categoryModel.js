import mongoose from 'mongoose';

const subcategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2, // Example: Minimum length of 2 characters
        maxlength: 50 // Example: Maximum length of 50 characters
    },
    subcategories: [subcategorySchema]
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
