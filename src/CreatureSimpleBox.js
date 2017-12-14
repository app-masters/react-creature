import React, {Component} from 'react';
import PropTypes from 'prop-types';
import images from '../img/';
import {Col, Row} from "react-flexbox-grid";
import Util from "./util";

// import {Col, Row} from "react-grid-system";

class CreatureSimpleBox extends Component {
    render() {
        let creature = this.props.creature;
        console.log("creature..", this.props.creature);

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

        return (<div style={styles.card}>
                    {this.renderPhoto(creature.photos)}
                    {this.renderName(creature.contactInfo)}
                    {this.renderSocialLinks(creature.socialProfiles)}
            </div>
        );
    }

    renderPhoto(data) {
        // console.log("photos", data);
        if (this.props.showPhoto === false || !data)
            return null;
        let photo = data.shift();
        // if (!photo) return null;
        return (
            <div>
                <div style={styles.photos.container}>
                    <img src={photo.url} style={styles.photos.photo}/>
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
        if (this.props.showSocial === false || !data)
            return null;
        data = Util.getSocialMostRelevant(data);
        // Move icon method to utils
        // Implement mostRelevant to social links
        let profiles = data.map(profile => {
            let icon = null;
            icon = images[profile.typeId];
            return (<a href={profile.url}><img style={styles.socialIcon} src={icon}/></a>);
        });


        if (!profiles)
            return null;

        return (<div style={styles.social.profiles}>{profiles}</div>);
    }
}

const styles = {
    card: {
        boxShadow: '0 2px 2px 2px rgba(140, 140, 140, 0.11)',
        borderColor: '#c3c3c3',
        borderWidth: 1,
        borderStyle: 'solid',
        display: 'flex',
        flex:1,
        flexDirection: 'column',
        padding: 6,
        marginLeft: 8,
        marginTop: 8,
        marginRight: 8
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
            flex: 1
        },
    },
    socialIcon: {
        width: 24,
        margin: 4
    }
};


CreatureSimpleBox.propTypes = {
    creature: PropTypes.object
};
CreatureSimpleBox.defaultProps = {
    mostRelevant: true
};

export default CreatureSimpleBox;
