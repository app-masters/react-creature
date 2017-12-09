import React, {Component} from 'react';
import PropTypes from 'prop-types';
import images from '../img/';

class CreatureHorizontalCard extends Component {
    render() {
        let creature = this.props.creature;
        console.log("creature..", this.props.creature);

        if (creature.status === 404) {
            return (
                <div style={styles.criaturaCard}>
                    <b>{creature.email}</b> - não encontrado
                </div>
            );
        }

        if (creature.status === 202) {
            return (
                <div style={styles.criaturaCard}>
                    <b>{creature.email}</b> - ainda procurando...
                </div>
            );
        }

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
                </div>
            </div>
        );
    }

    renderPhoto(data) {
        // console.log("photos", data);
        if (this.props.showPhoto === false || !data)
            return null;
        let photoUrl = data[0].url;
        return (<div style={styles.photos.container}><img src={photoUrl} style={styles.photos.photo}/></div>);
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
        if (this.props.showSocial === false || !data)
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
        if (this.props.showSocialMetrics === false || !data)
            return null;
        let profiles = data.map(profile => {
            if (!profile.followers) return;
            return (
                <div style={styles.social.metric}>
                    <a href={profile.url}>
                        <span style={styles.socialMetrics.followers}>{profile.followers}</span><br/>
                        <span style={styles.socialMetrics.title}>{profile.typeName}</span>
                    </a>
                </div>
            );
        });


        if (!profiles)
            return null;

        return (
            <div style={styles.social.metrics}>
                {profiles}
            </div>);
    }

    renderOrganizations(data) {
        console.log("organizations", data);
        if (this.props.showOrganizations === false || !data)
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
                <b>Organizações</b><br/>
                <div>{organizations}</div>
            </div>);
    }

    renderTopics(data) {
        // console.log("topics", data);
        if (this.props.showTopics === false || !data)
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
                <b>Tópicos</b><br/>
                <div>{topics}</div>
            </div>);
    }

    renderWebSites(data) {
        // console.log("topics", data);
        if (this.props.showWebSites === false || !data)
            return null;
        let sites = data.map(site => {
            let urlDisplay = site.url.replace("https://","").replace("http://","");
            return (<span><a href={site.url}>{urlDisplay}</a><br/></span>)
        });

        if (!sites)
            return null;

        return (
            <div style={styles.sites}><b>Sites</b><br/>
                <div>{sites}</div>
            </div>);
    }

    renderLocation(data) {
        console.log("location", data);
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
}

const styles = {
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
    photos:
        {
            container: {width: 400},
            photo: {width: '100%'}
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
        },

    },
    socialIcon: {
        width: 32,
        margin: 4
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
    organizations:{
        fontSize: 14,
        marginBottom: 12
    },
    organizationCurrent:{
    },
    organizationPast:{
       color: '#7d7d7d',
       fontWeight: 300
    },
    sites: {
        fontSize: 14,
        marginBottom: 12
    },
    topics:{
        fontSize: 14,
        marginBottom: 12
    }
};


CreatureHorizontalCard.propTypes = {
    creature: PropTypes.object
};
CreatureHorizontalCard.defaultProps = {};

export default CreatureHorizontalCard;
