class Util {
    static strip(html) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    static getSocialMostRelevant(data) {
        return data.filter(profile => {
            return ['facebook', 'twitter', 'linkedin', 'instagram'].indexOf(profile.typeId) > -1;
        });

    }
}

export default Util;
