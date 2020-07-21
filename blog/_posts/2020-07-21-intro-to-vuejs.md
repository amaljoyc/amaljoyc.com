---
title: "Introduction to Vue.js"
date: 2020-07-21
tags: 
  - javascript
  - vuejs
---

Here is a brief introduction to Vue.js (version 2). This is by no means a complete documentation, nor it covers all the concepts. However, it provides a quick overview and introduces the general and basic concepts used in Vue.js. Although Vue can be used with Javascript or Typescript, the syntax used here follows the Javascript language and uses version 2 of Vue.js. You can also find an additional section at the end of this article which shows how a basic Vue app can be written in Typescript.

To dig deep and know more, you can find a more detailed documentation on the [official Vue.js guide](https://vuejs.org/v2/guide/)

### `HelloWorld`

The `HelloWorld` app is as simple as

```javascript
<div id="app">
  {{ title }}
</div>
```

```javascript
var app = new Vue({
  el: '#app',
  data: {
    title: 'HelloWorld'
  }
})
```
Here we use string interpolation which is defined using ```{{ title }}``` on the html template to display the `title` variable defined in the javascript.

### `Vue directives`
Vue provides various directives which are listed below,
- `v-on` -> to listen to an event (from html template to vuejs). It can be replaced with a shorthand -> `@`
- `v-bind` -> to bind (from vuejs to html). It can be replaced with a shorthand -> `:`
- `v-model` -> for two way binding (from html to vuejs and vice-versa)
- `v-if` -> this can be used to provide conditional expressions.
- `v-else` -> is the else condition when the v-if condition is false.
- `v-else-if` -> to provide further else-if conditions
- `v-show` -> similar to v-if, but useful when you don't want to detach the element (it would be hidden with css)
- `v-for` -> for looping
- `ref` -> can be used to get some value from an html element.
- `v-text` -> to put just text
- `v-html` -> to put valid html (beware of using this with cross site scripting and malicious attack).

Note: Custom directives can be created using `Vue.directive()` method.

### `Vue instance`
```javascript
new Vue({
    el: '#sampleid',
    props: {

    },
    data: {

    },
    methods: {

    },
    computed: {

    },
    watch: {

    },
    components: {

    },
    render: {

    },
    directives: {

    },
    filters: {

    },
    mixins: {

    }
})
```

#### `data`
- It is the private memory of each component where you can store any variables you need

#### `props`
- props are how you pass this data from a parent component down to a child component

#### `computed`
- The functions inside `computed` (or computed properties as they are called) gets called by itself, as the properties used inside changes. 
- They are calculations that will be cached based on their dependencies and will only update when needed.
- More optimal than `watch`.
- Need to run synchronously.

#### `watch`
- Can be used when `computed` is not possible.
- The property name of a `watch` must match one of the properties used inside the data field.
- This is another way to check if something changed on a data property and perform some action in response to that change.
- Can also run asynchronously (so can use any async methods inside the logic)

#### `components`
- These are used to define local components instead of a single global component.
- For global component definition, we can use `Vue.component()` method.

#### `render`
- Useful for adding a vuejs template (like rendering an App.vue file)

#### `directives`
- To register local directives

### `Vue Component`
- Used for reusing components or parts.
- When you write a vue component, the data must be a function instead of just a property (this is to make sure state is different in each copy of component).
- `el` property doesn't work inside a component.
- The first arg of `Vue.component()` is tag name, 2nd arg is a vue instance.

### `Component Communication`
- `Parent -> Child` communication is done via props. Parent would pass the value to the props in the component tag and child component can use it as a property in its template.
- Child can communicate back to parent via,
    1. `custom events` - ie, child will create and $emit a custom event, which the parent can listen to and then use the event data as `$event`.
    2. `callbacks` - ie, parent will pass the callback function again as a param to the child (of type Function), and then child can call this callback function when needed to send some event back.
- Generally speaking, one child to another child communication is not possible directly, it has to be routed via the parent, `child1 -> parent -> child2`
    - Since this can get quiet complex when there are so many children, we can use an eventBus (which is a Vue instance) and pass the custom events via this eventBus directly from child1 -> child2
    - for bigger application, `Vuex` could be used as the eventStore instead of the eventBus

### `Passing content with slot`
- By using `<slot></slot>` in child component template.
- Parent can pass in any html inside the component tag of child.
- The styling, the javascript, vue and every other data processing like string interpolation is applied to the html by the `parent and not the child`.

### `Using multiple named slot`
- On child, you specify the `name`
```javascript
<slot name="title"></slot>
<slot name="content"></slot>
```
- on parent, you specify the `slot`
```javascript
<h1 slot="title">My Title</h1>
<p slot="content">My Content</p>
```
- Unnamed slot will be considered as the default slot.

### `Dynamic component in template`
- Done using tag `<component :is="selectedComponent"></component>` where `selectedComponent` is a data property that holds the name of the component as string.
- By default when you navigate from one component1 to another component2, the component1 is destroyed and component2 is created new. If you want to avoid this behavior, we can use,
    - keep alive support using the tag `<keep-alive></keep-alive>` and you put your component tag inside this keep-alive tag.

### `Filters and Mixins`
- Filters are used for transforming a value. In template, it can be used with pipe symbol and also supports multiple piping as given below,
```javascript
{{ title | mySpecialFilter1 | myFilter2 }}
```
- Filters are not very performant, so it is not advised to use it for complex filtering, instead the filtering can be achieved by computed and JS filter method. 
- Mixins are a way to mix other data or methods or computed etc stored in a global .js file to be imported and mixed into the current Vue instance
    -> we use the `mixins` propery in vue instance to achieve the same, it takes a array of values.
- When importing mixins, the local component where the mixin was imported has the last word, meaning it can override if same things are defined in mixin as well as local component or Vue instance.

### `Axios`
- Alternative for `vue-resource`.
- Useful to communicate with a backend REST API service.
- eg, is given below
```javascript
axios.post(url, data, config)
    .then(response => console.log(response))
    .catch(error => console.log(error))
```
- Similarly you have `axios.get()`, `axios.put()` etc.
- `axios.create()` will create a new custom instance of axios. Instead if you use axios directly, you share the same global object whole over in your application.

### `vue-router`
- Used for making SPA (Single Page Application)
- Include it using `Vue.use(VueRouter)`
- Then create a new instance of VueRouter by passing in the routes as arg
```javascript
const router = new VueRouter({routes})
```
- The `routes` arg above is made like given below,
```javascript
const routes = [
    {path: '', component: Home},
    {path: '/user', component: User},   
]
```
- Then the VueRouter instance is added into the vue instance,
```javascript
new Vue({
    el: '#app',
    router
})
```
- Finally, you need to add a built in tag given below into your template section to render/place the routes in html.
```javascript
<router-view></router-view>
```
- Use the given below tag for adding router links to your app (this is slightly different from html anchor tag href, that it doesn't send request to server if the mode is `hash`)
```javascript
<router-link to="/">Home</router-link>
```
- Instead of doing routing in html template, if you want to make routing from JS script, you can use 
```javascript
this.$router.push('/')
```
- or use named routed instead of string route path
```javascript
this.$router.push({
    name: 'home'
})
```

### `Lazy loading routes`
- To make sure not all routes are loaded in the beginning, but only when you click on them.
- Every bundler you use will handle this differently. So if you are using webpack, you need to write some custom code to not import all modules in the beginning of the script, but resolve later on.

### `Vuex - for state management`
- Vuex store is created and integrated into root Vue instance as given below,
```javascript
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: { // -> state is a keyword here
        counter: 0
    },
    getters: { // -> getters is a keyword here
        doubleCounter: state => {
            return state.counter * 2
        }
    },
    mutations: { // -> keyword; its like a setter; only support sync
        increment: (state, payload) => {
            // payload is NOT a keyword and can be a primitive or an object
            console.log(payload)
            state.counter++
        }
    },
    actions: { // -> to provide async behavior for mutations
        increment: (context, payload) => {
            // payload is NOT a keyword and can be a primitive or an object
            console.log(payload)
            // here you commit your mutation method
            setTimeout(() => {
                context.commit('increment', payload)
            }, 1000)
        }
    },
    modules: {
        // to include externally defined store constant modules into this central store
    }
})

new Vue({
    el: '#app'
    store,
    render: h => h(App)
})
```

- To access a store value, or getter, or commit a mutation, or dispatch an action
```javascript
this.$store.state.counter
this.$store.getters.doubleCounter
this.$store.commit('increment', payload) -> this is how mutation methods are called
this.$store.dispatch('increment', payload) -> this is how action methods are called
```

- Alternatively `mapGetters` can be used to get access to getters
```javascript
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'doubleCounter'
            ])
    } 
}
```
and then `doubleCounter` above can be used directly in template as ```{{doubleCounter}}```

- Similarly, `mapMutations` can be used to get access to all mutation methods
```javascript
import {mapMutations} from 'vuex'
export default {
    methods: {
        ...mapMutations([
            'increment'
            ])
    }
}
```
- Mutations have to be `synchronous`, otherwise the state change doesn't work properly.
- For `asynchronous` behavior, you can use `actions` to commit mutations. When using actions, the commit to mutation will wait until the async action finishes. Once the async action finishes, the commit will happen immediately thereby changing the state with mutation. That means, the changes to the state is still `synchronous`.

- Similarly, `mapActions``can be used to get access to all actions methods
```javascript
import {mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions([
            'increment'
        ])
    }
}
```

- If you want to also pass a payload to your mutation or action, you can do that as given below when calling the mutation or action method in a template
```javascript
<button @click="increment(10)"></button> // --> this will pass 10 as the payload
<button @click="increment({key: 'value'})"></button> // --> this will pass an object as the payload
```

### `Useful npm commands`
Now to start your first project, find below some npm command references.

- `npm install -g vue-cli` -> to install vue-cli which is a command line tool to create Vue projects
- `vue init webpack-simple my-first-app` -> create a sample project using vue-cli, where my-first-app is a sample project name.
- `npm install` -> to install all dependencies in package.json
- `npm run dev` -> to run the app
- In case if npm run does nothing, verify this -> `npm config get ignore-scripts` -> if this is true, then run following -> `npm config set ignore-scripts false`
- `npm run build` -> build in order to deploy the app in prod

### `Vue with TypeScript`
sample export of vue instance with a Typescript class

```typescript
@Component
export default class HelloWorld extends Vue {
// @Prop is used to represent `props`    
    @Prop() private msg!: String
    
// below are the `data` properties
    firstName = 'Hello'
    lastName = 'World'
    counter = 0

// get methods are used to represent `computed` properties
    get fullName(): String {
        return this.fristName + ' ' + this.lastName
    }

// methods are used to represent `methods`
    incrementCounter() {
        this.counter++
    }
}
```

