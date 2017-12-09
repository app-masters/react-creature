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

var _reactGridSystem = require('react-grid-system');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreatureHorizontalCard = function (_Component) {
    _inherits(CreatureHorizontalCard, _Component);

    function CreatureHorizontalCard() {
        _classCallCheck(this, CreatureHorizontalCard);

        return _possibleConstructorReturn(this, (CreatureHorizontalCard.__proto__ || Object.getPrototypeOf(CreatureHorizontalCard)).apply(this, arguments));
    }

    _createClass(CreatureHorizontalCard, [{
        key: 'render',
        value: function render() {
            var creature = this.props.creature;
            console.log("creature..", this.props.creature);

            if (creature.status === 404) {
                return _react2.default.createElement(
                    'div',
                    { style: styles.criaturaCard },
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
                    { style: styles.criaturaCard },
                    _react2.default.createElement(
                        'b',
                        null,
                        creature.email
                    ),
                    ' - ainda procurando...'
                );
            }

            // return (
            //     <Row>
            //         <Col>
            //             {this.renderPhoto(creature.photos)}
            //         </Col>
            //         <Col>
            //             <div style={styles.criaturaData}>
            //                 {this.renderName(creature.contactInfo)}
            //                 {this.renderLocation(creature.demographics)}
            //                 <div style={styles.criaturaColumn}>
            //                     <div>
            //                         {this.renderSocialLinks(creature.socialProfiles)}
            //                         {this.renderSocialMetrics(creature.socialProfiles)}
            //                     </div>
            //                     <div>
            //                         {this.renderOrganizations(creature.organizations)}
            //                         {this.renderWebSites(creature.contactInfo ? creature.contactInfo.websites : null)}
            //                         {this.renderTopics(creature.digitalFootprint ? creature.digitalFootprint.topics : null)}
            //                     </div>
            //                 </div>
            //                 {this.renderBios(creature.socialProfiles)}
            //             </div>
            //         </Col>
            //     </Row>
            // );

            return _react2.default.createElement(
                'div',
                { style: styles.criaturaCard },
                this.renderPhoto(creature.photos),
                _react2.default.createElement(
                    'div',
                    { style: styles.criaturaData },
                    this.renderName(creature.contactInfo),
                    this.renderLocation(creature.demographics),
                    _react2.default.createElement(
                        'div',
                        { style: styles.criaturaColumn },
                        _react2.default.createElement(
                            'div',
                            null,
                            this.renderSocialLinks(creature.socialProfiles),
                            this.renderSocialMetrics(creature.socialProfiles)
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            this.renderOrganizations(creature.organizations),
                            this.renderWebSites(creature.contactInfo ? creature.contactInfo.websites : null),
                            this.renderTopics(creature.digitalFootprint ? creature.digitalFootprint.topics : null)
                        )
                    ),
                    this.renderBios(creature.socialProfiles)
                )
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
                { style: styles.photos.container },
                _react2.default.createElement('img', { src: photoUrl, style: styles.photos.photo })
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
                { style: styles.social.profiles },
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
                    { style: styles.social.metric },
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
                { style: styles.social.metrics },
                profiles
            );
        }
    }, {
        key: 'renderOrganizations',
        value: function renderOrganizations(data) {
            console.log("organizations", data);
            if (this.props.showOrganizations === false || !data) return null;
            var organizations = data.map(function (organization) {
                var style = organization.current ? styles.organizationCurrent : styles.organizationPast;
                return _react2.default.createElement(
                    'div',
                    { style: style },
                    _react2.default.createElement(
                        'span',
                        null,
                        organization.name,
                        ' - ',
                        organization.title
                    )
                );
            });

            if (!organizations) return null;

            return _react2.default.createElement(
                'div',
                { style: styles.organizations },
                _react2.default.createElement(
                    'b',
                    null,
                    'Organiza\xE7\xF5es'
                ),
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
                { style: styles.topics },
                _react2.default.createElement(
                    'b',
                    null,
                    'T\xF3picos'
                ),
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
                var urlDisplay = site.url.replace("https://", "").replace("http://", "");
                return _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: site.url },
                        urlDisplay
                    ),
                    _react2.default.createElement('br', null)
                );
            });

            if (!sites) return null;

            return _react2.default.createElement(
                'div',
                { style: styles.sites },
                _react2.default.createElement(
                    'b',
                    null,
                    'Sites'
                ),
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
                { style: styles.location },
                location
            );
        }
    }, {
        key: 'renderBios',
        value: function renderBios(data) {
            // console.log("socialProfiles", data);
            if (this.props.showBios === false || !data) return null;
            var bios = data.map(function (profile) {
                if (!profile.bio) return;
                return _react2.default.createElement(
                    'div',
                    { style: styles.bio },
                    profile.bio
                );
            });

            if (!bios) return null;

            return _react2.default.createElement(
                'div',
                { style: styles.bios },
                bios
            );
        }
    }]);

    return CreatureHorizontalCard;
}(_react.Component);

var styles = {
    criaturaCard: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
        marginLeft: 8,
        marginTop: 8,
        marginRight: 8
    },
    criaturaData: {
        display: 'flex',
        flexDirection: 'column'
    },
    criaturaColumn: {
        display: 'flex',
        flexDirection: 'row'
    },
    photos: {
        container: {},
        photo: { width: '100%' }
    },
    name: {
        fontSize: 28,
        lineHeight: '1.5'
    },
    location: {
        fontSize: 16,
        lineHeight: '2'
    },
    social: {
        profiles: {
            flex: 1
        },
        metrics: {
            flex: 2,
            display: 'flex',
            flexDirection: 'row'
        },
        metric: {
            padding: 8
        }

    },
    socialIcon: {
        width: 32,
        margin: 4
    },

    socialMetrics: {
        followers: {
            fontSize: 24
        },
        title: {
            fontSize: 12
        }
    },
    organizations: {
        fontSize: 14,
        marginBottom: 12
    },
    organizationCurrent: {},
    organizationPast: {
        color: '#7d7d7d',
        fontWeight: 300
    },
    sites: {
        fontSize: 14,
        marginBottom: 12
    },
    topics: {
        fontSize: 14,
        marginBottom: 12
    },
    bios: {
        display: 'flex',
        flexDirection: 'column'
    },
    bio: {
        fontSize: 14,
        marginBottom: 12
    }

};

CreatureHorizontalCard.propTypes = {
    creature: _propTypes2.default.object
};
CreatureHorizontalCard.defaultProps = {};

exports.default = CreatureHorizontalCard;