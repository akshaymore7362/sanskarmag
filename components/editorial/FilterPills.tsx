type Props = {
  items: string[];
};

export function FilterPills({ items }: Props) {
  return (
    <div className="filter-pills" aria-label="Editorial filters">
      {items.map((item, index) => (
        <button type="button" className={index === 0 ? "active" : ""} key={item}>{item}</button>
      ))}
    </div>
  );
}
