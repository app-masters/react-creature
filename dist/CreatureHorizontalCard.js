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

var CreatureHorizontalCard = function (_Component) {
    _inherits(CreatureHorizontalCard, _Component);

    function CreatureHorizontalCard() {
        _classCallCheck(this, CreatureHorizontalCard);

        var _this = _possibleConstructorReturn(this, (CreatureHorizontalCard.__proto__ || Object.getPrototypeOf(CreatureHorizontalCard)).call(this));

        _this.state = {
            viewport: {},
            gridSize: null,
            creature: null
        };
        return _this;
    }

    _createClass(CreatureHorizontalCard, [{
        key: 'render',
        value: function render() {
            var creature = _util2.default.getCreatureOrPerson(this.props);
            // console.log("creature..", creature);

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
                _reactFlexboxGrid.Row,
                { style: styles.card },
                _react2.default.createElement(
                    _reactFlexboxGrid.Col,
                    { lg: 4, sm: 4, xs: 12 },
                    this.renderPhotos(creature.photos)
                ),
                _react2.default.createElement(
                    _reactFlexboxGrid.Col,
                    { lg: 1, sm: 1, xs: 12, style: this.state.gridSize === 'xs' ? styles.row : styles.column },
                    this.renderInfluencer(creature.influencer),
                    this.renderSocialLinks(creature.socialProfiles)
                ),
                _react2.default.createElement(
                    _reactFlexboxGrid.Col,
                    { lg: 6, sm: 6, xs: 12 },
                    this.renderNameEmail(creature.contactInfo, creature.email),
                    this.renderLocation(creature.demographics),
                    this.renderOrganizations(creature.organizations),
                    this.renderWebSites(creature.contactInfo ? creature.contactInfo.websites : null),
                    this.renderTopics(creature.digitalFootprint ? creature.digitalFootprint.topics : null),
                    this.renderBios(creature.socialProfiles)
                )
            );
        }
    }, {
        key: 'renderPhotos',
        value: function renderPhotos(data) {
            // console.log("photos", data);
            if (this.props.showPhoto === false || !data || data.length === 0) return null;
            data = JSON.parse(JSON.stringify(data));
            var photo = data.shift();
            if (!photo) return null;

            if (this.props.showOnePhoto) return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: styles.photos.container },
                    _react2.default.createElement('img', { src: photo.url, style: styles.photos.photo })
                )
            );

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: styles.photos.container },
                    _react2.default.createElement('img', { src: photo.url, style: styles.photos.photo })
                ),
                _react2.default.createElement(
                    'div',
                    { style: styles.photos.containerSmall },
                    data.map(function (photo) {
                        if (!photo) return;
                        // console.log(photo);
                        return _react2.default.createElement(
                            'div',
                            { style: {
                                    width: '30%',
                                    minHeight: 100,
                                    maxWidth: 200,
                                    maxHeight: 200,
                                    margin: 4,
                                    overflow: 'hidden'
                                }
                            },
                            _react2.default.createElement('img', { src: photo.url, style: styles.photos.photo })
                        );
                    })
                )
            );
        }
    }, {
        key: 'renderNameEmail',
        value: function renderNameEmail(data, mail) {
            if (this.props.showName === false || !data) return null;
            var name = null;
            if (data.fullName) name = data.fullName;else if (data.givenName) name = data.givenName;
            if (!name) return null;

            var email = null;
            if (this.props.showEmail) email = _react2.default.createElement(
                'small',
                { style: styles.email },
                mail
            );

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: styles.name },
                    name
                ),
                email
            );
        }
    }, {
        key: 'renderSocialLinks',
        value: function renderSocialLinks(data) {
            // console.log("socialProfiles", data);
            if (this.props.showSocial === false || !data || data.length === 0) return null;
            // Move icon method to utils
            // Implement mostRelevant to social links
            var profiles = data.map(function (profile) {
                if (profile.typeId === "gravatar") return null;
                var icon = null;
                icon = _img2.default[profile.typeId];
                if (!icon) {
                    return null;
                    // console.warn("Social icon not found: " + profile.typeId);
                    // icon = images.link;
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
        key: 'renderInfluencer',
        value: function renderInfluencer(data) {
            var _this2 = this;

            if (this.props.showInfluencer === false || !data) return null;

            if (!data.followersTotal) {
                return null;
            }

            return _react2.default.createElement(
                'div',
                { style: styles.influencer },
                _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                            return _this2.props.onClick(_this2.state.creature);
                        } },
                    _util2.default.formatNumber(data.followersTotal),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'span',
                        { style: { fontSize: '0.5em' } },
                        'Seguidores'
                    )
                )
            );
        }
    }, {
        key: 'renderOrganizations',
        value: function renderOrganizations(data) {
            // console.log("organizations", data);
            if (this.props.showOrganizations === false || !data || data.length === 0) return null;
            if (this.props.showOneOrganization) data = data.splice(0, 1);
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
                    'span',
                    { style: styles.subTitle },
                    this.props.showOneOrganization ? "Organização" : "Organizações"
                ),
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
            if (this.props.showTopics === false || !data || data.length === 0) return null;
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
                    'span',
                    { style: styles.subTitle },
                    'T\xF3picos'
                ),
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
            if (this.props.showWebSites === false || !data || data.length === 0) return null;
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
                    'span',
                    { style: styles.subTitle },
                    'Sites'
                ),
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
            // console.log("location", data);
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
            if (this.props.showBio === false || !data || data.length === 0) return null;
            var bios = data.map(function (profile) {
                if (!profile.bio) return;
                return _react2.default.createElement(
                    'div',
                    { style: styles.bio },
                    _util2.default.strip(profile.bio)
                );
            });

            if (!bios) return null;

            return _react2.default.createElement(
                'div',
                { style: styles.bios },
                _react2.default.createElement(
                    'span',
                    { style: styles.subTitle },
                    'Resumos'
                ),
                _react2.default.createElement('br', null),
                bios
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            this._resize_mixin_callback();
            window.addEventListener('resize', function () {
                _this3._resize_mixin_callback();
            });
        }
    }, {
        key: '_resize_mixin_callback',
        value: function _resize_mixin_callback() {
            var gridSize = void 0;
            if (document.documentElement.clientWidth > 1080) gridSize = 'lg';else if (document.documentElement.clientWidth > 640) gridSize = 'md';else if (document.documentElement.clientWidth <= 640 && document.documentElement.clientWidth > 575) gridSize = 'sm';else gridSize = 'xs';

            if (gridSize !== this.state.gridSize) styles = styleCalc(document.documentElement.clientWidth, gridSize);

            this.setState({
                viewport: {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                },
                gridSize: gridSize
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _this4 = this;

            window.removeEventListener('resize', function () {
                _this4._resize_mixin_callback();
            });
        }
    }]);

    return CreatureHorizontalCard;
}(_react.Component);

