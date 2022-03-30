import { Router } from 'express'
import * as mealsCtrl from '../controllers/meals.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()



/*---------- Public Routes ----------*/
router.get('/:id', mealsCtrl.show)
router.get('/', mealsCtrl.index)


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, mealsCtrl.create)
router.post('/:id/restaurants', checkAuth, mealsCtrl.addRestaurant)
router.post('/:id/reviews', mealsCtrl.createReview)
router.put('/:id', checkAuth, mealsCtrl.update)
router.delete('/:id', checkAuth, mealsCtrl.delete)




export {
  router
}