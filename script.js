let addItem = document.getElementById("add-item");
let confirmItem = document.getElementById("confirm-item");
let list = document.getElementById("list");
let numberItems = document.getElementById("number-items");
let draggables = document.getElementsByClassName("draggable");
let container = document.querySelector(".container");
let counter = 0;
const filterOptions = document.getElementsByClassName("filter-items")[0];
const categoryOptions = document.getElementsByClassName("choose-category")[0];


// Ajout des évents listener
confirmItem.addEventListener("click", addNewItem);

list.addEventListener('click', deleteCheck);

filterOptions.addEventListener("click", filterItems);

container.addEventListener("dragover", e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    console.log(afterElement);
    const draggable = document.querySelector(".dragging");
    container.appendChild(draggable);
}); 


// Fonction qui me fait tout buger, elle n'est pas fini car ça ne fonctionnait deja pas bien 
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset){
            return { offset: offset, element: child };
        }
        else{
            return closest;
        }
    }, { offset: Number.POSITIVE_INFINITY }).element;
}


// Ajout d'une nouvelle tâche
function addNewItem(){
    if (addItem.value != "" ){
        // Conteneur général de tout les prochains éléments
        let item = document.createElement("div");
        item.classList.add("item");
        item.classList.add(categoryOptions.value);
        item.classList.add("draggable");
        item.addEventListener("dragstart", dragStart);
        item.addEventListener("dragend", dragEnd);

        // Texte de la tâche à faire
        let liContent = document.createElement("p");
        liContent.textContent = addItem.value;
        liContent.classList.add("li-content");
        
        // Conteneur du texte de la tâche
        let itemLi = document.createElement("li");
        itemLi.classList.add("item-li");
        itemLi.appendChild(liContent);
        item.appendChild(itemLi);

        // Conteneur des deux boutons d'actions
        let actionDiv = document.createElement("div");
        actionDiv.classList.add("action-div");

        // Bouton permettant de valider ou non une tâche
        let statusBtn = document.createElement("button");
        statusBtn.innerHTML = '<i class="fas fa-check"></i>';
        statusBtn.classList.add("status");
        actionDiv.appendChild(statusBtn);

        // Bouton permettant de supprimer une tâche
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add("delete");
        actionDiv.appendChild(deleteBtn);

        item.appendChild(actionDiv);
        list.appendChild(item);
        updateCounter("more");
    }
}

// Supprimer ou valider une tâche
function deleteCheck(e){
    const element = e.target;
    const item = element.parentElement.parentElement;
    const itemLi = item.getElementsByClassName("li-content")[0];
    
    //DELETE ITEM
    if (element.classList[0] == "delete"){
        
        item.classList.add("slide-out");
        item.addEventListener("animationend", () => {
            item.remove();
        })
    }

    if (element.classList[0] == "delete" && !(item.classList.contains("done")) ){
        updateCounter("less");
    }

    //COMPLETE ITEM
    if (element.classList[0] == "status"){
        itemLi.classList.toggle("done-animation");
        item.classList.toggle("done");
        element.classList.toggle("done-btn");
    }

    if (element.classList[0] == "status" && !(item.classList.contains("done")) ){
        updateCounter("more");
    }
    else if (element.classList[0] == "status" && item.classList.contains("done") ){
        updateCounter("less");
    }
    
}

// Fonction mettant à jour le compteur et l'affichage HTML
// parametre -> "more", on incrémente / "less", on décrémente
function updateCounter(updater){
    let text;
    if (updater == "more"){
        counter++;
    }
    else if (updater == "less"){
        counter--;
    }

    if (counter == 1){
        text = counter + " task in progress";
    }
    else if (counter > 1){
        text = counter + " tasks in progress";
    }
    else{
        text = "No tasks in progress";
    }

    numberItems.textContent = text;
}


function dragStart(){
    this.classList.add("dragging");
}

function dragEnd(){
    this.classList.remove("dragging");
}

// Fonction permettant d'afficher uniquement certaine type de tâches
function filterItems(e){
    const items = list.childNodes;
    items.forEach(function(item){
        switch(e.target.value){
            case "all":
                item.style.display = "flex";
                break;
            case "done":
                if (item.classList.contains("done")){
                    item.style.display = "flex";
                }
                else{
                    item.style.display = "none";
                }
                break;
            case "inprogress":
                if (!(item.classList.contains("done"))){
                    item.style.display = "flex";
                }
                else{
                    item.style.display = "none";
                }
                break;
            case "pro":
                if (item.classList.contains("professional")){
                    item.style.display = "flex";
                }
                else{
                    item.style.display = "none";
                }
                break;
            case "pers":
                if (item.classList.contains("personal")){
                    item.style.display = "flex";
                }
                else{
                    item.style.display = "none";
                }
                break;
            case "oth":
                if (item.classList.contains("other")){
                    item.style.display = "flex";
                }
                else{
                    item.style.display = "none";
                }
                break;
        }
    });
}