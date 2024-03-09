import mongoose, { Schema, model, Types } from 'mongoose';

const ProjectGroupSchema = new Schema({
    projectname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdby:{
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [{
        userId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        task: {
            type: String,
            required: true,
        },
        taskstatus: {
            type: Boolean, // Corrected schema type
            default: false,
        },
        confirm: {
            type: Boolean, // Corrected schema type
            default: false,
        },
       
    }]
}, {
    timestamps: true
});

const projectGroupModel = mongoose.models.Group || model('Group', ProjectGroupSchema);
export default projectGroupModel;
