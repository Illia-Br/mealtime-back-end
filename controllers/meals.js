import { Meal } from "../models/meal.js";

function index(req, res) {
  Meal.find({})
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
  .populate("restaurant")
  .then(meal => res.json(meal))
  .catch(err => res.json(err))
}

function create(req, res) {
  req.body.creator = req.user.profile
  Meal.create(req.body)
  .then(meal => {
    res.json(meal)
  })
  .catch(err => res.json(err))
}

function update(req, res) {
  Meal.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .populate("creator")
  .then(meal => res.json(meal))
  .catch(err => res.json(err))
}

function deleteMeal(req, res) {
  Meal.findByIdAndDelete(req.params.id)
  .then(meal => res.json(meal))
  .catch(err => res.json(err))
}




export {
  index,
  show,
  create,
  update,
  deleteMeal as delete
}