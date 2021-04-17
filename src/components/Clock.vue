<template>
  <div>
    <div class="row">
      <div class="col-md-8 border border-dark">
        <p class="mb-0">{{ TimeProgress }}</p>
        <section>
          <figure class="clock">
            <svg class="progress-ring" height="400" width="400">
              <circle r="150" cx="200" cy="200" fill="transparent" stroke-width="8" stroke-dasharray="942" stroke-dashoffset="0" stroke="white"></circle>
              <circle r="150" cx="200" cy="200" fill="transparent" stroke-width="8" class="progress-ring__circle" :style="{ strokeDashoffset: percent }"></circle>
            </svg>
          </figure>
        </section>
        <button class="btn btn-warning" @click="startToCount">開始計時</button>
        <button class="btn btn-danger" @click="stopToCount">停止計時</button>
      </div>
      <div class="col-md-4">
        <div class="input-group mb-3 border-bottom">
          <input type="text" class="form-control border-0" placeholder="Add something new" aria-label="Recipient's username" aria-describedby="basic-addon2">
          <div class="input-group-append d-flex align-items-center text-center add_btn">
            <font-awesome-icon class="text-primary" :icon="['fas', 'plus']" />
          </div>
        </div>
        <div class="input-group mb-3 border-bottom">
          <input type="text" class="form-control border-0" placeholder="請輸入番茄鐘時間(分鐘)" aria-label="Recipient's username" aria-describedby="basic-addon2" @change="SettotalTime">
          <div class="input-group-append d-flex align-items-center text-center add_btn">
            <font-awesome-icon class="text-primary" :icon="['fas', 'plus']" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clock',
  data () {
    return {
      ProgressTotal: 0
    }
  },
  methods: {
    startToCount () {
      this.$store.state.StopToCount = false
      this.$store.dispatch('StartToCount')
    },
    SettotalTime (e) {
      if (e.target.value === '') {
        return
      }
      if (e.target.value <= 9) {
        localStorage.setItem('SettingTime', JSON.stringify('0' + e.target.value.toString() + ':00'))
        this.$store.state.RightNowTime = '0' + e.target.value.toString() + ':00'
      } else {
        localStorage.setItem('SettingTime', JSON.stringify(e.target.value.toString() + ':00'))
        this.$store.state.RightNowTime = e.target.value.toString() + ':00'
      }
    },
    stopToCount () {
      this.$store.dispatch('StopToCount')
    }
  },
  computed: {
    TimeProgress () {
      return this.$store.state.RightNowTime
    },
    percent () {
      const offset = this.ProgressTotal - this.$store.state.Progresspercent * this.ProgressTotal
      return offset
    }
  },
  mounted () {
    const circle = document.querySelector('.progress-ring__circle')
    const radius = circle.r.baseVal.value
    const circumference = radius * 2 * Math.PI
    circle.style.strokeDasharray = circumference
    this.ProgressTotal = circumference
  }
}
</script>

<style scoped lang="scss">
  .add_btn:hover {
    cursor: pointer;
  }
  .clock {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .progress-ring {
  }
  .progress-ring__circle {
    transition: 0.5s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke: red;
  }
</style>
