import express from 'express'
import { getAllOptions, getOptionById } from '../controllers/optionsController.js'

const router = express.Router()

router.get('/', getAllOptions)
router.get('/:id', getOptionById)

export default router
