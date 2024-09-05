import { useState } from "react";
import Result from "./components/result";
import Layout from "./layout";

export default function Index() {
  const [ingredients, setIngredients] = useState("");
  const [data, setData] = useState([]);

  async function onSubmit(e: any) {
    e.preventDefault();
    try {
      const reponse: any = await fetch(
        "http://localhost:3000/api/v1/getrecipe",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            ingredients: ingredients?.split(" ").join(","),
          }),
        }
      );
      const result: any = await reponse.json();

      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <form onSubmit={onSubmit}>
        <label htmlFor="ingredient">
          Search Ingredient:
        </label>
        <div className="flex gap-4 pt-2">
          <div>
            <input
              type="text"
              className="bg-purple-white shadow rounded border-0 p-3"
              placeholder="Search by ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>

          <button
            className="border border-gray-800 px-2 py-2 rounded"
            type="submit"
          >
            Rechercher
          </button>
        </div>
      </form>

      <div>{<Result data={data} />}</div>
    </Layout>
  );
}
