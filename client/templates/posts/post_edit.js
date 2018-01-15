Template.postEdit.onCreated(function() {
	Session.set('postEditErrors', {});
});

Template.postEdit.helpers({
	errorMessage: function(field) {
		return Session.get('postEditErrors')[field];
	},
	errorClass: function (field) {
		return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
	}
});

Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentPostId = this._id;
		var postProperties = {
			description: $(e.target).find('[name=description]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		var errors = validatePost(postProperties);
		if (errors.title || errors.description)
			return Session.set('postEditErrors', errors);

		// Here the post is updated directly, 
		// but to check for duplicate links it should be updated through a Meteor method call,
		
		Meteor.call('postEdit', postProperties, function(error, result) {
			if (error) {	
				// display the error to the user
				// alert(error.reason);
				throwError(error.reason);
			} else {
				// if the url already exists, result_id will be different from currentPostId. Route to the resultId
				if (result._id != currentPostId) {
					// alert('This link has already been posted');
					throwError('This description has already been posted');
					Router.go('postPage', {_id: result._id});
				} 
				// if the url does not exist, result_id will be same with currentPostId. Update and route to currentPostId
				else {
					Posts.update(currentPostId, {$set: postProperties}, function(error) {
						if (error) {	
							// display the error to the user
							// alert(error.reason);
							throwError(error.reason);
						} else {
							Router.go('postPage', {_id: currentPostId});
						}
					});
				}
			}

		}); 

		/*Posts.update(currentPostId, {$set: postProperties}, function(error) {
			if (error) {	
				// display the error to the user
				alert(error.reason);
			} else {
				Router.go('postPage', {_id: currentPostId});
			}
		}); */
	},

	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete this post?")) {
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});