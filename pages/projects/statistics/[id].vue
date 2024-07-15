<template>
  <div class="w-full p-3">
    <div
      v-if="statisticsStore.collection.length > 0"
      class="w-full flex flex-col gap-3"
    >
      <StatisticCard
        v-for="(item, indexM) in statisticsStore.collection"
        :key="indexM"
        :week="item.week"
        :startWeight="item.startWeight"
        :endWeight="item.endWeight"
        :downWeight="item.downWeight"
        :sumKg="item.sumKg"
        :avgKg="item.avgKg"
        :sumKcal="item.sumKcal"
        :training="item.training"
        :sumTime="item.sumTime"
      />
    </div>
    <div v-else>{{ $t("lists.statistics.noStatistics") }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// stores
import { StatisticsStore } from "./../../../storage/statistics/statistics";

// componets
import StatisticCard from "./../../../components/Cards/Project/StatisticCard.vue";

export default defineComponent({
  components: {
    StatisticCard,
  },
  setup() {
    const statisticsStore = StatisticsStore();
    const route = useRoute();
    const projectId = ref<string>(route.params.id as string);

    const runActions = async () => {
      await statisticsStore.apiFetch(projectId.value);
    };

    onMounted(async () => {
      await runActions();
    });

    return { statisticsStore };
  },
});
</script>
