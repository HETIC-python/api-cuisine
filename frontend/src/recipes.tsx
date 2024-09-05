import { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setrecipes] = useState([]);

  async function getRecipes() {
    try {
      const reponse: any = await fetch(
        "http://localhost:3000/api/v1/all-recipes",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const result: any = await reponse.json();

      setrecipes(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <div>
        {recipes?.map((e: any) => {
          return (
            <div>
              <h2>{e.title}</h2>
              <img src={e.image} alt="image" />
              <p dangerouslySetInnerHTML={{__html: e.summary}} / >
            </div>
          );
        })}
      </div>
    </div>
  );
}
