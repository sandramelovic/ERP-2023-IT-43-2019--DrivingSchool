export const query = {
    getPrograms: 'SELECT * FROM Program',
    postProgram: 'INSERT INTO Program (programTypeId, categoryId, price) VALUES (@programTypeId, @categoryId, @price)',
    getProgramById: 'SELECT * FROM Program WHERE programId = @id',
    deleteProgram: 'DELETE FROM [DrivingSchool].[dbo].[Program] WHERE programId = @id',
    putProgram: 'UPDATE Program SET programTypeId = @programTypeId, categoryId = @categoryId, price = @price WHERE programId = @id',

    getProgramTypes: 'SELECT * FROM ProgramType',
    postProgramType: 'INSERT INTO ProgramType (programType) VALUES (@programType)',
    getProgramTypeById: 'SELECT * FROM ProgramType WHERE programTypeId = @id',
    deleteProgramType: 'DELETE FROM [DrivingSchool].[dbo].[ProgramType] WHERE programTypeId = @id',
    putProgramType: 'UPDATE ProgramType SET programType = @programType WHERE programTypeId = @id',

    getCategories: 'SELECT * FROM Category',
    postCategory: 'INSERT INTO Category (categoryType) VALUES (@categoryType)',
    getCategoryById: 'SELECT * FROM Category WHERE categoryId = @id',
    deleteCategory: 'DELETE FROM [DrivingSchool].[dbo].[Category] WHERE categoryId = @id',
    putCategory: 'UPDATE Category SET categoryType = @categoryType WHERE categoryId = @id',

    getInstructors: 'SELECT * FROM Instructor',
    postInstructor: 'INSERT INTO Instructor (nameSurename, vehicleId) VALUES (@nameSurename, @vehicleId)',
    getInstructorById: 'SELECT * FROM Instructor WHERE instructorId = @id',
    deleteInstructor: 'DELETE FROM [DrivingSchool].[dbo].[Instructor] WHERE instructorId = @id',
    putInstructor: 'UPDATE Instructor SET nameSurename = @nameSurename, vehicleId = @vehicleId WHERE instructorId = @id',

    getOrders: 'SELECT * FROM Orders',
    postOrder: 'INSERT INTO Orders (userId, total, date) VALUES (@userId, @total, @date)',
    getOrderById: 'SELECT * FROM Orders WHERE orderId = @id',
    deleteOrder: 'DELETE FROM [DrivingSchool].[dbo].[Orders] WHERE orderId = @id',
    putOrder: 'UPDATE Orders SET userId = @userId, total = @total, date = @date WHERE orderId = @id',

    getOrderItems: 'SELECT * FROM OrderItem',
    postOrderItem: 'INSERT INTO OrderItem (amount, programId, orderId) VALUES (@amount, @programId, @orderId)',
    getOrderItemById: 'SELECT * FROM OrderItem WHERE orderItemId = @id',
    deleteOrderItem: 'DELETE FROM [DrivingSchool].[dbo].[OrderItem] WHERE orderItemId = @id',
    putOrderItem: 'UPDATE OrderItem SET amount = @amount, programId = @programId, orderId = @orderId WHERE orderItemId = @id',

    getVehicles: 'SELECT * FROM Vehicle',
    postVehicle: 'INSERT INTO Vehicle (vin, ccm, color, type, categoryId) VALUES (@vin, @ccm, @color, @type, @categoryId)',
    getVehicleById: 'SELECT * FROM Vehicle WHERE vehicleId = @id',
    deleteVehicle: 'DELETE FROM [DrivingSchool].[dbo].[Vehicle] WHERE vehicleId = @id',
    putVehicle: 'UPDATE Vehicle SET vin = @vin, ccm = @ccm, color = @color, type = @type, categoryId = @categoryId WHERE vehicleId = @id',

    getPayments: 'SELECT * FROM Payment',
    postPayment: 'INSERT INTO Payment (paid, details, orderId) VALUES (@paid, @details, @orderId)',
    getPaymentById: 'SELECT * FROM Payment WHERE paymentId = @id',
    deletePayment: 'DELETE FROM [DrivingSchool].[dbo].[Payment] WHERE paymentId = @id',
    putPayment: 'UPDATE Payment SET paid = @paid, details = @details, orderId = @orderId WHERE paymentId = @id',

    getUsers: 'SELECT * FROM Users',
    postUser: 'INSERT INTO Users (nameSurename, address, birthDate, jmbg, phoneNumber, role, username, password) VALUES (@nameSurename, @address, @birthDate, @jmbg, @phoneNumber, @role, @username, @password)',
    getUserById: 'SELECT * FROM Users WHERE userId = @id',
    deleteUser: 'DELETE FROM [DrivingSchool].[dbo].[Users] WHERE userId = @id',
    putUser: 'UPDATE Users SET nameSurename = @nameSurename, address = @address, birthDate = @birthDate, jmbg = @jmbg, phoneNumber = @phoneNumber, role = @role, username = @username, password = @password WHERE userId = @id',

    loginUser: 'SELECT * FROM Users WHERE username = @username',
    findUserId: 'SELECT userId from Users WHERE username = @username'



}