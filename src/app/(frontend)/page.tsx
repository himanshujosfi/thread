
import ThemeToogleBtn from "@/components/common/ThemeToggleBtn"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/option"
import LeftBar from "@/components/leftbar/leftbar"
import CenterList from "@/components/centerList/centerList"
import RightBar from "@/components/rightSide/rightBar"
import MobileNav from "@/components/mobileNavbar/mobileNav"


const Home = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="container">
      <LeftBar />

      <div className="md:hidden">
        <MobileNav />
      </div>

      <CenterList />

      <RightBar />
    </div >
  )
}

export default Home