type BarChartItem = {
  label: string;
  value: number;
};

type BarChartProps = {
  items: BarChartItem[];
  compactLabels?: boolean;
};

export function BarChart({ items, compactLabels = false }: BarChartProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 0);

  return (
    <div
      className="d-flex align-items-end gap-2 w-100"
      style={{ height: "200px" }}
    >
      {items.map((item, index) => {
        const height =
          maxValue === 0 ? 0 : (item.value / maxValue) * 100;
        const showLabel = !compactLabels || index % 5 === 0;

        return (
          <div
            key={item.label}
            className="d-flex flex-column align-items-center justify-content-end flex-fill h-100"
          >
            <div
              className="bg-primary rounded-top w-100"
              style={{ height: `${height}%`, minHeight: height > 0 ? "4px" : 0 }}
              title={`${Math.round(item.value / 60)} хв`}
            />
            <small className="text-secondary mt-2 text-nowrap">
              {showLabel ? item.label : ""}
            </small>
          </div>
        );
      })}
    </div>
  );
}