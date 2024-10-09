import fs from 'fs'
import path from 'path'
import mammoth from 'mammoth'
import { fileURLToPath } from 'url'

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Helper function to extract text from a Word document
 * @param {string} docPath - Path to the Word document
 * @returns {Promise<string>} - Extracted text from the document
 */
async function extractTextFromDocx(docPath) {
  const buffer = fs.readFileSync(docPath)
  const result = await mammoth.extractRawText({ buffer })
  return result.value
}

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('recipes').del()

  const docsDir = path.join(__dirname, '../data') // Adjust if necessary
  const wordFiles = [
    '1-Apricots-Summer-2024.docx',
    '2-Mustard-2024.docx',
    '3-Rosewater-Meringues.docx',
    '4-Fejioa-Marmalade.docx',
    '5-Fruit-Loaf.docx',
  ]

  const recipes = []

  for (const file of wordFiles) {
    const filePath = path.join(docsDir, file)

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`)
      continue // Skip to the next file if not found
    }

    const docContent = await extractTextFromDocx(filePath)

    // Process the docContent to split title, ingredients, and instructions
    const recipeContent = docContent.split('\n')
    const title = recipeContent[0] // Assume the first line is the title
    const ingredients = recipeContent.slice(1, -1).join('\n') // Assume the rest until the last line are ingredients
    const instructions = recipeContent[recipeContent.length - 1] // Assume the last line is instructions

    recipes.push({
      title,
      ingredients,
      instructions,
    })
  }

  // Inserts the recipes extracted from Word documents
  await knex('recipes').insert(
    recipes.map((recipe, index) => ({
      id: index + 1,
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      created_at: new Date().toISOString(),
    })),
  )
}
