import Navbar from "./navbar";

const Layout = ({ children, title }) => (
  <div className='h-screen flex flex-col lg:flex-row bg-gray-200'>
    <Navbar/>
    <main className='overflow-y-auto w-full lg:w-9/12'>
      { children }
    </main>
  </div>
)

export default Layout

