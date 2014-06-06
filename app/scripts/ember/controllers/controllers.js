'use strict';

App.ApplicationController = Ember.ObjectController.extend({

    actions: {
        enter: function(route){
            this.transitionToRoute(route);
        },

        stop: function(){
            this.set('state', SFM.STATE_STOPPED);
        },

        run: function(){
            this.set('state', SFM.STATE_RUNNING);
        }
    }

});


App.InputController = Ember.ArrayController.extend({
    itemController: 'input.thumbnail'
});

App.InputThumbnailController = Ember.ObjectController.extend({

    actions: {
        expand: function(){
            this.transitionToRoute('input.image', this.get('model'));
        }
    }

});

App.InputImageController = Ember.ObjectController.extend();

App.ExtractorController = Ember.ArrayController.extend({
    itemController: 'extractor.thumbnail'
});

App.ExtractorThumbnailController = Ember.ObjectController.extend({

    actions: {
        expand: function(){
            this.transitionToRoute('extractor.image', this.get('model'));
        }
    }

});

App.MatchesController = Ember.ObjectController.extend();

App.TracksController = Ember.ObjectController.extend();