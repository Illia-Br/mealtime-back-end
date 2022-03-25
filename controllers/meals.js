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
  console.log("This is the show meal function");
}

function create(req, res) {
  Meal.create(req.body)
  .then(meal => {
    res.json(meal)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/meals")
  })
}

function update(req, res) {
  console.log("this is the update function");
}

function deleteMeal(req, res) {
  console.log("this is the delete function");
}




export {
  index,
  show,
  create,
  update,
  deleteMeal as delete
}