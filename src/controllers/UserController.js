import UserService from '../services/UserService.js';

class UserController {

    async getAll(req, res, next) {
        try {
            const users = await UserService.getAll();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getMe(req, res, next) {
        try {
            const user = await UserService.getById(req.userId);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const user = await UserService.getById(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async updateMe(req, res, next) {
        try {
            const user = await UserService.update(
                req.userId,
                req.body
            );

            res.json(user);

        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();