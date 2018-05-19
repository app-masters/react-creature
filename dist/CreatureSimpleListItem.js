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

var CreatureSimpleListItem = function (_Component) {
    _inherits(CreatureSimpleListItem, _Component);

    function CreatureSimpleListItem() {
        _classCallCheck(this, CreatureSimpleListItem);

        var _this = _possibleConstructorReturn(this, (CreatureSimpleListItem.__proto__ || Object.getPrototypeOf(CreatureSimpleListItem)).call(this));

        _this.state = {
            viewport: {},
            gridSize: null
        };
        return _this;
    }

    _createClass(CreatureSimpleListItem, [{
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
                { style: styles.row },
                _react2.default.createElement(
                    _reactFlexboxGrid.Col,
                    { md: 1, sm: 1, xs: 3, style: styles.column },
                    this.renderPhotos(creature.photos)
                ),
                _react2.default.createElement(
                    _reactFlexboxGrid.Col,
                    { md: 3, sm: 3, xs: 7, style: styles.column },
                    this.renderNameEmail(creature.contactInfo, creature.email)
                ),
                _react2.default.createElement(
                    _reactFlexboxGrid.Col,
                    { md: 1, sm: 1, xs: 2, style: styles.column },
                    this.renderInfluencer(creature.influencer)
                ),
                _react2.default.createElement(
                    _reactFlexboxGrid.Col,
                    { md: 3, sm: 3, xs: 12, style: styles.column },
                    this.renderSocialLinks(creature.socialProfiles)
                ),
                _react2.default.createElement(
                    _reactFlexboxGrid.Col,
                    { md: 4, sm: 4, xs: 12, style: styles.column },
                    this.renderLocationOrganization(creature.demographics, creature.organizations)
                )
            );
        }
    }, {
        key: 'renderPhotos',
        value: function renderPhotos(data) {
            if (this.props.showPhoto === false || !data || data.length === 0) return null;
            data = JSON.parse(JSON.stringify(data));
            var photo = data.shift();
            if (!photo) return null;
            return _react2.default.createElement('img', { src: photo.url, style: styles.photo });
        }
    }, {
        key: 'renderNameEmail',
        value: function renderNameEmail(data, mail) {
            if (this.props.showName === false || !data) return null;
            var name = null;
            if (data.fullName) name = data.fullName;else if (data.givenName) name = data.givenName;
            if (!name) return null;

            // let email = null;
            // email = <small style={styles.email}>{mail}</small>;

            return _react2.default.createElement(
                'div',
                { style: styles.name },
                name
            );
        }
    }, {
        key: 'renderSocialLinks',
        value: function renderSocialLinks(data) {
            if (this.props.showSocial === false || !data || data.length === 0) return null;
            // Move icon method to utils
            // Implement mostRelevant to social links
            var profiles = data.map(function (profile) {
                if (profile.typeId === "gravatar") return null;
                var icon = _img2.default[profile.typeId];
                if (!icon) return null;
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
            if (this.props.showInfluencer === false || !data) return null;

            return _react2.default.createElement(
                'div',
                { style: styles.influencer },
                _util2.default.formatNumber(data.followersTotal)
            );
        }
    }, {
        key: 'renderLocationOrganization',
        value: function renderLocationOrganization(demographics, organizations) {
            // console.log("location", data);
            // if (this.props.showLocation === false || !data)
            //     return null;
            var location = void 0;
            if (!demographics) location = null;else if (demographics.locationDeduced) {
                if (demographics.locationDeduced.city) location = demographics.locationDeduced.city.name;
                if (demographics.locationDeduced.state) location = location + (location ? " - " : '') + demographics.locationDeduced.state.name;
            } else if (demographics.locationGeneral) location = demographics.locationGeneral;

            if (location) location = _react2.default.createElement(
                'span',
                null,
                location,
                _react2.default.createElement('br', null)
            );

            var organization = void 0;
            if (!organizations) organization = null;else {
                organizations = organizations.splice(0, 1);
                organization = organizations.map(function (organization) {
                    return _react2.default.createElement(
                        'span',
                        null,
                        organization.name,
                        ' - ',
                        organization.title
                    );
                });
            }

            return _react2.default.createElement(
                'div',
                { style: styles.locationOrganization },
                _react2.default.createElement(
                    'div',
                    null,
                    location
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    organization
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this._resize_mixin_callback();
            window.addEventListener('resize', function () {
                _this2._resize_mixin_callback();
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
            var _this3 = this;

            window.removeEventListener('resize', function () {
                _this3._resize_mixin_callback();
            });
        }
    }]);

    return CreatureSimpleListItem;
}(_react.Component);

var styleCalc = function styleCalc(clientWidth, gridSize) {
    // console.log("styleCalc", gridSize);
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
        row: {
            // boxShadow: '0 2px 2px 2px rgba(140, 140, 140, 0.11)',
            borderBottomColor: '#c3c3c3',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            display: 'flex',
            flexDirection: 'row',
            padding: 4,
            margin: 2,
            flex: 1
        },
        column: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: gridSize === 'xs' ? 'center' : 'left'
        },
        photo: {
            width: '100%',
            objectFit: 'cover',
            borderRadius: '25px',
            maxWidth: 50,
            maxHeight: 50
        },
        name: {
            fontSize: '1em',
            lineHeight: '2em',
            textAlign: 'left',
            fontWeight: 700,
            whiteSpace: 'nowrap'
        },
        influencer: {
            fontSize: '0.9em',
            lineHeight: '2em',
            textAlign: 'center',
            fontWeight: 500
        },
        locationOrganization: {
            fontSize: '0.8em',
            lineHeight: '1.4em',
            textAlign: gridSize === 'xs' ? 'center' : 'left',
            fontWeight: 300
        },
        social: {
            profiles: {
                flex: 1,
                display: 'flex',
                justifyContent: gridSize === 'xs' ? 'center' : 'left',
                flexWrap: 'wrap'
            }
        },
        socialIcon: {
            width: 20,
            margin: 2
        },
        subTitle: {
            fontSize: 18,
            fontWeight: 700,
            lineHeight: '1.5'
        }
    };
};

var styles = styleCalc(1024, 'xs');

CreatureSimpleListItem.propTypes = {
    creature: _propTypes2.default.object
};
CreatureSimpleListItem.defaultProps = {};

exports.default = CreatureSimpleListItem;