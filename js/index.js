$(function(){
chargementTableau();


	// -----------------------------------------------
	// Clique sur le bouton de suppression d'une tâche
	// -----------------------------------------------
	$("body").on("click","#supprimer",function(){
		var idSupprimer = $(this).attr("data-id");
		supprimer(idSupprimer);
	})

	// ----------------------------------------
	// Clique sur le bouton d'ajout d'une tâche
	// ----------------------------------------
	$("body").on("click","#valider",function(){
		var message = $("#tache").val();
		var date = $("#date").val();
		ajouter(message,date);
	})

	// ------------------------------------------------
	// Clique sur le bouton de modification d'une tâche
	// ------------------------------------------------
	$("body").on("click","#modifier",function(){
		var idModifier = $(this).attr("data-id");
		getTaskById(idModifier);
	})

	// -------------------------------------------------------------
	// Clique sur le bouton pour assigner une tâche à un utilisateur
	// -------------------------------------------------------------
	$("body").on("click","#addUser",function(){
		var idAssignation = $(this).attr("data-id");
		plateformeUser(idAssignation);
	})

	// -------------------
	// Fonction de la date
	// -------------------
	function date()
	{
		var currentdate = new Date(); 
		if (currentdate.getMonth()+1 >9) {
			var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1);
		}
		else
		{
			var datetime = currentdate.getFullYear() + "-0"
                + (currentdate.getMonth()+1);
		}
		if (currentdate.getDate() >9) {
			var datetime = datetime + "-" + (currentdate.getDate());
		}
		else
		{
			var datetime = datetime + "-0" + (currentdate.getDate());
		}
		if (currentdate.getHours() >9) {
			var datetime = datetime + "T" + (currentdate.getHours());
		}
		else
		{
			var datetime = datetime + "T0" + (currentdate.getHours());
		}
		if (currentdate.getMinutes() >9) {
			var datetime = datetime + ":" + (currentdate.getMinutes());
		}
		else
		{
			var datetime = datetime + ":0" + (currentdate.getMinutes());
		}
		$("#date").val(datetime);
	}


	// -----------------------------------------
	// Fonction qui permet de charger le tableau
	// -----------------------------------------
	function chargementTableau()
	{

		date();

		$.ajax({
			type : "GET",
			url : "./Services.php",
			datatype : "json",
			success : function(json)
			{
				data = JSON.parse(json);
				console.log(data);

				// --------------------------------
				// Affichage de l'entête du tableau
				// --------------------------------
				$("#tableau").append("<tr>");
				$("tr:last-child").append("<th>Numéro</th>");
				$("tr:last-child").append("<th>Date</th>");
				$("tr:last-child").append("<th>Tache</th>");
				$("tr:last-child").append("<th>Assignation</th>");
				$("tr:last-child").append("<th>Action</th>");
				$("tr:last-child").append("</tr>");


				// -----------------------------
				// Affichage du corps du tableau
				// -----------------------------
				for (var i = 0; i < data.length; i++) {
					$("#tableau").append("<tr>");
					$("tr:last-child").append("<td>"+data[i].id+"</td>");
					$("tr:last-child").append("<td>"+data[i].date+"</td>");
					$("tr:last-child").append("<td>"+data[i].name+"</td>");
					if (data[i].assignation == null) {
						$("tr:last-child").append("<td> - </td>");	
					}
					else
					{
						$("tr:last-child").append("<td>"+data[i].assignation+"</td>");
					}
					$("tr:last-child").append("<td><a id='modifier' data-id='"+data[i].id+"'><img src='img/IconeModifier.png' height='20' width='20'></a>&nbsp<a id='supprimer' data-id='"+data[i].id+"'><img src='img/IconeSupprimer.png' height='20' width='20'></a>&nbsp<a id='addUser' data-id='"+data[i].id+"'><img src='img/iconeUser.png' height='20' width='20'></a></td>");
					$("tr:last-child").append("</tr>");
				}
			}
		});
	}

	// ---------------------------------------
	// Fonction permettant d'ajouter une tâche
	// ---------------------------------------
	function ajouter(message,date)
	{
		$.ajax({
			type : "GET",
			url : "./Services.php",
			datatype : "json",
			data : { 
					 message : message,
					 date : date,
					 action : "ajouter"
					},
			success : function(json)
			{
				data = json;
				console.log(data);

				// -----------------------
				// Rechargement du tableau
				// -----------------------
				document.getElementById("tableau").innerHTML="";
				chargementTableau();

				// ----------------------------
				// Remise à null du champ texte
				// ----------------------------
				$('#tache').val(null);
				
				// ---------------------
				// Message de validation
				// ---------------------
				$(".info").remove();	
				$("#annonce").append("<center><p class='info'>Ajout effectuée");

			}
		});
	}

	// -----------------------------------------
	// Function permettant de modifier une tâche
	// -----------------------------------------
	function getTaskById(id)
	{
		$.ajax({
			type : "GET",
			url : "./Services.php",
			datatype : "json",
			data : { id : id,
					 action : "getTaskById",
					}  ,
			success : function(json)
			{
				data = JSON.parse(json);
				console.log(data);

				var modal = document.getElementById('myModal');
			
				modal.style.display = "block";

				// -------------------------------------
				// Fonction de date pour la modification
				// -------------------------------------
				var date = new Date(data['0'].date); 
				if (date.getMonth()+1 >9) {
					var dateMod = date.getFullYear() + "-"
		                + (date.getMonth()+1);
				}
				else
				{
					var dateMod = date.getFullYear() + "-0"
		                + (date.getMonth()+1);
				}
				if (date.getDate() >9) {
					var dateMod = dateMod + "-" + (date.getDate());
				}
				else
				{
					var dateMod = dateMod + "-0" + (date.getDate());
				}
				if (date.getHours() >9) {
					var dateMod = dateMod + "T" + (date.getHours());
				}
				else
				{
					var dateMod = dateMod + "T0" + (date.getHours());
				}
				if (date.getMinutes() >9) {
					var dateMod = dateMod + ":" + (date.getMinutes());
				}
				else
				{
					var dateMod = dateMod + ":0" + (date.getMinutes());
				}
				$("#dateMod").val(dateMod);

				
				
				$("#myModal").append("<div class='modal-content'>");
				$(".modal-content").append("<h2>Modification</h2>");
				$(".modal-content").append("<input type='datetime-local' id='dateMod' name='dateMod' value='"+dateMod+"' class='bouton'><input type='text' id='tacheMod' name='tacheMod' class='zoneTexteModal' value='"+data['0'].name+"'>");
				$(".modal-content").append("<div class='boutonContent'>");
				$(".boutonContent").append("<a id='annulerModification'>Annuler</a>")
				$(".boutonContent").append("<a id='validerModification'>Valider</a>");

				// -----------------------------
				// Annulation de la modification
				// -----------------------------
				$("body").on("click","#annulerModification",function(){
					modal.style.display = "none";
					$(".modal-content").remove();
				})

				// ---------------------------
				// On effectue la modification
				// ---------------------------
				$("#validerModification").click(function(){
					$.ajax({
						type : "GET",
						url : "./Services.php",
						datatype : "json",
						data : { 
								id : id,
								date : $('#dateMod').val(),
								message : $('#tacheMod').val(),
								action : "modifier"
								},
						success : function(json)
						{
							data = json;
							console.log(data);

							// -----------------------
							// Rechargement du tableau
							// -----------------------
							document.getElementById("tableau").innerHTML="";
							chargementTableau();

							modal.style.display = "none";
							$(".modal-content").remove();

							// ---------------------
							// Message de validation
							// ---------------------
							$(".info").remove();	
							$("#annonce").append("<center><p class='info'>Modification effectuée");	
						}
					});
				})


				
			}
		});
	}

	// ------------------------------------------
	// Fonction permettant de supprimer une tâche
	// ------------------------------------------
	function supprimer(id)
	{
		var modal = document.getElementById('myModal');
		modal.style.display = "block";
				
		$("#myModal").append("<div class='modal-contentSupprimer'>");
		$(".modal-contentSupprimer").append("<h2>Voulez-vous supprimer cette tâche ?</h2>");
		$(".modal-contentSupprimer").append("<div class='boutonContent'>");
		$(".boutonContent").append("<a id='annulerSuppression'>Annuler</a>")
		$(".boutonContent").append("<a id='validerSuppression'>Valider</a>");

		// ----------------------------
		// Annulation de la suppression
		// ----------------------------
		$("body").on("click","#annulerSuppression",function(){
			modal.style.display = "none";
			$(".modal-contentSupprimer").remove();
		})

		// ----------------------------
		// Validation de la suppression
		// ----------------------------
		
		$("#validerSuppression").click(function(){
			$.ajax({
			type : "GET",
			url : "./Services.php",
			datatype : "json",
			data : { id : id,
					 action : "supprimer"
					},
			success : function(json)
			{
				data = json;
				console.log(data);

				// -----------------------
				// Rechargement du tableau
				// -----------------------
				document.getElementById("tableau").innerHTML="";
				chargementTableau();

				modal.style.display = "none";
				$(".modal-contentSupprimer").remove();
				
				// ---------------------
				// Message de validation
				// ---------------------
				$(".info").remove();	
				$("#annonce").append("<center><p class='info'>Suppression effectuée");
			}
			});
		});

	}

	// -------------------------------------
	// Création de la plateforme utilisateur
	// -------------------------------------
	function plateformeUser(id)
	{

		var modal = document.getElementById('myModal');
			
		modal.style.display = "block";
				
		$("#myModal").append("<div class='modal-content'>");

		// ------
		// Onglet
		// ------
		$(".modal-content").append("<div class='onglet'>");
		$(".onglet").append("<a><div id='assignation' class='ongletUser firstOnglet'>Assignation à la tâche</div</a>");
		$(".onglet").append("<a><div id='supprimerAssignation' class='ongletUser firstOnglet'>Supprimer assignation</div</a>");
		$(".onglet").append("<a><div id='ajoutUser' class='ongletUser firstOnglet'>Ajouter des utilisateurs</div></a>");
		$(".onglet").append("<a><div id='supprimerUser' class='ongletUser'>Supprimer des utilisateurs</div></a>");

		// -----
		// corps
		// -----
		$(".modal-content").append("<div class='corps'>");
		$(".corps").append("<p class='bienvenue'>Bienvenue sur le gestionnaire des utilisateurs</p>");

		// ------
		// Bouton
		// ------
		$(".modal-content").append("<div class='boutonContent'>");
		$(".boutonContent").append("<center><a id='quitterUser'>Quitter</a></center>")

		// -------
		// Quitter
		// -------

		$("body").on("click","#quitterUser",function(){
			modal.style.display = "none";
			$(".modal-content").remove();
		})

		// -----------
		// Assignation 
		// -----------

		$("#assignation").click(function(){
			$(".corps").remove();
			$(".boutonContent").remove();

			$(".modal-content").append("<div class='corps'>");
			$(".corps").append("<p class='bienvenue'>Assigner un utilisateur à la tâche</p>");

			// ------
			// Bouton
			// ------
			$(".modal-content").append("<div class='boutonContent'>");
			$(".boutonContent").append("<a id='quitterUser'>Quitter</a>");
			$(".boutonContent").append("<a id='validerAssignation'>Enregister</a>");

			$.ajax({
			type : "GET",
			url : "./Services.php",
			datatype : "json",
			data : { 
					 action : "getUsers"
					}  ,
			success : function(json)
			{
				data = JSON.parse(json);
				console.log(data);

				$(".corps").append("<center><select id='selectUser'>");
				$("#selectUser").append("<option value=''>");
				for (var i = 0; i < data.length; i++) {
					$("#selectUser").append("<option value='"+data[i].id+"'>"+data[i].user+"");
				}

				//alert("Ajout de l'utilisateur effectué")
				$("#validerAssignation").click(function(){
					$.ajax({
					type : "GET",
					url : "./Services.php",
					datatype : "json",
					data : { 
							id : id,
							user : $("#selectUser > option:selected").text(),
							action : "assignerUtilisateur"
							}  ,
					success : function(json)
					{
						data = json;
						console.log(data);

						document.getElementById("tableau").innerHTML="";
						chargementTableau();
						modal.style.display = "none";
						$(".modal-content").remove();
					}
					});

				})
			}
			});
				

		})

		// -------------------------
		// Supprimer une assignation
		// -------------------------
		$("#supprimerAssignation").click(function(){
			$(".corps").remove();
			$(".boutonContent").remove();

			$(".modal-content").append("<div class='corps'>");
			$(".corps").append("<p class='bienvenue'>Supprimer l'assignation à la tâche ?</p>");

			// ------
			// Bouton
			// ------
			$(".modal-content").append("<div class='boutonContent'>");
			$(".boutonContent").append("<a id='quitterUser'>Quitter</a>");
			$(".boutonContent").append("<a id='validerSuppressionAssignation'>Supprimer</a>");

			$("#validerSuppressionAssignation").click(function(){
				$.ajax({
				type : "GET",
				url : "./Services.php",
				datatype : "json",
				data : { 
						id : id,
						action : "supprimerAssignationUtilisateur"
						}  ,
				success : function(json)
				{
					data = JSON.parse(json);
					console.log(data);


					document.getElementById("tableau").innerHTML="";
					chargementTableau();
					modal.style.display = "none";
					$(".modal-content").remove();
				}
				});
				
			})
		})

		// ------------------------
		// Ajouter des utilisateurs 
		// ------------------------

		$("#ajoutUser").click(function(){
			$(".corps").remove();
			$(".boutonContent").remove();

			$(".modal-content").append("<div class='corps'>");
			$(".corps").append("<p class='bienvenue'>Ajouter un utilisateur</p>");
			$(".corps").append("<input type='text' id='ajoutUtilisateur' name='ajoutUtilisateur' class='zoneTexteModal' placeholder='Utilisateur' value=''>");
				

			// ------
			// Bouton
			// ------
			$(".modal-content").append("<div class='boutonContent'>");
			$(".boutonContent").append("<a id='quitterUser'>Quitter</a>");
			$(".boutonContent").append("<a id='validerNouveauUser'>Enregister</a>");

			$("#validerNouveauUser").click(function(){
				
				$.ajax({
				type : "GET",
				url : "./Services.php",
				datatype : "json",
				data : { 
						user : $('#ajoutUtilisateur').val(),
						action : "ajouterUtilisateur"
						},
				success : function(json)
				{
					data = json;
					console.log(data);


					// ----------------------------
					// Remise à null du champ texte
					// ----------------------------
					$('#ajoutUtilisateur').val(null);

					$('.info').remove();
					$(".bienvenue").append("<p class='info'>Utilisateur ajouté</p>");
				}
			});

			})

		})

		// --------------------------
		// Supprimer des utilisateurs 
		// --------------------------

		$("#supprimerUser").click(function(){
			$(".corps").remove();
			$(".boutonContent").remove();

			$(".modal-content").append("<div class='corps'>");
			$(".corps").append("<p class='bienvenue'>Supprimer un utilisateur</p>");

			// ------
			// Bouton
			// ------
			$(".modal-content").append("<div class='boutonContent'>");
			$(".boutonContent").append("<a id='quitterUser'>Quitter</a>");
			$(".boutonContent").append("<a id='validerSuppressionUtilisateur'>Supprimer</a>");

			$.ajax({
			type : "GET",
			url : "./Services.php",
			datatype : "json",
			data : { 
					 action : "getUsers"
					}  ,
			success : function(json)
			{
				data = JSON.parse(json);
				console.log(data);

				$(".corps").append("<center><select id='selectUser'>");
				$("#selectUser").append("<option value=''>");
				for (var i = 0; i < data.length; i++) {
					$("#selectUser").append("<option value='"+data[i].id+"'>"+data[i].user+"");
				}

				$("#validerSuppressionUtilisateur").click(function(){
					$.ajax({
					type : "GET",
					url : "./Services.php",
					datatype : "json",
					data : { 
							id : $("#selectUser > option:selected").val(),
							action : "supprimerUser"
							}  ,
					success : function(json)
					{
						data = json;
						console.log(data);

						
						$('.info').remove();
						$(".bienvenue").append("<p class='info'>Utilisateur supprimer</p>");

						// -------------------------
						// Actualisation de la liste
						// -------------------------
						$("option:selected").val(data.id).remove();
						
					}
					});

				})
			}
			});

		})

	}



})