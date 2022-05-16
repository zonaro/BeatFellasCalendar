<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col-4">
        <form>
          <div class="form-group mb-3">
            <label for="selectRatio">Aspect Ratio</label>
            <select
              id="selectRatio"
              class="form-control"
              v-model="form.ratio"
              @change="generateTemplate"
            >
              <option disabled selected>Selecione o aspect ratio</option>
              <option value="ratio-1x1">1x1</option>
              <option value="ratio-9x16">9x16</option>
            </select>
          </div>
          <div class="form-group mb-3">
            <label for="inputWidth">Largura (em %)</label>
            <input
              min="30"
              max="100"
              type="number"
              class="form-control"
              id="inputWidth"
              aria-describedby="widthHelp"
              placeholder="Digite a largura do template"
              v-model="form.width"
              @change="generateTemplate"
            />
          </div>
          <button
            type="button"
            class="btn btn-primary"
            @click="generateTemplate"
          >
            Reiniciar Template
          </button>
        </form>
      </div>
    </div>
    <div class="row">
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
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "./scss/app.scss";

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
    return {
      calendarioTemplate: 0,
      form: {
        width: 100,
        ratio: "ratio-1x1",
      },
      template: {
        title: "AGENDA",
        titleOverlay: "#123beatboxnacional",
        date: "ABRIL/2022",
        logoBeatfellas: "logo-beatfellas.png",
        background: {
          image: "bg-beatfellas-april-2022.png",
          gradientBegin: "#00007d",
          gradientEnd: "#0d1a20",
        },
        events: {
          0: {
            style: "closed",
            title: "podcast - comédia solta",
            info: "mansão maromba - 16:00h",
            day: "02",
            type: "evento fechado",
          },
          1: {
            style: "green",
            title: "Beatmaster + Taboom",
            info: "Aplicativo Taboom - 16:00h",
            day: "09",
            type: "ONLINE - gratuito",
          },
          2: {
            style: "purple",
            title: "cavepool - show flip (part. mautari)",
            info: "Av. Eliseu de Almeida, 984 -  São Paulo - SP - 21:00h",
            day: "09",
            type: "presencial - pago",
          },
          3: {
            style: "green",
            title: "Beatmaster + Taboom",
            info: "Aplicativo Taboom - 16:00h",
            day: "10",
            type: "ONLINE - gratuito",
          },
          4: {
            style: "green",
            title: "Beatmaster + Taboom",
            info: "Aplicativo Taboom - 20:00h",
            day: "12",
            type: "ONLINE - gratuito",
          },
          5: {
            style: "green",
            title: "Beatmaster + Taboom",
            info: "Aplicativo Taboom - 20:00h",
            day: "14",
            type: "ONLINE - gratuito",
          },
          6: {
            style: "green",
            title: "Beatmaster + Taboom",
            info: "Aplicativo Taboom - 16:00h",
            day: "16",
            type: "ONLINE - gratuito",
          },
          7: {
            style: "purple",
            title: "show dani nega (part. Mautari)",
            info: "Terminal pq. dom pedro - 20:00h",
            day: "19",
            type: "presencial",
          },
          8: {
            style: "purple",
            title: "E.E. Mitiharu Tanaka - oficina de beatbox",
            info: "rua vig. Alfonso nikrake, 240 - várzea paulista  - sp - 14:00H",
            day: "29",
            type: "presencial - gratuito",
          },
          9: {
            style: "purple",
            title: "nil agra + comédia solta (part. beatfellas)",
            info: "Rua Domingos de Morais, 348 - São Paulo - SP - 19:00h",
            day: "30",
            type: "PRESENCIAL - pago",
          },
          10: {
            style: "purple",
            title: "BURACO - ROOM - show kaizonaro",
            info: "Rua martins fontes, 185 - são paulo - sp - 20:00h",
            day: "30",
            type: "PRESENCIAL - pago",
          },
        },
      },
    };
  },
};
</script>
<style>
.ratio-9x16 {
  --bs-aspect-ratio: 177%;
}
</style>