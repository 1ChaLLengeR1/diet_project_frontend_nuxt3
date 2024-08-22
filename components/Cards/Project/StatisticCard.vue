<template>
  <v-card class="w-full" color="surface-variant" max-width="100%" hover>
    <v-card-item>
      <v-card-title>
        {{ $t("lists.statistics.week", { week: week }) }}
      </v-card-title>

      <v-card-subtitle class="text-xl">
        {{ $t("lists.statistics.startWeight", { startWeight: startWeight }) }}
      </v-card-subtitle>
      <v-card-subtitle>
        {{ $t("lists.statistics.endWeight", { endWeight: endWeight }) }}
      </v-card-subtitle>
      <v-card-subtitle v-if="downWeight <= 0">
        {{
          $t("lists.statistics.downWeight", {
            downWeight: formatWeight(downWeight),
          })
        }}
      </v-card-subtitle>
      <v-card-subtitle v-else>
        {{
          $t("lists.statistics.upWeight", {
            upWeight: formatWeight(downWeight),
          })
        }}
      </v-card-subtitle>
      <v-card-subtitle>
        {{ $t("lists.statistics.sumKg", { sumKg: sumKg }) }}
      </v-card-subtitle>
      <v-card-subtitle>
        {{ $t("lists.statistics.avgKg", { avgKg: avgKg }) }}
      </v-card-subtitle>
      <v-card-subtitle>
        {{ $t("lists.statistics.sumKcal", { sumKcal: sumKcal }) }}
      </v-card-subtitle>
    </v-card-item>

    <div
      class="w-full flex"
      v-for="(trainingItem, index) in training"
      :key="index"
    >
      <div class="w-full flex flex-col gap-1 p-3">
        <p
          v-for="(training, subIndex) in trainingItem.data"
          :key="subIndex"
          class="text-white text-md"
        >
          {{
            $t("lists.statistics.training", {
              type: findTypeTraining(training.type),
              currecnt: training.currecnt,
              sumKcal: training.sumKcal,
              time: training.time,
            })
          }}
        </p>
      </div>
    </div>
    <v-card-item>
      <v-card-subtitle>
        {{ $t("lists.statistics.sumTime", { sumTime: sumTime }) }}
      </v-card-subtitle>
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// helpers
import { findTypeTraining } from "./../../../storage/common/finds";
import { formatWeight } from "./../../../storage/common/formaters";

export default defineComponent({
  props: {
    week: {
      type: Number,
      required: true,
    },
    startWeight: {
      type: Number,
      required: true,
    },
    endWeight: {
      type: Number,
      required: true,
    },
    downWeight: {
      type: Number,
      required: true,
    },
    sumKg: {
      type: Number,
      required: true,
    },
    avgKg: {
      type: Number,
      required: true,
    },
    sumKcal: {
      type: Number,
      required: true,
    },
    training: {
      type: Array as () => Array<{
        data: Array<{
          type: string;
          currecnt: number;
          sumKcal: number;
          time: string;
        }>;
      }>,
      required: true,
    },
    sumTime: {
      type: String,
      required: true,
    },
  },
  setup() {
    return { findTypeTraining, formatWeight };
  },
});
</script>

<style scoped></style>
