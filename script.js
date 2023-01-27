var livres = []

function afficher_livres(){
  var lignes_livres = "";
  for(let i = 0; i < livres.length; i++){
    lignes_livres += "<tr>";
      lignes_livres += `<th scope="row">${livres[i].id}</th>`;
      lignes_livres += `<td>${livres[i].titre}</td>`;
      lignes_livres += `<td>${livres[i].auteur}</td>`;
      lignes_livres += `<td><button type="button" class="btn btn-primary">Editer</button></td>`;
      lignes_livres += `<td><button type="button" class="btn btn-danger">Supprimer</button></td>`;
    lignes_livres += "</tr>";

    document.querySelector("#listeLivres tbody").innerHTML = lignes_livres;

  }
}

function showAddForm(){
  document.getElementById("add").style.display = "block";
}

function ajoutLivre(){
  var nouveauLivre = {
    id : livres[livres.length-1].id + 1,
    titre : document.getElementById('titre').value,
    auteur : document.getElementById('auteur').value
  }
  livres.push(nouveauLivre);
  afficher_livres();
  document.getElementById("add").style.display = "none";
  saveData();
}

function saveData(){
  localStorage.setItem('livres', JSON.stringify(livres));
}

function getData(){
  if(localStorage.getItem('livres')){
    livres = JSON.parse(localStorage.getItem('livres'));
  }
  else{
    livres = [{id : 1, titre : "Titre 1", auteur : "Auteur 1"}]
  }
}

function init(){
  getData();
  afficher_livres();
  document.getElementById("btnAjout").addEventListener("click", showAddForm)
}

window.addEventListener("load", init)


