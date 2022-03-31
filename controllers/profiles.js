import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}


function show(req, res) {
  Profile.findById(req.params.id)
  .populate("friday")
  .populate("saturday")
  .populate("sunday")
  .populate("monday")
  .populate("tuesday")
  .populate("wednesday")
  .populate("thursday")
  .then(profile => {res.json(profile)})
  .catch(err => res.json(err))
}

function addRecipeToDay(req, res) {
  let day = req.params.day
  Profile.findById(req.user.profile)
  .then(profile => {
    profile[day].push(req.body)
    profile.save()
    .then(profile => {res.json(profile)})
  })
}

function removeRecipeFromDay(req, res) {
  let day = req.params.day
  Profile.findById(req.user.profile)
  .populate(day)
  .then(profile=> {
    profile[day].remove(req.params.recipe )
    profile.save()
    .then(profile => {res.json(profile)})
  })
}

export { index, show, addRecipeToDay, removeRecipeFromDay }
