import { getConnection, sql, query } from "../database"

export const getAllOrders = async (req, res) => {
    try {
        let orders = []
        const pool = await getConnection()
        const result = await pool.request().query(query.getOrders)
        for (var i = 0; i < result.recordset.length; i++) {
            orders.push(result.recordset[i]);
        }
        return orders
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const getOrders = async (req, res) => {
    try {
        let orders = []
        const pool = await getConnection()
        const result = await pool.request().query(query.getOrders)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const postOrder = async (req, res) => {
    const { userId, total, date } = req.body

    if (userId == null || total == null || date == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("userId", sql.Int, userId)
            .input("total", sql.Int, total)
            .input("date", sql.Date, date)
            .query(query.postOrder)

        res.json({ userId, total, date })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.getOrderById)

        res.send(result.recordset[0])
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.deleteOrder)

        res.sendStatus(200)
        res.json({ message: 'Order deleted' })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const putOrder = async (req, res) => {
    const { userId, total, date } = req.body
    const { id } = req.params

    if (userId == null || total == null || date == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("userId", sql.Int, userId)
            .input("total", sql.Int, total)
            .input("date", sql.Date, date)
            .input("id", sql.Int, id)
            .query(query.putOrder)

        res.json({ userId, total, date })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}