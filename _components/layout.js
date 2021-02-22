import Navbar from "./navbar";

const Layout = ({ children }) => (
  <div className='h-screen flex flex-col lg:flex-row bg-gray-100'>
    <Navbar/>
    <main className='overflow-y-auto w-full lg:w-9/12 flex-grow'>
      { children }
    </main>
  </div>
)

export default Layout

