import * as cheerio from 'cheerio';
import * as fs from 'fs'

async function main() {
  const $ = await cheerio.fromURL('https://www.pokepedia.fr/Liste_des_Pok%C3%A9mon_par_statistiques_de_base_dans_la_premi%C3%A8re_g%C3%A9n%C3%A9ration');

  // 1. Récupérer les entêtes
  const headers = [];
  $('table.tableaustandard.sortable').find('tr th').each((_, el) => {
    headers.push($(el).text().trim());
  });

  // 2. Préparer un tableau pour stocker les résultats
  const pokemons = [];

  // 3. Parcourir les lignes du corps de tableau
  $('table.tableaustandard.sortable tbody tr').each((_, row) => {
    const data = {};
    const columns = $(row).find('td');

    columns.each((j, col) => {
      const header = headers[j];
      const value = $(col).text().trim();
      data[header] = value;
    });

    pokemons.push(data);
  });

  fs.writeFileSync('pokemons.json', JSON.stringify(pokemons, null, 2), 'utf-8')
  console.log('Fichier JSON exporter: pokemons.json')
}

main();
