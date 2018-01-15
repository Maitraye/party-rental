/*var postsData = [
	{
		title: 'Introducing Telescope',
		url: 'http://sachagreif.com/introducing-telescope/'
	},
	{
		title: 'Meteor',
		url: 'http://meteor.com'
	},
	{
		title: 'The Meteor Book',
		url: 'http://themeteorbook.com'
	}
];
Template.postsList.helpers({
	posts: postsData
});*/

/*Template.postsList.helpers({
	posts: function() {
		return Posts.find();
	}
});*/

// sort post list by timestamps of submitted post
Template.postsList.helpers({
	posts: function() {
		return Posts.find({}, {sort: {submitted: -1}});
	}
});

/* show posts by bob-smith with category JavaScript
Template.posts.helpers({
	posts: function(){
		return Posts.find({author: 'bob-smith', category: 'JavaScript'});
	}
}); */