<?php 

$bdd = new PDO('mysql:host=localhost;dbname=todolist;charset=utf8', 'root', 'root');

if ($_GET['action'] == "ajouter") 
{
	$date = $_GET['date'];
	$name = htmlspecialchars($_GET['message']);
	$req = $bdd->prepare('INSERT INTO task(date,name) VALUES(:date,:name)');
	$req->execute(array(
	'date' => $date,
	'name'=> $name
	));
	echo json_encode("super");
}
if ($_GET['action'] == "ajouterUtilisateur") 
{
	$user = htmlspecialchars($_GET['user']);
	$req = $bdd->prepare('INSERT INTO users(user) VALUES(:user)');
	$req->execute(array(
	'user'=> $user
	));
	echo json_encode("super");
}
if ($_GET['action'] == "assignerUtilisateur") 
{
	$user = htmlspecialchars($_GET['user']);
	$id = htmlspecialchars($_GET['id']);
	$req = $bdd->prepare('UPDATE task SET assignation=:user WHERE id=:id');
	$req->execute(array(
		'user' => $user,
		'id' => $id
	));	
	echo json_encode("super");
}
if ($_GET['action'] == "supprimerAssignationUtilisateur") 
{
	$assignation = null;
	$id = htmlspecialchars($_GET['id']);
	$req = $bdd->prepare('UPDATE task SET assignation=:assignation WHERE id=:id');
	$req->execute(array(
		'id' => $id,
		'assignation' => $assignation
	));	
	echo json_encode("super");
}
elseif ($_GET['action'] == "modifier") 
{
	$date = $_GET['date'];
	$name = htmlspecialchars($_GET['message']);
	$id = htmlspecialchars($_GET['id']);
	$req = $bdd->prepare('UPDATE task SET date=:date,name=:name WHERE id=:id');
	$req->execute(array(
		'date' => $date,
		'name' => $name,
		'id' => $id
	));	

	echo json_encode("super");
}
elseif ($_GET['action'] == "supprimer") 
{
	$id = htmlspecialchars($_GET['id']);
	$req = $bdd->prepare('DELETE  FROM task WHERE id=:id');
	$req->execute(array(
		'id' => $id
	));
	echo json_encode("super");
}
elseif ($_GET['action'] == "supprimerUser") 
{
	$id = htmlspecialchars($_GET['id']);
	$req = $bdd->prepare('DELETE  FROM users WHERE id=:id');
	$req->execute(array(
		'id' => $id
	));
	echo json_encode("super");
}
elseif ($_GET['action'] == "getTaskById")
{
	$id = htmlspecialchars($_GET['id']);
	$req = $bdd->prepare('SELECT * FROM task WHERE id=:id');
	$req->execute(array(
		'id' => $id,
	));
	$resultat = $req->fetchAll();
	echo json_encode($resultat);
}
elseif ($_GET['action'] == "getUsers")
{
	$co = $bdd->prepare('SELECT * FROM users');
	$co->execute();
	$result = $co->fetchAll();
	echo json_encode($result);
}

else
{
	$co = $bdd->prepare('SELECT * FROM task ORDER BY date asc');
	$co->execute();
	$result = $co->fetchAll();
	echo json_encode($result);

}

/*

if (!isset($_GET['message'])) {
		$erreur = "Le message n'a pas été transmis";
	}
	if (!is_string($_GET['message'])) {
		$erreur = "Le message n'est pas valide";
	}
	if ($_GET['message'] === "") {
		$erreur = "Le message est obligatoire";
	}

*/


?>