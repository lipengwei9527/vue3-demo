interface CustomEnv {
  VITE_NODE_ENV: string;
  VITE_API_BASEPATH: string;
  VITE_API_EXPRESS: string;
  VITE_API_EGG: string;
  VITE_BASE_PATH: string;
  VITE_ROUTER_MODEL: string;
  VITE_DROP_DEBUGGER: string;
  VITE_DROP_CONSOLE: string;
  VITE_SOURCEMAP: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv & CustomEnv;
}
