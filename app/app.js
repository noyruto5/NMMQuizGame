import Vue from "nativescript-vue";
import VueDevtools from 'nativescript-vue-devtools'
import 'nativescript-localstorage';

Vue.use(VueDevtools, { host: '192.168.0.9'})

import "./assets/css/main.css";
import Home from "./components/Home";

new Vue({

    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();