Template.order.helpers({
  phoneNO: function () {
    template.$('.contact').val(Session.get("phoneNo"));
    console.log(Session.get("phoneNo"));
    return Session.get("phoneNo");
} 
});

Template.order.events({

    'submit .form-submit': function(event, template) {

        event.preventDefault();

        template.$('.form-button').attr('disabled', 'disabled');

        var name = template.$('.name').val();
        var address = template.$('.address').val();
        var date = template.$('.date').val();

        console.log("client: "+name);
        console.log("client: "+address);
        console.log("client: "+date);

        Meteor.call('sendToLewis', name, '', address, date, function(err,response) {
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



