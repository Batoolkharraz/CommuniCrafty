import mongoose, { Schema,Types,model } from "mongoose";

const craftSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    craft:[{
        categoryId:{ type: Types.ObjectId, ref: 'Category', required: true },
        skill:{
            type:String,
            defult:'beginner',
            enum:['beginner','advanced','professional'],
        },
    }],

},{
    timestamps:true
})

const craftModel = mongoose.models.Craft || model('Craft',craftSchema);
export default craftModel;
