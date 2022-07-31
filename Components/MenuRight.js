import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { SimpleLineIcons } from '@expo/vector-icons';
import { dataMenuHome } from '../Helpers/Herlpers';

export default function MenuRight(props) {
    const [visible, setVisible] = useState(false);
    const [dataMenu, setDataMenu] = useState(null);

    const getData = () => {
        const selectData = {
            home: dataMenuHome,
        }
        setDataMenu(selectData[props.option])
    }

    useEffect(() => {
        getData()
    }, [])

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Menu
                visible={visible}
                anchor={<SimpleLineIcons
                    onPress={showMenu}
                    name="menu"
                    size={24}
                    color="black"
                />}
                onRequestClose={hideMenu}
            >
                {
                    dataMenu && dataMenu.map((menu, key) => {
                        return (
                            <MenuItem
                                key={key}
                                onPress={() => {
                                    hideMenu,
                                        props.navigation.navigate('Tasas')
                                }}
                            >
                                {menu.label}
                            </MenuItem>
                        )
                    })
                }

            </Menu>
        </View>
    );
}