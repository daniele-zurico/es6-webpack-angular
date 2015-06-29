window.onload = function() {
    var $ = jQuery.noConflict();

    var menu = $('.navigation');
    var lis = menu.find('li');

    var data = {};
    var index = 0;

    for(var i = 0; i < lis.length; i++) {
        var li = lis[i];
        var link = $(li).find('a').attr('href');
        var name = $(li).find('a').html();
        var parts = link.split('/');
        var prevPart = undefined;

        for(var j = 2; j < parts.length; j++) {
            var part = parts[j];

            if(j == 2) {
                if(!data[part]) {
                    data[part] = {index: index++};
                }

                prevPart = data[part];
            } else if(prevPart && j != parts.length -1) {
                if(!prevPart[part]) {
                    prevPart = prevPart[part] = {index: index++};
                } else {
                    prevPart = prevPart[part];
                }
            } else if(j == parts.length - 1) {
                prevPart[name] = {path: link}
            }
        }
    }

    var cur = 0
    var max = 1000;
    var cookieObj = {};
    var hasNew = false;

    if(getCookie('docState'))
    {
        cookieObj = JSON.parse(getCookie('docState'));
        console.log("ffff:" + cookieObj)
    }

    var genHtml = function(data, tab) {
        var h = '';

        if(!data.hasOwnProperty('path')) {


            for(var d in data) {
                if (d == 'index')
                    continue
                // Prevent any infinite recursions if they ever happen
                if(cur++ > max)
                    break;

                if(data[d].hasOwnProperty('path')) {
                    h += '<li data-ice="classDoc"><span><a href="' + data[d].path + '"> ' + d + '</a></span>';
                } else {
                    var state = 1;

                    if(cookieObj.hasOwnProperty(data[d].index))
                    {
                        state = cookieObj[data[d].index];
                    }
                    else
                    {
                        cookieObj[data[d].index] = state;
                        hasNew = true;
                    }

                    var cls = state == 1 ? "fa-folder-open" : "fa-folder";

                    h += '<li data-ice="classDoc"> <span class="expandContract fa ' + cls + '" index="' + data[d].index + '"></span>' + capitalizeFirstLetter(d);
                }
                h += '<ul state="' + state + '">';
                if(Object.keys(data[d]).length > 0) {
                    h += genHtml(data[d], ' ');
                }
            }

        }

        h += '</ul>';
        h += '</li>';
        return h;
    }

    var html = '<div data-ice="classWrap" id="navcontainer">' +
      '           <h2>Class</h2>' +
      '               <ul>';

    html += genHtml(data);


    html += '           </ul>' +
      '           </div>';

    menu.html(redrawByState($, html));
    $('.navigation').show();


    if(hasNew) {
        hasNew = false;
        createCookie('docState', JSON.stringify(cookieObj));
    }

    $('.expandContract').click(function(){
        $(this).toggleClass("fa-folder-open").toggleClass("fa-folder");
        var elm = $(this).parent().children()[1];
        var parent = $(this).parent().children()[0];

        if ($(this).hasClass("fa-folder")){
            $(elm).hide();
            cookieObj[parent.attributes[1].value] = 0;
        }
        else {
            $(elm).show();
            cookieObj[parent.attributes[1].value] = 1;
        }

        createCookie('docState', JSON.stringify(cookieObj));
    });
};

function redrawByState($, html){
    var data = $(html);
    data.find('ul[state="0"]').each(function() {
        $(this).hide();
    });

    return data[0].outerHTML;
}

function createCookie(name,value) {
    var $ = jQuery.noConflict();
    $.jStorage.set(name, value)
}

function getCookie(c_name) {
    var $ = jQuery.noConflict();
    return $.jStorage.get(c_name);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}