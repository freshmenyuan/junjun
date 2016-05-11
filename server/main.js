import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

var responseBooking = false;
var responseMsgCode = false;


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({

	'checkSubmitSuccess'(){
		return responseBooking;
	},

	'checkSubmitMsgCodeSuccess'(){
		return responseMsgCode;
	},

	'codeVarification'(phone, code){
		var requestData = {
			token:"test2",
			msgBody:    
			{
				mobNum: phone,
				password: code
			}
		};

		var address = "http://119.29.176.80:8081/sv2";
		
		HTTP.call("POST", address, {data:requestData}, function(err, result) {
			if(err != null){
				console.log(err);
			}
			console.log(result.data.res);
			if (result.data.res === true){
				responseMsgCode =  true;
			}else{
				responseMsgCode = false;
			}
		});

	},

	'phoneVarification'(phone){
		var requestData = {
			token:"test2",
			msgBody:    
			{
				mobNum: phone
			}
		};

		var address = "http://119.29.176.80:8081/sv";
		// Meteor.set('',);
		
		HTTP.call("POST", address, {data:requestData}, function(err, result) {
			if (!err){
				console.log(result);
			}
		});

	},

	'sendToLewis'(name, mobile, address, date) {
		console.log(name);
		console.log(address);
		console.log(date);

		var requestData = {
			token:"test",
			msgBody:    
			{
				name:name,
				mobNum: mobile,
				add: address,
				bkDateStr:date
			}
		};

		var address = "http://119.29.176.80:8081/bk";
		HTTP.call("POST", address, {data:requestData}, function(err, result) {
			if(err != null){
				console.log(err);
			}
			console.log(result.data.res);
			if (result.data.res === true){
				responseBooking =  true;
			}else{
				responseBooking = false;
			}
		});
	},


});
