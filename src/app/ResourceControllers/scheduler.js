'use strict';

var utils = require('../utils.js'),
    Worker = require('../models/Worker.js'),
    settings = require('../settings.js'),
    STATES = settings.STATES,
    TASK_STATE = settings.TASK_STATES,
    TASKS = settings.TASKS;

//===================================================================


/**
 * The Scheduler maintains:
 * 1. Worker Pool
 * 2. Task Queue
 * It's Controller[] of Worker[]
 * Application set its [poolSize] to change its size, [#promiseTask] to assign task,
 * [#suspend] and [#resume] to control execution
 */
module.exports = Ember.Controller.extend({

    workers: [],

    queue: [],

    state: STATES.STOPPED,

    poolSize: 4,

    script: null,

    /**
     * Primise the worker script is loaded
     * @returns {Promise}
     */
    promiseReady: function(){
        var _self = this;
        if (!this.promised) {
            this.promised = utils.promiseScript()
                .then(function(dataurl){
                    _self.set('script', dataurl);
                });
        }
        return this.promised;
    },


    /**
     * Promise to finish a task
     * @param task
     * @returns {Promise}
     */
    promiseTask: function(task){

        task.set('state', TASK_STATE.PENDING);

        switch (task.get('type')) {
            default:
                throw 'Task not implemented yet';
        }

        return new Promise(function(resolve, reject){
            task.set('callback', resolve);
        });

    },


    suspend: function(){

    },

    resume: function(){

    },

    onResize: function(){

    }.observes('poolSize'),

    onStateChange: function(){
        if (this.get('state') === STATES.STOPPED) {
            this.suspend();
        }
        else if (this.get('state') === STATES.RUNNING) {
            this.resume();
        }
    }.observes('state')

});