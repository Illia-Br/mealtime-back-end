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
  .then(profile => {res.json(profile)})
  .catch(err => res.json(err))
}

function addRecipeToDay(req, res) {
  let day = req.params.day
  console.log(typeof day);
  Profile.findById(req.user.profile)
  .then(profile => {
    console.log(profile[day]);
    profile[day].push(req.body)
    profile.save()
  })
}

export { index, show, addRecipeToDay }
