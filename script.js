var livres = []

function afficher_livres(){
  var lignes_livres = "";
  for(let i = 0; i < livres.length; i++){
    lignes_livres += "<tr>";
      lignes_livres += `<th scope="row">${livres[i].id}</th>`;
      lignes_livres += `<td>${livres[i].titre}</td>`;
      lignes_livres += `<td>${livres[i].auteur}</td>`;
      lignes_livres += `<td><button type="button" class="btn btn-primary" onclick="showEditForm(${livres[i].id})">Editer</button></td>`;
      lignes_livres += `<td><button type="button" class="btn btn-danger" onclick="supprimerLivre(${livres[i].id})">Supprimer</button></td>`;
    lignes_livres += "</tr>";

    document.querySelector("#listeLivres tbody").innerHTML = lignes_livres;

  }
}

function editerLivre(e){
  e.preventDefault();
  console.log("hello");
  let eid = document.getElementById('eid').value;
  let livreEdite = {
    id : eid,
    titre : document.getElementById('etitre').value,
    auteur : document.getElementById('eauteur').value
  }

  livres = livres.map(
    livre => {
      if(livre.id == eid)
        return livreEdite;
      else
        return livre;
    }
  );
  afficher_livres();
  saveData();
  document.getElementById("edit").style.display = "none";
}

function supprimerLivre(id){
  if(window.confirm("Êtes-vous sûre de vouloir supprimer le livre?")){
    livres = livres.filter(livre => livre.id!=id);
    afficher_livres();
    saveData();
  }

}

let showAddForm = ()=>{
  document.getElementById("add").style.display = "block";
}

function showEditForm(id){
  let livreAEditer = livres.find(livre => livre.id==id);
  document.getElementById("edit").style.display = "block";
  document.getElementById("etitre").value = livreAEditer.titre;
  document.getElementById("eauteur").value = livreAEditer.auteur;
  document.getElementById("eid").value = livreAEditer.id;

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
  document.getElementById("btnAjout").addEventListener("click", showAddForm);
  document.getElementById("formEditLivre").addEventListener("submit", editerLivre);
}

window.addEventListener("load", init)


