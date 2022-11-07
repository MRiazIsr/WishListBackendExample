const toDoModel = require('../Models/Task');
const errorConstants = require('../errorConstants');

exports.getTask = async (req, res) => {
    const id = req.query.id;
    let result;

    if (id == undefined) {
        result = createReturnObject(false, 'getTask', errorConstants.idIsRequired, errorConstants.statusBadRequest);
        res.status(result.status_code).send(result);

        return;
    } 

    try{
        result = await toDoModel.getOne(id, 'getOne');
    } catch(e) {
        result = createReturnObject(false, 'getTask', e.toString(), errorConstants.statusServerError);
    }

    res.status(result.status_code).send(result);
        
}

exports.getAllTasks = async (req, res) => {
    const offsetLimitObject = { 
        offset : req.query.offset ?? 0,
        limit : req.query.limit
    };

    let result;

    if (offsetLimitObject.limit == undefined) {
        result = createReturnObject(false, 'getTask', errorConstants.limitIsRequired, errorConstants.statusBadRequest);
        res.status(result.status_code).send(result);

        return;
    } 

    try{
        result = await toDoModel.getAll(offsetLimitObject, 'getAll');  
    } catch(e) {
        result = createReturnObject(false, 'getresult', e.toString(), errorConstants.statusServerError);
    }

    res.status(result.status_code).send(result);

}    
   

exports.createTask = async (req,res) => {
    let body = req.body;
    let result;

    if (body == undefined) {
        result = createReturnObject(false, 'getTask', errorConstants.idIsRequired, errorConstants.statusBadRequest);
        res.status(result.status_code).send(result);

        return;
    } 
    
    try{
        result = await toDoModel.create(body, 'createTask');
    } catch(e) {
        result = createReturnObject(false, 'getresult', e.toString(), errorConstants.statusServerError);
    }
     
    res.status(result.status_code).send(result);

}

exports.updateTask = async (req, res) => {
    const body = req.body;
    let result;

    if (body == undefined || body.id == undefined) {
        result = createReturnObject(false, 'getTask', errorConstants.idIsRequired, errorConstants.statusBadRequest);
        res.status(result.status_code).send(result);

        return;
    }
    
    try{
        result = await toDoModel.update(body, 'updateTask');
    } catch(e) {
        result = createReturnObject(false, 'getresult', e.toString(), errorConstants.statusServerError);
    }
   
    res.status(result.status_code).send(result);
}

exports.deleteTask = async (req, res) => {
    const id = req.body.id;
    let result;

    if (id == undefined) {
        result = createReturnObject(false, 'getTask', errorConstants.idIsRequired, errorConstants.statusBadRequest);
        res.status(result.status_code).send(result);

        return;
    }

    try{
        result = await toDoModel.deleteTask(id, 'deleteTask');
    } catch(e) {
        result = createReturnObject(false, 'getresult', e.toString(), errorConstants.statusServerError);
    }
    
    res.status(result.status_code).send(result);
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

