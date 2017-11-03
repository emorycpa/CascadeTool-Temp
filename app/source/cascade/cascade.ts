/**
 * Change original JS to ts
 * Parameter: CascadeClient
 */
import CascadeClient from './cascade.client';
import {Asset} from '../data/asset';
const extend = Object.assign;


interface RegisterClientInterface{
    cascade: Object;
}
class RegisterClient implements RegisterClientInterface{
    private _cascade: Object;
    constructor(cascadeClient: CascadeClient){
        this.cascade = this.initialization(cascadeClient);

    }
	public get cascade(): Object {
		return this._cascade;
	}
	public set cascade(value: Object) {
		this._cascade = value;
	}
    private CreateMessageInit(globalArgs) {
        return function(postBody) {
            var returnObj = extend({}, globalArgs);
            returnObj["data"] = JSON.stringify(postBody);
            return returnObj;
        }
    }
    private initialization(cascadeClient: CascadeClient){
        let newClient = {};
        const restClient = cascadeClient.restify(extend(cascadeClient.options, {
            "promisify": {
                "onRegisterMethod": true
            }
        }));
        Object.getOwnPropertyNames(cascadeImpl).forEach(function(method) {
            restClient.registerMethod("cascade$" + method, "https://${hostname}/api/v1/" + method, "POST");
        });
        var createMessage = CreateMessageInit({
            "path": { "hostname": cascadeClient.hostname},
            "parameters": { "u": cascadeClient.username, "p": cascadeClient.password },
        });
        newClient['createMessage'] = createMessage;
        Object.keys(restClient.methods).forEach(function(methodName) {                       
            var returnName = methodName.replace('cascade$', '');
            newClient[returnName] = function() {
                var args = [].slice.call(arguments);
                return restClient.methods[methodName].call(restClient, createMessage(args[0]));
            };
        });
        newClient.registerMethod = function(nameSpace, name, fn) {
            if (!newClient[nameSpace]) {
                newClient[nameSpace] = {};
            }
            newClient[nameSpace][name] = fn(newClient);
        }
        return newClient;
    }
}



/**
 * Need to force bootstrap list methods 
 */

interface CascadeInterface{
    read(cacadeClient: CascadeClient); 
    create(cacadeClient: CascadeClient); 
    edit(cacadeClient: CascadeClient);
    delete(cacadeClient: CascadeClient);
    move(cacadeClient: CascadeClient);
    publish(cacadeClient: CascadeClient);
    search(cacadeClient: CascadeClient);
}

class CascadeFolderAPI extends RegisterClient implements CascadeInterface{
    read(cascadeClient: CascadeClient)
    {
        cascadeClient.registerMethod("file", "read", function(client) {
            return function(cascadeFile) {
                return client.readPromise({
                    "identifier": {
                        "type": "file",
                        "path": {
                            "siteName": cascadeFile.sitename,
                            "path": cascadeFile.path
                        }
                    }
                });
            };
    
        });
    } 
    create(){
    } 
    edit(){

    }
    delete(){

    }
    move(){

    }
    publish(){

    }
    search(){
    }
}

class CascadeFileAPI extends RegisterClient implements CascadeInterface{
}

class CascadeScriptFormatAPI extends RegisterClient implements CascadeInterface{
}

class CascadeXSLTAPI extends RegisterClient implements CascadeInterface{
}

class CascadePageAPI extends RegisterClient implements CascadeInterface{
}
