import { renommerLesProprietesDunObject } from './helpers.js';
import { API_URL, RESULTATS_PAR_PAGE, KEY } from './config.js';

import { AJAX } from './helpers.js';

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

const creerObjetRecette = function (donnees) {
  // On réecrit l'objet données dans une variable recette un peu lieux formattée
  let recette = donnees.data.recipe;
  let objetRecette = {
    id: recette.id,
    titre: recette.title,
    auteur: recette.publisher,
    url: recette.source_url,
    image: recette.image_url,
    portions: recette.servings,
    tempsPreparation: recette.cooking_time,
    ingredients: recette.ingredients,
    ...(recette.key && { key: recette.key }),
  };

  // On renomme aussi les propriétés des objects contenues dans recette.ingredients. Pour cela on fait appelle à une fonction récursive
  const clefs = {
    quantity: 'quantite',
    unit: 'unite',
  };
  objetRecette.ingredients = renommerLesProprietesDunObject(
    objetRecette.ingredients,
    clefs
  );

  return objetRecette;
};

const persisterFavoris = function () {
  localStorage.setItem('favoris', JSON.stringify(etat.favoris));
};

export const chargerRecette = async function (id) {
  try {
    const donnees = await AJAX(`${API_URL}${id}?key=${KEY}`);

    etat.recette = creerObjetRecette(donnees);

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
    const donnees = await AJAX(`${API_URL}?search=${requete}&key=${KEY}`);

    let recettes = donnees.data.recipes;
    etat.recherche.resultats = recettes.map(recette => {
      return {
        id: recette.id,
        titre: recette.title,
        auteur: recette.publisher,
        image: recette.image_url,
        ...(recette.key && { key: recette.key }),
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

  persisterFavoris();
};

export const supprimerFavori = function (id) {
  // on supprime la recette dans le tableau etat.bookmarks

  const index = etat.favoris.findIndex(element => element.id === id);
  etat.favoris.splice(index, 1);

  // il faut maintenant effacer la marque qui indique que la recette est en favori sur l'icône
  if (id === etat.recette.id) etat.recette.favori = false;

  persisterFavoris();
};

const purgerStockageLocalFavoris = function () {
  localStorage.clear('favoris');
};

const init = function () {
  const storage = localStorage.getItem('favoris');
  if (storage) etat.favoris = JSON.parse(storage);
};

init();

export const uploadRecette = async function (nouvelleRecette) {
  try {
    const ingredients = Object.entries(nouvelleRecette)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const tableauIngredients = ing[1].split(',').map(el => el.trim());

        if (tableauIngredients.length !== 3)
          throw new Error(
            "Le format d'ingrédients spécifié n'est pas correct. Veuillez utiliser le bon format"
          );
        const [quantity, unit, description] = tableauIngredients;
        return {
          quantity: quantity ? Number(quantity) : null,
          unit,
          description,
        };
      });

    const recette = {
      title: nouvelleRecette.title,
      source_url: nouvelleRecette.sourceUrl,
      image_url: nouvelleRecette.image,
      publisher: nouvelleRecette.publisher,
      cooking_time: Number(nouvelleRecette.cookingTime),
      servings: Number(nouvelleRecette.servings),
      ingredients,
    };

    const donnees = await AJAX(`${API_URL}?key=${KEY}`, recette);

    etat.recette = creerObjetRecette(donnees);

    ajouterFavori(etat.recette);
  } catch (erreur) {
    throw erreur;
  }
};

purgerStockageLocalFavoris();
