(function(e){typeof define=="function"&&define.amd?define("validate/jquery.validate",["jquery"],e):typeof module=="object"&&module.exports?module.exports=e(require("jquery")):e(jQuery)})(function(e){e.extend(e.fn,{validate:function(t){if(!this.length){t&&t.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.");return}var n=e.data(this[0],"validator");return n?n:(this.attr("novalidate","novalidate"),n=new e.validator(t,this[0]),e.data(this[0],"validator",n),n.settings.onsubmit&&(this.on("click.validate",":submit",function(t){n.settings.submitHandler&&(n.submitButton=t.target),e(this).hasClass("cancel")&&(n.cancelSubmit=!0),e(this).attr("formnovalidate")!==undefined&&(n.cancelSubmit=!0)}),this.on("submit.validate",function(t){function r(){var r,i;return n.settings.submitHandler?(n.submitButton&&(r=e("<input type='hidden'/>").attr("name",n.submitButton.name).val(e(n.submitButton).val()).appendTo(n.currentForm)),i=n.settings.submitHandler.call(n,n.currentForm,t),n.submitButton&&r.remove(),i!==undefined?i:!1):!0}return n.settings.debug&&t.preventDefault(),n.cancelSubmit?(n.cancelSubmit=!1,r()):n.form()?n.pendingRequest?(n.formSubmitted=!0,!1):r():(n.focusInvalid(),!1)})),n)},valid:function(){var t,n,r;return e(this[0]).is("form")?t=this.validate().form():(r=[],t=!0,n=e(this[0].form).validate(),this.each(function(){t=n.element(this)&&t,t||(r=r.concat(n.errorList))}),n.errorList=r),t},rules:function(t,n){if(!this.length)return;var r=this[0],i,s,o,u,a,f;if(t){i=e.data(r.form,"validator").settings,s=i.rules,o=e.validator.staticRules(r);switch(t){case"add":e.extend(o,e.validator.normalizeRule(n)),delete o.messages,s[r.name]=o,n.messages&&(i.messages[r.name]=e.extend(i.messages[r.name],n.messages));break;case"remove":if(!n)return delete s[r.name],o;return f={},e.each(n.split(/\s/),function(t,n){f[n]=o[n],delete o[n],n==="required"&&e(r).removeAttr("aria-required")}),f}}return u=e.validator.normalizeRules(e.extend({},e.validator.classRules(r),e.validator.attributeRules(r),e.validator.dataRules(r),e.validator.staticRules(r)),r),u.required&&(a=u.required,delete u.required,u=e.extend({required:a},u),e(r).attr("aria-required","true")),u.remote&&(a=u.remote,delete u.remote,u=e.extend(u,{remote:a})),u}}),e.extend(e.expr[":"],{blank:function(t){return!e.trim(""+e(t).val())},filled:function(t){var n=e(t).val();return n!==null&&!!e.trim(""+n)},unchecked:function(t){return!e(t).prop("checked")}}),e.validator=function(t,n){this.settings=e.extend(!0,{},e.validator.defaults,t),this.currentForm=n,this.init()},e.validator.format=function(t,n){return arguments.length===1?function(){var n=e.makeArray(arguments);return n.unshift(t),e.validator.format.apply(this,n)}:n===undefined?t:(arguments.length>2&&n.constructor!==Array&&(n=e.makeArray(arguments).slice(1)),n.constructor!==Array&&(n=[n]),e.each(n,function(e,n){t=t.replace(new RegExp("\\{"+e+"\\}","g"),function(){return n})}),t)},e.extend(e.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:e([]),errorLabelContainer:e([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(e){this.lastActive=e,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,e,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(e)))},onfocusout:function(e){!this.checkable(e)&&(e.name in this.submitted||!this.optional(e))&&this.element(e)},onkeyup:function(t,n){var r=[16,17,18,20,35,36,37,38,39,40,45,144,225];if(n.which===9&&this.elementValue(t)===""||e.inArray(n.keyCode,r)!==-1)return;(t.name in this.submitted||t.name in this.invalid)&&this.element(t)},onclick:function(e){e.name in this.submitted?this.element(e):e.parentNode.name in this.submitted&&this.element(e.parentNode)},highlight:function(t,n,r){t.type==="radio"?this.findByName(t.name).addClass(n).removeClass(r):e(t).addClass(n).removeClass(r)},unhighlight:function(t,n,r){t.type==="radio"?this.findByName(t.name).removeClass(n).addClass(r):e(t).removeClass(n).addClass(r)}},setDefaults:function(t){e.extend(e.validator.defaults,t)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:e.validator.format("Please enter no more than {0} characters."),minlength:e.validator.format("Please enter at least {0} characters."),rangelength:e.validator.format("Please enter a value between {0} and {1} characters long."),range:e.validator.format("Please enter a value between {0} and {1}."),max:e.validator.format("Please enter a value less than or equal to {0}."),min:e.validator.format("Please enter a value greater than or equal to {0}."),step:e.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function r(t){var n=e.data(this.form,"validator"),r="on"+t.type.replace(/^validate/,""),i=n.settings;i[r]&&!e(this).is(i.ignore)&&i[r].call(n,this,t)}this.labelContainer=e(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||e(this.currentForm),this.containers=e(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var t=this.groups={},n;e.each(this.settings.groups,function(n,r){typeof r=="string"&&(r=r.split(/\s/)),e.each(r,function(e,r){t[r]=n})}),n=this.settings.rules,e.each(n,function(t,r){n[t]=e.validator.normalizeRule(r)}),e(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]",r).on("click.validate","select, option, [type='radio'], [type='checkbox']",r),this.settings.invalidHandler&&e(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),e.extend(this.submitted,this.errorMap),this.invalid=e.extend({},this.errorMap),this.valid()||e(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var e=0,t=this.currentElements=this.elements();t[e];e++)this.check(t[e]);return this.valid()},element:function(t){var n=this.clean(t),r=this.validationTargetFor(n),i=this,s=!0,o,u;return r===undefined?delete this.invalid[n.name]:(this.prepareElement(r),this.currentElements=e(r),u=this.groups[r.name],u&&e.each(this.groups,function(e,t){t===u&&e!==r.name&&(n=i.validationTargetFor(i.clean(i.findByName(e))),n&&n.name in i.invalid&&(i.currentElements.push(n),s=s&&i.check(n)))}),o=this.check(r)!==!1,s=s&&o,o?this.invalid[r.name]=!1:this.invalid[r.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e(t).attr("aria-invalid",!o)),s},showErrors:function(t){if(t){var n=this;e.extend(this.errorMap,t),this.errorList=e.map(this.errorMap,function(e,t){return{message:e,element:n.findByName(t)[0]}}),this.successList=e.grep(this.successList,function(e){return!(e.name in t)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){e.fn.resetForm&&e(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var t=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(t)},resetElements:function(e){var t;if(this.settings.unhighlight)for(t=0;e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,""),this.findByName(e[t].name).removeClass(this.settings.validClass);else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(e){var t=0,n;for(n in e)e[n]&&t++;return t},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(e){e.not(this.containers).text(""),this.addWrapper(e).hide()},valid:function(){return this.size()===0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{e(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(t){}},findLastActive:function(){var t=this.lastActive;return t&&e.grep(this.errorList,function(e){return e.element.name===t.name}).length===1&&t},elements:function(){var t=this,n={};return e(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var r=this.name||e(this).attr("name");return!r&&t.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=e(this).closest("form")[0]),r in n||!t.objectLength(e(this).rules())?!1:(n[r]=!0,!0)})},clean:function(t){return e(t)[0]},errors:function(){var t=this.settings.errorClass.split(" ").join(".");return e(this.settings.errorElement+"."+t,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=e([]),this.toHide=e([])},reset:function(){this.resetInternals(),this.currentElements=e([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(e){this.reset(),this.toHide=this.errorsFor(e)},elementValue:function(t){var n=e(t),r=t.type,i,s;return r==="radio"||r==="checkbox"?this.findByName(t.name).filter(":checked").val():r==="number"&&typeof t.validity!="undefined"?t.validity.badInput?"NaN":n.val():(t.hasAttribute("contenteditable")?i=n.text():i=n.val(),r==="file"?i.substr(0,12)==="C:\\fakepath\\"?i.substr(12):(s=i.lastIndexOf("/"),s>=0?i.substr(s+1):(s=i.lastIndexOf("\\"),s>=0?i.substr(s+1):i)):typeof i=="string"?i.replace(/\r/g,""):i)},check:function(t){t=this.validationTargetFor(this.clean(t));var n=e(t).rules(),r=e.map(n,function(e,t){return t}).length,i=!1,s=this.elementValue(t),o,u,a;if(typeof n.normalizer=="function"){s=n.normalizer.call(t,s);if(typeof s!="string")throw new TypeError("The normalizer should return a string value.");delete n.normalizer}for(u in n){a={method:u,parameters:n[u]};try{o=e.validator.methods[u].call(this,s,t,a.parameters);if(o==="dependency-mismatch"&&r===1){i=!0;continue}i=!1;if(o==="pending"){this.toHide=this.toHide.not(this.errorsFor(t));return}if(!o)return this.formatAndAdd(t,a),!1}catch(f){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+t.id+", check the '"+a.method+"' method.",f),f instanceof TypeError&&(f.message+=".  Exception occurred when checking element "+t.id+", check the '"+a.method+"' method."),f}}if(i)return;return this.objectLength(n)&&this.successList.push(t),!0},customDataMessage:function(t,n){return e(t).data("msg"+n.charAt(0).toUpperCase()+n.substring(1).toLowerCase())||e(t).data("msg")},customMessage:function(e,t){var n=this.settings.messages[e];return n&&(n.constructor===String?n:n[t])},findDefined:function(){for(var e=0;e<arguments.length;e++)if(arguments[e]!==undefined)return arguments[e];return undefined},defaultMessage:function(t,n){var r=this.findDefined(this.customMessage(t.name,n.method),this.customDataMessage(t,n.method),!this.settings.ignoreTitle&&t.title||undefined,e.validator.messages[n.method],"<strong>Warning: No message defined for "+t.name+"</strong>"),i=/\$?\{(\d+)\}/g;return typeof r=="function"?r=r.call(this,n.parameters,t):i.test(r)&&(r=e.validator.format(r.replace(i,"{$1}"),n.parameters)),r},formatAndAdd:function(e,t){var n=this.defaultMessage(e,t);this.errorList.push({message:n,element:e,method:t.method}),this.errorMap[e.name]=n,this.submitted[e.name]=n},addWrapper:function(e){return this.settings.wrapper&&(e=e.add(e.parent(this.settings.wrapper))),e},defaultShowErrors:function(){var e,t,n;for(e=0;this.errorList[e];e++)n=this.errorList[e],this.settings.highlight&&this.settings.highlight.call(this,n.element,this.settings.errorClass,this.settings.validClass),this.showLabel(n.element,n.message);this.errorList.length&&(this.toShow=this.toShow.add(this.containers));if(this.settings.success)for(e=0;this.successList[e];e++)this.showLabel(this.successList[e]);if(this.settings.unhighlight)for(e=0,t=this.validElements();t[e];e++)this.settings.unhighlight.call(this,t[e],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return e(this.errorList).map(function(){return this.element})},showLabel:function(t,n){var r,i,s,o,u=this.errorsFor(t),a=this.idOrName(t),f=e(t).attr("aria-describedby");u.length?(u.removeClass(this.settings.validClass).addClass(this.settings.errorClass),u.html(n)):(u=e("<"+this.settings.errorElement+">").attr("id",a+"-error").addClass(this.settings.errorClass).html(n||""),r=u,this.settings.wrapper&&(r=u.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(r):this.settings.errorPlacement?this.settings.errorPlacement(r,e(t)):r.insertAfter(t),u.is("label")?u.attr("for",a):u.parents("label[for='"+this.escapeCssMeta(a)+"']").length===0&&(s=u.attr("id"),f?f.match(new RegExp("\\b"+this.escapeCssMeta(s)+"\\b"))||(f+=" "+s):f=s,e(t).attr("aria-describedby",f),i=this.groups[t.name],i&&(o=this,e.each(o.groups,function(t,n){n===i&&e("[name='"+o.escapeCssMeta(t)+"']",o.currentForm).attr("aria-describedby",u.attr("id"))})))),!n&&this.settings.success&&(u.text(""),typeof this.settings.success=="string"?u.addClass(this.settings.success):this.settings.success(u,t)),this.toShow=this.toShow.add(u)},errorsFor:function(t){var n=this.escapeCssMeta(this.idOrName(t)),r=e(t).attr("aria-describedby"),i="label[for='"+n+"'], label[for='"+n+"'] *";return r&&(i=i+", #"+this.escapeCssMeta(r).replace(/\s+/g,", #")),this.errors().filter(i)},escapeCssMeta:function(e){return e.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(e){return this.groups[e.name]||(this.checkable(e)?e.name:e.id||e.name)},validationTargetFor:function(t){return this.checkable(t)&&(t=this.findByName(t.name)),e(t).not(this.settings.ignore)[0]},checkable:function(e){return/radio|checkbox/i.test(e.type)},findByName:function(t){return e(this.currentForm).find("[name='"+this.escapeCssMeta(t)+"']")},getLength:function(t,n){switch(n.nodeName.toLowerCase()){case"select":return e("option:selected",n).length;case"input":if(this.checkable(n))return this.findByName(n.name).filter(":checked").length}return t.length},depend:function(e,t){return this.dependTypes[typeof e]?this.dependTypes[typeof e](e,t):!0},dependTypes:{"boolean":function(e){return e},string:function(t,n){return!!e(t,n.form).length},"function":function(e,t){return e(t)}},optional:function(t){var n=this.elementValue(t);return!e.validator.methods.required.call(this,n,t)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,e(t).addClass(this.settings.pendingClass),this.pending[t.name]=!0)},stopRequest:function(t,n){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[t.name],e(t).removeClass(this.settings.pendingClass),n&&this.pendingRequest===0&&this.formSubmitted&&this.form()?(e(this.currentForm).submit(),this.formSubmitted=!1):!n&&this.pendingRequest===0&&this.formSubmitted&&(e(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(t,n){return e.data(t,"previousValue")||e.data(t,"previousValue",{old:null,valid:!0,message:this.defaultMessage(t,{method:n})})},destroy:function(){this.resetForm(),e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(t,n){t.constructor===String?this.classRuleSettings[t]=n:e.extend(this.classRuleSettings,t)},classRules:function(t){var n={},r=e(t).attr("class");return r&&e.each(r.split(" "),function(){this in e.validator.classRuleSettings&&e.extend(n,e.validator.classRuleSettings[this])}),n},normalizeAttributeRule:function(e,t,n,r){/min|max|step/.test(n)&&(t===null||/number|range|text/.test(t))&&(r=Number(r),isNaN(r)&&(r=undefined)),r||r===0?e[n]=r:t===n&&t!=="range"&&(e[n]=!0)},attributeRules:function(t){var n={},r=e(t),i=t.getAttribute("type"),s,o;for(s in e.validator.methods)s==="required"?(o=t.getAttribute(s),o===""&&(o=!0),o=!!o):o=r.attr(s),this.normalizeAttributeRule(n,i,s,o);return n.maxlength&&/-1|2147483647|524288/.test(n.maxlength)&&delete n.maxlength,n},dataRules:function(t){var n={},r=e(t),i=t.getAttribute("type"),s,o;for(s in e.validator.methods)o=r.data("rule"+s.charAt(0).toUpperCase()+s.substring(1).toLowerCase()),this.normalizeAttributeRule(n,i,s,o);return n},staticRules:function(t){var n={},r=e.data(t.form,"validator");return r.settings.rules&&(n=e.validator.normalizeRule(r.settings.rules[t.name])||{}),n},normalizeRules:function(t,n){return e.each(t,function(r,i){if(i===!1){delete t[r];return}if(i.param||i.depends){var s=!0;switch(typeof i.depends){case"string":s=!!e(i.depends,n.form).length;break;case"function":s=i.depends.call(n,n)}s?t[r]=i.param!==undefined?i.param:!0:(e.data(n.form,"validator").resetElements(e(n)),delete t[r])}}),e.each(t,function(r,i){t[r]=e.isFunction(i)&&r!=="normalizer"?i(n):i}),e.each(["minlength","maxlength"],function(){t[this]&&(t[this]=Number(t[this]))}),e.each(["rangelength","range"],function(){var n;t[this]&&(e.isArray(t[this])?t[this]=[Number(t[this][0]),Number(t[this][1])]:typeof t[this]=="string"&&(n=t[this].replace(/[\[\]]/g,"").split(/[\s,]+/),t[this]=[Number(n[0]),Number(n[1])]))}),e.validator.autoCreateRanges&&(t.min!=null&&t.max!=null&&(t.range=[t.min,t.max],delete t.min,delete t.max),t.minlength!=null&&t.maxlength!=null&&(t.rangelength=[t.minlength,t.maxlength],delete t.minlength,delete t.maxlength)),t},normalizeRule:function(t){if(typeof t=="string"){var n={};e.each(t.split(/\s/),function(){n[this]=!0}),t=n}return t},addMethod:function(t,n,r){e.validator.methods[t]=n,e.validator.messages[t]=r!==undefined?r:e.validator.messages[t],n.length<3&&e.validator.addClassRules(t,e.validator.normalizeRule(t))},methods:{required:function(t,n,r){if(!this.depend(r,n))return"dependency-mismatch";if(n.nodeName.toLowerCase()==="select"){var i=e(n).val();return i&&i.length>0}return this.checkable(n)?this.getLength(t,n)>0:t.length>0},email:function(e,t){return this.optional(t)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)},url:function(e,t){return this.optional(t)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)},date:function(e,t){return this.optional(t)||!/Invalid|NaN/.test((new Date(e)).toString())},dateISO:function(e,t){return this.optional(t)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)},number:function(e,t){return this.optional(t)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)},digits:function(e,t){return this.optional(t)||/^\d+$/.test(e)},minlength:function(t,n,r){var i=e.isArray(t)?t.length:this.getLength(t,n);return this.optional(n)||i>=r},maxlength:function(t,n,r){var i=e.isArray(t)?t.length:this.getLength(t,n);return this.optional(n)||i<=r},rangelength:function(t,n,r){var i=e.isArray(t)?t.length:this.getLength(t,n);return this.optional(n)||i>=r[0]&&i<=r[1]},min:function(e,t,n){return this.optional(t)||e>=n},max:function(e,t,n){return this.optional(t)||e<=n},range:function(e,t,n){return this.optional(t)||e>=n[0]&&e<=n[1]},step:function(t,n,r){var i=e(n).attr("type"),s="Step attribute on input type "+i+" is not supported.",o=["text","number","range"],u=new RegExp("\\b"+i+"\\b"),a=i&&!u.test(o.join());if(a)throw new Error(s);return this.optional(n)||t%r===0},equalTo:function(t,n,r){var i=e(r);return this.settings.onfocusout&&i.not(".validate-equalTo-blur").length&&i.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){e(n).valid()}),t===i.val()},remote:function(t,n,r,i){if(this.optional(n))return"dependency-mismatch";i=typeof i=="string"&&i||"remote";var s=this.previousValue(n,i),o,u,a;return this.settings.messages[n.name]||(this.settings.messages[n.name]={}),s.originalMessage=s.originalMessage||this.settings.messages[n.name][i],this.settings.messages[n.name][i]=s.message,r=typeof r=="string"&&{url:r}||r,a=e.param(e.extend({data:t},r.data)),s.old===a?s.valid:(s.old=a,o=this,this.startRequest(n),u={},u[n.name]=t,e.ajax(e.extend(!0,{mode:"abort",port:"validate"+n.name,dataType:"json",data:u,context:o.currentForm,success:function(e){var r=e===!0||e==="true",u,a,f;o.settings.messages[n.name][i]=s.originalMessage,r?(f=o.formSubmitted,o.resetInternals(),o.toHide=o.errorsFor(n),o.formSubmitted=f,o.successList.push(n),o.invalid[n.name]=!1,o.showErrors()):(u={},a=e||o.defaultMessage(n,{method:i,parameters:t}),u[n.name]=s.message=a,o.invalid[n.name]=!0,o.showErrors(u)),s.valid=r,o.stopRequest(n,r)}},r)),"pending")}}});var t={},n;e.ajaxPrefilter?e.ajaxPrefilter(function(e,n,r){var i=e.port;e.mode==="abort"&&(t[i]&&t[i].abort(),t[i]=r)}):(n=e.ajax,e.ajax=function(r){var i=("mode"in r?r:e.ajaxSettings).mode,s=("port"in r?r:e.ajaxSettings).port;return i==="abort"?(t[s]&&t[s].abort(),t[s]=n.apply(this,arguments),t[s]):n.apply(this,arguments)})}),define("validate/validation_config",["jquery","validate/jquery.validate"],function(e){"use strict";e.validator.addMethod("nospace",function(e){return e.indexOf(" ")<0},"Value may not include the space character"),e.validator.addMethod("placeholder",function(t,n){return t!=e(n).attr("placeholder")},jQuery.validator.messages.required),jQuery.validator.addMethod("requiredSelect",function(e){return e!=-1},jQuery.validator.messages.required),jQuery.validator.addMethod("maskedCreditcard",function(e,t){return e.indexOf("*")===0||jQuery.validator.methods.creditcard.call(this,e,t)},jQuery.validator.messages.creditcard),jQuery.validator.addMethod("maskedPhone",function(e){return e.replace(/[^0-9]+/g,"").length===10},jQuery.validator.messages.phoneUS),jQuery.validator.addMethod("basicChar",function(e){var t=/^[a-zA-Z0-9 \!#\&\*\+,\._\-\:'"\?~@\$\(\)]+$/g;return t.test(e)},jQuery.validator.messages.basicChar),jQuery.validator.setDefaults({onfocusout:function(e){this.element(e)}})}),require(["jquery","validate/validation_config"],function(e){"use strict";e(document).ready(function(){var t=e("#honey").val();e("#contactForm").validate({rules:{name:{required:!0},email:{required:!0,email:!0},message:{required:!0}},messages:{name:{required:"Please Enter Your Name"},email:{required:"Please Enter Your Email Address",email:"Please Enter a Valid Email Address"},message:{required:"Please Enter a Message"}},submitHandler:function(n){if(t.length===0){var r=e("#contactForm").serialize();console.log(r),e.ajax({type:"POST",url:"https://formspree.io/dodey@icloud.com",data:r,dataType:"json",success:function(t){t==="OK"&&(e("#submitForm").hide(),e("#message").fadeIn("fast"),e("input, textarea").removeClass("valid").val(""))}})}}})})}),define("app/pages/contact",function(){});