import { Meal } from "../models/meal.js";
import {v2 as cloudinary} from 'cloudinary'

function index(req, res) {
  Meal.find({})
  .populate('creator')
  .populate("restaurants")
  .then (meals => {
    res.json(meals)
  })
  .catch(err => {
    res.json(err)
  })
}

function show(req, res) {
  Meal.findById(req.params.id)
  .populate("creator")
  .populate("restaurants")
  .populate({path: 'reviews.creator'})
  .then(meal => {
    console.log(meal)
    res.json(meal)
  })
  .catch(err => {
    res.json(err)
  })
}

function create(req, res) {
  req.body.creator = req.user.profile
  if (req.body.picture === 'undefined' || !req.files['picture']) {
    delete req.body['picture']
    Meal.create(req.body)
    .then(meal => {
      meal.populate('creator')
      .then(populatedMeal => {
        res.status(201).json(populatedMeal)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  } else {
    const imageFile = req.files.picture.path
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
    .then(image => {
      req.body.picture = image.url
      Meal.create(req.body)
      .then(meal => {
        meal.populate('creator')
        .then(populatedMeal => {
          res.status(201).json(populatedMeal)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }
}

function update(req, res) {
  if (req.body.picture === 'undefined' || !req.files['picture']) {
    delete req.body['picture']
    Meal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(meal => {
      meal.populate('creator')
      .then(populatedMeal => {
        res.status(201).json(populatedMeal)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  } else {
    const imageFile = req.files.picture.path
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
    .then(image => {
      console.log(image)
      req.body.picture = image.url
      Meal.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(meal => {
        meal.populate('creator')
        .then(populatedMeal => {
          res.status(201).json(populatedMeal)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }

}

function deleteMeal(req, res) {
  Meal.findByIdAndDelete(req.params.id)
  .then(meal => res.json(meal))
  .catch(err => res.json(err))
}

function createReview(req, res) {
  req.body.creator = req.user.profile
  Meal.findById(req.params.id)
  .populate('creator')
  .then(meal => {
    meal.reviews.push(req.body)
    meal.save()
    .then(() => {
      res.json(meal)
    })
    .catch(err => {
      res.json(err)
    })
  })
}

function addRestaurant(req, res) {
  Meal.findById(req.params.id)
  .populate('creator')
  .then(meal => {
    meal.restaurants.push(req.body)
    meal.save()
    .then(result => {
      result.populate('restaurants')
      .then(() => {
        res.json(result)
      })
    })
  })
  .catch(err => res.json(err))
}


export {
  index,
  show,
  create,
  update,
  deleteMeal as delete,
  createReview,
  addRestaurant
}