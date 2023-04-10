import { getConnection, sql, query } from "../database"

export const getPrograms = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(query.getPrograms)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const postProgram = async (req, res) => {
    const { programTypeId, categoryId, price } = req.body

    if (programTypeId == null || categoryId == null || price == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("programTypeId", sql.Int, programTypeId)
            .input("categoryId", sql.Int, categoryId)
            .input("price", sql.Int, price)
            .query(query.postProgram)

        res.json({ programTypeId, categoryId, price })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const getProgramById = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.getProgramById)

        if (!result.recordset[0]) {
            res.status(404)
            return res.send('Program not found')
        }
        res.send(result.recordset[0])
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteProgram = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.deleteProgram)

        res.sendStatus(204)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const putProgram = async (req, res) => {
    const { programTypeId, categoryId, price } = req.body
    const {id} = req.params

    if (programTypeId == null || categoryId == null || price == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("programTypeId", sql.Int, programTypeId)
            .input("categoryId", sql.Int, categoryId)
            .input("price", sql.Int, price)
            .input("id", sql.Int, id)
            .query(query.putProgram)

        res.json({ programTypeId, categoryId, price })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}