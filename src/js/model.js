import { renommerLesProprietesDunObject } from './helpers.js';
import { API_URL } from './config.js';
import { recupererJSON } from './helpers.js';

export const state = {
  recette: {},
};

export const chargerRecette = async function (id) {
  try {
    const donnees = await recupererJSON(`${API_URL}${id}`);
    // On réecrit l'objet données dans une variable recette un peu lieux formattée
    let recette = donnees.data.recipe;
    state.recette = {
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
    state.recette.ingredients = renommerLesProprietesDunObject(
      state.recette.ingredients,
      clefs
    );
  } catch (erreur) {
    throw erreur;
  }
};

export const chargerResultatsRecherche = async function (requete) {
  try {
    const donnees = await recupererJSON(`${API_URL}?search=${requete}`);
    console.log(donnees);
  } catch (erreur) {
    throw erreur;
  }
};
