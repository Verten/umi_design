
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: true,
      dynamicImport: true,
      title: 'EDS',
      dll: true,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
}
