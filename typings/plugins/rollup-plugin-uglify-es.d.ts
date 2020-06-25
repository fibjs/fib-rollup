export default function rollupPluginUglifyES(userOptions?: {}): {
    name: string;
    renderChunk(code: any): Promise<unknown>;
    renderError(): void;
};
