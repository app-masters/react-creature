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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreatureSmallCard = function (_Component) {
    _inherits(CreatureSmallCard, _Component);

    function CreatureSmallCard() {
        _classCallCheck(this, CreatureSmallCard);

        return _possibleConstructorReturn(this, (CreatureSmallCard.__proto__ || Object.getPrototypeOf(CreatureSmallCard)).apply(this, arguments));
    }

    _createClass(CreatureSmallCard, [{
        key: 'render',
        value: function render() {
            var creature = this.props.creature;
            console.log("creature..", this.props.creature);

            return _react2.default.createElement(
                'div',
                { style: { borderColor: 'black', borderWidth: 1, borderStyle: 'solid' } },
                this.renderPhoto(creature.photos),
                this.renderName(creature.contactInfo),
                this.renderLocation(creature.demographics),
                this.renderSocialLinks(creature.socialProfiles),
                this.renderSocialMetrics(creature.socialProfiles),
                this.renderWebSites(creature.contactInfo ? creature.contactInfo.websites : null),
                this.renderOrganizations(creature.organizations),
                this.renderTopics(creature.digitalFootprint ? creature.digitalFootprint.topics : null)
            );
        }
    }, {
        key: 'renderPhoto',
        value: function renderPhoto(data) {
            // console.log("photos", data);
            if (this.props.showPhoto === false || !data) return null;
            var photoUrl = data[0].url;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('img', { src: photoUrl })
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
                null,
                name
            );
        }
    }, {
        key: 'renderSocialLinks',
        value: function renderSocialLinks(data) {
            // console.log("socialProfiles", data);
            if (this.props.showSocial === false || !data) return null;
            // Move icon method to utils
            // Implement mostRelevant to social links
            var profiles = data.map(function (profile) {
                var icon = null;
                icon = _img2.default[profile.typeId];
                if (!icon) {
                    console.warn("Social icon not found: " + profile.typeId);
                    icon = _img2.default.link;
                }
                //profile.typeId;
                return _react2.default.createElement(
                    'a',
                    { href: profile.url },
                    _react2.default.createElement('img', { style: styles.socialIcon, src: icon })
                );
            });

            if (!profiles) return null;

            return _react2.default.createElement(
                'div',
                null,
                profiles
            );
        }
    }, {
        key: 'renderSocialMetrics',
        value: function renderSocialMetrics(data) {
            // console.log("socialProfiles", data);
            if (this.props.showSocialMetrics === false || !data) return null;
            var profiles = data.map(function (profile) {
                if (!profile.followers) return;
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: profile.url },
                        _react2.default.createElement(
                            'span',
                            { style: styles.socialMetrics.followers },
                            profile.followers
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'span',
                            { style: styles.socialMetrics.title },
                            profile.typeName
                        )
                    )
                );
            });

            if (!profiles) return null;

            return _react2.default.createElement(
                'div',
                null,
                'Seguidores: ',
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'div',
                    null,
                    profiles
                )
            );
        }
    }, {
        key: 'renderOrganizations',
        value: function renderOrganizations(data) {
            // console.log("organizations", data);
            if (this.props.showOrganizations === false || !data) return null;
            var organizations = data.map(function (organization) {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'span',
                        null,
                        organization.name
                    ),
                    ' -',
                    _react2.default.createElement(
                        'span',
                        null,
                        organization.title
                    )
                );
            });

            if (!organizations) return null;

            return _react2.default.createElement(
                'div',
                null,
                'Organiza\xE7\xF5es: ',
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'div',
                    null,
                    organizations
                )
            );
        }
    }, {
        key: 'renderTopics',
        value: function renderTopics(data) {
            // console.log("topics", data);
            if (this.props.showTopics === false || !data) return null;
            var topics = data.map(function (topic) {
                return _react2.default.createElement(
                    'span',
                    null,
                    topic.value,
                    ' '
                );
            });

            if (!topics) return null;

            return _react2.default.createElement(
                'div',
                null,
                'Interesses: ',
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'div',
                    null,
                    topics
                )
            );
        }
    }, {
        key: 'renderWebSites',
        value: function renderWebSites(data) {
            // console.log("topics", data);
            if (this.props.showWebSites === false || !data) return null;
            var sites = data.map(function (site) {
                return _react2.default.createElement(
                    'a',
                    { href: site.url },
                    _react2.default.createElement('img', { style: styles.socialIcon, src: _img2.default.linkTo })
                );
            });

            if (!sites) return null;

            return _react2.default.createElement(
                'div',
                null,
                'Sites: ',
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'div',
                    null,
                    sites
                )
            );
        }
    }, {
        key: 'renderLocation',
        value: function renderLocation(data) {
            console.log("location", data);
            if (this.props.showLocation === false || !data) return null;
            var location = null;
            if (data.locationGeneral) location = data.locationGeneral;else if (data.locationDeduced) location = data.locationDeduced;

            if (!location) return null;

            return _react2.default.createElement(
                'div',
                null,
                location
            );
        }
    }]);

    return CreatureSmallCard;
}(_react.Component);

var styles = {
    socialIcon: {
        width: 32,
        margin: 4
    },

    socialMetrics: {
        followers: {
            fontSize: 24
        },
        title: {
            fontSize: 18
        }
    }
};

CreatureSmallCard.propTypes = {
    creature: _propTypes2.default.object
};
CreatureSmallCard.defaultProps = {};

exports.default = CreatureSmallCard;