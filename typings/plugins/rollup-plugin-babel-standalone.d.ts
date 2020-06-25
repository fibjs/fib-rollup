export default function rollupPluginBabelStandalone(userOptions: any): {
    name: string;
    transform(code: any, id: any): {
        code: any;
        map: any;
    };
    renderError(e: any): void;
};
