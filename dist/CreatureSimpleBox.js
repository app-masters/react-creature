'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _img = require('../img/');

var _img2 = _interopRequireDefault(_img);

var _reactFlexboxGrid = require('react-flexbox-grid');

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import {Col, Row} from "react-grid-system";

var CreatureSimpleBox = function (_Component) {
    _inherits(CreatureSimpleBox, _Component);

    function CreatureSimpleBox() {
        _classCallCheck(this, CreatureSimpleBox);

        return _possibleConstructorReturn(this, (CreatureSimpleBox.__proto__ || Object.getPrototypeOf(CreatureSimpleBox)).apply(this, arguments));
    }

    _createClass(CreatureSimpleBox, [{
        key: 'render',
        value: function render() {
            var creature = _util2.default.getCreatureOrPerson(this.props);
            console.log("creature..", this.props.creature);

            if (creature.status === 404) {
                return _react2.default.createElement(
                    'div',
                    { style: styles.card },
                    _react2.default.createElement(
                        'b',
                        null,
                        creature.email
                    ),
                    ' - n\xE3o encontrado'
                );
            }

            if (creature.status === 202) {
                return _react2.default.createElement(
                    'div',
                    { style: styles.card },
                    _react2.default.createElement(
                        'b',
                        null,
                        creature.email
                    ),
                    ' - ainda procurando...'
                );
            }

            return _react2.default.createElement(
                'div',
                { style: styles.card },
                this.renderPhoto(creature.photos),
                this.renderName(creature.contactInfo),
                this.renderSocialLinks(creature.socialProfiles)
            );
        }
    }, {
        key: 'renderPhoto',
        value: function renderPhoto(data) {
            // console.log("photos", data);
            var photoUrl = void 0;
            if (this.props.showPhoto === false || !data || data.length === 0) photoUrl = "http://servotech.in/wp-content/uploads/2016/10/user-icon-placeholder.png";else {
                var photo = JSON.parse(JSON.stringify(data.shift()));
                photoUrl = photo.url;
            }
            // if (!photo) return null;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: styles.photos.container },
                    _react2.default.createElement('img', { src: photoUrl, style: styles.photos.photo })
                )
            );
        }
    }, {
        key: 'renderName',
        value: function renderName(data) {
            if (this.props.showName === false || !data) return null;
            var name = null;
            if (data.fullName) name = data.fullName;else if (data.givenName) name = data.givenName;
            if (!name) return null;

            return _react2.default.createElement(
                'div',
                { style: styles.name },
                name
            );
        }
    }, {
        key: 'renderSocialLinks',
        value: function renderSocialLinks(data) {
            // console.log("socialProfiles", data);
            if (this.props.showSocial === false || !data) return null;
            data = _util2.default.getSocialMostRelevant(data);
            // Move icon method to utils
            // Implement mostRelevant to social links
            var profiles = data.map(function (profile) {
                var icon = null;
                icon = _img2.default[profile.typeId];
                return _react2.default.createElement(
                    'a',
                    { href: profile.url, style: styles.social.profile },
                    _react2.default.createElement('img', { style: styles.socialIcon, src: icon })
                );
            });

            if (!profiles) return null;

            return _react2.default.createElement(
                'div',
                { style: styles.social.profiles },
                profiles
            );
        }
    }]);

    return CreatureSimpleBox;
}(_react.Component);

var styles = {
    card: {
        boxShadow: '0 2px 2px 2px rgba(140, 140, 140, 0.11)',
        borderColor: '#c3c3c3',
        borderWidth: 1,
        borderStyle: 'solid',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 6,
        marginLeft: 8,
        marginTop: 8,
        marginRight: 8
    },
    photos: {
        containerSmall: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
        },
        photo: {
            width: '100%',
            objectFit: 'cover'
        },
        photoSmall: {
            width: '100%',
            margin: 4,
            overflow: 'hidden'
        }
    },
    name: {
        fontSize: '1.2em',
        lineHeight: '1.5',
        textAlign: 'center',
        fontWeight: 700,
        color: '#313131',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    social: {
        profiles: {
            display: "flex",
            flex: 1,
            justifyContent: 'center'
        },
        profile: {
            flex: 1,
            minHeight: 42,
            maxWidth: '42',
            padding: 2,
            textAlign: 'center'
        }
    },
    socialIcon: {
        width: '100%',
        maxWidth: 38
    }
};

CreatureSimpleBox.propTypes = {
    creature: _propTypes2.default.object
};
CreatureSimpleBox.defaultProps = {
    mostRelevant: true
};

exports.default = CreatureSimpleBox;