import { getConnection, sql, query } from "../database"

export const getAllPayments = async (req, res) => {
    try {
        let payments = []
        const pool = await getConnection()
        const result = await pool.request().query(query.getPayments)
        for (var i = 0; i < result.recordset.length; i++) {
            payments.push(result.recordset[i]);
        }
        return payments
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getPayments = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(query.getPayments)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const postPayment = async (req, res) => {
    const { paid, details, orderId, status} = req.body

    if (paid == null || details == null || orderId == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
        .input("paid", sql.Date, paid)
        .input("details", sql.VarChar, details)
        .input("orderId", sql.Int, orderId)
        .input("status", sql.VarChar, status)
        .query(query.postPayment)

            res.json({ paid, details, orderId, status})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.getPaymentById)
        res.send(result.recordset[0])
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("id", id)
            .query(query.deletePayment)

        res.sendStatus(204)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const putPayment = async (req, res) => {
    const { paid, details, orderId} = req.body

    const { id } = req.params

    if (paid == null || details == null || orderId == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" })
    }
    try {
        const pool = await getConnection()

        await pool.request()
            .input("paid", sql.Date, paid)
            .input("details", sql.VarChar, details)
            .input("orderId", sql.Int, orderId)
            .input("id", sql.Int, id)
            .query(query.putPayment)

            res.json({ paid, details, orderId})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}