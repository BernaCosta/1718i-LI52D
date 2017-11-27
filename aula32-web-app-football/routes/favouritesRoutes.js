const userService = require('./../services/userService')
const express = require('express')
const router = express.Router()
module.exports = router

const favourites = [
    {
        leagueId: 445,
        caption: 'Premier League 2017/18'
    },
    {
        leagueId: 455,
        caption: 'La Liga 2017/18'
    },
]

router.use((req, res, next) => {
    // res.locals.favourites = favourites
    next()
})

router.post('/favourites', (req, res, next) => {
    if(!req.user) return res.redirect('/login')
    req.user.leagues.push({
        id: req.body.league,
        caption: req.body.caption
    })
    userService.save(req.user, (err) => {
        if(err) return next(err)
        res.redirect('/leagues')
    })
})
