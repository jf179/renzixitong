import store from '@/store'
export default {
  methods: {
    checkButton (str) {
      return store.getters.roles.points.includes(str)
    }
  }
}
