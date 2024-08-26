import slugify from "slugify";
import pool from "src/database";

class SearchRepo {

  async save(text, userId) {
    const slug = slugify(text, { lower: true });
    const result = await pool.query(
      `INSERT INTO searches(search_criteria, slug, user_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (slug, user_id) DO UPDATE
           SET search_criteria = excluded.search_criteria
       returning *`,
      [text, slug, userId],
    );
    return result?.rows?.[0];
  }

  async getAll(userId) {
    const result = await pool.query(
      `SELECT *
       FROM searches
       WHERE user_id = $1`,
      [userId],
    );
    return result.rows;
  }

}

const searchRepo = new SearchRepo();
export default searchRepo;
