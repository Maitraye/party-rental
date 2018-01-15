Posts = new Mongo.Collection('posts');

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
		return (_.without(fieldNames, 'url', 'title').length > 0);
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
	}
});


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