<template>
  <div :class="'ratio ' + ratio">
    <div class="d-grid text-center pb-3" :style="templateBackground">
      <div class="position-absolute background-overlay" :style="templateBackgroundOverlay"></div>
      <header class="p-4" :style="headerBackgroundOverlay">
        <div>
          <h2 class="mb-0" v-fit-text="{ setLineHeight: true }">
            {{ template.titleOverlay }}
          </h2>
        </div>
        <div class="w-50 mx-auto">
          <h1 class="mb-0 skewx" v-fit-text="{ setLineHeight: true, withMarginTop: true }">
            {{ template.title }}
          </h1>
        </div>
      </header>
      <main class="d-flex justify-content-center mb-4 mx-auto px-5 overflow-hidden"
        :class="ratio === 'ratio-1x1' ? '' : 'flex-column'" style="width: 100%">
        <aside class="text-aside monthname bf-yellow-color py-5">
          <div>
            <span v-fit-text="{
              byHeight: ratio === 'ratio-1x1' ? true : false,
              setLineHeight: true,
            }">{{
    [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ][template.month - 1]
}}/{{ template.year }}</span>
          </div>
        </aside>
        <section class="flex-grow-1 ms-4">
          <ul class="event-list list-group justify-content-center" v-fit-list="{
            numberOfItems: Object.keys(this.template.events).length,
          }">
            <li v-for="event in template.events" :key="event" :data-closed="event.closed"
              :class="'event-' + event.type.toString().toLowerCase()" class="
                event-item
                list-unstyled
                d-flex
                align-items-center
                justify-content-center
                text-start
                mb-2
              ">
              <span class="event-day skewx" style="font-family: 'Days One', sans-serif">{{
                  event.day.toString().padStart(2, "0")
              }}</span>
              <p class="event-data flex-grow-1 m-0">
                <span class="event-type d-block"> {{ event.price ? event.type + ' - ' + event.price : event.type
                }}</span>
                <span class="event-title d-block">{{ event.title }}</span>
                <span class="event-info d-block">{{ event.location || event.app }} -
                  {{ event.hour.toString().padStart(2, "0") }}:{{
                      event.minutes.toString().padStart(2, "0")
                  }}H</span>
              </p>
            </li>
          </ul>
        </section>
      </main>
      <footer class="pb-4 px-5">
        <img :src="require('../assets/' + template.logoBeatfellas)" alt="BeatFellas Logo" class="w-50" />
      </footer>
    </div>
    <div v-if="ratio === 'ratio-9x16'" class="gui-instagram" :style="guiInstagram"></div>
  </div>
</template>
<script>
export default {
  props: {
    template: Object,
    ratio: String,
  },

  data() {
    return {
      guiInstagram: {
        "background-image": "url(" + require("../assets/gui-overlay.png") + ")",
      },
      templateBackground: {
        "background-image":
          "linear-gradient(" +
          this.template.background.gradientBegin +
          " 50%, " +
          this.template.background.gradientEnd +
          ")",
        "grid-template-rows": "auto 1fr auto",
      },
      templateBackgroundOverlay: {
        "background-image":
          "linear-gradient(" +
          this.template.background.gradientBegin +
          " 50%, " +
          this.template.background.gradientEnd +
          "), url(" +
          require("../assets/" + this.template.background.image) +
          ")",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-blend-mode": "multiply",
        opacity: ".25",
      },
      headerBackgroundOverlay: {
        "background-image":
          "linear-gradient(" +
          this.template.background.gradientBegin +
          " 50%, transparent)",
      },
    };
  },
};
</script>
<style scoped>
body {
  font-family: "Archivo Black", sans-serif;
}

header h2 {
  text-transform: uppercase;
  color: #ffff00;
  filter: invert(1);
}

header h1 {
  font-size: 4rem;
  margin-top: -2rem;
}

.ratio-1x1 .text-aside {
  transform: rotate(180deg);
  writing-mode: vertical-lr;
  text-orientation: mixed;
}

.text-aside {
  font-family: "Days One", sans-serif;
}

.bf-yellow-color {
  color: #ffff00;
}

.background-overlay {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.background-overlay~* {
  z-index: 1;
}

.skewx {
  -moz-transform: skewx(10deg);
  -webkit-transform: skewx(10deg);
  -o-transform: skewx(10deg);
  -ms-transform: skewx(10deg);
  transform: skewx(10deg);
}

.event-list {
  margin-bottom: -0.5rem;
  min-height: 100%;
}

[data-closed="true"] {
  opacity: 0.55;
  text-decoration: line-through;
  color: gray;
}

.event-item:not([data-closed="true"]) {
  color: #ffffff;
}

.event-item:not([data-closed="true"]) .event-day {
  color: #ffff00;
}

.event-presencial .event-type {
  color: #ff00ff;
}

.event-online .event-type {
  color: #00ff00;
}

.event-fechado .event-type {
  color: #ff0000;
}

.event-day {
  margin-right: 0.75rem;
  text-align: right;
}

.event-data {
  text-transform: uppercase;
}

.event-type {
  font-family: "Archivo Black", sans-serif;
}

.event-title {
  font-family: "Baloo", sans-serif;
  letter-spacing: 0;
}

.event-info {
  font-family: "GlacialIndifference";
}

.monthname {
  text-transform: uppercase;
}

.gui-instagram {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-size: cover;
  background-repeat: no-repeat;
}

.ratio.ratio-9x16 header:before {
  content: "";
  width: 100%;
  height: 100%;
  display: block;
  padding-top: 2rem;
}

.ratio.ratio-9x16 footer {
  margin-bottom: 12rem;
}
</style>