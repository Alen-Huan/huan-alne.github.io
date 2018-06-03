/**
 * httpUrl 配置项目的请求接口地址，以及地图服务器等请求地址
 */
var httpUrl = {
		'timeout':'10000',//axios请求超时时间
		'useMock':true,//是否开启mock模拟数据，等到有接口后请设置为false
    'baseUrl':'http://xxxxxx', //正式环境的请求地址
    'devUrl':'192.168.0.1',//开发环境的请求地址
    'wsUrl':'ws....' //websocket请求地址
    //...，包括地图服务器地址等
};