Template.postSubmit.onCreated(function() {
	Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function (field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};
	//	post._id = Posts.insert(post);
	//	Router.go('postPage', post);

	var errors = validatePost(post);
	if (errors.title || errors.url)
		return Session.set('postSubmitErrors', errors);

	// calling postInsert Method to insert post
		Meteor.call('postInsert', post, function(error, result) {
			// display the error to the user and abort
			if (error)
			//	return alert(error.reason);
				return throwError(error.reason);

			// if the url already exists, show this result but route anyway
			if (result.postExists)
			//	alert('This link has already been posted');
				throwError('This link has already been posted');

			Router.go('postPage', {_id: result._id});
		});		
	}
});