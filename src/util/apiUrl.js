class ApiUrl{
    constructor(path, host='http://localhost:3000/'){
        if(!host){
            host = '';
        }
        this.apiUrl = host + path;
    }

    _withId(id){
        return this.apiUrl + '/' + id;
    }

    _noId(){
        return this.apiUrl;
    }

    //新建
    createUrl(){
        return {
            url:this._noId(),
            method: 'POST'
        };
    }

    //更新
    updateUrl(id){
        return {
            url:this._withId(),
            method: 'PUT'
        };
    }

    //列出所有
    listUrl(){
        return {
            url: this._noId(),
            method: 'GET'
        };
    }
    //列出单个
    getUrl(id){
        return {
            url: this._withId(id),
            method: 'GET'
        };
    }

    //删除
    deleteUrl(id){
        return {
            url: this._withId(id),
            method: 'DELETE'
        };
    }


}

export default ApiUrl;