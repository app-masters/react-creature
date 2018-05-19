"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: "strip",
        value: function strip(html) {
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
        }
    }, {
        key: "getSocialMostRelevant",
        value: function getSocialMostRelevant(data) {
            return data.filter(function (profile) {
                return ['facebook', 'twitter', 'linkedin', 'instagram', 'pinterest'].indexOf(profile.typeId) > -1;
            });
        }
    }, {
        key: "getCreatureOrPerson",
        value: function getCreatureOrPerson(props) {
            if (props.creature) {
                var creatureObj = JSON.parse(JSON.stringify(props.creature));
                if (creatureObj) return creatureObj;else return props.creature;
            }
            if (props.person) {
                var person = JSON.parse(JSON.stringify(props.person));

                var socialProfiles = Util.socialObjToArray(person);

                var creature = {
                    photos: [{ url: person.photoUrl }],
                    contactInfo: {
                        fullName: person.name
                    },
                    socialProfiles: socialProfiles
                };

                return creature;
            }
        }
    }, {
        key: "socialObjToArray",
        value: function socialObjToArray(person) {
            var result = [];
            Util.socialNetworks.map(function (social) {
                if (person[social]) result.push({ "typeId": social, "url": person[social] });
            });

            return result;
        }
    }, {
        key: "formatNumber",
        value: function formatNumber(n) {
            return n.toFixed(0).replace(/./g, function (c, i, a) {
                return i && c !== "." && (a.length - i) % 3 === 0 ? '.' + c : c;
            });
        }
    }]);

    return Util;
}();

Util.socialNetworks = ['facebook', 'twitter', 'instagram', 'linkedin', 'pinterest'];

exports.default = Util;