window.onload = function() {
    var $ = jQuery.noConflict();

    var menu = $('.navigation');
    var lis = menu.find('li');

    var data = {};

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
                    data[part] = {};
                }

                prevPart = data[part];
            } else if(prevPart && j != parts.length -1) {
                if(!prevPart[part]) {
                    prevPart = prevPart[part] = {};
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

    var genHtml = function(data, tab) {
        var h = '';
        if(!data.hasOwnProperty('path')) {
            for(var d in data) {
                // Prevent any infinite recursions if they ever happen
                if(cur++ > max)
                    break;

                if(data[d].hasOwnProperty('path')) {
                    h += '<li data-ice="classDoc"><span><a href="' + data[d].path + '"> ' + d + '</a></span>';
                } else {
                    h += '<li data-ice="classDoc">' + capitalizeFirstLetter(d);
                }
                h += '<ul>';
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

    menu.html(html);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}