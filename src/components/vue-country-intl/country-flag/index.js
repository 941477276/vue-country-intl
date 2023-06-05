import CountryFlag from './CountryFlag.vue';
CountryFlag.install = function (Vue, svgFlagFilePath) {
  if(CountryFlag._country_flag_installed){
    return;
  }
  if(!svgFlagFilePath && (!Array.isArray(svgFlagFilePath) || typeof svgFlagFilePath !== 'function')){
    // throw new Error('CountryFlag组件初始化需要传递svg图标路径！您可以使用这段代码：require.context(\'vue-country-intl/country-flag-svgs\', true, /\\.svg$/)');
    throw new Error('CountryFlag component initialization needs to pass the svg icon path! You can use this code: require.context(\'vue-country-intl/country-flag-svgs\', true, /\\.svg$/)');
  }

  // 获取svg文件名称正则
  let reg = /(\w+)(\.\w*)*\.svg$/;
  // 获取svg文件路径
  const svgPathList = typeof svgFlagFilePath === 'function' ? svgFlagFilePath.keys().map(item => svgFlagFilePath(item)) : svgFlagFilePath;
  // 将svg路径转换成对象
  const svgPathObj = svgPathList.reduce((res, svgPath) => {
    let pathIsString = typeof svgPath === 'string';
    let matched = pathIsString ? svgPath.match(reg) : svgPath.default.match(reg);
    console.log('matched', matched, svgPath);
    if(matched){
      res[matched[1]] = pathIsString ? svgPath : svgPath.default;
    }
    return res;
  }, {});
  console.log(svgPathObj);
  // console.log('svgPathList', svgPathList)
  (window || Object).__country_flag_files_path_obj = svgPathObj;
  Vue.component(CountryFlag.name, CountryFlag);
  CountryFlag._country_flag_installed = true;
}

export default CountryFlag;
