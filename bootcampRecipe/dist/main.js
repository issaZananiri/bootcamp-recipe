const render = new Renderer()

const fetchRecipe = function(){
    input = $('#ingredient').val()
    console.log(input)
    $.get(`/recipes/${input}`, function (realData){
        render.renderRecipes(realData)
    })
}
const myfunction= function(){
    alert((this).ingredients[0])}