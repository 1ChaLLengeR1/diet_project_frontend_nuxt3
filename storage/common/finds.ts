export function findIds(collection: any[]): Array<string> {
  const ids: string[] = [];

  collection.forEach((item: any) => {
    ids.push(item.id);
  });

  return ids;
}

export function findTypeTraining(type: string): string {
  const { $i18n } = useNuxtApp();

  const options: { label: string; value: string }[] = [
    { label: $i18n.t("selects.typeTraining.bike"), value: "bike" },
    { label: $i18n.t("selects.typeTraining.run"), value: "run" },
    { label: $i18n.t("selects.typeTraining.swim"), value: "swim" },
    { label: $i18n.t("selects.typeTraining.hike"), value: "hike" },
    { label: $i18n.t("selects.typeTraining.gym"), value: "gym" },
  ];

  const findTraining = options.find((item) => item.value === type);
  if (findTraining !== undefined) {
    return findTraining.label;
  }

  return type;
}
