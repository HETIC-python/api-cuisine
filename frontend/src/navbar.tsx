import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
    <div className="flex">
        <Link to="/" className="p-4">Acceuil</Link>
        <Link to="/recipes" className="p-4">recettes</Link>
        <Link to="/search" className="p-4">Rechercher</Link>
    </div>
    </nav>
  )
}
