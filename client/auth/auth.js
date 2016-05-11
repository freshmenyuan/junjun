
Template.auth.onCreated( function() {
	
});

Template.auth.helpers({
	auth: function () {
		return true;
	},

});

var phone_number = "";
var timerid;

Template.auth.events({

	'click .sendMessage-button':function(event, template){
		event.preventDefault();

		var counter = 60;

		template.$('.sendMessage-button').attr('disabled', 'disabled');
		timerid = Meteor.setInterval(function(){
			counter--;
			if(counter < 0){
				Meteor.clearTimeout(timerid);
				template.$('.sendMessage-button').removeAttr("disabled"); 
				template.$('.sendMessage-button').html("发送");
			}else{
				template.$('.sendMessage-button').html(counter);	

			}
		}, 1000);

		var phone = template.$('.phone').val();
		phone_number = phone;

		Meteor.call('phoneVarification', phone, function(error, response) {
		});
	},

	'submit .check-sendMessage':function(event, template){
		event.preventDefault();

		// Session.set('phoneNo', 123);
		// Router.go('order');

		var VarCode = template.$('.MsgCode').val();

		console.log(VarCode);

		setTimeout('', 2000);

		Meteor.call('codeVarification', phone_number, VarCode, function(error, response) {
		});

		Meteor.setTimeout(function(){
			Meteor.call('checkSubmitMsgCodeSuccess',function(error, response){
				if(response){
					Session.set('phoneNo', phone_number);
					console.log(Session.get('phoneNo'));
					Meteor.clearTimeout(timerid);
					Router.go('order');

				}else{
					template.$('.MsgCode').val("验证码有误！");
					console.log(response);
				}
			});
		}, 2000);

		VarCode = 0;
	},


});