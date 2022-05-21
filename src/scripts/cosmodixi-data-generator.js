Promise.all([
  import('cheerio'),
  import('node-fetch'),
  import('html-to-text'),
  import('fs'),
]).then(async (deps) => {
  const cheerio = deps[0].default,
    fetch = deps[1].default,
    convert = deps[2].convert,
    fs = deps[3]

  const messier = []

  const htmlDocument = await fetch(
    'https://www.cosmodixi.fr/generalites/objets-messier.php'
  ).then((r) => r.text())

  const $ = cheerio.load(htmlDocument)
  $('.ligne')
    .toArray()
    .forEach((ligne) => {
      const $ligne = cheerio.load(ligne)
      const number = parseInt($ligne('td:nth-child(1)').text(), 10)
      let link = $ligne('tr')
        .attr('onclick')
        .replace("document.location.href='../", '')
      link = link.substring(0, link.length - 1)
      messier.push({
        number,
        ngc: parseInt($ligne('td:nth-child(2)').text(), 10),
        magnitude: parseFloat(
          $ligne('td:nth-child(3)').text().replace(',', '.')
        ),
        constellation: $ligne('td:nth-child(4)').text(),
        firstObservation: {
          by: $ligne('td:nth-child(5)').text(),
          at: parseInt($ligne('td:nth-child(6)').text(), 10),
        },
        type: $ligne('td:nth-child(7)').text(),
        commonName: $ligne('td:nth-child(8)').text() || null,
        link,
      })
    })

  for (const m of messier) {
    const htmlPage = await fetch(`https://www.cosmodixi.fr/${m.link}`).then(
      (r) => r.text()
    )

    console.log('⚡️ ' + m.link)
    delete m.cosmodixiLink
    const $anchor = cheerio
      .load(htmlPage)(`#m-${m.number}`)
      .parent()
      .parent()
      .next('tr')
      .next('tr')
      .next('tr')
    m.archive = convert($anchor.find('.archive').text())
    m.image = `https://www.cosmodixi.fr/ciel/${$anchor.find('img').attr('src')}`

    const $p = $anchor.find('figure').next('p')
    $p.find('.tooltip-content').remove()
    m.description = $p
      .text()
      .replaceAll(/\[.+\]/gi, ' ')
      .replaceAll(/Glossaire  /gi, '')
    await new Promise((resolve) => setTimeout(resolve, 400))
  }

  //console.log(JSON.stringify(messier));
  fs.writeFile('./public/ressources/cosmodixi-catalogue-messier.json', JSON.stringify(messier), (err) => console.log(err));
})
