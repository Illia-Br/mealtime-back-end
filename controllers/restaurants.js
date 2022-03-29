import { Restaurant } from '../models/restaurant.js'
import {v2 as cloudinary} from 'cloudinary'

function index(req, res) {
  Restaurant.find({})
  .populate('creator')
  .then(restaurants => res.json(restaurants))
  .catch(err => res.json(err))
}

function create(req, res) {
  req.body.creator = req.user.profile
  if (req.body.picture === 'undefined' || !req.files['picture']) {
    delete req.body['picture']
    Restaurant.create(req.body)
    .then(restaurant => {
      restaurant.populate('creator')
      .then(populatedRestaurant => {
        res.status(201).json(populatedRestaurant)
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
      Restaurant.create(req.body)
      .then(restaurant => {
        restaurant.populate('creator')
        .then(populatedRestaurant => {
          res.status(201).json(populatedRestaurant)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }
}

function show(req, res) {
  Restaurant.findById(req.params.id)
  .populate("creator")
  .populate("meals")
  .then(restaurant => res.json(restaurant))
  .catch(err => res.json(err))
}

function update(req, res) {
  if (req.body.picture === 'undefined' || !req.files['picture']) {
    delete req.body['picture']
    Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(restaurant => {
      restaurant.populate('creator')
      .then(populatedRestaurant => {
        res.status(201).json(populatedRestaurant)
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
      Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(restaurant => {
        restaurant.populate('creator')
        .then(populatedRestaurant => {
          res.status(201).json(populatedRestaurant)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }








  // Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
  // .populate("creator")
  // .populate("meals")
  // .then(restaurants => {res.json(restaurants)})
  // .catch(err => res.json(err))
  
}

function deleteRestaurant(req, res) {
  Restaurant.findByIdAndDelete(req.params.id)
  .then(restaurant => res.json(restaurant))
  .catch(err => res.json(err))
}


export {
  index,
  show,
  update,
  deleteRestaurant as delete,
  create
}