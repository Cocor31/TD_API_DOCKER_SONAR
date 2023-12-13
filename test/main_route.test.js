const request = require('supertest')
const DB = require('../api/db.config')
const app = require('../api/app')


describe('MAIN ROUTER', () => {

    afterAll(async () => {
        await DB.sequelize.close()
    })

    describe('TRY GET', () => {
        it('Should return 200', async () => {
            const response = await request(app).get('/')
            expect(response.status).toBe(200)
        })

        it('Should return 501', async () => {
            const response = await request(app).get('/fdsgsrtfghtrsvrt')
            expect(response.status).toBe(501)
        })
    })

    describe('TRY PUT', () => {
        it('Should return 501', async () => {
            const response = await request(app).put('/rezrzer')
            expect(response.status).toBe(501)
        })
    })
})