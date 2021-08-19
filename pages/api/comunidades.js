import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(request, response) {

  if (request.method === 'POST') {

    const TOKEN = '28d31116ae333d7162349a63cbf057'
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
      itemType: "971614",
      ...request.body
      // title: "Comunidade de teste",
      // imageUrl: "https://github.com/edsonPrimo.png",
      // creatorSlug: "edsonPrimo"
    })
    console.log(registroCriado)
    response.json({
      dados: 'Algum dado qualquer',
      registroCriado: registroCriado
    })
    return;
  }
  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem'
  })
}