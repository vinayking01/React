import { Link, NavLink } from 'react-router-dom'; 

export function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black text-white sticky-top">
  <div className="container-fluid">
    <a className="navbar-brand text-info" href="#">Exclusive Post</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"> <Link className="nav-link active text-white" aria-current="page" to="/" >General</Link></li>
        <li className="nav-item"> <Link className="nav-link active text-white" aria-current="page" to="/business" >Business</Link></li> 
        <li className="nav-item"> <Link className="nav-link active text-white" aria-current="page" to="/entertainment" >Entertainment</Link></li> 
        <li className="nav-item"> <Link className="nav-link active text-white" aria-current="page" to="/health" >Health</Link></li> 
        <li className="nav-item"> <Link className="nav-link active text-white" aria-current="page" to="/science" >Science</Link></li> 
        <li className="nav-item"> <Link className="nav-link active text-white" aria-current="page" to="/sports" >Sports</Link></li> 
        <li className="nav-item"> <Link className="nav-link active text-white" aria-current="page" to="/technology" >Technology</Link></li> 
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </>
  );
}
