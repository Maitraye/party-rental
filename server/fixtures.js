if (Posts.find().count() === 0) {
	var now = new Date().getTime();
	// create two users
	var abirId = Meteor.users.insert({
		profile: { name: 'Abir Saha' }
	});
	var abir = Meteor.users.findOne(abirId);

	var maitrayeId = Meteor.users.insert({
		profile: { name: 'Maitraye Das' }
	});
	var maitraye = Meteor.users.findOne(maitrayeId);
	
	var telescopeId = Posts.insert({
		title: 'Introducing Telescope',
		userId: maitraye._id,
		author: maitraye.profile.name,
		url: 'http://sachagreif.com/introducing-telescope/',
		submitted: new Date(now - 7 * 3600 * 1000)
	});

	Comments.insert({
		postId: telescopeId,
		userId: abir._id,
		author: abir.profile.name,
		submitted: new Date(now - 5 * 3600 * 1000),
		body: 'Interesting project Sacha, can I get involved?'
	});

	Comments.insert({
		postId: telescopeId,
		userId: maitraye._id,
		author: maitraye.profile.name,
		submitted: new Date(now - 3 * 3600 * 1000),
		body: 'You sure can Tom!'
	});

	Posts.insert({
		title: 'Meteor',
		userId: abir._id,
		author: abir.profile.name,	
		url: 'http://meteor.com',
		submitted: new Date(now - 10 * 3600 * 1000)
	});

	Posts.insert({
		title: 'The Meteor Book',
		userId: abir._id,
		author: abir.profile.name,
		url: 'http://themeteorbook.com',
		submitted: new Date(now - 12 * 3600 * 1000)
	});
}