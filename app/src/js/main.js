;
var Application = Application || {};
Application.index = null;
Application.currentPerson = null;

(function (global) {
	Application.loadIndex = function () {
		$.getJSON('./data/index.json', function (json) {
			Application.index = json;
			Application.search();
		});
	}

	Application.search = function (query) {
		var index = Application.index, searchItem;
		if(query) {

		} else {
			$('.results-list').html("");
			for(var i = 0, length = index.length; i < length; i++) {
				searchItem = '<li data-info="' + index[i].data + '">';
				searchItem += '<img src="' + index[i].photo + '" alt="' + index[i].name + ' ' + index[i].surname + '">';
				searchItem += '<span class="title">' + index[i].name + ' ' +  index[i].surname  + '</span></li>';
				$('.results-list').append(searchItem);
			}

			$('.results-list li').click(function() {
				var path = $(this).attr('data-info');
				Application.loadPerson(path);
			});
		}
	}

	Application.loadPerson = function (file) {
		$('.resume').css('display', 'block');
		$.getJSON('./data/' + file, function (json) {
			var current,
			skill, skillTitle, experienceItem, educationItem,
			personalItem;
			Application.currentPerson = json;
			
			current = Application.currentPerson;
			// Put the data to header
			$('.name').text(current.name + ' ' + Application.currentPerson.surname);
			$('.visit-description .job').text(Application.currentPerson.job);
			$('.visit-card img').attr('src', Application.currentPerson.photo);
			$('.resume-more .description').text(Application.currentPerson.about);

			// Put the info about experience
			$('.experience ul').html("");
			for(var i = 0, length = Application.currentPerson.experience.length; i < length; i += 1) {
				experienceItem = '<li>';
				experienceItem += '<strong class="company">' + Application.currentPerson.experience[i].title + '</strong>,';
				experienceItem += '<em class="time">' + Application.currentPerson.experience[i].yearOfStart + ' - ';
				if(Application.currentPerson.experience[i].yearOfEnd) {
					experienceItem += Application.currentPerson.experience[i].yearOfEnd;
				} else {
					experienceItem += "н.в.";
				}
				experienceItem += '</em>';
				experienceItem += '<span class="place">' + Application.currentPerson.experience[i].place.city + ', ' + Application.currentPerson.experience[i].place.country + '</span>';
				experienceItem += '<span class="job">' + Application.currentPerson.experience[i].position + '</span>';
				experienceItem += '<p>' + Application.currentPerson.experience[i].description + '</p></li>';
				$('.experience ul').append(experienceItem);
			}

			// Put the information about skills
			$('.skills tbody').html("");
			for(var i = 0, length = Application.currentPerson.skills.length; i < length; i += 1) {
				skill = '<tr><th>' + Application.currentPerson.skills[i].title + '</th><td><svg class="estimating">';
				// render circles
				for(var j = 0, jlength = Application.currentPerson.skills[i].value; j < jlength; j += 1) {
					skill += '<circle cx="' + (6 + j * 15) + '" cy="6" r="5" class="filled"></circle>';
				}
				if(j < 5) {
					for(; j < 5; j += 1) {
						skill += '<circle cx="' + (6 + j * 15) + '" cy="6" r="5"></circle>';	
					}
				}
				skill += '</svg></td></tr>'
				$('.skills tbody').append(skill);
			}

			// Put personal information
			$('.personal table tbody').html("");
			personalItem = '<tr><th>Дата рождения:</th><td>' + Application.currentPerson.main.dateOfBirth.day + ' ' + Application.currentPerson.main.dateOfBirth.month + ' ' + Application.currentPerson.main.dateOfBirth.year + '</td>';
			personalItem += '<tr><th>Телефон:</th><td>' + Application.currentPerson.main.phone + '</td>';
			personalItem += '<tr><th>E-mail:</th><td><a href="mailto:"' + Application.currentPerson.main.email + '">' + Application.currentPerson.main.email + '</a></td>';
			personalItem += '<tr><th>Адрес:</th><td>' + Application.currentPerson.main.address + '</td>';
			for(var i = 0, length = Application.currentPerson.main.socials.length; i < length; i += 1) {
				personalItem += '<tr><th>' +  Application.currentPerson.main.socials[i].social + '</th><td><a href="' + Application.currentPerson.main.socials[i].link + '">' + Application.currentPerson.main.socials[i].title + '</a></td>';
			}
			$('.personal table tbody').append(personalItem);


			$('.education ul').html("");
			// Put the info about education
			for(var i = 0, length = Application.currentPerson.education.length; i < length; i += 1) {
				educationItem = '<li>';
				educationItem += '<strong class="university">' + Application.currentPerson.education[i].title + '</strong>';
				educationItem += '<em class="time">' + Application.currentPerson.education[i].yearOfStart + ' - ';
				if(Application.currentPerson.education[i].yearOfEnd) {
					educationItem += Application.currentPerson.education[i].yearOfEnd;
				} else {
					experienceItem += 'н.в.';
				}
				educationItem += '</em>';
				educationItem += '<span class="place">' + Application.currentPerson.education[i].place.city + ', ' + Application.currentPerson.education[i].place.country + '</span>';
				educationItem += '<table><tbody>';
				educationItem += '<tr><th>Специальность:</th><td>' + Application.currentPerson.education[i].speciality + '</td></tr>';
				educationItem += '<tr><th>Квалификация:</th><td>' + Application.currentPerson.education[i].qualification + '</td></tr>';
				educationItem += '<tr><th>Тема диплома:</th><td>' + Application.currentPerson.education[i].diploma + '</td></tr>';
				educationItem += '</tbody></table></li>';
				$('.education ul').append(educationItem);
			}

			// additional information about
			if(Application.currentPerson.additional) {
				$('.additional-info p').text(Application.currentPerson.additional);
			}
		});
	}

	Application.loadIndex();

})(window);