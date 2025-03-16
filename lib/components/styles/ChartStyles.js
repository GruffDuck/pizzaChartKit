"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
var react_native_1 = require("react-native");
exports.styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center',
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
        flex: 1, // flex: 1 to use all available space
    },
    chartContainerWithLegend: {
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 10, // Added horizontal padding
    },
    chartTopSpace: {
        height: 10, // Reduced top space
    },
    chartContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, // Increased space between chart and legend
    },
    centerTextContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    totalStorageText: {
        fontWeight: '600',
        marginTop: 5,
        textAlign: 'center',
    },
    legendContainer: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
    },
    legendScrollContent: {
        paddingBottom: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    legendLeftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendRightSection: {
        alignItems: 'flex-end',
    },
    legendColor: {
        width: 18,
        height: 18,
        borderRadius: 9,
        marginRight: 12,
    },
    legendText: {
        fontSize: 16,
        fontWeight: '500',
    },
    legendSize: {
        fontSize: 16,
        fontWeight: '600',
    },
    legendPercentage: {
        fontSize: 12,
        marginTop: 2,
    },
});
