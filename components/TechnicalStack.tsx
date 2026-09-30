const groups = [
  { title: 'Programming', items: ['Python', 'Java', 'C'] },
  { title: 'Data analytics', items: ['Pandas', 'NumPy', 'Data cleaning', 'EDA', 'KPI analysis', 'Customer & sales analysis', 'Statistical analysis'] },
  { title: 'Machine learning', items: ['Classification', 'Random Forest', 'XGBoost', 'LightGBM', 'CatBoost', 'Extra Trees', 'SVM', 'Feature engineering', 'Model evaluation', 'Threshold tuning'] },
  { title: 'Computer vision', items: ['YOLO', 'Object detection', 'Image preprocessing', 'Dataset preparation', 'Satellite image enhancement'] },
  { title: 'Data visualization', items: ['Matplotlib', 'Seaborn', 'Geographic visualization', 'Map-based visualization'] },
  { title: 'Data, geospatial & optimization', items: ['SQL', 'SQLite', 'Google Earth Engine', 'Sentinel-1/2', 'KML/GIS', 'Git', 'IBM CPLEX / OPL'] },
] as const;

export function TechnicalStack() {
  return <div className="technical-stack" aria-label="Technical skills by category">
    {groups.map((group, index) => <article key={group.title}>
      <div><span>{String(index + 1).padStart(2, '0')}</span><h3>{group.title}</h3></div>
      <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
    </article>)}
  </div>;
}
