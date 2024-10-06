import { Router } from 'express'
import multer from 'multer'
import mammoth from 'mammoth'
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from '../db/recipe' // Import the model functions
import { StatusCodes } from 'http-status-codes'
import { RecipeData } from '../../models/recipe'

const router = Router()
const upload = multer({ dest: 'uploads/' }) // Directory for temporary file storage

// GET: Retrieve all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await getAllRecipes() // Fetch all recipes
    res.json(recipes)
  } catch (error) {
    console.error(`Failed to fetch recipes: ${error}`)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to fetch recipes' })
  }
})

// GET: Retrieve a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const recipe = await getRecipeById(id) // Fetch recipe by ID
    if (!recipe) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Recipe not found' })
    }
    res.json(recipe)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to fetch recipe' })
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

    const recipeData: RecipeData = { title, ingredients, instructions } // Create recipeData object
    await createRecipe(recipeData) // Call createRecipe function

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Recipe created successfully!' })
  } catch (error) {
    console.error(`Failed to create recipe: ${error}`)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to create recipe' })
  }
})

// PATCH: Update a recipe by ID
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const updatedRecipe = req.body // Ensure your request body has the required fields

    const success = await updateRecipe(updatedRecipe, id) // Call updateRecipe function
    if (!success) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Recipe not found' })
    }

    res.sendStatus(StatusCodes.OK) // Send 200 OK if update was successful
  } catch (error) {
    console.error(`Database error: ${error}`)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to update recipe' })
  }
})

// DELETE: Delete a recipe by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const success = await deleteRecipe(id) // Call deleteRecipe function
    if (!success) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Recipe not found' })
    }

    res.sendStatus(StatusCodes.NO_CONTENT) // Send 204 No Content on successful deletion
  } catch (error) {
    console.error(`Database error: ${error}`)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to delete recipe' })
  }
})

export default router
