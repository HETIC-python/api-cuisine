import { useState } from "react"
import Result from "./components/result"

export default function Index () {

    const [ingredients, setIngredients] = useState('')
    const [data,setData] =  useState([])

    async function onSubmit (e : any) {
        e.preventDefault()
        try {
            
            const reponse:any =  await fetch('http://localhost:3000/api/v1/getrecipe',
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        ingredients : ingredients?.split(' ').join(',')
                    }),
                })
                const result:any = await reponse.json()
                
                setData(result.data)
            } catch (error) {
                console.log(error);
                
                
            }
                
                
                
    }

        return (
            <div>
            <form onSubmit= {onSubmit}>
              <label className='' htmlFor="ingredient">Ingredient</label>
              <input className=' border' type="text" name="ingredients" value={ingredients} onChange={(e)=>setIngredients(e.target.value)}/>
              <button  className='' type="submit">Rechercher</button>
            </form>


            <div>
                {
                            <Result data = {data} />
            
                }
            </div>
          </div>
        )
    

}