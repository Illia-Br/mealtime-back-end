import { Restaurant } from '../models/restaurant.js'

function index(req, res) {
  Restaurant.find({})
  .then(restaurants => res.json(restaurants))
  .catch(err => res.json(err))
}

function show(req, res) {
  Restaurant.findById(req.params.id)
  .then(restaurant => res.json(restaurant))
  .catch(err => res.json(err))
}

function update(req, res) {
  Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(restaurants => {res.json(restaurants)})
  .catch(err => res.json(err))
  
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
  deleteRestaurant as delete
}