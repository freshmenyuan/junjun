Template.home.events({
    'submit .form-submit': function(event, template) {

        event.preventDefault();

        template.$('.form-button').attr('disabled', 'disabled');

        var name = template.$('.name').val();
        var address = template.$('.address').val();
        var date = template.$('.date').val();
        console.log(name);
        console.log(address);
        console.log(date);

        Meteor.call('sendToLewis', name, '', address, date, function(error, response) {
            template.$('.form-button').removeAttr('disabled');
            console.log("send");
        });
    }
});