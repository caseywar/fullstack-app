const pool = require('../utils/pool');

module.exports = class Favor {
    id;
    favor;
    quantitiy;
    contributor;

    constructor(row) {
        this.id = row.id;
        this.favor = row.favor;
        this.quantitiy = row.quantitiy;
        this.contributor = row.contributor;
    }

    static async insert({ favor, quantitiy, contributor }) {
        const { rows } = await pool.query(
            `INSERT INTO favors (favor, quantity, contributor) VALUES ($1, $2, $3) RETURNING *`, [favor, quantitiy, contributor]
        );
        return new Favor(rows[0]);
    }
}