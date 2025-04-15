import * as fs from "fs";
import * as cheerio from 'cheerio';

async function main() {
  const $ = await cheerio.fromURL('https://www.pokepedia.fr/Liste_des_Pok%C3%A9mon_par_statistiques_de_base_dans_la_premi%C3%A8re_g%C3%A9n%C3%A9ration');

  const rows = $('table.tableaustandard.sortable tbody tr');

  const pockemon = [];
  rows.each((index, row) => {
    //récupère les différentes données de chaque éléments
    const columns = $(row).find('td');

    const id = `id: ${$(columns[0]).text().trim()}`; // id du Pokémon
    const nom = $(columns[2]).text().trim(); // Nom du Pokémon
    const pv = $(columns[3]).text().trim();  // PV
    const attaque = $(columns[4]).text().trim(); // Attaque
    const defense = $(columns[5]).text().trim(); // Défense
    const vitesse = $(columns[6]).text().trim(); // Vitesse
    const special = $(columns[7]).text().trim(); // Spécial
    const total = $(columns[8]).text().trim(); // Total

    pockemon.push(
        {
            id,
            nom,
            pv,
            attaque,
            defense,
            vitesse,
            special,
            total
        }
    )
  });

  // Trier le le tableau d'objet suivant le total de point par ordre croissant
  const pokemonsTries = pockemon.sort((a, b) => parseInt(a.total) - parseInt(b.total))

  // Exporter le tableau trié sous le format json
  fs.writeFileSync('pokemons.json', JSON.stringify(pokemonsTries, null, 2), 'utf-8');
  console.log("✅ Fichier JSON exporté : pokemons.json");

}

main();





