const boom = require('boom')
const axios = require('axios')

const key = process.env.RIOT_LOL_API_KEY

exports.mainMenu = async (req, reply) => {
  const status = await axios
    .all([
      axios.get(
        `https://euw1.api.riotgames.com/lol/status/v3/shard-data?api_key=${key}`
      ),
      axios.get(
        `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${key}`
      )
    ])
    .then(responseArr => [
      responseArr[0].data.services,
      responseArr[1].data.freeChampionIds
    ])

    .catch(error => {
      throw boom.boomify(error)
    })
  reply.send(status)
}

exports.summoner = async (req, reply) => {
  let name = 'Waerυ'
  if (req.query.name !== undefined && req.query.name !== '') {
    name = req.query.name
  }
  try {
    const { data } = await await axios.get(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
        name
      )}?api_key=${key}`
    )

    return data
  } catch (error) {
    throw boom.boomify(error)
  }
}

exports.rank = async (req, reply) => {
  console.log(req.query)
  const id = req.query.id
  return await axios
    .get(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${key}`
    )
    .then(val => val.data)
}

exports.mastery = async (req, reply) => {
  const id = req.query.id
  const { data } = await axios.get(
    `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${key}`
  )
  return data
}

exports.matches = async (request, reply) => {
  const id = request.query.id
  const s = request.query.s
  const e = request.query.e

  const { data } = await axios.get(
    `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?endIndex=${e}&beginIndex=${s}&api_key=${key}`
  )
  const matchesId = data.matches.map(owo => owo.gameId)
  const getmatshu = matchesId.map(async (value, i) => {
    return await axios
      .get(
        `https://euw1.api.riotgames.com/lol/match/v4/matches/${matchesId[i]}?api_key=${key}`
      )
      .then(ewe => ewe.data)
  })

  await Promise.all(getmatshu).then(val => reply.send(val))
}