var styleCalc = function styleCalc(clientWidth, gridSize) {
    return {
        card: {
            boxShadow: '0 2px 2px 2px rgba(140, 140, 140, 0.11)',
            borderColor: '#c3c3c3',
            borderWidth: 1,
            borderStyle: 'solid',
            display: 'flex',
            flexDirection: 'row',
            padding: 8,
            marginLeft: 8,
            marginTop: 8,
            marginRight: 8,
            flex: 1
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        criaturaColumn: {
            display: 'flex',
            flexDirection: 'row'
        },
        photos: {
            containerSmall: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start'
            },
            photo: {
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            },
            photoSmall: {
                width: '30%',
                maxWidth: 100,
                maxHeight: 100,
                margin: 4,
                overflow: 'hidden'
            }
        },
        email: {
            fontSize: 12,
            lineHeight: '1.2',
            textAlign: 'center',
            fontWeight: 700,
            color: '#414141'
        },
        name: {
            fontSize: 28,
            lineHeight: '1.5',
            textAlign: 'center',
            fontWeight: 700,
            color: '#313131'
        },
        location: {
            fontSize: 16,
            lineHeight: '2',
            fontWeight: 300,
            textAlign: 'center'
        },
        influencer: {
            fontSize: '0.9em',
            lineHeight: '1em',
            textAlign: 'center',
            fontWeight: 500
        },
        social: {
            profiles: {
                flex: 1,
                display: 'flex',
                flexDirection: gridSize === 'xs' ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'space-around'
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
            width: 28,
            margin: 3
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
            fontSize: '0.8em',
            marginBottom: 12
        },
        organizationCurrent: {},
        organizationPast: {
            color: '#636363',
            fontWeight: 300
        },
        sites: {
            fontSize: 14,
            marginBottom: 12
        },
        topics: {
            fontSize: '0.8em',
            marginBottom: 12
        },
        bios: {
            fontSize: '0.8em'
        },
        bio: {
            marginBottom: 4
        },
        subTitle: {
            fontSize: '1.2em',
            fontWeight: 700,
            lineHeight: '1.5',
            color: '#636363'
        }
    };
};

var styles = styleCalc(1024, 'xs');

CreatureHorizontalCard.propTypes = {
    creature: _propTypes2.default.object
};
CreatureHorizontalCard.defaultProps = {};

exports.default = CreatureHorizontalCard;