const Router = require('express')
const router = Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/cheakRoleMiddleware')

router.post('/', checkRole('Admin'), brandController.create)
router.get('/', brandController.getAll)

module.exports = router