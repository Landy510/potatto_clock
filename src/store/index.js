import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    RightNowTime: JSON.parse(localStorage.getItem('SettingTime')) || '25:00',
    TotalTime: 0,
    Progresspercent: 0,
    CountTime: 0,
    StopToCount: false
  },
  actions: {
    StartToCount (context) {
      context.commit('StartToCount')
    },
    StopToCount (context) {
      context.commit('StopToCount')
    }
  },
  mutations: {
    StartToCount (state) {
      const wordNum = state.RightNowTime.indexOf(':', 0)
      const Minute = Number(state.RightNowTime.substr(0, wordNum)) * 60
      const Second = Number(state.RightNowTime.substr(wordNum + 1, state.RightNowTime.length))
      let MinAdd = false
      let SecAdd = false
      let TotalCountTime = Minute + Second
      state.TotalTime = TotalCountTime
      const timeoutID = setInterval(function () {
        if (state.StopToCount) {
          if (SecAdd) {
            if (MinAdd) {
              state.RightNowTime = '0' + parseInt(TotalCountTime / 60).toString() + ':' + '0' + (TotalCountTime % 60).toString()
            } else {
              state.RightNowTime = parseInt(TotalCountTime / 60).toString() + ':' + '0' + (TotalCountTime % 60).toString()
            }
          } else {
            if (MinAdd) {
              state.RightNowTime = '0' + parseInt(TotalCountTime / 60).toString() + ':' + (TotalCountTime % 60).toString()
            } else {
              state.RightNowTime = parseInt(TotalCountTime / 60).toString() + ':' + (TotalCountTime % 60).toString()
            }
          }
          clearInterval(timeoutID)
          return
        }
        TotalCountTime = TotalCountTime - 1
        state.CountTime += 1
        state.Progresspercent = state.CountTime / state.TotalTime
        if (TotalCountTime % 60 <= 9) SecAdd = true
        else SecAdd = false
        if (parseInt(TotalCountTime / 60) <= 9) MinAdd = true
        else MinAdd = false
        if (SecAdd) {
          if (MinAdd) {
            state.RightNowTime = '0' + parseInt(TotalCountTime / 60).toString() + ':' + '0' + (TotalCountTime % 60).toString()
          } else {
            state.RightNowTime = parseInt(TotalCountTime / 60).toString() + ':' + '0' + (TotalCountTime % 60).toString()
          }
        } else {
          if (MinAdd) {
            state.RightNowTime = '0' + parseInt(TotalCountTime / 60).toString() + ':' + (TotalCountTime % 60).toString()
          } else {
            state.RightNowTime = parseInt(TotalCountTime / 60).toString() + ':' + (TotalCountTime % 60).toString()
          }
        }
        if (TotalCountTime === 0) {
          state.StopToCount = true
        }
      }, 1000)
    },
    StopToCount (state) {
      state.StopToCount = true
    }
  }
})
