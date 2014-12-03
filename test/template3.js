var _ = require("underscore");
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div>'+
((__t=( _.map([1, 2, 3], function (nb) { return nb * 3}).join('-') ))==null?'':__t)+
'</div>';
}
return __p;
};
