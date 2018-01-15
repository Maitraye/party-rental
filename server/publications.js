Meteor.publish('posts', function() {
	return Posts.find();
});

Meteor.publish('comments', function() {
	return Comments.find();
});

/* published posts which are not flagged and written by author
Meteor.publish('posts', function() {
	return Posts.find({flagged: false, author: author});
});*/

/* publish posts by Tom
Meteor.publish('somePosts', function(){
	return Posts.find({'author':'Tom'});
});*/

/* publish all posts but exclude date field
Meteor.publish('allPosts', function(){
	return Posts.find({}, {fields: {
		date: false
	}});
}); */

/* publish all posts by Tom but exclude date fields
Meteor.publish('allPosts', function(){
	return Posts.find({'author':'Tom'}, {fields: {
		date: false
	}});
}); */