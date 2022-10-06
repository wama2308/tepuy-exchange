import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import SendMoneyStackScreen from './SendMoneyStackScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserStackScreen from './UserStackScreen';
import { connect } from 'react-redux';
import { setStep } from '../../Actions/DirectoryActions'


const Tab = createBottomTabNavigator();

const options = (route) => {
    const data = {
        StackHome: {
            icon: 'home-outline',
            headerShown: false
        },
        StackEnviar: {
            icon: 'cash-outline',
            headerShown: false
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
            <Tab.Screen
                name="StackHome"
                component={HomeStackScreen}
                options={{ title: 'Home', unmountOnBlur: true }}
            />
            <Tab.Screen
                name="StackEnviar"
                component={SendMoneyStackScreen}
                options={{ title: 'Enviar', unmountOnBlur: true }}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {                        
                        e.preventDefault();
                        props.setStep(0)
                        navigation.navigate('StackEnviar');
                    },
                })}
            />
            <Tab.Screen
                name="StackAccount"
                component={UserStackScreen}
                initialParams={{ logoutAction: props.logoutAction }}
                options={{ title: 'Cuenta', unmountOnBlur: true }}
            />
        </Tab.Navigator>
    );
}

const mapDispatchToProps = dispatch => ({
    setStep: (data) => dispatch(setStep(data)),
});
export default connect(null, mapDispatchToProps)(RouteAuth);
