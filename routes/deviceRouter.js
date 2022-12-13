const Router = require('express')
const router = Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/cheakRoleMiddleware')

router.post('/', checkRole('Admin'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router