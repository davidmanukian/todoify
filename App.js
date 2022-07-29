import * as WebBrowser from 'expo-web-browser'
import {AuthProvider} from "./hooks/auth";
import Routes from "./routes/routes";


WebBrowser.maybeCompleteAuthSession()

const App = () => {
    return (
        <AuthProvider>
            <Routes/>
        </AuthProvider>
    )
}

export default App
