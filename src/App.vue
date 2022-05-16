<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col-4">
        <form>
          <div class="form-group mb-3">
            <label for="selectRatio">Tipo de Calendário</label>
            <select id="selectRatio" class="form-control" v-model="form.ratio" @change="generateTemplate">
              <option disabled selected>Selecione o aspect ratio</option>
              <option value="ratio-1x1">1x1 (Quadrado, Feed)</option>
              <option value="ratio-9x16">9x16 (Retangulo Vertical, Stories)</option>
            </select>
          </div>
          <div class="form-group mb-3">
            <label for="inputWidth">Largura (em %)</label>
            <input min="30" max="100" type="range" class="form-control" id="inputWidth" aria-describedby="widthHelp"
              placeholder="Digite a largura do template" v-model="form.width" @change="generateTemplate" />
          </div>
          <button type="button" class="btn btn-primary" @click="generateTemplate">
            Reiniciar Template
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <CalendarioTemplate :template="template" :ratio="form.ratio" :style="ratioWidth" :key="calendarioTemplate" />
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "./scss/app.scss";
import template from "./data/template.json";

import CalendarioTemplate from "./components/CalendarioTemplate.vue";

export default {
  name: "App",
  components: {
    CalendarioTemplate,
  },

  props: {
    templateData: Object,
  },

  methods: {
    
    generateTemplate() {
      this.calendarioTemplate += 1;
    },
  },

  computed: {
    ratioWidth() {
      return {
        width: `${this.form.width}%`,
      };
    },
  },

  data() {

    template.date = new Date(template.year, template.month);
    template.events.forEach(element => {
      element.date = new Date(template.year, template.month, element.day, element.hour, element.minutes, 0, 0);
      element.closed = element.date < new Date();
    });

    template.events.sort(function (a, b) {

      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    });

    console.log("JSON", template);


    return {
      calendarioTemplate: 0,
      form: {
        width: 100,
        ratio: "ratio-1x1",
      },
      template: template,
    };
  },
};
</script>
<style>
.ratio-9x16 {
  --bs-aspect-ratio: 177%;
}
</style>