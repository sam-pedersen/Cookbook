import fs from 'fs'
import path from 'path'
import mammoth from 'mammoth'
import { fileURLToPath } from 'url'

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

    const paragraphs = await extractParagraphsFromDocx(filePath)

    if (paragraphs.length < 3) {
      console.error(`Insufficient paragraphs in ${file}`)
      continue
    }

    const title = paragraphs[0]

    const ingredientsStartIndex = paragraphs.findIndex(
      (paragraph) =>
        paragraph.toLowerCase().includes('yield') || paragraph.includes('Jars'),
    )

    if (ingredientsStartIndex === -1) {
      console.error(`No ingredients section found in ${file}`)
      continue
    }

    const narrative = paragraphs
      .slice(1, ingredientsStartIndex)
      .join('\n\n')
      .trim()

    const recipeContent = paragraphs.slice(ingredientsStartIndex)
    const ingredients = recipeContent[0] // First recipe-related paragraph (likely ingredients)
    const instructions = recipeContent.slice(1).join('\n\n').trim() // Remaining paragraphs are instructions

    const imagePath = `images/${title.replace(/\s+/g, '-').toLowerCase()}.jpg`

    recipes.push({
      title,
      narrative,
      ingredients,
      instructions,
      image: imagePath,
    })

    console.log({ title, narrative, ingredients, instructions })
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
