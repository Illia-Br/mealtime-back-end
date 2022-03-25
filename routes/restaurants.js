import { Router } from "express"
import * as restaurantsCtrl from "../controllers/restaurants.js"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/
router.get('/', restaurantsCtrl.index)
router.get('/:id', restaurantsCtrl.show)


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, restaurantsCtrl.create)
router.put('/:id', checkAuth, restaurantsCtrl.update)
router.delete('/:id', checkAuth, restaurantsCtrl.delete)

export {
  router
}