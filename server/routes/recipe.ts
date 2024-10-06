// routes/api.ts

import { Router } from 'express'
import multer from 'multer'
import mammoth from 'mammoth'
import RecipeModel from '../../models/recipe' // Adjust the path based on your structure
import { StatusCodes } from 'http-status-codes'

const router = Router()
const upload = multer({ dest: 'uploads/' }) // Directory for temporary file storage

// GET: Retrieve all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await RecipeModel.getAll()
    res.json(recipes)
  } catch (error) {
    console.error(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to fetch recipes' })
  }
})

// POST: Create a new recipe
router.post('/', upload.single('recipeFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'No file uploaded' })
    }

    const fileBuffer = req.file.buffer // Access the uploaded file
    const result = await mammoth.extractRawText({ buffer: fileBuffer })

    const recipeContent = result.value.split('\n') // Simple split; adjust as needed
    const title = recipeContent[0] // Assuming title is the first line
    const ingredients = recipeContent.slice(1, -1).join('\n') // Adjust based on your structure
    const instructions = recipeContent[recipeContent.length - 1] // Assuming last line is instructions

    const recipeData = { title, ingredients, instructions }
    await RecipeModel.create(recipeData)

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Recipe created successfully!' })
  } catch (error) {
    console.error(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to create recipe' })
  }
})

export default router
