Posts = new Mongo.Collection('posts');

validatePost = function (post) {
	var errors = {};
	if (!post.title)
		errors.title = "Please fill in a title";
	if (!post.description)
		errors.description = "Please fill in the description";
	return errors;
}

/*Posts.allow({
	insert: function(userId, doc) {
		// only allow posting if you are logged in
		return !! userId;
	}
});*/
//Meteor Methods are executed on the server, so Meteor assumes they can be trusted. As such, Meteor methods bypass any allow/deny callbacks.

// adding allow block so that post can be edited or deleted from the client side
Posts.allow({
	update: function(userId, post) { return ownsDocument(userId, post); },
	remove: function(userId, post) { return ownsDocument(userId, post); }
});

// ensuring users can update only certain fields
Posts.deny({
	update: function(userId, post, fieldNames) {
		// may only edit the following two fields:
		return (_.without(fieldNames, 'description', 'title').length > 0);
	}
});

// deny for post update errors
Posts.deny({
	update: function(userId, post, fieldNames, modifier) {
		var errors = validatePost(modifier.$set);
		return errors.title || errors.description;
	}
});

// nowhere in our post editing code do we check for duplicate links. 
// This means a user could submit a link and then edit it to change its URL to bypass that check. 
// The solution to this issue would be to also use a Meteor method for the edit post form.

Meteor.methods({
	postEdit: function(postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			description: String
		});

		//validate errors in case of updating with existing links
		var errors = validatePost(postAttributes);
		if (errors.title || errors.de)
			throw new Meteor.Error('invalid-post', "You must set a title and description for your post");

	//	If a post with the same description has already been created previously,
	//  we won’t add the link a second time but instead redirect the user to this existing post.

		var postWithSameDescription = Posts.findOne({description: postAttributes.description});
		if (postWithSameDescription) {
				return {
					postExists: true,
					_id: postWithSameDescription._id
				}
			
		}
	}
});


Meteor.methods({
	postInsert: function(postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			description: String
		});

		var errors = validatePost(postAttributes);
		if (errors.title || errors.description)
			throw new Meteor.Error('invalid-post', "You must set a title and description for your post");

	//	If a post with the same description has already been created previously,
	//  we won’t add the link a second time but instead redirect the user to this existing post.

		var postWithSameDescription = Posts.findOne({url: postAttributes.description});
		if (postWithSameDescription) {
			return {
				postExists: true,
				_id: postWithSameDescription._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
			commentsCount: 0
		});
		var postId = Posts.insert(post);
		return {
			_id: postId
		};
	}
});