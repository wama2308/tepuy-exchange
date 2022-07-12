import { showMessage } from "react-native-flash-message";

export const flashMessageAction = (message, type) => {
    showMessage({
        message: message,
        type: type,
        icon: { icon: "auto", position: "left" },
        floating:true,
        position: "top",
        animated: true,
        animationDuration: 500,
        autoHide: true,
        duration: 9000,
        hideOnPress: true,
    })
};

export const dateNow = () => {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    return timestamp;
}