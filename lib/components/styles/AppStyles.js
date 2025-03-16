"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appStyles = void 0;
var react_native_1 = require("react-native");
exports.appStyles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    chartWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        width: '100%',
        flex: 1, // Tüm alanı kullanması için flex: 1 ekliyoruz
    },
});
