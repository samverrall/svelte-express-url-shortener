import db from '../database'

export async function createRedirectTableIfNotExists() {
  try {
    await db.run("CREATE TABLE IF NOT EXISTS redirects (id STRING PRIMARY KEY, url STRING, shortcode STRING)")
  } catch (err) {
    console.error(err)
  }
}