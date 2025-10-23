let allRecipes = [];

async function loadRecipes() {
    try {
        const response = await fetch('recipe.json');
        if (!response.ok) throw new Error('Failed to load recipes');
        allRecipes = await response.json();

        allRecipes.forEach(recipe => {
            $('#recipeSelect').append(
                $('<option>').val(recipe.name).text(recipe.name)
            );
        });
    } catch (err) {
        $('#error').text(err.message);
    }
}

function displayRecipe(name) {
    $('#error').empty();
    $('#recipe').empty();

    const recipe = allRecipes.find(r => r.name === name);
    if (!recipe) {
        $('#error').text('Recipe not found.');
        return;
    }

    const ingredientsList = $('<ul>');
    recipe.ingredients.forEach(item => {
        ingredientsList.append($('<li>').text(item));
    });

    $('#recipe').append(
        $('<h3>').text(recipe.name),
        $('<div>').text('Ingredients:'),
        ingredientsList,
        $('<img>').attr('src', recipe.image).attr('alt', recipe.name)
    );
}

$(document).ready(() => {
    loadRecipes();

    $('#recipeSelect').change(function () {
        const selectedName = $(this).val();
        if (selectedName) {
            displayRecipe(selectedName);
        } else {
            $('#recipe').empty();
        }
    });
});