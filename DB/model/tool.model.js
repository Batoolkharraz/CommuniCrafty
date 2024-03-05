
import mongoose, {Schema,model,Types} from 'mongoose';
const toolSchema = new Schema ({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:Object,
        required:true,
    },
    categoryId:{ type: Types.ObjectId, ref: 'Category', required: true },
},
{
    timestamps:true
})


const toolModel = mongoose.models.Tool ||  model('Tool', toolSchema);
export default toolModel;