import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import seedRoles from './utils/seedRoles.js';
import seedUsers from './utils/seedUsers.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(express.json());


/* =========================
   FRONTEND
========================= */

app.get('/signIn', (req, res) => {
    res.render('signIn');
});

app.get('/signUp', (req, res) => {
    res.render('signUp');
});

app.get('/dashboard-user', (req, res) => {
    res.render('dashboard-user');
});

app.get('/dashboard-admin', (req, res) => {
    res.render('dashboard-admin');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/403', (req, res) => {
    res.status(403).render('403');
});


/* =========================
   API
========================= */

app.use('/api/auth', authRoutes);

app.use('/api/users', usersRoutes);


app.get('/health', (req, res) => {
    res.json({
        status: 'OK'
    });
});


/* =========================
   ERROR 404
========================= */

app.use((req, res) => {

    // Si es una ruta de API, devolvemos JSON
    if (req.path.startsWith('/api/')) {

        return res.status(404).json({
            message: 'Ruta no encontrada'
        });
    }

    // Para páginas web, mostramos la página 404
    res.status(404).render('404');
});


/* =========================
   ERROR GENERAL
========================= */

app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.status || 500).json({
        message: err.message || 'Internal server error'
    });
});


/* =========================
   SERVIDOR
========================= */

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)

    .then(async () => {

        console.log('MongoDB conectado');

        await seedRoles();

        await seedUsers();

        app.listen(PORT, () => {

            console.log(
                `Servidor ejecutándose en http://localhost:${PORT}`
            );

        });

    })

    .catch((error) => {

        console.error(
            'Error conectando a MongoDB:',
            error
        );

        process.exit(1);

    });