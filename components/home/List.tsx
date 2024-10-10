

const List = () => {
  if (data) {
    return (
      {data.presets.map((preset)=>(
        <h1>{preset.title}</h1>
      ))}
    );
  } else {
    return (
      <h1>レストランが見つかりませんでした。</h1>
    )
  }
}

export default List;