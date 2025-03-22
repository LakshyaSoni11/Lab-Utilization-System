import { createFileRoute } from '@tanstack/react-router'
import CalendarDemo from '../../components/calendar-demo'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
export const Route = createFileRoute('/calendar/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div >
    <Navbar />
    <h2 className='text-center text-5xl text-black-900 text-border capitalise mt-7'>Add Scheduled Lab To Calendar</h2>
    {/* <HeaderThemeToggle/> */}
    <CalendarDemo />
    <Footer/>
    </div>
}
