import React, {Component} from 'react';
import PropTypes from 'prop-types';
import images from '../img/';
import {Col, Row} from "react-flexbox-grid";
import Util from "./util";

// import {Col, Row} from "react-grid-system";

class CreatureHorizontalCard extends Component {

    constructor() {
        super();
        this.state = {
            viewport: {},
            gridSize: null,
            creature: null,
        }
    }

    render() {
        let creature = Util.getCreatureOrPerson(this.props);
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
            <Row style={styles.card}>
                <Col lg={4} sm={4} xs={12}>
                    {this.renderPhotos(creature.photos)}
                </Col>
                <Col lg={1} sm={1} xs={12} style={this.state.gridSize === 'xs' ? styles.row : styles.column}>
                    {this.renderInfluencer(creature.influencer)}
                    {this.renderSocialLinks(creature.socialProfiles)}
                </Col>
                <Col lg={6} sm={6} xs={12}>
                    {this.renderNameEmail(creature.contactInfo, creature.email)}
                    {this.renderLocation(creature.demographics)}
                    {this.renderOrganizations(creature.organizations)}
                    {this.renderWebSites(creature.contactInfo ? creature.contactInfo.websites : null)}
                    {this.renderTopics(creature.digitalFootprint ? creature.digitalFootprint.topics : null)}
                    {this.renderBios(creature.socialProfiles)}
                </Col>
            </Row>
        );
    }

    renderPhotos(data) {
        // console.log("photos", data);
        if (this.props.showPhoto === false || !data || data.length === 0)
            return null;
        data = JSON.parse(JSON.stringify(data));
        let photo = data.shift();
        if (!photo) return null;

        if (this.props.showOnePhoto)
            return (
                <div>
                    <div style={styles.photos.container}>
                        <img src={photo.url} style={styles.photos.photo}/>
                    </div>
                </div>
            );

        return (
            <div>
                <div style={styles.photos.container}>
                    <img src={photo.url} style={styles.photos.photo}/>
                </div>
                <div style={styles.photos.containerSmall}>
                    {data.map(photo => {
                        if (!photo) return;
                        // console.log(photo);
                        return (
                            <div style={
                                {
                                    width: '30%',
                                    minHeight: 100,
                                    maxWidth: 200,
                                    maxHeight: 200,
                                    margin: 4,
                                    overflow: 'hidden',
                                }
                            }
                            >
                                <img src={photo.url} style={styles.photos.photo}/>
                            </div>
                        );
                    })}
                </div>
            </div>);
    }


    renderNameEmail(data, mail) {
        if (this.props.showName === false || !data)
            return null;
        let name = null;
        if (data.fullName) name = data.fullName;
        else if (data.givenName) name = data.givenName;
        if (!name)
            return null;

        let email = null;
        if (this.props.showEmail)
            email = <small style={styles.email}>{mail}</small>;

        return (
            <div>
                <div style={styles.name}>
                    {name}
                </div>
                {email}
            </div>
        );
    }

    renderSocialLinks(data) {
        // console.log("socialProfiles", data);
        if (this.props.showSocial === false || !data || data.length === 0)
            return null;
        // Move icon method to utils
        // Implement mostRelevant to social links
        let profiles = data.map(profile => {
            if (profile.typeId === "gravatar") return null;
            let icon = null;
            icon = images[profile.typeId];
            if (!icon) {
                return null;
                // console.warn("Social icon not found: " + profile.typeId);
                // icon = images.link;
            }
            //profile.typeId;
            return (<a href={profile.url}><img style={styles.socialIcon} src={icon}/></a>);
        });


        if (!profiles)
            return null;

        return (<div style={styles.social.profiles}>{profiles}</div>);
    }

    renderInfluencer(data) {
        if (this.props.showInfluencer === false || !data)
            return null;

        if (!data.followersTotal) {
            return null;
        }

        return (
            <div style={styles.influencer}>
                <a onClick={() => this.props.onClick(this.state.creature)}>
                    {Util.formatNumber(data.followersTotal)}<br/>
                    <span style={{fontSize: '0.5em'}}>Seguidores</span>
                </a>
            </div>
        );
    }

    renderOrganizations(data) {
        // console.log("organizations", data);
        if (this.props.showOrganizations === false || !data || data.length === 0)
            return null;
        if (this.props.showOneOrganization)
            data = data.splice(0, 1);
        let organizations = data.map(organization => {
            let style = organization.current ? styles.organizationCurrent : styles.organizationPast;
            return (
                <div style={style}>
                    <span>{organization.name} - {organization.title}</span>
                </div>
            );
        });


        if (!organizations)
            return null;

        return (
            <div style={styles.organizations}>
                <span style={styles.subTitle}>{this.props.showOneOrganization ? "Organização" : "Organizações"}</span>
                <div>{organizations}</div>
            </div>);
    }

    renderTopics(data) {
        // console.log("topics", data);
        if (this.props.showTopics === false || !data || data.length === 0)
            return null;
        let topics = data.map(topic => {
            return (
                <span>{topic.value} </span>
            );
        });

        if (!topics)
            return null;

        return (
            <div style={styles.topics}>
                <span style={styles.subTitle}>Tópicos</span>
                <div>{topics}</div>
            </div>);
    }

    renderWebSites(data) {
        // console.log("topics", data);
        if (this.props.showWebSites === false || !data || data.length === 0)
            return null;
        let sites = data.map(site => {
            let urlDisplay = site.url.replace("https://", "").replace("http://", "");
            return (<span><a href={site.url}>{urlDisplay}</a><br/></span>)
        });

        if (!sites)
            return null;

        return (
            <div style={styles.sites}>
                <span style={styles.subTitle}>Sites</span>
                <div>{sites}</div>
            </div>);
    }

    renderLocation(data) {
        // console.log("location", data);
        if (this.props.showLocation === false || !data)
            return null;
        let location = null;
        if (data.locationGeneral)
            location = data.locationGeneral;
        else if (data.locationDeduced)
            location = data.locationDeduced;

        if (!location)
            return null;

        return (<div style={styles.location}>{location}</div>);
    }

    renderBios(data) {
        // console.log("socialProfiles", data);
        if (this.props.showBio === false || !data || data.length === 0)
            return null;
        let bios = data.map(profile => {
            if (!profile.bio) return;
            return (
                <div style={styles.bio}>
                    {Util.strip(profile.bio)}
                </div>
            );
        });

        if (!bios)
            return null;

        return (
            <div style={styles.bios}>
                <span style={styles.subTitle}>Resumos</span><br/>
                {bios}
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
            justifyContent: 'center',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        criaturaColumn: {
            display: 'flex',
            flexDirection: 'row'
        },
        photos:
            {
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
                flexDirection: (gridSize === 'xs' ? 'row': 'column'),
                alignItems: 'center',
                justifyContent: 'space-around',
            },
            metrics: {
                flex: 2,
                display: 'flex',
                flexDirection: 'row'
            },
            metric: {
                padding: 8
            },

        },
        socialIcon: {
            width: 28,
            margin: 3
        }
        ,
        socialMetrics:
            {
                followers: {
                    fontSize: 24
                },
                title: {
                    fontSize: 12
                },
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
            fontSize: '0.8em',
        },
        bio: {
            marginBottom: 4
        },
        subTitle: {
            fontSize: '1.2em',
            fontWeight: 700,
            lineHeight: '1.5',
            color: '#636363',
        }
    }
};

let styles = styleCalc(1024, 'xs');

CreatureHorizontalCard.propTypes = {
    creature: PropTypes.object
};
CreatureHorizontalCard.defaultProps = {};

export default CreatureHorizontalCard;
