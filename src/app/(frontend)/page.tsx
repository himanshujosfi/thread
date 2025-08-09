
import ThemeToogleBtn from "@/components/common/ThemeToggleBtn"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/option"
import { LogOut } from "lucide-react"
const Home = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      test
      {session && JSON.stringify(session)}
      {/* <button onClick={() => LogOut}>logOut</button> */}
      {/* <Login /> */}
      <ThemeToogleBtn />
    </div>
  )
}

export default Home