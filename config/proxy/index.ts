const env = process.env.NODE_ENV;
const config = {
  development: {
    "/egg": {
      target: "http://127.0.0.1:7001",
      rewrite: (path: string) => path.replace("/egg", ""),
      //请求头中的Host将被设置为目标URL的主机名，而不是代理服务器的主机名
      // 如果接口跨域，需要进行这个参数配置
      // changeOrigin: true,
      bypass(req: any, res: any, options: any) {
        const proxyURL = options.target + options.rewrite(req.url);
        if (env == "development") {
          res.setHeader("x-real-url", proxyURL);
        }
      },
    },
    "/express": {
      target: "http://localhost:3000",
      rewrite: (path: string) => path.replace("/express", ""),
      //请求头中的Host将被设置为目标URL的主机名，而不是代理服务器的主机名
      // 如果接口跨域，需要进行这个参数配置
      // changeOrigin: true,
      bypass(req: any, res: any, options: any) {
        const proxyURL = options.target + options.rewrite(req.url);
        if (env == "development") {
          res.setHeader("x-real-url", proxyURL);
        }
      },
    },
  },
  production: {
    proxy: {},
  },
};
console.log(`
  ------------------------------------------------
    config/proxy/index.ts 
    env:${env}
  ------------------------------------------------`);
export default config[env as keyof typeof config];
