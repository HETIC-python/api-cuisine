export default function Search (ingredients :string) {

        fetch('http://localhost:3000/getrecipe',
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                ingredients : ingredients
              }),
            })
              .then()
              .catch()

        return (
            <div>
            <form action="" method="post">
              <label className='' htmlFor="ingredient">Ingredient</label>
              <input className='' type="text" name="ingredient" id="ingredient" />
              <button  className='' type="submit">Rechercher</button>
            </form>
            
          </div>
        )
    

}