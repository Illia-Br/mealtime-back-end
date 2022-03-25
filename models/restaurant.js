import mongoose from 'mongoose'

const Schema = mongoose.Schema

const restaurantSchema = new Schema ({
  name: { type: String, required: true},
  location: { type: String, required: true},
  meals: [{
    type: Schema.Types.ObjectId, ref: "Meal"
  }],
  link: String,
  creator: {
    type: Schema.Types.ObjectId, ref: "Profile"
    },
  picture: String,

}, {
  timestamps: true
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export {
  Restaurant
}