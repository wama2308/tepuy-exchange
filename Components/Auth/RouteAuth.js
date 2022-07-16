import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home/Home';
import SendMoney from './SendMoney/SendMoney';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function RouteAuth(props) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home-outline'
                            : 'home-outline';
                    } else if (route.name === 'Enviar') {
                        iconName = focused ? 'cash-outline' : 'cash-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },                
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Home" component={Home} initialParams={{ logoutAction: props.logoutAction }} />
            <Tab.Screen name="Enviar" component={SendMoney} />
        </Tab.Navigator>
    );
}

export default RouteAuth;
