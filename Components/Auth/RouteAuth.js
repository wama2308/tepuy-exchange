import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import SendMoney from './SendMoney/SendMoney';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function RouteAuth(props) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'StackHome') {
                        iconName = focused
                            ? 'home-outline'
                            : 'home-outline';
                    } else if (route.name === 'Enviar') {
                        iconName = focused ? 'cash-outline' : 'cash-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: 'gray',
                headerShown: route.name === 'StackHome' ? false : true,
            })}>
            <Tab.Screen name="StackHome" component={HomeStackScreen} initialParams={{ logoutAction: props.logoutAction }} />
            <Tab.Screen name="Enviar" component={SendMoney} />
        </Tab.Navigator>
    );
}

export default RouteAuth;
