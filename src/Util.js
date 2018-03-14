
var Util = {
    /**
     * 返回介于 [lowerValue, upperValue]之间的一个随机数，
     * 包括lowerValue和upperValue
     * @param lowerValue
     * @param upperValue
     * @returns {number}
     */
    random : function(lowerValue, upperValue){
        var choices = upperValue - lowerValue + 1;
        return Math.floor(Math.random() * choices + lowerValue)
    },
    /**
     * 计算程序运行时间
     * @param callback
     * @returns {number}
     */
    runTime: function(callback){
        var start = Date.now();
        callback();
        var stop = Date.now();
        return stop - start;
    }
}

export default  Util;

