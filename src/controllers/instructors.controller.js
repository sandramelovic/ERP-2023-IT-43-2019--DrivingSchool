import { getConnection, sql, query } from "../database"

export const getInstructors = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(query.getInstructors)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const postInstructor = async (req, res) => {
    const { nameSurename, vehicleId } = req.body

    if (nameSurename == null || vehicleId == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("nameSurename", sql.VarChar, nameSurename)
            .input("vehicleId", sql.Int, vehicleId)
            .query(query.postInstructor)

        res.json({ nameSurename, vehicleId })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const getInstructorById = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.getInstructorById)

        if (!result.recordset[0]) {
            res.status(404)
            return res.send('Instructor not found')
        }
        res.send(result.recordset[0])
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteInstructor = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.deleteInstructor)

        res.sendStatus(204)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const putInstructor = async (req, res) => {
    const { nameSurename, vehicleId } = req.body
    const { id } = req.params

    if (nameSurename == null || vehicleId == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("nameSurename", sql.VarChar, nameSurename)
            .input("vehicleId", sql.Int, vehicleId)
            .input("id", sql.Int, id)
            .query(query.putInstructor)

        res.json({ nameSurename, vehicleId })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}