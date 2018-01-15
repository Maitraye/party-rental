Comments = new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes) {
		//checking if user is logged in
		check(this.userId, String);

		//checking if the comment has a body
		check(commentAttributes, {
			postId: String,
			body: String
		});
		var user = Meteor.user();

		// checking if the comment is linked to a post
		var post = Posts.findOne(commentAttributes.postId);
		if (!post)
			throw new Meteor.Error('invalid-comment', 'You must comment on a post');

		//extending some comment attributes and inserting it
		comment = _.extend(commentAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});
		return Comments.insert(comment);
	}
});