export function calcTotalPrice(selections, options) {
  // selections: { category: key }
  // options: array of option rows with category,key,price
  let total = 0
  const map = new Map()
  for (const o of options) {
    map.set(`${o.category}:${o.key}`, Number(o.price))
  }
  for (const [cat, key] of Object.entries(selections)) {
    const price = map.get(`${cat}:${key}`) || 0
    total += price
  }
  return total
}
