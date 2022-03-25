import mongoose from 'mongoose'

const Schema = mongoose.Schema


const profileSchema = new Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: String,
  meals: [{
    type: Schema.Types.ObjectId, ref: "Meal"
  }],
  favoriteMeals: [{
    type: Schema.Types.ObjectId, ref: "Meal"
  }],
  schedule: {
    sunday: [{
      type: Schema.Types.ObjectId, ref: "Meal"
    }], 
    monday: [{ 
      type: Schema.Types.ObjectId, ref: "Meal"
    }], 
    tuesday: [{ 
      type: Schema.Types.ObjectId, ref: "Meal"
    }], 
    wednesday: [{ 
      type: Schema.Types.ObjectId, ref: "Meal"
    }], 
    thursday: [{ 
      type: Schema.Types.ObjectId, ref: "Meal"
    }], 
    friday: [{ 
      type: Schema.Types.ObjectId, ref: "Meal"
    }], 
    saturday: [{ 
      type: Schema.Types.ObjectId, ref: "Meal"
    }],
  }
},{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
