import './font-awesome/scss/font-awesome.scss';
import '../style.scss';

var $ = require('jquery');

// require.ensure([],function (require) {
//     require('./font-awesome/scss/font-awesome.scss');
// })




//定义MyUpload对象的方法

class Upload{
    constructor(targetEle,options){

        this.icons = {
            refreshIcon: `<i class="fa fa-refresh"></i>`,
            removeIcon: `<i class="fa fa-times-circle"></i>`,
            cameraIcon: `<i class="fa fa-camera-retro fa-5x"></i>`,
            loadingIcon:  `<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>`
        };

        this.selector = {
            percentage:".preview-percent",
            previewImg:".preview-img",
            uploadBtn:'.upload-selector',
            previewCancel:".preview-cancel",
            previewRefresh:".preview-refresh",
            uploadTotal:".upload-total",
            uploadCount:".upload-count"
        }


        this.tpl = {
            containerTpl :  `<div class="myupload-container clearfix"></div>`,
            previewTpl: `
                <div class="preview-wraper" >
                    <span class="preview-cancel"></span>
                    <span class="preview-percent"></span>
                    <span class="preview-refresh"></span>
                    <img class="preview-img" src="">
                </div>
            ` ,
            uploadTpl:`
            <div class="upload-wrapper">
                <div class="upload-selector">${this.icons.cameraIcon}</div>
                <div class="upload-stat">
                    <span class="upload-count"></span>/
                    <span class="upload-total"></span>
                </div>
            </div>
            `
        }

        this.defaults = {
            maxCount:10,
            extraData: {},
            submitName:'file',

        },
        //设置参数
        this.options = Object.assign({},this.defaults,options);

        //定义元素
        var fileInput = $(targetEle).hide();
        var uploadBox = $(this.tpl.uploadTpl);
        var container =  $(this.tpl.containerTpl);
        container.prepend(fileInput.after(container)).append(uploadBox);


        var previewBoxClean = $(this.tpl.previewTpl);
        previewBoxClean.find(this.selector.previewCancel).append($(this.icons.removeIcon));
        previewBoxClean.find(this.selector.previewRefresh).append($(this.icons.refreshIcon)).hide();


        this.elements = {
            container: container,
            uploadBox: uploadBox,
            previewBoxClean: previewBoxClean,
            previewBox: null

        };


        //初始化
        (()=>{

            //已经上传的文件数
            this.count = (()=>{
                if(!!fileInput.attr("data-initCount")){
                    let _initCount = fileInput.attr("data-initCount");
                    _initCount  = Math.abs(parseInt(_initCount));
                    return  _initCount;
                }else{
                    return 0;
                }
            })();

            //允许上传的最大文件数
            this.maxCount = (()=>{
                if(!!fileInput.attr("multiple")){
                    let _maxCount = fileInput.attr("data-maxCount");
                    _maxCount  = Math.abs(parseInt(_maxCount));
                    return   _maxCount ? _maxCount : this.options.maxCount
                }else{
                    return 1;
                }
            })();

            //显示最多允许上传数目
            uploadBox.find(this.selector.uploadTotal).html(this.maxCount);
            //显示已经上传数目
            uploadBox.find(this.selector.uploadCount).html(this.count);

        })(this.elements.uploadBox);



        //初始化 preview
        (()=>{
            let initValue = fileInput.data('init');
            if(initValue  !== null && initValue  !== undefined && initValue !== ''){
                if(!Array.isArray(initValue)){
                    initValue = [initValue];
                }
                initValue.forEach((item) => {
                    self.addPreviewBox(item.value, item, self);
                })
            }
        })();


        //绑定上传按钮
        let self = this;
        let fileInputElement = this.getFileInputElement();
        fileInputElement.on("change",{self: this},this.upload);

        let uploadBtn = this.getUploadButtonElement();
        uploadBtn.on("click",function(){

            fileInputElement.trigger("click");
        });



    }

    getFileInputElement(){
        return this.elements.container.find('[type=file]');
    }
    getUploadButtonElement(){
        return this.elements.uploadBox.find(this.selector.uploadBtn);
    }
    _postFile(url,data,successCallback,progressCallback){
        var defaultConfig = {
            type:'POST',
            // 告诉jQuery不要去处理发送的数据
            processData : false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false,
            global: false,
            dataType:'json',
            xhr: function(){
                var xhr = $.ajaxSettings.xhr();
                if(progressCallback && xhr.upload){
                    xhr.upload.addEventListener("progress",progressCallback);
                }
                return xhr;
            },

        };

        var config = $.extend({},defaultConfig,{url:url, data:data,success:successCallback});
        return $.ajax(config);
    }

