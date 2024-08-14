import pool from "src/database";
import slugify from "slugify";

class BrandController {
  importBatch = async (req, res) => {
    const brands = req.body;
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      for (let brand of brands) {
        const { name, logo, parent } = brand;
        const slug = slugify(name, { lower: true });

        // Insert or update the brand
        await client.query(
          `INSERT INTO brands(name, slug, logo)
           VALUES ($1, $2, $3)
           ON CONFLICT (slug) DO UPDATE
               SET name = excluded.name,
                   logo = excluded.logo
           RETURNING id`,
          [name, slug, logo],
        );
      }

      // Commit transaction if everything is successful
      await client.query("COMMIT");

      // Optionally, return the updated brands
      const { rows } = await client.query(`SELECT *
                                           FROM brands`);
      res.status(200).send(rows);

    } catch (error) {
      console.log(error);
      // Rollback transaction in case of error
      await client.query("ROLLBACK");
      res.status(500).send({ error: "An error occurred while importing brands" });
    } finally {
      client.release();
    }
  };

  create = async (req, res) => {
    try {
      const { name, logo } = req.body;
      if (!name) throw Error(`Name is required`);
      console.log(req.body);
      const slug = slugify(name, { lower: true });

      const ress = await pool.query(
        `INSERT INTO brands(name, slug, logo)
         VALUES ($1, $2, $3)
         ON CONFLICT (slug) DO UPDATE
             SET name      = excluded.name,
                 logo      = excluded.logo
         RETURNING *`,
        [name, slug, logo],
      );

      res.status(201).json({ data: ress.rows?.[0] });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while creating the brand" });
    }
  };

  getBrands = async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT *
                                         FROM brands`);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while fetching brands" });
    }
  };

  deleteAll = async (req, res) => {
    try {
      const { rows } = await pool.query(`DELETE
                                         FROM brands`);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while deleting brands" });
    }
  };

  deleteItem = async (req, res) => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      let result = await pool.query(`DELETE
                                     FROM brands
                                     WHERE id = $1
                                     RETURNING id`, [id]);

      if (!result.rowCount) {
        return res.status(400).json({
          message: "Brand already deleted or not found.",
          data: {},
        });
      }
      res.status(200).json({ message: "Success", data: result });

    } catch (error) {
      res.status(500).send({ error: "An error occurred while deleting the brand" });
    } finally {
      client.release();
    }
  };

  updateItem = async (req, res) => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const { name, logo } = req.body;
      console.log(req.body);

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      const values = [];
      let updateQuery = "UPDATE brands SET";

      if (name !== undefined) {
        updateQuery += ` name = $${values.length + 1},`;
        values.push(name);
      }
      if (logo !== undefined) {
        updateQuery += ` logo = $${values.length + 1},`;
        values.push(logo);
      }

      if (values.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }
      updateQuery = updateQuery.slice(0, -1);
      updateQuery += ` WHERE id = $${values.length + 1} RETURNING *;`;
      values.push(id);

      const result = await client.query(updateQuery, values);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Brand not found" });
      }

      res.status(200).json({ message: "Success", data: result.rows[0] });
    } catch (error) {
      console.error("Error updating brand:", error);
      res.status(500).send({ error: "An error occurred while updating the brand" });
    } finally {
      client.release();
    }
  };
}

const brandController = new BrandController();
export default brandController;
