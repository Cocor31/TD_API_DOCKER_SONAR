const DB = require('../api/db.config')

async () => {
    await DB.sequelize.sync({ alter: true })
}

