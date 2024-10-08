import pool from "src/database";
import slugify from "src/utils/slugify";
import searchRepo from "src/repo/SearchRepo";


class ProductController {
  importBatch = async (req, res) => {
    const products = req.body;
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      for (let product of products) {
        const { title, description, price, category, brand, image } = product;
        const slug = slugify(title, { lower: true });

        let brandIdToUse = null;
        const brandSlug = slugify(brand, { lower: true });
        if (brandSlug) {
          let brandResult = await client.query("SELECT id FROM brands WHERE slug = $1", [brandSlug]);
          if (brandResult.rows.length > 0) {
            brandIdToUse = brandResult.rows[0].id;
          } else {
            const brandInsertResult = await client.query(
              `INSERT INTO brands(name, slug)
               VALUES ($1, $2)
               RETURNING id`,
              [brand, brandSlug],
            );
            brandIdToUse = brandInsertResult.rows[0].id;
          }
        }

        const categorySlug = slugify(category, { lower: true });
        let categoryIdToUse = null;
        if (categorySlug) {
          let categoryResult = await client.query("SELECT id FROM categories WHERE slug = $1", [categorySlug]);
          let categoryIdToUse;
          if (categoryResult.rows.length > 0) {
            categoryIdToUse = categoryResult.rows[0].id;
          } else {
            throw Error(`Category ${category} not found`);
          }
        }

        // Insert or update the product
        await client.query(
          `INSERT INTO products(title, slug, description, price, brand_id, category_id, image)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (slug) DO UPDATE
               SET title       = excluded.title,
                   description = excluded.description,
                   price       = excluded.price,
                   brand_id    = excluded.brand_id,
                   category_id = excluded.category_id,
                   image       = excluded.image
           RETURNING id`,
          [title, slug, description, price, brandIdToUse, categoryIdToUse, image],
        );
      }

      // Commit transaction if everything is successful
      await client.query("COMMIT");

      // Optionally, return the updated products
      const { rows } = await client.query(`SELECT *
                                           FROM products`);
      res.status(200).send(rows);

    } catch (error) {
      console.log(error);
      // Rollback transaction in case of error
      await client.query("ROLLBACK");
      res.status(500).send({
        error: "An error occurred while importing products",
        message: error?.message,
      });
    } finally {
      client.release();
    }
  };

  create = async (req, res) => {
    try {

      const { title, description, price, image, brandId, categoryId } = req.body;

      if (!title) throw Error(`title is required`);

      const slug = slugify(title, { lower: true });

      const ress = await pool.query(
        `INSERT INTO products(title, slug, description, price, brand_id, category_id, image)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (slug) DO UPDATE
             SET title       = excluded.title,
                 description = excluded.description,
                 price       = excluded.price,
                 brand_id    = excluded.brand_id,
                 category_id = excluded.category_id,
                 image       = excluded.image
         RETURNING *`,
        [title, slug, description, price, brandId, categoryId, image],
      );

      res.status(201).json({ data: ress.rows?.[0] });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while creating the product" });
    }
  };

  getProducts = async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT *
                                         FROM products`);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while fetching products" });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await pool.query(`SELECT *
                                         FROM products
                                         WHERE id = $1`, [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ data: rows[0] });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while fetching the product" });
    }
  };

  deleteAll = async (req, res) => {
    try {
      const { rows } = await pool.query(`DELETE
                                         FROM products`);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while deleting products" });
    }
  };

  deleteItem = async (req, res) => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      let result = await pool.query(`DELETE
                                     FROM products
                                     WHERE id = $1
                                     RETURNING id`, [id]);

      if (!result.rowCount) {
        return res.status(400).json({
          message: "Product already deleted or not found.",
          data: {},
        });
      }
      res.status(200).json({ message: "Success", data: result });

    } catch (error) {
      res.status(500).send({ error: "An error occurred while deleting the product" });
    } finally {
      client.release();
    }
  };

  updateItem = async (req, res) => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const { title, description, price, brandId, categoryId, image } = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      const values = [];
      let updateQuery = "UPDATE products SET";

      if (title !== undefined) {
        updateQuery += ` title = $${values.length + 1},`;
        values.push(title);
      }
      if (description !== undefined) {
        updateQuery += ` description = $${values.length + 1},`;
        values.push(description);
      }
      if (price !== undefined) {
        updateQuery += ` price = $${values.length + 1},`;
        values.push(price);
      }
      if (brandId !== undefined) {
        updateQuery += ` brand_id = $${values.length + 1},`;
        values.push(brandId);
      }
      if (categoryId !== undefined) {
        updateQuery += ` category_id = $${values.length + 1},`;
        values.push(categoryId);
      }
      if (image !== undefined) {
        updateQuery += ` image = $${values.length + 1},`;
        values.push(image);
      }

      if (values.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }
      updateQuery = updateQuery.slice(0, -1);
      updateQuery += ` WHERE id = $${values.length + 1} RETURNING *;`;
      values.push(id);

      const result = await client.query(updateQuery, values);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Success", data: result.rows[0] });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send({ error: "An error occurred while updating the product" });
    } finally {
      client.release();
    }
  };

  getSearchProduct = async (req, res) => {
    const client = await pool.connect();
    try {
      const { searchText } = req.params;
      const { page = 1 } = req.query;
      let limit = 20;

      const offset = (page - 1) * limit;

      const productQuery = `
          SELECT 'product' as type, id, title as name, image as image
          FROM products
          WHERE title ILIKE '%' || $1 || '%'
      `;

      const categoryQuery = `
          SELECT 'category' as type, id, name, logo as image
          FROM categories
          WHERE name ILIKE '%' || $1 || '%'
      `;

      const brandQuery = `
          SELECT 'brand' as type, id, name, logo as image
          FROM brands
          WHERE name ILIKE '%' || $1 || '%'
      `;

      const combinedQuery = `
      ${productQuery}
      UNION ALL
      ${categoryQuery}
      UNION ALL
      ${brandQuery}
      LIMIT $2 OFFSET $3
    `;

      const totalCountQuery = `
          SELECT COUNT(*)
          FROM (
                   ${productQuery} UNION ALL ${categoryQuery}
                       UNION ALL
                       ${brandQuery}
                   ) as total
      `;

      const result = await client.query(combinedQuery, [searchText, limit, offset]);

      const totalCountResult = await client.query(totalCountQuery, [searchText]);

      const total = parseInt(totalCountResult.rows?.[0]?.count, 10);

      res.status(200).json({ message: "Success", data: { items: result.rows, total } });

    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "An error occurred while updating the product" });
    } finally {
      client.release();
    }
  };
}

const productController = new ProductController();
export default productController;
