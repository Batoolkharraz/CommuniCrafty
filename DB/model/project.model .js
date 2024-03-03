
import mongoose, { Schema, model, Types } from 'mongoose';
const projectSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    artwork: [{
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            type: Object,
            required: true,
        },
        categoryId: { type: Types.ObjectId, ref: 'Category', required: true },
        price:{
            type:Number,
        },
    }],
},
    {
        timestamps: true
    })


const projectModel = mongoose.models.Project || model('Project', projectSchema);
export default projectModel;