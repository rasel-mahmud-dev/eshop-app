import { Alert, NativeModules } from "react-native";

const CalculatorModule = NativeModules.CalculatorModule;

const NotificationService = {
    async showNotification({ title, text }) {
        try {
            if (!CalculatorModule?.showNotification) return Alert.alert("Notification open fail");
            let a = await CalculatorModule.showNotification(JSON.stringify({ title, text }));
            console.log("Notification result:", a);
        } catch (ex) {
            Alert.alert("Notification error:", ex);
        }
    },
};

export default NotificationService;
