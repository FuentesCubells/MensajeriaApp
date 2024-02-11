const mongoose = require('mongoose');
require('../services/dbConection');

describe('Test conexión a la base de datos', () => {
    it('Debe conectar a la base de datos', async () => {
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error de conexión'));
        await new Promise(resolve => db.once('open', resolve));
        expect(db.readyState).toEqual(1); // 1 indica que la conexión está abierta
    });
});
