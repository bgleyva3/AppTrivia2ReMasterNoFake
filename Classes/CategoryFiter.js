

function CategoryFiter(){
    const category = document.getElementById('Category').value;

    const level = document.getElementById('Level').value;

    const type = document.getElementById('Type').value;

    // console.log(category);
    // console.log(level);
    // console.log(type);
    

    const output = [level, category,type];

    return output
}

export default CategoryFiter;