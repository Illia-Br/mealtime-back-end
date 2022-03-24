import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String
})


const mealSchema = new Schema({
  name: {type: String, required: true},
  picture: {type: String},
  ingredients: {type: String, required: true},
  instructions: {type: String, required: true},
  prepTime: {type: String},
  creator: {
    type: Schema.Types.ObjectId, ref: "Profile"
    },
  calories: Number,
  reviews: [reviewSchema],
  restaurants: [{
    type: Schema.Types.ObjectId, ref: "Restaurant"
  }]
}, {
  timestamps: true
})

const Meal = mongoose.model('Meal', mealSchema)


export {
  Meal
}