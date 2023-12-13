const DB = require('../api/db.config')

DB.sequelize.sync({ alter: true })
    .then(console.log("Synchronisation des tables"))
    .catch(e => console.log('Database Sync Error', e))
