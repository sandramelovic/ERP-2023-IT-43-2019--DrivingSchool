import { getConnection, sql, query } from "../database"

export const getAllOrderItems = async (req, res) => {
    try {
        let orderItems = []
        const pool = await getConnection()
        const result = await pool.request().query(query.getOrderItems)
        for (var i = 0; i < result.recordset.length; i++) {
            orderItems.push(result.recordset[i]);
        }
        return orderItems
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const getOrderItems = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(query.getOrderItems)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const postOrderItem = async (req, res) => {
    const { amount, programId, orderId } = req.body

    if (amount == null || programId == null || orderId == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("amount", sql.Int, amount)
            .input("programId", sql.Int, programId)
            .input("orderId", sql.Int, orderId)
            .query(query.postOrderItem)

        res.json({ amount, programId, orderId })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.getOrderItemById)

        res.send(result.recordset[0])
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.deleteOrderItem)

        res.sendStatus(204)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const putOrderItem = async (req, res) => {
    const { amount, programId, orderId } = req.body
    const { id } = req.params

    if (amount == null || programId == null || orderId == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("amount", sql.Int, amount)
            .input("programId", sql.Int, programId)
            .input("orderId", sql.Int, orderId)
            .input("id", sql.Int, id)
            .query(query.putOrderItem)

        res.json({ amount, programId, orderId })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}