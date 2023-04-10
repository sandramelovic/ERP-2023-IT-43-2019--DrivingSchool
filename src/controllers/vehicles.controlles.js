import { getConnection, sql, query } from "../database"

export const getVehicles = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(query.getVehicles)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const postVehicle = async (req, res) => {
    const { vin, ccm, color, type, categoryId } = req.body

    if (vin == null || ccm == null || type == null, categoryId == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("vin", sql.VarChar, vin)
            .input("ccm", sql.Int, ccm)
            .input("color", sql.VarChar, color)
            .input("type", sql.VarChar, type)
            .input("categoryId", sql.Int, categoryId)
            .query(query.postVehicle)

        res.json({ vin, ccm, color, type, categoryId })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const getVehicleById = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.getVehicleById)

        if (!result.recordset[0]) {
            res.status(404)
            return res.send('Vehicle not found')
        }
        res.send(result.recordset[0])
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.deleteVehicle)

        res.sendStatus(200)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const putVehicle = async (req, res) => {
    const { vin, ccm, color, type, categoryId } = req.body

    const { id } = req.params

    if (vin == null || ccm == null || type == null, categoryId == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("vin", sql.VarChar, vin)
            .input("ccm", sql.Int, ccm)
            .input("color", sql.VarChar, color)
            .input("type", sql.VarChar, type)
            .input("categoryId", sql.Int, categoryId)
            .input("id", sql.Int, id)
            .query(query.putVehicle)

        res.json({ vin, ccm, color, type, categoryId })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}