import fs from 'fs'
import path from 'path'
import mammoth from 'mammoth'
import { fileURLToPath } from 'url'

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Helper function to extract text from a Word document and split by paragraphs
 * @param {string} docPath - Path to the Word document
 * @returns {Promise<string[]>} - Extracted paragraphs from the document
 */
async function extractParagraphsFromDocx(docPath) {
  const buffer = fs.readFileSync(docPath)
  const result = await mammoth.extractRawText({ buffer })
  return result.value
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph)
}

export async function seed(knex) {
  // Deletes ALL existing entries
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

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`)
      continue
    }

    const paragraphs = await extractParagraphsFromDocx(filePath)

    if (paragraphs.length < 3) {
      console.error(`Insufficient paragraphs in ${file}`)
      continue
    }

    // Assume the first paragraph is the title
    const title = paragraphs[0]

    // Assume the first few paragraphs after the title are the narrative (up to paragraph 3)
    const narrative = paragraphs.slice(1, 3).join('\n\n').trim()

    // Heuristic: Assume ingredients are usually shorter and appear next
    const ingredientsIndex = 3
    let instructionsIndex = ingredientsIndex + 1

    // Try to infer where ingredients end and instructions start
    for (let i = ingredientsIndex; i < paragraphs.length; i++) {
      if (paragraphs[i].split(',').length > 1) {
        instructionsIndex = i + 1
        break
      }
    }

    const ingredients = paragraphs
      .slice(ingredientsIndex, instructionsIndex)
      .join('\n\n')
      .trim()
    const instructions = paragraphs.slice(instructionsIndex).join('\n\n').trim()

    // Create the image path
    const imagePath = `images/${title.replace(/\s+/g, '-').toLowerCase()}.jpg`

    recipes.push({
      title,
      narrative,
      ingredients,
      instructions,
      image: imagePath,
    })

    // Log the extracted data to verify correctness
    console.log({ title, narrative, ingredients, instructions })
  }

  // Inserts the recipes extracted from Word documents into the database
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
