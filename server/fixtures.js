// Fixture data
if (Posts.find().count() === 0) {
	var now = new Date().getTime();
	// create two users
	var maitrayeId = Meteor.users.insert({
		profile: { name: 'Maitraye Das' }
	});
	var maitraye = Meteor.users.findOne(maitrayeId);

	var abirId = Meteor.users.insert({
		profile: { name: 'Abir Saha' }
	});
	var abir = Meteor.users.findOne(abirId);
	
	var firstPostId = Posts.insert({
		title: 'Nice party place near Evanston',
		userId: abir._id,
		author: abir.profile.name,
		description: 'Exciting new party place for the students of Northwestern',
		submitted: new Date(now - 7 * 3600 * 1000),
		commentsCount: 2
	});

	Comments.insert({
		postId: firstPostId,
		userId: maitraye._id,
		author: maitraye.profile.name,
		submitted: new Date(now - 5 * 3600 * 1000),
		body: 'Interesting, I want to book this place.'
	});

	Comments.insert({
		postId: firstPostId,
		userId: abir._id,
		author: abir.profile.name,
		submitted: new Date(now - 3 * 3600 * 1000),
		body: 'You are welcome!'
	});

	Posts.insert({
		title: 'Party place near Loyola',
		userId: maitraye._id,
		author: maitraye.profile.name,
		description: 'Nice place to throw party with two large rooms',
		submitted: new Date(now - 10 * 3600 * 1000),
		commentsCount: 0
	});

	Posts.insert({
		title: 'Party place near Lakeview, Chicago',
		userId: maitraye._id,
		author: maitraye.profile.name,
		description: 'Do you want places for party near Lakeview? We are here to help',
		submitted: new Date(now - 12 * 3600 * 1000),
		commentsCount: 0
	});
}