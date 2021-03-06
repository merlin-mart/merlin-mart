const router = require('express').Router()

router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/orders', require('./orders'))
router.use('/users', require('./users'))
router.use('/reviews', require('./reviews'))

module.exports = router
