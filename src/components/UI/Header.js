import { RiMenuFill } from "react-icons/ri";

function Header() {
  return (
    <header className="footer items-center p-4 bg-blue-600 text-neutral-content">
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <div className="flex justify-between">
          <label htmlFor="my-drawer-2" className="btn btn-primary btn-sm drawer-button lg:hidden">
            <RiMenuFill size={20} />
          </label>
        </div>
      </nav>
    </header>
  )
}

export default Header