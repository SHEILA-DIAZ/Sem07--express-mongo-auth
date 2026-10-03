import userRepository from '../repositories/UserRepository.js';

function calcularEdad(birthdate) {
    const hoy = new Date();
    const nacimiento = new Date(birthdate);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (
        mes < 0 ||
        (mes === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
        edad--;
    }

    return edad;
}

class UserService {

    async getAll() {
        const users = await userRepository.getAll();

        return users.map(user => ({
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            birthdate: user.birthdate,
            age: calcularEdad(user.birthdate),
            url_profile: user.url_profile,
            adress: user.adress,
            roles: user.roles.map(role => role.name),
            createdAt: user.createdAt
        }));
    }

    async getById(id) {
        const user = await userRepository.findById(id);

        if (!user) {
            const error = new Error('Usuario no encontrado');
            error.status = 404;
            throw error;
        }

        return {
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            birthdate: user.birthdate,
            age: calcularEdad(user.birthdate),
            url_profile: user.url_profile,
            adress: user.adress,
            roles: user.roles.map(role => role.name),
            createdAt: user.createdAt
        };
    }

    async update(id, data) {

        const user = await userRepository.findById(id);

        if (!user) {
            const error = new Error('Usuario no encontrado');
            error.status = 404;
            throw error;
        }

        const updatedUser = await userRepository.update(id, data);

        return {
            id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            lastName: updatedUser.lastName,
            phoneNumber: updatedUser.phoneNumber,
            birthdate: updatedUser.birthdate,
            age: calcularEdad(updatedUser.birthdate),
            url_profile: updatedUser.url_profile,
            adress: updatedUser.adress,
            roles: updatedUser.roles.map(role => role.name),
            createdAt: updatedUser.createdAt
        };
    }
}

export default new UserService();