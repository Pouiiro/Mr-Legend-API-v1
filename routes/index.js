const mrlegend = require('../controllers/mrlegendcontroller')

const routes = [
  {
    method: 'GET',
    url: '/status',
    handler: mrlegend.mainMenu
  },
  {
    method: 'GET',
    url: '/summoner',
    handler: mrlegend.summoner
  },
  {
    method: 'GET',
    url: '/rank',
    handler: mrlegend.rank
  },
  {
    method: 'GET',
    url: '/mastery',
    handler: mrlegend.mastery
  },
  {
    method: 'GET',
    url: '/matches',
    handler: mrlegend.matches
  }
]

module.exports = routes
