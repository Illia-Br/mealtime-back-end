import { Router } from "express"
import * as restaurantsCtrl from "../controllers/restaurants.js"
const router = Router()

/*---------- Public Routes ----------*/
router.get('/', restaurantsCtrl.index)



/*---------- Protected Routes ----------*/


export {
  router
}