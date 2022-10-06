import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { loadDirectory, deleteDirectory, searchDirectory } from '../../../Actions/DirectoryActions'
import CardList from './CardList';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

function Directory(props) {
    const { navigation, route, banks } = props;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        props.loadDirectory()
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }, [])
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => {
        setSearchQuery(query)
        props.searchDirectory(query)
    };

    const renderSeparator = () => (
        <View
            style={{ height: 1 }}
        />
    );

    //console.log("onChangeSearch ", props.directory)
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Searchbar
                    placeholder="Buscar"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            <View style={{ flex: 10, marginVertical: 20 }}>
                {
                    !loading ?
                        <FlatList
                            data={props.directory}
                            renderItem={({ item, index }) =>
                                <CardList
                                    item={item}
                                    index={index}
                                    banks={banks}
                                    deleteDirectory={deleteDirectory}
                                    setLoading={setLoading}
                                    navigation={navigation}
                                />
                            }

                            keyExtractor={item => item.created_at}
                            ItemSeparatorComponent={renderSeparator}

                        />
                        :
                        <View style={styles.viewLoading}>
                            <ActivityIndicator size={80} color='#007bff' />
                        </View>
                }
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("AddBeneficiario")} style={styles.buttonFloat}>
                <Ionicons name="add-outline" size={30} color="white" />
            </TouchableOpacity>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 10,
        marginVertical: 20,
    },
    buttonFloat: {
        flex: 1,
        borderRadius: 50,
        backgroundColor: '#007bff',
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
});

const mapStateToProps = state => ({
    banks: state.banks.banks,
    directory: state.directory.directory,
});

const mapDispatchToProps = dispatch => ({
    loadDirectory: () => dispatch(loadDirectory()),
    searchDirectory: (data) => dispatch(searchDirectory(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory);