export default function rollupPluginUglifyJS(userOptions?: {}): {
    name: string;
    renderChunk(code: any): Promise<unknown>;
    renderError(err: any): void;
};
