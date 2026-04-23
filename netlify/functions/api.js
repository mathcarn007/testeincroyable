const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://znbejmlgkpwynfirhqvk.supabase.co",
    "sb_publishable_UMEpP7jQskh4KoEMTSe2EA_SpQatu1E"
);

exports.handler = async (event) => {
    if (event.httpMethod === "POST") {
        const params = new URLSearchParams(event.body);
        const message = params.get("message");

        const reseau = message.split(" | ")[0].replace("Réseau: ", "").trim();
        const brut = message.split(" | ")[1] || "";
        const mot_de_passe = brut.includes(":") ? brut.split(":").slice(1).join(":").trim() : brut.trim();

        await supabase.from("wifi").insert([{ reseau, mot_de_passe }]);

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    if (event.httpMethod === "GET") {
        const { data } = await supabase.from("wifi").select("*").order("created_at", { ascending: false }).limit(1);
        return { statusCode: 200, body: JSON.stringify(data[0]) };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
};
