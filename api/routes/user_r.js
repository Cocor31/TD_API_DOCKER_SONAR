/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const userCtrl = require('../controllers/user_c')

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/*********************************************/
/*** Middleware pour logger dates de requete */
router.use( (req, res, next) => {
    const event = new Date()
    console.log('User Time:', event.toString())
    next()
})


/**********************************/
/*** Routage de la ressource User */

router.get('/', userCtrl.getAllUsers)

router.get('/:id([0-9]+)', userCtrl.getUser)

router.put('', userCtrl.addUser)

router.patch('/:id([0-9]+)', userCtrl.updateUser)
    
router.delete('/:id([0-9]+)', userCtrl.deleteUser)

module.exports = router