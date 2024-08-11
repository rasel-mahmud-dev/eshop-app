import ImagePicker from "react-native-image-crop-picker";

async function Pick() {
    try {
        const image = await ImagePicker.openPicker({
            width: 300,
            height: 300,
            hideBottomControls: true,
            cropping: true,
        });

        return image?.path;
    } catch (ex) {
        console.log(ex);
        return null;
    }
}

export default Pick;