    /**
     * 返回要提交的标单
     * @returns FormData
     */
    getFormData(fileObj){

        var fileInput = this.elements.container.find('[type=file]');

        var name = fileInput.attr("name") ? fileInput.attr("name") : this.options.submitName;
        var obj = {};
        obj[''+name] = fileObj;

        var extraData = fileInput.attr("data-extra") ?  fileInput.attr("data-extra") : this.options.extraData

        var data = $.extend( {},extraData,obj);

        var formData = new FormData();
        for(let key in data){
            formData.append(key, data[key] );
        }

        return formData;

    }

    /**
     * 读取文件对象，返回base64编码
     * @param file
     * @returns {Promise}
     */
    getBase64(fileObj) {
        return new Promise(function(resolve,reject){
            var reader = new FileReader();
            reader.readAsDataURL(fileObj);
            reader.onload = function (e) {
                var base64Code = this.result;
                resolve(base64Code)

            }
        });
    }

    upload(event){

        var self = event.data.self;
        var ele = this

        var fileObj = ele.files[0];

        self.getBase64(fileObj)
            .then((base64)=>{//显示预览图
                self._resetFileInput();
                let previewBox =  self.addPreviewBox(base64,{},self);
                return previewBox;
            })
            .then( (previewBox)=>{
                let formData = self.getFormData(fileObj);

                //定义上传成功callback
                let successCallback = function(data,textStatus, jqXHR){
                    previewBox.attr('delet-extra',JSON.stringify(data))
                    self.options.onUploadSuccess && self.options.onUploadSuccess(data,textStatus, jqXHR);
                };

                //定义上传进度callback
                let progressCallback = function(event){
                    var percent = Math.round((event.loaded / event.total)*100) ;
                    var percentEle = previewBox.find(self.selector.percentage);
                    percentEle.html(percent + '%');
                    if(percent == 100){
                        setTimeout(function(){
                            percentEle.html('').hide();
                        },1000)
                    }
                    self.options.onUploadProgress && self.options.onUploadProgress(event);

                };

                //调用内部方法，上传文件和附加数据
                self._postFile(self.options.uploadUrl,formData,successCallback,progressCallback);
            });
    }

    delete(event){

        let self = event.data.self;

        // delete priview
        let deleteBtn = $(this);
        let previewBox = deleteBtn.parent();
        let extraData = previewBox.attr("delet-extra");
        previewBox.remove();
        self._refreshCounter(-1);

        //ajax delete
        try{
            extraData = $.parseJSON(extraData);
            $.get(self.options.deleteUrl,extraData,function (data){
                self.options.deleteSuccess && self.options.deleteSuccess(data,self);
            })

        }catch(exception){

        }

    }

    addPreviewBox(url,extraData,context){
        var self = context;
        var previewBox = self.elements.previewBoxClean.clone().show();
        previewBox.find(self.selector.previewImg).attr("src",url);
        previewBox.attr("delet-extra",JSON.stringify(extraData));

        previewBox.find(self.selector.previewCancel)
                .on("click",{self:self},self.delete);
        self.elements.uploadBox.before(previewBox);

        self._refreshCounter(+1);

        return previewBox;
    }
    _refreshCounter(count){

        this.count += count > 0 ? 1 : -1;
        this.elements.container.find(".upload-count").html(this.count)

        if(this.count == this.maxCount){
            this.elements.uploadBox.hide();
        }else if(this.count < this.maxCount && this.elements.uploadBox.is(":hidden")){
            this.elements.uploadBox.show();
        }


    }

    _resetFileInput(){
        let self = this;
        let oldFileInput = this.getFileInputElement();
        let _fileInputStr = oldFileInput[0].outerHTML;

        let newFileInput = $(_fileInputStr);
        newFileInput.attr("time",Date.now())
        newFileInput.on("change",{self: self},self.upload);

        oldFileInput.replaceWith(newFileInput);

        return newFileInput;


    }
}


$.fn.risenUpload = function(options){
    $(this).each(function(index,domItem){
        var $ele = $(domItem);
        var instance = new Upload($ele,options);
        return instance;
    })

}

// 使用
// var uploadUrl = "<?= Url::to(['apply/ajax-upload']) ?>";
// var deleteUrl = "<?= Url::to(['apply/ajax-delete']) ?>";
// $("[type=file]").risenUpload({
//     "uploadUrl":uploadUrl,
//     "deleteUrl":deleteUrl,
//     'extraData':{"applyid": <?=  $_GET['applyid']?>}
// });