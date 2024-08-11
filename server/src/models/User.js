import pool from "../database";

class User {
    constructor({
                    id,
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
                    created_at,
                    deleted_at
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
            state,
            postal_code,
            country,
            phone_number
        } = userData;

        const query = `
            INSERT INTO users
            (username, password, email, first_name, last_name, address, city, state, postal_code,
             country, phone_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
            phone_number
        ];

        try {
            const result = await pool.query(query, values);
            return new User(result.rows[0]);
        } catch (err) {
            throw new Error('Error creating user: ' + err.message);
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
            throw new Error('Error finding user: ' + err.message);
        }
    }

    // Example of updating a user's information
    async update() {
        const query = `
            UPDATE users
            SET username     = $1,
                password     = $2,
                email        = $3,
                first_name   = $4,
                last_name    = $5,
                address      = $6,
                city         = $7,
                state        = $8,
                postal_code  = $9,
                country      = $10,
                phone_number = $11,
                deleted_at   = $12
            WHERE id = $13
            RETURNING *`;

        const values = [
            this.username,
            this.password,
            this.email,
            this.first_name,
            this.last_name,
            this.address,
            this.city,
            this.state,
            this.postal_code,
            this.country,
            this.phone_number,
            this.deleted_at,
            this.id
        ];

        try {
            const result = await pool.query(query, values);
            return new User(result.rows[0]);
        } catch (err) {
            throw new Error('Error updating user: ' + err.message);
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
            throw new Error('Error deleting user: ' + err.message);
        }
    }
}

export default User;
