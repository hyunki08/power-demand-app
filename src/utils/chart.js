export const TimeLabels = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];

export const createData = (labels) => ({
  labels: labels,
  datasets: [],
});

export const createDataset = (label, data) => ({
  label: label,
  data: data,
  borderColor: createRandomColor(),
  tension: 0.25,
});

export const createRandomColor = () =>
  "rgba(" +
  Math.random() * 256 +
  ", " +
  Math.random() * 256 +
  ", " +
  Math.random() * 256 +
  ", 0.5)";
