import * as WebBrowser from 'expo-web-browser'
import {AuthProvider} from "./hooks/auth";
import Routes from "./routes/routes";
import {StorageProvider} from './hooks/storage';


WebBrowser.maybeCompleteAuthSession()

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
