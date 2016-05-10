Template.auth.helpers({

});

var phone_number = "";

Template.auth.events({

	'click .sendMessage-button':function(event, template){
		event.preventDefault();

		var counter = 60;

		template.$('.sendMessage-button').attr('disabled', 'disabled');
		var id = Meteor.setInterval(function(){
			counter--;
			if(counter < 0){
				Meteor.clearTimeout(id);
				template.$('.sendMessage-button').removeAttr("disabled"); 
			}else{
				template.$('.sendMessage-button').html(counter);	

			}
		}, 1000);

		var phone = template.$('.phone').val();
		phone_number = phone;
		console.log(phone);

		Meteor.call('phoneVarification', phone, function(error, response) {
			console.log("client: "+response);
		});
	},

	'submit .check-sendMessage':function(event, template){
		event.preventDefault();

		// template.$('.check-sendMessage-button').attr('disabled', 'disabled');

		var VarCode = template.$('.MsgCode').val();

		console.log(VarCode);

		setTimeout('', 2000);

		Meteor.call('codeVarification', phone_number, VarCode, function(error, response) {
		});

		Meteor.setTimeout(function(){
			Meteor.call('checkSubmitMsgCodeSuccess',function(error, response){
				console.log(response);
				if(response){
					window.location.href='order';
					Session.set("phoneNo", phone_number);

				}else{
					template.$('.MsgCode').val("验证码有误！");
					console.log(response);
				}
			});
		}, 2000);

		VarCode = 0;
	},


});