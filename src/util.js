class Util {
    static strip(html) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    static getSocialMostRelevant(data) {
        return data.filter(profile => {
            return ['facebook', 'twitter', 'linkedin', 'instagram', 'pinterest'].indexOf(profile.typeId) > -1;
        });

    }

    static getCreatureOrPerson(props) {
        if (props.creature)
            return props.creature;
        if (props.person) {
            let person = props.person;

            let socialProfiles = Util.socialObjToArray(person);

            let creature = {
                photos: [
                    {url: person.photoUrl}
                ],
                contactInfo: {
                    fullName: person.name
                },
                socialProfiles
            };

            return creature;
        }


    }

    static socialObjToArray(person) {
        let result = [];
        Util.socialNetworks.map(social => {
            if (person[social])
                result.push({"typeId": social, "url": person[social]});
        });

        return result;
    }
}

Util.socialNetworks = ['facebook', 'twitter', 'instagram', 'linkedin', 'pinterest'];

export default Util;
