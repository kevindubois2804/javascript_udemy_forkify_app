import { renommerLesProprietesDunObject } from './utils';

export const state = {
  recette: {},
};

export const chargerRecette = async function (id) {
  try {
    const reponse = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    // on convertit la réponse au format json
    const donnees = await reponse.json();

    if (!reponse.ok) throw new Error(`${donnees.message} (${reponse.status})`);

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
    alert(erreur);
  }
};
