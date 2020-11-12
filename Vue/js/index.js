//declare array where items from database upon fetching will be stored
var citizens = []; //index list
var citizenselected = []; //edit and delete


//define sub-components and templates. Use AXIOS for REST API consumption
var List = Vue.extend({
    template: '#citizens-list',
    data: function () {
        return { citizens: [] };
    },
    created: function () {
        this.fetchItems();
    },
    methods: {
        fetchItems() {
            let uri = 'http://localhost:44375/api/citizen/citizendetails';
            axios.get(uri).then((response) => {
                this.citizens = response.data;
            });
        }
    }
});

var Addcitizen = Vue.extend({
    template: '#citizen-add',
    data: function () {
        return {
            citizen: {}
        }
    },
    methods: {
        addCitizen() {
            let uri = 'http://localhost:44375/api/citizen/InsertCitizenDetails';
            axios.post(uri, this.citizen).then((response) => {
                console.log(response.data)
                router.push('/');
            });

        }
    }
});

var citizenEdit = Vue.extend({
    template: '#citizen-edit',
    data() {
        return {
            citizenselected: {}
        }
    },
    created: function () {
        this.getItem();
    },

    methods: {
        getItem() {
            let uri = 'http://localhost:44375/api/citizen/GetCitizenById';
            axios.get(uri, { params: { citizen_id: this.$route.params.citizen_id, citizen_name: this.$route.params.citizen_name } })
                .then((response) => {
                    this.citizenselected = response.data;
                });
        },
        updatecitizen: function () {
            {
                let uri = 'http://localhost:44375/api/citizen/UpdateCitizenDetails';
                axios.put(uri, this.citizenselected).then((response) => {
                    console.log(response.data)
                    router.push('/');
                });
            };
        }
    }
});

//when using axios.delete, define params and content-type to avoid error 415 (unsupported media type)
var citizenDelete = Vue.extend({
    template: '#citizen-delete',
    data() {
        return {
            citizenselected: {}
        }
    },
    created: function () {
        this.getItem();
    },
    methods: {
        getItem() {
            let uri = 'http://localhost:44375/api/citizen/GetCitizenById';
            axios.get(uri, { params: { citizen_id: this.$route.params.citizen_id, citizen_name: this.$route.params.citizen_name } })
                .then((response) => {
                    this.citizenselected = response.data;
                });
        },
        deletecitizen: function () {
            var json = this.citizenselected;
            let uri = 'http://localhost:44375/api/citizen/Delete';
            axios.delete(uri,
                { params: { citizen_id: this.$route.params.citizen_id, citizen_name: this.$route.params.citizen_name }, headers: { "ContentType": "application/json" } }).then((response) => {
                    console.log(response.data)
                    router.push('/');
                });
        }
    }
});

//create router instance and define routes array
var router = new VueRouter({
    routes: [{ path: '/', component: List },
    { path: '/citizen-add', component: Addcitizen },
    { path: '/citizen/:citizen_id/:citizen_name/citizen-edit', component: citizenEdit, name: 'citizen-edit' },
    { path: '/citizen/:citizen_id/:citizen_name/citizen-delete', component: citizenDelete, name: 'citizen-delete' }
    ]
});

//create and mount root instance. Ensure that router is injected with router option
//to make the whole app router-aware
new Vue({
    el: '#app',
    router: router,
    template: '<router-view></router-view>'
});