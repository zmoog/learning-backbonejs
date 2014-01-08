

// Load the application once the DOM is ready, using `jQuery.ready`:

$(function() {

	// var app = {};


	// Model

	window.Server = Backbone.Model.extend({

		defaults: {
			name: "advalso00",
			username: "admin",
			password: "Alfresco123",
			url: "http://alfresco00.skyteam.prv/alfresco/cmisatom"
		},

		// url: '/api/server',

		initialize: function () {
			console.log('here i am');
		}

	});

	window.ServerList = Backbone.Collection.extend({

		model: Server,

		// url: '/api/server'

	});

	// servers = new ServerList;

	// Views

	var ListView = Backbone.View.extend({

		el: $('#list'),

		events: {
			'click button#add': 'addServer'
		},

		initialize: function () {

			_.bindAll(this, 'render', 'addServer', 'appendServer'); // remember: every function that uses 'this' as the current object should be in here

			this.collection = new ServerList();
			this.collection.bind('add', this.appendServer);  // collection event binder

			this.counter = 0; // total number of items added thus far
			this.render();
		},

		render: function () {

			var self = this;      
			
			$(this.el).append("<button id='add'>Add list server</button>");
			$(this.el).append("<ul></ul>");
			
			_(this.collection.models).each(function(server) { // in case collection is not empty
				self.appendServer(server);
			}, this);

		},

	    addServer: function(){
	      this.counter++;
	      var server = new Server;
	      server.set({
	        name: server.get('name') + this.counter // modify server defaults
	      });
	      this.collection.add(server); // add server to collection; view is updated via event 'add'
	    },

	    appendServer: function(server){
	      $('ul', this.el).append("<li>"+server.get('name')+" "+server.get('url')+"</li>");
	    }

	});

	// window.listView = new ListView;
	new ListView;

});
