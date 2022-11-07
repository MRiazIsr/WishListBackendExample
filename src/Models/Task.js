const mongoose = require('mongoose');
const connectDB = require('../DB/DbConnection');
const errorConstants = require('../errorConstants');

const ToDoTaskSchema = mongoose.Schema({

    name : { 
        type : String,
        required : true
    },
    task : { 
        type : String,
        required : true
    },
    is_completed : {
        type : Boolean,
        default : false
    },    
    todo_when : { 
        type : Date,
        required : true
    },

}, { timestamps: true });

const toDoTasks = mongoose.model('ToDoTask', ToDoTaskSchema);

exports.getOne = async (id, method) => {
    let responseObject;

    try {
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }

        const task = await toDoTasks.findById(id);
        
        if (task === null) {
            responseObject = createReturnObject(false, method, errorConstants.cantFind, errorConstants.statusBadRequest);

            return responseObject;
        } else {
            responseObject = createReturnObject(true, method, task, errorConstants.statusOk);
            await connectDB.closeConnection();

            return responseObject;
        }
    } catch (e) {
        await connectDB.closeConnection();
        responseObject = createReturnObject(false, method, e.toString(), errorConstants.statusBadRequest);
        
        return responseObject;
    }
    
}

exports.getAll = async (offsetLimitObject, method) => {
    let responseObject;

    try {
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }
        
        const tasks = await toDoTasks.find().skip(offsetLimitObject.offset).limit(offsetLimitObject.limit);
        responseObject = createReturnObject(true, method, tasks, errorConstants.statusOk);
        await connectDB.closeConnection();
        
        return responseObject;
    } catch (e) {
        await connectDB.closeConnection();
        responseObject = createReturnObject(false, method, e.toString(), errorConstants.statusBadRequest);
        
        return responseObject;
    }
    
}

exports.create = async (body, method) => {
    let responseObject;

    try {
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }

        const task = await toDoTasks.create(body);

        if (task === null) {
            responseObject = createReturnObject(false, method, cantFind, errorConstants.statusBadRequest);
            await connectDB.closeConnection();

            return responseObject;
        } else {
            responseObject = createReturnObject(true, method, task, errorConstants.statusOk);
            await connectDB.closeConnection();

            return responseObject;
        }
    } catch (e) {
        await connectDB.closeConnection();
        responseObject = createReturnObject(false, method, e.toString(), errorConstants.statusBadRequest);
        
        return responseObject;
    }
    
}

exports.update = async (body, method) => {
    const id = body.id;
    const updates = body;
    let responseObject;

    try {
        //deleting property id of updates object, request to not update it or prevent type error
        delete updates.id;
      
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }

        const task = await toDoTasks.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (task === null) {
            responseObject = createReturnObject(false, method, errorConstants.cantFind, errorConstants.statusBadRequest);
            await connectDB.closeConnection();

            return responseObject;
        } else {
            responseObject = createReturnObject(true, method, task, errorConstants.statusOk);
            await connectDB.closeConnection();

            return responseObject;
        }
    } catch (e) {
        await connectDB.closeConnection();
        responseObject = createReturnObject(false, method, e.toString(), errorConstants.statusBadRequest);

        return responseObject;
    }
    
}

exports.deleteTask = async (id, method) => {
    const options = {select : '_id'};
    let responseObject;

    try {
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }
        
        const task = await toDoTasks.findByIdAndDelete(id, options);

        if (task === null) {
            responseObject = createReturnObject(false, method, errorConstants.cantFind, errorConstants.statusBadRequest);

            return responseObject;
        } else {
            responseObject = createReturnObject(true, method, task, errorConstants.statusOk);
            await connectDB.closeConnection();

            return responseObject;
        }
    } catch (e) {
        await connectDB.closeConnection();
        responseObject = createReturnObject(false, method, e.toString(), errorConstants.statusBadRequest);

        return responseObject;
    } 
}

createReturnObject = (status, method, result, statusCode) => {
    let responseObject = {
        status : status,
        method : method,
        result : result,
        status_code : statusCode 
    };

    return responseObject;
} 