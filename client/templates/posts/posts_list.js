
// sort post list by timestamps of submitted post
Template.postsList.helpers({
	posts: function() {
		return Posts.find({}, {sort: {submitted: -1}});
	}
});

