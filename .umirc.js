// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: true,
        dynamicImport: {
          loadingComponent: './components/loading/index.jsx',
        },
        title: 'EDS',
        dll: true,
        routes: {
          exclude: [],
        },
        hardSource: false,
      },
    ],
  ],
}
