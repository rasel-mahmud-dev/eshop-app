import { Alert, NativeModules } from "react-native";

const CalculatorModule = NativeModules.CalculatorModule;

const ToastService = {
    async showToast(message) {
        try {
            if (!CalculatorModule?.showToast) return Alert.alert("Toast open fail");
            let a = await CalculatorModule.showToast(message);
            console.log("showToast result:", a);
        } catch (ex) {
            Alert.alert("showToast error:", ex);
        }
    },
};

export default ToastService;
