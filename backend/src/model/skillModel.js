import mongoose from 'mongoose'; 

const skillSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true}
}); 

const skillModel = mongoose.model('skill', skillSchema, 'skills');
export default skillModel;