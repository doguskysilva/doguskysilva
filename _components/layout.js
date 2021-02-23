import Navbar from "./navbar";

const Layout = ({children }) => (
  <div className='h-screen flex flex-col lg:flex-row'>
    <Navbar/>
    <main className='overflow-y-auto w-full lg:w-9/12 flex-grow text-white bg-black bg-opacity-75'>
      { children }
    </main>
  </div>
)

export default Layout

