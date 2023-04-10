import { getConnection, sql, query } from "../database"

export const getProgramTypes = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(query.getProgramTypes)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const postProgramType = async (req, res) => {
    const { programType } = req.body

    if (programType == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("programType", sql.VarChar, programType)
            .query(query.postProgramType)

        res.json({ programType })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const deleteProgramType = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.deleteProgramType)

        res.sendStatus(204)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const putProgramType = async (req, res) => {
    const { programType } = req.body
    const { id } = req.params

    if (programType == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("programType", sql.VarChar, programType)
            .input("id", sql.Int, id)
            .query(query.putProgramType)

        res.json({ programType })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const getProgramTypeById = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.getProgramTypeById)

        if (!result.recordset[0]) {
            res.status(404)
            return res.send('Program type not found')
        }
        res.send(result.recordset[0])
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}