/*! squel | https://github.com/hiddentao/squel | BSD license */(function(){var a,b,c,d,e,f,g=[].slice,h={}.hasOwnProperty,i=function(a,b){return function(){return a.apply(b,arguments)}},j=function(a,b){function c(){this.constructor=a}for(var d in b)h.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};e=function(){var a,b,c,d,e,f,i;if(a=arguments[0],c=2<=arguments.length?g.call(arguments,1):[])for(f=0,i=c.length;i>f;f++)if(d=c[f])for(b in d)h.call(d,b)&&(e=d[b],a[b]=e);return a},f=function(){var a,b,c,d,f,h;for(b=arguments[0],d=2<=arguments.length?g.call(arguments,1):[],a=e({},b),f=0,h=d.length;h>f;f++)c=d[f],delete a[c];return a},b=function(a,b,c){var d,e,f;if("function"!=typeof b&&"string"!=typeof b)throw new Error("type must be a class constructor or string denoting 'typeof' result");if("function"!=typeof c)throw new Error("handler must be a function");for(e=0,f=a.length;f>e;e++)if(d=a[e],d.type===b)return void(d.handler=c);return a.push({type:b,handler:c})},a=function(){var a,b,c,d,e,f,h,i;for(d=arguments[0],a=2<=arguments.length?g.call(arguments,1):[],e=0,h=a.length;h>e;e++)for(b=a[e],f=0,i=b.length;i>f;f++)if(c=b[f],c.type===typeof d||"string"!=typeof c.type&&d instanceof c.type)return c.handler;return void 0},d=function(){var c,d,f,k,l,m,n;return c={},c.DefaultQueryBuilderOptions={autoQuoteTableNames:!1,autoQuoteFieldNames:!1,autoQuoteAliasNames:!0,nameQuoteCharacter:"`",tableAliasQuoteCharacter:"`",fieldAliasQuoteCharacter:'"',valueHandlers:[],numberedParameters:!1,numberedParametersStartAt:1,replaceSingleQuotes:!1,singleQuoteReplacement:"''",separator:" "},c.globalValueHandlers=[],c.registerValueHandler=function(a,d){return b(c.globalValueHandlers,a,d)},c.FuncVal=function(){function a(a,b){this.str=a,this.values=b}return a}(),c.fval=function(){var a,b;return a=arguments[0],b=2<=arguments.length?g.call(arguments,1):[],new c.FuncVal(a,b)},c.fval_handler=function(a,b){var c,d,e,f,g,h,i;if(null==b&&(b=!1),b)return{text:a.str,values:a.values};for(f=a.str,d="",g=a.values,e=h=0,i=f.length;i>=0?i>h:h>i;e=i>=0?++h:--h)c=f.charAt(e),"?"===c&&0<g.length&&(c=g.shift()),d+=c;return d},c.registerValueHandler(c.FuncVal,c.fval_handler),c.Cloneable=function(){function a(){}return a.prototype.clone=function(){var a;return a=new this.constructor,e(a,JSON.parse(JSON.stringify(this)))},a}(),c.BaseBuilder=function(d){function f(a){this._sanitizeNestableQuery=i(this._sanitizeNestableQuery,this);var b;b=JSON.parse(JSON.stringify(c.DefaultQueryBuilderOptions)),this.options=e({},b,a)}return j(f,d),f.prototype.registerValueHandler=function(a,c){return b(this.options.valueHandlers,a,c),this},f.prototype._getObjectClassName=function(a){var b;return a&&a.constructor&&a.constructor.toString&&(b=a.constructor.toString().match(/function\s*(\w+)/),b&&2===b.length)?b[1]:void 0},f.prototype._sanitizeCondition=function(a){if(!(a instanceof c.Expression)&&"string"!=typeof a)throw new Error("condition must be a string or Expression instance");return a},f.prototype._sanitizeName=function(a,b){if("string"!=typeof a)throw new Error(""+b+" must be a string");return a},f.prototype._sanitizeField=function(a,b){var d;return null==b&&(b={}),a instanceof c.QueryBuilder?a="("+a+")":(a=this._sanitizeName(a,"field name"),this.options.autoQuoteFieldNames&&(d=this.options.nameQuoteCharacter,a=b.ignorePeriodsForFieldNameQuotes?""+d+a+d:a.split(".").map(function(a){return"*"===a?a:""+d+a+d}).join("."))),a},f.prototype._sanitizeNestableQuery=function(a){if(a instanceof c.QueryBuilder&&a.isNestable())return a;throw new Error("must be a nestable query, e.g. SELECT")},f.prototype._sanitizeTable=function(a,b){var c,d;if(null==b&&(b=!1),b)if("string"==typeof a)d=a;else try{d=this._sanitizeNestableQuery(a)}catch(e){throw c=e,new Error("table name must be a string or a nestable query instance")}else d=this._sanitizeName(a,"table name");return this.options.autoQuoteTableNames?""+this.options.nameQuoteCharacter+d+this.options.nameQuoteCharacter:d},f.prototype._sanitizeTableAlias=function(a){var b;return b=this._sanitizeName(a,"table alias"),this.options.autoQuoteAliasNames?""+this.options.tableAliasQuoteCharacter+b+this.options.tableAliasQuoteCharacter:b},f.prototype._sanitizeFieldAlias=function(a){var b;return b=this._sanitizeName(a,"field alias"),this.options.autoQuoteAliasNames?""+this.options.fieldAliasQuoteCharacter+b+this.options.fieldAliasQuoteCharacter:b},f.prototype._sanitizeLimitOffset=function(a){if(a=parseInt(a),0>a||isNaN(a))throw new Error("limit/offset must be >= 0");return a},f.prototype._sanitizeValue=function(b){var d,e;if(d=typeof b,null===b);else if("string"===d||"number"===d||"boolean"===d);else if(b instanceof c.QueryBuilder&&b.isNestable());else if(b instanceof c.FuncVal);else if(e=void 0!==a(b,this.options.valueHandlers,c.globalValueHandlers),!e)throw new Error("field value must be a string, number, boolean, null or one of the registered custom value types");return b},f.prototype._escapeValue=function(a){return!0!==this.options.replaceSingleQuotes?a:a.replace(/\'/g,this.options.singleQuoteReplacement)},f.prototype._formatCustomValue=function(b,d){var e;return null==d&&(d=!1),e=a(b,this.options.valueHandlers,c.globalValueHandlers),e&&(b=e(b,d)),b},f.prototype._formatValueAsParam=function(a){var b,d=this;return Array.isArray(a)?a.map(function(a){return d._formatValueAsParam(a)}):a instanceof c.QueryBuilder&&a.isNestable()?(a.updateOptions({nestedBuilder:!0}),b=a.toParam()):a instanceof c.Expression?b=a.toParam():this._formatCustomValue(a,!0)},f.prototype._formatValue=function(a,b){var d,e,f=this;return null==b&&(b={}),d=this._formatCustomValue(a),d!==a?"("+d+")":(Array.isArray(a)?(a=a.map(function(a){return f._formatValue(a)}),a="("+a.join(", ")+")"):null===a?a="NULL":"boolean"==typeof a?a=a?"TRUE":"FALSE":a instanceof c.QueryBuilder?a="("+a+")":a instanceof c.Expression?a="("+a+")":"number"!=typeof a&&(b.dontQuote?a=""+a:(e=this._escapeValue(a),a="'"+e+"'")),a)},f}(c.Cloneable),c.Expression=function(a){function b(){var a=this;b.__super__.constructor.call(this),this.tree={parent:null,nodes:[]},this.current=this.tree,this._begin=function(b){var c;return c={type:b,parent:a.current,nodes:[]},a.current.nodes.push(c),a.current=a.current.nodes[a.current.nodes.length-1],a}}return j(b,a),b.prototype.tree=null,b.prototype.current=null,b.prototype.and_begin=function(){return this._begin("AND")},b.prototype.or_begin=function(){return this._begin("OR")},b.prototype.end=function(){if(!this.current.parent)throw new Error("begin() needs to be called");return this.current=this.current.parent,this},b.prototype.and=function(a,b){if(!a||"string"!=typeof a)throw new Error("expr must be a string");return this.current.nodes.push({type:"AND",expr:a,para:b}),this},b.prototype.or=function(a,b){if(!a||"string"!=typeof a)throw new Error("expr must be a string");return this.current.nodes.push({type:"OR",expr:a,para:b}),this},b.prototype.toString=function(){if(null!==this.current.parent)throw new Error("end() needs to be called");return this._toString(this.tree)},b.prototype.toParam=function(){if(null!==this.current.parent)throw new Error("end() needs to be called");return this._toString(this.tree,!0)},b.prototype._toString=function(a,b){var c,d,e,f,g,h,i,j,k;for(null==b&&(b=!1),h="",g=[],k=a.nodes,i=0,j=k.length;j>i;i++)c=k[i],null!=c.expr?(f=c.expr,void 0!==c.para&&(b?(d=this._formatValueAsParam(c.para),null!=(null!=d?d.text:void 0)?(g=g.concat(d.values),f=f.replace("?","("+d.text+")")):g=g.concat(d),Array.isArray(c.para)&&(e=Array.apply(null,new Array(c.para.length)).map(function(){return"?"}),f=f.replace("?","("+e.join(", ")+")"))):f=f.replace("?",this._formatValue(c.para)))):(f=this._toString(c,b),b&&(g=g.concat(f.values),f=f.text),""!==f&&(f="("+f+")")),""!==f&&(""!==h&&(h+=" "+c.type+" "),h+=f);return b?{text:h,values:g}:h},b.prototype.clone=function(){var a,b;return a=new this.constructor,(b=function(c){var d,e,f,g,h;for(g=c.nodes,h=[],e=0,f=g.length;f>e;e++)d=g[e],null!=d.expr?h.push(a.current.nodes.push(JSON.parse(JSON.stringify(d)))):(a._begin(d.type),b(d),h.push(!this.current===d?a.end():void 0));return h})(this.tree),a},b}(c.BaseBuilder),c.Block=function(a){function b(){return d=b.__super__.constructor.apply(this,arguments)}return j(b,a),b.prototype.exposedMethods=function(){var a,b,d;b={};for(a in this)d=this[a],"function"!=typeof d||"_"===a.charAt(0)||c.Block.prototype[a]||(b[a]=d);return b},b.prototype.buildStr=function(){return""},b.prototype.buildParam=function(a){return{text:this.buildStr(a),values:[]}},b}(c.BaseBuilder),c.StringBlock=function(a){function b(a,c){b.__super__.constructor.call(this,a),this.str=c}return j(b,a),b.prototype.buildStr=function(){return this.str},b}(c.Block),c.AbstractValueBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this._val=null}return j(b,a),b.prototype._setValue=function(a){return this._val=a},b.prototype.buildStr=function(){return this._val?this._val:""},b}(c.Block),c.AbstractTableBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this.tables=[]}return j(b,a),b.prototype._table=function(a,b){return null==b&&(b=null),b&&(b=this._sanitizeTableAlias(b)),a=this._sanitizeTable(a,this.options.allowNested||!1),this.options.singleTable&&(this.tables=[]),this.tables.push({table:a,alias:b})},b.prototype.buildStr=function(){var a,b,c,d,e;if(0>=this.tables.length)throw new Error("_table() needs to be called");for(b="",e=this.tables,c=0,d=e.length;d>c;c++)a=e[c],""!==b&&(b+=", "),b+="string"==typeof a.table?a.table:"("+a.table+")",a.alias&&(b+=" "+a.alias);return b},b.prototype._buildParam=function(a,b){var d,e,f,g,h,i,j,k,l,m,n,o,p,q;if(null==b&&(b=null),h={text:"",values:[]},g=[],f="",0>=this.tables.length)return h;for(p=this.tables,j=0,m=p.length;m>j;j++)d=p[j],"string"==typeof d.table?e={text:""+d.table,values:[]}:d.table instanceof c.QueryBuilder?(d.table.updateOptions({nestedBuilder:!0}),e=d.table.toParam()):(d.updateOptions({nestedBuilder:!0}),e=d.buildParam(a)),e.table=d,g.push(e);for(k=0,n=g.length;n>k;k++)for(e=g[k],""!==f?f+=", ":null!=b&&""!==b&&(f+=""+b+" "+f),f+="string"==typeof e.table.table?""+e.text:"("+e.text+")",null!=e.table.alias&&(f+=" "+e.table.alias),q=e.values,l=0,o=q.length;o>l;l++)i=q[l],h.values.push(this._formatCustomValue(i));return h.text+=f,h},b.prototype.buildParam=function(a){return this._buildParam(a)},b}(c.Block),c.UpdateTableBlock=function(a){function b(){return f=b.__super__.constructor.apply(this,arguments)}return j(b,a),b.prototype.table=function(a,b){return null==b&&(b=null),this._table(a,b)},b}(c.AbstractTableBlock),c.FromTableBlock=function(a){function b(){return k=b.__super__.constructor.apply(this,arguments)}return j(b,a),b.prototype.from=function(a,b){return null==b&&(b=null),this._table(a,b)},b.prototype.buildStr=function(a){var c;if(0>=this.tables.length)throw new Error("from() needs to be called");return c=b.__super__.buildStr.call(this,a),"FROM "+c},b.prototype.buildParam=function(a){if(0>=this.tables.length)throw new Error("from() needs to be called");return this._buildParam(a,"FROM")},b}(c.AbstractTableBlock),c.IntoTableBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this.table=null}return j(b,a),b.prototype.into=function(a){return this.table=this._sanitizeTable(a,!1)},b.prototype.buildStr=function(){if(!this.table)throw new Error("into() needs to be called");return"INTO "+this.table},b}(c.Block),c.GetFieldBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this._fieldAliases={},this._fields=[]}return j(b,a),b.prototype.fields=function(a,b){var c,d,e,f,g,h;if(null==b&&(b={}),Array.isArray(a)){for(g=[],e=0,f=a.length;f>e;e++)d=a[e],g.push(this.field(d,null,b));return g}h=[];for(d in a)c=a[d],h.push(this.field(d,c,b));return h},b.prototype.field=function(a,b,c){return null==b&&(b=null),null==c&&(c={}),a=this._sanitizeField(a,c),b&&(b=this._sanitizeFieldAlias(b)),this._fieldAliases[a]!==b?(this._fieldAliases[a]=b,this._fields.push({name:a,alias:b})):void 0},b.prototype.buildStr=function(){var a,b,c,d,e;for(b="",e=this._fields,c=0,d=e.length;d>c;c++)a=e[c],""!==b&&(b+=", "),b+=a.name,a.alias&&(b+=" AS "+a.alias);return""===b?"*":b},b}(c.Block),c.AbstractSetFieldBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this.fieldOptions=[],this.fields=[],this.values=[]}return j(b,a),b.prototype._set=function(a,b,c){var d;if(null==c&&(c={}),this.values.length>1)throw new Error("Cannot call set or setFields on multiple rows of fields.");return void 0!==b&&(b=this._sanitizeValue(b)),d=this.fields.indexOf(this._sanitizeField(a,c)),-1!==d?(this.values[0][d]=b,this.fieldOptions[0][d]=c):(this.fields.push(this._sanitizeField(a,c)),d=this.fields.length-1,Array.isArray(this.values[0])?(this.values[0][d]=b,this.fieldOptions[0][d]=c):(this.values.push([b]),this.fieldOptions.push([c]))),this},b.prototype._setFields=function(a,b){var c;if(null==b&&(b={}),"object"!=typeof a)throw new Error("Expected an object but got "+typeof a);for(c in a)h.call(a,c)&&this._set(c,a[c],b);return this},b.prototype._setFieldsRows=function(a,b){var c,d,e,f,g,i,j;if(null==b&&(b={}),!Array.isArray(a))throw new Error("Expected an array of objects but got "+typeof a);for(this.fields=[],this.values=[],d=g=0,i=a.length;i>=0?i>g:g>i;d=i>=0?++g:--g){j=a[d];for(c in j)if(h.call(j,c)){if(e=this.fields.indexOf(this._sanitizeField(c,b)),d>0&&-1===e)throw new Error("All fields in subsequent rows must match the fields in the first row");-1===e&&(this.fields.push(this._sanitizeField(c,b)),e=this.fields.length-1),f=this._sanitizeValue(a[d][c]),Array.isArray(this.values[d])?(this.values[d][e]=f,this.fieldOptions[d][e]=b):(this.values[d]=[f],this.fieldOptions[d]=[b])}}return this},b.prototype.buildStr=function(){throw new Error("Not yet implemented")},b.prototype.buildParam=function(){throw new Error("Not yet implemented")},b}(c.Block),c.SetFieldBlock=function(a){function b(){return l=b.__super__.constructor.apply(this,arguments)}return j(b,a),b.prototype.set=function(a,b,c){return this._set(a,b,c)},b.prototype.setFields=function(a,b){return this._setFields(a,b)},b.prototype.buildStr=function(){var a,b,c,d,e,f,g;if(0>=this.fields.length)throw new Error("set() needs to be called");for(d="",c=f=0,g=this.fields.length;g>=0?g>f:f>g;c=g>=0?++f:--f)a=this.fields[c],""!==d&&(d+=", "),e=this.values[0][c],b=this.fieldOptions[0][c],d+="undefined"==typeof e?a:""+a+" = "+this._formatValue(e,b);return"SET "+d},b.prototype.buildParam=function(){var a,b,c,d,e,f,g,h,i,j,k,l;if(0>=this.fields.length)throw new Error("set() needs to be called");for(d="",f=[],b=h=0,k=this.fields.length;k>=0?k>h:h>k;b=k>=0?++h:--h)if(a=this.fields[b],""!==d&&(d+=", "),g=this.values[0][b],"undefined"==typeof g)d+=a;else if(c=this._formatValueAsParam(g),null!=(null!=c?c.text:void 0))for(d+=""+a+" = ("+c.text+")",l=c.values,i=0,j=l.length;j>i;i++)e=l[i],f.push(e);else d+=""+a+" = ?",f.push(c);return{text:"SET "+d,values:f}},b}(c.AbstractSetFieldBlock),c.InsertFieldValueBlock=function(a){function b(){return m=b.__super__.constructor.apply(this,arguments)}return j(b,a),b.prototype.set=function(a,b,c){return null==c&&(c={}),this._set(a,b,c)},b.prototype.setFields=function(a,b){return this._setFields(a,b)},b.prototype.setFieldsRows=function(a,b){return this._setFieldsRows(a,b)},b.prototype._buildVals=function(){var a,b,c,d,e,f,g,h;for(d=[],b=e=0,g=this.values.length;g>=0?g>e:e>g;b=g>=0?++e:--e)for(c=f=0,h=this.values[b].length;h>=0?h>f:f>h;c=h>=0?++f:--f)a=this._formatValue(this.values[b][c],this.fieldOptions[b][c]),"string"==typeof d[b]?d[b]+=", "+a:d[b]=""+a;return d},b.prototype._buildValParams=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n;for(g=[],d=[],a=h=0,l=this.values.length;l>=0?l>h:h>l;a=l>=0?++h:--h)for(b=i=0,m=this.values[a].length;m>=0?m>i:i>m;b=m>=0?++i:--i){if(c=this._formatValueAsParam(this.values[a][b]),null!=(null!=c?c.text:void 0))for(e=c.text,n=c.values,j=0,k=n.length;k>j;j++)f=n[j],d.push(f);else e="?",d.push(c);"string"==typeof g[a]?g[a]+=", "+e:g[a]=""+e}return{vals:g,params:d}},b.prototype.buildStr=function(){return 0>=this.fields.length?"":"("+this.fields.join(", ")+") VALUES ("+this._buildVals().join("), (")+")"},b.prototype.buildParam=function(){var a,b,c,d,e,f,g;if(0>=this.fields.length)return{text:"",values:[]};for(c="",f=this._buildValParams(),d=f.vals,b=f.params,a=e=0,g=this.fields.length;g>=0?g>e:e>g;a=g>=0?++e:--e)""!==c&&(c+=", "),c+=this.fields[a];return{text:"("+c+") VALUES ("+d.join("), (")+")",values:b}},b}(c.AbstractSetFieldBlock),c.InsertFieldsFromQueryBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this._fields=[],this._query=null}return j(b,a),b.prototype.fromQuery=function(a,b){var c=this;return this._fields=a.map(function(a){return c._sanitizeField(a)}),this._query=this._sanitizeNestableQuery(b)},b.prototype.buildStr=function(){return 0>=this._fields.length?"":"("+this._fields.join(", ")+") ("+this._query.toString()+")"},b.prototype.buildParam=function(){var a;return 0>=this._fields.length?{text:"",values:[]}:(a=this._query.toParam(),{text:"("+this._fields.join(", ")+") ("+a.text+")",values:a.values})},b}(c.Block),c.DistinctBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this.useDistinct=!1}return j(b,a),b.prototype.distinct=function(){return this.useDistinct=!0},b.prototype.buildStr=function(){return this.useDistinct?"DISTINCT":""},b}(c.Block),c.GroupByBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this.groups=[]}return j(b,a),b.prototype.group=function(a){return a=this._sanitizeField(a),this.groups.push(a)},b.prototype.buildStr=function(){var a,b,c,d,e;if(b="",0<this.groups.length){for(e=this.groups,c=0,d=e.length;d>c;c++)a=e[c],""!==b&&(b+=", "),b+=a;b="GROUP BY "+b}return b},b}(c.Block),c.OffsetBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this.offsets=null}return j(b,a),b.prototype.offset=function(a){return a=this._sanitizeLimitOffset(a),this.offsets=a},b.prototype.buildStr=function(){return this.offsets?"OFFSET "+this.offsets:""},b}(c.Block),c.WhereBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this.wheres=[]}return j(b,a),b.prototype.where=function(){var a,b,d,e,f,h,i,j,k,l,m,n,o,p;if(b=arguments[0],l=2<=arguments.length?g.call(arguments,1):[],b=this._sanitizeCondition(b),d="",e=[],b instanceof c.Expression)k=b.toParam(),d=k.text,e=k.values;else for(f=m=0,p=b.length;p>=0?p>m:m>p;f=p>=0?++m:--m)if(a=b.charAt(f),"?"===a&&0<l.length)if(j=l.shift(),Array.isArray(j)){for(h=[],n=0,o=j.length;o>n;n++)i=j[n],h.push(this._sanitizeValue(i));e=e.concat(h),d+="("+function(){var a,b,c;for(c=[],a=0,b=h.length;b>a;a++)i=h[a],c.push("?");return c}().join(", ")+")"}else d+="?",e.push(this._sanitizeValue(j));else d+=a;return""!==d?this.wheres.push({text:d,values:e}):void 0},b.prototype.buildStr=function(){var a,b,c,d,e,f,g,h,i,j;if(0>=this.wheres.length)return"";for(e="",i=this.wheres,f=0,h=i.length;h>f;f++)if(d=i[f],""!==e&&(e+=") AND ("),0<d.values.length)for(c=0,b=g=0,j=d.text.length;j>=0?j>g:g>j;b=j>=0?++g:--g)a=d.text.charAt(b),e+="?"===a?this._formatValue(d.values[c++]):a;else e+=d.text;return"WHERE ("+e+")"},b.prototype.buildParam=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q;if(d={text:"",values:[]},0>=this.wheres.length)return d;for(h="",o=this.wheres,i=0,l=o.length;l>i;i++){for(g=o[i],""!==h&&(h+=") AND ("),e=g.text.split("?"),a=0,p=g.values,j=0,m=p.length;m>j;j++){if(f=p[j],null!=e[a]&&(h+=""+e[a]),b=this._formatValueAsParam(f),null!=(null!=b?b.text:void 0))for(h+="("+b.text+")",q=b.values,k=0,n=q.length;n>k;k++)c=q[k],d.values.push(c);else h+="?",d.values.push(b);a+=1}null!=e[a]&&(h+=""+e[a])}return d.text="WHERE ("+h+")",d},b}(c.Block),c.OrderByBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this.orders=[],this._values=[]}return j(b,a),b.prototype.order=function(){var a,b,c;return b=arguments[0],a=arguments[1],c=3<=arguments.length?g.call(arguments,2):[],null==a&&(a=!0),b=this._sanitizeField(b),this._values=c,this.orders.push({field:b,dir:a?!0:!1})},b.prototype._buildStr=function(a){var b,c,d,e,f,g,h,i,j,k,l;if(null==a&&(a=!1),0<this.orders.length){for(g=0,f="",k=this.orders,h=0,j=k.length;j>h;h++){if(e=k[h],""!==f&&(f+=", "),c="",a)c=e.field;else for(d=i=0,l=e.field.length;l>=0?l>i:i>l;d=l>=0?++i:--i)b=e.field.charAt(d),c+="?"===b?this._formatValue(this._values[g++]):b;f+=""+c+" "+(e.dir?"ASC":"DESC")}return"ORDER BY "+f}return""},b.prototype.buildStr=function(){return this._buildStr()},b.prototype.buildParam=function(){var a=this;return{text:this._buildStr(!0),values:this._values.map(function(b){return a._formatValueAsParam(b)})}},b}(c.Block),c.LimitBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this.limits=null}return j(b,a),b.prototype.limit=function(a){return a=this._sanitizeLimitOffset(a),this.limits=a},b.prototype.buildStr=function(){return this.limits?"LIMIT "+this.limits:""},b}(c.Block),c.JoinBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this.joins=[]}return j(b,a),b.prototype.join=function(a,b,c,d){return null==b&&(b=null),null==c&&(c=null),null==d&&(d="INNER"),a=this._sanitizeTable(a,!0),b&&(b=this._sanitizeTableAlias(b)),c&&(c=this._sanitizeCondition(c)),this.joins.push({type:d,table:a,alias:b,condition:c}),this},b.prototype.left_join=function(a,b,c){return null==b&&(b=null),null==c&&(c=null),this.join(a,b,c,"LEFT")},b.prototype.right_join=function(a,b,c){return null==b&&(b=null),null==c&&(c=null),this.join(a,b,c,"RIGHT")},b.prototype.outer_join=function(a,b,c){return null==b&&(b=null),null==c&&(c=null),this.join(a,b,c,"OUTER")},b.prototype.left_outer_join=function(a,b,c){return null==b&&(b=null),null==c&&(c=null),this.join(a,b,c,"LEFT OUTER")},b.prototype.full_join=function(a,b,c){return null==b&&(b=null),null==c&&(c=null),this.join(a,b,c,"FULL")},b.prototype.cross_join=function(a,b,c){return null==b&&(b=null),null==c&&(c=null),this.join(a,b,c,"CROSS")},b.prototype.buildStr=function(){var a,b,c,d,e;for(b="",e=this.joins||[],c=0,d=e.length;d>c;c++)a=e[c],""!==b&&(b+=" "),b+=""+a.type+" JOIN ",b+="string"==typeof a.table?a.table:"("+a.table+")",a.alias&&(b+=" "+a.alias),a.condition&&(b+=" ON ("+a.condition+")");return b},b.prototype.buildParam=function(a){var b,d,e,f,g,h,i,j,k,l,m,n,o,p,q;if(h={text:"",values:[]},g=[],e="",0>=this.joins.length)return h;for(p=this.joins,j=0,m=p.length;m>j;j++)b=p[j],"string"==typeof b.table?f={text:""+b.table,values:[]}:b.table instanceof c.QueryBuilder?(b.table.updateOptions({nestedBuilder:!0}),f=b.table.toParam()):(b.updateOptions({nestedBuilder:!0}),f=b.buildParam(a)),b.condition instanceof c.Expression?(d=b.condition.toParam(),f.condition=d.text,f.values=f.values.concat(d.values)):f.condition=b.condition,f.join=b,g.push(f);for(k=0,n=g.length;n>k;k++)for(f=g[k],""!==e&&(e+=" "),e+=""+f.join.type+" JOIN ",e+="string"==typeof f.join.table?f.text:"("+f.text+")",f.join.alias&&(e+=" "+f.join.alias),f.condition&&(e+=" ON ("+f.condition+")"),q=f.values,l=0,o=q.length;o>l;l++)i=q[l],h.values.push(this._formatCustomValue(i));return h.text+=e,h},b}(c.Block),c.UnionBlock=function(a){function b(a){b.__super__.constructor.call(this,a),this.unions=[]}return j(b,a),b.prototype.union=function(a,b){return null==b&&(b="UNION"),a=this._sanitizeTable(a,!0),this.unions.push({type:b,table:a}),this},b.prototype.union_all=function(a){return this.union(a,"UNION ALL")},b.prototype.buildStr=function(){var a,b,c,d,e;for(b="",e=this.unions||[],c=0,d=e.length;d>c;c++)a=e[c],""!==b&&(b+=" "),b+=""+a.type+" ",b+="string"==typeof a.table?a.table:"("+a.table+")";return b},b.prototype.buildParam=function(a){var b,d,e,f,g,h,i,j,k,l,m,n,o,p;if(f={text:"",values:[]},e=[],g="",0>=this.unions.length)return f;for(o=this.unions||[],i=0,l=o.length;l>i;i++)b=o[i],"string"==typeof b.table?d={text:""+b.table,values:[]}:b.table instanceof c.QueryBuilder?(b.table.updateOptions({nestedBuilder:!0}),d=b.table.toParam()):(b.updateOptions({nestedBuilder:!0}),d=b.buildParam(a)),d.type=b.type,e.push(d);for(j=0,m=e.length;m>j;j++)for(d=e[j],""!==g&&(g+=" "),g+=""+d.type+" ("+d.text+")",p=d.values,k=0,n=p.length;n>k;k++)h=p[k],f.values.push(this._formatCustomValue(h));return f.text+=g,f},b}(c.Block),c.QueryBuilder=function(a){function b(a,c){var d,e,f,g,h,i,j,k,l=this;for(b.__super__.constructor.call(this,a),this.blocks=c||[],j=this.blocks,h=0,i=j.length;i>h;h++){d=j[h],k=d.exposedMethods(),g=function(a,b,c){return l[b]=function(){return c.apply(a,arguments),l}};for(f in k){if(e=k[f],null!=this[f])throw new Error(""+this._getObjectClassName(this)+" already has a builder method called: "+f);g(d,f,e)}}}return j(b,a),b.prototype.registerValueHandler=function(a,c){var d,e,f,g;for(g=this.blocks,e=0,f=g.length;f>e;e++)d=g[e],d.registerValueHandler(a,c);return b.__super__.registerValueHandler.call(this,a,c),this},b.prototype.updateOptions=function(a){var b,c,d,f,g;for(this.options=e({},this.options,a),f=this.blocks,g=[],c=0,d=f.length;d>c;c++)b=f[c],g.push(b.options=e({},b.options,a));return g},b.prototype.toString=function(){var a;return function(){var b,c,d,e;for(d=this.blocks,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.buildStr(this));return e}.call(this).filter(function(a){return 0<a.length}).join(this.options.separator)},b.prototype.toParam=function(a){var b,c,d,f,g,h;return null==a&&(a=void 0),f=this.options,null!=a&&(this.options=e({},this.options,a)),g={text:"",values:[]},c=function(){var a,c,d,e;for(d=this.blocks,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b.buildParam(this));return e}.call(this),g.text=function(){var a,d,e;for(e=[],a=0,d=c.length;d>a;a++)b=c[a],e.push(b.text);return e}().filter(function(a){return 0<a.length}).join(this.options.separator),g.values=(h=[]).concat.apply(h,function(){var a,d,e;for(e=[],a=0,d=c.length;d>a;a++)b=c[a],e.push(b.values);return e}()),null==this.options.nestedBuilder&&(this.options.numberedParameters||null!=(null!=a?a.numberedParametersStartAt:void 0))&&(d=1,null!=this.options.numberedParametersStartAt&&(d=this.options.numberedParametersStartAt),g.text=g.text.replace(/\?/g,function(){return"$"+d++})),this.options=f,g},b.prototype.clone=function(){var a;return new this.constructor(this.options,function(){var b,c,d,e;for(d=this.blocks,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.clone());return e}.call(this))},b.prototype.isNestable=function(){return!1},b}(c.BaseBuilder),c.Select=function(a){function b(a,d){null==d&&(d=null),d||(d=[new c.StringBlock(a,"SELECT"),new c.DistinctBlock(a),new c.GetFieldBlock(a),new c.FromTableBlock(e({},a,{allowNested:!0})),new c.JoinBlock(e({},a,{allowNested:!0})),new c.WhereBlock(a),new c.GroupByBlock(a),new c.OrderByBlock(a),new c.LimitBlock(a),new c.OffsetBlock(a),new c.UnionBlock(e({},a,{allowNested:!0}))]),b.__super__.constructor.call(this,a,d)}return j(b,a),b.prototype.isNestable=function(){return!0},b}(c.QueryBuilder),c.Update=function(a){function b(a,d){null==d&&(d=null),d||(d=[new c.StringBlock(a,"UPDATE"),new c.UpdateTableBlock(a),new c.SetFieldBlock(a),new c.WhereBlock(a),new c.OrderByBlock(a),new c.LimitBlock(a)]),b.__super__.constructor.call(this,a,d)}return j(b,a),b}(c.QueryBuilder),c.Delete=function(a){function b(a,d){null==d&&(d=null),d||(d=[new c.StringBlock(a,"DELETE"),new c.FromTableBlock(e({},a,{singleTable:!0})),new c.JoinBlock(a),new c.WhereBlock(a),new c.OrderByBlock(a),new c.LimitBlock(a)]),b.__super__.constructor.call(this,a,d)}return j(b,a),b}(c.QueryBuilder),c.Insert=function(a){function b(a,d){null==d&&(d=null),d||(d=[new c.StringBlock(a,"INSERT"),new c.IntoTableBlock(a),new c.InsertFieldValueBlock(a),new c.InsertFieldsFromQueryBlock(a)]),b.__super__.constructor.call(this,a,d)}return j(b,a),b}(c.QueryBuilder),n={VERSION:"4.0.0",expr:function(){return new c.Expression},select:function(a,b){return new c.Select(a,b)},update:function(a,b){return new c.Update(a,b)},insert:function(a,b){return new c.Insert(a,b)},"delete":function(a,b){return new c.Delete(a,b)},registerValueHandler:c.registerValueHandler,fval:c.fval},n.remove=n["delete"],n.cls=c,n},c=d(),("undefined"!=typeof define&&null!==define?define.amd:void 0)?define(function(){return c}):("undefined"!=typeof module&&null!==module?module.exports:void 0)?module.exports=c:"undefined"!=typeof window&&null!==window&&(window.squel=c),c.flavours={},c.useFlavour=function(a){var b;if(null==a&&(a=null),!a)return c;if(c.flavours[a]instanceof Function)return b=d(),c.flavours[a].call(null,b),b;throw new Error("Flavour not available: "+a)}}).call(this);