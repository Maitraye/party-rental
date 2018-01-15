Posts = new Mongo.Collection('posts');

/*Posts.allow({
	insert: function(userId, doc) {
		// only allow posting if you are logged in
		return !! userId;
	}
});*/
//Meteor Methods are executed on the server, so Meteor assumes they can be trusted. As such, Meteor methods bypass any allow/deny callbacks.

Meteor.methods({
	postInsert: function(postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

	//	If a post with the same URL has already been created previously,
	//  we won’t add the link a second time but instead redirect the user to this existing post.
	
		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});
		var postId = Posts.insert(post);
		return {
			_id: postId
		};
	}
});