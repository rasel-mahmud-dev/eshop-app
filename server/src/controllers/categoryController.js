import pool from "src/database";
import slugify from "slugify";

class CategoryController {
  importBatch = async (req, res) => {
    const categories = req.body;
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      for (let category of categories) {
        const { name, logo, parent } = category;
        const slug = slugify(name, { lower: true });
        const parentSlug = slugify(parent || "", { lower: true });

        // Find parent category
        const findParentResult = await client.query(
          `SELECT id
           FROM categories
           WHERE slug = $1`,
          [parentSlug],
        );

        // Get the parent ID if it exists
        const parentId = findParentResult.rows.length > 0 ? findParentResult.rows[0].id : null;

        // Insert or update the category
        await client.query(
          `INSERT INTO categories(name, slug, logo, parent_id)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (slug) DO UPDATE
               SET name      = excluded.name,
                   logo      = excluded.logo,
                   parent_id = excluded.parent_id
           returning id`,
          [name, slug, logo, parentId],
        );
      }

      // Commit transaction if everything is successful
      await client.query("COMMIT");

      // Optionally, return the updated categories
      const { rows } = await client.query(`SELECT *
                                           FROM categories`);
      res.status(200).send(rows);

    } catch (error) {
      console.log(error);
      // Rollback transaction in case of error
      await client.query("ROLLBACK");
      res.status(500).send({ error: "An error occurred while importing categories" });
    }
  };

  create = async (req, res) => {
    try {
      const { name, logo, parent } = req.body;
      if (!name) throw Error(`Name is required`);

      const slug = slugify(name, { lower: true });

      const ress = await pool.query(
        `INSERT INTO categories(name, slug, logo, parent_id)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (slug) DO UPDATE
             SET name      = excluded.name,
                 logo      = excluded.logo,
                 parent_id = excluded.parent_id
         returning *`,
        [name, slug, logo, parent],
      );

      res.status(201).json({ data: ress.rows?.[0] });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while importing categories" });
    }
  };

  getCategories = async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT *
                                         FROM categories`);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while importing categories" });
    }
  };

  deleteAll = async (req, res) => {
    try {
      const { rows } = await pool.query(`DELETE
                                         FROM categories`);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while importing categories" });
    }
  };

  deleteParent = async (req, res) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const { parentId } = req.params;


      let result = await pool.query(`DELETE
                                     FROM categories
                                     where id = $1`, [parentId]);
      await pool.query(`DELETE
                        FROM categories
                        where parent_id = $1`, [parentId]);

      await client.query("COMMIT");
      if (!result.rowCount) {
        return res.status(400).json({
          message: "Category already deleted or not found.",
          data: {},
        });
      }
      res.status(200).json({ message: "Success", data: result });

    } catch (error) {
      // Commit transaction if everything is successful
      await client.query("ROLLBACK");
      res.status(500).send({ error: "An error occurred while importing categories" });
    } finally {
      client.release();
    }
  };

  getParentCategories = async (req, res) => {
    try {
      const { rows } = await pool.query(`select name,
                                                id,
                                                slug,
                                                logo
                                         from categories
                                         where parent_id IS NULL
      `);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while importing categories" });
    }
  };

  getSubCategories = async (req, res) => {
    try {
      const { parentId } = req.params;
      const { rows } = await pool.query(`select name,
                                                id,
                                                slug,
                                                logo
                                         from categories
                                         where categories.parent_id = $1
      `, [parentId]);
      res.status(200).json({ data: rows });
    } catch (error) {

      res.status(500).send({ error: "An error occurred while importing categories" });
    }
  };
}

const categoryController = new CategoryController();
export default categoryController;
