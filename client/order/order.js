var phone_number = 0;

Template.order.onCreated( function() {

});

Template.order.onRendered(function () {

});

Template.order.helpers({

    order: function(){
        console.log();
        return true;
    },

    phoneNo: function () {
        phone_number = Session.get('phoneNo');
        console.log(phone_number);

        return phone_number;
    },
});

Template.order.events({

    'submit .form-submit': function(event, template) {

        event.preventDefault();
        template.$('.form-button').attr('disabled', 'disabled');

        var name = template.$('.name').val();
        var contact = template.$('.contact').val();
        var address = template.$('.address').val();
        var date = template.$('.date').val();

        console.log("client: "+name);
        console.log("client: "+address);
        console.log("client: "+date);

        Meteor.call('sendToLewis', name, contact, address, date, function(err,response) {
            template.$('.form-button').removeAttr('disabled');
        });

        setTimeout('', 2000);

        Meteor.setTimeout(function(){
            Meteor.call('checkSubmitSuccess',function(error, response){
                console.log(response);
                if(response){
                    window.location.href='success';

                }else{
                    window.location.href='error';
                }
            });

        }, 2000);
        
    }
});



