
import mongoose, { Schema, model, Types } from 'mongoose';
const promotSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    artTool: [{
        toolId: { type: Types.ObjectId, ref: 'Tool', required: true },
        qty:{ type: Number },
        description: { type: String },
    }],
},
    {
        timestamps: true
    })


const promotModel = mongoose.models.Promot || model('Promot', promotSchema);
export default promotModel;