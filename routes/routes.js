const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Conexión a la base de datos SQLite
const db = new sqlite3.Database('./CONSULTORIO.s3db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Rutas para pacientes
router.get('/pacientes', (req, res) => {
    const sql = `SELECT * FROM PACIENTES`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ data: rows });
    });
});

router.post('/pacientes', (req, res) => {
    const { nombre, telefono, direccion, email, edad, genero, nss } = req.body;
    const sql = `
        INSERT INTO PACIENTES (NOMBRE, TELEFONO, DIRECCION, EMAIL, EDAD, GENERO, NSS)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [nombre, telefono, direccion, email, edad, genero, nss], function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Paciente agregado', id: this.lastID });
    });
});

router.get('/pacientes/buscar/:id', (req, res) => {
    const pacienteId = req.params.id;
    const sql = `SELECT * FROM PACIENTES WHERE PKPACIENTE = ?`;
    db.get(sql, [pacienteId], (err, row) => {
        if (err) {
            console.error('Error en la búsqueda:', err);
            return res.status(500).json({ error: 'Error en la búsqueda' });
        }
        if (row) {
            res.json({ data: [row] });
        } else {
            res.json({ data: [] });
        }
    });
});

router.put('/pacientes/:id', (req, res) => {
    const pacienteId = req.params.id;
    const { nombre, telefono, direccion, email, edad, genero, nss } = req.body;

    const sql = `
        UPDATE PACIENTES
        SET NOMBRE = ?, TELEFONO = ?, DIRECCION = ?, EMAIL = ?, EDAD = ?, GENERO = ?, NSS = ?
        WHERE PKPACIENTE = ?
    `;
    db.run(sql, [nombre, telefono, direccion, email, edad, genero, nss, pacienteId], function (err) {
        if (err) {
            console.error('Error al actualizar el paciente:', err);
            res.status(500).json({ message: 'Error al actualizar el paciente' });
        } else {
            res.json({ message: 'Paciente actualizado' });
        }
    });
});

router.delete('/pacientes/:id', (req, res) => {
    const pacienteId = req.params.id;
    db.run('DELETE FROM PACIENTES WHERE PKPACIENTE = ?', [pacienteId], (err) => {
        if (err) {
            console.error('Error al eliminar el paciente:', err);
            res.status(500).json({ message: 'Error al eliminar el paciente' });
        } else {
            res.json({ message: 'Paciente eliminado' });
        }
    });
});

// Rutas para terapeutas
router.get('/terapeutas', (req, res) => {
    const sql = `SELECT * FROM TERAPEUTAS`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ data: rows });
    });
});

router.post('/terapeutas', (req, res) => {
    const { nombre, telefono, direccion, email, edad, genero, especialidad } = req.body;
    const sql = `
        INSERT INTO TERAPEUTAS (NOMBRE, TELEFONO, DIRECCION, EMAIL, EDAD, GENERO, ESPECIALIDAD)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [nombre, telefono, direccion, email, edad, genero, especialidad], function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Terapeuta agregado', id: this.lastID });
    });
});

router.get('/terapeutas/buscar/:id', (req, res) => {
    const terapeutaId = req.params.id;
    const sql = `SELECT * FROM TERAPEUTAS WHERE PKTERAPEUTAS = ?`;
    db.get(sql, [terapeutaId], (err, row) => {
        if (err) {
            console.error('Error en la búsqueda:', err);
            return res.status(500).json({ error: 'Error en la búsqueda' });
        }
        if (row) {
            res.json({ data: [row] });
        } else {
            res.json({ data: [] });
        }
    });
});

