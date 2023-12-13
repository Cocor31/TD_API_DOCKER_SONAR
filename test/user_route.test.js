const request = require('supertest')
const DB = require('../api/db.config')
const app = require('../api/app')

let userId

describe('USER ROUTER', () => {

    afterAll(async () => {
        DB.sequelize.close()
    })

    describe('TRY PUT', () => {
        it('Should return 400 /=> Missing params', async () => {
            const response = await request(app)
                .put('/users')
                .send({
                    nom: 'marcel'
                    // prenom: 'roger'
                })
            expect(response.status).toBe(400)
        })

        it('Should return 201 /=> New user', async () => {
            const response = await request(app)
                .put('/users')
                .send({
                    nom: 'marcel',
                    prenom: 'roger'
                })
            expect(response.status).toBe(201)
            userId = response.body.data.id
        })
    })

    describe('TRY GET', () => {
        it('Should return 200 /=> Get user', async () => {
            const response = await request(app).get(`/users/${userId}`)
            expect(response.status).toBe(200)
        })
    })

    describe('TRY PATCH', () => {
        it('Should return 404 /=> Modify bad user', async () => {
            const response = await request(app)
                .patch('/users/100000')
                .send({
                    nom: 'marcelllllll'
                })
            expect(response.status).toBe(404)
        })

        it('Should return 200 /=> Modify user', async () => {
            const response = await request(app)
                .patch(`/users/${userId}`)
                .send({
                    nom: 'marcelllllll'
                })
            expect(response.status).toBe(200)
        })
    })

    describe('TRY DELETE', () => {
        it('Should return 204', async () => {
            const response = await request(app)
                .delete(`/users/${userId}`)
            expect(response.status).toBe(204)
        })
    })
})