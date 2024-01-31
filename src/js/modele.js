import { renommerLesProprietesDunObject } from './helpers.js';
import { API_URL } from './config.js';
import { RESULTATS_PAR_PAGE } from './config.js';
import { recupererJSON } from './helpers.js';

export const etat = {
  recette: {},
  recherche: {
    requete: '',
    resultats: [],
    page: 1,
    resultatsParPage: RESULTATS_PAR_PAGE,
  },
  favoris: [],
};

export const chargerRecette = async function (id) {
  try {
    const donnees = await recupererJSON(`${API_URL}${id}`);
    // On réecrit l'objet données dans une variable recette un peu lieux formattée
    let recette = donnees.data.recipe;
    etat.recette = {
      id: recette.id,
      titre: recette.title,
      auteur: recette.publisher,
      url: recette.source_url,
      image: recette.image_url,
      portions: recette.servings,
      tempsPreparation: recette.cooking_time,
      ingredients: recette.ingredients,
    };

    // On renomme aussi les propriétés des objects contenues dans recette.ingredients. Pour cela on fait appelle à une fonction récursive
    const clefs = {
      quantity: 'quantite',
      unit: 'unite',
    };
    etat.recette.ingredients = renommerLesProprietesDunObject(
      etat.recette.ingredients,
      clefs
    );

    if (etat.favoris.some(favori => favori.id === id)) {
      etat.recette.favori = true;
    } else {
      etat.recette.favori = false;
    }
  } catch (erreur) {
    throw erreur;
  }
};

export const chargerResultatsRecherche = async function (requete) {
  try {
    const donnees = await recupererJSON(`${API_URL}?search=${requete}`);

    let recettes = donnees.data.recipes;
    etat.recherche.resultats = recettes.map(recette => {
      return {
        id: recette.id,
        titre: recette.title,
        auteur: recette.publisher,
        image: recette.image_url,
      };
    });

    etat.recherche.page = 1;
  } catch (erreur) {
    throw erreur;
  }
};

export const recupererResultatsRechercheParPage = function (
  page = etat.recherche.page
) {
  etat.recherche.page = page;
  const debut = (page - 1) * etat.recherche.resultatsParPage;
  const fin = page * etat.recherche.resultatsParPage;

  return etat.recherche.resultats.slice(debut, fin);
};

export const mettreAJourLesPortions = function (nouvellesPortions) {
  etat.recette.ingredients.forEach(ing => {
    ing.quantite = (ing.quantite * nouvellesPortions) / etat.recette.portions;
  });

  etat.recette.portions = nouvellesPortions;
};

export const ajouterFavori = function (recette) {
  // on ajoute la recette dans le tableau etat.bookmarks
  etat.favoris.push(recette);

  // il faut aussi marquer la recette en tant que favori sur l'icône
  if (recette.id === etat.recette.id) etat.recette.favori = true;
};

export const supprimerFavori = function (id) {
  // on supprime la recette dans le tableau etat.bookmarks

  const index = etat.favoris.findIndex(element => element.id === id);
  etat.favoris.splice(index, 1);

  // il faut maintenant effacer la marque qui indique que la recette est en favori sur l'icône
  if (id === etat.recette.id) etat.recette.favori = false;
};
