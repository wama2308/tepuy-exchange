import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login/Login'
import Register from './Register/Register'
import ForgotPassword from './ForgotPassword/ForgotPassword';

const Stack = createNativeStackNavigator();

function RoutesNoAuth() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Iniciar sesión" component={Login} />
            <Stack.Screen name="Registrarse" component={Register} />
            <Stack.Screen name="Recuperar contraseña" component={ForgotPassword} />
        </Stack.Navigator>
    );
}

export default RoutesNoAuth;
