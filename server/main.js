import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	'sendToLewis'(text) {
		check(text, String);

		var requestData = {
			token:"test",
			msgBody:    
			{
				name:"袁先生3",
				mobNum: 15647424568,
				add: "深圳市山区国际青年公寓",
				bkDateStr:"2016-08-16"
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
