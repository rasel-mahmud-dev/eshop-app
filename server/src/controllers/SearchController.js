
import pool from "src/database";
import searchRepo from "src/repo/SearchRepo";

class SearchController {
  // Save a search
  saveSearch = async (req, res) => {
    try {
      const userId = req.user.id;
      const { searchCriteria } = req.body;

      const rows = await searchRepo.save(searchCriteria, userId)

      res.status(201).json({ data: rows?.[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while saving the search." });
    }
  };

  // Fetch saved searches for a user
  getSavedSearches = async (req, res) => {
    try {
      const userId = req.user.id;
      const rows = await searchRepo.getAll(userId)

      res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching saved searches." });
    }
  };

  // Delete a saved search
  deleteSearch = async (req, res) => {
    try {
      const { searchId } = req.params;

      const result = await pool.query(
        `DELETE FROM searches
         WHERE id = $1
         RETURNING *`,
        [searchId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Search not found." });
      }

      res.status(200).json({ data: result.rows?.[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while deleting the search." });
    }
  };
}

const searchController = new SearchController();
export default searchController;
