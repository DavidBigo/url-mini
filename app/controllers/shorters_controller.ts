import type { HttpContext } from '@adonisjs/core/http'

interface LinkMapping {
  long: string
  short: string
}
let links: LinkMapping[] = []

export default class ShortersController {
  // Affiche la page d'accueil
  async create({ view }: HttpContext) {
    return view.render('pages/home')
  }

  // Génére un lien raccourci
  async store({ request, view }: HttpContext) {
    const linkSubmited = request.input('link')
    const hostName = request.host()

    const alphaNumeric = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let shortCode = ''
    for (let i = 0; i < 5; i++) {
      const random = Math.floor(Math.random() * alphaNumeric.length)
      shortCode += alphaNumeric[random]
    }

    links.push({ short: shortCode, long: linkSubmited })

    const shortLink = `http://${hostName}/${shortCode}`
    return view.render('pages/detail', { shortLink })
  }


  async redirect({ params, response }: HttpContext) {
    const shortCode = params.shortCode
    const findLongLink = links.find((el) => el.short === shortCode)

    if (!findLongLink) {
      return response.status(404).send('Lien invalide ou expiré')
    }

    return response.redirect(findLongLink.long)
  }
}
