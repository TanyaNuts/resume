;
var Application = Application || {};
Application.index = null;
Application.currentPerson = null;

(function (global) {
	Application.loadIndex = function () {
		$.getJSON('data/index.json', function (json) {
			Application.index = JSON.parse(json);
			console.log(Application.index);
		});
	}

	Application.loadPerson = function (file) {
		$.getJSON(file, function (json) {
			var current = Application.currentPerson,
			skill, skillTitle;
			current = JSON.parse(json);
			
			// Put the data to header
			$('.name').text(current.name + ' ' + current.surname);
			$('.visit-description .job').text(current.job);
			$('.visit-card img').attr('src', current.photo);
			$('.resume-more .description').text(current.about);

			// Put the info about experience
			for(var element in current.experience) {
				$('.experience ul').append();
			}

			// Put the information about skills
			for(var element in current.skills) {
				skillTitle = Object.getOwnPropertyNames(element)[0];
				skill = '<tr><th>' + skillTitle + '</th><td>';
				// render circles
				for(var i = 0, length = element[skillTitle]; i < length; i++) {

				}
				skill += element[skillTitle] + '</td></tr>'
				$('.skills tbody').append(skill);
			}

			// Put the info about education
			for(var element in current.education) {

			}

			// additional information about
			if(current.additional) {
				$('.additional-info p').append(current.additional);
			}
		});
	}

	Application.loadIndex();
	
})(window);