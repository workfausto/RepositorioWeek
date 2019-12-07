const mariadb = require('mariadb');

const connection = {
    host: "",
    port: 0,
    database: "",
    user: "",
    password: "",
}

let pool;

const callback = async function(sql, values, next) {
    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    let conn;
    try {
        conn = pool ? await pool.getConnection() : mariadb.createPool({
            ...connection,
            connectionLimit: 50,
            multipleStatements: true,
            typeCast: function castField(field, useDefaultTypeCasting) {
                if ((field.type === "BIT") && (field.columnLength === 1)) {
                    const bytes = field.buffer();
                    return (bytes[0] === 1);
                }
                return (useDefaultTypeCasting());
            }
        });
        const rows = await conn.query(sql, values);
        if (conn) conn.end();
        next(null, rows);
    } catch (err) {
        if (conn) return conn.end();
        next(err, null);
    } finally {
        // if (conn && conn.isValid())  return conn.end();
    }
};

const promise = (sql, values) => {
    return new Promise(async(resolve, reject) => {
        let conn;
        try {
            conn = pool ? await pool.getConnection() : mariadb.createPool({
                ...connection,
                connectionLimit: 50,
                multipleStatements: true,
                typeCast: function castField(field, useDefaultTypeCasting) {
                    if ((field.type === "BIT") && (field.columnLength === 1)) {
                        const bytes = field.buffer();
                        return (bytes[0] === 1);
                    }
                    return (useDefaultTypeCasting());
                }
            });
            const rows = await conn.query(sql, values);
            if (conn) conn.end();
            resolve(rows);
        } catch (err) {
            if (conn) return conn.end();
            reject(err);
        } finally {
            // if (conn && conn.isValid())  return conn.end();
        }
    });
};

module.exports = {
    callback,
    promise,
    connection
};