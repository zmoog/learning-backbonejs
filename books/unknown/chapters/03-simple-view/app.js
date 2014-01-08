
$(function() {

	var Message = Backbone.Model.extend({

	    // Default attributes for the message item.
	    defaults: function() {
	      return {
	        text: "empty ..."
	      };
	    },		

	});

	var MessageList = Backbone.Collection.extend({

		model: Message,

		// Save all of the todo items under the `"todos-backbone"` namespace.
	    localStorage: new Store("todo")

	    // url: 'api/message'
	});


	// Create our global collection of **Messages**.
	window.Messages = new MessageList;


	var MessageView = Backbone.View.extend({

		tagName: "li",

		// template: _.template($('#item-template').html()),

		events: {
			"dblclick" : function() { console.log('doh') }
		},

		initialize: function() {
			//this.listenTo(this.model, 'change', 'render');
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {

			console.log('rendering MessageView')

			// this.$el.html(this.template(this.model.toJSON()));
			this.$el.html('<li>'+this.model.get('text') +'</li>')
			return this;
		}

	});

	// var MessageListView = Backbone.View.extend({
	// 
	// 	events: {
	// 		"click #add-message": "addMessage"
	// 	},
	// 
	// 	initialize: function (argument) {
	// 		console.log('MessageListView is ready');
	// 	},
	// 
	// 	addMessage: function () {
	// 		console.log('addMessage called')
	// 	}
	// 
	// });

	// -------------------------------------------
	// The Application
	// -------------------------------------------

	var AppView = Backbone.View.extend({

		el: $("#theapp"),

		events: {
			"click #add-message": "addMessage"
		},

		initialize: function() {
			this.listenTo(Messages, 'add', this.addOne);
		},

		addMessage: function() { 

			console.log('addMessage'); 
			
			Messages.create({text: 'OSGi Is Here To Stay' });
		},

		addOne: function(message) {

			var view = new MessageView({model: message});
			
			this.$("#message-list").append(view.render().el);
		}


	});

	
	// Finally, we kick things off by creating the **App**.
	window.App = new AppView;

})