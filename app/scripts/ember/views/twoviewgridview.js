'use strict';

App.TwoViewGridView = Ember.View.extend({

    tagName: 'table',

    classNames: [
        'main-container__match-table'
    ],

    hover: null,

    templateName: 'widgets/twoviewgrid',

    NodeView: Ember.View.extend({

        tagName: 'th',

        mouseEnter: function(){
            this.get('parentView').set('hover', this);
        },

        isHorizontal: function(){
            return this.get('parentView.hover.indexY') === this.get('indexY') && this.get('parentView.hover.indexX') > this.get('indexX');
        }.property('parentView.hover'),

        isVertical: function(){
            return this.get('parentView.hover.indexX') === this.get('indexX') && this.get('parentView.hover.indexY') > this.get('indexY');
        }.property('parentView.hover'),

        viewX: null,

        viewY: null,

        indexX: function(){
            return this.get('controller.images').indexOf(this.get('viewX'));
        }.property('viewX'),

        indexY: function(){
            return this.get('controller.images').indexOf(this.get('viewY'));
        }.property('viewY'),

        key: function(){
            var id1 = this.get('viewX').get('_id'),
                id2 = this.get('viewY').get('_id');
            if (id1>id2) {
                return id2 + '&' + id1;
            }
            else if (id1<id2) {
                return id1 + '&' + id2;
            }
            else {
                return null;
            }
        }.property('viewX', 'viewY'),

        isFinished: function(){
            return !this.get('isDiag') && this.get('controller.finished').indexOf(this.get('key')) !== -1;
        }.property('controller.finished.length', 'key'),

        isDiag: function(){
            return this.get('viewX') === this.get('viewY');
        }.property(),

        isInrogress: false

    })

});