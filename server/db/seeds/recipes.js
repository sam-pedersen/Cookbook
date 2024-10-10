import fs from 'fs'
import path from 'path'
import mammoth from 'mammoth'
import { fileURLToPath } from 'url'

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
  await knex('recipes').del()

  const docsDir = path.join(__dirname, '../data')
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

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`)
      continue
    }

    const docContent = await extractTextFromDocx(filePath)
    const recipeContent = docContent
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line)

    const title = recipeContent[0]
    const narrative = recipeContent
      .slice(1, recipeContent.indexOf('Ingredients:'))
      .join('\n')
      .trim()
    const ingredientsStart = recipeContent.indexOf('Ingredients:') + 1
    const instructionsStart = recipeContent.indexOf('Instructions:') + 1

    const ingredients = recipeContent
      .slice(ingredientsStart, instructionsStart - 1)
      .join('\n')
      .trim()
    const instructions = recipeContent
      .slice(instructionsStart)
      .join('\n')
      .trim()

    const imagePath = `images/${title.replace(/\s+/g, '-').toLowerCase()}.jpg`

    recipes.push({
      title,
      narrative,
      ingredients,
      instructions,
      image: imagePath,
    })
  }

  await knex('recipes').insert(
    recipes.map((recipe) => ({
      title: recipe.title,
      narrative: recipe.narrative,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: recipe.image,
      created_at: new Date().toISOString(),
    })),
  )
}
