// User auth model
import UserAuth from "../models/userauth/UserAuth"

function routeGuard() {
    const [user, loading] = UserAuth.getAuthState()
    // if(!loading) {
    //     console.log('ended loading', user)
    //     return user ? true : false
    // }
    return [user, loading]
}

export default routeGuard