router.put('/terapeutas/:id', (req, res) => {
    const terapeutaId = req.params.id;
    const { nombre, telefono, direccion, email, edad, genero, especialidad } = req.body;
    const sql = `
        UPDATE TERAPEUTAS
        SET NOMBRE = ?, TELEFONO = ?, DIRECCION = ?, EMAIL = ?, EDAD = ?, GENERO = ?, ESPECIALIDAD = ?
        WHERE PKTERAPEUTAS = ?
    `;
    db.run(sql, [nombre, telefono, direccion, email, edad, genero, especialidad, terapeutaId], function (err) {
        if (err) {
            console.error('Error al actualizar el terapeuta:', err);
            res.status(500).json({ message: 'Error al actualizar el terapeuta' });
        } else {
            res.json({ message: 'Terapeuta actualizado' });
        }
    });
});

router.delete('/terapeutas/:id', (req, res) => {
    const terapeutaId = req.params.id;
    db.run('DELETE FROM TERAPEUTAS WHERE PKTERAPEUTAS = ?', [terapeutaId], (err) => {
        if (err) {
            console.error('Error al eliminar el terapeuta:', err);
            res.status(500).json({ message: 'Error al eliminar el terapeuta' });
        } else {
            res.json({ message: 'Terapeuta eliminado' });
        }
    });
});

// Rutas para citas
router.get('/citas', (req, res) => {
    const sql = `SELECT * FROM CITAS`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ data: rows });
    });
});

router.post('/citas', (req, res) => {
    const { dia, hora, paciente, terapeuta, motivocita } = req.body;
    const sql = `
        INSERT INTO CITAS (DIA, HORA, PACIENTE, TERAPEUTA, MOTIVOCITA)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.run(sql, [dia, hora, paciente, terapeuta, motivocita], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Cita agregada', id: this.lastID });
    });
});

router.get('/citas/buscar/:id', (req, res) => {
    const citaId = req.params.id;
    const sql = `SELECT * FROM CITAS WHERE PKCITAS = ?`;
    db.get(sql, [citaId], (err, row) => {
        if (err) {
            console.error('Error en la búsqueda:', err);
            return res.status(500).json({ error: 'Error en la búsqueda' });
        }
        if (row) {
            res.json({ data: [row] });
        } else {
            res.json({ data: [] });
        }
    });
});

router.put('/citas/:id', (req, res) => {
    const citaId = req.params.id;
    const { dia, hora, paciente, terapeuta, motivo } = req.body;

    const sql = `
        UPDATE CITAS
        SET DIA = ?, HORA = ?, PACIENTE = ?, TERAPEUTA = ?, MOTIVOCITA = ?
        WHERE PKCITAS = ?
    `;
    db.run(sql, [dia, hora, paciente, terapeuta, motivo, citaId], function (err) {
        if (err) {
            console.error('Error al actualizar la cita:', err);
            res.status(500).json({ message: 'Error al actualizar la cita' });
        } else {
            res.json({ message: 'Cita actualizada' });
        }
    });
});

router.delete('/citas/:id', (req, res) => {
    const citaId = req.params.id;
    db.run('DELETE FROM CITAS WHERE PKCITAS = ?', [citaId], (err) => {
        if (err) {
            console.error('Error al eliminar la cita:', err);
            res.status(500).json({ message: 'Error al eliminar la cita' });
        } else {
            res.json({ message: 'Cita eliminada correctamente' });
        }
    });
});


// Ruta para obtener pacientes para citas
router.get('/api/pacientes', (req, res) => {
    const query = 'SELECT NOMBRE FROM PACIENTES'; 
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener pacientes:', err);
            return res.status(500).json({ error: 'Hubo un problema al obtener los pacientes' });
        }
        console.log('Datos de pacientes:', rows);
        res.json(rows); 
    });
});

// Ruta para obtener terapeutas para citas
router.get('/api/terapeutas', (req, res) => {
    const query = 'SELECT NOMBRE FROM TERAPEUTAS';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener terapeutas:', err);
            return res.status(500).json({ error: 'Hubo un problema al obtener los terapeutas' });
        }
        console.log('Datos de terapeutas:', rows);
        res.json(rows); 
    });
});

module.exports = router;