import path from 'path'
import { fileURLToPath } from 'url'

async function run() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const calcPath = path.join(__dirname, '..', 'client', 'src', 'utilities', 'calcPrice.js')
  const mod = await import('file://' + calcPath)
  const { calcTotalPrice } = mod

  const options = [
    { category: 'color', key: 'red', price: 100 },
    { category: 'wheels', key: 'sport', price: 250 },
    { category: 'interior', key: 'leather', price: 500 }
  ]

  const selections = { color: 'red', wheels: 'sport', interior: 'leather' }
  const total = calcTotalPrice(selections, options)
  if (total !== 850) {
    console.error('calcPrice test failed: expected 850 got', total)
    process.exit(1)
  }
  console.log('calcPrice test passed')
}

run().catch(err => { console.error(err); process.exit(1) })
