import React, {Component} from 'react';
import PropTypes from 'prop-types';
import images from '../img/';

class CreatureSmallCard extends Component {
    render() {
        let creature = this.props.creature;
        console.log("creature..", this.props.creature);

        return (
            <div style={{borderColor: 'black', borderWidth: 1, borderStyle: 'solid'}}>
                {this.renderPhoto(creature.photos)}
                {this.renderName(creature.contactInfo)}
                {this.renderLocation(creature.demographics)}
                {this.renderSocialLinks(creature.socialProfiles)}
                {this.renderSocialMetrics(creature.socialProfiles)}
                {this.renderWebSites(creature.contactInfo ? creature.contactInfo.websites : null)}
                {this.renderOrganizations(creature.organizations)}
                {this.renderTopics(creature.digitalFootprint ? creature.digitalFootprint.topics : null)}
            </div>
        );
    }

    renderPhoto(data) {
        // console.log("photos", data);
        if (this.props.showPhoto === false || !data)
            return null;
        let photoUrl = data[0].url;
        return (<div><img src={photoUrl}/></div>);
    }


    renderName(data) {
        if (this.props.showName === false || !data)
            return null;
        let name = null;
        if (data.fullName) name = data.fullName;
        else if (data.givenName) name = data.givenName;
        if (!name)
            return null;

        return (<div>{name}</div>);
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

        return (<div>{profiles}</div>);
    }


    renderSocialMetrics(data) {
        // console.log("socialProfiles", data);
        if (this.props.showSocialMetrics === false || !data)
            return null;
        let profiles = data.map(profile => {
            if (!profile.followers) return;
            return (
                <div>
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
            <div>Seguidores: <br/>
                <div>{profiles}</div>
            </div>);
    }

    renderOrganizations(data) {
        // console.log("organizations", data);
        if (this.props.showOrganizations === false || !data)
            return null;
        let organizations = data.map(organization => {
            return (
                <div>
                    <span>{organization.name}</span> -
                    <span>{organization.title}</span>
                </div>
            );
        });


        if (!organizations)
            return null;

        return (
            <div>Organizações: <br/>
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
            <div>Interesses: <br/>
                <div>{topics}</div>
            </div>);
    }

    renderWebSites(data) {
        // console.log("topics", data);
        if (this.props.showWebSites === false || !data)
            return null;
        let sites = data.map(site => {
            return (<a href={site.url}><img style={styles.socialIcon} src={images.linkTo}/></a>)
        });

        if (!sites)
            return null;

        return (
            <div>Sites: <br/>
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

        return (<div>{location}</div>);
    }
}

const styles = {
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
                fontSize: 18
            },
        }
};


CreatureSmallCard.propTypes = {
    creature: PropTypes.object
};
CreatureSmallCard.defaultProps = {};

export default CreatureSmallCard;
