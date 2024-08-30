import Search from "./Search"


// eslint-disable-next-line react/prop-types
const Header = ({ title }) => {
  return (
    <div className="bg-navbar border-opacity-25 border-slate-600 shadow-slate-600 sticky top-0 z-0 ">
    <div className="text-center p-6 text-slate-100 text-2xl">{title}</div>
    <Search/>

    </div>
  )
}

export default Header