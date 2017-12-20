import React, {Component} from 'react';
import PropTypes from 'prop-types';
import images from '../img/';
import {Col, Row} from "react-flexbox-grid";
import Util from "./util";

// import {Col, Row} from "react-grid-system";

class CreatureHorizontalCard extends Component {
    render() {
        let creature = Util.getCreatureOrPerson(this.props);
        // console.log("creature..", this.props.creature);

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
                <Col lg={4} md={4} sm={12}>
                    {this.renderPhotos(creature.photos)}
                </Col>
                <Col lg={1} md={1} sm={12}>
                    {this.renderSocialLinks(creature.socialProfiles)}
                    {this.renderSocialMetrics(creature.socialProfiles)}
                </Col>
                <Col lg={6} md={6} sm={12}>
                    {this.renderName(creature.contactInfo)}
                    {this.renderLocation(creature.demographics)}
                    {this.renderOrganizations(creature.organizations)}
                    {this.renderWebSites(creature.contactInfo ? creature.contactInfo.websites : null)}
                    {this.renderTopics(creature.digitalFootprint ? creature.digitalFootprint.topics : null)}
                    {this.renderBios(creature.socialProfiles)}
                </Col>
            </Row>
        );

        return (
            <div style={styles.criaturaCard}>
                {this.renderPhoto(creature.photos)}
                <div style={styles.criaturaData}>
                    {this.renderName(creature.contactInfo)}
                    {this.renderLocation(creature.demographics)}
                    <div style={styles.criaturaColumn}>
                        <div>
                            {this.renderSocialLinks(creature.socialProfiles)}
                            {this.renderSocialMetrics(creature.socialProfiles)}
                        </div>
                        <div>
                            {this.renderOrganizations(creature.organizations)}
                            {this.renderWebSites(creature.contactInfo ? creature.contactInfo.websites : null)}
                            {this.renderTopics(creature.digitalFootprint ? creature.digitalFootprint.topics : null)}
                        </div>
                    </div>
                    {this.renderBios(creature.socialProfiles)}
                </div>
            </div>
        );
    }

    renderPhotos(data) {
        // console.log("photos", data);
        if (this.props.showPhoto === false || !data || data.length===0)
            return null;
        data = JSON.parse(JSON.stringify(data));
        let photo = data.shift();
        if (!photo) return null;
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
                                    // maxWidth: 200,
                                    // maxHeight: 200,
                                    margin: 4,
                                    overflow: 'hidden',
                                    background: 'url(' + photo.url + ')',
                                    backgroundSize: 'cover'
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


    renderName(data) {
        if (this.props.showName === false || !data)
            return null;
        let name = null;
        if (data.fullName) name = data.fullName;
        else if (data.givenName) name = data.givenName;
        if (!name)
            return null;

        return (<div style={styles.name}>{name}</div>);
    }

    renderSocialLinks(data) {
        // console.log("socialProfiles", data);
        if (this.props.showSocial === false || !data || data.length===0)
            return null;
        // Move icon method to utils
        // Implement mostRelevant to social links
        let profiles = data.map(profile => {
            let icon = null;
            icon = images[profile.typeId];
            if (!icon) {
                console.warn("Social icon not found: " + profile.typeId);
                icon = images.link;
            }
            //profile.typeId;
            return (<a href={profile.url}><img style={styles.socialIcon} src={icon}/></a>);
        });


        if (!profiles)
            return null;

        return (<div style={styles.social.profiles}>{profiles}</div>);
    }


    renderSocialMetrics(data) {
        // console.log("socialProfiles", data);
        if (this.props.showSocialMetrics === false || !data || data.length===0)
            return null;
        let profiles = data.map(profile => {
            if (!profile.followers) return;
            return (
                <div style={styles.social.metric}>
                    <a style={{textDecoration: 'none', color: 'inherit'}} href={profile.url}>
                        <span style={styles.socialMetrics.followers}>{profile.followers}</span><br/>
                        <span style={styles.socialMetrics.title}>{profile.typeName}</span>
                    </a>
                </div>
            );
        });


        if (!profiles)
            return null;

        return (
            <div>
                {profiles}
            </div>);
    }

    renderOrganizations(data) {
        // console.log("organizations", data);
        if (this.props.showOrganizations === false || !data || data.length===0)
            return null;
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
                <span style={styles.subTitle}>Organizações</span>
                <div>{organizations}</div>
            </div>);
    }

    renderTopics(data) {
        // console.log("topics", data);
        if (this.props.showTopics === false || !data || data.length===0)
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
        if (this.props.showWebSites === false || !data || data.length===0)
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
        if (this.props.showBios === false || !data || data.length===0)
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
}

const styles = {
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
        fontSize: 14,
    },
    bio: {
        marginBottom: 4
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 700,
        lineHeight: '1.5'
    }

};


CreatureHorizontalCard.propTypes = {
    creature: PropTypes.object
};
CreatureHorizontalCard.defaultProps = {};

export default CreatureHorizontalCard;
