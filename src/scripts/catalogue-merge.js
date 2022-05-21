Promise.all([import('fs'), import('node-fetch')]).then(async (deps) => {
  const fs = deps[0],
    fetch = deps[1].default

  let dataCosmodixi = JSON.parse(
    fs.readFileSync(
      './public/ressources/cosmodixi-catalogue-messier.json',
      'utf8'
    )
  )
  const dataMessier = JSON.parse(
    fs.readFileSync('./public/ressources/catalogue-de-messier.json', 'utf8')
  )

  for (const data of dataMessier) {
    const number = parseInt(data.fields.messier.replace('M', ''), 10)
    console.log(number, data)
    dataCosmodixi = dataCosmodixi
      .filter((d) => d.number === number)
      .map((d) => ({
        ...d,
        distance: data.fields.distance,
        const: data.fields.const,
        dec: data.fields.dec,
        ra: data.fields.ra,
        dimension: data.fields.dimension,
        saison: data.fields.saison
          .substr(data.fields.saison.indexOf('/') + 1)
          .trim(),
      }))
      .concat(dataCosmodixi.filter((d) => d.number !== number))

    /*await fetch(dataCosmodixi.find((d) => d.number === number).image)
    .then((res) =>
      res.body.pipe(fs.createWriteStream(`./public/messier/images/${number}.jpg`))
    )
    await new Promise((resolve) => setTimeout(resolve,400));*/
    
  }

  fs.writeFile(
    './public/messier/messier-book-all.json',
    JSON.stringify(dataCosmodixi),
    (err) => console.log(err)
  )
})
