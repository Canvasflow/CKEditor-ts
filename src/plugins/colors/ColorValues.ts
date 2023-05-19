export const defaultColors = new Set();
[
  { label: "#1abc9c", color: "#1abc9c" },
  { label: "#2ecc71", color: "#2ecc71" },
  { label: "#3498db", color: "#3498db" },
  { label: "#16a085", color: "#16a085" },
  { label: "#1abc9c", color: "#1abc9c" },
  { label: "#27ae60", color: "#27ae60" },
  { label: "#8e44ad", color: "#8e44ad" },
  { label: "#2c3e50", color: "#2c3e50" },
  { label: "#f1c40f", color: "#f1c40f" },
  { label: "#e74c3c", color: "#e74c3c" },
  { label: "#afafaf", color: "#afafaf" },
].map((value) => {
  defaultColors.add(value);
});

export let customColorsSet = new Set();
