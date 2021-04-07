const pool = require('../utils/pool');

module.exports = class Favor {
    id;
    favor;
    quantity;
    contributor;

    constructor(row) {
        this.id = row.id;
        this.favor = row.favor;
        this.quantity = row.quantity;
        this.contributor = row.contributor;
    }

    static async insert({ favor, quantity, contributor }) {
        const { rows } = await pool.query(
            `INSERT INTO favors (favor, quantity, contributor) VALUES ($1, $2, $3) RETURNING *`, [favor, quantity, contributor]
        );
        return new Favor(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM favors');

        return rows.map((row) => new Favor(row))
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM favors WHERE id=$1', [id]);

        return new Favor(rows[0])
    }

    static async update(id, { favor, quantity, contributor}) {
        const { rows } = await pool.query(
            `UPDATE favors
            SET favor = $1
            SET quantity = $2
            SET contributor = $3
            WHERE id = $4
            RETURNING *`,
            [favor, quantity, contributor]
        );
        return new Favor(rows[0]);
    }
} 