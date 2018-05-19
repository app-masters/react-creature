import React, {Component} from 'react';
import PropTypes from 'prop-types';
import images from '../img/';
import {Col, Row} from "react-flexbox-grid";
import Util from "./util";

class CreatureSimpleListItem extends Component {

    constructor() {
        super();
        this.state = {
            viewport: {},
            gridSize: null,
            creature: null,
        }
    }

    componentWillMount(){
        let creature = Util.getCreatureOrPerson(this.props);
        this.setState({creature});
    }

    render() {
        let creature = this.state.creature;
        if (!creature)
            return (<div/>);

        // console.log("creature..", creature);

        if (creature.status === 404) {
            return (
                <div style={styles.card}>
                    <b>{creature.email}</b> - não encontrado
                </div>
            );
        }

        if (creature.status === 202) {
            return (
                <div style={styles.card}>
                    <b>{creature.email}</b> - ainda procurando...
                </div>
            );
        }


        return (
            <Row style={styles.row}>
                <Col md={1} sm={1} xs={3} style={styles.column}>
                    {this.renderPhotos(creature.photos)}
                </Col>
                <Col md={3} sm={3} xs={7} style={styles.column}>
                    {this.renderNameEmail(creature.contactInfo, creature.email)}
                </Col>
                <Col md={1} sm={1} xs={2} style={styles.column}>
                    {this.renderInfluencer(creature.influencer)}
                </Col>
                <Col md={3} sm={3} xs={12} style={styles.column}>
                    {this.renderSocialLinks(creature.socialProfiles)}
                </Col>
                <Col md={4} sm={4} xs={12} style={styles.column}>
                    {this.renderLocationOrganization(creature.demographics, creature.organizations)}
                </Col>
            </Row>
        );
    }

    renderPhotos(data) {
        if (this.props.showPhoto === false || !data || data.length === 0)
            return null;
        data = JSON.parse(JSON.stringify(data));
        let photo = data.shift();
        if (!photo) return null;
        return (
            <img src={photo.url} style={styles.photo} onClick={()=>this.props.onClick(this.state.creature)}/>
        );
    }


    renderNameEmail(data, mail) {
        if (this.props.showName === false || !data)
            return null;
        let name = null;
        if (data.fullName) name = data.fullName;
        else if (data.givenName) name = data.givenName;
        if (!name)
            return null;

        // let email = null;
        // email = <small style={styles.email}>{mail}</small>;

        return (
            <div style={styles.name}>
                <a  onClick={()=>this.props.onClick(this.state.creature)}>{name}</a>
            </div>
        );
    }

    renderSocialLinks(data) {
        if (this.props.showSocial === false || !data || data.length === 0)
            return null;
        // Move icon method to utils
        // Implement mostRelevant to social links
        let profiles = data.map(profile => {
            if (profile.typeId === "gravatar") return null;
            let icon = images[profile.typeId];
            if (!icon)
                return null;
            return (<a href={profile.url}><img style={styles.socialIcon} src={icon}/></a>);
        });


        if (!profiles)
            return null;

        return (<div style={styles.social.profiles}>{profiles}</div>);
    }

    renderInfluencer(data) {
        if (this.props.showInfluencer === false || !data)
            return null;

        return (
            <div style={styles.influencer}>
                <a  onClick={()=>this.props.onClick(this.state.creature)}>{Util.formatNumber(data.followersTotal)}</a>
            </div>
        );
    }

    renderLocationOrganization(demographics, organizations) {
        // console.log("location", data);
        // if (this.props.showLocation === false || !data)
        //     return null;
        let location;
        if (!demographics)
            location = null;
        else if (demographics.locationDeduced) {
            if (demographics.locationDeduced.city)
                location = demographics.locationDeduced.city.name;
            if (demographics.locationDeduced.state)
                location = location + (location ? " - " : '') + demographics.locationDeduced.state.name;
        }
        else if (demographics.locationGeneral)
            location = demographics.locationGeneral;

        if (location)
            location = <span>{location}<br/></span>;

        let organization;
        if (!organizations)
            organization = null;
        else {
            organizations = organizations.splice(0, 1);
            organization = organizations.map(organization => {
                return (
                    <span>{organization.name} - {organization.title}</span>
                );
            });
        }

        return (
            <div style={styles.locationOrganization}>
                <div>{location}</div>
                <div>{organization}</div>
            </div>);
    }


    componentDidMount() {
        this._resize_mixin_callback();
        window.addEventListener('resize', () => {
            this._resize_mixin_callback()
        });
    }

    _resize_mixin_callback() {
        let gridSize;
        if (document.documentElement.clientWidth > 1080)
            gridSize = 'lg';
        else if (document.documentElement.clientWidth > 640)
            gridSize = 'md';
        else if (document.documentElement.clientWidth <= 640 && document.documentElement.clientWidth > 575)
            gridSize = 'sm';
        else
            gridSize = 'xs';

        if (gridSize !== this.state.gridSize)
            styles = styleCalc(document.documentElement.clientWidth, gridSize);

        this.setState({
            viewport: {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            },
            gridSize: gridSize,
        });


    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => {
            this._resize_mixin_callback()
        });
    }
}

const styleCalc = (clientWidth, gridSize) => {
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
            justifyContent: (gridSize === 'xs' ? 'center' : 'left'),
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
            textAlign: (gridSize === 'xs' ? 'center' : 'left'),
            fontWeight: 300
        },
        social: {
            profiles: {
                flex: 1,
                display: 'flex',
                justifyContent: (gridSize === 'xs' ? 'center' : 'left'),
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

let styles = styleCalc(1024, 'xs');

CreatureSimpleListItem.propTypes = {
    creature: PropTypes.object
};
CreatureSimpleListItem.defaultProps = {};

export default CreatureSimpleListItem;
