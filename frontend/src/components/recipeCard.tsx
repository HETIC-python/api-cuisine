export default function RecipeCard({ image, title, vegetarian}: any) {
    return (
        <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            alt="recipe"
            src={image}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 mx-2 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className="absolute inset-0" />
                {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">Plat pour vegan ? {vegetarian?"Oui" : "Non"}</p>
          </div>
        </div>
      </div>
    )
}