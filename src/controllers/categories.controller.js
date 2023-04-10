import { getConnection, sql, query } from "../database"

export const getCategories = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(query.getCategories)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const postCategory = async (req, res) => {
    const { categoryType } = req.body

    if (categoryType == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("categoryType", sql.VarChar, categoryType)
            .query(query.postCategory)

        res.json({ categoryType })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.deleteCategory)

        res.sendStatus(204)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const putCategory = async (req, res) => {
    const { categoryType } = req.body
    const {id} = req.params

    if (categoryType == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("categoryType", sql.VarChar, categoryType)
            .input("id", sql.Int, id)
            .query(query.putCategory)

        res.json({ categoryType })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.getCategoryById)

        res.send(result.recordset[0])
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}