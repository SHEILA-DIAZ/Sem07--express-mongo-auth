import AuthService from '../services/AuthService.js';

class AuthController {

    async signUp(req, res, next) {
        try {

            const {
                email,
                password,
                name,
                lastName,
                phoneNumber,
                birthdate,
                url_profile,
                adress
            } = req.body;

            if (
                !email ||
                !password ||
                !name ||
                !lastName ||
                !phoneNumber ||
                !birthdate
            ) {
                return res.status(400).json({
                    message: 'Faltan campos obligatorios'
                });
            }

            const user = await AuthService.signUp({
                email,
                password,
                name,
                lastName,
                phoneNumber,
                birthdate,
                url_profile,
                adress
            });

            res.status(201).json(user);

        } catch (error) {
            next(error);
        }
    }

    async signIn(req, res, next) {
        try {

            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Email y password son obligatorios'
                });
            }

            const result = await AuthService.signIn({
                email,
                password
            });

            res.json(result);

        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();