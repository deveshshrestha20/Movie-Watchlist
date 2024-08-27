

// eslint-disable-next-line react/prop-types
const Header = ({ title }) => {
  return (
    <div className="bg-navbar border-opacity-25 border-slate-600 shadow-slate-600">
    <div className="text-center p-6 text-slate-100 text-2xl">{title}</div>

    </div>
  )
}

export default Header