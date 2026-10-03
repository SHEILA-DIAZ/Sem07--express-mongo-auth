import bcrypt from 'bcrypt';

import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

export default async function seedUsers() {

    const existingAdmin = await userRepository.findByEmail(
        'admin@example.com'
    );

    if (existingAdmin) {
        console.log('Usuario admin ya existe');
        return;
    }

    const adminRole = await roleRepository.findByName('admin');

    if (!adminRole) {
        throw new Error('El rol admin no existe');
    }

    const saltRounds = parseInt(
        process.env.BCRYPT_SALT_ROUNDS ?? '10',
        10
    );

    const hashedPassword = await bcrypt.hash(
        'Admin123@',
        saltRounds
    );

    await userRepository.create({
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Administrador',
        lastName: 'Sistema',
        phoneNumber: '999999999',
        birthdate: new Date('2000-01-01'),
        url_profile: '',
        adress: 'Lima, Perú',
        roles: [adminRole._id]
    });

    console.log('Usuario admin creado correctamente');
}