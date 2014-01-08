// Define a Todo  Model
var Todo = Backbone.Model.extend({
  // Default todo attribute value
  defaults: {
    title: '',
    completed: false
  }
});

var TodoView = Backbone.View.extend({

  tagName: 'li',

  tpl: _.template($('#item-template').html()),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },

  initialize: function() {
    this.$el = $('#todo');
  },

  render: function() {
    this.$el.html(this.tpl(this.model.toJSON()));
    this.input = this.$('.edit');
  },

  edit: function() {
    // executed when todo label is double clicked
    console.log('edit');
  },

  close: function() {
    // executed when todo loses focus
    console.log('close');
  },

  updateOnEnter: function() {
    console.log('updateOnEnter');
  }

});

var myTodo = new Todo({
  title: 'Check the attributes property of the logged models in the console'
});

// create a view for a todo
var todoView = new TodoView({model: myTodo});
