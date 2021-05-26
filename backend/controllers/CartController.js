const Cart = require('../models/Cart');
const helpers = require('./../common/helpers');
const Employee = require('../models/Category');
const auth = require('./../middleware/auth');

const mongoose = require('mongoose');

class CartController {
    // GET /cart
    async index(req, res) {
        try {
            // const selectParams = {
            //     _id: 1,
            //     name: 1,
            //     managerId: 1,
            //     employeeIds: 1
            // };

            const projects = await Cart.getAll({});

            return helpers.success(res, projects);
        } catch (error) {
            return helpers.error(res, error);
        }
    }

    async getByUser(req, res) {
        try {
            const user = await auth(req, res);
            const carts = await Cart.getAll({userId: user._id});
            return helpers.success(res, carts);
        } catch (error) {
            return helpers.error(res, error);
        }
    }

    // POST /cart
    async create(req, res, param, postData) {
        postData = JSON.parse(postData);

        let {name, employeeIds = [], managerId = null} = postData;

        if (!(employeeIds instanceof Array)) {
            employeeIds = [employeeIds];
        }

        try {
            let manageExists = await this.validateManager(managerId);

            if (!manageExists) {
                return helpers.validationError(res, 'Manager is invalid');
            }

            let employeesExists = await this.validateEmployees(employeeIds);

            if (!employeesExists) {
                return helpers.validationError(res, 'Employee(s) is invalid');
            }

            employeeIds = employeeIds.map(element => {
                return mongoose.Types.ObjectId(element)
            });

            if (managerId !== null) {
                managerId = mongoose.Types.ObjectId(managerId);
            }

            const project = await Cart.create({name, employeeIds, managerId});

            return helpers.success(res, project);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return helpers.validationError(res, error);
            } else {
                return helpers.error(res);
            }
        }
    }

    // GET /cart/:id
    async show(req, res, param) {
        try {
            const aggPipeline = [
                {
                    "$match": {
                        "_id": mongoose.Types.ObjectId(param)
                    }
                },
                {
                    "$lookup": {
                        "from": "employees",
                        "localField": "managerId",
                        "foreignField": "_id",
                        "as": "manager"
                    }
                },
                {
                    "$lookup": {
                        "from": "employees",
                        "localField": "employeeIds",
                        "foreignField": "_id",
                        "as": "employees"
                    }
                },
                {
                    "$project": {
                        "_id": 1,
                        "name": 1,
                        "manager": {
                            "_id": 1,
                            "name": 1
                        },
                        "employees": {
                            "_id": 1,
                            "name": 1
                        }
                    }
                }
            ];

            const project = await Cart.aggregation(aggPipeline);

            return helpers.success(res, project);
        } catch (error) {
            return helpers.error(res, error);
        }
    }

    // PUT /cart/:id
    async update(req, res, param, postData) {
        console.log(postData)
        try {
            param = mongoose.Types.ObjectId(param);
            const options = {
                new: true
            };

            const project = await Cart.findOneAndUpdate({_id: param}, {$set: JSON.parse(postData)}, options);

            return helpers.success(res, project);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return helpers.validationError(res, error);
            } else {
                console.log(error);
                return helpers.error(res);
            }
        }
    }

    // DELETE /employee/:id
    async delete(req, res, param) {
        param = mongoose.Types.ObjectId(param);

        let project;
        try {
            project = await Cart.get({_id: param}, {_id: 1});
        } catch (e) {
            console.log(e);
        }

        if (!project) {
            return helpers.error(res, 'Entity not found', 404);
        }

        try {
            let conditions = {_id: param};

            await Cart.remove(conditions);

            return helpers.success(res);
        } catch (error) {
            return helpers.error(res, error);
        }
    }

    // Checks if a manager with given id exists
    async validateManager(managerId) {
        if (managerId === null) {
            return true;
        }

        try {
            const managerExists = await Employee.get({_id: managerId, isManager: true});
            return !!(managerExists);
        } catch (e) {
            return false;
        }
    }

    // Checks if all the peers exist in database
    async validateEmployees(employeeIds) {
        if (!(employeeIds instanceof Array)) {
            employeeIds = [employeeIds];
        }

        if (employeeIds.length === 0) {
            return true;
        }

        try {
            const employeesExists = await Employee.getAll({_id: {$in: employeeIds}}, {_id: 1});
            return (employeesExists.length === employeeIds.length);
        } catch (e) {
            return false;
        }
    }
}

module.exports = new CartController();
