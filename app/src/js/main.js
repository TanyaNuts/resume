;
var Application = Application || {};
Application.index = null;
Application.currentPerson = null;

(function (global) {
	Application.loadIndex = function () {
		$.getJSON('./data/index.json', function (json) {
			Application.index = JSON.parse(json);
			Application.search();
		});
	}

	Application.search = function (query) {
		var index = Application.index, searchItem;
		if(query) {

		} else {
			for(var person in index) {
				searchItem = '<li>';
				searchItem += '<img src="' + person.photo + '" alt="' + person.name + ' ' + person.surname + '">';
				searchItem += '<span class="title">' + person.name + ' ' +  person.surname  + '</span></li>';
				$('.results-list').append(searchItem);
			}
		}
	}

	Application.loadPerson = function (file) {
		$.getJSON('./data/' + file, function (json) {
			var current = Application.currentPerson,
			skill, skillTitle, experienceItem, educationItem,
			personalItem, personal;
			current = JSON.parse(json);
			
			// Put the data to header
			$('.name').text(current.name + ' ' + current.surname);
			$('.visit-description .job').text(current.job);
			$('.visit-card img').attr('src', current.photo);
			$('.resume-more .description').text(current.about);

			// Put the info about experience
			for(var element in current.experience) {
				experienceItem = '<li>';
				experienceItem += '<strong class="company">' + element.title + '</strong>,';
				experienceItem += '<em class="time">' + element.yearOfStart + ' - ';
				if(element.yearOfEnd) {
					experienceItem += element.yearOfEnd;
				} else {
					experienceItem += "н.в.";
				}
				experienceItem += '</em>';
				experienceItem += '<span class="place">' + element.place.city + ', ' + element.place.country + '</span>';
				experienceItem += '<span class="job">' + element.position + '</span>';
				experienceItem += '<p>' + element.description + '</p></li>';
				$('.experience ul').append(experienceItem);
			}

			// Put the information about skills
			for(var element in current.skills) {
				skillTitle = Object.getOwnPropertyNames(element)[0];
				skill = '<tr><th>' + skillTitle + '</th><td><svg class="estimating">';
				// render circles
				for(var i = 0, length = element[skillTitle]; i < length; i++) {
					skill += '<circle cx="' + (6 + i * 15) + '" cy="6" r="5" class="filled"></circle>';
				}
				if(i < 5) {
					for(; i < 5; i += 1) {
						skill += '<circle cx="' + (6 + i * 15) + '" cy="6" r="5"></circle>';	
					}
				}
				skill += element[skillTitle] + '</svg></td></tr>'
				$('.skills tbody').append(skill);
			}

			// Put personal information
			personal = current.main;
			personalItem = '<tr><th>Дата рождения:</th><td>' + personal.dateOfBith.day + ' ' + personal.dateOfBith.month + ' ' + personal.dateOfBith.year + '</td>';
			personalItem += '<tr><th>Телефон:</th><td>' + personal.phone + '</td>';
			personalItem += '<tr><th>E-mail:</th><td>' + personal.email + '</td>';
			personalItem += '<tr><th>Адрес:</th><td>' + personal.address + '</td>';
			for(var social in personal.socials) {
				personalItem += '<tr><th>' +  social.social + '</th><td><a href="' + social.link + '">' + social.title + '</a></td>';
			}
			$('.personal table tbody').append(personalItem);

			// Put the info about education
			for(var element in current.education) {
				educationItem = '<li>';
				educationItem += '<strong class="university">' + element.title + '</strong>';
				educationItem += '<em class="time">' + element.yearOfStart + ' - ';
				if(element.yearOfEnd) {
					educationItem += element.yearOfEnd;
				} else {
					experienceItem += 'н.в.';
				}
				educationItem += '</em>';
				educationItem += '<span class="place">' + element.place.city + ', ' + element.place.country + '</span>';
				educationItem += '<table><tbody>';
				educationItem += '<tr><th>Специальность:</th><td>' + element.speciality + '</td></tr>';
				educationItem += '<tr><th>Квалификация:</th><td>' + element.qualification + '</td></tr>';
				educationItem += '<tr><th>Тема диплома:</th><td>' + element.diploma + '</td></tr>';
				educationItem += '</tbody></table></li>';
				$('.education ul').append(educationItem);
			}

			// additional information about
			if(current.additional) {
				$('.additional-info p').append(current.additional);
			}
		});
	}

	Application.loadIndex();
	
})(window);