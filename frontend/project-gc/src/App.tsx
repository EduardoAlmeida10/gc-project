import { useEffect, useState } from "react";
import { api } from "./api/api";

interface Item {
  _id: string;
  name: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
  async function loadItems() {
    const response = await api.get("/items");
    console.log("TIPO:", typeof response.data);
    console.log("DATA:", response.data);
    setItems(response.data as any);
  }

  loadItems();
}, []);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name) return;

    await api.post("/items", { name });
    setName("");

    const response = await api.get<Item[]>("/items");
    setItems(response.data);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Itens</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do item"
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
