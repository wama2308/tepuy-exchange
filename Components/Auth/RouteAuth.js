import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import SendMoney from './SendMoney/SendMoney';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserStackScreen from './UserStackScreen';

const Tab = createBottomTabNavigator();

const options = (route) => {
    const data = {
        StackHome: {
            icon: 'home-outline',
            headerShown: false
        },
        Enviar: {
            icon: 'cash-outline',
            headerShown: true
        },
        StackAccount: {
            icon: 'person',
            headerShown: false
        }
    }
    return data[route]
}

function RouteAuth(props) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    return <Ionicons name={options(route.name).icon} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: 'gray',
                headerShown: options(route.name).headerShown,
            })}>
            <Tab.Screen name="StackHome" component={HomeStackScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Enviar" component={SendMoney} />
            <Tab.Screen
                name="StackAccount"
                component={UserStackScreen}
                initialParams={{ logoutAction: props.logoutAction }}
                options={{ title: 'Cuenta' }}
            />
        </Tab.Navigator>
    );
}

export default RouteAuth;
