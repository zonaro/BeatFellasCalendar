<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col-4">
        <form>
          <div class="form-group mb-3">
            <label for="selectRatio">Tipo de Calendário</label>
            <select
              id="selectRatio"
              class="form-control"
              v-model="form.ratio"
              @change="generateTemplate"
            >
              <option disabled selected>Selecione o aspect ratio</option>
              <option value="ratio-1x1">1x1 (Quadrado, Feed)</option>
              <option value="ratio-9x16">
                9x16 (Retangulo Vertical, Stories)
              </option>
            </select>
          </div>
          <div class="form-group mb-3">
            <label for="inputWidth">Largura (em %)</label>
            <input
              min="30"
              max="100"
              type="range"
              class="form-control"
              id="inputWidth"
              aria-describedby="widthHelp"
             
              v-model="form.width"
              @change="generateTemplate"
            />
          </div>
           <label for="inputWidth2">Zoom da Lista</label>
            <input             
              type="number"
              class="form-control"
              id="inputWidth2"
              aria-describedby="widthHelp"
           
              v-model="form.width"
              onchange="document.querySelector('.event-list').style.zoom=this.value"
            />
         
          <!-- <button
            type="button"
            class="btn btn-primary"
            @click="generateTemplate"
          >
            Reiniciar Template
          </button> -->
        </form>
      </div>
    </div>
    <div class="row" id="maincontent">
      <div class="col-12">
        <CalendarioTemplate
          :template="template"
          :ratio="form.ratio"
          :style="ratioWidth"
          :key="calendarioTemplate"
        />
      </div>
    </div>
  </div>
</template>

<script>
window.j_editor = null;

import "bootstrap/dist/css/bootstrap.min.css";
// import jsoneditor from "jsoneditor/dist/jsoneditor.js";
import "jsoneditor/dist/jsoneditor.css";
import JSONEditor from "jsoneditor";
import "jquery/src/jquery.js";
import "./scss/app.scss";
import jj from "./data/template.json";

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
    window.template = JSON.parse(localStorage.getItem("template")) || jj;
    localStorage.setItem("template", JSON.stringify(window.template));

    console.log("JSON", window.template);

    window.template.date = new Date(
      window.template.year || new Date().year,
      window.template.month || new Date().month + 1 - 1
    );

    window.template.events.forEach((event) => {
      event.date = new Date(
        window.template.year,
        window.template.month,
        event.day || 1,
        event.hour || 0,
        event.minutes || 0,
        0,
        0
      );

      if (typeof event.closed === "undefined") {
        event.closed = event.date < new Date();
      }

      event.type = (event.type || "online").toString().toLowerCase();
      event.price = event.price || "Gratuito";

      if (!isNaN(event.price)) {
        event.price = `R$ ${event.price}`;
      }
      if (event.type == "fechado") {
        event.price = "";
      }
    });

    window.template.events = window.template.events.sort(function (a, b) {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    });

    if (window.j_editor == null) {
      window.j_editor = new JSONEditor(
        document.getElementById("jsoneditor"),
        {}
      );
    }
    // set json
    window.j_editor.set(window.template);

    return {
      calendarioTemplate: 0,
      form: {
        width: 100,
        ratio: "ratio-1x1",
      },
      template: window.template,
    };
  },
};
</script>
<style>
.ratio-9x16 {
  --bs-aspect-ratio: 177%;
}
</style>