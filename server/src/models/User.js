import pool from "../database";
import { makeHash } from "src/hash";

class User {
  constructor({
                id,
                username,
                password,
                email,
                first_name,
                role,
                last_name,
                address,
                city,
                state,
                postal_code,
                country,
                phone_number,
                created_at,
                deleted_at,
              }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.postal_code = postal_code;
    this.country = country;
    this.role = role;
    this.phone_number = phone_number;
    this.created_at = created_at;
    this.deleted_at = deleted_at;
  }

  // Save a new user to the database
  static async create(userData) {
    const {
      username,
      password,
      email,
      first_name,
      last_name,
      address,
      city,
      role,
      state,
      postal_code,
      country,
      phone_number,
    } = userData;

    const query = `
        INSERT INTO users
        (username, password, email, first_name, last_name, address, city, state, postal_code,
         country, phone_number, role)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *`;

    const values = [
      username,
      password,
      email,
      first_name,
      last_name,
      address,
      city,
      state,
      postal_code,
      country,
      phone_number,
      role,
    ];

    try {
      const result = await pool.query(query, values);
      return new User(result.rows[0]);
    } catch (err) {
      throw new Error("Error creating user: " + err.message);
    }
  }


  static async findByUsernameOrEmail(identifier) {
    const query = `
        SELECT *
        FROM users
        WHERE username = $1
           OR email = $1`;
    const values = [identifier];

    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) return null;
      return new User(result.rows[0]);
    } catch (err) {
      throw new Error("Error finding user: " + err.message);
    }
  }


  async update(userId) {
    const query = [];
    const values = [];
    const columns = [
      { column: "username", value: this.username },
      { column: "password", value: this.password },
      { column: "email", value: this.email },
      { column: "first_name", value: this.first_name },
      { column: "last_name", value: this.last_name },
      { column: "address", value: this.address },
      { column: "city", value: this.city },
      { column: "state", value: this.state },
      { column: "postal_code", value: this.postal_code },
      { column: "country", value: this.country },
      { column: "phone_number", value: this.phone_number },
      { column: "deleted_at", value: this.deleted_at },
      { column: "role", value: this.role },
    ];

    columns.forEach((column, index) => {
      if (column.value !== undefined) {
        query.push(`${column.column} = $${values.length + 1}`);
        values.push(column.value);
      }
    });
    if (query.length === 0) {
      throw new Error("No fields to update");
    }
    values.push(userId);

    const updateQuery = `UPDATE users
                         SET ${query.join(", ")}
                         WHERE id = $${values.length} RETURNING *`;

    try {
      const result = await pool.query(updateQuery, values);
      if (result.rows.length === 0) {
        throw new Error("User not found");
      }
      return  result.rows[0]
    } catch (err) {
      throw new Error("Error updating user: " + err.message);
    }
  }

  // Delete a user (soft delete)
  async delete() {
    const query = `
        UPDATE users
        SET deleted_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *`;

    const values = [this.id];

    try {
      const result = await pool.query(query, values);
      return new User(result.rows[0]);
    } catch (err) {
      throw new Error("Error deleting user: " + err.message);
    }
  }

  static async registration(body) {
    const {
      password = "123",
      email,
      firstName, // New field for full name
      lastName,
      phoneNumber,
      role,
    } = body;

    console.log(body);

    try {
      // Check if the email is provided and if the user already exists
      if (email) {
        let user = await User.findByUsernameOrEmail(email);
        if (user) {
          throw Error("Email already exists");
        }
      }

      const userData = {
        email,
        username: lastName ? `${firstName}_${lastName}` : firstName,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        role,
      };

      if (password) {
        const hashedPassword = await makeHash(password);
        userData.password = hashedPassword;
      }

      return await User.create(userData);

    } catch (err) {
      throw err;
    }
  }
}

export default User;
