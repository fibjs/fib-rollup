import Vue from 'vue/dist/vue.esm'
import React from 'react'

const vm = new Vue({
    data () {
        return {}
    },

    created () {
        console.log('Vue created')
    }
})

export default function () {
    return {
        Vue,
        React
    };
}