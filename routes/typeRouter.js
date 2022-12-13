const Router = require('express')
const router = Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/cheakRoleMiddleware')

router.post('/', checkRole('Admin'), typeController.create)
router.get('/', typeController.getAll)

module.exports = router