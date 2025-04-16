import * as fs from "fs";
import * as cheerio from 'cheerio';

async function main() {
  const $ = await cheerio.fromURL('https://www.pokepedia.fr/Liste_des_Pok%C3%A9mon_par_statistiques_de_base_dans_la_premi%C3%A8re_g%C3%A9n%C3%A9ration');

  const headers = $('table.tableaustandard.sortable th');
  const rows = $('table.tableaustandard.sortable tbody tr');

  const pokemons = [];

  rows.each((index, row) => {
    const columns = $(row).find('td');
    const pokemon = {};
    
    headers.each((key, name) => {
      const key0 = key
      const header = $(name).text().trim();
      pokemon[header] = $(columns[key0]).text().trim();
    });

    pokemons.push(pokemon);
  });

  // Trier selon "Total" avec majuscule
  const pokemonsTries = pokemons.sort((a, b) => parseInt(a["Total"]) - parseInt(b["Total"]));

  // Export JSON
  fs.writeFileSync('pokemons.json', JSON.stringify(pokemonsTries, null, 2), 'utf-8');
  console.log("✅ Fichier JSON exporté : pokemons.json");
}

main();
