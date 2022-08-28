import * as WebBrowser from 'expo-web-browser'
import {AuthProvider} from "./hooks/auth";
import Routes from "./routes/routes";
import {StorageProvider} from './hooks/storage';


WebBrowser.maybeCompleteAuthSession()

/**
 * Root.
 * Here we can see that I wrapped by two Providers (react context API).
 * During all routes/navigation we can get and pass data between them.
 * */
const App = () => {
    return (
        <StorageProvider>
            <AuthProvider>
                <Routes/>
            </AuthProvider>
        </StorageProvider>
    )
}

export default App
