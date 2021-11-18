import React from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES, FONTS, theme } from "../constants";

// This custom view creates a custom list of clickable data
const CustomListView = ({ data, header, type, onPress }) => {
    // One item of the list
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                onPress(item);
            }}
        >
            {type === "person" ? (
                <Ionicons
                    name="person"
                    size={32}
                    color={theme.COLORS.primary}
                />
            ) : null}

            {type === "site" ? (
                <MaterialCommunityIcons
                    name="shovel"
                    size={32}
                    color={theme.COLORS.primary}
                />
            ) : null}

            <Text
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                    ...FONTS.h3,
                }}
            >
                {type === "person" ? item.name : null}
                {type === "site" ? item.address : null}
            </Text>

            <Entypo name="arrow-with-circle-right" size={24} color="black" />
        </TouchableOpacity>
    );

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Text style={{ ...FONTS.h2 }}>{header}</Text>

            <View style={{ height: 10 }}></View>

            <View
                style={{
                    borderRadius: 6,
                    borderColor: COLORS.lightGray,
                    padding: 10,
                    borderWidth: 1,
                }}
            >
                <FlatList
                    scrollEnabled={true}
                    data={data}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                        return (
                            <View
                                style={{
                                    width: "100%",
                                    height: 1,
                                    backgroundColor: COLORS.lightGray,
                                }}
                            ></View>
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SIZES.base,
    },
});

export default CustomListView;
