import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	'sendToLewis'(name, mobile, address, date) {
		console.log(name);
		console.log(address);
		console.log(date);

		var requestData = {
			token:"test",
			msgBody:    
			{
				name:name,
				mobNum: 15647424568,
				add: address,
				bkDateStr:date
			}
		};

		var address = "http://119.29.176.80:8081/bk";

		HTTP.call("POST", address, {data:requestData}, function(err, result) {
			if (!err){
				console.log(err);
			}
			console.log(result);
		});


	},
});
