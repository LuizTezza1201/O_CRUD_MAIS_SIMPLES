const banco = require("../config/database");

async function criar(email, senhaHash) {
    const sql = `
        INSERT INTO usuarios (email, senha)
        VALUES (?, ?)
    `;

    const [resultado] = await banco.execute(sql, [
        email,
        senhaHash
    ]);

    return {
        id: resultado.insertId,
        email
    };
}

async function listarTodos() {
    const sql = `
    SELECT id, email FROM usuarios
    `;

    const [linhas] = await banco.execute(sql);

        return linhas;
}

async function buscarPorId(id) {
    const sql = `
    SELECT id, email FROM usuarios
    WHERE id = ?
    `;

    const [linhas] = await banco.execute(sql, [id]);

        return linhas[0];
}

async function buscarPorEmail(email) {
    const sql = `
    SELECT * FROM usuarios
    WHERE email = ?
    `;

    const [linhas] = await banco.execute(sql, [email]);

        return linhas[0];
}

async function atualizar(id, email, senhaHash) {
    const sql = senhaHash
    ?`
    UPDATE usuarios
    SET email = ?, senha = ?
    WHERE id = ?
    `
    : `
        UPDATE usuarios
        SET email = ?
        WHERE id = ?
        `;

    const params = senhaHash ? [email, senhaHash, id] : [email, id];

    await banco.execute(sql, params);

    return {
        id,
        email
    };
}

async function excluir(id) {
    const sql = `
    DELETE FROM usuarios
    WHERE id = ?
    `;

    await banco.execute(sql, [id])
}

module.exports = {
    criar,
    listarTodos,
    buscarPorId,
    buscarPorEmail,
    atualizar,
    excluir
};