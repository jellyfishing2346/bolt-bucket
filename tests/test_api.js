import process from 'process'

async function run() {
  const url = process.env.API_BASE || 'http://localhost:4000/api/options'
  try {
    const res = await fetch(url)
    if (res.status !== 200) {
      console.error('API test failed: status', res.status)
      process.exit(1)
    }
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) {
      console.error('API test failed: expected non-empty array')
      process.exit(1)
    }
    console.log('API smoke test passed — options count =', data.length)
  } catch (err) {
    console.error('API test error', err.message)
    process.exit(1)
  }
}

run()
