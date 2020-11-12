//declare array where items from database upon fetching will be stored
var citizens = [];

//define sub-components and templates. Use AXIOS for REST API consumption
var List = Vue.extend({
    template: '#citizens-list',
    data: function () {
      return {citizens: [] };
    },
    created: function()
        {
            this.fetchItems();
        },
    methods: {
          fetchItems()
          {
            let uri = 'http://localhost:44375/api/citizen/citizendetails';
            axios.get(uri).then((response) => {
                this.citizens = response.data;
            });
          }
      }
  });
  
  //create router instance and define routes array
  var router = new VueRouter({ mode: 'history', 
    routes: [{path: '/', component: List}
  ]});
  
  //create and mount root instance. Ensure that router is injected with router option
  //to make the whole app router-aware
  new Vue({
    el: '#app',
    router: router,
    template: '<router-view></router-view>'
  });