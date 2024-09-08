import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = () => {
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type="signin" />
        </div>
        {/* We need to hide the Quote when the screen becomes small, the break point is large screen, hidden by default and if it becomes greater than large then it becomes block */}
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>
}